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
#include "v8/RadJavV8Console.h"

#include "RadJav.h"
#include "RadJavString.h"

#ifdef USE_V8
	#include "v8/RadJavV8JavascriptEngine.h"

namespace RadJAV
{
	void Console::createV8Callbacks(v8::Isolate *isolate, v8::Local<v8::Object> object, RJBOOL isNativeConsole)
	{
		if (isNativeConsole == true)
		{
			V8_CALLBACK(object, "log", Console::println);
		}
		else
		{
			V8_CALLBACK(object, "print", Console::print);
			V8_CALLBACK(object, "println", Console::println);
		}
	}

	void Console::print(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		v8::Local<v8::String> str = v8::Local<v8::String>::Cast (V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 0));

		if (V8_JAVASCRIPT_ENGINE->v8IsNull(str) == true)
			return;

		RadJav::printToOutputWindow(parseV8Value (str));
	}

	void Console::println(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		v8::Local<v8::String> str = v8::Local<v8::String>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 0));

		if (V8_JAVASCRIPT_ENGINE->v8IsNull(str) == true)
			return;

		RadJav::printToOutputWindow(parseV8Value(str) + "\n");
	}
}
#endif

