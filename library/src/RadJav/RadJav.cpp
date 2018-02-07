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
#ifdef USE_BLOCKCHAIN_V1
	#include "xrjv1d.h"
	#include "xrjv1-cli.h"
	#include "noui.h"
	#include "util.h"
#endif

#include "RadJav.h"

#ifdef USE_V8
	#include "v8/RadJavV8JavascriptEngine.h"
#endif

#ifdef HTTP_USE_CIVETWEB
	#include <civetweb.h>
#endif

#ifdef HTTP_USE_CURL
	#include <curl/curl.h>
#endif

#include <iostream>
#include <stdlib.h>

#ifdef RADJAV_DEBUG
void *operator new (size_t size, const char *file, int line, const char *func)
{
	void *alloc = malloc (size);

	//RadJAV::MemoryAllocLog allocLog (alloc, RadJAV::String (file), line, RadJAV::String (func));
	//RadJAV::RadJav::logNewMemoryAlloc(allocLog);

	return (alloc);
}

void *operator new [](size_t size, const char *file, int line, const char *func)
{
	void *alloc = malloc (size);

	//RadJAV::MemoryAllocLog allocLog (alloc, RadJAV::String (file), line, RadJAV::String (func));
	//RadJAV::RadJav::logNewMemoryAlloc(allocLog);

	return (alloc);
}

void operator delete (void *alloc, const char *file, int line, const char *func)
{
	//RadJAV::MemoryAllocLog allocLog(alloc, RadJAV::String(file), line, RadJAV::String(func));
	//RadJAV::RadJav::removeMemoryAlloc(allocLog);
	free (alloc);
}
#endif

namespace RadJAV
{
	#ifdef GUI_USE_WXWIDGETS
		wxWidgetsRadJav *RadJav::app = NULL;
	#endif
	JavascriptEngine *RadJav::javascriptEngine = NULL;
	Theme *RadJav::theme = NULL;
	Lang *RadJav::lang = NULL;
	Array<String> RadJav::arguments;

	#ifdef RADJAV_DEBUG
		HashMap<size_t, MemoryAllocLog> RadJav::memoryAllocs;
	#endif

	#ifdef GUI_USE_WXWIDGETS
		RadJavType RadJav::initialize(Array<String> newArgs, wxWidgetsRadJav *newApp, bool initializeWxWidgets)
		{
			arguments = newArgs;

			if (newArgs.size() > 0)
			{
				RJBOOL pause = false;

				for (RJUINT iIdx = 0; iIdx < newArgs.size(); iIdx++)
				{
					if (newArgs.at(iIdx) == "xrjv1")
					{
						#ifdef WIN32
							setupConsoleOutput();
						#endif

						#ifdef USE_BLOCKCHAIN_V1
							SetupEnvironment();

							noui_connect();

							int argc = newArgs.size() - iIdx;
							char **argv = new char *[argc];

							for (RJUINT iJdx = iIdx; iJdx < newArgs.size(); iJdx++)
							{
								char *cstr = (char *)newArgs.at(iJdx).c_str();
								RJUINT index = iJdx - iIdx;
								argv[index] = cstr;
							}

							AppInit(argc, argv);

							DELETEARRAY(argv);
						#else
							RadJav::showError("BlockchainV1 was not compiled with this version of RadJav.");
							#ifdef WIN32
								if (pause == false)
									system("PAUSE");
							#endif
						#endif

						if (pause == true)
							system("PAUSE");

						return (RadJavType::XRJ_NODE);
					}

					if (newArgs.at(iIdx) == "xrjv1-cli")
					{
						#ifdef WIN32
							setupConsoleOutput();
						#endif

						#ifdef USE_BLOCKCHAIN_V1
							int argc = newArgs.size() - iIdx;
							char **argv = new char *[argc];

							for (RJUINT iJdx = iIdx; iJdx < newArgs.size(); iJdx++)
							{
								char *cstr = (char *)newArgs.at(iJdx).c_str();
								RJUINT index = iJdx - iIdx;
								argv[index] = cstr;
							}

							startXRJV1CLI(argc, argv);

							DELETEARRAY(argv);
						#else
							RadJav::showError("BlockchainV1 was not compiled with this version of RadJav.");
							#ifdef WIN32
								if (pause == false)
									system("PAUSE");
							#endif
						#endif

						if (pause == true)
							system("PAUSE");

						return (RadJavType::XRJ_NODE);
					}

					if (newArgs.at(iIdx) == "--version")
					{
						#ifdef WIN32
							setupConsoleOutput();
						#endif

						RadJav::printToOutputWindow("RadJav Version " + String (RADJAV_VERSION_MAJOR) + "." + String (RADJAV_VERSION_MINOR) + "\n");
						#ifdef USE_BLOCKCHAIN_V1
							RadJav::printToOutputWindow("XRJV1 " + String(CLIENT_VERSION_MAJOR) + "." + String (CLIENT_VERSION_MINOR) + "." + String (CLIENT_VERSION_REVISION) + "  is included.\n");
						#else
							RadJav::printToOutputWindow("XRJV1 is not included.\n");
						#endif

						if (pause == true)
							system("PAUSE");

						return (RadJavType::XRJ_NODE);
					}

					if (newArgs.at(iIdx) == "--pause")
						pause = true;
				}

				if (pause == true)
					system("PAUSE");
			}

			if (newApp == NULL)
				newApp = RJNEW wxWidgetsRadJav();

			RadJav::app = newApp;

			if (initializeWxWidgets == true)
			{
				int iArgs = 0;
				wxChar **cArgs = 0;

				wxApp::SetInstance((wxAppConsole *)RadJav::app);
				wxEntryStart(iArgs, cArgs);
				wxInitAllImageHandlers ();
				((wxApp *)RadJav::app)->OnInit();
			}

			#ifdef HTTP_USE_CIVETWEB
				mg_init_library(8 | 16);
			#endif

			#ifdef HTTP_USE_CURL
				curl_global_init (CURL_GLOBAL_DEFAULT);
			#endif

			theme = RJNEW Theme ();

			#ifdef USE_V8
				javascriptEngine = RJNEW V8JavascriptEngine ();
			#endif

			return (RadJavType::VM);
		}
	#else
		RadJavType RadJav::initialize(Array<String> newArgs)
		{
			arguments = newArgs;

			theme = RJNEW Theme();

			#ifdef USE_V8
				javascriptEngine = RJNEW V8JavascriptEngine();
			#endif

			return (RadJavType::VM);
		}
	#endif

	#ifdef WIN32
	void RadJav::setupConsoleOutput()
	{
		CONSOLE_SCREEN_BUFFER_INFO csbInfo;

		AllocConsole();

		GetConsoleScreenBufferInfo(GetStdHandle(STD_OUTPUT_HANDLE), &csbInfo);
		csbInfo.dwSize.Y = 200;
		SetConsoleScreenBufferSize(GetStdHandle(STD_OUTPUT_HANDLE), csbInfo.dwSize);

		long lStdHandle = (long)GetStdHandle(STD_OUTPUT_HANDLE);
		int iConHandle = _open_osfhandle(lStdHandle, _O_TEXT);
		FILE *fFile = _fdopen(iConHandle, "w");
		*stdout = *fFile;
		setvbuf(stdout, 0, _IONBF, 0);

		lStdHandle = (long)GetStdHandle(STD_INPUT_HANDLE);
		iConHandle = _open_osfhandle(lStdHandle, _O_TEXT);
		fFile = _fdopen(iConHandle, "r");
		*stdin = *fFile;
		setvbuf(stdin, 0, _IONBF, 0);

		lStdHandle = (long)GetStdHandle(STD_ERROR_HANDLE);
		iConHandle = _open_osfhandle(lStdHandle, _O_TEXT);
		fFile = _fdopen(iConHandle, "w");
		*stderr = *fFile;
		setvbuf(stderr, 0, _IONBF, 0);

		freopen("CONOUT$", "w", stdout);
		std::ios::sync_with_stdio();
	}
	#endif

	void RadJav::runEventLoop()
	{
		while (true)
			runEventLoopSingleStep();
	}

	void RadJav::runEventLoopSingleStep()
	{
		#ifdef GUI_USE_WXWIDGETS
			RadJav::app->runSystem();

			wxMilliSleep(1);
		#endif
	}

	void RadJav::runApplication (String application, String fileName)
	{
		javascriptEngine->runApplication (application, fileName);
	}

	void RadJav::runApplicationFromFile (String file)
	{
		javascriptEngine->runApplicationFromFile (file);
	}

	void RadJav::showMessageBox(String message, String title)
	{
		#ifdef GUI_USE_WXWIDGETS
			wxMessageBox(message.towxString(), title.towxString(), wxOK);
		#endif
	}

	void RadJav::showError(String message, RJBOOL showMessageBox)
	{
		std::cout << message.c_str () << std::endl;

		if (showMessageBox == true)
			RadJav::showMessageBox(message, "Error");
	}

	void RadJav::printToOutputWindow(String message)
	{
		#ifdef WIN32
			#ifdef USE_CHAR
				OutputDebugStringA(message.c_str ());
			#else
				OutputDebugString (message.towcharString ());
			#endif
		#endif

		std::cout << message.c_str ();
	}

	void RadJav::shutdown()
	{
		DELETEOBJ (lang);
		DELETEOBJ(theme);

		#ifdef GUI_USE_WXWIDGETS
			DELETEOBJ(app);
		#endif

		DELETEOBJ(javascriptEngine);

		#ifdef HTTP_USE_CURL
			curl_global_cleanup ();
		#endif
	}

	#ifdef RADJAV_DEBUG
	void RadJav::logNewMemoryAlloc(MemoryAllocLog alloc)
	{
		memoryAllocs.insert (HashMapPair<size_t, MemoryAllocLog> ((size_t)alloc.alloc, alloc));
	}

	void RadJav::removeMemoryAlloc(MemoryAllocLog alloc)
	{
		HashMap<size_t, MemoryAllocLog>::iterator it = memoryAllocs.find ((size_t)alloc.alloc);
		memoryAllocs.erase (it);
	}

	String RadJav::reportMemoryLeaks()
	{
		HashMap<size_t, MemoryAllocLog>::iterator begin = memoryAllocs.begin ();
		HashMap<size_t, MemoryAllocLog>::iterator end = memoryAllocs.end ();
		String memoryLeaksReport = "";
		int numLeaks = 0;

		memoryLeaksReport = "Memory Leaks Report\n";
		memoryLeaksReport += "----------------------------------------\n";
		memoryLeaksReport += "Memory Location - File - Line - Function\n";
		memoryLeaksReport += "----------------------------------------\n";

		while (begin != end)
		{
			MemoryAllocLog alloc = (*begin).second;
			memoryLeaksReport += String::fromUInt((size_t)alloc.alloc) + " ";
			memoryLeaksReport += alloc.file + " ";
			memoryLeaksReport += String::fromInt (alloc.line) + " ";
			memoryLeaksReport += alloc.func + "\n";
			numLeaks++;
			begin++;
		}

		memoryLeaksReport += "\n";
		memoryLeaksReport += "Number of memory leaks: " + numLeaks;

		return (memoryLeaksReport);
	}
	#endif
}
