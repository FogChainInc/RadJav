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
#include "v8/RadJavV8OS.h"

#include "RadJav.h"
#include "RadJavString.h"

#ifdef USE_V8
	#include "v8/RadJavV8JavascriptEngine.h"

	#ifdef GUI_USE_WXWIDGETS
		#include <wx/wx.h>
		#include <wx/stdpaths.h>
	#endif

namespace RadJAV
{
	v8::Persistent<v8::Value> *OS::onReadyFunction = NULL;

	void OS::createV8Callbacks(v8::Isolate *isolate, v8::Local<v8::Object> object)
	{
		V8_CALLBACK(object, "onReady", OS::onReady);
		V8_CALLBACK(object, "openWebBrowserURL", OS::openWebBrowserURL);
		V8_CALLBACK(object, "exec", OS::exec);
		V8_CALLBACK(object, "getDocumentsPath", OS::getDocumentsPath);
		V8_CALLBACK(object, "getTempPath", OS::getTempPath);
		V8_CALLBACK(object, "getUserDataPath", OS::getUserDataPath);
		V8_CALLBACK(object, "getApplicationPath", OS::getApplicationPath);
		V8_CALLBACK(object, "getCurrentWorkingPath", OS::getCurrentWorkingPath);
		V8_CALLBACK(object, "setCurrentWorkingPath", OS::setCurrentWorkingPath);
		V8_CALLBACK(object, "saveFileAs", OS::saveFileAs);
		V8_CALLBACK(object, "openFileAs", OS::openFileAs);
	}

	void OS::onReady(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		v8::Local<v8::Function> func = v8::Local<v8::Function>::Cast (V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 0));
		v8::Persistent<v8::Value> *persistent = RJNEW v8::Persistent<v8::Value>();

		persistent->Reset(V8_JAVASCRIPT_ENGINE->isolate, func);

		if (onReadyFunction != NULL)
			DELETEOBJ(onReadyFunction);

		onReadyFunction = persistent;
	}

	void OS::openWebBrowserURL(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String url = parseV8Value (V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 0));

		#ifdef GUI_USE_WXWIDGETS
			wxLaunchDefaultBrowser(url.towxString ());
		#endif
	}

	void OS::exec(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String command = parseV8Value (V8_JAVASCRIPT_ENGINE->v8GetArgument(args, 0));
		RJINT output = 0;

		#ifdef GUI_USE_WXWIDGETS
			output = wxExecute(command.towxString ());
		#endif

		args.GetReturnValue().Set(v8::Integer::New (args.GetIsolate (), output));
	}

	void OS::getDocumentsPath(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String str = "";

		#ifdef GUI_USE_WXWIDGETS
			str = parsewxString (wxStandardPaths::Get().GetDocumentsDir());
		#endif

		args.GetReturnValue().Set(str.toV8String (args.GetIsolate ()));
	}

	void OS::getTempPath(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String str = "";

		#ifdef GUI_USE_WXWIDGETS
			str = parsewxString(wxStandardPaths::Get().GetTempDir());
		#endif

		args.GetReturnValue().Set(str.toV8String(args.GetIsolate()));
	}

	void OS::getUserDataPath(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String str = "";

		#ifdef GUI_USE_WXWIDGETS
			str = parsewxString(wxStandardPaths::Get().GetUserConfigDir());
		#endif

		args.GetReturnValue().Set(str.toV8String(args.GetIsolate()));
	}

	void OS::getApplicationPath(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String str = "";

		#ifdef GUI_USE_WXWIDGETS
			str = parsewxString(wxStandardPaths::Get().GetExecutablePath());
		#endif

		args.GetReturnValue().Set(str.toV8String(args.GetIsolate()));
	}

	void OS::getCurrentWorkingPath(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String str = "";

		#ifdef GUI_USE_WXWIDGETS
			str = parsewxString(wxGetCwd ());
		#endif

		args.GetReturnValue().Set(str.toV8String(args.GetIsolate()));
	}

	void OS::setCurrentWorkingPath(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String str = parseV8Value (args[0]);

		#ifdef GUI_USE_WXWIDGETS
			wxSetWorkingDirectory(str);
		#endif
	}

	void OS::saveFileAs(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String str = "";
		String message = "";
		String defaultDir = "";
		String defaultFile = "";
		String wildcard = "";
		RJBOOL overwritePrompt = true;
		String path = "";

		if (args.Length() > 0)
		{
			if (args[0]->IsString () == true)
				message = parseV8Value(args[0]);
			
			if (args[0]->IsObject() == true)
			{
				v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast (args[0]);

				message = V8_JAVASCRIPT_ENGINE->v8GetString(obj, "message");
				defaultDir = V8_JAVASCRIPT_ENGINE->v8GetString(obj, "defaultDir");
				defaultFile = V8_JAVASCRIPT_ENGINE->v8GetString(obj, "defaultFile");
				wildcard = V8_JAVASCRIPT_ENGINE->v8GetString(obj, "wildcard");
				overwritePrompt = V8_JAVASCRIPT_ENGINE->v8GetBool(obj, "overwritePrompt");
			}
		}

		#ifdef GUI_USE_WXWIDGETS
			wxString wxmsg = wxFileSelectorPromptStr;

			if (message != "")
				wxmsg = message.towxString();

			RJLONG style = wxFD_SAVE;

			if (overwritePrompt == true)
				style |= wxFD_OVERWRITE_PROMPT;

			wxFileDialog fileDialog(NULL, wxmsg, defaultDir.towxString (), defaultFile.towxString(), wildcard.towxString (), style);

			if (fileDialog.ShowModal() != wxID_CANCEL)
				path = parsewxString (fileDialog.GetPath());
		#endif

		args.GetReturnValue().Set(path.toV8String(args.GetIsolate()));
	}

	void OS::openFileAs(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String str = "";
		String message = "";
		String defaultDir = "";
		String defaultFile = "";
		String wildcard = "";
		RJBOOL fileMustExist = true;
		String path = "";

		if (args.Length() > 0)
		{
			if (args[0]->IsString() == true)
				message = parseV8Value(args[0]);

			if (args[0]->IsObject() == true)
			{
				v8::Local<v8::Object> obj = v8::Local<v8::Object>::Cast(args[0]);

				message = V8_JAVASCRIPT_ENGINE->v8GetString(obj, "message");
				defaultDir = V8_JAVASCRIPT_ENGINE->v8GetString(obj, "defaultDir");
				defaultFile = V8_JAVASCRIPT_ENGINE->v8GetString(obj, "defaultFile");
				wildcard = V8_JAVASCRIPT_ENGINE->v8GetString(obj, "wildcard");
				fileMustExist = V8_JAVASCRIPT_ENGINE->v8GetBool(obj, "fileMustExist");
			}
		}

		#ifdef GUI_USE_WXWIDGETS
			wxString wxmsg = wxFileSelectorPromptStr;

			if (message != "")
				wxmsg = message.towxString();

			RJLONG style = wxFD_OPEN;

			if (fileMustExist == true)
				style |= wxFD_FILE_MUST_EXIST;

			wxFileDialog fileDialog(NULL, wxmsg, defaultDir.towxString(), defaultFile.towxString(), wildcard.towxString(), style);

			if (fileDialog.ShowModal() != wxID_CANCEL)
				path = parsewxString(fileDialog.GetPath());
		#endif

		args.GetReturnValue().Set(path.toV8String(args.GetIsolate()));
	}
}
#endif

