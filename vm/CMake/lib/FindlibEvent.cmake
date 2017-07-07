message (STATUS "Searching for libEvent...")

set (event2_SOURCE $ENV{event2_SOURCE} CACHE PATH "libEvent path")
fixPath (event2_SOURCE)
set (event2_SEARCH_PATHS ${event2_SOURCE} ${RADJAV_DEPENDENCIES})

if (event2_SEARCH_PATHS)
	searchForHeader (event2 event.h ${event2_SEARCH_PATHS} TRUE)
	searchForLibrary (event2 libevent libevent ${event2_SEARCH_PATHS})
endif ()

hasLibBeenFound (event2)

