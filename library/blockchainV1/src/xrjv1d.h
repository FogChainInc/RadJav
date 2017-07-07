#ifndef _xrjv1d_h_
	#define _xrjv1d_h_

	#include <boost/thread.hpp>

	void WaitForShutdown(boost::thread_group* threadGroup);
	bool AppInit(int argc, char* argv[]);
#endif

