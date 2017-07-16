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
#ifndef _RADJAV_V8_IO_H_
	#define _RADJAV_V8_IO_H_

	#include "RadJavPreprocessor.h"
	#include "RadJavString.h"

	#ifdef USE_V8
	#include <v8.h>

	namespace RadJAV
	{
		class RADJAV_EXPORT IO
		{
			public:
				static void createV8Callbacks(v8::Isolate *isolate, v8::Local<v8::Object> object);

				static void isDir(const v8::FunctionCallbackInfo<v8::Value> &args);
				static void isFile(const v8::FunctionCallbackInfo<v8::Value> &args);
				static void createDir(const v8::FunctionCallbackInfo<v8::Value> &args);
				static void deleteFile(const v8::FunctionCallbackInfo<v8::Value> &args);

				class RADJAV_EXPORT SerialComm
				{
					public:
						static const int oneStopBit;
						static const int one5StopBits;
						static const int twoStopBits;

						static const int noParity;
						static const int oddParity;
						static const int evenParity;
						static const int markParity;
						static const int spaceParity;

						static void createV8Callbacks(v8::Isolate *isolate, v8::Local<v8::Object> object);

						static void getPort(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getBaud(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getByteSize(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getStopBits(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getParity(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void open(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void isOpen(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void read(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void write(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void close(const v8::FunctionCallbackInfo<v8::Value> &args);
				};

				class RADJAV_EXPORT TextFile
				{
					public:
						static const RJINT read;
						static const RJINT write;
						static const RJINT append;

						static void createV8Callbacks(v8::Isolate *isolate, v8::Local<v8::Object> object);

						static void writeTextToFile(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void readEntireFile(const v8::FunctionCallbackInfo<v8::Value> &args);

						static void writeToTextFile(String path, String contents, RJINT outputType = IO::TextFile::write);
						static String getFileContents(String path);
				};
		};
	}
	#endif
#endif

