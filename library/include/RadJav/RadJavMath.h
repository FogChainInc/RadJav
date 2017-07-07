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
#ifndef _RADJAV_MATH_H_
	#define _RADJAV_MATH_H_

	#include "RadJavPreprocessor.h"

	#include "RadJavString.h"

	#include <cmath>

	namespace RadJAV
	{
		/// The math class.
		class RADJAV_EXPORT Math
		{
			public:
				static RDECIMAL map (RDECIMAL value, RDECIMAL start1, RDECIMAL stop1, RDECIMAL start2, RDECIMAL stop2);
				static RDECIMAL cosh (RDECIMAL arg);
				static RDECIMAL tanh (RDECIMAL arg);
				static RDECIMAL log10(RDECIMAL arg);
				static RDECIMAL clamp (RDECIMAL x, RDECIMAL a, RDECIMAL b);
				static RDECIMAL degreesToRadians(RDECIMAL degrees);
				static RDECIMAL radiansToDegrees(RDECIMAL radians);
				static RDECIMAL randomRange (RDECIMAL min, RDECIMAL max);

				static RDECIMAL inv180;
				static RDECIMAL invPI;
				static RDECIMAL PI;
		};
	}
#endif

