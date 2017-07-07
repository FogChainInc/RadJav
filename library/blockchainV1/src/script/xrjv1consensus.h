// Copyright (c) 2009-2010 Satoshi Nakamoto
// Copyright (c) 2009-2016 The XRJV1 Core developers
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#ifndef XRJV1_XRJV1CONSENSUS_H
#define XRJV1_XRJV1CONSENSUS_H

#include <stdint.h>

#if defined(BUILD_XRJV1_INTERNAL) && defined(HAVE_CONFIG_H)
#include "config/xrjv1-config.h"
  #if defined(_WIN32)
    #if defined(DLL_EXPORT)
      #if defined(HAVE_FUNC_ATTRIBUTE_DLLEXPORT)
        #define EXPORT_SYMBOL __declspec(dllexport)
      #else
        #define EXPORT_SYMBOL
      #endif
    #endif
  #elif defined(HAVE_FUNC_ATTRIBUTE_VISIBILITY)
    #define EXPORT_SYMBOL __attribute__ ((visibility ("default")))
  #endif
#elif defined(MSC_VER) && !defined(STATIC_LIBXRJV1CONSENSUS)
  #define EXPORT_SYMBOL __declspec(dllimport)
#endif

#ifndef EXPORT_SYMBOL
  #define EXPORT_SYMBOL
#endif

#ifdef __cplusplus
extern "C" {
#endif

#define XRJV1CONSENSUS_API_VER 1

typedef enum xrjv1consensus_error_t
{
    xrjv1consensus_ERR_OK = 0,
    xrjv1consensus_ERR_TX_INDEX,
    xrjv1consensus_ERR_TX_SIZE_MISMATCH,
    xrjv1consensus_ERR_TX_DESERIALIZE,
    xrjv1consensus_ERR_AMOUNT_REQUIRED,
    xrjv1consensus_ERR_INVALID_FLAGS,
} xrjv1consensus_error;

/** Script verification flags */
enum
{
    xrjv1consensus_SCRIPT_FLAGS_VERIFY_NONE                = 0,
    xrjv1consensus_SCRIPT_FLAGS_VERIFY_P2SH                = (1U << 0), // evaluate P2SH (BIP16) subscripts
    xrjv1consensus_SCRIPT_FLAGS_VERIFY_DERSIG              = (1U << 2), // enforce strict DER (BIP66) compliance
    xrjv1consensus_SCRIPT_FLAGS_VERIFY_NULLDUMMY           = (1U << 4), // enforce NULLDUMMY (BIP147)
    xrjv1consensus_SCRIPT_FLAGS_VERIFY_CHECKLOCKTIMEVERIFY = (1U << 9), // enable CHECKLOCKTIMEVERIFY (BIP65)
    xrjv1consensus_SCRIPT_FLAGS_VERIFY_CHECKSEQUENCEVERIFY = (1U << 10), // enable CHECKSEQUENCEVERIFY (BIP112)
    xrjv1consensus_SCRIPT_FLAGS_VERIFY_WITNESS             = (1U << 11), // enable WITNESS (BIP141)
    xrjv1consensus_SCRIPT_FLAGS_VERIFY_ALL                 = xrjv1consensus_SCRIPT_FLAGS_VERIFY_P2SH | xrjv1consensus_SCRIPT_FLAGS_VERIFY_DERSIG |
                                                               xrjv1consensus_SCRIPT_FLAGS_VERIFY_NULLDUMMY | xrjv1consensus_SCRIPT_FLAGS_VERIFY_CHECKLOCKTIMEVERIFY |
                                                               xrjv1consensus_SCRIPT_FLAGS_VERIFY_CHECKSEQUENCEVERIFY | xrjv1consensus_SCRIPT_FLAGS_VERIFY_WITNESS
};

/// Returns 1 if the input nIn of the serialized transaction pointed to by
/// txTo correctly spends the scriptPubKey pointed to by scriptPubKey under
/// the additional constraints specified by flags.
/// If not NULL, err will contain an error/success code for the operation
EXPORT_SYMBOL int xrjv1consensus_verify_script(const unsigned char *scriptPubKey, unsigned int scriptPubKeyLen,
                                                 const unsigned char *txTo        , unsigned int txToLen,
                                                 unsigned int nIn, unsigned int flags, xrjv1consensus_error* err);

EXPORT_SYMBOL int xrjv1consensus_verify_script_with_amount(const unsigned char *scriptPubKey, unsigned int scriptPubKeyLen, int64_t amount,
                                    const unsigned char *txTo        , unsigned int txToLen,
                                    unsigned int nIn, unsigned int flags, xrjv1consensus_error* err);

EXPORT_SYMBOL unsigned int xrjv1consensus_version();

#ifdef __cplusplus
} // extern "C"
#endif

#undef EXPORT_SYMBOL

#endif // XRJV1_XRJV1CONSENSUS_H
