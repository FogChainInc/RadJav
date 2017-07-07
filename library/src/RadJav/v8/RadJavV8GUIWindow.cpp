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
#include "v8/RadJavV8GUIWindow.h"

#include "RadJav.h"

#ifdef USE_V8
#include "v8/RadJavV8JavascriptEngine.h"

namespace RadJAV
{
	namespace GUI
	{
		#ifdef GUI_USE_WXWIDGETS
			WindowFrame::WindowFrame(const wxString &text, const wxPoint &pos, const wxSize &size)
				: wxFrame(NULL, wxID_ANY, text, pos, size)
			{
			}

			void WindowFrame::onClose(wxCloseEvent &evt)
			{
				if (IsTopLevel() == true)
				{
					V8_JAVASCRIPT_ENGINE->exit(0);

					return;
				}

				Destroy();
			}

			void WindowFrame::onJSClose(wxCloseEvent &evt)
			{
				v8::Persistent<v8::Value> *pevent = (v8::Persistent<v8::Value> *)evt.GetEventUserData();
				v8::Local<v8::Value> result = executeEvent(pevent);

				if (result.IsEmpty() == false)
				{
					if ((result->IsNull() == false) && (result->IsUndefined() == false))
					{
						v8::Local<v8::Boolean> change = v8::Local<v8::Boolean>::Cast(result);

						if (change->Value() == false)
							evt.Veto();
					}
				}
			}

			void WindowFrame::onJSMinimized(wxIconizeEvent &evt)
			{
				v8::Persistent<v8::Value> *pevent = (v8::Persistent<v8::Value> *)evt.GetEventUserData();
				executeEvent(pevent);
			}
		#endif

		void Window::createV8Callbacks(v8::Isolate *isolate, v8::Local<v8::Object> object)
		{
			V8_CALLBACK(object, "create", Window::create);
			V8_CALLBACK(object, "setFont", Window::setFont);
			V8_CALLBACK(object, "getFont", Window::getFont);
			V8_CALLBACK(object, "setPosition", Window::setPosition);
			V8_CALLBACK(object, "getPosition", Window::getPosition);
			V8_CALLBACK(object, "getX", Window::getX);
			V8_CALLBACK(object, "getY", Window::getY);
			V8_CALLBACK(object, "setSize", Window::setSize);
			V8_CALLBACK(object, "getSize", Window::getSize);
			V8_CALLBACK(object, "getWidth", Window::getWidth);
			V8_CALLBACK(object, "getHeight", Window::getHeight);
			V8_CALLBACK(object, "setText", Window::setText);
			V8_CALLBACK(object, "getText", Window::getText);
			V8_CALLBACK(object, "getParent", Window::getParent);
			V8_CALLBACK(object, "getAppObj", Window::getAppObj);
			V8_CALLBACK(object, "setVisibility", Window::setVisibility);
			V8_CALLBACK(object, "getVisibility", Window::getVisibility);
			V8_CALLBACK(object, "setEnabled", Window::setEnabled);
			V8_CALLBACK(object, "getEnabled", Window::getEnabled);
			V8_CALLBACK(object, "on", Window::on);
		}

		void Window::create(const v8::FunctionCallbackInfo<v8::Value> &args)
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
				WindowFrame *object = RJNEW WindowFrame(text, wxPoint(x, y), wxSize(width, height));
				wxPanel *panel = RJNEW wxPanel (object, wxID_ANY);
				/*wxBoxSizer *sizer = RJNEW wxBoxSizer(wxVERTICAL);
				panel->SetSizer(sizer);
				sizer->SetSizeHints(object);*/
				RadJav::app->SetTopWindow(object);
				object->Show(visible);
				RadJav::app->SetActive(visible, object);

				V8_JAVASCRIPT_ENGINE->v8SetExternal(args.This(), "_appObj", panel);
			#endif

			setupFont(args.This());

			v8::Local<v8::Function> _guiFinishedCreatingGObject = V8_JAVASCRIPT_ENGINE->v8GetFunction(V8_RADJAV, "_guiFinishedCreatingGObject");
			v8::Local<v8::Object> promise = V8_JAVASCRIPT_ENGINE->createPromise(args.This(), _guiFinishedCreatingGObject);

			args.GetReturnValue().Set(promise);
		}

		void Window::setFont(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			V8_JAVASCRIPT_ENGINE->v8SetObject(args.This(), "_font", v8::Local<v8::Object>::Cast (args[0]));

			setupFont(args.This());
		}

		void Window::getFont(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Local<v8::Object> font = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_font");

			#ifdef GUI_USE_WXWIDGETS
				WindowFrame *object = (WindowFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				WindowFrame *obj = (WindowFrame *)object->GetParent();
				wxFont wfont = obj->GetFont();

				if (wfont.IsOk() == true)
				{
					String fontFamily = parsewxString(wfont.GetFaceName());
					wxColor color = obj->GetForegroundColour();
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

		void Window::setPosition(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			#ifdef GUI_USE_WXWIDGETS
				WindowFrame *object = (WindowFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				WindowFrame *obj = NULL;

				if (object != NULL)
					obj = (WindowFrame *)object->GetParent();
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
			args2[0] = v8::Number::New (args.GetIsolate (), x);
			args2[1] = v8::Number::New(args.GetIsolate (), y);
			V8_JAVASCRIPT_ENGINE->v8CallFunction(transform, "setPosition", 2, args2);

			DELETE_ARRAY(args2);

			#ifdef GUI_USE_WXWIDGETS
				if (obj != NULL)
					obj->SetPosition(wxPoint(x, y));
			#endif
		}

		void Window::getPosition(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			#ifdef GUI_USE_WXWIDGETS
				WindowFrame *object = (WindowFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				WindowFrame *obj = (WindowFrame *)object->GetParent();
			#endif
			RJINT x = 0;
			RJINT y = 0;

			v8::Handle<v8::Object> transform = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_transform");
			x = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "x");
			y = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "y");

			#ifdef GUI_USE_WXWIDGETS
				if (obj != NULL)
				{
					wxPoint pos = obj->GetPosition();
					x = pos.x;
					y = pos.y;
				}
			#endif

			v8::Local<v8::Object> vector2 = V8_JAVASCRIPT_ENGINE->v8GetObject(V8_RADJAV, "Vector2");
			v8::Local<v8::Object> vector2obj = V8_JAVASCRIPT_ENGINE->v8CallAsConstructor(vector2, 0, NULL);
			vector2obj->Set(String ("x").toV8String (args.GetIsolate ()), v8::Number::New (args.GetIsolate (), x));
			vector2obj->Set(String ("y").toV8String (args.GetIsolate ()), v8::Number::New (args.GetIsolate (), y));

			args.GetReturnValue().Set(vector2obj);
		}

		void Window::getX(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getPosition(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast (ret.Get());

			args.GetReturnValue().Set (V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "x"));
		}

		void Window::getY(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getPosition(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(ret.Get());

			args.GetReturnValue().Set(V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "y"));
		}

		void Window::setSize(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			#ifdef GUI_USE_WXWIDGETS
				WindowFrame *object = (WindowFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				WindowFrame *obj = NULL;
				
				if (object != NULL)
					obj = (WindowFrame *)object->GetParent();
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
			args2[0] = v8::Number::New(args.GetIsolate (), x);
			args2[1] = v8::Number::New(args.GetIsolate (), y);
			V8_JAVASCRIPT_ENGINE->v8CallFunction(transform, "setSize", 2, args2);

			DELETE_ARRAY(args2);

			#ifdef GUI_USE_WXWIDGETS
				if (obj != NULL)
					obj->SetSize(x, y);
			#endif
		}

		void Window::getSize(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			#ifdef GUI_USE_WXWIDGETS
				WindowFrame *object = (WindowFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				WindowFrame *obj = (WindowFrame *)object->GetParent();
			#endif
			RJINT x = 0;
			RJINT y = 0;

			v8::Handle<v8::Object> transform = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_transform");
			x = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "width");
			y = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "height");

			#ifdef GUI_USE_WXWIDGETS
				if (obj != NULL)
				{
					wxSize size = obj->GetSize ();
					x = size.GetWidth ();
					y = size.GetHeight ();
				}
			#endif

			v8::Local<v8::Object> vector2 = V8_JAVASCRIPT_ENGINE->v8GetObject(V8_RADJAV, "Vector2");
			v8::Local<v8::Object> vector2obj = V8_JAVASCRIPT_ENGINE->v8CallAsConstructor(vector2, 0, NULL);
			vector2obj->Set(String("x").toV8String(args.GetIsolate ()), v8::Number::New(args.GetIsolate (), x));
			vector2obj->Set(String("y").toV8String(args.GetIsolate ()), v8::Number::New(args.GetIsolate (), y));

			args.GetReturnValue().Set(vector2obj);
		}

		void Window::getWidth(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getSize(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(ret.Get());

			args.GetReturnValue().Set(V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "x"));
		}

		void Window::getHeight(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getSize(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(ret.Get());

			args.GetReturnValue().Set(V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "y"));
		}

		void Window::setText(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Local<v8::String> val = v8::Local<v8::String>::Cast (args[0]);
			String str = parseV8Value(val);
			V8_JAVASCRIPT_ENGINE->v8SetString(args.This(), "_text", str);

			#ifdef GUI_USE_WXWIDGETS
				WindowFrame *object = (WindowFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				WindowFrame *obj = NULL;

				if (object != NULL)
				{
					obj = (WindowFrame *)object->GetParent();
					obj->SetTitle(str.towxString());
				}
			#endif
		}

		void Window::getText(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			String text = V8_JAVASCRIPT_ENGINE->v8GetString(args.This(), "_text");

			#ifdef GUI_USE_WXWIDGETS
				WindowFrame *object = (WindowFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				WindowFrame *obj = (WindowFrame *)object->GetParent();
				text = parsewxString(obj->GetTitle ());
			#endif

			args.GetReturnValue().Set(text.toV8String (args.GetIsolate ()));
		}

		void Window::getParent(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Handle<v8::Object> obj = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_parent");
			args.GetReturnValue().Set(obj);
		}

		void Window::getAppObj(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Handle<v8::External> ext = v8::Handle<v8::External>::Cast(
					args.This()->Get(String ("_appObj").toV8String(args.GetIsolate ())));
			args.GetReturnValue().Set(ext);
		}

		void Window::setVisibility(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = V8_JAVASCRIPT_ENGINE->v8ParseBool(args[0]);
			V8_JAVASCRIPT_ENGINE->v8SetBool(args.This(), "_visible", value);

			#ifdef GUI_USE_WXWIDGETS
				WindowFrame *object = (WindowFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				WindowFrame *obj = NULL;

				if (object != NULL)
				{
					obj = (WindowFrame *)object->GetParent();

					if (value == true)
						obj->Show();
					else
						obj->Hide();
				}
			#endif
		}

		void Window::getVisibility(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = V8_JAVASCRIPT_ENGINE->v8GetBool(args.This(), "_visible");

			#ifdef GUI_USE_WXWIDGETS
				WindowFrame *object = (WindowFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				WindowFrame *obj = (WindowFrame *)object->GetParent();

				value = obj->IsVisible();
			#endif

			args.GetReturnValue().Set(v8::Boolean::New (args.GetIsolate (), value));
		}

		void Window::setEnabled(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = V8_JAVASCRIPT_ENGINE->v8ParseBool(args[0]);

			#ifdef GUI_USE_WXWIDGETS
				WindowFrame *object = (WindowFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				WindowFrame *obj = NULL;

				if (object != NULL)
				{
					obj = (WindowFrame *)object->GetParent();

					if (value == true)
						obj->Enable();
					else
						obj->Disable();
				}
			#endif
		}

		void Window::getEnabled(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = false;

			#ifdef GUI_USE_WXWIDGETS
				WindowFrame *object = (WindowFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				WindowFrame *obj = (WindowFrame *)object->GetParent();
				value = obj->IsEnabled();
			#endif

			args.GetReturnValue().Set(v8::Boolean::New(args.GetIsolate (), value));
		}

		void Window::on(const v8::FunctionCallbackInfo<v8::Value> &args)
		{

			String event = parseV8Value(args[0]);
			v8::Local<v8::Function> func = v8::Local<v8::Function>::Cast(args[1]);

			#ifdef GUI_USE_WXWIDGETS
				WindowFrame *object = (WindowFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				WindowFrame *obj = (WindowFrame *)object->GetParent();

				object->addNewEvent(event, obj, func);

				if (event == "close")
				{
					v8::Persistent<v8::Value> *pevent = obj->createEvent(event, func);
					obj->Connect(wxEVT_CLOSE_WINDOW, wxCloseEventHandler (WindowFrame::onJSClose), (wxObject *)pevent);
				}

				if (event == "minimize")
				{
					v8::Persistent<v8::Value> *pevent = obj->createEvent(event, func);
					obj->Connect(wxEVT_ICONIZE, wxIconizeEventHandler(WindowFrame::onJSMinimized), (wxObject *)pevent);
				}
			#endif
		}
	}
}

	#ifdef GUI_USE_WXWIDGETS
		wxBEGIN_EVENT_TABLE(RadJAV::GUI::WindowFrame, wxFrame)
			EVT_CLOSE(RadJAV::GUI::WindowFrame::onClose)
		wxEND_EVENT_TABLE()
	#endif
#endif

