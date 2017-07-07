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
#ifndef _RADJAV_WXWIDGETS_H_
	#define _RADJAV_WXWIDGETS_H_

	#ifdef GUI_USE_WXWIDGETS
		#include <string>
		#include <vector>
		#include <sstream>
		#include <ostream>
		#include <cmath>

		#include "RadJavString.h"
		#include "RadJavArray.h"

		#include <wx/wx.h>
		#include <wx/app.h>

		class wxDynamicLibrary;
		class wxSocketEvent;

		namespace RadJAV
		{
			/// wxWidgets for RadJav 
			class wxWidgetsRadJav: public wxApp
			{
				public:
					inline wxWidgetsRadJav()
					{
					}

					/// Executes when the app has initialized.
					bool OnInit ();
					int OnRun ();
					void OnUnhandledException ();
					void OnFatalException ();
					int OnExit ();

					// Networking
					#ifdef NET_ON
						void ServerEvent (wxSocketEvent &evtEvent);

						void SocketEvent (wxSocketEvent &evtEvent);
					#endif

					void runSystem ();

					Array<wxThread *> aryThreads;
					wxCriticalSection wcsCritical;

				private:
					DECLARE_EVENT_TABLE ()
			};

			/*class wxWidgetsRadJav: public wxEvtHandler
			{
				public:
					virtual bool OnInit () = 0;
					virtual int OnRun () = 0;
					virtual void OnUnhandledException () = 0;
					virtual void OnFatalException () = 0;
					virtual int OnExit () = 0;

					// Networking
					#ifdef NET_ON
						virtual void ServerEvent (wxSocketEvent &evtEvent) = 0;

						virtual void SocketEvent (wxSocketEvent &evtEvent) = 0;
					#endif

					virtual void runSystem () = 0;
			};*/
		}
	#endif
#endif

