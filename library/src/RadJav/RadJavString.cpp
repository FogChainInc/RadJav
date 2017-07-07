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
#include "RadJavString.h"

#include "RadJavException.h"

#include <sstream>

namespace RadJAV
{
	Array<String> String::split(String delimiter)
	{
		String str = *this;
		Array<String> aryReturn;
		int iStartPos = 0;
		int iPos = 0;

		while (1)
		{
			iPos = str.find(delimiter, iStartPos);

			if (iPos == -1)
			{
				if (iStartPos < (int)str.size())
					aryReturn.push_back(str.substr(iStartPos, str.size()));

				break;
			}

			if (iStartPos == 0)
				aryReturn.push_back(str.substr(iStartPos, iPos));
			else
				aryReturn.push_back(str.substr(iStartPos, (iPos - iStartPos)));

			iStartPos = (iPos + 1);
		}

		return (aryReturn);
	}

	Array<String> String::splitWithExceptions(String delimiter,
		Array<int> exceptionsBegin, Array<int> exceptionsEnd)
	{
		String str = *this;
		Array<String> aryReturn;
		int iStartPos = 0;
		int iPos = 0;

		while (1)
		{
			iPos = str.find(delimiter, iStartPos);

			if (iPos == -1)
			{
				if (iStartPos < (int)str.size())
					aryReturn.push_back(str.substr(iStartPos, str.size()));

				break;
			}

			int iSkipStart = -1;
			int iSkipEnd = -1;
			bool bSkip = false;

			while (1)
			{
				for (int iJdx = 0; iJdx < (int)exceptionsBegin.size(); iJdx++)
				{
					int iBegin = exceptionsBegin.at(iJdx);
					int iEnd = exceptionsEnd.at(iJdx);

					if ((iPos >= iBegin) && (iPos <= iEnd))
					{
						bSkip = true;
						iSkipStart = iStartPos;
						iSkipEnd = iEnd;

						break;
					}
				}

				if (bSkip == true)
				{
					iPos = str.find(delimiter, (iSkipEnd + 1));

					if (iPos == -1)
						iPos = str.size();

					bSkip = false;
				}
				else
					break;
			}

			if (bSkip == false)
			{
				if (iStartPos == 0)
					aryReturn.push_back(str.substr(iStartPos, iPos));
				else
					aryReturn.push_back(str.substr(iStartPos, (iPos - iStartPos)));
			}
			else
				aryReturn.push_back(str.substr(iSkipStart, (iPos - iSkipStart)));

			iStartPos = (iPos + 1);
		}

		return (aryReturn);
	}

	String String::removeWhitespaces()
	{
		String str = *this;
		String strTemp = str;

		for (unsigned int iIdx = 0; iIdx < strTemp.size(); iIdx++)
		{
			if (strTemp.at(iIdx) == ' ')
			{
				strTemp = strTemp.erase(iIdx, 1);
				continue;
			}

			if (strTemp.at(iIdx) == '\t')
			{
				strTemp = strTemp.erase(iIdx, 1);
				continue;
			}
		}

		return (strTemp);
	}

	String String::toLowerCase()
	{
		String str = *this;
		String strTemp = str;

		for (int iIdx = 0; iIdx < (int)strTemp.size(); iIdx++)
		{
			int iChar = (int)strTemp.at(iIdx);

			if ((iChar >= 65) && (iChar <= 90))
				strTemp.at(iIdx) += 32;
		}

		return (strTemp);
	}

	String String::toUpperCase()
	{
		String str = *this;
		String strTemp = str;

		for (int iIdx = 0; iIdx < (int)strTemp.size(); iIdx++)
		{
			int iChar = (int)strTemp.at(iIdx);

			if ((iChar >= 97) && (iChar <= 122))
				strTemp.at(iIdx) -= 32;
		}

		return (strTemp);
	}

	String String::fromInt(int iInteger)
	{
		std::stringstream ssStream("");
		ssStream << iInteger;

		return (ssStream.str());
	}

	String String::fromUInt(unsigned int uiInteger)
	{
		std::stringstream ssStream("");
		ssStream << uiInteger;

		return (ssStream.str());
	}

	bool String::isInt()
	{
		String str = *this;
		std::istringstream ssStream(str);
		int iReturn = 0;
		ssStream >> iReturn;

		if (ssStream.fail() == true)
			return (false);

		return (true);
	}

	String String::fromLong(long value)
	{
		std::stringstream ssStream("");
		ssStream << value;

		return (ssStream.str());
	}

	String String::fromUnsignedLong(unsigned long ulInteger)
	{
		std::stringstream ssStream("");
		ssStream << ulInteger;

		return (ssStream.str());
	}

	String String::fromDouble(double dDouble)
	{
		std::stringstream ssStream("");
		ssStream << dDouble;

		return (ssStream.str());
	}

	bool String::isDouble()
	{
		String str = *this;
		std::istringstream ssStream(str);
		double dReturn = 0.0;
		ssStream >> dReturn;

		if (ssStream.fail() == true)
			return (false);

		return (true);
	}

	String String::fromFloat(float fFloat)
	{
		std::stringstream ssStream("");
		ssStream << fFloat;

		return (ssStream.str());
	}

	bool String::isFloat()
	{
		String str = *this;
		std::istringstream ssStream(str);
		float fFloat = 0.0;
		ssStream >> fFloat;

		if (ssStream.fail() == true)
			return (false);

		return (true);
	}

	String String::fromBoolean(bool bBool)
	{
		String strReturn = "false";

		if (bBool == true)
			strReturn = "true";

		return (strReturn);
	}

	bool String::isBool(bool caseSensitive)
	{
		String str = *this;

		if (caseSensitive == false)
			str = str.toLowerCase();

		if (str == "yes")
			return (true);
		else if (str == "no")
			return (true);
		else if (str == "true")
			return (true);
		else if (str == "false")
			return (true);
		else if (str == "on")
			return (true);
		else if (str == "off")
			return (true);
		else if (str == "0")
			return (true);
		else
		{
			int iReturn = 0;

			std::istringstream ssStream(str);
			ssStream >> iReturn;

			if (iReturn == 0)
				return (false);
			else
				return (true);
		}

		return (false);
	}

	String String::replaceAll(String find, String replaceWith)
	{
		String base = *this;

		if (base == "")
			return ("");

		String newStr = base;
		int pos = newStr.find(find);

		while (pos != String::npos)
		{
			newStr.replace(pos, replaceWith.length(), replaceWith);
			pos = newStr.find(find, (pos + replaceWith.length()));
		}

		return (newStr);
	}

	String String::fromDecimal(RDECIMAL num)
	{
#ifdef RADJAV_USE_FLOAT
		return (fromFloat(num));
#endif

#ifdef RADJAV_USE_DOUBLE
		return (fromDouble(num));
#endif
	}

#ifdef GUI_USE_WXWIDGETS
	wxString String::towxString()
	{
		return (wxString::FromAscii(this->c_str()));
	}
#endif

#ifdef USE_V8
	v8::Local<v8::String> String::toV8String(v8::Isolate *isolate)
	{
		return (v8::String::NewFromUtf8(isolate, this->c_str()));
	}
#endif

	RDECIMAL parseDecimal(String decimal)
	{
#ifdef RADJAV_USE_FLOAT
		return (parseFloat(decimal));
#endif

#ifdef RADJAV_USE_DOUBLE
		return (parseDouble(decimal));
#endif
	}

	int parseInt(String str)
	{
		std::istringstream ssStream(str);
		int iReturn = 0;
		ssStream >> iReturn;

		return (iReturn);
	}

	long parseLong(String str)
	{
		std::istringstream ssStream(str);
		long lReturn = 0;
		ssStream >> lReturn;

		return (lReturn);
	}

	unsigned long parseUnsignedLong(String str)
	{
		std::istringstream ssStream(str);
		unsigned long ulReturn = 0;
		ssStream >> ulReturn;

		return (ulReturn);
	}

	double parseDouble(String str)
	{
		std::istringstream ssStream(str);
		double dReturn = 0;
		ssStream >> dReturn;

		return (dReturn);
	}

	float parseFloat(String str)
	{
		std::istringstream ssStream(str);
		float fReturn = 0;
		ssStream >> fReturn;

		return (fReturn);
	}

	bool parseBoolean(String str, bool caseSensitive)
	{
		if (caseSensitive == false)
			str = str.toLowerCase();

		if (str == "yes")
			return (true);
		else if (str == "no")
			return (false);
		else if (str == "true")
			return (true);
		else if (str == "false")
			return (false);
		else if (str == "0")
			return (false);
		else
		{
			int iReturn = 0;

			try
			{
				std::istringstream ssStream(str);
				ssStream >> iReturn;

				if (ssStream.fail() == true)
				{
					throw RadJAV::Exception("Unable to parse boolean string!");
				}
			}
			catch (std::exception ex)
			{
				throw RadJAV::Exception("Unable to parse boolean string!");
			}

			if (iReturn == 0)
				return (false);
			else
				return (true);
		}

		return (false);
	}

#ifdef GUI_USE_WXWIDGETS
	String parsewxString(wxString str)
	{
		return ((const char *)str.mb_str(wxConvUTF8));
	}
#endif

#ifdef USE_V8
	String parseV8Value(v8::Local<v8::Value> str)
	{
		if (str.IsEmpty() == true)
			return ("");

		v8::String::Utf8Value newStr(str);

		return (*newStr);
	}
#endif

	int hexStringToInt(String hexString)
	{
		int iHexCode = -1;
		std::stringstream ssStream(hexString);

		if (ssStream.fail() == true)
			return (0);

		ssStream >> std::hex >> iHexCode;

		return (iHexCode);
	}

	String intToHexString(int iInt)
	{
		String strReturn = "";
		std::stringstream ssStream("");

		ssStream << std::hex << iInt;
		strReturn = ssStream.str();

		if (strReturn.size() == 1)
			strReturn.insert(0, "0");

		return (strReturn);
	}
}
