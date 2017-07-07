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
#include "v8/RadJavV8GUIWebView.h"

#include "RadJav.h"

#ifdef USE_V8
#include "v8/RadJavV8JavascriptEngine.h"

namespace RadJAV
{
	namespace GUI
	{
		#ifdef GUI_USE_WXWIDGETS
			WebViewFrame::WebViewFrame(wxWebView *webView)
			{
				this->webView = webView;
			}

			void WebViewFrame::onPageLoaded(wxWebViewEvent &event)
			{
				v8::Persistent<v8::Value> *pevent = (v8::Persistent<v8::Value> *)event.GetEventUserData();
				executeEvent(pevent);
			}

			void WebViewFrame::onPageChange(wxWebViewEvent &event)
			{
				v8::Persistent<v8::Value> *pevent = (v8::Persistent<v8::Value> *)event.GetEventUserData();
				String url = parsewxString (event.GetURL());
				v8::Local<v8::Value> *args = RJNEW v8::Local<v8::Value>[1];
				args[0] = url.toV8String (V8_JAVASCRIPT_ENGINE->isolate);

				v8::Local<v8::Value> result = executeEvent(pevent, 1, args);
				DELETE_ARRAY(args);

				if (result.IsEmpty() == false)
				{
					if ((result->IsNull() == false) && (result->IsUndefined() == false))
					{
						v8::Local<v8::Boolean> change = v8::Local<v8::Boolean>::Cast (result);

						if (change->Value() == false)
							event.Veto();
					}
				}
			}
		#endif

		void WebView::createV8Callbacks(v8::Isolate *isolate, v8::Local<v8::Object> object)
		{
			V8_CALLBACK(object, "create", WebView::create);
			V8_CALLBACK(object, "setFont", WebView::setFont);
			V8_CALLBACK(object, "getFont", WebView::getFont);
			V8_CALLBACK(object, "setPosition", WebView::setPosition);
			V8_CALLBACK(object, "getPosition", WebView::getPosition);
			V8_CALLBACK(object, "getX", WebView::getX);
			V8_CALLBACK(object, "getY", WebView::getY);
			V8_CALLBACK(object, "setSize", WebView::setSize);
			V8_CALLBACK(object, "getSize", WebView::getSize);
			V8_CALLBACK(object, "getWidth", WebView::getWidth);
			V8_CALLBACK(object, "getHeight", WebView::getHeight);
			V8_CALLBACK(object, "setText", WebView::setText);
			V8_CALLBACK(object, "getText", WebView::getText);
			V8_CALLBACK(object, "getParent", WebView::getParent);
			V8_CALLBACK(object, "getAppObj", WebView::getAppObj);
			V8_CALLBACK(object, "setVisibility", WebView::setVisibility);
			V8_CALLBACK(object, "getVisibility", WebView::getVisibility);
			V8_CALLBACK(object, "setEnabled", WebView::setEnabled);
			V8_CALLBACK(object, "getEnabled", WebView::getEnabled);
			V8_CALLBACK(object, "on", WebView::on);
		}

		void WebView::create(const v8::FunctionCallbackInfo<v8::Value> &args)
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

				WebViewFrame *object = RJNEW WebViewFrame (wxWebView::New(parentWin, wxID_ANY, text.towxString (), wxPoint(x, y), wxSize(width, height)));
				object->webView->Show(visible);

				V8_JAVASCRIPT_ENGINE->v8SetExternal(args.This(), "_appObj", object);
			#endif

			//setupFont(args.This());

			v8::Local<v8::Function> _guiFinishedCreatingGObject = V8_JAVASCRIPT_ENGINE->v8GetFunction(V8_RADJAV, "_guiFinishedCreatingGObject");
			v8::Local<v8::Object> promise = V8_JAVASCRIPT_ENGINE->createPromise(args.This(), _guiFinishedCreatingGObject);

			args.GetReturnValue().Set(promise);
		}

		void WebView::setFont(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			V8_JAVASCRIPT_ENGINE->v8SetObject(args.This(), "_font", v8::Local<v8::Object>::Cast (args[0]));

			//setupFont(args.This());
		}

		void WebView::getFont(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Local<v8::Object> font = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_font");

			#ifdef GUI_USE_WXWIDGETS
				WebViewFrame *object = (WebViewFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				wxFont wfont = object->webView->GetFont();

				if (wfont.IsOk() == true)
				{
					String fontFamily = parsewxString(wfont.GetFaceName());
					wxColor color = object->webView->GetForegroundColour();
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

		void WebView::setPosition(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			#ifdef GUI_USE_WXWIDGETS
				WebViewFrame *object = (WebViewFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
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
					object->webView->SetPosition(wxPoint(x, y));
			#endif
		}

		void WebView::getPosition(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			#ifdef GUI_USE_WXWIDGETS
				WebViewFrame *object = (WebViewFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
			#endif
			RJINT x = 0;
			RJINT y = 0;

			v8::Handle<v8::Object> transform = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_transform");
			x = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "x");
			y = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "y");

			#ifdef GUI_USE_WXWIDGETS
				if (object != NULL)
				{
					wxPoint pos = object->webView->GetPosition();
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

		void WebView::getX(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getPosition(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast (ret.Get());

			args.GetReturnValue().Set (V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "x"));
		}

		void WebView::getY(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getPosition(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(ret.Get());

			args.GetReturnValue().Set(V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "y"));
		}

		void WebView::setSize(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			#ifdef GUI_USE_WXWIDGETS
				WebViewFrame *object = (WebViewFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
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
					object->webView->SetSize(x, y);
			#endif
		}

		void WebView::getSize(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			#ifdef GUI_USE_WXWIDGETS
				WebViewFrame *object = (WebViewFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
			#endif
			RJINT x = 0;
			RJINT y = 0;

			v8::Handle<v8::Object> transform = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_transform");
			x = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "width");
			y = V8_JAVASCRIPT_ENGINE->v8GetInt(transform, "height");

			#ifdef GUI_USE_WXWIDGETS
				if (object != NULL)
				{
					wxSize size = object->webView->GetSize ();
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

		void WebView::getWidth(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getSize(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(ret.Get());

			args.GetReturnValue().Set(V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "x"));
		}

		void WebView::getHeight(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			getSize(args);
			v8::ReturnValue<v8::Value> ret = args.GetReturnValue();
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(ret.Get());

			args.GetReturnValue().Set(V8_JAVASCRIPT_ENGINE->v8GetInt(obj, "y"));
		}

		void WebView::setText(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Local<v8::String> val = v8::Local<v8::String>::Cast (args[0]);
			String str = parseV8Value(val);
			V8_JAVASCRIPT_ENGINE->v8SetString(args.This(), "_text", str);

			#ifdef GUI_USE_WXWIDGETS
				WebViewFrame *object = (WebViewFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				object->webView->SetLabelText(str.towxString ());
			#endif
		}

		void WebView::getText(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			String text = V8_JAVASCRIPT_ENGINE->v8GetString(args.This(), "_text");

			#ifdef GUI_USE_WXWIDGETS
				WebViewFrame *object = (WebViewFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				text = parsewxString(object->webView->GetLabelText ());
			#endif

			args.GetReturnValue().Set(text.toV8String (V8_JAVASCRIPT_ENGINE->isolate));
		}

		void WebView::getParent(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Handle<v8::Object> obj = V8_JAVASCRIPT_ENGINE->v8GetObject(args.This(), "_parent");
			args.GetReturnValue().Set(obj);
		}

		void WebView::getAppObj(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			v8::Handle<v8::External> ext = v8::Handle<v8::External>::Cast(
					args.This()->Get(String ("_appObj").toV8String(V8_JAVASCRIPT_ENGINE->isolate)));
			args.GetReturnValue().Set(ext);
		}

		void WebView::setVisibility(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = V8_JAVASCRIPT_ENGINE->v8ParseBool(args[0]);
			V8_JAVASCRIPT_ENGINE->v8SetBool(args.This(), "_visible", value);

			#ifdef GUI_USE_WXWIDGETS
				WebViewFrame *object = (WebViewFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				
				if (value == true)
					object->webView->Show();
				else
					object->webView->Hide();
			#endif
		}

		void WebView::getVisibility(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = V8_JAVASCRIPT_ENGINE->v8GetBool(args.This(), "_visible");

			#ifdef GUI_USE_WXWIDGETS
				WebViewFrame *object = (WebViewFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				value = object->webView->IsShown();
			#endif

			args.GetReturnValue().Set(v8::Boolean::New (V8_JAVASCRIPT_ENGINE->isolate, value));
		}

		void WebView::setEnabled(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = V8_JAVASCRIPT_ENGINE->v8ParseBool(args[0]);

			#ifdef GUI_USE_WXWIDGETS
				WebViewFrame *object = (WebViewFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");

				if (value == true)
					object->webView->Enable();
				else
					object->webView->Disable ();
			#endif
		}

		void WebView::getEnabled(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			RJBOOL value = false;

			#ifdef GUI_USE_WXWIDGETS
				WebViewFrame *object = (WebViewFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");
				value = object->webView->IsEnabled();
			#endif

			args.GetReturnValue().Set(v8::Boolean::New(V8_JAVASCRIPT_ENGINE->isolate, value));
		}

		void WebView::on(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			String event = parseV8Value (args[0]);
			v8::Local<v8::Function> func = v8::Local<v8::Function>::Cast (args[1]);

			#ifdef GUI_USE_WXWIDGETS
				WebViewFrame *object = (WebViewFrame *)V8_JAVASCRIPT_ENGINE->v8GetExternal(args.This(), "_appObj");

				object->addNewEvent(event, object->webView, func);

				if (event == "pageLoad")
				{
					v8::Persistent<v8::Value> *pevent = object->createEvent(event, func);
					object->webView->Bind(wxEVT_WEBVIEW_LOADED, WebViewFrame::onPageLoaded, -1, -1, (wxObject *)pevent);
				}
				
				if (event == "pageChange")
				{
					v8::Persistent<v8::Value> *pevent = object->createEvent(event, func);
					object->webView->Bind(wxEVT_WEBVIEW_NAVIGATING, WebViewFrame::onPageChange, -1, -1, (wxObject *)pevent);
				}
			#endif
		}
	}
}
#endif

