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
#ifndef _RADJAV_JAVASCRIPT_ENGINE_H_
	#define _RADJAV_JAVASCRIPT_ENGINE_H_

	#include "RadJavPreprocessor.h"
	#include "RadJavString.h"
	#include "RadJavThread.h"
	#include "RadJavHashMap.h"

	#ifdef C3D_USE_OGRE
		#include <Ogre.h>
	#endif

	namespace RadJAV
	{
		/// The javascript engine to be used.
		class RADJAV_EXPORT JavascriptEngine
		{
			public:
				inline JavascriptEngine()
				{
					exposeGC = false;
					shutdownOnException = false;
					exceptionsDisplayMessageBox = false;
					shutdown = false;

					#ifdef C3D_USE_OGRE
						mRoot = NULL;
					#endif
				}

				/// Run an application.
				virtual void runApplication (String applicationSource, String fileName) = 0;
				/// Run an application from a javascript file.
				virtual void runApplicationFromFile (String file) = 0;
				/// Execute Javascript code.
				virtual void executeScript(String code, String fileName) = 0;
				/// Connect the native library to the Javascript library.
				virtual void loadNativeCode() = 0;
				/// Call the garbage collector.
				virtual void collectGarbage() = 0;

				#ifdef C3D_USE_OGRE
					/// Start the 3d engine.
					virtual void start3DEngine() = 0;
				#endif

				/// A blockchain event has occurred, process it.
				virtual void blockchainEvent (String event, String dataType = "null", void *data = NULL) = 0;

				/// Add a thread to be handled by the engine.
				virtual void addThread(Thread *thread) = 0;
				/// Remove a thread.
				virtual void removeThread(Thread *thread) = 0;
				/// Throw a Javascript exception.
				virtual void throwException(String message) = 0;

				/// Shutdown the application entirely.
				virtual void exit(RJINT exitCode) = 0;

				#ifdef C3D_USE_OGRE
					Ogre::Root *mRoot;
				#endif

			protected:
				RJBOOL exposeGC;
				RJBOOL shutdownOnException;
				RJBOOL exceptionsDisplayMessageBox;
				RJBOOL shutdown;
				RJBOOL useDebugger;

				Array<RJULONG> removeThreads;
				HashMap<RJULONG, Thread *> threads;
		};
	}
#endif

