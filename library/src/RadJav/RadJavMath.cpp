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
#include "RadJavMath.h"

namespace RadJAV
{
	#ifdef RADJAV_USE_DOUBLE
		RDECIMAL Math::PI = 3.14159265358979323846;
	#endif
	#ifdef RADJAV_USE_FLOAT
		RDECIMAL Math::PI = 3.14159265358979323846f;
	#endif
	RDECIMAL Math::inv180 = 1 / 180;
	RDECIMAL Math::invPI = 1 / Math::PI;

	RDECIMAL Math::map(RDECIMAL value, RDECIMAL start1, RDECIMAL stop1, RDECIMAL start2, RDECIMAL stop2)
	{
		return (start2 + (stop2 - start2) * (value - start1) / (stop1 - start1));
	}

	RDECIMAL Math::cosh (RDECIMAL arg)
	{
		// http://kevin.vanzonneveld.net
		// +   original by: Onno Marsman
		return (exp(arg) + exp(-arg)) / 2;
	}

	RDECIMAL Math::tanh (RDECIMAL arg)
	{
		// http://kevin.vanzonneveld.net
		// +   original by: Onno Marsman
		return ((exp(arg) - exp(-arg)) / (exp(arg) + exp(-arg)));
	}

	RDECIMAL Math::log10(RDECIMAL arg)
	{
		// http://kevin.vanzonneveld.net
		// +   original by: Philip Peterson
		// +   improved by: Onno Marsman
		// +   improved by: Tod Gentille
		// +   improved by: Brett Zamir (http://brett-zamir.me)
		return log(arg) / 2.302585092994046; // Math.LN10
	}

	RDECIMAL Math::clamp(RDECIMAL x, RDECIMAL a, RDECIMAL b)
	{
		RDECIMAL dReturn = 0;

		if (x < a)
			dReturn = a;
		else
		{
			if (x > b)
				dReturn = b;
			else
				dReturn = x;
		}

		return (dReturn);
	}

	RDECIMAL Math::degreesToRadians(RDECIMAL degrees)
	{
		return (degrees * (Math::PI * Math::inv180));
	}

	RDECIMAL Math::radiansToDegrees(RDECIMAL radians)
	{
		return (radians * (180 * Math::invPI));
	}

	RDECIMAL Math::randomRange (RDECIMAL min, RDECIMAL max)
	{
		return (floor(rand() * ((max - min) + 1)) + min);
	}
}

