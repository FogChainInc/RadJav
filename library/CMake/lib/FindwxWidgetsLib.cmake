message (STATUS "Searching for wxWidgets...")

set (wxWidgets_ROOT_DIR $ENV{WXWIN} CACHE PATH "wxWidgets path")
fixPath (wxWidgets_ROOT_DIR)

set (wxWidgets_CONFIGURATION ${wxWidgets_CONFIGURATION})
find_package (wxWidgets REQUIRED core base png tiff jpeg zlib webview)
include (${wxWidgets_USE_FILE})

set (wxWidgets_INCLUDE ${wxWidgets_INCLUDE_DIRS})
set (wxWidgets_LIBRARIES debug ${WX_webviewd} optimized ${WX_webview} ${wxWidgets_LIBRARIES})

if (WIN32)
	set(wxWidgets_LIBRARIES debug 
		"comctl32.lib;rpcrt4.lib;wsock32.lib;oleacc.lib;wininet.lib;winmm.lib;shlwapi.lib;version.lib" 
		optimized "comctl32.lib;rpcrt4.lib;wsock32.lib;oleacc.lib;wininet.lib;winmm.lib;shlwapi.lib;version.lib" 
		${wxWidgets_LIBRARIES})
endif ()

hasLibBeenFound (wxWidgets)


