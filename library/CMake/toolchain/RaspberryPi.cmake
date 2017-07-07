set(CMAKE_SYSTEM_NAME Linux)

#set(CMAKE_SYSROOT /usr/arm-linux-gnueabihf)
#set(CMAKE_STAGING_PREFIX /usr)

set(CMAKE_SYSTEM_PROCESSOR armv6)
set(CMAKE_C_FLAGS "-march=armv6 -mfloat-abi=hard -mfpu=vfp" CACHE STRING "C Flags")
set(CMAKE_CXX_FLAGS "-march=armv6 -mfloat-abi=hard -mfpu=vfp" CACHE STRING "C++ Flags")

set(CMAKE_C_COMPILER /usr/bin/arm-linux-gnueabihf-gcc-4.9)
set(CMAKE_CXX_COMPILER /usr/bin/arm-linux-gnueabihf-g++-4.9)

set(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)
set(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
set(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)
set(CMAKE_FIND_ROOT_PATH_MODE_PACKAGE ONLY)

