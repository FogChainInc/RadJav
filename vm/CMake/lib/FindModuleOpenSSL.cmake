message (STATUS "Searching for OpenSSL...")

set (OPENSSL_ROOT_DIR $ENV{OPENSSL_ROOT_DIR} CACHE PATH "OpenSSL path")
fixPath (OPENSSL_ROOT_DIR)

include (FindOpenSSL)

set (OPENSSL_INCLUDE ${OPENSSL_INCLUDE_DIR})

hasLibBeenFound (OPENSSL)

