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
#ifndef _RADJAV_THEME_H_
	#define _RADJAV_THEME_H_

	#include "RadJavPreprocessor.h"
	#include "RadJavString.h"
	#include "RadJavDate.h"

	namespace RadJAV
	{
		/// A RadJav theme.
		class RADJAV_EXPORT Theme
		{
			public:
				/// Load a theme at a path.
				Theme (String themePath = "");
				~Theme();

			protected:
				/// The name of the theme.
				String name;
				/// The theme's version.
				String version;
				/// The theme's author.
				String author;
				/// The theme's last update date.
				Date lastUpdated;
				/// The theme's description.
				String description;
				/// The path to this theme.
				String path;

				/// Load this theme.
				void loadTheme ();
		};
	}
#endif

