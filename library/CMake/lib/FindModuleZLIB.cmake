message (STATUS "Searching for ZLIB...")

set (ZLIB_ROOT $ENV{ZLIB_ROOT} CACHE PATH "ZLIB path")
fixPath (ZLIB_ROOT)

include (FindZLIB)

set (ZLIB_INCLUDE ${ZLIB_INCLUDE_DIRS})

hasLibBeenFound (ZLIB)

