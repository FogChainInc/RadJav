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
#include "v8/RadJavV8GUIMenuBar.h"

#include "RadJav.h"

#ifdef USE_V8
#include "v8/RadJavV8JavascriptEngine.h"
#include "v8/RadJavV8GUIWindow.h"

namespace RadJAV
{
	namespace GUI
	{
		void MenuBar::createV8Callbacks(v8::Isolate *isolate, v8::Local<v8::Object> object)
		{
			V8_CALLBACK(object, "create", MenuBar::create);
			V8_CALLBACK(object, "setFont", MenuBar::setFont);
			V8_CALLBACK(object, "getFont", MenuBar::getFont);
			V8_CALLBACK(object, "setPosition", MenuBar::setPosition);
			V8_CALLBACK(object, "getPosition", MenuBar::getPosition);
			V8_CALLBACK(object, "getX", MenuBar::getX);
			V8_CALLBACK(object, "getY", MenuBar::getY);
			V8_CALLBACK(object, "setSize", MenuBar::setSize);
			V8_CALLBACK(object, "getSize", MenuBar::getSize);
			V8_CALLBACK(object, "getWidth", MenuBar::getWidth);
			V8_CALLBACK(object, "getHeight", MenuBar::getHeight);
			V8_CALLBACK(object, "setText", MenuBar::setText);
			V8_CALLBACK(object, "getText", MenuBar::getText);
			V8_CALLBACK(object, "getParent", MenuBar::getParent);
			V8_CALLBACK(object, "getAppObj", MenuBar::getAppObj);
			V8_CALLBACK(object, "setVisibility", MenuBar::setVisibility);
			V8_CALLBACK(object, "getVisibility", MenuBar::getVisibility);
			V8_CALLBACK(object, "setEnabled", MenuBar::setEnabled);
			V8_CALLBACK(object, "getEnabled", MenuBar::getEnabled);
			V8_CALLBACK(object, "on", MenuBar::on);
		}

		void MenuBar::create(const v8::FunctionCallbackInfo<v8::Value> &args)
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

				if (V8_JAVASCRIPT_ENGINE->v8IsNull(parent) == false)
					parentWin = (wxWindow *)V8_JAVASCRIPT_ENGINE->v8GetExternal(parent, "_appObj");

				wxMenuBar *menuBar = RJNEW wxMenuBar ();
				WindowFrame *window = (WindowFrame *)parentWin->GetParent ();

				window->SetMenuBar(menuBar);

				V8_JAVASCRIPT_ENGINE->v8SetExternal(args.This(), "_appObj", menuBar);
			#endif

			v8::Local<v8::Function> _guiFinishedCreatingGObject = V8_JAVASCRIPT_ENGINE->v8GetFunction(V8_RADJAV, "_guiFinishedCreatingGObject");
			v8::Local<v8::Object> promise = V8_JAVASCRIPT_ENGINE->createPromise(args.This(), _guiFinishedCreatingGObject);

			args.GetReturnValue().Set(promise);
		}

		void MenuBar::setFont(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			V8_JAVASCRIPT_ENGINE->v8SetObject(args.This(), "_font", v8::Local<v8::Object>::Cast (args[0]));

			setupFont(args.This());
		}

		void MenuBar::getFont(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Local<v8::Object> font = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_font");

			#ifdef GUI_USE_WXWIDGETS
				wxMenuBar *object = (wxMenuBar *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				wxFont wfont = object->GetFont();

				if (wfont.IsOk() == true)
				{
					String fontFamily = parsewxString(wfont.GetFaceName());
					wxColor color = object->GetForegroundColour();
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

		void MenuBar::setPosition(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			#ifdef GUI_USE_WXWIDGETS
			wxMenuBar *object = (wxMenuBar *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
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

			#ifdef GUI_USE_WXWIDGETS
				if (object != NULL)
					object->SetPosition(wxPoint(x, y));
			#endif
		}

		void MenuBar::getPosition(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			#ifdef GUI_USE_WXWIDGETS
				wxMenuBar *object = (wxMenuBar *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
			#endif
			RJINT x = 0;
			RJINT y = 0;

			v8::Handle<v8::Object> transform = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_transform");
			x = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "x");
			y = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "y");

			#ifdef GUI_USE_WXWIDGETS
				if (object != NULL)
				{
					wxPoint pos = object->GetPosition();
					x = pos.x;
					y = pos.y;
				}
			#endif

			v8::Local<v8::Object> vector2 = V8_JAVASCRIPT_ENGINE->v8GetObject(V8_RADJAV, "Vector2");
			v8::Local<v8::Object> vector2obj = V8_JAVASCRIPT_ENGINE->v8CallAsConstructor(vector2, 0, NULL);
			vector2obj->Set(String ("x").toV8String (V8_JAVASCRIPT_ENGINE->isolate), v8::Number::New (V8_JAVASCRIPT_ENGINE->isolate, x));
			vector2obj->Set(String ("y").toV8String (V8_JAVASCRIPT_ENGINE->isolate), v8::Number::New (V8_JAVASCRIPT_ENGINE->isolate, y));

			args.GetReturnValue().Set(vector2obj);
		}

		void MenuBar::getX(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getPosition(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast (ret.Get());

			args.GetReturnValue().Set (V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "x"));
		}

		void MenuBar::getY(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getPosition(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(ret.Get());

			args.GetReturnValue().Set(V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "y"));
		}

		void MenuBar::setSize(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			#ifdef GUI_USE_WXWIDGETS
				wxMenuBar *object = (wxMenuBar *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
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

			#ifdef GUI_USE_WXWIDGETS
				if (object != NULL)
					object->SetSize(x, y);
			#endif
		}

		void MenuBar::getSize(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			#ifdef GUI_USE_WXWIDGETS
				wxMenuBar *object = (wxMenuBar *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
			#endif
			RJINT x = 0;
			RJINT y = 0;

			v8::Handle<v8::Object> transform = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_transform");
			x = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "width");
			y = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "height");

			#ifdef GUI_USE_WXWIDGETS
				if (object != NULL)
				{
					wxSize size = object->GetSize ();
					x = size.GetWidth ();
					y = size.GetHeight ();
				}
			#endif

			v8::Local<v8::Object> vector2 = V8_JAVASCRIPT_ENGINE->v8GetObject(V8_RADJAV, "Vector2");
			v8::Local<v8::Object> vector2obj = V8_JAVASCRIPT_ENGINE->v8CallAsConstructor(vector2, 0, NULL);
			vector2obj->Set(String("x").toV8String(V8_JAVASCRIPT_ENGINE->isolate), v8::Number::New(V8_JAVASCRIPT_ENGINE->isolate, x));
			vector2obj->Set(String("y").toV8String(V8_JAVASCRIPT_ENGINE->isolate), v8::Number::New(V8_JAVASCRIPT_ENGINE->isolate, y));

			args.GetReturnValue().Set(vector2obj);
		}

		void MenuBar::getWidth(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getSize(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(ret.Get());

			args.GetReturnValue().Set(V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "x"));
		}

		void MenuBar::getHeight(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getSize(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(ret.Get());

			args.GetReturnValue().Set(V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "y"));
		}

		void MenuBar::setText(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Local<v8::String> val = v8::Local<v8::String>::Cast (args[0]);
			String str = parseV8Value(val);
			V8_JAVASCRIPT_ENGINE->v8SetString(args.This(), "_text", str);
		}

		void MenuBar::getText(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			String text = V8_JAVASCRIPT_ENGINE->v8GetString(args.This(), "_text");

			args.GetReturnValue().Set(text.toV8String (V8_JAVASCRIPT_ENGINE->isolate));
		}

		void MenuBar::getParent(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Handle<v8::Object> obj = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_parent");
			args.GetReturnValue().Set(obj);
		}

		void MenuBar::getAppObj(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Handle<v8::External> ext = v8::Handle<v8::External>::Cast(
					args.This()->Get(String ("_appObj").toV8String(V8_JAVASCRIPT_ENGINE->isolate)));
			args.GetReturnValue().Set(ext);
		}

		void MenuBar::setVisibility(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = V8_JAVASCRIPT_ENGINE->v8ParseBool(args[0]);
			V8_JAVASCRIPT_ENGINE->v8SetBool(args.This(), "_visible", value);

			#ifdef GUI_USE_WXWIDGETS
				wxMenuBar *object = (wxMenuBar *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				
				if (value == true)
					object->Show();
				else
					object->Hide();
			#endif
		}

		void MenuBar::getVisibility(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = V8_JAVASCRIPT_ENGINE->v8GetBool(args.This(), "_visible");

			#ifdef GUI_USE_WXWIDGETS
				wxMenuBar *object = (wxMenuBar *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				value = object->IsShown();
			#endif

			args.GetReturnValue().Set(v8::Boolean::New (V8_JAVASCRIPT_ENGINE->isolate, value));
		}

		void MenuBar::setEnabled(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = V8_JAVASCRIPT_ENGINE->v8ParseBool(args[0]);

			#ifdef GUI_USE_WXWIDGETS
				wxMenuBar *object = (wxMenuBar *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");

				if (value == true)
					object->Enable();
				else
					object->Disable ();
			#endif
		}

		void MenuBar::getEnabled(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = false;

			#ifdef GUI_USE_WXWIDGETS
				wxMenuBar *object = (wxMenuBar *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				value = object->IsEnabled();
			#endif

			args.GetReturnValue().Set(v8::Boolean::New(V8_JAVASCRIPT_ENGINE->isolate, value));
		}

		void MenuBar::on(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}
	}
}
#endif

