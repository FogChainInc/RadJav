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
#ifndef _RADJAV_PREPROCESSOR_H_
	#define _RADJAV_PREPROCESSOR_H_

	#ifdef RADJAV_LIB_STATIC
		#define RADJAV_EXPORT
	#else
		#ifdef RADJAV_LIB_DLL
			#ifdef _MSC_VER
				#define RADJAV_EXPORT	__declspec(dllexport)
			#else
				#define RADJAV_EXPORT	__attribute__ ((dllexport))
			#endif
		#else
			#ifdef _MSC_VER
				#define RADJAV_EXPORT	__declspec(dllimport)
			#else
				#define RADJAV_EXPORT	__attribute__ ((dllimport))
			#endif
		#endif
	#endif

	#ifndef RADJAV_EXPORT
		#error "RADJAV_EXPORT is not defined!"
	#endif

	#define RADJAV_PLUGIN			__declspec(dllexport)

	#ifdef RADJAV_USE_FLOAT
		#define RDECIMAL float
	#endif

	#ifdef RADJAV_USE_DOUBLE
		#define RDECIMAL double
	#endif

	#ifndef RADJAV_RDECIMAL
		#define RDECIMAL float
		#define RADJAV_USE_FLOAT
	#endif

	#ifndef NULL
		#define NULL 0
	#endif

	#define RJINT int
	#define RJUINT unsigned int
	#define RJBOOL bool
	#define RJLONG long
	#define RJULONG unsigned long
	#define RJCHAR char
	#define RJNUMBER RDECIMAL

	#define PACKAGE_NAME "RadJav"
	#define RADJAV_VERSION_MAJOR 0
	#define RADJAV_VERSION_MINOR 11

	#ifdef COPYRIGHT_HOLDERS
		#undef COPYRIGHT_HOLDERS
	#endif

	#define COPYRIGHT_HOLDERS "Higher Edge Software"
	#define COPYRIGHT_HOLDERS_SUBSTITUTION "Higher Edge Software"

	#ifdef RADJAV_DEBUG
		#define RJNEW new (__FILE__, __LINE__, __func__)
		#define RJDELETE delete
		#define RJDELETEARRAY delete []

		#ifdef LINUX
			#include <cstddef>
		#endif

		void *operator new (size_t size, const char *file, int line, const char *func);
		void *operator new [](size_t size, const char *file, int line, const char *func);
		void operator delete (void *ptr, const char *file, int line, const char *func);
	#else
		#define RJNEW new
		#define RJDELETE delete
		#define RJDELETEARRAY delete []
	#endif

	#define DELETE_OBJ(obj)	\
		if (obj != NULL)\
		{\
			RJDELETE obj;\
			obj = NULL;\
		}
	#define DELETEOBJ(obj) DELETE_OBJ(obj)
	#define DELETE_ARRAY(obj)	\
		if (obj != NULL)\
		{\
			RJDELETEARRAY obj;\
			obj = NULL;\
		}
	#define DELETEARRAY(obj) DELETE_ARRAY(obj)
#endif
