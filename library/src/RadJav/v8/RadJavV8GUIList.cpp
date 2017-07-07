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
#include "v8/RadJavV8GUIList.h"

#include "RadJav.h"

#ifdef USE_V8
#include "v8/RadJavV8JavascriptEngine.h"

namespace RadJAV
{
	namespace GUI
	{
		#ifdef GUI_USE_WXWIDGETS
			ListFrame::ListFrame(wxWindow *parent, const wxPoint &pos, const wxSize &size)
				: wxListView(parent, wxID_ANY, pos, size)
			{
			}

			void ListFrame::onRowClick(wxListEvent &event)
			{
				v8::Persistent<v8::Value> *pevent = (v8::Persistent<v8::Value> *)event.GetEventUserData();
				v8::Local<v8::Array> selectedRows = v8::Array::New(V8_JAVASCRIPT_ENGINE->isolate);

				ListFrame *object = (ListFrame *)event.GetEventObject();
				RJINT count = object->GetSelectedItemCount();

				for (RJINT iIdx = 0; iIdx < count; iIdx++)
				{
					RJLONG index = object->GetNextSelected(iIdx);

					if (index == -1)
						break;

					RJINT numCols = object->GetColumnCount();
					v8::Local<v8::Object> items = v8::Object::New(V8_JAVASCRIPT_ENGINE->isolate);
					v8::Local<v8::Array> itemsArray = v8::Array::New(V8_JAVASCRIPT_ENGINE->isolate);

					for (RJINT iJdx = 0; iJdx < numCols; iJdx++)
					{
						wxString itemText = object->GetItemText(index, iJdx);
						String temp = parsewxString (itemText);
						v8::Local<v8::Object> item = v8::Object::New(V8_JAVASCRIPT_ENGINE->isolate);

						item->Set(String ("text").toV8String (V8_JAVASCRIPT_ENGINE->isolate), temp.toV8String (V8_JAVASCRIPT_ENGINE->isolate));
						itemsArray->Set(iJdx, item);
					}

					items->Set(String("items").toV8String(V8_JAVASCRIPT_ENGINE->isolate), itemsArray);
					selectedRows->Set(iIdx, items);
				}

				v8::Local<v8::Value> *args = RJNEW v8::Local<v8::Value> [1];
				args[0] = selectedRows;

				executeEvent(pevent, 1, args);
				DELETE_ARRAY(args);
			}
		#endif

		void List::createV8Callbacks(v8::Isolate *isolate, v8::Local<v8::Object> object)
		{
			V8_CALLBACK(object, "create", List::create);
			V8_CALLBACK(object, "setFont", List::setFont);
			V8_CALLBACK(object, "getFont", List::getFont);
			V8_CALLBACK(object, "setPosition", List::setPosition);
			V8_CALLBACK(object, "getPosition", List::getPosition);
			V8_CALLBACK(object, "getX", List::getX);
			V8_CALLBACK(object, "getY", List::getY);
			V8_CALLBACK(object, "setSize", List::setSize);
			V8_CALLBACK(object, "getSize", List::getSize);
			V8_CALLBACK(object, "getWidth", List::getWidth);
			V8_CALLBACK(object, "getHeight", List::getHeight);
			V8_CALLBACK(object, "setText", List::setText);
			V8_CALLBACK(object, "getText", List::getText);
			V8_CALLBACK(object, "getParent", List::getParent);
			V8_CALLBACK(object, "getAppObj", List::getAppObj);
			V8_CALLBACK(object, "setVisibility", List::setVisibility);
			V8_CALLBACK(object, "getVisibility", List::getVisibility);
			V8_CALLBACK(object, "setEnabled", List::setEnabled);
			V8_CALLBACK(object, "getEnabled", List::getEnabled);
			V8_CALLBACK(object, "on", List::on);

			V8_CALLBACK(object, "addColumn", List::addColumn);
			V8_CALLBACK(object, "setColumns", List::setColumns);
			V8_CALLBACK(object, "addRow", List::addRow);
			V8_CALLBACK(object, "setRows", List::setRows);
			V8_CALLBACK(object, "getSelectedRows", List::getSelectedRows);
			V8_CALLBACK(object, "deleteRows", List::deleteRows);
		}

		void List::create(const v8::FunctionCallbackInfo<v8::Value> &args)
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
			v8::Local<v8::Array> columns = v8::Local<v8::Array>::Cast (V8_JAVASCRIPT_ENGINE->v8GetValue(args.This(), "_columns"));
			RJBOOL canSort = V8_JAVASCRIPT_ENGINE->v8GetBool(args.This(), "canSort");

			#ifdef GUI_USE_WXWIDGETS
				wxWindow *parentWin = NULL;

				if (V8_JAVASCRIPT_ENGINE->v8IsNull(parent) == false)
					parentWin = (wxWindow *)V8_JAVASCRIPT_ENGINE->v8GetExternal(parent, "_appObj");

				ListFrame *object = RJNEW ListFrame(parentWin, wxPoint(x, y), wxSize(width, height));
				object->Show(visible);
				
				RJUINT length = 0;

				if (V8_JAVASCRIPT_ENGINE->v8IsNull (columns) == false)
					length = columns->Length();

				for (RJUINT iIdx = 0; iIdx < length; iIdx++)
				{
					v8::Local<v8::Object> column = v8::Local<v8::Object>::Cast (columns->Get(iIdx));
					String text = V8_JAVASCRIPT_ENGINE->v8GetString(column, "text");
					RJINT width = V8_JAVASCRIPT_ENGINE->v8GetInt(column, "width");

					if (width == 0)
						width = -1;

					object->AppendColumn(text.towxString (), wxLIST_FORMAT_LEFT, width);
				}

				V8_JAVASCRIPT_ENGINE->v8SetExternal(args.This(), "_appObj", object);
			#endif

			setupFont(args.This());

			v8::Local<v8::Function> _guiFinishedCreatingGObject = V8_JAVASCRIPT_ENGINE->v8GetFunction(V8_RADJAV, "_guiFinishedCreatingGObject");
			v8::Local<v8::Object> promise = V8_JAVASCRIPT_ENGINE->createPromise(args.This(), _guiFinishedCreatingGObject);

			args.GetReturnValue().Set(promise);
		}

		void List::setFont(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			V8_JAVASCRIPT_ENGINE->v8SetObject(args.This(), "_font", v8::Local<v8::Object>::Cast (args[0]));

			setupFont(args.This());
		}

		void List::getFont(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Local<v8::Object> font = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_font");

			#ifdef GUI_USE_WXWIDGETS
				ListFrame *object = (ListFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
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

		void List::setPosition(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			#ifdef GUI_USE_WXWIDGETS
				ListFrame *object = (ListFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
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
			args2[0] = v8::Number::New (args.GetIsolate(), x);
			args2[1] = v8::Number::New(args.GetIsolate(), y);
			V8_JAVASCRIPT_ENGINE->v8CallFunction(transform, "setPosition", 2, args2);

			DELETE_ARRAY(args2);

			#ifdef GUI_USE_WXWIDGETS
				if (object != NULL)
					object->SetPosition(wxPoint(x, y));
			#endif
		}

		void List::getPosition(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			#ifdef GUI_USE_WXWIDGETS
				ListFrame *object = (ListFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
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
			vector2obj->Set(String ("x").toV8String (args.GetIsolate()), v8::Number::New (args.GetIsolate(), x));
			vector2obj->Set(String ("y").toV8String (args.GetIsolate()), v8::Number::New (args.GetIsolate(), y));

			args.GetReturnValue().Set(vector2obj);
		}

		void List::getX(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getPosition(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast (ret.Get());

			args.GetReturnValue().Set (V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "x"));
		}

		void List::getY(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getPosition(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(ret.Get());

			args.GetReturnValue().Set(V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "y"));
		}

		void List::setSize(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			#ifdef GUI_USE_WXWIDGETS
				ListFrame *object = (ListFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
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
			args2[0] = v8::Number::New(args.GetIsolate(), x);
			args2[1] = v8::Number::New(args.GetIsolate(), y);
			V8_JAVASCRIPT_ENGINE->v8CallFunction(transform, "setSize", 2, args2);

			DELETE_ARRAY(args2);

			#ifdef GUI_USE_WXWIDGETS
				if (object != NULL)
					object->SetSize(x, y);
			#endif
		}

		void List::getSize(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			#ifdef GUI_USE_WXWIDGETS
				ListFrame *object = (ListFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
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
			vector2obj->Set(String("x").toV8String(args.GetIsolate()), v8::Number::New(args.GetIsolate(), x));
			vector2obj->Set(String("y").toV8String(args.GetIsolate()), v8::Number::New(args.GetIsolate(), y));

			args.GetReturnValue().Set(vector2obj);
		}

		void List::getWidth(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getSize(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(ret.Get());

			args.GetReturnValue().Set(V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "x"));
		}

		void List::getHeight(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getSize(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(ret.Get());

			args.GetReturnValue().Set(V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "y"));
		}

		void List::setText(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Local<v8::String> val = v8::Local<v8::String>::Cast (args[0]);
			String str = parseV8Value(val);
			V8_JAVASCRIPT_ENGINE->v8SetString(args.This(), "_text", str);

			#ifdef GUI_USE_WXWIDGETS
				ListFrame *object = (ListFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				object->SetLabelText(str.towxString ());
			#endif
		}

		void List::getText(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			String text = V8_JAVASCRIPT_ENGINE->v8GetString(args.This(), "_text");

			#ifdef GUI_USE_WXWIDGETS
				ListFrame *object = (ListFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				text = parsewxString(object->GetLabelText ());
			#endif

			args.GetReturnValue().Set(text.toV8String (args.GetIsolate()));
		}

		void List::getParent(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Handle<v8::Object> obj = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_parent");
			args.GetReturnValue().Set(obj);
		}

		void List::getAppObj(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Handle<v8::External> ext = v8::Handle<v8::External>::Cast(
					args.This()->Get(String ("_appObj").toV8String(args.GetIsolate())));
			args.GetReturnValue().Set(ext);
		}

		void List::setVisibility(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = V8_JAVASCRIPT_ENGINE->v8ParseBool(args[0]);
			V8_JAVASCRIPT_ENGINE->v8SetBool(args.This(), "_visible", value);

			#ifdef GUI_USE_WXWIDGETS
				ListFrame *object = (ListFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				
				if (value == true)
					object->Show();
				else
					object->Hide();
			#endif
		}

		void List::getVisibility(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = V8_JAVASCRIPT_ENGINE->v8GetBool(args.This(), "_visible");

			#ifdef GUI_USE_WXWIDGETS
				ListFrame *object = (ListFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				value = object->IsShown();
			#endif

			args.GetReturnValue().Set(v8::Boolean::New (args.GetIsolate(), value));
		}

		void List::setEnabled(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = V8_JAVASCRIPT_ENGINE->v8ParseBool(args[0]);

			#ifdef GUI_USE_WXWIDGETS
				ListFrame *object = (ListFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");

				if (value == true)
					object->Enable();
				else
					object->Disable ();
			#endif
		}

		void List::getEnabled(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = false;

			#ifdef GUI_USE_WXWIDGETS
				ListFrame *object = (ListFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				value = object->IsEnabled();
			#endif

			args.GetReturnValue().Set(v8::Boolean::New(args.GetIsolate(), value));
		}

		void List::on(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			String event = parseV8Value (args[0]);
			v8::Local<v8::Function> func = v8::Local<v8::Function>::Cast (args[1]);

			#ifdef GUI_USE_WXWIDGETS
				ListFrame *object = (ListFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");

				object->addNewEvent(event, object, func);

				if (event == "rowClick")
				{
					v8::Persistent<v8::Value> *pevent = object->createEvent(event, func);
					object->Connect(wxEVT_COMMAND_LIST_ITEM_SELECTED, wxListEventHandler(ListFrame::onRowClick), (wxObject *)pevent);
				}
			#endif
		}

		void List::addColumn(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Local<v8::Value> value = v8::Local<v8::Value>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 0));
			v8::Local<v8::Object> column;

			if (value->IsString() == true)
			{
				column = v8::Object::New(args.GetIsolate());
				column->Set(String("text").toV8String(args.GetIsolate()), v8::Local<v8::String>::Cast(value));

				if (args.Length() > 1)
				{
					v8::Local<v8::Integer> width = v8::Local<v8::Integer>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 1));
					column->Set(String("width").toV8String(args.GetIsolate()), width);
				}

				if (args.Length() > 2)
				{
					v8::Local<v8::Integer> key = v8::Local<v8::Integer>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 2));
					column->Set(String("key").toV8String(args.GetIsolate()), key);
				}
			}

			if (value->IsObject() == true)
				column = v8::Local<v8::Object>::Cast(value);

			v8::Local<v8::Array> _columns = v8::Local<v8::Array>::Cast (V8_JAVASCRIPT_ENGINE->v8GetObject(args.This (), "_columns"));
			_columns->Set(_columns->Length (), column);
			String text = V8_JAVASCRIPT_ENGINE->v8GetString(column, "text");
			RJINT width = V8_JAVASCRIPT_ENGINE->v8GetInt(column, "width");

			#ifdef GUI_USE_WXWIDGETS
				ListFrame *object = (ListFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");

				if (width == 0)
					width = -1;

				object->AppendColumn(text.towxString(), wxLIST_FORMAT_LEFT, width);
			#endif
		}

		void List::setColumns(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Local<v8::Value> value = v8::Local<v8::Value>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 0));
			V8_JAVASCRIPT_ENGINE->v8SetValue(args.This (), "_columns", value);

			#ifdef GUI_USE_WXWIDGETS
				ListFrame *object = (ListFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				object->DeleteAllColumns();

				v8::Local<v8::Array> ary = v8::Local<v8::Array>::Cast(value);
				RJUINT length = ary->Length();

				for (RJUINT iIdx = 0; iIdx < length; iIdx++)
				{
					v8::Local<v8::Object> column = v8::Local<v8::Object>::Cast (ary->Get(iIdx));
					String text = V8_JAVASCRIPT_ENGINE->v8GetString(column, "text");
					RJINT width = V8_JAVASCRIPT_ENGINE->v8GetInt(column, "width");

					object->AppendColumn(text.towxString (), wxLIST_FORMAT_LEFT, width);
				}
			#endif
		}

		void List::addRow(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Local<v8::Object> item = v8::Local<v8::Object>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 0));
			v8::Local<v8::Array> rowItems = v8::Local<v8::Array>::Cast (item->Get(String ("items").toV8String (args.GetIsolate ())));
			RJUINT length = rowItems->Length();

			#ifdef GUI_USE_WXWIDGETS
				ListFrame *object = (ListFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");

				RJINT rowId = object->GetItemCount();
				wxListItem listItem;
				listItem.SetId(rowId);
				listItem.SetText(String ("test").towxString());
				object->InsertItem(listItem);

				for (RJUINT iIdx = 0; iIdx < length; iIdx++)
				{
					v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast (rowItems->Get(iIdx));
					String str = V8_JAVASCRIPT_ENGINE->v8GetString (obj, "text");

					object->SetItem(rowId, iIdx, str.towxString ());
				}
			#endif
		}

		void List::setRows(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Local<v8::Array> rows = v8::Local<v8::Array>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 0));
			RJUINT length = rows->Length();

			#ifdef GUI_USE_WXWIDGETS
				ListFrame *object = (ListFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");

				for (RJUINT iIdx = 0; iIdx < length; iIdx++)
				{
					v8::Local<v8::Object> item = v8::Local<v8::Object>::Cast (rows->Get (iIdx));
					v8::Local<v8::Array> rowItems = v8::Local<v8::Array>::Cast (item->Get(String("items").toV8String(args.GetIsolate())));
					RJUINT length = rowItems->Length();

					object->DeleteAllItems();

					for (RJUINT iJdx = 0; iJdx < length; iJdx++)
					{
						String str = parseV8Value(item->Get(iJdx));

						wxListItem listItem;
						listItem.SetText(str.towxString());
						object->InsertItem(listItem);
					}
				}
			#endif
		}

		void List::getSelectedRows(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Local<v8::Object> gui = V8_JAVASCRIPT_ENGINE->v8GetObject(V8_RADJAV, "GUI");
			v8::Local<v8::Object> list = V8_JAVASCRIPT_ENGINE->v8GetObject(gui, "List");
			v8::Local<v8::Object> selection = V8_JAVASCRIPT_ENGINE->v8GetObject(list, "Selection");
			v8::Local<v8::Object> result = V8_JAVASCRIPT_ENGINE->v8CallAsConstructor(selection, 0, NULL);
			v8::Local<v8::Array> selected = v8::Array::New(args.GetIsolate ());

			#ifdef GUI_USE_WXWIDGETS
				ListFrame *object = (ListFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				RJINT count = object->GetSelectedItemCount();

				for (RJINT iIdx = 0; iIdx < count; iIdx++)
				{
					RJLONG index = object->GetNextSelected(iIdx);
					
					if (index == -1)
						break;

					selected->Set(iIdx, v8::Integer::New (args.GetIsolate (), index));
				}
			#endif

			result->Set(String ("_appObj").toV8String (args.GetIsolate ()), selected);

			args.GetReturnValue().Set(result);
		}

		void List::deleteRows(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Local<v8::Object> selection = v8::Local<v8::Object>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 0));
			v8::Local<v8::Array> rows = v8::Local<v8::Array>::Cast (V8_JAVASCRIPT_ENGINE->v8GetValue(selection, "_appObj"));

			#ifdef GUI_USE_WXWIDGETS
				ListFrame *object = (ListFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				RJUINT length = rows->Length();

				for (RJUINT iIdx = 0; iIdx < length; iIdx++)
				{
					v8::Local<v8::Integer> value = v8::Local<v8::Integer>::Cast (rows->Get(iIdx));
					RJINT index = value->Value();

					object->DeleteItem(index);
				}
			#endif
		}
	}
}

	#ifdef GUI_USE_WXWIDGETS
		wxBEGIN_EVENT_TABLE(RadJAV::GUI::ListFrame, wxListView)
		wxEND_EVENT_TABLE()
	#endif
#endif

