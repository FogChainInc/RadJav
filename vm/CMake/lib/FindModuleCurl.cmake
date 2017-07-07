message (STATUS "Searching for curl...")

set (CURL_SOURCE $ENV{CURL_SOURCE} CACHE PATH "curl path")
fixPath (CURL_SOURCE)

include (FindCURL)

set (CURL_INCLUDE ${CURL_INCLUDE_DIRS})

if (WIN32)
	set(CURL_LIBRARIES debug ws2_32.lib wldap32.lib ${CURL_LIBRARIES})
endif ()

hasLibBeenFound (CURL)

