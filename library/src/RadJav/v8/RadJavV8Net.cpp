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
#include "v8/RadJavV8Net.h"

#include "RadJav.h"
#include "RadJavString.h"

#ifdef HTTP_USE_CURL
	#include <curl/curl.h>
#endif

#ifdef USE_V8
	#include "v8/RadJavV8JavascriptEngine.h"

namespace RadJAV
{
	void Net::createV8Callbacks(v8::Isolate *isolate, v8::Local<v8::Object> object)
	{
		V8_CALLBACK(object, "httpRequest", Net::httpRequest);
	}

	void Net::httpRequest(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		v8::Local<v8::Value> uri = V8_JAVASCRIPT_ENGINE->v8GetArgument (args, 0);
		v8::Local<v8::Value> timeout = V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 1);

		v8::MaybeLocal<v8::Function> func = v8::Function::New(args.This ()->CreationContext (), Net::completeHttpRequest);
		v8::Local<v8::Function> func2 = func.ToLocalChecked();

		v8::Local<v8::Array> ary = v8::Array::New (args.GetIsolate ());
		ary->Set(0, uri);

		if (timeout.IsEmpty() == false)
		{
			if ((timeout->IsNull() == false) && (timeout->IsUndefined () == false))
				ary->Set(1, timeout);
		}

		v8::Local<v8::Object> promise = V8_JAVASCRIPT_ENGINE->createPromise(args.This(), func2, ary);

		args.GetReturnValue().Set(promise);
	}

	void Net::completeHttpRequest(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		v8::Local<v8::Function> resolve = v8::Local<v8::Function>::Cast (V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 0));
		v8::Local<v8::Function> reject = v8::Local<v8::Function>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 1));
		v8::Local<v8::Array> ary = v8::Local<v8::Array>::Cast (V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 2));
		String uri = parseV8Value(ary->Get(0));
		v8::Local<v8::Integer> timeout;
		RJLONG timeoutValue = 10;
		v8::Persistent<v8::Function> *resolvep = RJNEW v8::Persistent<v8::Function>();

		resolvep->Reset(args.GetIsolate (), resolve);

		if (ary->Length() > 1)
		{
			timeout = v8::Local<v8::Integer>::Cast(ary->Get(1));
			timeoutValue = timeout->Value ();
		}

		HttpThread *thread = RJNEW HttpThread(uri, timeoutValue, resolvep);
		V8_JAVASCRIPT_ENGINE->addThread (thread);
	}

	RJINT Net::curlWrite(RJCHAR *data, RJUINT size, RJUINT nmemb, String *output)
	{
		if (output == NULL)
			return (0);

		output->append(data, (size * nmemb));

		return (size * nmemb);
	}

	#ifdef GUI_USE_WXWIDGETS
	HttpThread::HttpThread(String uri, RJLONG timeout, v8::Persistent<v8::Function> *resolvep)
		: Thread ()
	{
		this->uri = uri;
		this->timeout = timeout;
		this->resolvep = resolvep;
	}

	wxThread::ExitCode HttpThread::Entry()
	{
		String *str = NULL;

		#ifdef HTTP_USE_CURL
			CURL *curl = curl_easy_init();

			if (curl != NULL)
			{
				str = RJNEW String();
				curl_easy_setopt(curl, CURLOPT_URL, uri.c_str());
				curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, true);
				curl_easy_setopt(curl, CURLOPT_WRITEDATA, str);
				curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, Net::curlWrite);
				curl_easy_setopt(curl, CURLOPT_CONNECTTIMEOUT, timeout);
				CURLcode result = curl_easy_perform(curl);
			}

			curl_easy_cleanup(curl);
		#endif

		RJINT numArgs = 0;
		v8::Persistent<v8::Array> *results = NULL;

		if (str != NULL)
		{
			numArgs = 1;
			results = RJNEW v8::Persistent<v8::Array> ();
			v8::Local<v8::Array> ary = v8::Array::New(V8_JAVASCRIPT_ENGINE->isolate);
			ary->Set(0, str->toV8String (V8_JAVASCRIPT_ENGINE->isolate));
			results->Reset(V8_JAVASCRIPT_ENGINE->isolate, ary);
		}

		V8_JAVASCRIPT_ENGINE->callFunctionOnNextTick(resolvep, results);

		DELETEOBJ(str);
		V8_JAVASCRIPT_ENGINE->removeThread(this);

		return (0);
	}
	#endif
}
#endif

