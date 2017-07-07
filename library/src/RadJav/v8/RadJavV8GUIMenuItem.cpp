/*
	MIT-LICENSE
	Copyright (c) 2017 Higher Edge Software, LLC

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
	and associated documentation files (the "Software"), to deal in the Software without restriction, 
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
	subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial 
	portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
#include "v8/RadJavV8GUIMenuItem.h"

#include "RadJav.h"

#ifdef USE_V8
#include "v8/RadJavV8JavascriptEngine.h"

namespace RadJAV
{
	namespace GUI
	{
		RJINT MenuItemGUI::nextId = 0;

		void MenuItem::onClick(wxCommandEvent &event)
		{
			MenuItemGUI *data = (MenuItemGUI *)event.GetEventUserData();
			RJINT menuId = event.GetId();

			if (data->getDataType (menuId) == MenuItemGUIDataTypes::STRING)
			{
				String *str = (String *)data->getData (menuId);
				String code = str->c_str ();
				V8_JAVASCRIPT_ENGINE->executeScriptNextTick(code, "");
			}
		}

		void MenuItem::createV8Callbacks(v8::Isolate *isolate, v8::Local<v8::Object> object)
		{
			V8_CALLBACK(object, "create", MenuItem::create);
			V8_CALLBACK(object, "setFont", MenuItem::setFont);
			V8_CALLBACK(object, "getFont", MenuItem::getFont);
			V8_CALLBACK(object, "setPosition", MenuItem::setPosition);
			V8_CALLBACK(object, "getPosition", MenuItem::getPosition);
			V8_CALLBACK(object, "getX", MenuItem::getX);
			V8_CALLBACK(object, "getY", MenuItem::getY);
			V8_CALLBACK(object, "setSize", MenuItem::setSize);
			V8_CALLBACK(object, "getSize", MenuItem::getSize);
			V8_CALLBACK(object, "getWidth", MenuItem::getWidth);
			V8_CALLBACK(object, "getHeight", MenuItem::getHeight);
			V8_CALLBACK(object, "setText", MenuItem::setText);
			V8_CALLBACK(object, "getText", MenuItem::getText);
			V8_CALLBACK(object, "getParent", MenuItem::getParent);
			V8_CALLBACK(object, "getAppObj", MenuItem::getAppObj);
			V8_CALLBACK(object, "setVisibility", MenuItem::setVisibility);
			V8_CALLBACK(object, "getVisibility", MenuItem::getVisibility);
			V8_CALLBACK(object, "setEnabled", MenuItem::setEnabled);
			V8_CALLBACK(object, "getEnabled", MenuItem::getEnabled);
			V8_CALLBACK(object, "on", MenuItem::on);
		}

		void MenuItem::create(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			String name = V8_JAVASCRIPT_ENGINE->v8GetString(args.This(), "name");
			String text = V8_JAVASCRIPT_ENGINE->v8GetString(args.This(), "_text");
			v8::Handle<v8::Object> parent = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_parent");
			v8::Local<v8::Object> transform = V8_JAVASCRIPT_ENGINE->v8GetObject (args.This(), "_transform");
			RJINT x = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "x");
			RJINT y = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "y");
			RJINT width = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "width");
			RJINT height = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "height");
			RJBOOL visible = V8_JAVASCRIPT_ENGINE->v8GetBool(args.This(), "_visible");

			#ifdef GUI_USE_WXWIDGETS
				wxWindow *parentWin = NULL;
				String type = "";

				if (V8_JAVASCRIPT_ENGINE->v8IsNull(parent) == false)
				{
					type = V8_JAVASCRIPT_ENGINE->v8GetString(parent, "type");
					parentWin = (wxWindow *)V8_JAVASCRIPT_ENGINE->v8GetExternal(parent, "_appObj");
				}

				MenuItemGUI *menuItem = RJNEW MenuItemGUI ();
				MenuItemGUI *parentMenu = NULL;

				if (type == "RadJav.GUI.MenuBar")
				{
					wxMenuBar *parentMenu = (wxMenuBar *)parentWin;
					menuItem->menu = RJNEW wxMenu ();
					parentMenu->Append(menuItem->menu, text.towxString());
					menuItem->parent = parentMenu;
					menuItem->parentType = MenuItemGUIParentTypes::MENU_BAR;
				}
				
				if (type == "RadJav.GUI.MenuItem")
				{
					parentMenu = (MenuItemGUI *)parentWin;

					if (parentMenu->menuItem != NULL)
					{
						String prevText = parsewxString (parentMenu->menuItem->GetItemLabelText());

						if (parentMenu->parentType == MenuItemGUIParentTypes::MENU_BAR)
							static_cast<wxMenuBar *> (parentMenu->parent)->Remove(parentMenu->menuItem->GetId ());

						if (parentMenu->parentType == MenuItemGUIParentTypes::MENU)
							static_cast<wxMenu *> (parentMenu->parent)->Remove(parentMenu->menuItem->GetId());

						DELETE_OBJ(parentMenu->menuItem);
						parentMenu->menu = RJNEW wxMenu();

						if (parentMenu->parentType == MenuItemGUIParentTypes::MENU_BAR)
							static_cast<wxMenuBar *> (parentMenu->parent)->Append(parentMenu->menu, prevText.towxString());
						
						if (parentMenu->parentType == MenuItemGUIParentTypes::MENU)
							static_cast<wxMenu *> (parentMenu->parent)->AppendSubMenu(parentMenu->menu, prevText.towxString());
					}

					if (parentMenu->menu != NULL)
					{
						if (text == "-")
							menuItem->menuItem = parentMenu->menu->AppendSeparator();
						else
							menuItem->menuItem = parentMenu->menu->Append(MenuItemGUI::nextId, text.towxString());

						menuItem->parent = parentMenu->menu;
						menuItem->parentType = MenuItemGUIParentTypes::MENU;
					}
				}

				v8::Handle<v8::Object> events = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_events");
				String click = V8_JAVASCRIPT_ENGINE->v8GetString(events, "click");

				if (parentMenu != NULL)
				{
					if (click != "")
					{
						if (parentMenu->menu != NULL)
						{
							String *str = RJNEW String(click);
							parentMenu->addData(MenuItemGUI::nextId, str, MenuItemGUIDataTypes::STRING);

							if (parentMenu->getNumData () == 1)
								parentMenu->menu->Bind(wxEVT_COMMAND_MENU_SELECTED, MenuItem::onClick, -1, MenuItemGUI::nextId, (wxObject *)parentMenu);
						}
					}
				}

				MenuItemGUI::nextId++;
				V8_JAVASCRIPT_ENGINE->v8SetExternal(args.This(), "_appObj", menuItem);
			#endif

			v8::Local<v8::Function> _guiFinishedCreatingGObject = V8_JAVASCRIPT_ENGINE->v8GetFunction(V8_RADJAV, "_guiFinishedCreatingGObject");
			v8::Local<v8::Object> promise = V8_JAVASCRIPT_ENGINE->createPromise(args.This(), _guiFinishedCreatingGObject);

			args.GetReturnValue().Set(promise);
		}

		void MenuItem::setFont(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			V8_JAVASCRIPT_ENGINE->v8SetObject(args.This(), "_font", v8::Local<v8::Object>::Cast (args[0]));

			setupFont(args.This());
		}

		void MenuItem::getFont(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Local<v8::Object> font = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_font");

			#ifdef GUI_USE_WXWIDGETS
				MenuItemGUI *object = (MenuItemGUI *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				wxFont wfont;
				
				#ifdef WIN32
					if (object->menuItem != NULL)
						wfont = object->menuItem->GetFont();
				#endif

				if (wfont.IsOk() == true)
				{
					String fontFamily = parsewxString(wfont.GetFaceName());
					wxColor color;

					#ifdef WIN32
						if (object->menuItem != NULL)
							color = object->menuItem->GetTextColour();
					#endif

					RJNUMBER r = color.Red () / 255;
					RJNUMBER g = color.Green() / 255;
					RJNUMBER b = color.Blue() / 255;
					RJNUMBER a = color.Alpha() / 255;
					RJINT size = wfont.GetPixelSize ().x;
					RJBOOL underlined = false;
					RJBOOL bold = false;
					RJBOOL italic = false;

					if (wfont.GetUnderlined() == true)
						underlined = true;

					if (wfont.GetWeight() == wxFontWeight::wxFONTWEIGHT_BOLD)
						bold = true;

					if (wfont.GetStyle () == wxFontStyle::wxFONTSTYLE_ITALIC)
						italic = true;

					V8_JAVASCRIPT_ENGINE->v8SetString(font, "fontFamily", fontFamily);

					v8::Local<v8::Object> ocolor = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "color");
					V8_JAVASCRIPT_ENGINE->v8SetNumber(ocolor, "r", r);
					V8_JAVASCRIPT_ENGINE->v8SetNumber(ocolor, "g", g);
					V8_JAVASCRIPT_ENGINE->v8SetNumber(ocolor, "b", b);
					V8_JAVASCRIPT_ENGINE->v8SetNumber(ocolor, "a", a);

					V8_JAVASCRIPT_ENGINE->v8SetNumber(font, "size", size);
					V8_JAVASCRIPT_ENGINE->v8SetBool(font, "underline", underlined);
					V8_JAVASCRIPT_ENGINE->v8SetBool(font, "bold", bold);
					V8_JAVASCRIPT_ENGINE->v8SetBool(font, "italic", italic);
				}
			#endif

			args.GetReturnValue().Set(font);
		}

		void MenuItem::setPosition(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			#ifdef GUI_USE_WXWIDGETS
			MenuItemGUI *object = (MenuItemGUI *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
			#endif
			RJINT x = 0;
			RJINT y = 0;

			if (args.Length() > 1)
			{
				x = V8_JAVASCRIPT_ENGINE->v8ParseInt (args[0]);
				y = V8_JAVASCRIPT_ENGINE->v8ParseInt (args[1]);
			}
			else
			{
				v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast (args[0]);
				x = V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "x");
				y = V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "y");
			}

			v8::Handle<v8::Object> transform = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_transform");
			v8::Local<v8::Value> *args2 = RJNEW v8::Local<v8::Value>[2];
			args2[0] = v8::Number::New (V8_JAVASCRIPT_ENGINE->isolate, x);
			args2[1] = v8::Number::New(V8_JAVASCRIPT_ENGINE->isolate, y);
			V8_JAVASCRIPT_ENGINE->v8CallFunction(transform, "setPosition", 2, args2);

			DELETE_ARRAY(args2);
		}

		void MenuItem::getPosition(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			#ifdef GUI_USE_WXWIDGETS
				MenuItemGUI *object = (MenuItemGUI *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
			#endif
			RJINT x = 0;
			RJINT y = 0;

			v8::Handle<v8::Object> transform = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_transform");
			x = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "x");
			y = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "y");

			v8::Local<v8::Object> vector2 = V8_JAVASCRIPT_ENGINE->v8GetObject(V8_RADJAV, "Vector2");
			v8::Local<v8::Object> vector2obj = V8_JAVASCRIPT_ENGINE->v8CallAsConstructor(vector2, 0, NULL);
			vector2obj->Set(String ("x").toV8String (V8_JAVASCRIPT_ENGINE->isolate), v8::Number::New (V8_JAVASCRIPT_ENGINE->isolate, x));
			vector2obj->Set(String ("y").toV8String (V8_JAVASCRIPT_ENGINE->isolate), v8::Number::New (V8_JAVASCRIPT_ENGINE->isolate, y));

			args.GetReturnValue().Set(vector2obj);
		}

		void MenuItem::getX(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getPosition(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast (ret.Get());

			args.GetReturnValue().Set (V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "x"));
		}

		void MenuItem::getY(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getPosition(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(ret.Get());

			args.GetReturnValue().Set(V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "y"));
		}

		void MenuItem::setSize(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			#ifdef GUI_USE_WXWIDGETS
				MenuItemGUI *object = (MenuItemGUI *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
			#endif
			RJINT x = 0;
			RJINT y = 0;

			if (args.Length() > 1)
			{
				x = V8_JAVASCRIPT_ENGINE->v8ParseInt(args[0]);
				y = V8_JAVASCRIPT_ENGINE->v8ParseInt(args[1]);
			}
			else
			{
				v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(args[0]);
				x = V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "x");
				y = V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "y");
			}

			v8::Handle<v8::Object> transform = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_transform");
			v8::Local<v8::Value> *args2 = RJNEW v8::Local<v8::Value>[2];
			args2[0] = v8::Number::New(V8_JAVASCRIPT_ENGINE->isolate, x);
			args2[1] = v8::Number::New(V8_JAVASCRIPT_ENGINE->isolate, y);
			V8_JAVASCRIPT_ENGINE->v8CallFunction(transform, "setSize", 2, args2);

			DELETE_ARRAY(args2);
		}

		void MenuItem::getSize(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			#ifdef GUI_USE_WXWIDGETS
				MenuItemGUI *object = (MenuItemGUI *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
			#endif
			RJINT x = 0;
			RJINT y = 0;

			v8::Handle<v8::Object> transform = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_transform");
			x = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "width");
			y = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "height");

			v8::Local<v8::Object> vector2 = V8_JAVASCRIPT_ENGINE->v8GetObject(V8_RADJAV, "Vector2");
			v8::Local<v8::Object> vector2obj = V8_JAVASCRIPT_ENGINE->v8CallAsConstructor(vector2, 0, NULL);
			vector2obj->Set(String("x").toV8String(V8_JAVASCRIPT_ENGINE->isolate), v8::Number::New(V8_JAVASCRIPT_ENGINE->isolate, x));
			vector2obj->Set(String("y").toV8String(V8_JAVASCRIPT_ENGINE->isolate), v8::Number::New(V8_JAVASCRIPT_ENGINE->isolate, y));

			args.GetReturnValue().Set(vector2obj);
		}

		void MenuItem::getWidth(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getSize(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(ret.Get());

			args.GetReturnValue().Set(V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "x"));
		}

		void MenuItem::getHeight(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getSize(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(ret.Get());

			args.GetReturnValue().Set(V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "y"));
		}

		void MenuItem::setText(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Local<v8::String> val = v8::Local<v8::String>::Cast (args[0]);
			String str = parseV8Value(val);
			V8_JAVASCRIPT_ENGINE->v8SetString(args.This(), "_text", str);

			#ifdef GUI_USE_WXWIDGETS
				MenuItemGUI *object = (MenuItemGUI *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				
				if (object->menuItem != NULL)
					object->menuItem->SetItemLabel(str.towxString ());
			#endif
		}

		void MenuItem::getText(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			String text = V8_JAVASCRIPT_ENGINE->v8GetString(args.This(), "_text");

			#ifdef GUI_USE_WXWIDGETS
				MenuItemGUI *object = (MenuItemGUI *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");

				if (object->menuItem != NULL)
					text = parsewxString (object->menuItem->GetItemLabelText());
			#endif

			args.GetReturnValue().Set(text.toV8String (V8_JAVASCRIPT_ENGINE->isolate));
		}

		void MenuItem::getParent(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Handle<v8::Object> obj = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_parent");
			args.GetReturnValue().Set(obj);
		}

		void MenuItem::getAppObj(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Handle<v8::External> ext = v8::Handle<v8::External>::Cast(
					args.This()->Get(String ("_appObj").toV8String(V8_JAVASCRIPT_ENGINE->isolate)));
			args.GetReturnValue().Set(ext);
		}

		void MenuItem::setVisibility(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = V8_JAVASCRIPT_ENGINE->v8ParseBool(args[0]);
			V8_JAVASCRIPT_ENGINE->v8SetBool(args.This(), "_visible", value);
		}

		void MenuItem::getVisibility(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = V8_JAVASCRIPT_ENGINE->v8GetBool(args.This(), "_visible");

			#ifdef GUI_USE_WXWIDGETS
				MenuItemGUI *object = (MenuItemGUI *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
			#endif

			args.GetReturnValue().Set(v8::Boolean::New (V8_JAVASCRIPT_ENGINE->isolate, value));
		}

		void MenuItem::setEnabled(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = V8_JAVASCRIPT_ENGINE->v8ParseBool(args[0]);

			#ifdef GUI_USE_WXWIDGETS
				MenuItemGUI *object = (MenuItemGUI *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");

				if (object->menuItem != NULL)
					object->menuItem->Enable(value);
			#endif
		}

		void MenuItem::getEnabled(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = false;

			#ifdef GUI_USE_WXWIDGETS
				MenuItemGUI *object = (MenuItemGUI *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");

				if (object->menuItem != NULL)
					object->menuItem->IsEnabled();
			#endif

			args.GetReturnValue().Set(v8::Boolean::New(V8_JAVASCRIPT_ENGINE->isolate, value));
		}

		void MenuItem::on(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void MenuItemGUI::addData(RJINT menuId, void *data, RJINT dataType)
		{
			auto found = this->data.find(menuId);
			auto end = this->data.end();

			if (found != end)
			{
				void *temp = this->data.at(menuId);
				DELETE_OBJ(temp);

				this->data.erase(menuId);
				this->dataType.erase(menuId);
			}

			this->data.insert(HashMapPair<RJINT, void *>(menuId, data));
			this->dataType.insert(HashMapPair<RJINT, RJINT>(menuId, dataType));
		}
	}
}
#endif

