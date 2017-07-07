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
#ifndef _RADJAV_NETWORKING_H_
	#define _RADJAV_NETWORKING_H_

	#include <vector>
	#include <memory>

	#ifdef NET_ON
		#include "RadJavPreprocessor.h"
		#include "RadJavString.h"

		#ifndef NET_USERAGENT
			#define NET_USERAGENT		"RADJAV/0.1"
		#endif

		enum
		{
			NET_HANDLE_TYPE_READ		= 1, 
			NET_HANDLE_TYPE_WRITE		= 2, 
			NET_HANDLE_TYPE_ACCEPT		= 3, 
			NET_HANDLE_TYPE_CONNECT		= 4, 
			NET_HANDLE_TYPE_CLOSE		= 5,
			NET_HANDLE_TYPE_ERROR		= 6
		};

		enum
		{
			NET_USING_TCPV4		= 1, 
			NET_USING_TCPV6		= 2
		};

		#ifdef WIN32
			#ifndef GUI_USE_WXWIDGETS
				#include "../win32/networking/tcpip/tcp_global.h"
			#endif
		#endif

		#ifdef defSYS_LINUX
			#ifndef GUI_USE_WXWIDGETS
				#include "../linux/networking/tcpip/tcp_global.h"
			#endif
		#endif

		#ifdef defSYS_MACOSX
			#ifndef GUI_USE_WXWIDGETS
				#include "../macosx/networking/tcpip/tcp_global.h"
			#endif
		#endif

		#ifdef GUI_USE_WXWIDGETS
			//#include "RadJavWxWidgetsNetworking.h"
		#endif

		namespace RadJAV
		{
			/// The namespace containing all the networking functionality.
			namespace Networking
			{
				/** Represents an IPv4 address.
				*/
				class RADJAV_EXPORT IPv4
				{
					public:
						IPv4 ();
						IPv4 (String ip);

						/** Get an IP address from a string.
						*/
						void getIPfromString (String line);
						/** Return this IP as a string.
						*/
						String getString ();
						/** Return an IP address as a string.
						*/
						static String getString (IPv4 ippass);
						/** Return an IP address as a string.
						*/
						static IPv4 getIP (String line);

						/** Set the octets of this IP.
						*/
						inline void set (unsigned short octet1, unsigned short octet2, 
										unsigned short octet3, unsigned short octet4)
						{
							octets[0] = octet1;
							octets[1] = octet2;
							octets[2] = octet3;
							octets[3] = octet4;
						}

						/** Get the octets of this IP.
						*/
						inline unsigned short *get ()
						{
							return (octets);
						}

						IPv4 &operator= (String ip);
						bool operator== (IPv4 ip);
						bool operator== (String ip);

					protected:
						unsigned short octets[4];
				};

				/** Represents an IPv6 address.
				*/
				class RADJAV_EXPORT IPv6
				{
					public:
						IPv6 ();

						/** Return this IP as a string.
						*/
						String getString();

						unsigned char octets[8][4];
				};

				/// Represents a TCP connection.
				class RADJAV_EXPORT TCPConnection
				{
					public:
						inline TCPConnection (IPv4 ip)
						{
							id = getNewId ();
							connectionType = NET_USING_TCPV4;
							ipv4 = ip;
						}

						inline TCPConnection (IPv6 ip)
						{
							id = getNewId ();
							connectionType = NET_USING_TCPV6;
							ipv6 = ip;
						}
						
						/// Get the type of TCP connection that's used.
						inline int getConnectionType ()
						{
							return (connectionType);
						}

						/// Get the TCPv4 address being used.
						inline IPv4 getIPv4 ()
						{
							return (ipv4);
						}

						/// Get the TCPv6 address being used.
						inline IPv6 getIPv6 ()
						{
							return (ipv6);
						}

						/// Get connection id.
						inline size_t getId ()
						{
							return (id);
						}

						/// Get the IP as a string.
						inline String getIP()
						{
							String ip = "";

							if (connectionType == NET_USING_TCPV4)
								ip = ipv4.getString ();

							if (connectionType == NET_USING_TCPV6)
								ip = ipv6.getString ();

							return (ip);
						}

					protected:
						size_t id;
						int connectionType;
						static int numConnections;
						IPv4 ipv4;
						IPv6 ipv6;

						inline size_t getNewId()
						{
							size_t newId = numConnections++;

							if (newId >= 4000000000)
								newId = 0;

							return (newId);
						}
				};

				/// Represents a TCP response.
				template <typename DataType>
				class RADJAV_EXPORT TCPResponse
				{
					public:
						std::shared_ptr<TCPConnection> fromConnection;
						DataType data;
				};

				/// Additional functions to aide with networking.
				class RADJAV_EXPORT Utils
				{
					/** Get this computer's IP addresses.
					*/
					inline static Array<String> getComputerIPs()
					{
						#ifdef WIN32
							#ifndef GUI_USE_WXWIDGETS
								return (Win32Utils::getComputerIPs());
							#endif
						#endif

						#ifdef GUI_USE_WXWIDGETS
							Array<String> aryReturn;
							return (aryReturn);
						#endif
					}

					/** Get this computer's mac addresses.
					*/
					inline static Array< Array<unsigned long> > getMACAddresses()
					{
						#ifdef WIN32
							#ifndef GUI_USE_WXWIDGETS
								return (Win32Utils::getMACAddresses());
							#endif
						#endif

						#ifdef GUI_USE_WXWIDGETS
							Array< Array<unsigned long> > aryReturn;
							return (aryReturn);
						#endif
					}
				};

				/** Start a TCP/IP server.
				*/
				class RADJAV_EXPORT TcpipServer
				{
					public:
						TcpipServer ();

						/// Start the server.
						virtual bool init (unsigned short newPort) = 0;

						/** Listen for connections and lock the current thread.
						*/
						virtual bool acceptWithBlocking () = 0;
						/** Listen for connections and do not lock the current thread.
						*/
						virtual bool acceptWithoutBlocking () = 0;

						/** Send a float to all connected clients. You can exempt some clients from receiving as well.
						*/
						virtual bool sendFloatToAll (float fFloat, Array<size_t> except = Array<size_t> ()) = 0;
						/** Send a float to a specific connected client.
						*/
						virtual bool sendFloat (size_t id, float fFloat) = 0;
						/** Send a double to all connected clients. You can exempt some clients from receiving as well.
						*/
						virtual bool sendDoubleToAll (double dDouble, Array<size_t> except = Array<size_t> ()) = 0;
						/** Send a double to a specific connected client.
						*/
						virtual bool sendDouble (size_t id, double dDouble) = 0;
						/** Send an integer to all connected clients. You can exempt some clients from receiving as well.
						*/
						virtual bool sendIntToAll (int iInt, Array<size_t> except = Array<size_t> ()) = 0;
						/** Send an integer to a specific connected client.
						*/
						virtual bool sendInt (size_t id, int iInt) = 0;
						/** Send an size_teger to all connected clients. 
						* You can exempt some clients from receiving as well.
						*/
						virtual bool sendUIntToAll (size_t uiInt, Array<size_t> except = Array<size_t> ()) = 0;
						/** Send an size_teger to a specific connected client.
						*/
						virtual bool sendUInt (size_t id, size_t uiInt) = 0;
						/** Send a long to all connected clients. 
						* You can exempt some clients from receiving as well.
						*/
						virtual bool sendLongToAll (long lLong, Array<size_t> except = Array<size_t> ()) = 0;
						/** Send a long to a specific connected client.
						*/
						virtual bool sendLong (size_t id, long lLong) = 0;
						/** Send an unsigned long to all connected clients. 
						* You can exempt some clients from receiving as well.
						*/
						virtual bool sendULongToAll (unsigned long ulLong, Array<size_t> except = Array<size_t> ()) = 0;
						/** Send an unsigned long to a specific connected client.
						*/
						virtual bool sendULong (size_t id, unsigned long ulLong) = 0;
						/** Send a short to all connected clients. 
						* You can exempt some clients from receiving as well.
						*/
						virtual bool sendShortToAll (short sShort, Array<size_t> except = Array<size_t> ()) = 0;
						/** Send a short to a specific connected client.
						*/
						virtual bool sendShort (size_t id, short sShort) = 0;
						/** Send an unsigned short to all connected clients. 
						* You can exempt some clients from receiving as well.
						*/
						virtual bool sendUShortToAll (unsigned short usShort, Array<size_t> except = Array<size_t> ()) = 0;
						/** Send an unsigned short to a specific connected client.
						*/
						virtual bool sendUShort (size_t id, unsigned short usShort) = 0;
						/** Send a char to all connected clients. 
						* You can exempt some clients from receiving as well.
						*/
						virtual bool sendCharToAll (char cChar, Array<size_t> except = Array<size_t> ()) = 0;
						/** Send a char to a specific connected client.
						*/
						virtual bool sendChar (size_t id, char cChar) = 0;
						/** Send an unsigned char to all connected clients. 
						* You can exempt some clients from receiving as well.
						*/
						virtual bool sendUCharToAll (unsigned char ucChar, Array<size_t> except = Array<size_t> ()) = 0;
						/** Send an unsigned char to a specific connected client.
						*/
						virtual bool sendUChar (size_t id, unsigned char ucChar) = 0;
						/** Send a string to all connected clients. 
						* You can exempt some clients from receiving as well.
						*/
						virtual bool sendStringToAll (String line, Array<size_t> except = Array<size_t> ()) = 0;
						/** Send a string to a specific connected client.
						*/
						virtual bool sendString (size_t id, String line) = 0;

						/// Receive an array of floats from the connected clients.
						virtual Array< TCPResponse<float> > recvFloat () = 0;
						/// Receive an array of doubles from the connected clients.
						virtual Array< TCPResponse<double> > recvDouble () = 0;
						/// Receive an array of ints from the connected clients.
						virtual Array< TCPResponse<int> > recvInt () = 0;
						/// Receive an array of size_ts from the connected clients.
						virtual Array< TCPResponse<size_t> > recvUInt () = 0;
						/// Receive an array of longs from the connected clients.
						virtual Array< TCPResponse<long> > recvLong () = 0;
						/// Receive an array of unsigned longs from the connected clients.
						virtual Array< TCPResponse<unsigned long> > recvULong () = 0;
						/// Receive an array of shorts from the connected clients.
						virtual Array< TCPResponse<short> > recvShort () = 0;
						/// Receive an array of unsigned shorts from the connected clients.
						virtual Array< TCPResponse<unsigned short> > recvUShort () = 0;
						/// Receive an array of chars from the connected clients.
						virtual Array< TCPResponse<char> > recvChar () = 0;
						/// Receive an array of unsigned chars from the connected clients.
						virtual Array< TCPResponse<unsigned char> > recvUChar () = 0;
						/// Receive a char array from the connected clients.
						virtual Array< TCPResponse<char *> > recvString (int iLength) = 0;
						/// Receive an array of strings from the connected clients.
						virtual Array< TCPResponse<String> > recvString () = 0;

						/// Get the connected clients.
						Array< std::shared_ptr<TCPConnection> > getConnectedClients ();
						/// Get the TCPConnection associated with a client id.
						std::shared_ptr<TCPConnection> getTCPConnection (size_t id);
						/// Get the IP address of a connected client.
						String getIP(size_t id);
						/// Get the last connected client's TCPConnection.
						std::shared_ptr<TCPConnection> getLastTCPConnection ();
						/// Get the number of connected clients.
						size_t getNumConnected ();

						/// Get the port being used.
						unsigned short getPort ();

						/// Get the last error thrown.
						String getLastError ();

						Array<size_t> getLastReceivedFromList ();

						/// Checks to see if the socket is open to a connected client.
						virtual bool isSocketOpen (size_t id) = 0;

						/// Closes the connection to a connected client.
						virtual bool closeClient (size_t id) = 0;
						/// Closes all connections with all clients and shuts down the server.
						virtual bool close () = 0;

					private:
						Array< std::shared_ptr<TCPConnection> > clients;
						unsigned short port;
				};

				class RADJAV_EXPORT TcpipClient
				{
					public:
						TcpipClient ();

						/// Start the server.
						virtual bool init (unsigned short port) = 0;

						/// Connect to a server while locking the thread.
						virtual bool connectWithBlocking (String strConnectTo) = 0;
						/// Connect to a server without locking the thread.
						virtual bool connectWithoutBlocking (String strConnectTo) = 0;

						/// Send a float to the server.
						virtual bool sendFloat (float fFloat) = 0;
						/// Send a double to the server.
						virtual bool sendDouble (double dDouble) = 0;
						/// Send an int to the server.
						virtual bool sendInt (int iInt) = 0;
						/// Send an size_t to the server.
						virtual bool sendUInt (size_t uiInt) = 0;
						/// Send a long to the server.
						virtual bool sendLong (long lLong) = 0;
						/// Send an unsigned long to the server.
						virtual bool sendULong (unsigned long ulLong) = 0;
						/// Send a short to the server.
						virtual bool sendShort (short sShort) = 0;
						/// Send an unsigned short to the server.
						virtual bool sendUShort (unsigned short usShort) = 0;
						/// Send a char to the server.
						virtual bool sendChar (char cChar) = 0;
						/// Send an unsigned char to the server.
						virtual bool sendUChar (unsigned char ucChar) = 0;
						/// Send a string to the server.
						virtual bool sendString (String line) = 0;

						/// Send an HTTP request get to the server.
						bool HTTPSendGET (String strRetrieve, String strHeaders = "");
						/// Send an HTTP post request get to the server.
						bool HTTPSendPOST (String strRetrieve, String line, String strHeaders, String strAuth = "");
						/// Send an HTTP post request get to the server.
						bool HTTPSendPOST (String strContentType, String strRetrieve, String line, String strHeaders, String strAuth = "");
						/// Parse an HTTP request.
						String HTTPParseRequest (String strContent, String strNewLine);

						/// Receive a float from the server.
						virtual TCPResponse<float> recvFloat () = 0;
						/// Receive a double from the server.
						virtual TCPResponse<double> recvDouble () = 0;
						/// Receive an int from the server.
						virtual TCPResponse<int> recvInt () = 0;
						/// Receive an size_t from the server.
						virtual TCPResponse<size_t> recvUInt () = 0;
						/// Receive a long from the server.
						virtual TCPResponse<long> recvLong () = 0;
						/// Receive an unsigned long from the server.
						virtual TCPResponse<unsigned long> recvULong () = 0;
						/// Receive a short from the server.
						virtual TCPResponse<short> recvShort () = 0;
						/// Receive an unsigned short from the server.
						virtual TCPResponse<unsigned short> recvUShort () = 0;
						/// Receive a char from the server.
						virtual TCPResponse<char> recvChar () = 0;
						/// Receive an unsigned char from the server.
						virtual TCPResponse<unsigned char> recvUChar () = 0;
						/// Receive a char string from the server.
						virtual TCPResponse<char *> recvString (int iLength) = 0;
						/// Receive a string from the server.
						virtual TCPResponse<String> recvString () = 0;

						/// Get the connection to the server.
						std::shared_ptr<TCPConnection> getServerConnection ();
						/// Get the server's ip.
						String getServerIP ();

						/// Get the port being used.
						unsigned short getPort ();

						/// Get the last error.
						String getLastError ();

						/// Close the connection to the server.
						virtual bool close () = 0;

					private:
						std::shared_ptr<TCPConnection> connection;
						unsigned short port;
				};
			}
		}
	#endif
#endif

