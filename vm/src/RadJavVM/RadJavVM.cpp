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
#include "RadJavVM.h"

#include <iostream>
#include <codecvt>

#ifdef WIN32
	#include <windows.h>
#endif

#define memicmp _memicmp

#if defined (WIN32)
	int WINAPI WinMain (HINSTANCE hInstancepass, HINSTANCE hPrevInstance, LPSTR cArgs, int iArgs)
	{
		int iReturn = 0;

		#ifdef _DEBUG
			#if (ENABLE_MEMLEAKTRACER == 1)
				_CrtDumpMemoryLeaks ();
				_CrtSetReportMode (_CRT_ERROR, _CRTDBG_MODE_DEBUG);
				//_CrtSetDbgFlag (_CRTDBG_ALLOC_MEM_DF | _CRTDBG_LEAK_CHECK_DF);
			#endif
		#endif

		RadJAV::Array<RadJAV::String> args;
		RadJAV::String strArgs = cArgs;

		if (strArgs != "")
		{
			RJINT numArgs = 0;
			LPWSTR *strArgs = CommandLineToArgvW(GetCommandLineW (), &numArgs);

			for (RJINT iIdx = 0; iIdx < numArgs; iIdx++)
			{
				std::wstring wstr = strArgs[iIdx];
				std::wstring_convert<std::codecvt_utf8<WCHAR> > conv;
				std::string newStr = conv.to_bytes(wstr);
				RadJAV::String newStr2 = newStr;
				args.push_back(newStr);
			}

			LocalFree(strArgs);
		}

		RadJavVM::initialize (args);
		RadJavVM::shutdown();

		return (iReturn);
	}

	// For console users.
	#define USE_MAIN_FUNCTION
#else
	#define USE_MAIN_FUNCTION
#endif

#ifdef USE_MAIN_FUNCTION
	int main(int iArgs, char **cArgs)
	{
		RadJAV::Array<RadJAV::String> args;

		for (int iIdx = 0; iIdx < iArgs; iIdx++)
			args.push_back(cArgs[iIdx]);

		if (args.size() < 1)
			args.push_back("");

		RadJavVM::initialize(args);
		RadJavVM::shutdown();

		return (0);
	}
#endif

void RadJavVM::initialize (RadJAV::Array<RadJAV::String> args)
{
	if (RadJAV::RadJav::initialize(args) == RadJAV::RadJavType::XRJ_NODE)
		return;

	try
	{
		if (args.size() < 2)
		{
			showError("No files to execute or arguments specified!");

			return;
		}

		RadJAV::RadJav::runApplicationFromFile (args.at (1));
	}
	catch (RadJAV::Exception ex)
	{
		showError (ex.getMessage());
	}
}

void RadJavVM::shutdown()
{
	RadJAV::RadJav::shutdown();
}

void RadJavVM::showError(RadJAV::String message)
{
	std::cout << message.c_str () << std::endl;

	#ifdef WIN32
		RadJAV::String errTitle = "Error";

		#ifdef USE_CHAR
			MessageBoxA(0, message.c_str(), errTitle.c_str(), (MB_OK | MB_ICONEXCLAMATION));
		#else
			MessageBox (0, message.towcharString(), errTitle.towcharString(), (MB_OK | MB_ICONEXCLAMATION));
		#endif
	#endif
}

