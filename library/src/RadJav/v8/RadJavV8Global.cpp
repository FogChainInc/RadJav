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
#include "v8/RadJavV8Global.h"

#include "RadJav.h"
#include "RadJavString.h"

#ifdef USE_V8
	#include "v8/RadJavV8JavascriptEngine.h"
	#include "v8/RadJavV8IO.h"

	#ifdef GUI_USE_WXWIDGETS
		#include <wx/wx.h>
	#endif

namespace RadJAV
{
	void Global::createV8Callbacks(v8::Isolate *isolate, v8::Local<v8::Object> object)
	{
		V8_CALLBACK(object, "setTimeout", Global::setTimeout);
		V8_CALLBACK(object, "alert", Global::alert);
		V8_CALLBACK(object, "confirm", Global::confirm);
		V8_CALLBACK(object, "prompt", Global::prompt);
		V8_CALLBACK(object, "include", Global::include);
	}

	void Global::setTimeout(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		v8::Local<v8::Function> func = v8::Local<v8::Function>::Cast(args[0]);
		v8::Local<v8::Number> time = v8::Local<v8::Number>::Cast(args[1]);

		v8::Persistent<v8::Function> *persistent = RJNEW v8::Persistent<v8::Function>();

		persistent->Reset(V8_JAVASCRIPT_ENGINE->isolate, func);

		V8_JAVASCRIPT_ENGINE->addTimeout(persistent, time->Int32Value ());
	}

	void Global::alert(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String message = "";
		String title = "";

		v8::Local<v8::String> msg = v8::Local<v8::String>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 0));

		if (V8_JAVASCRIPT_ENGINE->v8IsNull(msg) == false)
			message = parseV8Value (msg);

		if (args.Length() > 1)
		{
			v8::Local<v8::String> tite = v8::Local<v8::String>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 1));

			if (V8_JAVASCRIPT_ENGINE->v8IsNull(tite) == false)
				title = parseV8Value (tite);
		}

		RadJav::showMessageBox(message, title);
	}

	void Global::confirm(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String message = "";
		String title = "";

		v8::Local<v8::String> msg = v8::Local<v8::String>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 0));

		if (V8_JAVASCRIPT_ENGINE->v8IsNull(msg) == false)
			message = parseV8Value (msg);

		if (args.Length() > 1)
		{
			v8::Local<v8::String> title2 = v8::Local<v8::String>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 1));

			if (V8_JAVASCRIPT_ENGINE->v8IsNull(title2) == false)
				title = parseV8Value (title2);
		}

		#ifdef GUI_USE_WXWIDGETS
			RJINT result = wxMessageBox(message.towxString(), title.towxString(), wxOK | wxCANCEL);
			RJBOOL output = false;

			if (result == wxOK)
				output = true;

			v8::Local<v8::Boolean> result2 = v8::Boolean::New(args.GetIsolate(), output);
		#endif

		args.GetReturnValue().Set(result2);
	}

	void Global::prompt(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String message = "";
		String title = "";
		String defaultArg = "";

		v8::Local<v8::String> msg = v8::Local<v8::String>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 0));

		if (V8_JAVASCRIPT_ENGINE->v8IsNull(msg) == false)
			message = parseV8Value(msg);

		if (args.Length() > 1)
		{
			v8::Local<v8::String> defaultArg2 = v8::Local<v8::String>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 1));

			if (V8_JAVASCRIPT_ENGINE->v8IsNull(defaultArg2) == false)
				defaultArg = parseV8Value(defaultArg2);
		}

		if (args.Length() > 2)
		{
			v8::Local<v8::String> title2 = v8::Local<v8::String>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 2));

			if (V8_JAVASCRIPT_ENGINE->v8IsNull(title2) == false)
				title = parseV8Value(title2);
		}

		#ifdef GUI_USE_WXWIDGETS
			String result = parsewxString (wxGetTextFromUser(message.towxString(), title.towxString(), defaultArg.towxString ()));

			v8::Local<v8::String> result2 = result.toV8String (args.GetIsolate ());
		#endif

		args.GetReturnValue().Set(result2);
	}

	void Global::include(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		v8::Local<v8::String> file = v8::Local<v8::String>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 0));

		if (V8_JAVASCRIPT_ENGINE->v8IsNull(file) == true)
		{
			V8_JAVASCRIPT_ENGINE->throwException("First argument when calling an include function cannot be empty!");

			return;
		}

		String path = parseV8Value (file);
		String contents = IO::TextFile::getFileContents(path);

		V8_JAVASCRIPT_ENGINE->executeScript(contents, path);

		v8::Local<v8::Function> _emptyResolve = V8_JAVASCRIPT_ENGINE->v8GetFunction(V8_RADJAV, "_emptyResolve");
		v8::Local<v8::Object> promise = V8_JAVASCRIPT_ENGINE->createPromise(args.This(), _emptyResolve);

		args.GetReturnValue().Set(promise);
	}

	void Global::collectGarbage(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		RadJav::javascriptEngine->collectGarbage();
	}

	void Global::exit(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		RJINT exitCode = 0;
		v8::Local<v8::Integer> exc = v8::Local<v8::Integer>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 0));

		if (V8_JAVASCRIPT_ENGINE->v8IsNull(exc) == false)
			exitCode = exc->Value();

		RadJav::javascriptEngine->exit (0);
	}
}
#endif

