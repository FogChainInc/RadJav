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
#include "v8/RadJavV8JavascriptEngine.h"

#include "RadJav.h"
#include "RadJavException.h"

#include "RadJavJavascriptCode.h"

#ifdef GUI_USE_WXWIDGETS
	#include <wx/stdpaths.h>
	#include <wx/filename.h>
#endif

#ifdef USE_V8
	#include "v8/RadJavV8Global.h"
	#include "v8/RadJavV8OS.h"

	#include "v8/RadJavV8Console.h"
	#include "v8/RadJavV8IO.h"
	#include "v8/RadJavV8Net.h"

	#include "v8/RadJavV8BlockchainV1.h"

	// GUI
	#include "v8/RadJavV8GUIGObject.h"
	#include "v8/RadJavV8GUIWindow.h"
	#include "v8/RadJavV8GUIButton.h"
	#include "v8/RadJavV8GUILabel.h"
	#include "v8/RadJavV8GUIImage.h"
	#include "v8/RadJavV8GUIContainer.h"
	#include "v8/RadJavV8GUICombobox.h"
	#include "v8/RadJavV8GUITextbox.h"
	#include "v8/RadJavV8GUITextarea.h"
	#include "v8/RadJavV8GUICheckbox.h"
	#include "v8/RadJavV8GUIRadio.h"
	#include "v8/RadJavV8GUIList.h"
	#include "v8/RadJavV8GUIMenuBar.h"
	#include "v8/RadJavV8GUIMenuItem.h"
	#include "v8/RadJavV8GUIWebView.h"
	#include "v8/RadJavV8GUICanvas3D.h"

	// C3D
	#include "v8/RadJavV8C3DObject3D.h"
	#include "v8/RadJavV8C3DEntity.h"
	#include "v8/RadJavV8C3DWorld.h"
#endif

#include <cstring>

namespace RadJAV
{
	#ifdef USE_V8
		/*void *V8ArrayBufferAllocator::Allocate(size_t length)
		{
			void *data = AllocateUninitialized(length);

			if (data != NULL)
				data = std::memset(data, 0, length);

			return (data);
		}

		void *V8ArrayBufferAllocator::AllocateUninitialized(size_t length)
		{
			return (malloc(length));
		}

		void V8ArrayBufferAllocator::Free(void *data, size_t length)
		{
			free(data);
		}*/

		V8JSInspector::V8JSInspector(v8::Isolate *isolate)
		{
			client = v8_inspector::V8Inspector::create(isolate, this);
		}

		V8JavascriptEngine::V8JavascriptEngine()
			: JavascriptEngine()
		{
			v8::V8::InitializeICU();
			String flags = "";
			exposeGC = false;
			useInspector = false;
			radJav = NULL;
			exceptionsDisplayMessageBox = true;

			if (RadJav::arguments.size() > 0)
			{
				for (size_t iIdx = 0; iIdx < RadJav::arguments.size(); iIdx++)
				{
					String endSpace = " ";

					if (iIdx == (RadJav::arguments.size() - 1))
						endSpace = "";

					String arg = RadJav::arguments.at(iIdx);

					if (arg == "--expose_gc")
						exposeGC = true;

					if (arg == "--inspect")
						useInspector = true;

					flags += arg + endSpace;
				}
			}

			String execPath = "";

			#ifdef GUI_USE_WXWIDGETS
				execPath = parsewxString (wxStandardPaths::Get ().GetExecutablePath());
			#endif

			v8::V8::SetFlagsFromString(flags.c_str(), flags.size());
			v8::V8::InitializeExternalStartupData(execPath.c_str ());
			platform = v8::platform::CreateDefaultPlatform();
			v8::V8::InitializePlatform(platform);
			v8::V8::Initialize();

			v8::Isolate::CreateParams createParams;
			//V8ArrayBufferAllocator allocator;
			//createParams.array_buffer_allocator = &allocator;
			createParams.array_buffer_allocator = v8::ArrayBuffer::Allocator::NewDefaultAllocator ();

			isolate = v8::Isolate::New(createParams);

			#ifdef GUI_USE_WXWIDGETS
				criticalSection = RJNEW wxCriticalSection ();
			#endif
		}

		V8JavascriptEngine::~V8JavascriptEngine()
		{
			//v8::Unlocker unlocker(isolate);
			isolate->Dispose();
			v8::V8::Dispose();
			v8::V8::ShutdownPlatform();

			#ifdef GUI_USE_WXWIDGETS
				DELETEOBJ(criticalSection);
			#endif

			DELETEOBJ(platform);
		}

		void V8JavascriptEngine::startInspector()
		{

		}

		void V8JavascriptEngine::runApplication(String applicationSource, String fileName)
		{
			String parentDir = fileName;

			#ifdef GUI_USE_WXWIDGETS
				wxFileName file(parentDir.towxString());
				file.MakeAbsolute();
				wxString tempStr = file.GetPath();
				parentDir = parsewxString(tempStr);
				wxSetWorkingDirectory(parentDir);
			#endif

			//v8::Locker locker(isolate);
			v8::Isolate::Scope scope(isolate);
			v8::HandleScope handleScope(isolate);

			v8::Local<v8::ObjectTemplate> global = v8::ObjectTemplate::New(isolate);
			globalContext = v8::Context::New(isolate, NULL, global);
			v8::Context::Scope contextScope(globalContext);

			loadJavascriptLibrary();

			// Insert the javascript libraries to be used.
			for (RJUINT iIdx = 0; iIdx < javascriptFiles.size (); iIdx++)
			{
				JSFile jsfile = javascriptFiles.at(iIdx);
				executeScript(jsfile.content, jsfile.filename);
			}

			loadNativeCode();
			v8::Local<v8::Object> obj = v8GetObject(globalContext->Global(), "RadJav");
			radJav = RJNEW v8::Persistent<v8::Object>();
			radJav->Reset(isolate, obj);

			// Execute the application's javascript.
			executeScript(applicationSource, fileName);
			RJBOOL firstRun = true;
			RJBOOL startedBlockchainV1 = false;

			#ifdef GUI_USE_WXWIDGETS
				wxLongLong currentTime = 0;
				wxLongLong prevTime = 0;
				RJLONG diffTime = 0;
			#endif

			while (true)
			{
				#ifdef GUI_USE_WXWIDGETS
					currentTime = wxGetLocalTimeMillis();
					diffTime = (currentTime - prevTime).GetValue ();
					prevTime = currentTime;
				#endif

				v8::platform::PumpMessageLoop(platform, isolate);
				RadJav::runEventLoopSingleStep();

				#ifdef C3D_USE_OGRE
					if (mRoot != NULL)
					{
						if (mRoot->isInitialised () == true)
							mRoot->renderOneFrame();
					}
				#endif

				auto execCodeBegin = jsToExecuteNextCode.begin();
				auto execFilenameBegin = jsToExecuteNextFilename.begin();
				auto execContextBegin = jsToExecuteNextContext.begin();
				auto execCodeEnd = jsToExecuteNextCode.end();

				try
				{
					// Handle the on ready function.
					if (firstRun == true)
					{
						if (OS::onReadyFunction != NULL)
						{
							v8::Local<v8::Function> val = v8::Local<v8::Function>::Cast(OS::onReadyFunction->Get(isolate));

							if (v8IsNull(val) == false)
								val->Call(globalContext->Global(), 0, NULL);
						}

						firstRun = false;
					}

					#ifdef USE_BLOCKCHAIN_V1
					if (BlockchainV1::hasBlockchainStarted == true)
					{
						if (startedBlockchainV1 == false)
						{
							BlockchainV1::startBlockchain();
							startedBlockchainV1 = true;
						}
					}
					#endif

					auto timeoutBegin = timeoutFuncs.begin();
					auto timeoutsBegin = timeouts.begin();
					auto timeoutEnd = timeoutFuncs.end();

					while (timeoutBegin != timeoutEnd)
					{
						v8::Persistent<v8::Function> *funcp = *timeoutBegin;
						RJINT time = *timeoutsBegin;

						if (time <= 0)
						{
							timeoutFuncs.erase(timeoutBegin);
							timeouts.erase(timeoutsBegin);

							v8::Local<v8::Function> func = funcp->Get(isolate);

							if (func->IsNullOrUndefined() == false)
								func->Call(globalContext->Global(), 0, NULL);

							DELETEOBJ(funcp);

							timeoutBegin = timeoutFuncs.begin();
							timeoutsBegin = timeouts.begin();
							timeoutEnd = timeoutFuncs.end();

							continue;
						}

						#ifdef GUI_USE_WXWIDGETS
							(*timeoutsBegin) = time - (RJINT)diffTime;
						#endif

						timeoutBegin++;
						timeoutsBegin++;
					}

					for (RJUINT iIdx = 0; iIdx < removeThreads.size(); iIdx++)
					{
						auto tbegin = threads.find (removeThreads.at (iIdx));
						auto tend = threads.end();

						if (tbegin == tend)
							return;

						/// @bug tbegin->second should be deleted, or does wxWidgets delete it automatically?
						//DELETEOBJ (tbegin->second);
						threads.erase(tbegin);
					}

					removeThreads.clear();

					// Handle any threads.
					auto tbegin = threads.begin ();
					auto tend = threads.end ();

					while (tbegin != tend)
					{
						Thread *thread = tbegin->second;

						#ifdef GUI_USE_WXWIDGETS
							wxThread *wthread = (wxThread *)thread;

							if (thread->hasThreadStarted () == false)
							{
								wthread->Create();
								wthread->Run();
								thread->setAsStarted(true);
							}
						#endif

						tbegin++;
					}

					// Handle any scripts that need to be executed.
					while (execCodeBegin != execCodeEnd)
					{
						String code = *execCodeBegin;
						executeScript(code, *execFilenameBegin, *execContextBegin);

						execCodeBegin++;
						execFilenameBegin++;
						execContextBegin++;
					}

					jsToExecuteNextCode.clear();
					jsToExecuteNextFilename.clear();
					jsToExecuteNextContext.clear();

					#ifdef GUI_USE_WXWIDGETS
					if (criticalSection->TryEnter() == true)
					{
					#endif

					auto funcBegin = funcNext.begin();
					auto funcArgsBegin = funcNextArgs.begin();
					auto funcDeleteBegin = funcDelete.begin();
					auto funcEnd = funcNext.end();

					// Handle any functions that need to be executed.
					//if (funcBegin != funcEnd)
					while (funcBegin != funcEnd)
					{
						v8::Persistent<v8::Function> *funcp = *funcBegin;
						v8::Persistent<v8::Array> *args = *funcArgsBegin;
						RJBOOL deleteOnComplete = *funcDeleteBegin;
						v8::Local<v8::Array> args2;
						RJINT numArgs = 0;

						if (args != NULL)
						{
							args2 = args->Get(isolate);
							numArgs = args2->Length();
						}

						v8::Local<v8::Value> *args3 = NULL;

						if (numArgs > 0)
							args3 = RJNEW v8::Local<v8::Value>[numArgs];

						for (RJINT iIdx = 0; iIdx < numArgs; iIdx++)
							args3[iIdx] = args2->Get(iIdx);

						v8::Local<v8::Function> func = funcp->Get(isolate);

						if (func->IsNullOrUndefined() == false)
							func->Call(globalContext->Global(), numArgs, args3);

						if (numArgs > 0)
							DELETEARRAY(args3);

						if (deleteOnComplete == true)
						{
							//DELETEOBJ(funcp);
							args->Empty();
							DELETEOBJ(args);
						}

						//funcNext.erase(funcBegin);
						//funcNextArgs.erase (funcArgsBegin);
						//funcDelete.erase(funcDeleteBegin);
						funcBegin++;
						funcArgsBegin++;
						funcDeleteBegin++;
					}

					funcNext.clear();
					funcNextArgs.clear();
					funcDelete.clear();

					#ifdef GUI_USE_WXWIDGETS
						criticalSection->Leave();
						}
					#endif

					if (shutdown == true)
						break;
				}
				catch (Exception ex)
				{
					if (exceptionsDisplayMessageBox == true)
						RadJav::showMessageBox(ex.getMessage (), "Error");

					if (shutdownOnException == true)
						break;

					jsToExecuteNextCode.erase(execCodeBegin);
					jsToExecuteNextFilename.erase(execFilenameBegin);
					jsToExecuteNextContext.erase(execContextBegin);
				}
			}
		}

		void V8JavascriptEngine::runApplicationFromFile(String file)
		{
			std::fstream appFile;

			if (file == "")
				throw RadJAV::Exception("Application file name is empty!");

			appFile.open(file, std::ios_base::in);

			if (appFile.is_open() == false)
				throw RadJAV::Exception("Unable to open file: " + file);

			String content = "";

			while (appFile.good() == true)
			{
				char cChar = appFile.get();

				if (appFile.good() == false)
					break;

				content += cChar;
			}

			if (content != "")
				runApplication(content, file);
		}

		void V8JavascriptEngine::executeScript(String code, String fileName)
		{
			executeScript(code, fileName, v8::Local<v8::Object>());
		}

		void V8JavascriptEngine::executeScript(String code, String fileName, v8::Local<v8::Object> context)
		{
			v8::Local<v8::Context> scriptContext;
			v8::EscapableHandleScope scope(isolate);

			if (context.IsEmpty() == true)
				scriptContext = globalContext;
			else
				scriptContext = context->CreationContext ();

			v8::TryCatch tryCatch(isolate);
			v8::ScriptOrigin origin(fileName.toV8String(isolate));
			v8::MaybeLocal<v8::Script> scriptTemp = v8::Script::Compile(scriptContext, code.toV8String(isolate), &origin);

			if (scriptTemp.IsEmpty() == true)
			{
				v8::Local<v8::Value> exception = tryCatch.Exception();
				v8::Local<v8::Value> stackTrace = tryCatch.StackTrace();
				String exceptionStr = parseV8Value(exception);
				String stackTraceStr = parseV8Value(stackTrace);

				throw RadJAV::Exception("Compiling Javascript error: " + exceptionStr + "\n" + stackTraceStr);
			}

			v8::Local<v8::Script> script = scriptTemp.ToLocalChecked();
			v8::MaybeLocal<v8::Value> result = script->Run(scriptContext);

			if (result.IsEmpty() == true)
			{
				v8::Local<v8::Value> exception = tryCatch.Exception();
				v8::Local<v8::Value> stackTrace = tryCatch.StackTrace();
				String exceptionStr = parseV8Value(exception);
				String stackTraceStr = parseV8Value(stackTrace);

				throw RadJAV::Exception("Executing Javascript error: " + exceptionStr + "\n" + stackTraceStr);
			}

			scope.Escape(result.ToLocalChecked());
		}

		void V8JavascriptEngine::unboundedExecuteScript(String code, String fileName, v8::Local<v8::Object> context)
		{
			v8::Local<v8::Context> scriptContext;

			if (context.IsEmpty() == true)
				scriptContext = globalContext;
			else
				scriptContext = context->CreationContext();

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

		void V8JavascriptEngine::executeScriptNextTick(String code, String fileName, v8::Local<v8::Object> context)
		{
			jsToExecuteNextCode.push_back(code);
			jsToExecuteNextFilename.push_back(fileName);
			jsToExecuteNextContext.push_back(context);
		}

		void V8JavascriptEngine::callFunctionOnNextTick(v8::Persistent<v8::Function> *func, v8::Persistent<v8::Array> *args, RJBOOL deleteOnComplete)
		{
			funcNext.push_back(func);
			funcNextArgs.push_back(args);
			funcDelete.push_back(deleteOnComplete);
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

		#ifdef C3D_USE_OGRE
		void V8JavascriptEngine::start3DEngine()
		{
			mRoot = Ogre::Root::getSingletonPtr();

			#ifdef GUI_USE_WXWIDGETS
				String userConfigDir = parsewxString(wxStandardPaths::Get().GetUserConfigDir());
				String tempDir = userConfigDir + "/RadJav/";

				if (wxDirExists(tempDir.towxString ()) == false)
				{
					wxMkDir(tempDir.towxString(), wxS_DIR_DEFAULT);
					tempDir = userConfigDir + "/RadJav/3D Engine/";
					wxMkDir(tempDir.towxString(), wxS_DIR_DEFAULT);
				}

				userConfigDir += "/RadJav/3D Engine";
			#endif

			Ogre::String mPluginCfg = "";

			#ifdef _DEBUG
				mPluginCfg = userConfigDir + "/plugins_d.cfg";
			#else
				mPluginCfg = userConfigDir + "/plugins.cfg";
			#endif

			if (mRoot == NULL)
				mRoot = RJNEW Ogre::Root(mPluginCfg);

			mRoot->showConfigDialog();
			//mRoot->restoreConfig ();

			/*Ogre::ConfigFile configFile;
			configFile.load(userConfigDir + "/resources.cfg");

			Ogre::ConfigFile::SectionIterator seci = configFile.getSectionIterator();

			Ogre::String secName, typeName, archName;

			while (seci.hasMoreElements())
			{
				secName = seci.peekNextKey();
				Ogre::ConfigFile::SettingsMultiMap *settings = seci.getNext();
				Ogre::ConfigFile::SettingsMultiMap::iterator i;

				for (i = settings->begin(); i != settings->end(); ++i)
				{
					typeName = i->first;
					archName = i->second;

					Ogre::ResourceGroupManager::getSingleton().addResourceLocation(
						archName, typeName, secName);

				}
			}*/

			Ogre::ResourceGroupManager::getSingleton().initialiseAllResourceGroups();
		}
		#endif

		void V8JavascriptEngine::addTimeout (v8::Persistent<v8::Function> *func, RJINT time)
		{
			timeoutFuncs.push_back(func);
			timeouts.push_back(time);
		}

		void V8JavascriptEngine::blockchainEvent(String event, String dataType, void *data)
		{
			RJINT numArgs = 0;
			v8::Local<v8::Value> *args = NULL;

			if (data != NULL)
			{
				#ifdef GUI_USE_WXWIDGETS
					if (criticalSection->TryEnter() == false)
					{
						/// @bug Stupid hack for now. This will skip any function that needs to execute if a lock can't be placed.
						//if (deleteOnComplete == true)
						//DELETE_ARRAY(args);

						return;
					}
				#endif

				numArgs = 1;
				args = RJNEW v8::Local<v8::Value> [numArgs];

				if (dataType == "int")
					args[0] = v8::Integer::New(isolate, *(RJINT *)data);

				if (dataType == "number")
					args[0] = v8::Number::New(isolate, *(RJNUMBER *)data);

				if (dataType == "bool")
					args[0] = v8::Boolean::New(isolate, *(RJBOOL *)data);

				if (dataType == "string")
					args[0] = ((String *)data)->toV8String (isolate);
			}

			blockchainEvent(event, numArgs, args, true);
		}

		void V8JavascriptEngine::blockchainEvent(String event, RJINT numargs, v8::Local<v8::Value> *args, RJBOOL alreadyEnteredCritialSection)
		{
			#ifdef GUI_USE_WXWIDGETS
				if (alreadyEnteredCritialSection == false)
				{
					if (criticalSection->TryEnter() == false)
					{
						/// @bug Stupid hack for now. This will skip any function that needs to execute if a lock can't be placed.
						//if (deleteOnComplete == true)
						DELETE_ARRAY(args);

						return;
					}
				}
			#endif

			#ifdef USE_BLOCKCHAIN_V1
			if (event == "ready")
			{
				if (BlockchainV1::onReadyFunction != NULL)
					callFunctionOnNextTick(BlockchainV1::onReadyFunction, NULL, false);
			}

			if (event == "connectBlock")
			{
				if (BlockchainV1::connectBlockFunction != NULL)
				{
					v8::Persistent<v8::Array> *results = RJNEW v8::Persistent<v8::Array>();
					v8::Local<v8::Array> ary = v8::Array::New(isolate);

					for (RJINT iIdx = 0; iIdx < numargs; iIdx++)
						ary->Set(iIdx, args[iIdx]);

					results->Reset(V8_JAVASCRIPT_ENGINE->isolate, ary);

					callFunctionOnNextTick(BlockchainV1::connectBlockFunction, results, true);
				}
			}

			if (event == "proofOfWorkFound")
			{
				if (BlockchainV1::proofOfWorkFoundFunction != NULL)
					callFunctionOnNextTick(BlockchainV1::proofOfWorkFoundFunction, NULL, false);
			}

			if (event == "passphraseRequired")
			{
				if (BlockchainV1::passphraseRequiredFunction != NULL)
					callFunctionOnNextTick(BlockchainV1::passphraseRequiredFunction, NULL, false);
			}

			if (event == "error")
			{
				if (BlockchainV1::onErrorFunction != NULL)
				{
					v8::Persistent<v8::Array> *results = RJNEW v8::Persistent<v8::Array>();
					v8::Local<v8::Array> ary = v8::Array::New(isolate);

					for (RJINT iIdx = 0; iIdx < numargs; iIdx++)
						ary->Set(iIdx, args[iIdx]);

					results->Reset(V8_JAVASCRIPT_ENGINE->isolate, ary);

					callFunctionOnNextTick(BlockchainV1::onErrorFunction, results, true);
				}
			}

			DELETE_ARRAY(args);
			#endif

			#ifdef GUI_USE_WXWIDGETS
				criticalSection->Leave();
			#endif
		}

		void V8JavascriptEngine::addThread(Thread *thread)
		{
			threads.insert (HashMapPair<RJULONG, Thread *> ((RJULONG)thread, thread));
		}

		void V8JavascriptEngine::removeThread(Thread *thread)
		{
			removeThreads.push_back((RJULONG)thread);
		}

		void V8JavascriptEngine::throwException(String message)
		{
			v8::Local<v8::Object> err = v8::Object::New(isolate);
			err->Set(String ("message").toV8String (isolate), message.toV8String(isolate));

			isolate->ThrowException (err);

			if (exceptionsDisplayMessageBox == true)
				RadJav::showMessageBox(message, "Error");

			if (shutdownOnException == true)
				shutdown = true;
		}

		void V8JavascriptEngine::exit(RJINT exitCode)
		{
			shutdown = true;
		}

		void V8JavascriptEngine::loadNativeCode()
		{
			// Globals
			{
				Global::createV8Callbacks(isolate, globalContext->Global());

				if (exposeGC == true)
				{
					V8_CALLBACK(globalContext->Global(), "collectGarbage", Global::collectGarbage);
				}
			}

			// Console
			{
				v8::Handle<v8::Function> radJavFunc = v8GetFunction(globalContext->Global(), "console");

				V8_CALLBACK(radJavFunc, "exit", Global::exit);
			}

			// RadJav
			{
				v8::Handle<v8::Function> radJavFunc = v8GetFunction(globalContext->Global(), "RadJav");

				Console::createV8Callbacks(isolate, radJavFunc);

				// RadJav.OS
				{
					v8::Handle<v8::Function> osFunc = v8GetFunction(radJavFunc, "OS");

					OS::createV8Callbacks(isolate, osFunc);
				}

				// RadJav.Console
				{
					v8::Handle<v8::Function> consoleFunc = v8GetFunction(radJavFunc, "Console");

					Console::createV8Callbacks(isolate, consoleFunc);
				}

				// RadJav.IO
				{
					v8::Handle<v8::Function> ioFunc = v8GetFunction(radJavFunc, "IO");

					IO::createV8Callbacks(isolate, ioFunc);

					// RadJav.IO.SerialComm
					{
						v8::Handle<v8::Function> serialCommFunc = v8GetFunction(ioFunc, "SerialComm");
						v8::Handle<v8::Object> serialPrototype = v8GetObject(serialCommFunc, "prototype");

						IO::SerialComm::createV8Callbacks(isolate, serialPrototype);
					}

					// RadJav.IO.TextFile
					{
						v8::Handle<v8::Function> textFileFunc = v8GetFunction(ioFunc, "TextFile");

						IO::TextFile::createV8Callbacks(isolate, textFileFunc);
					}
				}

				// RadJav.Net
				{
					v8::Handle<v8::Function> netFunc = v8GetFunction(radJavFunc, "Net");

					Net::createV8Callbacks(isolate, netFunc);
				}

				#ifdef USE_BLOCKCHAIN_V1
				// RadJav.BlockchainV1
				{
					v8::Handle<v8::Function> blockchainFunc = v8GetFunction(radJavFunc, "BlockchainV1");

					BlockchainV1::createV8Callbacks(isolate, blockchainFunc);
				}
				#endif

				// RadJav.GUI
				{
					v8::Handle<v8::Function> guiFunc = v8GetFunction(radJavFunc, "GUI");

					// RadJav.GUI.GObject
					{
						v8::Handle<v8::Function> gobjectFunc = v8GetFunction(guiFunc, "GObject");
						v8::Handle<v8::Object> gobjectPrototype = v8GetObject(gobjectFunc, "prototype");

						GUI::GObject::createV8Callbacks(isolate, gobjectPrototype);
					}

					// RadJav.GUI.Window
					{
						v8::Handle<v8::Function> windowFunc = v8GetFunction(guiFunc, "Window");
						v8::Handle<v8::Object> windowPrototype = v8GetObject(windowFunc, "prototype");

						GUI::Window::createV8Callbacks(isolate, windowPrototype);
					}

					// RadJav.GUI.Button
					{
						v8::Handle<v8::Function> buttonFunc = v8GetFunction(guiFunc, "Button");
						v8::Handle<v8::Object> buttonPrototype = v8GetObject(buttonFunc, "prototype");

						GUI::Button::createV8Callbacks(isolate, buttonPrototype);
					}

					// RadJav.GUI.Label
					{
						v8::Handle<v8::Function> labelFunc = v8GetFunction(guiFunc, "Label");
						v8::Handle<v8::Object> labelPrototype = v8GetObject(labelFunc, "prototype");

						GUI::Label::createV8Callbacks(isolate, labelPrototype);
					}

					// RadJav.GUI.Image
					{
						v8::Handle<v8::Function> imageFunc = v8GetFunction(guiFunc, "Image");
						v8::Handle<v8::Object> imagePrototype = v8GetObject(imageFunc, "prototype");

						GUI::Image::createV8Callbacks(isolate, imagePrototype);
					}

					// RadJav.GUI.Container
					{
						v8::Handle<v8::Function> containerFunc = v8GetFunction(guiFunc, "Container");
						v8::Handle<v8::Object> containerPrototype = v8GetObject(containerFunc, "prototype");

						GUI::Container::createV8Callbacks(isolate, containerPrototype);
					}

					// RadJav.GUI.Combobox
					{
						v8::Handle<v8::Function> comboboxFunc = v8GetFunction(guiFunc, "Combobox");
						v8::Handle<v8::Object> comboboxPrototype = v8GetObject(comboboxFunc, "prototype");

						GUI::Combobox::createV8Callbacks(isolate, comboboxPrototype);
					}

					// RadJav.GUI.Textbox
					{
						v8::Handle<v8::Function> textboxFunc = v8GetFunction(guiFunc, "Textbox");
						v8::Handle<v8::Object> textboxPrototype = v8GetObject(textboxFunc, "prototype");

						GUI::Textbox::createV8Callbacks(isolate, textboxPrototype);
					}

					// RadJav.GUI.Textarea
					{
						v8::Handle<v8::Function> textareaFunc = v8GetFunction(guiFunc, "Textarea");
						v8::Handle<v8::Object> textareaPrototype = v8GetObject(textareaFunc, "prototype");

						GUI::Textarea::createV8Callbacks(isolate, textareaPrototype);
					}

					// RadJav.GUI.Checkbox
					{
						v8::Handle<v8::Function> checkboxFunc = v8GetFunction(guiFunc, "Checkbox");
						v8::Handle<v8::Object> checkboxPrototype = v8GetObject(checkboxFunc, "prototype");

						GUI::Checkbox::createV8Callbacks(isolate, checkboxPrototype);
					}

					// RadJav.GUI.Radio
					{
						v8::Handle<v8::Function> radioFunc = v8GetFunction(guiFunc, "Radio");
						v8::Handle<v8::Object> radioPrototype = v8GetObject(radioFunc, "prototype");

						GUI::Radio::createV8Callbacks(isolate, radioPrototype);
					}

					// RadJav.GUI.List
					{
						v8::Handle<v8::Function> listFunc = v8GetFunction(guiFunc, "List");
						v8::Handle<v8::Object> listPrototype = v8GetObject(listFunc, "prototype");

						GUI::List::createV8Callbacks(isolate, listPrototype);
					}

					// RadJav.GUI.MenuBar
					{
						v8::Handle<v8::Function> menuBarFunc = v8GetFunction(guiFunc, "MenuBar");
						v8::Handle<v8::Object> menuBarPrototype = v8GetObject(menuBarFunc, "prototype");

						GUI::MenuBar::createV8Callbacks(isolate, menuBarPrototype);
					}

					// RadJav.GUI.MenuItem
					{
						v8::Handle<v8::Function> menuItemFunc = v8GetFunction(guiFunc, "MenuItem");
						v8::Handle<v8::Object> menuItemPrototype = v8GetObject(menuItemFunc, "prototype");

						GUI::MenuItem::createV8Callbacks(isolate, menuItemPrototype);
					}

					// RadJav.GUI.WebView
					{
						v8::Handle<v8::Function> webViewFunc = v8GetFunction(guiFunc, "WebView");
						v8::Handle<v8::Object> webViewPrototype = v8GetObject(webViewFunc, "prototype");

						GUI::WebView::createV8Callbacks(isolate, webViewPrototype);
					}

					#ifdef C3D_USE_OGRE
						// RadJav.GUI.Canvas3D
						{
							v8::Handle<v8::Function> canvas3DFunc = v8GetFunction(guiFunc, "Canvas3D");
							v8::Handle<v8::Object> canvas3DFuncPrototype = v8GetObject(canvas3DFunc, "prototype");

							GUI::Canvas3D::createV8Callbacks(isolate, canvas3DFuncPrototype);
						}
					#endif
				}

				#ifdef C3D_USE_OGRE
				// RadJav.C3D
				{
					v8::Handle<v8::Function> c3dFunc = v8GetFunction(radJavFunc, "C3D");

					// RadJav.C3D.Object3D
					{
						v8::Handle<v8::Function> object3DFunc = v8GetFunction(c3dFunc, "Object3D");
						v8::Handle<v8::Object> object3DPrototype = v8GetObject(object3DFunc, "prototype");

						C3D::Object3D::createV8Callbacks(isolate, object3DPrototype);
					}

					// RadJav.C3D.World
					{
						v8::Handle<v8::Function> worldFunc = v8GetFunction(c3dFunc, "World");
						v8::Handle<v8::Object> worldPrototype = v8GetObject(worldFunc, "prototype");

						C3D::World::createV8Callbacks(isolate, worldPrototype);
					}

					// RadJav.C3D.Entity
					{
						v8::Handle<v8::Function> entityFunc = v8GetFunction(c3dFunc, "Entity");
						v8::Handle<v8::Object> entityPrototype = v8GetObject(entityFunc, "prototype");

						C3D::Entity::createV8Callbacks(isolate, entityPrototype);
					}

					// RadJav.C3D.Camera
					/*{
						v8::Handle<v8::Function> cameraFunc = v8GetFunction(c3dFunc, "Camera");
						v8::Handle<v8::Object> cameraPrototype = v8GetObject(cameraFunc, "prototype");

						C3D::Camera::createV8Callbacks(isolate, cameraPrototype);
					}*/
				}
				#endif
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
			String applicationSource = parseV8Value(args[0]);
			String fileName = parseV8Value(args[1]);

			jsEngine->unboundedExecuteScript(applicationSource, fileName);
		}

		v8::Handle<v8::Function> V8JavascriptEngine::v8GetFunction(v8::Local<v8::Object> context, String functionName)
		{
			v8::Handle<v8::Value> value = context->Get(functionName.toV8String(isolate));
			v8::Handle<v8::Function> func = v8::Handle<v8::Function>::Cast(value);

			return (func);
		}

		v8::Handle<v8::Value> V8JavascriptEngine::v8GetValue(v8::Local<v8::Object> context, String functionName)
		{
			v8::Handle<v8::Value> value = context->Get(functionName.toV8String(isolate));

			return (value);
		}

		void V8JavascriptEngine::v8SetString(v8::Local<v8::Object> context, String functionName, String str)
		{
			context->Set(functionName.toV8String(isolate), str.toV8String (isolate));
		}

		String V8JavascriptEngine::v8GetString(v8::Local<v8::Object> context, String functionName)
		{
			v8::Handle<v8::Value> value = context->Get(functionName.toV8String(isolate));
			String result = "";

			if (v8IsNull(value) == true)
				return (result);

			v8::Handle<v8::String> str = v8::Handle<v8::String>::Cast(value);

			return (parseV8Value(str));
		}

		void V8JavascriptEngine::v8SetNumber(v8::Local<v8::Object> context, String functionName, RDECIMAL number)
		{
			context->Set(functionName.toV8String(isolate), v8::Number::New(isolate, number));
		}

		RJINT V8JavascriptEngine::v8GetInt(v8::Local<v8::Object> context, String functionName)
		{
			v8::Handle<v8::Value> value = context->Get(functionName.toV8String(isolate));
			RJINT result = 0;

			if (v8IsNull(value) == true)
				return (result);

			v8::Handle<v8::Number> val = v8::Handle<v8::Number>::Cast(value);

			return (val->Int32Value());
		}

		RDECIMAL V8JavascriptEngine::v8GetDecimal(v8::Local<v8::Object> context, String functionName)
		{
			v8::Handle<v8::Value> value = context->Get(functionName.toV8String(isolate));
			RDECIMAL result = 0;

			if (v8IsNull(value) == true)
				return (result);

			v8::Handle<v8::Number> val = v8::Handle<v8::Number>::Cast(value);

			return (val->NumberValue());
		}

		void V8JavascriptEngine::v8SetBool(v8::Local<v8::Object> context, String functionName, bool value)
		{
			context->Set(functionName.toV8String(isolate), v8::Boolean::New (isolate, value));
		}

		RJBOOL V8JavascriptEngine::v8GetBool(v8::Local<v8::Object> context, String functionName)
		{
			v8::Handle<v8::Value> value = context->Get(functionName.toV8String(isolate));
			RJBOOL result = false;

			if (v8IsNull(value) == true)
				return (result);

			v8::Handle<v8::Boolean> val = v8::Handle<v8::Boolean>::Cast(value);
			result = val->Value();

			return (result);
		}

		void V8JavascriptEngine::v8SetObject(v8::Local<v8::Object> context, String functionName, v8::Handle<v8::Object> obj)
		{
			context->Set(functionName.toV8String(isolate), obj);
		}

		v8::Handle<v8::Object> V8JavascriptEngine::v8GetObject(v8::Local<v8::Object> context, String functionName)
		{
			v8::Handle<v8::Value> value = context->Get(functionName.toV8String(isolate));
			v8::Handle<v8::Object> obj = v8::Handle<v8::Object>::Cast(value);

			return (obj);
		}

		v8::Local<v8::Value> V8JavascriptEngine::v8CallFunction(
			v8::Local<v8::Object> context, String functionName, RJINT numArgs, v8::Local<v8::Value> *args)
		{
			v8::Handle<v8::Function> func = v8GetFunction(context, functionName);
			v8::Local<v8::Value> result = func->Call(context, numArgs, args);

			return (result);
		}

		v8::Local<v8::Object> V8JavascriptEngine::v8CallAsConstructor(v8::Local<v8::Object> function, RJINT numArgs, v8::Local<v8::Value> *args)
		{
			v8::Local<v8::Value> result = function->CallAsConstructor(numArgs, args);
			v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(result);

			return (obj);
		}

		void *V8JavascriptEngine::v8GetExternal(v8::Local<v8::Object> context, String functionName)
		{
			v8::Handle<v8::Value> value = context->Get(functionName.toV8String(isolate));

			if (v8IsNull(value) == true)
				return (NULL);

			v8::Handle<v8::External> ext = v8::Handle<v8::External>::Cast(value);

			return (ext->Value());
		}

		void V8JavascriptEngine::v8SetExternal(v8::Local<v8::Object> context, String functionName, void *obj)
		{
			v8::Local<v8::External> val = v8::External::New(isolate, obj);
			context->Set(functionName.toV8String(isolate), val);
		}

		v8::Handle<v8::Value> V8JavascriptEngine::v8GetArgument(const v8::FunctionCallbackInfo<v8::Value> &args, RJUINT index)
		{
			v8::Handle<v8::Value> value = args[index];

			return (value);
		}

		void V8JavascriptEngine::v8SetValue(v8::Local<v8::Object> context, String functionName, v8::Handle<v8::Value> obj)
		{
			context->Set(functionName.toV8String(isolate), obj);
		}

		bool V8JavascriptEngine::v8IsNull(v8::Local<v8::Value> val)
		{
			if (val.IsEmpty() == true)
				return (true);

			if (val->IsUndefined() == true)
				return (true);

			if (val->IsNull() == true)
				return (true);

			return (false);
		}

		RJBOOL V8JavascriptEngine::v8ParseBool(v8::Local<v8::Value> val)
		{
			return (val->BooleanValue());
		}

		RJINT V8JavascriptEngine::v8ParseInt(v8::Local<v8::Value> val)
		{
			return (val->Int32Value());
		}

		RDECIMAL V8JavascriptEngine::v8ParseDecimal(v8::Local<v8::Value> val)
		{
			return (val->NumberValue ());
		}

		v8::Local<v8::Object> V8JavascriptEngine::createPromise(v8::Local<v8::Function> function)
		{
			v8::Local<v8::Object> context = globalContext->Global();

			return (createPromise(context, function));
		}

		v8::Local<v8::Object> V8JavascriptEngine::createPromise(
			v8::Local<v8::Object> context, v8::Local<v8::Function> function, v8::Local<v8::Array> args)
		{
			v8::Local<v8::Object> promise = V8_JAVASCRIPT_ENGINE->v8GetObject(V8_JAVASCRIPT_ENGINE->globalContext->Global(), "Promise");
			v8::Local<v8::Function> keepContext = V8_JAVASCRIPT_ENGINE->v8GetFunction(radJav->Get (isolate), "keepContext");
			RJINT contextArgs = 2;

			if (args.IsEmpty() == false)
				contextArgs = 3;

			v8::Local<v8::Value> *args2 = RJNEW v8::Local<v8::Value>[contextArgs];
			args2[0] = function;
			args2[1] = context;

			if (contextArgs > 2)
				args2[2] = args;

			v8::Local<v8::Value> newContext = keepContext->Call(context, contextArgs, args2);
			DELETE_ARRAY(args2);

			v8::Local<v8::Value> *args3 = RJNEW v8::Local<v8::Value>[1];
			args3[0] = newContext;
			v8::Local<v8::Value> result = promise->CallAsConstructor(1, args3);
			v8::Local<v8::Object> promiseObject = v8::Local<v8::Object>::Cast(result);
			DELETE_ARRAY(args3);

			return (promiseObject);
		}
	#endif
}
