#ifndef _xrjv1d_cli_h_
	#define _xrjv1d_cli_h_

	#ifdef LIBRADJAV
		#include "RadJavPreprocessor.h"

		#ifdef GUI_USE_WXWIDGETS
			#ifdef WIN32
				#include <winsock2.h>
			#endif

			#include <wx/wx.h>
		#endif

		#include "RadJavString.h"

		class RADJAV_EXPORT XRJV1CLIResult
		{
			public:
				inline XRJV1CLIResult(RadJAV::String newResult, RJBOOL wasExceptionThrown)
				{
					result = newResult;
					exceptionThrown = wasExceptionThrown;
				}

				RadJAV::String result;
				RJBOOL exceptionThrown;
		};

		XRJV1CLIResult startXRJV1CLI (int argc, char* argv[]);
	#endif
#endif

