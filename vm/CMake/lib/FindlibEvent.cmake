message (STATUS "Searching for libEvent...")

set (event2_SOURCE $ENV{event2_SOURCE} CACHE PATH "libEvent path")
fixPath (event2_SOURCE)
set (event2_SEARCH_PATHS ${event2_SOURCE} ${RADJAV_DEPENDENCIES})

searchForHeader (event2 event.h "${event2_SEARCH_PATHS}" TRUE)
searchForLibrary (event2 event event "${event2_SEARCH_PATHS}")
searchForLibrary (event2 event_core event_core "${event2_SEARCH_PATHS}")

hasLibBeenFound (event2)
