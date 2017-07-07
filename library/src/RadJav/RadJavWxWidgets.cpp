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
#include "RadJavWxWidgets.h"

#ifdef GUI_USE_WXWIDGETS
	#include <wx/wxprec.h>
	#include <wx/wx.h>
	#include <wx/evtloop.h>
	#include <wx/display.h>
	#include <wx/stdpaths.h>
	#include <wx/string.h>

	#ifdef NET_ON
		#include "RadJavWxWidgetsNetworking.h"
	#endif

BEGIN_EVENT_TABLE(RadJAV::wxWidgetsRadJav, wxApp)
	#ifdef NET_ON
		EVT_SOCKET(SOCKET_SERVER, RadJAV::wxWidgetsRadJav::ServerEvent)

		EVT_SOCKET(SOCKET_SOCKET, RadJAV::wxWidgetsRadJav::SocketEvent)
	#endif
END_EVENT_TABLE()

IMPLEMENT_APP_NO_MAIN(RadJAV::wxWidgetsRadJav)

namespace RadJAV
{
	// wxWidgetsRadJav
	bool wxWidgetsRadJav::OnInit ()
	{
		#ifdef NET_ON
			wxSocketBase::Initialize();
		#endif

		return (true);
	}

	int wxWidgetsRadJav::OnRun ()
	{
		//for (int iIdx = 0; iIdx < (int)aryWindows.size (); iIdx++)
		//{
		//	wxPaintEvent evtEvent;
		//	aryWindows.at (iIdx)->OnPaint (evtEvent);
		//}

		return (wxApp::OnRun ());
	}

	void wxWidgetsRadJav::OnUnhandledException ()
	{
	}

	void wxWidgetsRadJav::OnFatalException ()
	{
	}

	int wxWidgetsRadJav::OnExit ()
	{
		return (0);
	}

	void wxWidgetsRadJav::runSystem ()
	{
		wxEventLoop *evtLoop = RJNEW wxEventLoop();
		wxEventLoop *evtOldLoop = (wxEventLoop *)wxEventLoop::GetActive ();
		wxEventLoop::SetActive (evtLoop);

		if (Pending () == true)
			Dispatch ();

		wxEventLoop::SetActive (evtOldLoop);

		DELETEOBJ (evtLoop);
	}

	#ifdef NET_ON
	void wxWidgetsRadJav::ServerEvent (wxSocketEvent &evtEvent)
	{
		switch (evtEvent.GetSocketEvent ())
		{
			case wxSOCKET_CONNECTION:
				//scbMultiplayer_PuzzleCallback->Execute (NET_HANDLE_TYPE_ACCEPT, -1);
				break;
		}
	}

	void wxWidgetsRadJav::SocketEvent (wxSocketEvent &evtEvent)
	{
		switch (evtEvent.GetSocketEvent ())
		{
			case wxSOCKET_CONNECTION:
				//scbMultiplayer_PuzzleCallback->Execute (NET_HANDLE_TYPE_CONNECT, -1);
				break;
			case wxSOCKET_INPUT:
				//scbMultiplayer_PuzzleCallback->Execute (NET_HANDLE_TYPE_READ, -1);
				break;
			case wxSOCKET_LOST:
				//scbMultiplayer_PuzzleCallback->Execute (NET_HANDLE_TYPE_ERROR, -1);
				break;
		}
	}
	#endif
}
#endif

