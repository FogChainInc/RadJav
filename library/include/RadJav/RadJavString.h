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
#ifndef _RADJAV_STRING_H_
	#define _RADJAV_STRING_H_

	#include "RadJavPreprocessor.h"

	#include "RadJavArray.h"

	#include <string>
	#include <vector>

	#ifdef GUI_USE_WXWIDGETS
		#include <wx/string.h>
	#endif

	#ifdef USE_V8
		#include <v8.h>
	#endif

	#define USE_CHAR

	namespace RadJAV
	{
		class RADJAV_EXPORT String : public std::string
		{
		public:
			inline String()
				: std::string()
			{
			}

			inline String(std::string str)
				: std::string(str)
			{
			}

			inline String(int value)
				: std::string(fromInt(value))
			{
			}

			inline String(const String &str)
				: std::string(str)
			{
			}

			inline String(const String &str, size_t pos, size_t len = npos)
				: std::string(str, pos, len)
			{
			}

			inline String(const char *str)
				: std::string(str)
			{
			}

			inline String(const char *str, size_t len)
				: std::string(str, len)
			{
			}

			inline String(size_t len, char c)
				: std::string(len, c)
			{
			}

			template <class InputIterator>
			inline String(InputIterator first, InputIterator last)
				: std::string(first, last)
			{
			}

			String &operator= (const String &str)
			{
				std::string::operator= (str);

				return (*this);
			}

			String &operator= (const char *str)
			{
				std::string::operator= (str);

				return (*this);
			}

			String &operator= (char str)
			{
				std::string::operator= (str);

				return (*this);
			}

			String &operator= (String &&str) noexcept
			{
				std::string::operator= (str);

				return (*this);
			}

			//using std::string::operator=;
			using std::string::operator[];
			using std::string::operator+=;

			/// Split a string into an array of substrings seperated by a delimiter.
			Array<String> split(String delimiter);
			/// Split a string into an array of substrings seperated by a delimiter.
			Array<String> splitWithExceptions(String delimiter,
				Array<int> exceptionsBegin, Array<int> exceptionsEnd);

			/// Remove all whitespaces from a string.
			String removeWhitespaces();
			/// Make a string lowercase.
			String toLowerCase();
			/// Make a string uppercase.
			String toUpperCase();

			/// Convert an int into a string.
			static String fromInt(int iInteger);
			/// Convert an unsigned int into a string.
			static String fromUInt(unsigned int uiInteger);
			/// Check if a string is a valid integer.
			bool isInt();

			/// Convert a long into a string.
			static String fromLong(long value);

			/// Convert an unsigned long into a string.
			static String fromUnsignedLong(unsigned long value);

			/// Convert a double into a string.
			static String fromDouble(double dDouble);
			/// Check if the string contains a double.
			bool isDouble();

			/// Convert a float into a string.
			static String fromFloat(float fFloat);
			/// Check if the string contains a float.
			bool isFloat();

			/// Convert a boolean into a string.
			static String fromBoolean(bool bBool);
			/// Check if the string contains a boolean.
			bool isBool(bool caseSensitive = false);

			/// Replace a string with another string.
			String replaceAll(String find, String replaceWith);

			/// Convert a decimal into a string.
			static String fromDecimal(RDECIMAL num);

			#ifdef GUI_USE_WXWIDGETS
				/// Convert a string into a wxWidgets string.
				wxString towxString();
			#endif

			#ifdef USE_V8
				/// Convert a string into a V8 string.
				v8::Local<v8::String> toV8String(v8::Isolate *isolate);
			#endif
		};

		/// Parse a decimal value.
		RDECIMAL parseDecimal(String decimal);
		/// Convert an string into an int.
		int parseInt(String str);
		/// Convert a long into a string.
		long parseLong(String str);
		/// Convert an unsigned long into a string.
		unsigned long parseUnsignedLong(String str);
		/// Convert a double into a string.
		double parseDouble(String str);
		/// Convert a float into a string.
		float parseFloat(String str);
		/// Convert a boolean into a string.
		bool parseBoolean(String str, bool caseSensitive = false);

		#ifdef GUI_USE_WXWIDGETS
			/**
			* Converts a wxString to a String object.
			* @param str The wxString to convert.
			* @return The converted String object.
			*/
			String parsewxString(wxString str);
		#endif

		#ifdef USE_V8
			String parseV8Value(v8::Local<v8::Value> str);
		#endif

		/// Convert a hex string into an integer.
		int hexStringToInt(String hexString);
		/// Convert an integer into a hex string.
		String intToHexString(int iInt);
	}
#endif
