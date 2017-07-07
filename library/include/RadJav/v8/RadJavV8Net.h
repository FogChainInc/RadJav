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
#ifndef _RADJAV_V8_NET_H_
	#define _RADJAV_V8_NET_H_

	#include "RadJavPreprocessor.h"
	#include "RadJavString.h"
	#include "RadJavThread.h"

	#ifdef GUI_USE_WXWIDGETS
		#include <wx/wx.h>
	#endif

	#ifdef USE_V8
		#include <v8.h>

		namespace RadJAV
		{
			class RADJAV_EXPORT Net
			{
				public:
					static void createV8Callbacks(v8::Isolate *isolate, v8::Local<v8::Object> object);

					static void httpRequest(const v8::FunctionCallbackInfo<v8::Value> &args);
					static void completeHttpRequest(const v8::FunctionCallbackInfo<v8::Value> &args);

					static RJINT curlWrite(RJCHAR *data, RJUINT size, RJUINT nmemb, String *output);
			};

			#ifdef GUI_USE_WXWIDGETS
				class RADJAV_EXPORT HttpThread: public Thread
				{
					public:
						HttpThread(String uri, RJLONG timeout, v8::Persistent<v8::Function> *resolvep);

						wxThread::ExitCode Entry();

						RJLONG timeout;
						String uri;
						v8::Persistent<v8::Function> *resolvep;
				};
			#endif
		}
	#endif
#endif

