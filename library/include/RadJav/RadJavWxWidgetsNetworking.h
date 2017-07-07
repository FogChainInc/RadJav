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
#ifndef _RADJAV_WX_NETWORKING_H_
	#define _RADJAV_WX_NETWORKING_H_

	#include <vector>
	#include <sstream>
	#include <memory>
	#include <ostream>
	#include <cmath>

	#ifdef GUI_USE_WXWIDGETS
		#ifdef NET_ON
			#include <wx/wxprec.h>
			#include <wx/wx.h>
			#include <wx/socket.h>
			#include <wx/sckipc.h>

			#include "RadJavNetworking.h"
			#include "RadJavString.h"

			namespace RadJAV
			{
				namespace Networking
				{
					enum
					{
						SOCKET_SERVER = 5000,
						SOCKET_SOCKET = 5001,
						SOCKET_CLIENT = 5002
					};

					/// Additional functions to aide with wxWidgets networking.
					class RADJAV_EXPORT wxWidgetsUtils
					{
						static Array<String> getComputerIPs ();
						static Array< Array<unsigned long> > getMACAddresses ();
					};

					class wxWidgetsTCPServer: public TcpipServer
					{
						public:
							wxWidgetsTCPServer ();

							bool init(unsigned short newPort);

							bool acceptWithBlocking();
							bool acceptWithoutBlocking();

							bool sendFloatToAll(float fFloat, Array<size_t> aryExcept = Array<size_t>());
							bool sendFloat(wxSocketBase *socSocket, float fFloat);
							bool sendDoubleToAll(double dDouble, Array<size_t> aryExcept = Array<size_t>());
							bool sendDouble(wxSocketBase *socSocket, double dDouble);
							bool sendIntToAll(int iInt, Array<size_t> aryExcept = Array<size_t>());
							bool sendInt(wxSocketBase *socSocket, int iInt);
							bool sendUIntToAll(size_t uiInt, Array<size_t> aryExcept = Array<size_t>());
							bool sendUInt(wxSocketBase *socSocket, size_t uiInt);
							bool sendLongToAll(long lLong, Array<size_t> aryExcept = Array<size_t>());
							bool sendLong(wxSocketBase *socSocket, long lLong);
							bool sendULongToAll(unsigned long ulLong, Array<size_t> aryExcept = Array<size_t>());
							bool sendULong(wxSocketBase *socSocket, unsigned long ulLong);
							bool sendShortToAll(short sShort, Array<size_t> aryExcept = Array<size_t>());
							bool sendShort(wxSocketBase *socSocket, short sShort);
							bool sendUShortToAll(unsigned short usShort, Array<size_t> aryExcept = Array<size_t>());
							bool sendUShort(wxSocketBase *socSocket, unsigned short usShort);
							bool sendCharToAll(char cChar, Array<size_t> aryExcept = Array<size_t>());
							bool sendChar(wxSocketBase *socSocket, char cChar);
							bool sendUCharToAll(unsigned char ucChar, Array<size_t> aryExcept = Array<size_t>());
							bool sendUChar(wxSocketBase *socSocket, unsigned char ucChar);
							bool sendStringToAll(String strLine, Array<size_t> aryExcept = Array<size_t>());
							bool sendString(wxSocketBase *socSocket, String strLine);

							Array< TCPResponse<float> > recvFloat();
							float RecvFloat(wxSocketBase *socSocket);
							Array< TCPResponse<double> > recvDouble();
							double RecvDouble(wxSocketBase *socSocket);
							Array< TCPResponse<int> > recvInt();
							int RecvInt(wxSocketBase *socSocket);
							Array< TCPResponse<size_t> > recvUInt();
							size_t RecvUInt(wxSocketBase *socSocket);
							Array< TCPResponse<long> > recvLong();
							long RecvLong(wxSocketBase *socSocket);
							Array< TCPResponse<unsigned long> > recvULong();
							unsigned long RecvULong(wxSocketBase *socSocket);
							Array< TCPResponse<short> > recvShort();
							short RecvShort(wxSocketBase *socSocket);
							Array< TCPResponse<unsigned short> > recvUShort();
							unsigned short RecvUShort(wxSocketBase *socSocket);
							Array< TCPResponse<char> > recvChar();
							char RecvChar(wxSocketBase *socSocket);
							Array< TCPResponse<unsigned char> > recvUChar();
							unsigned char RecvUChar(wxSocketBase *socSocket);
							Array< TCPResponse<char *> > recvString(int iLength);
							char *RecvString(wxSocketBase *socSocket, int iLength);
							Array< TCPResponse<String> > recvString();
							String RecvString(wxSocketBase *socSocket);

							void SetPort(unsigned short usPortPass);
							unsigned short GetPort();
							void SetServerAddr(wxIPV4address adrServerPass);
							wxIPV4address GetServerAddr();
							void SetServerSocket(wxSocketServer *arySocketsPass);
							wxSocketServer * GetServerSocket();
							void SetClientSockets(Array<wxSocketBase *> arySocketsPass);
							Array<wxSocketBase *> GetClientSockets();
							wxSocketBase *GetClientSocket(size_t uiId);
							Array<String> GetConnectedIPs();
							String GetConnectedIp(size_t uiId);
							String GetLastConnectedIp();
							Array<size_t> GetLastReceivedFromList();

							String GetLastError();

							bool IsSocketOpen(wxSocketBase *socSocket);

							bool CloseServerSocket();
							bool CloseClientSocket(wxSocketBase *socSocket);
							bool CloseAllSockets();

						private:
							std::shared_ptr<wxSocketServer> socket;
							wxIPV4address adrServer;

							Array<wxSocketBase *> aryClientSockets;
							Array<wxIPV4address> aryAddresses;
							Array<size_t> aryReceivedFrom;
					};

					class wxWidgetsTCPClient: public TcpipClient
					{
						public:
							wxWidgetsTCPClient ();

							bool Init(unsigned short usPortPass);

							bool ConnectWithBlocking(String strConnectTo);
							bool ConnectWithoutBlocking(String strConnectTo);

							bool sendFloat(float fFloat);
							bool sendDouble(double dDouble);
							bool sendInt(int iInt);
							bool sendUInt(size_t uiInt);
							bool sendLong(long lLong);
							bool sendULong(unsigned long ulLong);
							bool sendShort(short sShort);
							bool sendUShort(unsigned short usShort);
							bool sendChar(char cChar);
							bool sendUChar(unsigned char ucChar);
							bool sendString(String strLine);

							float RecvFloat();
							double RecvDouble();
							int RecvInt();
							size_t RecvUInt();
							long RecvLong();
							unsigned long RecvULong();
							short RecvShort();
							unsigned short RecvUShort();
							char RecvChar();
							unsigned char RecvUChar();
							char *RecvString(int iLength);
							String RecvString();

							void SetPort(unsigned short usPortPass);
							unsigned short GetPort();
							void SetSocket(wxSocketClient *socSocketPass);
							wxSocketClient *GetSocket();
							String GetServerIP();

							String GetLastError();

							bool Close();

						private:
							wxSocketClient *socSocket;

							String strServerIp;
					};
				}
			}
		#endif
	#endif
#endif

