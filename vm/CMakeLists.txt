cmake_minimum_required (VERSION 3.0)

if (WIN32)
	set (CMAKE_USE_RELATIVE_PATHS TRUE)
endif ()

project (RadJavVM)

message (STATUS "Configuring RadJav VM...")
message (STATUS "Version 0.1")

set (CMAKE_MODULE_PATH "${RadJavVM_SOURCE_DIR}/CMake"
			"${RadJavVM_SOURCE_DIR}/CMake/lib"
			"${RadJavVM_SOURCE_DIR}/include"
			"${RadJavVM_SOURCE_DIR}/src")

include (Utils)

set (CMAKE_SYSTEM_PROCESSOR ${CMAKE_HOST_SYSTEM_PROCESSOR} CACHE STRING "CMAKE_SYSTEM_PROCESSOR")
set (CMAKE_CXX_FLAGS_DEBUG "" CACHE STRING "CMAKE_CXX_FLAGS_DEBUG")
set (CMAKE_CXX_FLAGS_RELEASE "" CACHE STRING "CMAKE_CXX_FLAGS_RELEASE")
set (CMAKE_CXX_FLAGS_MINSIZEREL "" CACHE STRING "CMAKE_CXX_FLAGS_MINSIZEREL")
set (CMAKE_CXX_FLAGS_RELWITHDEBINFO "" CACHE STRING "CMAKE_CXX_FLAGS_RELWITHDEBINFO")
set (RadJavVM_CPP_DEFS "" CACHE STRING "C++ Definitions")
set (RadJavVM_CPP_DEFS_DEBUG "" CACHE STRING "C++ Debug Definitions")
set (RadJavVM_JS_LIBRARY "V8" CACHE STRING "Javascript library to use")
set (RadJavVM_GUI_LIBRARY "wxWidgets" CACHE STRING "GUI library to use")
set (RadJavVM_HTTP_LIBRARY "curl" CACHE STRING "HTTP library to use")
set (RadJavVM_INCLUDE_C3D_API TRUE CACHE BOOL "Include the C3D API?")
set (libRadJav_PATH $ENV{RADJAV_PATH} CACHE PATH "RadJav path")
set (libRadJav_DEPENDENCIES $ENV{RADJAV_DEPENDENCIES} CACHE PATH "RadJav Dependencies path")
set (RadJavVM_LANGUAGE "en_us" CACHE STRING "Select language to compile with")
set (libRadJav_STATIC false CACHE BOOL "Static build of RadJav")
set (libRadJav_EMBEDFILE true CACHE BOOL "Embed Javascript into RadJav?")
set (RadJavVM_INCLUDE_BLOCKCHAIN_V1 true CACHE BOOL "Include Blockchain V1?")

message (STATUS "Building for processor type: ${CMAKE_SYSTEM_PROCESSOR}")

set (RadJavVM_LANGUAGE_UPPER)
string (TOUPPER ${RadJavVM_LANGUAGE} RadJavVM_LANGUAGE_UPPER)
message (STATUS "Using language ${RadJavVM_LANGUAGE_UPPER}")

if (RadJavVM_JS_LIBRARY STREQUAL "V8")
	set (USE_V8 true)
endif ()

if (RadJavVM_GUI_LIBRARY STREQUAL "wxWidgets")
	set (USE_WXWIDGETS true)
endif ()

if (RadJavVM_HTTP_LIBRARY STREQUAL "civetweb")
	set (USE_CIVETWEB true)
endif ()

if (RadJavVM_HTTP_LIBRARY STREQUAL "nghttp2")
	set (USE_NGHTTP2 true)
endif ()

if (RadJavVM_INCLUDE_C3D_API)
	message (STATUS "C3D API is going to be included in this build.")
	set (USE_OGRE TRUE)
else ()
	message (STATUS "C3D API will NOT be included in this build.")
endif ()

if (RadJavVM_INCLUDE_BLOCKCHAIN_V1)
	message (STATUS "Blockchain V1 will be included in this build.")

	set (OPENSSL_ROOT_DIR "" CACHE PATH "OPENSSL_ROOT_DIR")
	set (ZLIB_ROOT "" CACHE PATH "ZLIB_ROOT")
	set (BOOST_ROOT "" CACHE PATH "BOOST_ROOT")
else ()
	message (STATUS "Blockchain V1 will NOT be included in this build.")
endif ()

set (CMAKE_DEBUG_POSTFIX "_d")
#set (RadJavVM_SOURCE_LANGUAGE_FILE)

#set (SOURCES_files_Languages
#	"${RadJavVM_SOURCE_DIR}/include/RadJav/languages/${RadJavVM_LANGUAGE}.h")
#source_group ("Languages" FILES ${SOURCES_files_Languages})
set (SOURCES "${RadJavVM_SOURCE_DIR}/src/RadJavVM" ${SOURCES})

#set (SOURCES ${SRC} ${SOURCES})

include (includes)
include (sources)

include (FindModuleCurl)
include (FindRadJav)

set (RadJavVM_CPP_DEFS)
set (RadJavVM_CPP_DEFS "LANG_${RadJavVM_LANGUAGE_UPPER}" ${RadJavVM_CPP_DEFS})

if (WIN32)
	set (RadJavVM_CPP_DEFS WIN32 ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS _WINDOWS ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS ARCH_X86 ${RadJavVM_CPP_DEFS})

	if (MSVC_VERSION LESS 1910)
		message (FATAL_ERROR "You must use Visual Studio 2017 or better!")
	endif ()

	if (MSVC)
		set (RadJavVM_CPP_DEFS NOMINMAX ${RadJavVM_CPP_DEFS})
	endif ()
endif ()

if (${CMAKE_SYSTEM_NAME} MATCHES "Linux")
	set (RadJavVM_CPP_DEFS LINUX ${RadJavVM_CPP_DEFS})
endif ()

set (RadJavVM_LINK_LIBRARIES)

include_directories (${RadJavVM_SOURCE_DIR}/include/RadJavVM)

if (libRadJav_FOUND)
	message (STATUS "RadJav Library Found...")
	include_directories (${libRadJav_INCLUDE})
	set (RadJavVM_LINK_LIBRARIES ${libRadJav_LIBRARIES} ${RadJavVM_LINK_LIBRARIES})
endif ()

if (USE_V8)
	include (FindV8)
endif ()

if (USE_OGRE)
	include (FindOgre3D)
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

if (OGRE_FOUND)
	message (STATUS "Ogre 3D Found...")
	include_directories (${OGRE_INCLUDE})
	set (RadJavVM_LINK_LIBRARIES ${OGRE_LIBRARIES} ${RadJavVM_LINK_LIBRARIES})
	set (RadJavVM_CPP_DEFS C3D_USE_OGRE ${RadJavVM_CPP_DEFS})
endif ()

if (V8_FOUND)
	include_directories (${V8_INCLUDE})
	set (RadJavVM_LINK_LIBRARIES ${V8_LIBRARIES} ${RadJavVM_LINK_LIBRARIES})
	set (RadJavVM_CPP_DEFS USE_V8 ${RadJavVM_CPP_DEFS})
endif ()

if (RadJavVM_INCLUDE_BLOCKCHAIN_V1)
	set (RadJavVM_CPP_DEFS USE_BLOCKCHAIN_V1 ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS HAVE_CONFIG_H ${RadJavVM_CPP_DEFS})

	set (RadJavVM_CPP_DEFS MINIUPNP_STATICLIB ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS STATICLIB ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS USE_UPNP ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS _CRT_SECURE_NO_WARNINGS ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS UNICODE ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS _SCL_SECURE_NO_WARNINGS ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS HAVE_WORKING_BOOST_SLEEP_FOR ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS NOMINMAX ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS USE_LEVELDB ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS USE_IPV6=1 ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS BOOST_SPIRIT_THREADSAFE ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS __STDC_FORMAT_MACROS ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS ENABLE_WALLET=1 ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS __func__=__FUNCTION__ ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS USE_FIELD_10X26=1 ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS USE_FIELD_INV_BUILTIN=1 ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS USE_NUM_NONE=1 ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS USE_SCALAR_8X32=1 ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS USE_SCALAR_INV_BUILTIN=1 ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS _DEBUG ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS _LIB ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS BOOST_SYSTEM_NO_DEPRECATED ${RadJavVM_CPP_DEFS})

	include (FindModuleBoost)
	include (FindModuleOpenSSL)
	include (Findsecp256k1)
	include (FindlibEvent)
	include (Findlibzmq)
	include (FindMiniupnpc)
	include (Findleveldb)
	include (FindBerkleyDB)
	include (FindModuleZLIB)

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
	set (RadJavVM_LINK_LIBRARIES ${leveldb_LIBRARIES} ${RadJavVM_LINK_LIBRARIES})
	include_directories (${secp256k1_INCLUDE})
	set (RadJavVM_LINK_LIBRARIES ${secp256k1_LIBRARIES} ${RadJavVM_LINK_LIBRARIES})
	include_directories (${libzmq_INCLUDE})
	set (RadJavVM_LINK_LIBRARIES ${libzmq_LIBRARIES} ${RadJavVM_LINK_LIBRARIES})

	#if (MSVC)
	#	add_definitions(/FI stdafx.h)
	#endif ()

	if (WIN32)
		set(libRadJav_LINK_LIBRARIES debug Iphlpapi.lib optimized Iphlpapi.lib ${libRadJav_LINK_LIBRARIES})
	endif ()
endif ()

if (wxWidgets_FOUND)
	include_directories (${wxWidgets_INCLUDE})
	set (RadJavVM_LINK_LIBRARIES ${wxWidgets_LIBRARIES} ${RadJavVM_LINK_LIBRARIES})
	set (RadJavVM_CPP_DEFS GUI_USE_WXWIDGETS ${RadJavVM_CPP_DEFS})

	#set (RadJavVM_CPP_DEFS wxUSE_DYNLIB_CLASS=1 ${RadJavVM_CPP_DEFS})
	#set (RadJavVM_CPP_DEFS WXUSINGDLL ${RadJavVM_CPP_DEFS})

	set (RadJavVM_CPP_DEFS wxUSE_GUI=1 ${RadJavVM_CPP_DEFS})

	if (WIN32)
		set (RadJavVM_CPP_DEFS WINVER=0x0400 ${RadJavVM_CPP_DEFS})
		set (RadJavVM_CPP_DEFS NOPCH ${RadJavVM_CPP_DEFS})
		set (RadJavVM_CPP_DEFS __WXMSW__ ${RadJavVM_CPP_DEFS})
	endif ()
endif ()

if (CURL_FOUND)
	include_directories (${CURL_INCLUDE})
	set (RadJavVM_LINK_LIBRARIES ${CURL_LIBRARIES} ${RadJavVM_LINK_LIBRARIES})
	set (RadJavVM_CPP_DEFS HTTP_USE_CURL ${RadJavVM_CPP_DEFS})
	set (RadJavVM_CPP_DEFS CURL_STATICLIB ${RadJavVM_CPP_DEFS})
endif ()

if (nghttp2_FOUND)
	include_directories (${nghttp2_INCLUDE})
	set (RadJavVM_LINK_LIBRARIES ${nghttp2_LIBRARIES} ${RadJavVM_LINK_LIBRARIES})
	set (RadJavVM_CPP_DEFS HTTP_USE_NGHTTP2 ${RadJavVM_CPP_DEFS})
endif ()

if (civetweb_FOUND)
	include_directories (${civetweb_INCLUDE})
	set (RadJavVM_LINK_LIBRARIES ${civetweb_LIBRARIES} ${RadJavVM_LINK_LIBRARIES})
	set (RadJavVM_CPP_DEFS HTTP_USE_CIVETWEB ${RadJavVM_CPP_DEFS})
endif ()

set (RadJavVM_CPP_DEFS_DEBUG)
set (RadJavVM_CPP_DEFS_DEBUG RADJAV_DEBUG ${RadJavVM_CPP_DEFS_DEBUG})

if (wxWidgets_FOUND)
	set (RadJavVM_CPP_DEFS_DEBUG WXDEBUG=1 ${RadJavVM_CPP_DEFS_DEBUG})
	set (RadJavVM_CPP_DEFS_DEBUG __WXDEBUG__ ${RadJavVM_CPP_DEFS_DEBUG})
endif ()

if (MSVC)
	add_definitions (/wd4996)
	set (CMAKE_CXX_FLAGS_DEBUG "/MTd /Zi /Od")
	set (CMAKE_CXX_FLAGS_RELEASE "/MT")
	set (CMAKE_CXX_FLAGS_MINSIZEREL "/MT")
	set (CMAKE_CXX_FLAGS_RELWITHDEBINFO "/MT")
endif ()

if (UNIX)
	add_compile_options (-std=c++11)
	add_compile_options (-fpermissive)
endif ()

if (libRadJav_STATIC)
	set (libRadJav_CPP_DEFS RADJAV_LIB_STATIC ${libRadJav_CPP_DEFS})
	set (RadJavVM_CPP_DEFS_DEBUG RADJAV_LIB_STATIC ${RadJavVM_CPP_DEFS_DEBUG})
	set (RadJavVM_CPP_DEFS RADJAV_LIB_STATIC ${RadJavVM_CPP_DEFS})
else ()
	set (libRadJav_CPP_DEFS RADJAV_LIB_DLL ${libRadJav_CPP_DEFS})
	set (RadJavVM_CPP_DEFS_DEBUG RADJAV_LIB_DLL ${RadJavVM_CPP_DEFS_DEBUG})
	set (RadJavVM_CPP_DEFS RADJAV_LIB_DLL ${RadJavVM_CPP_DEFS})
endif ()

# Create executable for RadJav.
set (ISWIN32)
set (ISOSX)

if (WIN32)
	set (ISWIN32 "WIN32")
	set (RadJavVM_LINK_LIBRARIES ws2_32 wldap32 ${RadJavVM_LINK_LIBRARIES})
endif ()

add_executable (RadJavVM ${ISWIN32} ${ISOSX} ${SOURCES})

target_link_libraries (RadJavVM ${RadJavVM_LINK_LIBRARIES})

set_target_properties (RadJavVM PROPERTIES LINKER_LANGUAGE CXX)
set_property (TARGET RadJavVM APPEND PROPERTY COMPILE_DEFINITIONS ${RadJavVM_CPP_DEFS})
set_property (TARGET RadJavVM APPEND PROPERTY COMPILE_DEFINITIONS $<$<CONFIG:Debug>:${RadJavVM_CPP_DEFS} ${RadJavVM_CPP_DEFS_DEBUG}>)

if (WIN32)
	set_target_properties (RadJavVM PROPERTIES LINK_FLAGS_DEBUG "/SUBSYSTEM:WINDOWS")
	set_target_properties (RadJavVM PROPERTIES LINK_FLAGS_RELWITHDEBINFO "/SUBSYSTEM:WINDOWS")
	set_target_properties (RadJavVM PROPERTIES LINK_FLAGS_RELEASE "/SUBSYSTEM:WINDOWS")
	set_target_properties (RadJavVM PROPERTIES LINK_FLAGS_MINSIZEREL "/SUBSYSTEM:WINDOWS")
endif ()

set_property (TARGET RadJavVM PROPERTY PROJECT_LABEL "RadJavVM")

#if (libRadJav_EMBEDFILE)
#	add_custom_command (OUTPUT ${libRadJav_PATH}/include/RadJav/RadJavJavascriptCode.h
#		COMMAND RadJavCompileResources
#		DEPENDS ${libRadJav_PATH}/javascript/RadJav.js)

#	add_executable (RadJavCompileResources ${libRadJav_PATH}/src/RadJav/RadJavCompileResources.cpp)
#	set_property (TARGET RadJavCompileResources APPEND PROPERTY COMPILE_DEFINITIONS ${RadJavVM_CPP_DEFS})
#	set_property (TARGET RadJavCompileResources APPEND PROPERTY COMPILE_DEFINITIONS $<$<CONFIG:Debug>:${RadJavVM_CPP_DEFS} ${RadJavVM_CPP_DEFS_DEBUG}>)
#endif ()
