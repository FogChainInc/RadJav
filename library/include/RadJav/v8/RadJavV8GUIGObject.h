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
#ifndef _RADJAV_GUI_V8_GOBJECT_H_
#define _RADJAV_GUI_V8_GOBJECT_H_

#include "RadJavPreprocessor.h"

#include "RadJavString.h"
#include "RadJavHashMap.h"

#ifdef GUI_USE_WXWIDGETS
	#include <wx/wx.h>
#endif

#ifdef USE_V8
namespace RadJAV
{
	/// Contains classes for the OS GUI.
	namespace GUI
	{
			class RADJAV_EXPORT GObject
			{
				public:
					static void createV8Callbacks (v8::Isolate *isolate, v8::Local<v8::Object> object);

					static void _createAppObj(const v8::FunctionCallbackInfo<v8::Value> &args);
					static void create(const v8::FunctionCallbackInfo<v8::Value> &args);
					static void setFont(const v8::FunctionCallbackInfo<v8::Value> &args);
					static void getFont(const v8::FunctionCallbackInfo<v8::Value> &args);
					static void setPosition(const v8::FunctionCallbackInfo<v8::Value> &args);
					static void getPosition(const v8::FunctionCallbackInfo<v8::Value> &args);
					static void getX(const v8::FunctionCallbackInfo<v8::Value> &args);
					static void getY(const v8::FunctionCallbackInfo<v8::Value> &args);
					static void setSize(const v8::FunctionCallbackInfo<v8::Value> &args);
					static void getSize(const v8::FunctionCallbackInfo<v8::Value> &args);
					static void getWidth(const v8::FunctionCallbackInfo<v8::Value> &args);
					static void getHeight(const v8::FunctionCallbackInfo<v8::Value> &args);
					static void setText(const v8::FunctionCallbackInfo<v8::Value> &args);
					static void getText(const v8::FunctionCallbackInfo<v8::Value> &args);
					static void getParent(const v8::FunctionCallbackInfo<v8::Value> &args);
					static void getAppObj(const v8::FunctionCallbackInfo<v8::Value> &args);
					static void setVisibility(const v8::FunctionCallbackInfo<v8::Value> &args);
					static void getVisibility(const v8::FunctionCallbackInfo<v8::Value> &args);
					static void setEnabled(const v8::FunctionCallbackInfo<v8::Value> &args);
					static void getEnabled(const v8::FunctionCallbackInfo<v8::Value> &args);
					static void on(const v8::FunctionCallbackInfo<v8::Value> &args);

					static void setupFont(v8::Local<v8::Object> gobject);
			};

			class RADJAV_EXPORT GObjectBase
			{
				public:
					v8::Persistent<v8::Value> *createEvent(String event, v8::Local<v8::Function> function);

					#ifdef GUI_USE_WXWIDGETS
						void addNewEvent(String event, wxWindow *object, v8::Local<v8::Function> func);

						static void onClick(wxCommandEvent &event);
						static void onMouseEvent(wxMouseEvent &event);
						static void onKeyUp(wxKeyEvent &event);

						static v8::Local<v8::Value> executeEvent(
							v8::Persistent<v8::Value> *pevent, RJINT numArgs = 0, v8::Local<v8::Value> *args = NULL);
					#endif

				protected:
					HashMap<std::string, v8::Persistent<v8::Value> *> events;
			};
	}
}
#endif
#endif

