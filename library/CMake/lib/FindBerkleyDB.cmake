message (STATUS "Searching for BerkleyDB...")

set (BerkleyDB_SOURCE $ENV{BerkleyDB_SOURCE} CACHE PATH "BerkleyDB path")
fixPath (BerkleyDB_SOURCE)
set (BerkleyDB_SEARCH_PATHS ${BerkleyDB_SOURCE} ${RADJAV_DEPENDENCIES})

if (BerkleyDB_SEARCH_PATHS)
	searchForHeader (BerkleyDB db.h ${BerkleyDB_SEARCH_PATHS} FALSE)

	if (WIN32)
		searchForLibrary (BerkleyDB libdb62sd libdb62s ${BerkleyDB_SEARCH_PATHS})
	else ()
		searchForLibrary (BerkleyDB db db ${BerkleyDB_SEARCH_PATHS})
	endif()
endif ()

hasLibBeenFound (BerkleyDB)

