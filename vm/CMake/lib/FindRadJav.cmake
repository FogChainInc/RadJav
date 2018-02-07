message (STATUS "Searching for RadJav...")

set (libRadJav_SOURCE ${libRadJav_PATH})
fixPath (libRadJav_SOURCE)
set (libRadJav_SEARCH_PATHS ${libRadJav_SOURCE} ${RadJavVM_DEPENDENCIES})

if (libRadJav_SEARCH_PATHS)
	searchForHeader (libRadJav RadJav.h ${libRadJav_SEARCH_PATHS} TRUE)

	#get_filename_component (libRadJav_INCLUDE_DIR ${libRadJav_LIBRARY_DEBUG} DIRECTORY)

	searchForLibrary (libRadJav libRadJav libRadJav ${libRadJav_SEARCH_PATHS})

	if (NOT libRadJav_STATIC)
		if (WIN32)
			add_custom_command (TARGET RadJavVM POST_BUILD COMMAND ${CMAKE_COMMAND} -E copy_if_different
									"${RadJavVM_SOURCE_DIR}/build/Debug/libRadJav_d.dll"
									$<TARGET_FILE_DIR:RadJavVM>)
		endif ()

		if (UNIX)
			add_custom_command (TARGET RadJavVM POST_BUILD COMMAND ${CMAKE_COMMAND} -E copy_if_different
									"${RadJavVM_SOURCE_DIR}/build/Debug/libRadJav.a"
									$<TARGET_FILE_DIR:RadJavVM>)
		endif ()
	endif ()
endif ()

hasLibBeenFound (libRadJav)

