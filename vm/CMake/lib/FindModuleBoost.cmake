message (STATUS "Searching for Boost...")

set (BOOSTROOT $ENV{BOOSTROOT} CACHE PATH "Boost path")
fixPath (BOOSTROOT)
set (Boost_USE_STATIC_LIBS TRUE)
#set (Boost_USE_STATIC_RUNTIME TRUE)
set (Boost_USE_MULTITHREADED TRUE)

find_package (Boost COMPONENTS thread system)

#include (FindBoost)

set (Boost_INCLUDE ${Boost_INCLUDE_DIRS})
set(Boost_LIBRARIES ${Boost_THREAD_LIBRARY_DEBUG} ${Boost_LIBRARIES})
set(Boost_LIBRARIES ${Boost_THREAD_LIBRARY_RELEASE} ${Boost_LIBRARIES})

hasLibBeenFound (Boost)
