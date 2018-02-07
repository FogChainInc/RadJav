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
#ifndef _RADJAV_V8_OS_H_
	#define _RADJAV_V8_OS_H_

	#include "RadJavPreprocessor.h"

	#ifdef USE_V8
	#include <v8.h>

	namespace RadJAV
	{
		class RADJAV_EXPORT OS
		{
			public:
				static void createV8Callbacks(v8::Isolate *isolate, v8::Local<v8::Object> object);

				static void onReady(const v8::FunctionCallbackInfo<v8::Value> &args);
				static void openWebBrowserURL(const v8::FunctionCallbackInfo<v8::Value> &args);
				static void exec(const v8::FunctionCallbackInfo<v8::Value> &args);
				static void getDocumentsPath(const v8::FunctionCallbackInfo<v8::Value> &args);
				static void getTempPath(const v8::FunctionCallbackInfo<v8::Value> &args);
				static void getUserDataPath(const v8::FunctionCallbackInfo<v8::Value> &args);
				static void getApplicationPath(const v8::FunctionCallbackInfo<v8::Value> &args);
				static void getCurrentWorkingPath(const v8::FunctionCallbackInfo<v8::Value> &args);
				static void setCurrentWorkingPath(const v8::FunctionCallbackInfo<v8::Value> &args);
				static void saveFileAs(const v8::FunctionCallbackInfo<v8::Value> &args);
				static void openFileAs(const v8::FunctionCallbackInfo<v8::Value> &args);

				static v8::Persistent<v8::Value> *onReadyFunction;
		};
	}
	#endif
#endif

