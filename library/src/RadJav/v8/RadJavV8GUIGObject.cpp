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
#include "v8/RadJavV8GUIGObject.h"

#include "RadJav.h"

#ifdef USE_V8
#include "v8/RadJavV8JavascriptEngine.h"

namespace RadJAV
{
	namespace GUI
	{
		void GObject::createV8Callbacks(v8::Isolate *isolate, v8::Local<v8::Object> object)
		{
			V8_CALLBACK(object, "_createAppObj", GObject::_createAppObj);
		}

		void GObject::_createAppObj(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void GObject::create(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void GObject::setFont(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void GObject::getFont(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void GObject::setPosition(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void GObject::getPosition(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void GObject::getX(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void GObject::getY(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void GObject::setSize(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void GObject::getSize(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void GObject::getWidth(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void GObject::getHeight(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void GObject::setText(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void GObject::getText(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void GObject::getParent(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void GObject::getAppObj(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void GObject::setVisibility(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void GObject::getVisibility(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void GObject::setEnabled(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void GObject::getEnabled(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void GObject::on(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
		}

		void GObject::setupFont(v8::Local<v8::Object> gobject)
		{
			v8::Handle<v8::Object> objfont = V8_JAVASCRIPT_ENGINE->v8GetObject(gobject, "_font");
			String fontFamily = parseV8Value(objfont->Get(String("fontFamily").toV8String(V8_JAVASCRIPT_ENGINE->isolate)));
			v8::Handle<v8::Object> color = v8::Handle<v8::Object>::Cast(objfont->Get(String("color").toV8String(V8_JAVASCRIPT_ENGINE->isolate)));
			RJNUMBER r = color->Get(String("r").toV8String(V8_JAVASCRIPT_ENGINE->isolate))->NumberValue();
			RJNUMBER g = color->Get(String("g").toV8String(V8_JAVASCRIPT_ENGINE->isolate))->NumberValue();
			RJNUMBER b = color->Get(String("b").toV8String(V8_JAVASCRIPT_ENGINE->isolate))->NumberValue();
			RJNUMBER a = color->Get(String("a").toV8String(V8_JAVASCRIPT_ENGINE->isolate))->NumberValue();
			RJINT size = objfont->Get(String("size").toV8String(V8_JAVASCRIPT_ENGINE->isolate))->IntegerValue();
			RJBOOL underline = objfont->Get(String("underline").toV8String(V8_JAVASCRIPT_ENGINE->isolate))->BooleanValue();
			RJBOOL bold = objfont->Get(String("bold").toV8String(V8_JAVASCRIPT_ENGINE->isolate))->BooleanValue();
			RJBOOL italic = objfont->Get(String("italic").toV8String(V8_JAVASCRIPT_ENGINE->isolate))->BooleanValue();

			#ifdef GUI_USE_WXWIDGETS
				wxWindow *object = (wxWindow *)V8_JAVASCRIPT_ENGINE->v8GetExternal(gobject, "_appObj");
				wxFont font;

				if (fontFamily != "")
					font.SetFaceName(fontFamily.towxString());
				else
					font = *wxSMALL_FONT;

				font.SetPixelSize(wxSize(0, size));

				if (underline == true)
					font.MakeUnderlined();

				if (bold == true)
					font.MakeBold();

				if (italic == true)
					font.MakeItalic();

				object->SetFont(font);
				object->SetForegroundColour(wxColor (r * 255, g * 255, b * 255, a * 255));
			#endif
		}

		v8::Persistent<v8::Value> *GObjectBase::createEvent(String event, v8::Local<v8::Function> function)
		{
			v8::Persistent<v8::Value> *persistent = RJNEW v8::Persistent<v8::Value>();
			persistent->Reset(V8_JAVASCRIPT_ENGINE->isolate, function);

			auto found = events.find (event);
			auto end = events.end();

			if (found != end)
			{
				v8::Persistent<v8::Value> *evt = events.at(event);
				DELETE_OBJ(evt);

				events.erase(event);
			}

			events.insert(HashMapPair<String, v8::Persistent<v8::Value> *> (event, persistent));

			return (persistent);
		}

		#ifdef GUI_USE_WXWIDGETS
		void GObjectBase::addNewEvent(String event, wxWindow *object, v8::Local<v8::Function> func)
		{
			if (event == "click")
			{
				v8::Persistent<v8::Value> *pevent = this->createEvent(event, func);
				object->Bind(wxEVT_LEFT_UP, GObjectBase::onMouseEvent, -1, -1, (wxObject *)pevent);
			}

			if (event == "keyup")
			{
				v8::Persistent<v8::Value> *pevent = this->createEvent(event, func);
				object->Bind(wxEVT_KEY_UP, GObjectBase::onKeyUp, -1, -1, (wxObject *)pevent);
			}
		}

		void GObjectBase::onClick(wxCommandEvent &event)
		{
			v8::Persistent<v8::Value> *pevent = (v8::Persistent<v8::Value> *)event.GetEventUserData();
			executeEvent(pevent);
		}

		void GObjectBase::onMouseEvent(wxMouseEvent &event)
		{
			v8::Persistent<v8::Value> *pevent = (v8::Persistent<v8::Value> *)event.GetEventUserData();
			executeEvent(pevent);
		}

		void GObjectBase::onKeyUp(wxKeyEvent &event)
		{
			v8::Persistent<v8::Value> *pevent = (v8::Persistent<v8::Value> *)event.GetEventUserData();
			executeEvent(pevent);
		}
		#endif

		v8::Local<v8::Value> GObjectBase::executeEvent(v8::Persistent<v8::Value> *pevent, RJINT numArgs, v8::Local<v8::Value> *args)
		{
			v8::Local<v8::Function> func = v8::Local<v8::Function>::Cast(pevent->Get(V8_JAVASCRIPT_ENGINE->isolate));
			v8::Local<v8::Value> result;

			if (V8_JAVASCRIPT_ENGINE->v8IsNull(func) == false)
				result = func->Call(V8_JAVASCRIPT_ENGINE->globalContext->Global(), numArgs, args);

			return (result);
		}
	}
}
#endif
