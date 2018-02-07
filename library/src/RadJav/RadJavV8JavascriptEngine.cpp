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
#include "RadJavV8JavascriptEngine.h"

#include "RadJav.h"
#include "RadJavException.h"
#include "RadJavJSObject.h"

#include "RadJavJavascriptCode.h"

#ifdef USE_V8
	#include <fstream>
#endif

#include <cstring>

namespace RadJAV
{
	#ifdef USE_V8
		/*void *V8ArrayBufferAllocator::Allocate(size_t length)
		{
			void *data = AllocateUninitialized (length);

			if (data != NULL)
				data = std::memset(data, 0, length);

			return (data);
		}

		void *V8ArrayBufferAllocator::AllocateUninitialized(size_t length)
		{
			return (malloc (length));
		}

		void V8ArrayBufferAllocator::Free(void *data, size_t length)
		{
			free (data);
		}*/

		V8JavascriptEngine::V8JavascriptEngine ()
			: JavascriptEngine ()
		{
			v8::V8::InitializeICU ();
			String flags = "";
			exposeGC = false;

			if (RadJav::arguments.size() > 0)
			{
				for (unsigned int iIdx = 0; iIdx < RadJav::arguments.size(); iIdx++)
				{
					String endSpace = " ";

					if (iIdx == (RadJav::arguments.size() - 1))
						endSpace = "";

					String arg = RadJav::arguments.at(iIdx);

					if (arg == "--expose_gc")
						exposeGC = true;

					flags += arg + endSpace;
				}
			}

			v8::V8::SetFlagsFromString (flags.c_str (), flags.size ());
			v8::V8::InitializeExternalStartupData ("");
			platform = v8::platform::CreateDefaultPlatform();
			v8::V8::InitializePlatform (platform);
			v8::V8::Initialize ();

			v8::Isolate::CreateParams createParams;
			//V8ArrayBufferAllocator allocator;
			//createParams.array_buffer_allocator = &allocator;
			createParams.array_buffer_allocator = v8::ArrayBuffer::Allocator::NewDefaultAllocator ();

			isolate = v8::Isolate::New(createParams);
		}

		V8JavascriptEngine::~V8JavascriptEngine ()
		{
			v8::Unlocker unlocker(isolate);
			isolate->Dispose ();
			v8::V8::Dispose ();
			v8::V8::ShutdownPlatform ();

			DELETEOBJ (platform);
		}

		void V8JavascriptEngine::runApplication(String applicationSource, String fileName)
		{
			v8::Locker locker(isolate);
			v8::Isolate::Scope scope(isolate);
			v8::HandleScope handleScope(isolate);

			v8::Local<v8::ObjectTemplate> global = v8::ObjectTemplate::New(isolate);
			global->Set(v8::String::NewFromUtf8(isolate, "_loadTemplates"),
				v8::FunctionTemplate::New(isolate, loadTemplates));
			globalContext = v8::Context::New(isolate, NULL, global);
			v8::Context::Scope contextScope(globalContext);

			// Insert the javascript library to be used.
			executeScript(getJavascriptLibrary(), "RadJavJavascriptEngine.cpp");

			// Execute the application's javascript.
			executeScript(applicationSource, fileName);

			while (true)
			{
				v8::platform::PumpMessageLoop (platform, isolate);
				RadJav::runEventLoopSingleStep();
			}
		}

		void V8JavascriptEngine::executeScript(String code, String fileName, JSValue *context)
		{
			v8::Local<v8::Context> scriptContext;
			v8::EscapableHandleScope scope (isolate);

			if (context == NULL)
				scriptContext = globalContext;
			else
			{
				if (context->type == JSDataType::Context)
					scriptContext = *(v8::Local<v8::Context> *)context->additionalData;

				if (context->type == JSDataType::Function)
				{
					v8::Local<v8::Function> func = v8::Local<v8::Function>::Cast (context->result);
					scriptContext = func->CreationContext();
				}

				if (context->type == JSDataType::Object)
				{
					v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast (((JSObject *)context)->object);
					scriptContext = obj->CreationContext ();
				}
			}

			v8::TryCatch tryCatch(isolate);
			v8::ScriptOrigin origin(fileName.toV8String (isolate));
			v8::MaybeLocal<v8::Script> scriptTemp = v8::Script::Compile(scriptContext, code.toV8String(isolate), &origin);

			if (scriptTemp.IsEmpty() == true)
			{
				v8::Local<v8::Value> exception = tryCatch.Exception();
				v8::Local<v8::Value> stackTrace = tryCatch.StackTrace();
				String exceptionStr = parseV8Value(exception);
				String stackTraceStr = parseV8Value(stackTrace);

				throw RadJAV::Exception("Compiling Javascript error: " + exceptionStr + stackTraceStr);
			}

			v8::Local<v8::Script> script = scriptTemp.ToLocalChecked();
			v8::MaybeLocal<v8::Value> result = script->Run(scriptContext);

			if (result.IsEmpty() == true)
			{
				v8::Local<v8::Value> exception = tryCatch.Exception();
				v8::Local<v8::Value> stackTrace = tryCatch.StackTrace();
				String exceptionStr = parseV8Value(exception);
				String stackTraceStr = parseV8Value(stackTrace);

				throw RadJAV::Exception("Executing Javascript error: " + exceptionStr + stackTraceStr);
			}

			scope.Escape (result.ToLocalChecked ());
		}

		void V8JavascriptEngine::unboundedExecuteScript(String code, String fileName, JSValue *context)
		{
			v8::Local<v8::Context> scriptContext;

			if (context == NULL)
				scriptContext = globalContext;
			else
			{
				if (context->type == JSDataType::Context)
					scriptContext = *(v8::Local<v8::Context> *)context->additionalData;

				if (context->type == JSDataType::Function)
				{
					v8::Local<v8::Function> func = v8::Local<v8::Function>::Cast (context->result);
					scriptContext = func->CreationContext();
				}

				if (context->type == JSDataType::Object)
				{
					v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(((JSObject *)context)->object);
					scriptContext = obj->CreationContext();
				}
			}

			v8::TryCatch tryCatch(isolate);
			v8::ScriptOrigin origin(fileName.toV8String(isolate));
			v8::MaybeLocal<v8::Script> scriptTemp = v8::Script::Compile(scriptContext, code.toV8String(isolate), &origin);

			if (scriptTemp.IsEmpty() == true)
			{
				v8::Local<v8::Value> exception = tryCatch.Exception();
				String exceptionStr = parseV8Value(exception);

				throw RadJAV::Exception("Compiling Javascript error: " + exceptionStr);
			}

			v8::Local<v8::Script> script = scriptTemp.ToLocalChecked();
			v8::Local<v8::UnboundScript> unboundScript = script->GetUnboundScript();
			v8::Local<v8::Script> script2 = unboundScript->BindToCurrentContext();
			v8::MaybeLocal<v8::Value>result = script2->Run(scriptContext);

			if (result.IsEmpty() == true)
			{
				v8::Local<v8::Value> exception = tryCatch.Exception();
				String exceptionStr = parseV8Value(exception);

				throw RadJAV::Exception("Executing Javascript error: " + exceptionStr);
			}
			/*v8::Local<v8::Context> scriptContext;

			if (context == NULL)
				scriptContext = globalContext;
			else
			{
				if (context->resultType == "Context")
					scriptContext = *(v8::Local<v8::Context> *)context->result;

				if (context->resultType == "Function")
				{
					v8::Local<v8::Function> func = *(v8::Local<v8::Function> *)context->result;
					scriptContext = func->CreationContext();
				}

				if (context->resultType == "Object")
				{
					v8::Local<v8::Object> obj = *(v8::Local<v8::Object> *)context->result;
					scriptContext = obj->CreationContext();
				}
			}

			v8::TryCatch tryCatch(isolate);
			v8::ScriptOrigin origin(fileName.toV8String(isolate));
			v8::ScriptCompiler::Source source(code.toV8String(isolate), origin);
			v8::ScriptCompiler::CompileOptions options = v8::ScriptCompiler::kNoCompileOptions;
			v8::MaybeLocal<v8::UnboundScript> unboundScript = v8::ScriptCompiler::CompileUnboundScript (isolate, &source, options);

			if (unboundScript.IsEmpty() == true)
			{
				v8::Local<v8::Value> exception = tryCatch.Exception();
				String exceptionStr = parseV8Value(exception);

				throw RadJAV::Exception("Compiling Javascript error: " + exceptionStr);
			}

			v8::Local<v8::UnboundScript> unboundScriptLocalChecked = unboundScript.ToLocalChecked();
			v8::Local<v8::Script> script = unboundScriptLocalChecked->BindToCurrentContext ();

			v8::MaybeLocal<v8::Value>result = script->Run(scriptContext);

			if (result.IsEmpty() == true)
			{
				v8::Local<v8::Value> exception = tryCatch.Exception();
				String exceptionStr = parseV8Value(exception);

				throw RadJAV::Exception("Executing Javascript error: " + exceptionStr);
			}*/
		}

		void V8JavascriptEngine::setVariable(JSValue *variable, String propertyName, JSValue *value)
		{
			v8::Local<v8::Value> var;

			if (variable == NULL)
				var = globalContext->Global();
			else
				var = variable->toV8Object(isolate);

			if (var.IsEmpty() == true)
				return;

			v8::Local<v8::Value> val = value->convertToV8Value(isolate);

			if (variable->type == JSDataType::Object)
			{
				v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast (var);
				obj->Set(propertyName.toV8String(isolate), val);
			}
		}

		String V8JavascriptEngine::getVariableAsString(JSValue *variable, String propertyName)
		{
			JSValue *value = getVariable(variable, propertyName);
			String str = value->toString();

			DELETEOBJ(value);

			return (str);
		}

		JSValue *V8JavascriptEngine::getVariable(JSValue *variable, String propertyName)
		{
			v8::Local<v8::Value> value = getV8Value (variable, propertyName);
			JSValue *retVal = JSValue::fromV8Value(value, RadJav::javascriptEngine);

			return (retVal);
		}

		v8::Local<v8::Value> V8JavascriptEngine::getV8Value(JSValue *variable, String propertyName)
		{
			v8::Local<v8::Object> obj;

			if (variable == NULL)
				obj = globalContext->Global();
			else
				obj = variable->toV8Object(isolate);

			v8::Local<v8::Value> value;

			if (propertyName != "")
			{
				String nextProperty = propertyName;
				int prevPos = 0;

				while (true)
				{
					size_t pos = propertyName.find(".", prevPos);

					if (pos == String::npos)
					{
						String substrTemp = propertyName.substr(prevPos, String::npos);
						nextProperty = substrTemp;

						break;
					}

					String substr = propertyName.substr(prevPos, (pos - prevPos));
					nextProperty = substr;
					v8::Local<v8::Value> val = obj->Get(substr.toV8String(isolate));

					if (val->IsUndefined () == true)
						throw RadJAV::Exception("Unable to find property " + substr);

					v8::Local<v8::Object> obj2 = v8::Local<v8::Object>::Cast(val);
					obj = obj2;

					prevPos = (pos + 1);
				}

				value = obj->Get(nextProperty.toV8String(isolate));

				if (value->IsUndefined() == true)
					throw RadJAV::Exception("Unable to find property " + nextProperty);
			}
			else
				value = obj;

			return (value);
		}

		JSValue *V8JavascriptEngine::getJSEngineVariable(JSValue *variable, String propertyName)
		{
			v8::Local<v8::Value> value = getV8Value(variable, propertyName);
			JSDataType type = JSDataType::Null;

			if (value->IsBoolean() == true)
				type = JSDataType::Boolean;

			if (value->IsInt32() == true)
				type = JSDataType::Integer;

			if (value->IsNumber() == true)
				type = JSDataType::Number;

			if (value->IsString () == true)
				type = JSDataType::String;

			if (value->IsFunction() == true)
				type = JSDataType::Function;
			else
			{
				if (value->IsObject() == true)
					type = JSDataType::Object;
			}

			JSValue *retVal = RJNEW JSValue (value, type);

			return (retVal);
		}

		JSValue *V8JavascriptEngine::callFunction(JSValue *variable, String functionName, JSArguments *args)
		{
			v8::Local<v8::Context> callContext = globalContext;
			v8::Local<v8::Value> recv = callContext->Global();

			if (functionName != "")
			{
				if (variable != NULL)
					recv = variable->toV8Value();
			}

			v8::Local<v8::Value> val = getV8Value(variable, functionName);
			v8::Local<v8::Function> func = v8::Local<v8::Function>::Cast(val);
			unsigned int numArgs = 0;
			v8::Local<v8::Value> *args2 = NULL;

			if (args != NULL)
			{
				numArgs = args->size();
				args2 = RJNEW v8::Local<v8::Value>[numArgs];

				for (unsigned int iIdx = 0; iIdx < numArgs; iIdx++)
				{
					JSValue *arg = args->at(iIdx);
					args2[iIdx] = arg->convertToV8Value(isolate);
				}
			}
			else
				args2 = RJNEW v8::Local<v8::Value>[numArgs];

			v8::Local<v8::Value> result = func->Call (recv, numArgs, args2);

			DELETEARRAY (args2);

			JSValue *jsval = JSValue::fromV8Value(result, RadJav::javascriptEngine);

			return (jsval);
		}

		JSValue *V8JavascriptEngine::callAsConstructor(JSValue *variable, JSArguments *args)
		{
			v8::Local<v8::Context> callContext = globalContext;
			v8::Local<v8::Value> recv = callContext->Global();

			v8::Local<v8::Value> val = variable->convertToV8Value (isolate);
			v8::Local<v8::Function> func = v8::Local<v8::Function>::Cast(val);
			unsigned int numArgs = 0;
			v8::Local<v8::Value> *args2 = NULL;

			if (args != NULL)
			{
				numArgs = args->size();
				args2 = RJNEW v8::Local<v8::Value>[numArgs];

				for (unsigned int iIdx = 0; iIdx < numArgs; iIdx++)
				{
					JSValue *arg = args->at(iIdx);
					args2[iIdx] = arg->convertToV8Value(isolate);
				}
			}
			else
				args2 = RJNEW v8::Local<v8::Value>[numArgs];

			v8::Local<v8::Value> result = func->CallAsConstructor (numArgs, args2);

			DELETEARRAY (args2);

			JSValue *jsval = JSValue::fromV8Value(result, RadJav::javascriptEngine, true);

			return (jsval);
		}

		void V8JavascriptEngine::runApplicationFromFile(String file)
		{
			std::fstream appFile;

			appFile.open(file.c_str (), std::ios_base::in);

			if (appFile.is_open() == false)
				throw RadJAV::Exception ("Unable to open file: " + file);

			String content = "";

			while (appFile.good() == true)
			{
				char cChar = appFile.get();

				if (appFile.good() == false)
					break;

				content += cChar;
			}

			if (content != "")
				runApplication (content, file);
		}

		void V8JavascriptEngine::loadNativeCode()
		{
			globalContext->Global()->Set(String ("alert").toV8String (isolate),
				v8::Function::New(isolate, calledFunction, String("alert").toV8String(isolate)));
			globalContext->Global()->Set(String("include").toV8String(isolate),
				v8::Function::New(isolate, calledFunction, String("include").toV8String(isolate)));

			if (exposeGC == true)
			{
				globalContext->Global()->Set(String("collectGarbage").toV8String(isolate),
					v8::Function::New(isolate, calledFunction, String("collectGarbage").toV8String(isolate)));
			}

			// RadJav
			{
				v8::Handle<v8::Value> radJav = globalContext->Global()->Get(String("RadJav").toV8String(isolate));
				v8::Handle<v8::Function> radJavFunc = v8::Handle<v8::Function>::Cast(radJav);

				// OS
				{
					v8::Local<v8::Value> radJavOS = radJavFunc->Get(String("OS").toV8String(isolate));
					v8::Local<v8::Function> radJavOSFunc = v8::Local<v8::Function>::Cast(radJavOS);

					radJavOSFunc->Set(String("onReady").toV8String(isolate),
						v8::Function::New(isolate, calledFunction, String("onReady").toV8String(isolate)));
				}

				// GUI
				{
					v8::Local<v8::Value> radJavGUI = radJavFunc->Get(String("GUI").toV8String(isolate));
					v8::Local<v8::Function> radJavGUIFunc = v8::Local<v8::Function>::Cast(radJavGUI);

					// GObject
					{
						v8::Local<v8::Value> radJavGUIGObject = radJavGUIFunc->Get(String("GObject").toV8String(isolate));
						v8::Local<v8::Function> radJavGUIGObjectFunc = v8::Local<v8::Function>::Cast(radJavGUIGObject);
						v8::Local<v8::Value> radJavGUIGObjectPrototype = radJavGUIGObjectFunc->Get(String("prototype").toV8String(isolate));
						v8::Local<v8::Object> radJavGUIGObjectPrototypeFunc = v8::Local<v8::Object>::Cast(radJavGUIGObjectPrototype);

						radJavGUIGObjectPrototypeFunc->Set(String("create").toV8String(isolate),
							v8::Function::New(isolate, calledFunction, String("create").toV8String(isolate)));
						radJavGUIGObjectPrototypeFunc->Set(String("setFont").toV8String(isolate),
							v8::Function::New(isolate, calledFunction, String("setFont").toV8String(isolate)));
						radJavGUIGObjectPrototypeFunc->Set(String("getFont").toV8String(isolate),
							v8::Function::New(isolate, calledFunction, String("getFont").toV8String(isolate)));
						radJavGUIGObjectPrototypeFunc->Set(String("setVisibility").toV8String(isolate),
							v8::Function::New(isolate, calledFunction, String("setVisibility").toV8String(isolate)));
						radJavGUIGObjectPrototypeFunc->Set(String("getVisibility").toV8String(isolate),
							v8::Function::New(isolate, calledFunction, String("getVisibility").toV8String(isolate)));
						radJavGUIGObjectPrototypeFunc->Set(String("setText").toV8String(isolate),
							v8::Function::New(isolate, calledFunction, String("setText").toV8String(isolate)));
						radJavGUIGObjectPrototypeFunc->Set(String("getText").toV8String(isolate),
							v8::Function::New(isolate, calledFunction, String("getText").toV8String(isolate)));
						radJavGUIGObjectPrototypeFunc->Set(String("setPosition").toV8String(isolate),
							v8::Function::New(isolate, calledFunction, String("setPosition").toV8String(isolate)));
						radJavGUIGObjectPrototypeFunc->Set(String("getPosition").toV8String(isolate),
							v8::Function::New(isolate, calledFunction, String("getPosition").toV8String(isolate)));
						radJavGUIGObjectPrototypeFunc->Set(String("getX").toV8String(isolate),
							v8::Function::New(isolate, calledFunction, String("getX").toV8String(isolate)));
						radJavGUIGObjectPrototypeFunc->Set(String("getY").toV8String(isolate),
							v8::Function::New(isolate, calledFunction, String("getY").toV8String(isolate)));
						radJavGUIGObjectPrototypeFunc->Set(String("setSize").toV8String(isolate),
							v8::Function::New(isolate, calledFunction, String("setSize").toV8String(isolate)));
						radJavGUIGObjectPrototypeFunc->Set(String("getSize").toV8String(isolate),
							v8::Function::New(isolate, calledFunction, String("getSize").toV8String(isolate)));
						radJavGUIGObjectPrototypeFunc->Set(String("getWidth").toV8String(isolate),
							v8::Function::New(isolate, calledFunction, String("getWidth").toV8String(isolate)));
						radJavGUIGObjectPrototypeFunc->Set(String("getHeight").toV8String(isolate),
							v8::Function::New(isolate, calledFunction, String("getHeight").toV8String(isolate)));
						radJavGUIGObjectPrototypeFunc->Set(String("on").toV8String(isolate),
							v8::Function::New(isolate, calledFunction, String("on").toV8String(isolate)));
						radJavGUIGObjectPrototypeFunc->Set(String("_createAppObj").toV8String(isolate),
							v8::Function::New(isolate, calledFunction, String("_createAppObj").toV8String(isolate)));
					}
				}

				// Console
				{
					v8::Local<v8::Value> radJavConsole = radJavFunc->Get(String("Console").toV8String(isolate));
					v8::Local<v8::Function> radJavConsoleFunc = v8::Local<v8::Function>::Cast(radJavConsole);

					v8::Local<v8::Array> desc = v8::Array::New(isolate, 3);
					desc->Set(0, String("RadJav").toV8String(isolate));
					desc->Set(1, String("Console").toV8String(isolate));
					desc->Set(2, String("print").toV8String(isolate));
					radJavConsoleFunc->Set(String("print").toV8String(isolate),
						v8::Function::New(isolate, calledFunction, desc));

					v8::Local<v8::Array> desc2 = v8::Array::New(isolate, 3);
					desc2->Set(0, String("RadJav").toV8String(isolate));
					desc2->Set(1, String("Console").toV8String(isolate));
					desc2->Set(2, String("println").toV8String(isolate));
					radJavConsoleFunc->Set(String("println").toV8String(isolate),
						v8::Function::New(isolate, calledFunction, desc2));
				}

				// IO
				{
					v8::Local<v8::Value> radJavIO = radJavFunc->Get(String("IO").toV8String(isolate));
					v8::Local<v8::Function> radJavIOFunc = v8::Local<v8::Function>::Cast(radJavIO);

					/// TextFile
					{
						v8::Local<v8::Value> radJavIOTextFile = radJavIOFunc->Get(String("TextFile").toV8String(isolate));
						v8::Local<v8::Function> radJavIOTextFileFunc = v8::Local<v8::Function>::Cast(radJavIOTextFile);

						v8::Local<v8::Array> desc3 = v8::Array::New(isolate, 4);
						desc3->Set(0, String("RadJav").toV8String(isolate));
						desc3->Set(1, String("IO").toV8String(isolate));
						desc3->Set(2, String("TextFile").toV8String(isolate));
						desc3->Set(3, String("readEntireFile").toV8String(isolate));
						radJavIOTextFileFunc->Set(String("readEntireFile").toV8String(isolate),
							v8::Function::New(isolate, calledFunction, desc3));
					}
				}
			}
		}

		void V8JavascriptEngine::loadTemplates(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			static_cast <V8JavascriptEngine *> (RadJav::javascriptEngine)->loadNativeCode();
		}

		void V8JavascriptEngine::runEventLoopSingleStep(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			V8JavascriptEngine *jsEngine = static_cast <V8JavascriptEngine *> (RadJav::javascriptEngine);

			while (true)
			{
				v8::platform::PumpMessageLoop(jsEngine->platform, jsEngine->isolate);
				RadJav::runEventLoopSingleStep();
			}
		}

		void V8JavascriptEngine::runScript(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			V8JavascriptEngine *jsEngine = static_cast <V8JavascriptEngine *> (RadJav::javascriptEngine);
			String applicationSource = parseV8Value (args[0]);
			String fileName = parseV8Value(args[1]);

			jsEngine->unboundedExecuteScript (applicationSource, fileName);
		}

		JSValue *V8JavascriptEngine::getNativeObject(JSValue *variable, String propertyName)
		{
			v8::Local<v8::Object> obj = variable->toV8Object(isolate);
			v8::Local<v8::Value> var = obj->Get(propertyName.toV8String (isolate));
			JSValue *found = NULL;

			if (var->IsNull () == false)
			{
				v8::Local<v8::Object> varObj = v8::Local<v8::Object>::Cast (var);
				v8::Local<v8::Value> val = varObj->Get(String("_appObj").toV8String(isolate));

				if (val.IsEmpty() == false)
				{
					v8::Local<v8::External> external = v8::Local<v8::External>::Cast(val);
					found = RJNEW JSValue(external->Value(), JSDataType::Native);
				}
			}


			return (found);
		}

		JSValue *V8JavascriptEngine::createPromise(JSValue *context, JSValue *function)
		{
			JSValue *newPromise = getJSEngineVariable(NULL, "Promise");
			JSValue *keepContext = getJSEngineVariable(NULL, "RadJav.keepContext");
			JSArguments *args2 = RJNEW JSArguments();
			args2->addArgument(function);
			args2->addArgument(context);
			args2->deleteArgs = false;
			JSValue *newContext = callFunction(keepContext, "", args2);
			JSArguments *args3 = RJNEW JSArguments();
			args3->addArgument(newContext);
			JSValue *promise = callAsConstructor(newPromise, args3);

			DELETEOBJ(args2);
			DELETEOBJ(args3);
			DELETEOBJ(keepContext);
			DELETEOBJ(newPromise);

			return (promise);
		}

		JSValue *V8JavascriptEngine::getJSValueFromV8Value(v8::Local<v8::Value> value)
		{
			JSValue *val = NULL;
			bool hasFound = false;

			if (value->IsBoolean() == true)
				val = RJNEW JSValue (RadJav::javascriptEngine, value->BooleanValue());

			if (value->IsInt32() == true)
			{
				val = RJNEW JSValue(RadJav::javascriptEngine, (int)value->IntegerValue());
				hasFound = true;
			}

			if ((value->IsNumber() == true) && (hasFound == false))
				val = RJNEW JSValue (RadJav::javascriptEngine, (RDECIMAL)value->NumberValue());

			if (value->IsString() == true)
				val = RJNEW JSValue(RadJav::javascriptEngine, parseV8Value(value));

			if (value->IsFunction() == true)
			{
				v8::Local<v8::Function> func = v8::Local<v8::Function>::Cast(value);
				v8::Local<v8::Array> properties = func->GetOwnPropertyNames();
				bool isFunction = false;

				if (properties.IsEmpty() == true)
					isFunction = true;

				if (properties.IsEmpty() == false)
				{
					if (properties->Length() < 1)
						isFunction = true;
				}

				if (isFunction == true)
					val = RJNEW JSValue (func, JSDataType::Function);
			}

			if ((value->IsObject() == true) && (val == NULL))
			{
				JSObject *jsobj = RJNEW JSObject(RadJav::javascriptEngine);
				jsobj->result = value;
				val = RJNEW JSValue(jsobj);
			}

			return (val);
		}

		void V8JavascriptEngine::createNativeJSObject(String variable, String jsName, JSValue *value)
		{
			v8::Local<v8::Object> global = globalContext->Global();
			v8::Local<v8::Object> obj;
			String nextProperty = variable;
			int prevPos = 0;

			while (true)
			{
				size_t pos = variable.find(".", prevPos);

				if (pos == String::npos)
				{
					String substrTemp = variable.substr(prevPos, String::npos);
					nextProperty = substrTemp;

					break;
				}

				String substr = nextProperty.substr(prevPos, (pos - prevPos));
				nextProperty = substr;
				v8::Local<v8::Value> val = obj->Get(substr.toV8String(isolate));
				v8::Local<v8::Object> obj2 = v8::Local<v8::Object>::Cast(val);
				obj = obj2;

				prevPos = (pos + 1);
			}

			v8::Local<v8::Value> val = value->convertToV8Value(isolate);
			obj->Set(nextProperty.toV8String(isolate), val);
		}

		void V8JavascriptEngine::collectGarbage()
		{
			if (exposeGC == false)
			{
				throw RadJAV::Exception("Unable to manually collect garbage, --expose_gc command line argument not set. Its best not to manually collect garbage anyway.");

				return;
			}

			isolate->RequestGarbageCollectionForTesting(v8::Isolate::GarbageCollectionType::kFullGarbageCollection);
		}

		void V8JavascriptEngine::calledFunction(const v8::FunctionCallbackInfo<v8::Value> &args)
		{
			V8JavascriptEngine *jsEngine = static_cast <V8JavascriptEngine *> (RadJav::javascriptEngine);
			v8::Isolate *currentIsolate = args.GetIsolate ();
			v8::Local<v8::Object> thisObj = args.This();
			v8::Local<v8::Value> dataObj = args.Data();
			v8::Local<v8::Object> holderObj = args.Holder ();
			v8::Local<v8::Object> calleeObj = args.Callee();
			v8::HandleScope scope(currentIsolate);
			String className = parseV8Value(thisObj->Get(String("type").toV8String(currentIsolate)));
			String funcName = "";

			if (dataObj->IsArray() == true)
			{
				v8::Local<v8::Array> desc = v8::Local<v8::Array>::Cast (dataObj);

				for (unsigned int iIdx = 0; iIdx < desc->Length(); iIdx++)
				{
					v8::Local<v8::String> str = v8::Local<v8::String>::Cast (desc->Get(iIdx));
					String key = parseV8Value (str);

					if (iIdx == (desc->Length() - 2))
						className = key;

					if (iIdx == (desc->Length() - 1))
					{
						funcName = key;

						break;
					}
				}
			}
			else
				funcName = parseV8Value(dataObj);

			if ((className == "") || (className == "undefined"))
				className = "Global";

			if ((className == "windows") || (className == "linux") || (className == "mac"))
				className = "OS";

			ThemeObject *themeObj = RadJav::theme->getThemeObject(className);

			if (themeObj != NULL)
			{
				if (funcName != "")
				{
					JSArguments *args2 = RJNEW JSArguments ();
					args2->thisObj = RJNEW JSObject(RadJav::javascriptEngine, thisObj);
					args2->jsEngine = RadJav::javascriptEngine;

					for (int iIdx = 0; iIdx < args.Length(); iIdx++)
					{
						v8::Local<v8::Value> val = args[iIdx];
						JSValue *newVal = NULL;

						if (val->IsFunction() == true)
							newVal = jsEngine->getJSValueFromV8Value(val);
						else if (val->IsObject() == true)
						{
							v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast (val);
							v8::Local<v8::Value> val2 = obj->Get(String ("_appObj").toV8String (currentIsolate));

							if (val2.IsEmpty() == false)
							{
								if (val2->IsNull () == false)
									newVal = jsEngine->getJSValueFromV8Value(val2);
								else
									newVal = jsEngine->getJSValueFromV8Value(val);
							}
							else
								newVal = jsEngine->getJSValueFromV8Value(val);
						}
						else
							newVal = jsEngine->getJSValueFromV8Value(val);

						args2->addArgument(newVal);
					}

					JSValue *result = themeObj->callEvent(funcName, args2);
					v8::Local<v8::Value> v8Result;

					if (result != NULL)
					{
						v8Result = result->convertToV8Value (currentIsolate);

						DELETEOBJ (result);
					}

					args.GetReturnValue().Set(v8Result);

					if (args2->allowDeletionOfThis == true)
						DELETEOBJ (args2);
				}
			}
		}

		/*void V8JavascriptEngine::destroyObject (const v8::WeakCallbackData<v8::Value, JSValue> &data)
		{
			v8::Isolate *currentIsolate = data.GetIsolate();
			v8::HandleScope scope (currentIsolate);
			v8::Local<v8::Value> value = data.GetValue();
			v8::Local<v8::External> extVal = v8::Local<v8::External>::Cast(value);
			void *val = extVal->Value();

			// Causes crash, I can't figure out how to delete objects stored in V8 objects...
			DELETEOBJ (val);*/

			/*v8::Persistent<v8::Value, v8::CopyablePersistentTraits<v8::Value> > *value = data.GetParameter();
			v8::Local<v8::Value> val = value->Get (currentIsolate);
			v8::Local<v8::External> ext = v8::Local<v8::External>::Cast(val);
			void *extVal = ext->Value();

			DELETEOBJ (extVal);*/
		//}
	#endif
}
