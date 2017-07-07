message (STATUS "Searching for secp256k1...")

set (secp256k1_SOURCE $ENV{secp256k1_SOURCE} CACHE PATH "secp256k1 path")
fixPath (secp256k1_SOURCE)
set (secp256k1_SEARCH_PATHS ${secp256k1_SOURCE} ${RADJAV_DEPENDENCIES})

if (secp256k1_SEARCH_PATHS)
	searchForHeader (secp256k1 secp256k1.h ${secp256k1_SEARCH_PATHS} FALSE)

	if (WIN32)
		searchForLibrary (secp256k1 secp256k1-x86-v141-mt-sgd-0_1_0_15 secp256k1-x86-v141-mt-s-0_1_0_15 ${secp256k1_SEARCH_PATHS})
	endif()
endif ()

hasLibBeenFound (secp256k1)

