macro (fixPath path)
	if (${path})
		string (REGEX REPLACE "\\\\" "/" ${path} ${${path}})
	endif ()
endmacro (fixPath)

macro (searchForHeader lib mainHeader searchPath useOnlyParentDir)
	set (${lib}_HEADER_PATHS ${searchPath}/include
		${searchPath}/Include ${searchPath}/include/${lib} ${searchPath}/Headers
		/usr/local/include /usr/include /opt/local/include /opt/include
		${searchPath}/build_windows
		${searchPath}/include/RadJav
		${searchPath}/OgreMain/include
		${searchPath}/lib/includes ${searchPath}/lib/includes/${lib})

	find_path (${lib}_INCLUDE_DIR NAMES ${mainHeader} HINTS
		${searchPath} ${${lib}_HEADER_PATHS} PATH_SUFFIXES ${lib})

	if (${useOnlyParentDir})
		get_filename_component (${lib}_INCLUDE_DIR ${${lib}_INCLUDE_DIR} DIRECTORY)
	endif ()

	set (${lib}_INCLUDE ${${lib}_INCLUDE_DIR})
endmacro (searchForHeader)

macro (searchForLibrary lib debugLibraries releaseLibraries searchPath)
	set (${lib}_LIBRARY_DEBUG_PATHS ${searchPath}/lib
		${searchPath}/Lib ${searchPath}/lib/${lib} ${searchPath}/Libs
		${searchPath}/lib/debug ${searchPath}/Lib/debug ${searchPath}/lib/${lib}/debug
		${searchPath}/Libs/debug ${searchPath}/build/Debug/lib ${searchPath}/build/debug
		${searchPath}/lib/vc_lib /usr/local/lib /usr/lib /opt/local/lib /opt/lib
		/usr/lib/x86_64-linux-gnu 
		${searchPath}/out/arm.debug/obj.host/src
		${searchPath}/out/arm.debug/obj.host/third_party/icu
		${searchPath}/gypfiles/Debug/lib
		${searchPath}/out.gn/ia32.debug
		${searchPath}/out.gn/ia32.debug/obj
		${searchPath}/out.gn/ia32.debug/obj/third_party/icu
		${searchPath}/out.gn/x64.debug
		${searchPath}/out.gn/x64.debug/obj
		${searchPath}/out.gn/x64.debug/obj/third_party/icu
		${searchPath}/out.gn/arm.debug
		${searchPath}/out.gn/arm.debug/obj
		${searchPath}/out.gn/arm.debug/obj/third_party/icu
		"${searchPath}/build_windows/Win32/Static Debug"
		${searchPath}/build/lib/Debug
		${searchPath}/build/src/Debug
		${searchPath}/build
		${searchPath}/msvc/Release
		${searchPath}/vcbuild/src/Debug
		${searchPath}/bin
		${searchPath}/bin/Debug)

	unset (${lib}_LIBRARY_DEBUG CACHE)
	find_library (${lib}_LIBRARY_DEBUG NAMES ${debugLibraries} HINTS
		${searchPath} ${${lib}_LIBRARY_DEBUG_PATHS} PATH_SUFFIXES ""
		debug)

	set (${lib}_LIBRARY_RELEASE_PATHS ${searchPath}/lib
		${searchPath}/Lib ${searchPath}/lib/${lib} ${searchPath}/Libs
		${searchPath}/lib/release ${searchPath}/Lib/release ${searchPath}/lib/${lib}/release
		${searchPath}/Libs/release ${searchPath}/build/Release/lib ${searchPath}/build/release
		${searchPath}/lib/vc_lib ${searchPath}/out/arm.release/obj.host/src
		${searchPath}/out/arm.release/obj.host/third_party/icu
		${searchPath}/gypfiles/Release/lib
		${searchPath}/out.gn/ia32.debug
		${searchPath}/out.gn/ia32.release
		${searchPath}/out.gn/ia32.release/obj
		${searchPath}/out.gn/ia32.release/obj/third_party/icu
		${searchPath}/out.gn/x64.release
		${searchPath}/out.gn/x64.release/obj
		${searchPath}/out.gn/x64.release/obj/third_party/icu
		${searchPath}/out.gn/arm.release
		${searchPath}/out.gn/arm.release/obj
		${searchPath}/out.gn/arm.release/obj/third_party/icu
		"${searchPath}/build_windows/Win32/Static Release"
		${searchPath}/build/lib/Release
		${searchPath}/build/src/Release
		${searchPath}/build
		${searchPath}/msvc/Release
		${searchPath}/vcbuild/src/Release
		${searchPath}/bin
		${searchPath}/bin/Release)

	unset (${lib}_LIBRARY_RELEASE CACHE)
	find_library (${lib}_LIBRARY_RELEASE NAMES ${releaseLibraries} HINTS
		${searchPath} ${${lib}_LIBRARY_RELEASE_PATHS} PATH_SUFFIXES ""
		release relwithdebinfo minsizerel)

	set(${lib}_LIBRARIES debug ${${lib}_LIBRARY_DEBUG} optimized ${${lib}_LIBRARY_RELEASE} ${${lib}_LIBRARIES})
endmacro (searchForLibrary)

macro (hasLibBeenFound lib)
	if (${lib}_INCLUDE)
		if (${lib}_LIBRARY_DEBUG_PATHS)
			set (${lib}_FOUND TRUE)
		endif ()
	endif ()
endmacro (hasLibBeenFound)
