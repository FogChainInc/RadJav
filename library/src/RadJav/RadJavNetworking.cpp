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
#include "RadJavNetworking.h"

#include "RadJav.h"

#include <ostream>
#include <string>
#include <sstream>

#ifdef NET_ON
namespace RadJAV
{
	namespace Networking
	{
		int RADJAV_EXPORT TCPConnection::numConnections = 0;

		// IPv4
		IPv4::IPv4 ()
		{
			for (unsigned short usIdx = 0; usIdx < 4; usIdx++)
				octets[usIdx] = 0;
		}

		IPv4::IPv4 (String ip)
		{
			getIPfromString (ip);
		}

		void IPv4::getIPfromString (String line)
		{
			String strOctet = "";
			int iPos1 = 0, iPos2 = (int)line.find (".");

			strOctet = line.substr (iPos1, iPos2);
			octets[0] = RadJAV::stringToInt (strOctet);

			iPos1 = (iPos2 + 1); iPos2 = (int)line.find (".", (iPos2 + 1));
			strOctet = line.substr (iPos1, iPos2);
			octets[1] = RadJAV::stringToInt (strOctet);

			iPos1 = (iPos2 + 1); iPos2 = (int)line.find (".", (iPos2 + 1));
			strOctet = line.substr (iPos1, iPos2);
			octets[2] = RadJAV::stringToInt (strOctet);

			iPos1 = (iPos2 + 1); iPos2 = (int)line.size ();
			strOctet = line.substr (iPos1, iPos2);
			octets[3] = RadJAV::stringToInt (strOctet);
		}

		String IPv4::getString ()
		{
			String ipReturn = "";
			ipReturn += RadJAV::intToString ((int)octets[0]);
			ipReturn += ".";
			ipReturn += RadJAV::intToString ((int)octets[1]);
			ipReturn += ".";
			ipReturn += RadJAV::intToString ((int)octets[2]);
			ipReturn += ".";
			ipReturn += RadJAV::intToString ((int)octets[3]);

			return (ipReturn);
		}

		String IPv4::getString (IPv4 ippass)
		{
			return (ippass.getString ());
		}

		IPv4 IPv4::getIP (String line)
		{
			IPv4 ipReturn;
			ipReturn.getIPfromString (line);
			return (ipReturn);
		}

		IPv4 &IPv4::operator= (String ip)
		{
			getIPfromString (ip);

			return (*this);
		}

		bool IPv4::operator== (IPv4 ip)
		{
			for (short sIdx = 0; sIdx < 4; sIdx++)
			{
				if (octets[sIdx] != ip.octets[sIdx])
					return (false);
			}

			return (true);
		}

		bool IPv4::operator== (String ipStr)
		{
			IPv4 ip = ipStr;

			for (short sIdx = 0; sIdx < 4; sIdx++)
			{
				if (octets[sIdx] != ip.octets[sIdx])
					return (false);
			}

			return (true);
		}

		// IPv6
		IPv6::IPv6 ()
		{
			for (unsigned short usIdx = 0; usIdx < 8; usIdx++)
			{
				for (unsigned short usJdx = 0; usJdx < 4; usJdx++)
					octets[usIdx][usJdx] = 0x00;
			}
		}

		String IPv6::getString()
		{
			String ipReturn = "";

			return (ipReturn);
		}

		// TcpipServer
		TcpipServer::TcpipServer()
		{
			port = 2040;
		}

		Array< std::shared_ptr<TCPConnection> > TcpipServer::getConnectedClients()
		{
			return (clients);
		}

		std::shared_ptr<TCPConnection> TcpipServer::getTCPConnection(size_t id)
		{
			std::shared_ptr<TCPConnection> found;

			for (size_t iIdx = 0; iIdx < clients.size(); iIdx++)
			{
				std::shared_ptr<TCPConnection> client = clients.at(iIdx);
				TCPConnection *connection = client.get();

				if (connection->getId() == id)
				{
					found = client;

					break;
				}
			}

			return (found);
		}

		String TcpipServer::getIP(size_t id)
		{
			std::shared_ptr<TCPConnection> connection = getTCPConnection(id);
			String ip = "";

			if (connection.get () != NULL)
				ip = connection.get ()->getIP();

			return (ip);
		}

		std::shared_ptr<TCPConnection> TcpipServer::getLastTCPConnection()
		{
			return (clients.at ((clients.size () - 1)));
		}

		size_t TcpipServer::getNumConnected ()
		{
			return (clients.size ());
		}

		unsigned short TcpipServer::getPort ()
		{
			return (port);
		}

		String TcpipServer::getLastError ()
		{
			return ("");
		}

		Array<size_t> TcpipServer::getLastReceivedFromList ()
		{
			Array<size_t> temp;
			return (temp);
		}

		// TcpipClient
		TcpipClient::TcpipClient ()
		{
			port = 2040;
		}

		bool TcpipClient::HTTPSendGET (String strRetrieve, String strHeaders)
		{
			bool bReturn = false;

			String strSendString = "GET " + strRetrieve;
			String serverAddress = connection.get ()->getIP ();

			if (strHeaders != "")
				strSendString += "?" + strHeaders;

			strSendString += " HTTP/1.1\n";

			if (serverAddress == "")
				strSendString += "Host: " + connection.get()->getIP() + ":" + (String)RadJAV::intToString (getPort ()) + "\n";
			else
				strSendString += "Host: " + serverAddress + ":" + (String)RadJAV::intToString (getPort ()) + "\n";

			strSendString += "User-Agent: " + (String)NET_USERAGENT + "\n";
			strSendString += "\n";

			bReturn = sendString (strSendString);

			return (bReturn);
		}

		bool TcpipClient::HTTPSendPOST (String strRetrieve, String line, String strHeaders, String strAuth)
		{
			return (HTTPSendPOST ("application/x-www-form-urlencoded", strRetrieve, line, strHeaders, strAuth));
		}

		bool TcpipClient::HTTPSendPOST (String strContentType, String strRetrieve, 
								String line, String strHeaders, String strAuth)
		{
			bool bReturn = false;

			String strSendString = ("POST " + strRetrieve);
			String serverAddress = connection.get()->getIP();

			if (strHeaders != "")
				strSendString += "?" + strHeaders;

			strSendString += " HTTP/1.1\n";

			if (strAuth != "")
				strSendString += "Authorization: " + strAuth;

			if (serverAddress == "")
				strSendString += "Host: " + connection.get()->getIP() + ":" + (String)RadJAV::intToString (getPort ()) + "\n";
			else
				strSendString += "Host: " + serverAddress + ":" + (String)RadJAV::intToString (getPort ()) + "\n";

			strSendString += "User-Agent: " + (String)NET_USERAGENT + "\n";
			strSendString += "Content-Type: " + strContentType + "\n";
			strSendString += "Content-Length: " + (String)RadJAV::intToString ((size_t)line.size ()) + "\n";
			strSendString += "\n";
			strSendString += line;
			strSendString += "\n";

			bReturn = sendString (strSendString);

			return (bReturn);
		}

		String TcpipClient::HTTPParseRequest (String strContent, String strNewLine)
		{
			String strReturn = strContent;
			String strTemp = strReturn;

			for (int iIdx = 0; iIdx < (int)strTemp.size (); iIdx++)
				strTemp.at (iIdx) = tolower (strTemp.at (iIdx));

			int iStartPos = strTemp.find ((strNewLine + strNewLine));
			iStartPos += (strNewLine.size () * 2);
			int iEndPos = strTemp.find (strNewLine, (iStartPos + 1));
			strTemp = strTemp.substr (iStartPos, (iEndPos - iStartPos));
			iEndPos += strNewLine.size ();
			int iVeryEndPos = strReturn.find ("0" + strNewLine + strNewLine);
			int iCount = RadJAV::stringToInt (strTemp);

			strReturn = strReturn.substr (iEndPos, (iVeryEndPos - (iEndPos + strNewLine.size ())));

			return (strReturn);
		}

		std::shared_ptr<TCPConnection> TcpipClient::getServerConnection()
		{
			return (connection);
		}

		String TcpipClient::getServerIP()
		{
			return (connection.get ()->getIP ());
		}

		unsigned short TcpipClient::getPort ()
		{
			return (port);
		}

		String TcpipClient::getLastError ()
		{
			return ("");
		}
	}
}
#endif

