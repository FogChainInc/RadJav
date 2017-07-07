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
#include "RadJavWxWidgetsNetworking.h"

#include "RadJav.h"

#ifndef NET_MAX_BUF_SIZE
	#define NET_MAX_BUF_SIZE	256
#endif

#ifdef GUI_USE_WXWIDGETS
	#include <wx/wx.h>
	#include <wx/event.h>

#ifdef NET_ON
namespace RadJAV
{
	namespace Networking
	{
		Array<String> wxWidgetsUtils::getComputerIPs ()
		{
			Array<String> aryReturn;
			wxIPV4address ipAddress;
			ipAddress.Hostname (wxGetFullHostName ());

			wxString strAddr = ipAddress.IPAddress ();
			aryReturn.push_back (RadJAV::convertwxStringToString (strAddr));

			return (aryReturn);
		}

		Array< Array<unsigned long> > wxWidgetsUtils::getMACAddresses ()
		{
			Array< Array<unsigned long> > aryReturn;

			return (aryReturn);
		}

		// wxWidgetsTCPServer
		wxWidgetsTCPServer::wxWidgetsTCPServer ()
			: TcpipClient ()
		{
		}

		bool wxWidgetsTCPServer::init (unsigned short newPort)
		{
			wxIPV4address ipAddress;
			ipAddress.AnyAddress ();
			ipAddress.Service (newPort);

			socket = RJNEW wxSocketServer (ipAddress);

			if (socket->Ok () == false)
			{
				wssServer->Close ();

				if (wssServer != 0)
					DELETEOBJ (wssServer);

				return (false);
			}

			wssServer->SetEventHandler (*(RadJAV::RadJav::getwxWidgetsApp()), SOCKET_SERVER);
			wssServer->SetNotify (wxSOCKET_CONNECTION_FLAG);
			void *vData = tcpParent->getHiddenData ("socket");
			wssServer->SetClientData (vData);
			wssServer->Notify (true);

			adrServer = ipAddress;
			port = newPort;

			return (true);
		}

		bool wxWidgetsTCPServer::AcceptWithBlocking ()
		{
			wxSocketBase *wsbSocket = wssServer->Accept (true);

			if (wsbSocket == 0)
				return (false);

			wsbSocket->SetEventHandler (*(RadJAV::RadJav::getwxWidgetsApp()), SOCKET_SOCKET);
			wsbSocket->SetNotify (wxSOCKET_INPUT_FLAG | wxSOCKET_LOST_FLAG);
			void *vData = tcpParent->getHiddenData ("socket");
			wsbSocket->SetClientData (vData);
			wsbSocket->Notify (true);

			aryClientSockets.push_back (wsbSocket);

			wxIPV4address wsaAddr;
			wsbSocket->GetPeer (wsaAddr);
			aryAddresses.push_back (wsaAddr);

			return (true);
		}

		bool wxWidgetsTCPServer::AcceptWithoutBlocking ()
		{
			wxSocketBase *wsbSocket = wssServer->Accept (false);

			if (wsbSocket == 0)
				return (false);

			wsbSocket->SetEventHandler (*(RadJAV::RadJav::getwxWidgetsApp()), SOCKET_SOCKET);
			wsbSocket->SetNotify (wxSOCKET_INPUT_FLAG | wxSOCKET_LOST_FLAG);
			void *vData = tcpParent->getHiddenData ("socket");
			wsbSocket->SetClientData (vData);
			wsbSocket->Notify (true);

			aryClientSockets.push_back (wsbSocket);

			wxIPV4address wsaAddr;
			wsbSocket->GetPeer (wsaAddr);
			aryAddresses.push_back (wsaAddr);

			return (true);
		}

		bool wxWidgetsTCPServer::SendFloatToAll (float fFloat, Array<size_t> aryExcept)
		{
			size_t uiSocketsLength = aryClientSockets.size ();

			for (size_t uiIdx = 0; uiIdx < uiSocketsLength; uiIdx++)
			{
				bool bContinue = false;

				for (size_t uiJdx = 0; uiJdx < aryExcept.size (); uiJdx++)
				{
					if (uiIdx == aryExcept.at (uiJdx))
					{
						bContinue = true;

						break;
					}
				}

				if (bContinue == true)
					continue;

				if (SendFloat (aryClientSockets.at (uiIdx), fFloat) == false)
					continue;
			}

			return (true);
		}

		bool wxWidgetsTCPServer::SendFloat (wxSocketBase *socSocket, float fFloat)
		{
			socSocket->Write ((const char *)&fFloat, sizeof (float));

			if (socSocket->Error () == true)
			{
				CloseClientSocket (socSocket);

				return (false);
			}

			return (true);
		}

		bool wxWidgetsTCPServer::SendDoubleToAll (double dDouble, Array<size_t> aryExcept)
		{
			size_t uiSocketsLength = aryClientSockets.size ();

			for (size_t uiIdx = 0; uiIdx < uiSocketsLength; uiIdx++)
			{
				bool bContinue = false;

				for (size_t uiJdx = 0; uiJdx < aryExcept.size (); uiJdx++)
				{
					if (uiIdx == aryExcept.at (uiJdx))
					{
						bContinue = true;

						break;
					}
				}

				if (bContinue == true)
					continue;

				if (SendDouble (aryClientSockets.at (uiIdx), dDouble) == false)
					continue;
			}

			return (true);
		}

		bool wxWidgetsTCPServer::SendDouble (wxSocketBase *socSocket, double dDouble)
		{
			socSocket->Write ((const char *)&dDouble, sizeof (double));

			if (socSocket->Error () == true)
			{
				CloseClientSocket (socSocket);

				return (false);
			}

			return (true);
		}

		bool wxWidgetsTCPServer::SendIntToAll (int iInt, Array<size_t> aryExcept)
		{
			size_t uiSocketsLength = aryClientSockets.size ();

			for (size_t uiIdx = 0; uiIdx < uiSocketsLength; uiIdx++)
			{
				bool bContinue = false;

				for (size_t uiJdx = 0; uiJdx < aryExcept.size (); uiJdx++)
				{
					if (uiIdx == aryExcept.at (uiJdx))
					{
						bContinue = true;

						break;
					}
				}

				if (bContinue == true)
					continue;

				if (SendInt (aryClientSockets.at (uiIdx), iInt) == false)
					continue;
			}

			return (true);
		}

		bool wxWidgetsTCPServer::SendInt (wxSocketBase *socSocket, int iInt)
		{
			socSocket->Write ((const char *)&iInt, sizeof (int));

			if (socSocket->Error () == true)
			{
				CloseClientSocket (socSocket);

				return (false);
			}

			return (true);
		}

		bool wxWidgetsTCPServer::SendUIntToAll (size_t uiInt, Array<size_t> aryExcept)
		{
			size_t uiSocketsLength = aryClientSockets.size ();

			for (size_t uiIdx = 0; uiIdx < uiSocketsLength; uiIdx++)
			{
				bool bContinue = false;

				for (size_t uiJdx = 0; uiJdx < aryExcept.size (); uiJdx++)
				{
					if (uiIdx == aryExcept.at (uiJdx))
					{
						bContinue = true;

						break;
					}
				}

				if (bContinue == true)
					continue;

				if (SendUInt (aryClientSockets.at (uiIdx), uiInt) == false)
					continue;
			}

			return (true);
		}

		bool wxWidgetsTCPServer::SendUInt (wxSocketBase *socSocket, size_t uiInt)
		{
			socSocket->Write ((const char *)&uiInt, sizeof (size_t));

			if (socSocket->Error () == true)
			{
				CloseClientSocket (socSocket);

				return (false);
			}

			return (true);
		}

		bool wxWidgetsTCPServer::SendLongToAll (long lLong, Array<size_t> aryExcept)
		{
			size_t uiSocketsLength = aryClientSockets.size ();

			for (size_t uiIdx = 0; uiIdx < uiSocketsLength; uiIdx++)
			{
				bool bContinue = false;

				for (size_t uiJdx = 0; uiJdx < aryExcept.size (); uiJdx++)
				{
					if (uiIdx == aryExcept.at (uiJdx))
					{
						bContinue = true;

						break;
					}
				}

				if (bContinue == true)
					continue;

				if (SendLong (aryClientSockets.at (uiIdx), lLong) == false)
					continue;
			}

			return (true);
		}

		bool wxWidgetsTCPServer::SendLong (wxSocketBase *socSocket, long lLong)
		{
			socSocket->Write ((const char *)&lLong, sizeof (long));

			if (socSocket->Error () == true)
			{
				CloseClientSocket (socSocket);

				return (false);
			}

			return (true);
		}

		bool wxWidgetsTCPServer::SendULongToAll (unsigned long ulLong, Array<size_t> aryExcept)
		{
			size_t uiSocketsLength = aryClientSockets.size ();

			for (size_t uiIdx = 0; uiIdx < uiSocketsLength; uiIdx++)
			{
				bool bContinue = false;

				for (size_t uiJdx = 0; uiJdx < aryExcept.size (); uiJdx++)
				{
					if (uiIdx == aryExcept.at (uiJdx))
					{
						bContinue = true;

						break;
					}
				}

				if (bContinue == true)
					continue;

				if (SendULong (aryClientSockets.at (uiIdx), ulLong) == false)
					continue;
			}

			return (true);
		}

		bool wxWidgetsTCPServer::SendULong (wxSocketBase *socSocket, unsigned long ulLong)
		{
			socSocket->Write ((const char *)&ulLong, sizeof (unsigned long));

			if (socSocket->Error () == true)
			{
				CloseClientSocket (socSocket);

				return (false);
			}

			return (true);
		}

		bool wxWidgetsTCPServer::SendShortToAll (short sShort, Array<size_t> aryExcept)
		{
			size_t uiSocketsLength = aryClientSockets.size ();

			for (size_t uiIdx = 0; uiIdx < uiSocketsLength; uiIdx++)
			{
				bool bContinue = false;

				for (size_t uiJdx = 0; uiJdx < aryExcept.size (); uiJdx++)
				{
					if (uiIdx == aryExcept.at (uiJdx))
					{
						bContinue = true;

						break;
					}
				}

				if (bContinue == true)
					continue;

				if (SendShort (aryClientSockets.at (uiIdx), sShort) == false)
					continue;
			}

			return (true);
		}

		bool wxWidgetsTCPServer::SendShort (wxSocketBase *socSocket, short sShort)
		{
			socSocket->Write ((const char *)&sShort, sizeof (short));

			if (socSocket->Error () == true)
			{
				CloseClientSocket (socSocket);

				return (false);
			}

			return (true);
		}

		bool wxWidgetsTCPServer::SendUShortToAll (unsigned short usShort, Array<size_t> aryExcept)
		{
			size_t uiSocketsLength = aryClientSockets.size ();

			for (size_t uiIdx = 0; uiIdx < uiSocketsLength; uiIdx++)
			{
				bool bContinue = false;

				for (size_t uiJdx = 0; uiJdx < aryExcept.size (); uiJdx++)
				{
					if (uiIdx == aryExcept.at (uiJdx))
					{
						bContinue = true;

						break;
					}
				}

				if (bContinue == true)
					continue;

				if (SendUShort (aryClientSockets.at (uiIdx), usShort) == false)
					continue;
			}

			return (true);
		}

		bool wxWidgetsTCPServer::SendUShort (wxSocketBase *socSocket, unsigned short usShort)
		{
			socSocket->Write ((const char *)&usShort, sizeof (unsigned short));

			if (socSocket->Error () == true)
			{
				CloseClientSocket (socSocket);

				return (false);
			}

			return (true);
		}

		bool wxWidgetsTCPServer::SendCharToAll (char cChar, Array<size_t> aryExcept)
		{
			size_t uiSocketsLength = aryClientSockets.size ();

			for (size_t uiIdx = 0; uiIdx < uiSocketsLength; uiIdx++)
			{
				bool bContinue = false;

				for (size_t uiJdx = 0; uiJdx < aryExcept.size (); uiJdx++)
				{
					if (uiIdx == aryExcept.at (uiJdx))
					{
						bContinue = true;

						break;
					}
				}

				if (bContinue == true)
					continue;

				if (SendChar (aryClientSockets.at (uiIdx), cChar) == false)
					continue;
			}

			return (true);
		}

		bool wxWidgetsTCPServer::SendChar (wxSocketBase *socSocket, char cChar)
		{
			socSocket->Write ((const char *)&cChar, sizeof (char));

			if (socSocket->Error () == true)
			{
				CloseClientSocket (socSocket);

				return (false);
			}

			return (true);
		}

		bool wxWidgetsTCPServer::SendUCharToAll (unsigned char ucChar, Array<size_t> aryExcept)
		{
			size_t uiSocketsLength = aryClientSockets.size ();

			for (size_t uiIdx = 0; uiIdx < uiSocketsLength; uiIdx++)
			{
				bool bContinue = false;

				for (size_t uiJdx = 0; uiJdx < aryExcept.size (); uiJdx++)
				{
					if (uiIdx == aryExcept.at (uiJdx))
					{
						bContinue = true;

						break;
					}
				}

				if (bContinue == true)
					continue;

				if (SendUChar (aryClientSockets.at (uiIdx), ucChar) == false)
					continue;
			}

			return (true);
		}

		bool wxWidgetsTCPServer::SendUChar (wxSocketBase *socSocket, unsigned char ucChar)
		{
			socSocket->Write ((const char *)&ucChar, sizeof (unsigned char));

			if (socSocket->Error () == true)
			{
				CloseClientSocket (socSocket);

				return (false);
			}

			return (true);
		}

		bool wxWidgetsTCPServer::SendStringToAll (String strLine, Array<size_t> aryExcept)
		{
			int iError = 0;
			int iLength = ((int)strLine.size () + 1);
			size_t uiSocketsLength = aryClientSockets.size ();
			int uiIdx = 0;

			for (size_t uiIdx = 0; uiIdx < uiSocketsLength; uiIdx++)
			{
				bool bContinue = false;

				for (size_t uiJdx = 0; uiJdx < aryExcept.size (); uiJdx++)
				{
					if (uiIdx == aryExcept.at (uiJdx))
					{
						bContinue = true;

						break;
					}
				}

				if (bContinue == true)
					continue;

				if (SendString (aryClientSockets.at (uiIdx), strLine) == false)
					continue;
			}

			return (true);
		}

		bool wxWidgetsTCPServer::SendString (wxSocketBase *socSocket, String strLine)
		{
			char *cBuf = RJNEW char[(strLine.size () + 1)];
			const char *cCopy = strLine.c_str ();

			for (size_t iIdx = 0; iIdx < (strLine.size () + 1); iIdx++)
				cBuf[iIdx] = cCopy[iIdx];

			cBuf[strLine.size ()] = '\0';

			//ArrayZero (cBuf, (strLine.size () + 1));
			//ArrayCopy (((char *)strLine.c_str ()), cBuf, (strLine.size () + 1));

			socSocket->SetNotify (wxSOCKET_INPUT_FLAG | wxSOCKET_LOST_FLAG);
			socSocket->Write (cBuf, ((strLine.size () + 1) * sizeof (char)));
			socSocket->SetNotify (wxSOCKET_INPUT_FLAG | wxSOCKET_LOST_FLAG);

			DELETEARRAY (cBuf);

			if (socSocket->Error () == true)
			{
				CloseClientSocket (socSocket);

				return (false);
			}

			return (true);
		}

		Array<float> wxWidgetsTCPServer::RecvFloat ()
		{
			Array<float> aryReturn;
			size_t uiSocketsLength = aryClientSockets.size ();

			aryReceivedFrom.clear ();

			for (size_t uiIdx = 0; uiIdx < uiSocketsLength; uiIdx++)
			{
				float adtReturn = RecvFloat (aryClientSockets.at (uiIdx));

				aryReturn.push_back (adtReturn);
				aryReceivedFrom.push_back (uiIdx);
			}

			return (aryReturn);
		}

		float wxWidgetsTCPServer::RecvFloat (wxSocketBase *socSocket)
		{
			float fFloat = 0.0f;
			socSocket->Read ((char *)&fFloat, sizeof (float));

			if (socSocket->Error () == true)
			{
				CloseClientSocket (socSocket);

				return (0.0f);
			}

			return (fFloat);
		}

		Array<double> wxWidgetsTCPServer::RecvDouble ()
		{
			Array<double> aryReturn;
			size_t uiSocketsLength = aryClientSockets.size ();

			aryReceivedFrom.clear ();

			for (size_t uiIdx = 0; uiIdx < uiSocketsLength; uiIdx++)
			{
				double adtReturn = RecvDouble (aryClientSockets.at (uiIdx));

				aryReturn.push_back (adtReturn);
				aryReceivedFrom.push_back (uiIdx);
			}

			return (aryReturn);
		}

		double wxWidgetsTCPServer::RecvDouble (wxSocketBase *socSocket)
		{
			double dDouble = 0.0;
			socSocket->Read ((char *)&dDouble, sizeof (double));

			if (socSocket->Error () == true)
			{
				CloseClientSocket (socSocket);

				return (0.0);
			}

			return (dDouble);
		}

		Array<int> wxWidgetsTCPServer::RecvInt ()
		{
			Array<int> aryReturn;
			size_t uiSocketsLength = aryClientSockets.size ();

			aryReceivedFrom.clear ();

			for (size_t uiIdx = 0; uiIdx < uiSocketsLength; uiIdx++)
			{
				int adtReturn = RecvInt (aryClientSockets.at (uiIdx));

				aryReturn.push_back (adtReturn);
				aryReceivedFrom.push_back (uiIdx);
			}

			return (aryReturn);
		}

		int wxWidgetsTCPServer::RecvInt (wxSocketBase *socSocket)
		{
			int iInt = 0;
			socSocket->Read ((char *)&iInt, sizeof (int));

			if (socSocket->Error () == true)
			{
				CloseClientSocket (socSocket);

				return (0);
			}

			return (iInt);
		}

		Array<size_t> wxWidgetsTCPServer::RecvUInt ()
		{
			Array<size_t> aryReturn;
			size_t uiSocketsLength = aryClientSockets.size ();

			aryReceivedFrom.clear ();

			for (size_t uiIdx = 0; uiIdx < uiSocketsLength; uiIdx++)
			{
				size_t adtReturn = RecvUInt (aryClientSockets.at (uiIdx));

				aryReturn.push_back (adtReturn);
				aryReceivedFrom.push_back (uiIdx);
			}

			return (aryReturn);
		}

		size_t wxWidgetsTCPServer::RecvUInt (wxSocketBase *socSocket)
		{
			size_t uiInt = 0;
			socSocket->Read ((char *)&uiInt, sizeof (size_t));

			if (socSocket->Error () == true)
			{
				CloseClientSocket (socSocket);

				return (0);
			}

			return (uiInt);
		}

		Array<long> wxWidgetsTCPServer::RecvLong ()
		{
			Array<long> aryReturn;
			size_t uiSocketsLength = aryClientSockets.size ();

			aryReceivedFrom.clear ();

			for (size_t uiIdx = 0; uiIdx < uiSocketsLength; uiIdx++)
			{
				long adtReturn = RecvLong (aryClientSockets.at (uiIdx));

				aryReturn.push_back (adtReturn);
				aryReceivedFrom.push_back (uiIdx);
			}

			return (aryReturn);
		}

		long wxWidgetsTCPServer::RecvLong (wxSocketBase *socSocket)
		{
			long lLong = 0;
			socSocket->Read ((char *)&lLong, sizeof (long));

			if (socSocket->Error () == true)
			{
				CloseClientSocket (socSocket);

				return (0);
			}

			return (lLong);
		}

		Array<unsigned long> wxWidgetsTCPServer::RecvULong ()
		{
			Array<unsigned long> aryReturn;
			size_t uiSocketsLength = aryClientSockets.size ();

			aryReceivedFrom.clear ();

			for (size_t uiIdx = 0; uiIdx < uiSocketsLength; uiIdx++)
			{
				unsigned long adtReturn = RecvULong (aryClientSockets.at (uiIdx));

				aryReturn.push_back (adtReturn);
				aryReceivedFrom.push_back (uiIdx);
			}

			return (aryReturn);
		}

		unsigned long wxWidgetsTCPServer::RecvULong (wxSocketBase *socSocket)
		{
			unsigned long ulLong = 0;
			socSocket->Read ((char *)&ulLong, sizeof (unsigned long));

			if (socSocket->Error () == true)
			{
				CloseClientSocket (socSocket);

				return (0);
			}

			return (ulLong);
		}

		Array<short> wxWidgetsTCPServer::RecvShort ()
		{
			Array<short> aryReturn;
			size_t uiSocketsLength = aryClientSockets.size ();

			aryReceivedFrom.clear ();

			for (size_t uiIdx = 0; uiIdx < uiSocketsLength; uiIdx++)
			{
				short adtReturn = RecvShort (aryClientSockets.at (uiIdx));

				aryReturn.push_back (adtReturn);
				aryReceivedFrom.push_back (uiIdx);
			}

			return (aryReturn);
		}

		short wxWidgetsTCPServer::RecvShort (wxSocketBase *socSocket)
		{
			short sShort = 0;
			socSocket->Read ((char *)&sShort, sizeof (short));

			if (socSocket->Error () == true)
			{
				CloseClientSocket (socSocket);

				return (0);
			}

			return (sShort);
		}

		Array<unsigned short> wxWidgetsTCPServer::RecvUShort ()
		{
			Array<unsigned short> aryReturn;
			size_t uiSocketsLength = aryClientSockets.size ();

			aryReceivedFrom.clear ();

			for (size_t uiIdx = 0; uiIdx < uiSocketsLength; uiIdx++)
			{
				unsigned short adtReturn = RecvUShort (aryClientSockets.at (uiIdx));

				aryReturn.push_back (adtReturn);
				aryReceivedFrom.push_back (uiIdx);
			}

			return (aryReturn);
		}

		unsigned short wxWidgetsTCPServer::RecvUShort (wxSocketBase *socSocket)
		{
			unsigned short usShort = 0;
			socSocket->Read ((char *)&usShort, sizeof (unsigned short));

			if (socSocket->Error () == true)
			{
				CloseClientSocket (socSocket);

				return (0);
			}

			return (usShort);
		}

		Array<char> wxWidgetsTCPServer::RecvChar ()
		{
			Array<char> aryReturn;
			size_t uiSocketsLength = aryClientSockets.size ();

			aryReceivedFrom.clear ();

			for (size_t uiIdx = 0; uiIdx < uiSocketsLength; uiIdx++)
			{
				char adtReturn = RecvChar (aryClientSockets.at (uiIdx));

				aryReturn.push_back (adtReturn);
				aryReceivedFrom.push_back (uiIdx);
			}

			return (aryReturn);
		}

		char wxWidgetsTCPServer::RecvChar (wxSocketBase *socSocket)
		{
			char cChar = 0x00;
			socSocket->Read ((char *)&cChar, sizeof (char));

			if (socSocket->Error () == true)
			{
				CloseClientSocket (socSocket);

				return (0);
			}

			return (cChar);
		}

		Array<unsigned char> wxWidgetsTCPServer::RecvUChar ()
		{
			Array<unsigned char> aryReturn;
			size_t uiSocketsLength = aryClientSockets.size ();

			aryReceivedFrom.clear ();

			for (size_t uiIdx = 0; uiIdx < uiSocketsLength; uiIdx++)
			{
				unsigned char adtReturn = RecvUChar (aryClientSockets.at (uiIdx));

				aryReturn.push_back (adtReturn);
				aryReceivedFrom.push_back (uiIdx);
			}

			return (aryReturn);
		}

		unsigned char wxWidgetsTCPServer::RecvUChar (wxSocketBase *socSocket)
		{
			unsigned char ucChar = 0x00;
			socSocket->Read ((char *)&ucChar, sizeof (unsigned char));

			if (socSocket->Error () == true)
			{
				CloseClientSocket (socSocket);

				return (0);
			}

			return (ucChar);
		}

		Array<char *> wxWidgetsTCPServer::RecvString (int iLength)
		{
			Array<char *> aryReturn;
			size_t uiSocketsLength = aryClientSockets.size ();

			aryReceivedFrom.clear ();

			for (size_t uiIdx = 0; uiIdx < uiSocketsLength; uiIdx++)
			{
				char *cString = RecvString (aryClientSockets.at (uiIdx), (iLength + 1));

				aryReturn.push_back (cString);
				aryReceivedFrom.push_back (uiIdx);
			}

			return (aryReturn);
		}

		char *wxWidgetsTCPServer::RecvString (wxSocketBase *socSocket, int iLength)
		{
			char *cString = RJNEW char [(iLength + 1)];
			//ArraySet (cString, (iLength + 1), '\0');

			for (size_t iIdx = 0; iIdx < (iLength + 1); iIdx++)
				cString[iIdx] = '\0';

			socSocket->Read (cString, (iLength + 1));

			if (socSocket->Error () == true)
			{
				CloseClientSocket (socSocket);

				return (0);
			}

			return (cString);
		}

		Array<String> wxWidgetsTCPServer::RecvString ()
		{
			Array<String> aryReturn;
			size_t uiSocketsLength = aryClientSockets.size ();

			aryReceivedFrom.clear ();

			for (size_t uiIdx = 0; uiIdx < uiSocketsLength; uiIdx++)
			{
				String strString = RecvString (aryClientSockets.at (uiIdx));

				aryReturn.push_back (strString);
				aryReceivedFrom.push_back (uiIdx);
			}

			return (aryReturn);
		}

		String wxWidgetsTCPServer::RecvString (wxSocketBase *socSocket)
		{
			char *cString = RJNEW char [(NET_MAX_BUF_SIZE + 1)];
			//ArraySet (cString, (NET_MAX_BUF_SIZE + 1), '\0');

			for (size_t iIdx = 0; iIdx < (NET_MAX_BUF_SIZE + 1); iIdx++)
				cString[iIdx] = '\0';

			socSocket->Read (cString, NET_MAX_BUF_SIZE);

			String strString = cString;
			DELETEARRAY (cString);

			if (socSocket->Error () == true)
			{
				CloseClientSocket (socSocket);

				return ("");
			}

			return (strString);
		}

		void wxWidgetsTCPServer::SetPort (unsigned short usPortPass)
		{
			usPort = usPortPass;
		}

		unsigned short wxWidgetsTCPServer::GetPort ()
		{
			return (usPort);
		}

		void wxWidgetsTCPServer::SetServerAddr (wxIPV4address adrServerPass)
		{
			adrServer = adrServerPass;
		}

		wxIPV4address wxWidgetsTCPServer::GetServerAddr ()
		{
			return (adrServer);
		}

		void wxWidgetsTCPServer::SetServerSocket (wxSocketServer *arySocketsPass)
		{
			wssServer = arySocketsPass;
		}

		wxSocketServer *wxWidgetsTCPServer::GetServerSocket ()
		{
			return (wssServer);
		}

		void wxWidgetsTCPServer::SetClientSockets (Array<wxSocketBase *> arySocketsPass)
		{
			aryClientSockets = arySocketsPass;
		}

		Array<wxSocketBase *> wxWidgetsTCPServer::GetClientSockets ()
		{
			return (aryClientSockets);
		}

		wxSocketBase *wxWidgetsTCPServer::GetClientSocket (size_t uiId)
		{
			return (aryClientSockets.at (uiId));
		}

		String wxWidgetsTCPServer::GetLastError ()
		{
			int iError = -1;

			return ("");
		}

		Array<size_t> wxWidgetsTCPServer::GetLastReceivedFromList ()
		{
			return (aryReceivedFrom);
		}

		Array<String> wxWidgetsTCPServer::GetConnectedIPs ()
		{
			Array<String> aryIPs;

			for (size_t uiIdx = 0; uiIdx < aryAddresses.size (); uiIdx++)
				aryIPs.push_back (RadJAV::convertwxStringToString (aryAddresses.at (uiIdx).IPAddress ()));

			return (aryIPs);
		}

		String wxWidgetsTCPServer::GetConnectedIp (size_t uiId)
		{
			return (RadJAV::convertwxStringToString (aryAddresses.at (uiId).IPAddress ()));
		}

		String wxWidgetsTCPServer::GetLastConnectedIp ()
		{
			return (RadJAV::convertwxStringToString (aryAddresses.at ((aryAddresses.size () - 1)).IPAddress ()));
		}

		bool wxWidgetsTCPServer::IsSocketOpen (wxSocketBase *socSocket)
		{
			bool bReturn = socSocket->IsConnected ();

			return (bReturn);
		}

		bool wxWidgetsTCPServer::CloseServerSocket ()
		{
			return (wssServer->Close ());
		}

		bool wxWidgetsTCPServer::CloseClientSocket (wxSocketBase *socSocket)
		{
			for (size_t uiIdx = 0; uiIdx < aryClientSockets.size (); uiIdx++)
			{
				if (socSocket == aryClientSockets.at (uiIdx))
				{
					aryClientSockets.at (uiIdx)->Close ();

					Array<wxSocketBase *>::iterator itBegin = aryClientSockets.begin ();
					itBegin += uiIdx;
					aryClientSockets.erase (itBegin);

					break;
				}
			}

			return (true);
		}

		bool wxWidgetsTCPServer::CloseAllSockets ()
		{
			size_t uiNumSockets = aryClientSockets.size ();

			for (size_t uiIdx = 0; uiIdx < uiNumSockets; uiIdx++)
				aryClientSockets.at (uiIdx)->Close ();

			wssServer->Close ();

			return (true);
		}

		// wxWidgetsTCPClient
		wxWidgetsTCPClient::wxWidgetsTCPClient ()
		{
			socSocket = 0;
			usPort = 0;
			tcpParent = 0;
		}

		bool wxWidgetsTCPClient::Init (unsigned short usPortPass)
		{
			socSocket = RJNEW wxSocketClient ();

			/*if (socSocket->Ok () == false)
			{
				if (socSocket != 0)
				{
					DELETEOBJ (socSocket);
				}

				return (false);
			}*/

			socSocket->SetEventHandler (*(RadJAV::RadJav::getwxWidgetsApp()), SOCKET_SOCKET);
			socSocket->SetNotify (wxSOCKET_CONNECTION_FLAG | wxSOCKET_INPUT_FLAG | wxSOCKET_LOST_FLAG);
			void *vData = tcpParent->getHiddenData ("socket");
			socSocket->SetClientData (vData);
			socSocket->Notify (true);

			usPort = usPortPass;

			return (true);
		}

		bool wxWidgetsTCPClient::ConnectWithBlocking (String strConnectTo)
		{
			wxIPV4address wiaAddr;
			wiaAddr.Hostname (wxString::FromAscii (strConnectTo.c_str ()));
			wiaAddr.Service (usPort);
			socSocket->Connect (wiaAddr, false);
			socSocket->WaitOnConnect (10);

			if (socSocket->IsConnected () == false)
			{
				if (socSocket->Error () == true)
				{
				}

				socSocket->Close ();

				if (socSocket != 0)
				{
					DELETEOBJ (socSocket);
				}

				return (false);
			}

			strServerIp = strConnectTo;

			return (true);
		}

		bool wxWidgetsTCPClient::ConnectWithoutBlocking (String strConnectTo)
		{
			wxIPV4address wiaAddr;
			wiaAddr.Hostname (wxString::FromAscii (strConnectTo.c_str ()));
			wiaAddr.Service (usPort);
			socSocket->Connect (wiaAddr, false);

			/*if (socSocket->IsConnected () == false)
			{
				if (socSocket->Error () == true)
				{
				}

				socSocket->Close ();

				if (socSocket != 0)
				{
					DELETEOBJ (socSocket);
				}

				return (false);
			}*/

			strServerIp = strConnectTo;

			return (true);
		}

		bool wxWidgetsTCPClient::SendFloat (float fFloat)
		{
			socSocket->Write ((const char *)&fFloat, sizeof (float));

			if (socSocket->Error () == true)
			{
				Close ();

				return (false);
			}

			return (true);
		}

		bool wxWidgetsTCPClient::SendDouble (double dDouble)
		{
			socSocket->Write ((const char *)&dDouble, sizeof (double));

			if (socSocket->Error () == true)
			{
				Close ();

				return (false);
			}

			return (true);
		}

		bool wxWidgetsTCPClient::SendInt (int iInt)
		{
			socSocket->Write ((const char *)&iInt, sizeof (int));

			if (socSocket->Error () == true)
			{
				Close ();

				return (false);
			}

			return (true);
		}

		bool wxWidgetsTCPClient::SendUInt (size_t uiInt)
		{
			socSocket->Write ((const char *)&uiInt, sizeof (size_t));

			if (socSocket->Error () == true)
			{
				Close ();

				return (false);
			}

			return (true);
		}

		bool wxWidgetsTCPClient::SendLong (long lLong)
		{
			socSocket->Write ((const char *)&lLong, sizeof (long));

			if (socSocket->Error () == true)
			{
				Close ();

				return (false);
			}

			return (true);
		}

		bool wxWidgetsTCPClient::SendULong (unsigned long ulLong)
		{
			socSocket->Write ((const char *)&ulLong, sizeof (unsigned long));

			if (socSocket->Error () == true)
			{
				Close ();

				return (false);
			}

			return (true);
		}

		bool wxWidgetsTCPClient::SendShort (short sShort)
		{
			socSocket->Write ((const char *)&sShort, sizeof (short));

			if (socSocket->Error () == true)
			{
				Close ();

				return (false);
			}

			return (true);
		}

		bool wxWidgetsTCPClient::SendUShort (unsigned short usShort)
		{
			socSocket->Write ((const char *)&usShort, sizeof (unsigned short));

			if (socSocket->Error () == true)
			{
				Close ();

				return (false);
			}

			return (true);
		}

		bool wxWidgetsTCPClient::SendChar (char cChar)
		{
			socSocket->Write ((const char *)&cChar, sizeof (char));

			if (socSocket->Error () == true)
			{
				Close ();

				return (false);
			}

			return (true);
		}

		bool wxWidgetsTCPClient::SendUChar (unsigned char ucChar)
		{
			socSocket->Write ((const char *)&ucChar, sizeof (unsigned char));

			if (socSocket->Error () == true)
			{
				Close ();

				return (false);
			}

			return (true);
		}

		bool wxWidgetsTCPClient::SendString (String strLine)
		{
			char *cBuf = RJNEW char[(strLine.size () + 1)];
			const char *cCopy = strLine.c_str ();

			for (size_t iIdx = 0; iIdx < (strLine.size () + 1); iIdx++)
				cBuf[iIdx] = cCopy[iIdx];

			cBuf[strLine.size ()] = '\0';

			//ArrayZero (cBuf, (strLine.size () + 1));
			//ArrayCopy (((char *)strLine.c_str ()), cBuf, (strLine.size () + 1));

			socSocket->SetNotify (wxSOCKET_INPUT_FLAG | wxSOCKET_LOST_FLAG);
			socSocket->Write (cBuf, ((strLine.size () + 1) * sizeof (char)));
			socSocket->SetNotify (wxSOCKET_INPUT_FLAG | wxSOCKET_LOST_FLAG);

			DELETEARRAY (cBuf);

			if (socSocket->Error () == true)
			{
				Close ();

				return (false);
			}

			return (true);
		}

		float wxWidgetsTCPClient::RecvFloat ()
		{
			float fFloat = 0.0f;
			socSocket->Read ((char *)&fFloat, sizeof (float));

			if (socSocket->Error () == true)
			{
				Close ();

				return (0.0f);
			}

			return (fFloat);
		}

		double wxWidgetsTCPClient::RecvDouble ()
		{
			double dDouble = 0.0;
			socSocket->Read ((char *)&dDouble, sizeof (double));

			if (socSocket->Error () == true)
			{
				Close ();

				return (0.0f);
			}

			return (dDouble);
		}

		int wxWidgetsTCPClient::RecvInt ()
		{
			int iInt = 0;
			socSocket->Read ((char *)&iInt, sizeof (int));

			if (socSocket->Error () == true)
			{
				Close ();

				return (0);
			}

			return (iInt);
		}

		size_t wxWidgetsTCPClient::RecvUInt ()
		{
			size_t uiInt = 0;
			socSocket->Read ((char *)&uiInt, sizeof (size_t));

			if (socSocket->Error () == true)
			{
				Close ();

				return (0);
			}

			return (uiInt);
		}

		long wxWidgetsTCPClient::RecvLong ()
		{
			long lLong = 0;
			socSocket->Read ((char *)&lLong, sizeof (long));

			if (socSocket->Error () == true)
			{
				Close ();

				return (0);
			}

			return (lLong);
		}

		unsigned long wxWidgetsTCPClient::RecvULong ()
		{
			unsigned long ulLong = 0;
			socSocket->Read ((char *)&ulLong, sizeof (unsigned long));

			if (socSocket->Error () == true)
			{
				Close ();

				return (0);
			}

			return (ulLong);
		}

		short wxWidgetsTCPClient::RecvShort ()
		{
			short sShort = 0;
			socSocket->Read ((char *)&sShort, sizeof (short));

			if (socSocket->Error () == true)
			{
				Close ();

				return (0);
			}

			return (sShort);
		}

		unsigned short wxWidgetsTCPClient::RecvUShort ()
		{
			unsigned short usShort = 0;
			socSocket->Read ((char *)&usShort, sizeof (unsigned short));

			if (socSocket->Error () == true)
			{
				Close ();

				return (0);
			}

			return (usShort);
		}

		char wxWidgetsTCPClient::RecvChar ()
		{
			char cChar = 0x00;
			socSocket->Read ((char *)&cChar, sizeof (char));

			if (socSocket->Error () == true)
			{
				Close ();

				return (0x00);
			}

			return (cChar);
		}

		unsigned char wxWidgetsTCPClient::RecvUChar ()
		{
			unsigned char ucChar = 0;
			socSocket->Read ((char *)&ucChar, sizeof (unsigned char));

			if (socSocket->Error () == true)
			{
				Close ();

				return (0x00);
			}

			return (ucChar);
		}

		char *wxWidgetsTCPClient::RecvString (int iLength)
		{
			char *cString = RJNEW char [(iLength + 1)];
			//ArraySet<char> (cString, (iLength + 1), 0x00);

			for (size_t iIdx = 0; iIdx < (iLength + 1); iIdx++)
				cString[iIdx] = '\0';

			socSocket->Read (cString, iLength);

			if (socSocket->Error () == true)
			{
				Close ();

				return ("");
			}

			return (cString);
		}

		String wxWidgetsTCPClient::RecvString ()
		{
			String strReturn = "";
			char *cString = RJNEW char [(NET_MAX_BUF_SIZE + 1)];
			//ArraySet<char> (cString, (NET_MAX_BUF_SIZE + 1), 0x00);

			for (size_t iIdx = 0; iIdx < (NET_MAX_BUF_SIZE + 1); iIdx++)
				cString[iIdx] = '\0';

			socSocket->Read (cString, NET_MAX_BUF_SIZE);

			strReturn = cString;
			DELETEARRAY (cString);

			if (socSocket->Error () == true)
			{
				Close ();

				return ("");
			}

			return (strReturn);
		}

		void wxWidgetsTCPClient::SetPort (unsigned short usPortPass)
		{
			usPort = usPortPass;
		}

		unsigned short wxWidgetsTCPClient::GetPort ()
		{
			return (usPort);
		}

		void wxWidgetsTCPClient::SetSocket (wxSocketClient *socSocketPass)
		{
			socSocket = socSocketPass;
		}

		wxSocketClient *wxWidgetsTCPClient::GetSocket ()
		{
			return (socSocket);
		}

		String wxWidgetsTCPClient::GetServerIP ()
		{
			wxIPV4address ipAddr;
			socSocket->GetPeer (ipAddr);
			String strReturn = RadJAV::convertwxStringToString (ipAddr.IPAddress ());

			return (strReturn);
		}

		String wxWidgetsTCPClient::GetLastError ()
		{
			return ("");
		}

		bool wxWidgetsTCPClient::Close ()
		{
			return (socSocket->Close ());
		}
	}
}
#endif
#endif

