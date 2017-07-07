message (STATUS "Searching for wxWidgets...")

set (wxWidgets_ROOT_DIR $ENV{WXWIN} CACHE PATH "wxWidgets path")
fixPath (wxWidgets_ROOT_DIR)

include (FindwxWidgets)

set (wxWidgets_INCLUDE ${wxWidgets_INCLUDE_DIRS})

if (WIN32)
	set(wxWidgets_LIBRARIES debug 
		"comctl32.lib;rpcrt4.lib;wsock32.lib;oleacc.lib;wininet.lib;winmm.lib;shlwapi.lib;version.lib" 
		optimized "comctl32.lib;rpcrt4.lib;wsock32.lib;oleacc.lib;wininet.lib;winmm.lib;shlwapi.lib;version.lib" 
		${wxWidgets_LIBRARIES})
endif ()

hasLibBeenFound (wxWidgets)

