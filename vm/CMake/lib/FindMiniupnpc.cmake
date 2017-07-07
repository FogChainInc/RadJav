message (STATUS "Searching for Miniupnpc...")

set (miniupnpc_SOURCE $ENV{miniupnpc_SOURCE} CACHE PATH "Miniupnpc path")
fixPath (miniupnpc_SOURCE)
set (miniupnpc_SEARCH_PATHS ${miniupnpc_SOURCE} ${RADJAV_DEPENDENCIES})

if (miniupnpc_SEARCH_PATHS)
	searchForHeader (miniupnpc miniupnpc.h ${miniupnpc_SEARCH_PATHS} TRUE)
	searchForLibrary (miniupnpc miniupnpc miniupnpc ${miniupnpc_SEARCH_PATHS})
endif ()

hasLibBeenFound (miniupnpc)

