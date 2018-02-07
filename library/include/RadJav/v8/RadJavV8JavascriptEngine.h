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
#ifndef _RADJAV_V8_JAVASCRIPT_ENGINE_H_
	#define _RADJAV_V8_JAVASCRIPT_ENGINE_H_

	#include "RadJavPreprocessor.h"

#ifdef USE_V8
	#include <v8.h>
	#include <v8-inspector.h>

	#include <libplatform/libplatform.h>

	#include <atomic>
	#include <mutex>

	#include "RadJavJavascriptEngine.h"

	#define V8_CALLBACK(context, functionName, function) context->Set(String(functionName).toV8String(isolate), \
												v8::Function::New(isolate, function, String(functionName).toV8String(isolate)));
	#define V8_JAVASCRIPT_ENGINE static_cast <V8JavascriptEngine *> (RadJav::javascriptEngine)
	#define V8_RADJAV V8_JAVASCRIPT_ENGINE->radJav->Get (V8_JAVASCRIPT_ENGINE->isolate)

	namespace RadJAV
	{
		/// The array buffer allocator used for V8.
		/*class RADJAV_EXPORT V8ArrayBufferAllocator: public v8::ArrayBuffer::Allocator
		{
			public:
				void *Allocate(size_t length);
				void *AllocateUninitialized(size_t length);
				void Free(void *data, size_t length);
		};*/

		/// V8 Inspector for debugging javascript applications.
		class RADJAV_EXPORT V8JSInspector: public v8_inspector::V8InspectorClient
		{
			public:
				V8JSInspector(v8::Isolate *isolate);

			protected:
				std::unique_ptr<v8_inspector::V8Inspector> client;
		};

		/// The V8 javascript engine.
		class RADJAV_EXPORT V8JavascriptEngine: public JavascriptEngine
		{
			public:
				V8JavascriptEngine();
				~V8JavascriptEngine();

				/// Start the inspector.
				void startInspector();

				/// Run an application.
				void runApplication(String applicationSource, String fileName);
				/// Run an application from a javascript file.
				void runApplicationFromFile(String file);
				/// Execute Javascript code.
				void executeScript(String code, String fileName);
				/// Execute Javascript code.
				void executeScript(String code, String fileName, v8::Local<v8::Object> context);
				/// Execute unbounded Javascript code.
				void unboundedExecuteScript(String code, String fileName, v8::Local<v8::Object> context = v8::Local<v8::Object>());
				/// Execute javascript on the next tick.
				void executeScriptNextTick(String code, String fileName, v8::Local<v8::Object> context = v8::Local<v8::Object>());
				/// Call a function on the next tick. Any args passed MUST be an array.
				void callFunctionOnNextTick(v8::Persistent<v8::Function> *func,
						v8::Persistent<v8::Array> *args = NULL, RJBOOL deleteOnComplete  = true);
				/// Connect the native library to the Javascript library.
				void loadNativeCode();

				/// Collect the garbage. This will only work if the engine is started with exposeGC = true.
				void collectGarbage();

				#ifdef C3D_USE_OGRE
					/// Start the 3d engine.
					void start3DEngine();
				#endif

				/// Add a timeout, process it.
				void addTimeout(v8::Persistent<v8::Function> *func, RJINT time);

				/// A blockchain event has occurred, process it.
				void blockchainEvent(String event, String dataType = "null", void *data = NULL);
				void blockchainEvent(String event, RJINT numargs, v8::Local<v8::Value> *args, RJBOOL alreadyEnteredCritialSection = false);

				/// Add a thread to be handled by the engine.
				void addThread(Thread *thread);
				/// Remove a thread.
				void removeThread(Thread *thread);
				/// Throw a Javascript exception.
				void throwException(String message);

				/// Shutdown the application entirely.
				void exit(RJINT exitCode);

				/// Get a V8 function.
				v8::Handle<v8::Function> v8GetFunction(v8::Local<v8::Object> context, String functionName);
				/// Get a V8 value.
				v8::Handle<v8::Value> v8GetValue(v8::Local<v8::Object> context, String functionName);
				/// Set a string.
				void v8SetString(v8::Local<v8::Object> context, String functionName, String str);
				/// Get a string from a V8 variable name. If the value is null or has an empty handle, an empty string will return.
				String v8GetString(v8::Local<v8::Object> context, String functionName);
				/// Set a number.
				void v8SetNumber(v8::Local<v8::Object> context, String functionName, RDECIMAL number);
				/// Get a V8 int. If the value is null or has an empty handle, 0 will be returned.
				RJINT v8GetInt(v8::Local<v8::Object> context, String functionName);
				/// Get a V8 decimal. If the value is null or has an empty handle, 0 will be returned.
				RDECIMAL v8GetDecimal(v8::Local<v8::Object> context, String functionName);
				/// Set a bool from a V8 boolean value.
				void v8SetBool(v8::Local<v8::Object> context, String functionName, bool value);
				/// Get a V8 bool. If the value is null or has an empty handle, false will be returned.
				RJBOOL v8GetBool(v8::Local<v8::Object> context, String functionName);
				/// Set a V8 object.
				void v8SetObject(v8::Local<v8::Object> context, String functionName, v8::Handle<v8::Object> obj);
				/// Get a V8 object.
				v8::Handle<v8::Object> v8GetObject(v8::Local<v8::Object> context, String functionName);
				/// Call a V8 function.
				v8::Local<v8::Value> v8CallFunction(
					v8::Local<v8::Object> context, String functionName, RJINT numArgs, v8::Local<v8::Value> *args);
				/// Call a V8 function as a constructor.
				v8::Local<v8::Object> v8CallAsConstructor(v8::Local<v8::Object> function, RJINT numArgs, v8::Local<v8::Value> *args);
				/// Get a V8 native object.
				void *v8GetExternal(v8::Local<v8::Object> context, String functionName);
				/// Set a V8 native object.
				void v8SetExternal(v8::Local<v8::Object> context, String functionName, void *obj);
				/// Get a V8 argument.
				v8::Handle<v8::Value> v8GetArgument(const v8::FunctionCallbackInfo<v8::Value> &args, RJUINT index);
				/// Set a V8 Value.
				void v8SetValue(v8::Local<v8::Object> context, String functionName, v8::Handle<v8::Value> obj);

				/// Checks if a V8 value is undefined, null, or if the handle is empty. Returns true if it is.
				bool v8IsNull(v8::Local<v8::Value> val);
				/// Get a bool value from a V8 value.
				RJBOOL v8ParseBool(v8::Local<v8::Value> val);
				/// Get an integer value from a V8 value.
				RJINT v8ParseInt(v8::Local<v8::Value> val);
				/// Get a decimal value from a V8 value.
				RDECIMAL v8ParseDecimal(v8::Local<v8::Value> val);

				// Create a promise.
				v8::Local<v8::Object> createPromise(v8::Local<v8::Function> function);
				// Create a promise.
				v8::Local<v8::Object> createPromise(
					v8::Local<v8::Object> context, v8::Local<v8::Function> function, v8::Local<v8::Array> args = v8::Local<v8::Array> ());

				/// Load the native templates into the javascript library.
				static void loadTemplates(const v8::FunctionCallbackInfo<v8::Value> &args);
				/// Run the event loop.
				static void runEventLoopSingleStep(const v8::FunctionCallbackInfo<v8::Value> &args);
				/// Run a script.
				static void runScript(const v8::FunctionCallbackInfo<v8::Value> &args);
				/// Destroy an object from v8.
				//static void destroyObject(const v8::WeakCallbackData<v8::Value, JSValue> &data);

				/// The persistent data being held.
				Array<v8::Persistent<v8::Value, v8::CopyablePersistentTraits<v8::Value> > *> persistentData;
				/// The V8 isolate.
				v8::Isolate *isolate;

				v8::Platform *platform;
				v8::Local<v8::Context> globalContext;
				v8::Persistent<v8::Object> *radJav;

				#ifdef GUI_USE_WXWIDGETS
					wxCriticalSection *criticalSection;
				#endif

			protected:
				Array<String> jsToExecuteNextCode;
				Array<String> jsToExecuteNextFilename;
				Array< v8::Local<v8::Object> > jsToExecuteNextContext;

				Array<v8::Persistent<v8::Function> *> funcNext;
				Array<v8::Persistent<v8::Array> *> funcNextArgs;
				Array<RJBOOL> funcDelete;

				Array<v8::Persistent<v8::Function> *> timeoutFuncs;
				Array<RJINT> timeouts;

				RJBOOL useInspector;
		};
	}
#endif
#endif
