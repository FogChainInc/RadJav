cmake_minimum_required (VERSION 3.0)

if (WIN32)
	set (CMAKE_USE_RELATIVE_PATHS TRUE)
endif ()

project (libRadJav)

message (STATUS "Configuring libRadJav...")
message (STATUS "Version 0.1")

set (CMAKE_MODULE_PATH "${libRadJav_SOURCE_DIR}/CMake"
			"${libRadJav_SOURCE_DIR}/CMake/lib"
			"${libRadJav_SOURCE_DIR}/include"
			"${libRadJav_SOURCE_DIR}/src")

include (Utils)

set (libRadJav_JS_LIBRARY "V8" CACHE STRING "Javascript library to use")
set (libRadJav_GUI_LIBRARY "wxWidgets" CACHE STRING "GUI library to use")
set (libRadJav_HTTP_LIBRARY "curl" CACHE STRING "HTTP library to use")
set (libRadJav_INCLUDE_C3D_API TRUE CACHE BOOL "Include the C3D API?")
set (libRadJav_ALLOW_NETWORKING TRUE CACHE BOOL "Allow Networking?")
set (libRadJav_DEPENDENCIES $ENV{RADJAV_DEPENDENCIES} CACHE PATH "RadJav Dependencies path")
set (libRadJav_LANGUAGE "en_us" CACHE STRING "Select language to compile with")
set (libRadJav_STATIC false CACHE BOOL "Static build of RadJav")
set (libRadJav_EMBEDFILE true CACHE BOOL "Embed Javascript into RadJav?")
set (libRadJav_INCLUDE_BLOCKCHAIN_V1 true CACHE BOOL "Include Blockchain V1?")

set_property (CACHE CMAKE_BUILD_TYPE PROPERTY STRINGS "Debug" "Release" "MinSizeRel" "RelWithDebInfo")

set (libRadJav_LANGUAGE_UPPER)
string (TOUPPER ${libRadJav_LANGUAGE} libRadJav_LANGUAGE_UPPER)
message (STATUS "Using language ${libRadJav_LANGUAGE_UPPER}")

if (libRadJav_INCLUDE_C3D_API)
	message (STATUS "C3D API is going to be included in this build.")
	set (USE_OGRE TRUE)
else ()
	message (STATUS "C3D API will NOT be included in this build.")
endif ()

if (libRadJav_ALLOW_NETWORKING)
	message (STATUS "Networking is going to be included in this build.")
else ()
	message (STATUS "Networking will NOT be included in this build.")
endif ()

if (libRadJav_INCLUDE_BLOCKCHAIN_V1)
	message (STATUS "Blockchain V1 will be included in this build.")

	set (OPENSSL_ROOT_DIR "" CACHE PATH "OPENSSL_ROOT_DIR")
	set (ZLIB_ROOT "" CACHE PATH "ZLIB_ROOT")
	set (BOOST_ROOT "" CACHE PATH "BOOST_ROOT")
else ()
	message (STATUS "Blockchain V1 will NOT be included in this build.")
endif ()

if (libRadJav_DEPENDENCIES)
	fixPath (libRadJav_DEPENDENCIES)
	message (STATUS "RadJav Dependencies path set to: ${libRadJav_DEPENDENCIES}")
endif ()

if (libRadJav_JS_LIBRARY STREQUAL "V8")
	set (USE_V8 true)
endif ()

if (libRadJav_GUI_LIBRARY STREQUAL "wxWidgets")
	set (USE_WXWIDGETS true)
endif ()

if (libRadJav_HTTP_LIBRARY STREQUAL "civetweb")
	set (USE_CIVETWEB true)
endif ()

if (libRadJav_HTTP_LIBRARY STREQUAL "nghttp2")
	set (USE_NGHTTP2 true)
endif ()

#set (CMAKE_DEBUG_POSTFIX "_d")
#set (libRadJav_SOURCE_LANGUAGE_FILE)

#set (SOURCES_files_Languages
#	"${libRadJav_SOURCE_DIR}/include/RadJav/languages/${libRadJav_LANGUAGE}.h")
#source_group ("Languages" FILES ${SOURCES_files_Languages})
set (SOURCES "${libRadJav_SOURCE_DIR}/src/RadJav" ${SOURCES})

#set (SOURCES ${SRC} ${SOURCES})

set (libRadJav_CPP_DEFS)
set (libRadJav_CPP_DEFS "LANG_${libRadJav_LANGUAGE_UPPER}" ${libRadJav_CPP_DEFS})
set (libRadJav_CPP_DEFS_DEBUG "")
set (libRadJav_CPP_DEFS_DEBUG RADJAV_DEBUG ${libRadJav_CPP_DEFS_DEBUG})

include (includes)
include (sources)

include (FindModuleCurl)

if (USE_OGRE)
	include (FindOgre3D)
endif ()

if (USE_V8)
	include (FindV8)
endif ()

if (USE_WXWIDGETS)
	include (FindModulewxWidgets)
endif ()

if (USE_NGHTTP2)
	include (FindModuleNGHTTP2)
endif ()

if (USE_CIVETWEB)
	include (FindModuleCivetWeb)
endif ()

if (libRadJav_STATIC)
	set (libRadJav_CPP_DEFS RADJAV_LIB_STATIC ${libRadJav_CPP_DEFS})
else ()
	set (libRadJav_CPP_DEFS RADJAV_LIB_DLL ${libRadJav_CPP_DEFS})
endif ()

if (WIN32)
	set (libRadJav_CPP_DEFS WIN32 ${libRadJav_CPP_DEFS})
	set (libRadJav_CPP_DEFS _WINDOWS ${libRadJav_CPP_DEFS})
	set (libRadJav_CPP_DEFS ARCH_X86 ${libRadJav_CPP_DEFS})

	if (MSVC)
		set (libRadJav_CPP_DEFS NOMINMAX ${libRadJav_CPP_DEFS})

		if (MSVC_VERSION LESS 1910)
			message (FATAL_ERROR "You must use Visual Studio 2017 or better!")
		endif ()

		find_program (NUGET nuget)

		if (NUGET)
			execute_process (COMMAND ${NUGET} install leveldb-vc140 libzmq-vc141 secp256k1-vc141)
		else ()
			message (WARNING "Cannot find nuget, some libraries will have to be installed manually.")
		endif ()
	endif ()

	set (libRadJav_CPP_DEFS STDC99 ${libRadJav_CPP_DEFS})
endif ()

if (UNIX)
	set (libRadJav_CPP_DEFS LINUX ${libRadJav_CPP_DEFS})
endif ()

set (libRadJav_LINK_LIBRARIES)

include_directories (${libRadJav_SOURCE_DIR}/include/RadJav)

if (OGRE_FOUND)
	message (STATUS "Ogre 3D Found...")
	include_directories (${OGRE_INCLUDE})
	set (libRadJav_LINK_LIBRARIES ${OGRE_LIBRARIES} ${libRadJav_LINK_LIBRARIES})
	set (libRadJav_CPP_DEFS C3D_USE_OGRE ${libRadJav_CPP_DEFS})
endif ()

if (V8_FOUND)
	include_directories (${V8_INCLUDE})
	set (libRadJav_LINK_LIBRARIES ${V8_LIBRARIES} ${libRadJav_LINK_LIBRARIES})
	set (libRadJav_CPP_DEFS USE_V8 ${libRadJav_CPP_DEFS})
endif ()

if (wxWidgets_FOUND)
	include (FindwxWidgetsLib)
endif ()

if (CURL_FOUND)
	include_directories (${CURL_INCLUDE})
	set (libRadJav_LINK_LIBRARIES ${CURL_LIBRARIES} ${libRadJav_LINK_LIBRARIES})
	set (libRadJav_CPP_DEFS HTTP_USE_CURL ${libRadJav_CPP_DEFS})
	set (libRadJav_CPP_DEFS CURL_STATICLIB ${libRadJav_CPP_DEFS})
endif ()

if (nghttp2_FOUND)
	include_directories (${nghttp2_INCLUDE})
	set (libRadJav_LINK_LIBRARIES ${nghttp2_LIBRARIES} ${libRadJav_LINK_LIBRARIES})
	set (libRadJav_CPP_DEFS HTTP_USE_NGHTTP2 ${libRadJav_CPP_DEFS})
endif ()

if (civetweb_FOUND)
	include_directories (${civetweb_INCLUDE})
	set (libRadJav_LINK_LIBRARIES ${civetweb_LIBRARIES} ${libRadJav_LINK_LIBRARIES})
	set (libRadJav_CPP_DEFS HTTP_USE_CIVETWEB ${libRadJav_CPP_DEFS})
endif ()

if (libRadJav_INCLUDE_BLOCKCHAIN_V1)
	set (libRadJav_CPP_DEFS USE_BLOCKCHAIN_V1 ${libRadJav_CPP_DEFS})
	set (libRadJav_CPP_DEFS HAVE_CONFIG_H ${libRadJav_CPP_DEFS})

	set (libRadJav_CPP_DEFS MINIUPNP_STATICLIB ${libRadJav_CPP_DEFS})
	set (libRadJav_CPP_DEFS STATICLIB ${libRadJav_CPP_DEFS})
	set (libRadJav_CPP_DEFS USE_UPNP ${libRadJav_CPP_DEFS})
	set (libRadJav_CPP_DEFS _CRT_SECURE_NO_WARNINGS ${libRadJav_CPP_DEFS})
	set (libRadJav_CPP_DEFS UNICODE ${libRadJav_CPP_DEFS})
	set (libRadJav_CPP_DEFS _SCL_SECURE_NO_WARNINGS ${libRadJav_CPP_DEFS})
	set (libRadJav_CPP_DEFS HAVE_WORKING_BOOST_SLEEP_FOR ${libRadJav_CPP_DEFS})
	set (libRadJav_CPP_DEFS NOMINMAX ${libRadJav_CPP_DEFS})
	set (libRadJav_CPP_DEFS USE_LEVELDB ${libRadJav_CPP_DEFS})
	set (libRadJav_CPP_DEFS USE_IPV6=1 ${libRadJav_CPP_DEFS})
	set (libRadJav_CPP_DEFS BOOST_SPIRIT_THREADSAFE ${libRadJav_CPP_DEFS})
	set (libRadJav_CPP_DEFS __STDC_FORMAT_MACROS ${libRadJav_CPP_DEFS})
	set (libRadJav_CPP_DEFS ENABLE_WALLET=1 ${libRadJav_CPP_DEFS})
	set (libRadJav_CPP_DEFS __func__=__FUNCTION__ ${libRadJav_CPP_DEFS})
	set (libRadJav_CPP_DEFS USE_FIELD_10X26=1 ${libRadJav_CPP_DEFS})
	set (libRadJav_CPP_DEFS USE_FIELD_INV_BUILTIN=1 ${libRadJav_CPP_DEFS})
	set (libRadJav_CPP_DEFS USE_NUM_NONE=1 ${libRadJav_CPP_DEFS})
	set (libRadJav_CPP_DEFS USE_SCALAR_8X32=1 ${libRadJav_CPP_DEFS})
	set (libRadJav_CPP_DEFS USE_SCALAR_INV_BUILTIN=1 ${libRadJav_CPP_DEFS})
	set (libRadJav_CPP_DEFS _LIB ${libRadJav_CPP_DEFS})
	set (libRadJav_CPP_DEFS BOOST_SYSTEM_NO_DEPRECATED ${libRadJav_CPP_DEFS})

	add_compile_options (-enable-glibc-back-compat)

	if (WIN32)
		set (libRadJav_CPP_DEFS _WIN32_WINNT=0x0501 ${libRadJav_CPP_DEFS})
		set (libRadJav_CPP_DEFS LEVELDB_PLATFORM_WINDOWS ${libRadJav_CPP_DEFS})
	else ()
		set (libRadJav_CPP_DEFS LEVELDB_PLATFORM_POSIX ${libRadJav_CPP_DEFS})
	endif ()

	include (FindModuleZLIB)
	include (FindBerkleyDB)
	include (FindModuleBoost)
	include (FindModuleOpenSSL)
	include (FindlibEvent)
	include (FindMiniupnpc)
	include (Findleveldb)
	include (Findsecp256k1)
	include (Findlibzmq)

	include_directories ("${libRadJav_SOURCE_DIR}/blockchainV1")
	include_directories ("${libRadJav_SOURCE_DIR}/blockchainV1/src")
	include_directories ("${libRadJav_SOURCE_DIR}/blockchainV1/src/config")
	include_directories ("${libRadJav_SOURCE_DIR}/blockchainV1/src/univalue/include")
	include_directories ("${libRadJav_SOURCE_DIR}/blockchainV1/src/secp256k1/include")

	include_directories (${ZLIB_INCLUDE})
	#set (libRadJav_LINK_LIBRARIES ${ZLIB_LIBRARIES} ${libRadJav_LINK_LIBRARIES})
	include_directories (${BerkleyDB_INCLUDE})
	set (libRadJav_LINK_LIBRARIES ${BerkleyDB_LIBRARIES} ${libRadJav_LINK_LIBRARIES})
	include_directories (${Boost_INCLUDE})
	set (libRadJav_LINK_LIBRARIES ${Boost_LIBRARIES} ${libRadJav_LINK_LIBRARIES})
	include_directories (${OPENSSL_INCLUDE})
	set (libRadJav_LINK_LIBRARIES ${OPENSSL_LIBRARIES} ${libRadJav_LINK_LIBRARIES})
	include_directories (${event2_INCLUDE})
	set (libRadJav_LINK_LIBRARIES ${event2_LIBRARIES} ${libRadJav_LINK_LIBRARIES})
	include_directories (${miniupnpc_INCLUDE})
	set (libRadJav_LINK_LIBRARIES ${miniupnpc_LIBRARIES} ${libRadJav_LINK_LIBRARIES})
	include_directories (${leveldb_INCLUDE})
	set (libRadJav_LINK_LIBRARIES ${leveldb_LIBRARIES} ${libRadJav_LINK_LIBRARIES})
	include_directories (${secp256k1_INCLUDE})
	set (libRadJav_LINK_LIBRARIES ${secp256k1_LIBRARIES} ${libRadJav_LINK_LIBRARIES})
	include_directories (${libzmq_INCLUDE})
	set (libRadJav_LINK_LIBRARIES ${libzmq_LIBRARIES} ${libRadJav_LINK_LIBRARIES})

	#if (MSVC)
	#	add_definitions(/FI stdafx.h)
	#endif ()

	if (WIN32)
		set(libRadJav_LINK_LIBRARIES debug Iphlpapi.lib optimized Iphlpapi.lib ${libRadJav_LINK_LIBRARIES})
	endif ()
endif ()

if (libRadJav_ALLOW_NETWORKING)
	set (libRadJav_CPP_DEFS NET_ON ${libRadJav_CPP_DEFS})
endif ()

set (libRadJav_CPP_DEFS LIBRADJAV ${libRadJav_CPP_DEFS})

if (wxWidgets_FOUND)
	if (CMAKE_BUILD_TYPE MATCHES "Debug")
		set (libRadJav_CPP_DEFS_DEBUG WXDEBUG=1 ${libRadJav_CPP_DEFS_DEBUG})
		set (libRadJav_CPP_DEFS_DEBUG __WXDEBUG__ ${libRadJav_CPP_DEFS_DEBUG})
	endif ()

	set (libRadJav_CPP_DEFS GUI_USE_WXWIDGETS ${libRadJav_CPP_DEFS})
endif ()

if (CMAKE_BUILD_TYPE MATCHES "Debug")
	set (libRadJav_CPP_DEFS_DEBUG _DEBUG ${libRadJav_CPP_DEFS_DEBUG})
	set (libRadJav_CPP_DEFS_DEBUG ${libRadJav_CPP_DEFS} ${libRadJav_CPP_DEFS_DEBUG})
endif ()

if (MSVC)
	add_definitions (/wd4996)
	set (CMAKE_CXX_FLAGS_DEBUG "/MTd /Zi /Od /MP")
	set (CMAKE_CXX_FLAGS_RELEASE "/MT /MP")
	set (CMAKE_CXX_FLAGS_MINSIZEREL "/MT /MP")
	set (CMAKE_CXX_FLAGS_RELWITHDEBINFO "/MT /MP")
endif ()

if (UNIX)
	add_compile_options (-std=c++11)
	add_compile_options (-fpermissive)
endif ()

set (SOURCES ${libRadJav_SOURCE_DIR}/include/RadJav/RadJavJavascriptCode.h ${SOURCES})

# Create static/shared library for RadJav
if (libRadJav_STATIC)
	add_library (libRadJav STATIC ${SOURCES})
else ()
	add_library (libRadJav SHARED ${SOURCES})
endif ()

target_link_libraries (libRadJav ${libRadJav_LINK_LIBRARIES})

set_target_properties (libRadJav PROPERTIES LINKER_LANGUAGE CXX)
set_property (TARGET libRadJav APPEND PROPERTY COMPILE_DEFINITIONS ${libRadJav_CPP_DEFS})
set_property (TARGET libRadJav APPEND PROPERTY COMPILE_DEFINITIONS $<$<CONFIG:Debug>:${libRadJav_CPP_DEFS} ${libRadJav_CPP_DEFS_DEBUG}>)

if (WIN32)
	set_target_properties (libRadJav PROPERTIES LINK_FLAGS_DEBUG "/SUBSYSTEM:WINDOWS")
	set_target_properties (libRadJav PROPERTIES LINK_FLAGS_RELWITHDEBINFO "/SUBSYSTEM:WINDOWS")
	set_target_properties (libRadJav PROPERTIES LINK_FLAGS_RELEASE "/SUBSYSTEM:WINDOWS")
	set_target_properties (libRadJav PROPERTIES LINK_FLAGS_MINSIZEREL "/SUBSYSTEM:WINDOWS")
endif ()

set_property (TARGET libRadJav PROPERTY PROJECT_LABEL "libRadJav")

if (libRadJav_EMBEDFILE)
	add_custom_command (OUTPUT ${libRadJav_SOURCE_DIR}/include/RadJav/RadJavJavascriptCode.h
		COMMAND RadJavCompileResources
		DEPENDS ${libRadJav_SOURCE_DIR}/javascript/RadJav.js)

	add_executable (RadJavCompileResources ${libRadJav_SOURCE_DIR}/src/RadJav/RadJavCompileResources.cpp)
	set_property (TARGET RadJavCompileResources APPEND PROPERTY COMPILE_DEFINITIONS ${libRadJav_CPP_DEFS})
	set_property (TARGET RadJavCompileResources APPEND PROPERTY COMPILE_DEFINITIONS $<$<CONFIG:Debug>:${libRadJav_CPP_DEFS} ${libRadJav_CPP_DEFS_DEBUG}>)
endif ()
