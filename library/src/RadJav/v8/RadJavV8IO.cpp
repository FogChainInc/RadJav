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
#include "v8/RadJavV8IO.h"

#include "RadJav.h"
#include "RadJavString.h"

#ifdef USE_V8
	#include "v8/RadJavV8JavascriptEngine.h"

namespace RadJAV
{
	RJINT IO::TextFile::read = 1;
	RJINT IO::TextFile::write = 2;
	RJINT IO::TextFile::append = 3;

	void IO::createV8Callbacks(v8::Isolate *isolate, v8::Local<v8::Object> object)
	{
		V8_CALLBACK(object, "isDir", IO::isDir);
		V8_CALLBACK(object, "isFile", IO::isFile);
		V8_CALLBACK(object, "mkdir", IO::createDir);
		V8_CALLBACK(object, "deleteFile", IO::deleteFile);
	}

	void IO::TextFile::createV8Callbacks(v8::Isolate *isolate, v8::Local<v8::Object> object)
	{
		V8_CALLBACK(object, "writeTextToFile", IO::TextFile::writeTextToFile);
		V8_CALLBACK(object, "readEntireFile", IO::TextFile::readEntireFile);
	}

	void IO::TextFile::writeTextToFile(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		v8::Local<v8::String> str = v8::Local<v8::String>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 0));

		if (V8_JAVASCRIPT_ENGINE->v8IsNull(str) == true)
		{
			V8_JAVASCRIPT_ENGINE->throwException("Filename cannot be null!");

			return;
		}

		v8::Local<v8::String> text = v8::Local<v8::String>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 1));
		RJINT fileType = IO::TextFile::write;

		if (args.Length() > 2)
		{
			v8::Local<v8::Integer> type = v8::Local<v8::Integer>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 2));
			fileType = type->Value();
		}

		String path = parseV8Value(str);
		String contents = parseV8Value(text);

		try
		{
			writeToTextFile(path, contents, fileType);
		}
		catch (Exception ex)
		{
			V8_JAVASCRIPT_ENGINE->throwException(ex.getMessage());

			return;
		}
	}

	void IO::TextFile::readEntireFile(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		v8::Local<v8::String> str = v8::Local<v8::String>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 0));

		if (V8_JAVASCRIPT_ENGINE->v8IsNull(str) == true)
		{
			V8_JAVASCRIPT_ENGINE->throwException("Filename cannot be null!");

			return;
		}

		String path = parseV8Value(str);
		String contents = "";

		try
		{
			contents = getFileContents(path);
		}
		catch (Exception ex)
		{
			V8_JAVASCRIPT_ENGINE->throwException(ex.getMessage ());

			return;
		}

		args.GetReturnValue().Set(contents.toV8String(V8_JAVASCRIPT_ENGINE->isolate));
	}

	void IO::isDir(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		v8::Local<v8::String> str = v8::Local<v8::String>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 0));

		if (V8_JAVASCRIPT_ENGINE->v8IsNull(str) == true)
		{
			V8_JAVASCRIPT_ENGINE->throwException("Path cannot be null!");

			return;
		}

		String path = parseV8Value(str);
		RJBOOL exists = false;
		
		#ifdef GUI_USE_WXWIDGETS
			exists = wxDirExists(path.towxString());
		#endif

		v8::Local<v8::Boolean> result = v8::Boolean::New(args.GetIsolate(), exists);

		args.GetReturnValue().Set(result);
	}

	void IO::isFile(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		v8::Local<v8::String> str = v8::Local<v8::String>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 0));

		if (V8_JAVASCRIPT_ENGINE->v8IsNull(str) == true)
		{
			V8_JAVASCRIPT_ENGINE->throwException("Path cannot be null!");

			return;
		}

		String path = parseV8Value(str);
		RJBOOL exists = false;
		
		#ifdef GUI_USE_WXWIDGETS
			exists = wxFileExists(path.towxString());
		#endif

		v8::Local<v8::Boolean> result = v8::Boolean::New(args.GetIsolate(), exists);

		args.GetReturnValue().Set(result);
	}

	void IO::createDir(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		v8::Local<v8::String> str = v8::Local<v8::String>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 0));

		if (V8_JAVASCRIPT_ENGINE->v8IsNull(str) == true)
		{
			V8_JAVASCRIPT_ENGINE->throwException("Path cannot be null!");

			return;
		}

		String path = parseV8Value(str);

		#ifdef GUI_USE_WXWIDGETS
			wxMkDir(path.towxString(), wxS_DIR_DEFAULT);
			//if (wxMkDir(path.towxString ()) == false)
				//V8_JAVASCRIPT_ENGINE->throwException("Unable to create directory.");
		#endif
	}

	void IO::deleteFile(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		v8::Local<v8::String> str = v8::Local<v8::String>::Cast(V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 0));

		if (V8_JAVASCRIPT_ENGINE->v8IsNull(str) == true)
		{
			V8_JAVASCRIPT_ENGINE->throwException("Filename cannot be null!");

			return;
		}

		String path = parseV8Value(str);

		#ifdef GUI_USE_WXWIDGETS
			wxRemoveFile(path.towxString());
			//if (wxRemoveFile(path.towxString()) == false)
				//V8_JAVASCRIPT_ENGINE->throwException("Unable to delete file.");
		#endif
	}

	void IO::TextFile::writeToTextFile (String path, String contents, RJINT outputType)
	{
		RJINT type = std::ios_base::out;

		if (outputType == IO::TextFile::append)
			type = std::ios_base::app;

		std::fstream file(path, type);
		file.write(contents.c_str (), contents.size ());
		file.close();
	}

	String IO::TextFile::getFileContents(String path)
	{
		std::fstream file(path, std::ios_base::in);
		String contents = "";

		if (file.is_open() == false)
			throw Exception ("Unable to open file: " + path);

		while (file.good() == true)
		{
			char cChar = file.get();

			if (file.good() == false)
				break;

			contents += cChar;
		}

		file.close();

		return (contents);
	}
}
#endif

