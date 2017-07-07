message (STATUS "Searching for CivetWeb...")

set (civetweb_SOURCE $ENV{civetweb_SRC} CACHE PATH "civetweb path")
fixPath (civetweb_SOURCE)
set (civetweb_SEARCH_PATHS ${civetweb_SOURCE} ${RADJAV_DEPENDENCIES})

if (civetweb_SEARCH_PATHS)
	searchForHeader (civetweb civetweb.h ${civetweb_SEARCH_PATHS} FALSE)
	searchForLibrary (civetweb civetweb civetweb ${civetweb_SEARCH_PATHS})
endif ()

hasLibBeenFound (civetweb)

