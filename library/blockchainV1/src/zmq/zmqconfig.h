// Copyright (c) 2014 The XRJV1 Core developers
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#ifndef XRJV1_ZMQ_ZMQCONFIG_H
#define XRJV1_ZMQ_ZMQCONFIG_H

#if defined(HAVE_CONFIG_H)
#ifdef _MSC_VER
	#include "config/xrjv1-config-win.h"
#else
	#include "config/xrjv1-config.h"
#endif
#endif

#include <stdarg.h>
#include <string>

#if ENABLE_ZMQ
#include <zmq.h>
#endif

#include "primitives/block.h"
#include "primitives/transaction.h"

void zmqError(const char *str);

#endif // XRJV1_ZMQ_ZMQCONFIG_H
