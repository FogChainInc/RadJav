message (STATUS "Searching for nghttp2...")

set (nghttp2_SOURCE $ENV{NGHTTP2_SRC} CACHE PATH "nghttp2 path")
fixPath (nghttp2_SOURCE)
set (nghttp2_SEARCH_PATHS ${nghttp2_SOURCE} ${RADJAV_DEPENDENCIES})

if (nghttp2_SEARCH_PATHS)
	searchForHeader (nghttp2 nghttp2.h ${nghttp2_SEARCH_PATHS} TRUE)
	searchForLibrary (nghttp2 nghttp2 nghttp2 ${nghttp2_SEARCH_PATHS})
endif ()

hasLibBeenFound (nghttp2)

