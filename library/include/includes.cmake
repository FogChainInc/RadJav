set (SOURCES_files_RADJAV__Main__Headers
	"${libRadJav_SOURCE_DIR}/include/RadJav/RadJav.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/RadJavunistd.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/RadJavPreprocessor.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/RadJavLang.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/RadJavException.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/RadJavLang.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/RadJavHashMap.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/RadJavArray.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/RadJavString.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/RadJavDate.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/RadJavThread.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/RadJavTheme.h")
source_group ("RadJav\\Main" FILES ${SOURCES_files_RADJAV__Main__Headers})

set (SOURCES ${SOURCES_files_RADJAV__Main__Headers} ${SOURCES})

set (SOURCES_files_wxWidgets__Main__Headers 
	"${libRadJav_SOURCE_DIR}/include/RadJav/RadJavWxWidgets.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/RadJavWxWidgetsNetworking.h")
source_group ("RadJav\\wxWidgets" FILES ${SOURCES_files_wxWidgets__Main__Headers})

set (SOURCES ${SOURCES_files_wxWidgets__Main__Headers} ${SOURCES})

set (SOURCES_files_RadJav__v8__Headers 
	"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8JavascriptEngine.h")
source_group ("RadJav\\V8" FILES ${SOURCES_files_RadJav__v8__Headers})

set (SOURCES ${SOURCES_files_RadJav__v8__Headers} ${SOURCES})

set (SOURCES_files_RadJav__v8__GUI__Headers 
	"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8GUIGObject.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8GUIWindow.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8GUIWebView.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8GUIButton.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8GUILabel.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8GUIImage.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8GUIContainer.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8GUICombobox.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8GUITextbox.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8GUITextarea.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8GUICheckbox.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8GUIRadio.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8GUIList.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8GUIMenuBar.h"
	"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8GUIMenuItem.h")
source_group ("RadJav\\V8\\GUI" FILES ${SOURCES_files_RadJav__v8__GUI__Headers})

set (SOURCES ${SOURCES_files_RadJav__v8__GUI__Headers} ${SOURCES})

set (SOURCES_files_RadJav__v8__Global__Headers 
	"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8Global.h")
source_group ("RadJav\\V8\\Global" FILES ${SOURCES_files_RadJav__v8__Global__Headers})

set (SOURCES ${SOURCES_files_RadJav__v8__Global__Headers} ${SOURCES})

set (SOURCES_files_RadJav__v8__OS__Headers 
	"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8OS.h")
source_group ("RadJav\\V8\\OS" FILES ${SOURCES_files_RadJav__v8__OS__Headers})

set (SOURCES ${SOURCES_files_RadJav__v8__OS__Headers} ${SOURCES})

set (SOURCES_files_RadJav__v8__Console__Headers 
	"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8Console.h")
source_group ("RadJav\\V8\\Console" FILES ${SOURCES_files_RadJav__v8__Console__Headers})

set (SOURCES ${SOURCES_files_RadJav__v8__Console__Headers} ${SOURCES})

set (SOURCES_files_RadJav__v8__IO__Headers 
	"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8IO.h")
source_group ("RadJav\\V8\\IO" FILES ${SOURCES_files_RadJav__v8__IO__Headers})

set (SOURCES ${SOURCES_files_RadJav__v8__IO__Headers} ${SOURCES})

set (SOURCES_files_RadJav__v8__Net__Headers 
	"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8Net.h")
source_group ("RadJav\\V8\\Net" FILES ${SOURCES_files_RadJav__v8__Net__Headers})

set (SOURCES ${SOURCES_files_RadJav__v8__Net__Headers} ${SOURCES})

set (SOURCES_files_RadJav__v8__Blockchain__Headers 
	"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8BlockchainV1.h")
source_group ("RadJav\\V8\\Blockchain" FILES ${SOURCES_files_RadJav__v8__Blockchain__Headers})

set (SOURCES ${SOURCES_files_RadJav__v8__Blockchain__Headers} ${SOURCES})

set (SOURCES_files_Javascript__Main__Headers 
	"${libRadJav_SOURCE_DIR}/include/RadJav/RadJavJavascriptEngine.h")
source_group ("RadJav\\Javascript" FILES ${SOURCES_files_Javascript__Main__Headers})

set (SOURCES ${SOURCES_files_Javascript__Main__Headers} ${SOURCES})

set (SOURCES_files_Networking__Main__Headers 
	"${libRadJav_SOURCE_DIR}/include/RadJav/RadJavNetworking.h")
source_group ("RadJav\\Networking" FILES ${SOURCES_files_Networking__Main__Headers})

set (SOURCES ${SOURCES_files_Networking__Main__Headers} ${SOURCES})

if (USE_OGRE)
	set (SOURCES_files_RadJav__v8__C3D__Headers 
		"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8C3DObject3D.h"
		"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8C3DEntity.h"
		"${libRadJav_SOURCE_DIR}/include/RadJav/v8/RadJavV8C3DWorld.h")
	source_group ("RadJav\\V8\\C3D" FILES ${SOURCES_files_RadJav__v8__C3D__Headers})

	set (SOURCES ${SOURCES_files_RadJav__v8__C3D__Headers} ${SOURCES})
endif ()

if (libRadJav_INCLUDE_BLOCKCHAIN_V1)
	set (SOURCES_files_BlockchainV1__Main__Headers 
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/arith_uint256.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/addrdb.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/addrman.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/amount.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/base58.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/blockencodings.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/bloom.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/chain.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/chainparams.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/chainparamsbase.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/chainparamsseeds.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/checkpoints.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/checkqueue.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/clientversion.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/coins.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/compat.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/compat/byteswap.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/compat/endian.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/compat/sanity.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/compressor.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/consensus/consensus.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/consensus/merkle.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/consensus/params.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/consensus/validation.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/core_io.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/core_memusage.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/crypto/aes.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/crypto/common.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/crypto/hmac_sha256.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/crypto/hmac_sha512.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/crypto/ripemd160.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/crypto/sha1.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/crypto/sha256.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/crypto/sha512.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/cuckoocache.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/dbwrapper.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/hash.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/httprpc.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/httpserver.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/indirectmap.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/init.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/key.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/keystore.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/limitedmap.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/memusage.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/merkleblock.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/miner.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/net.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/netaddress.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/netbase.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/netmessagemaker.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/net_processing.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/noui.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/policy/fees.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/policy/policy.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/policy/rbf.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/pow.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/prevector.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/primitives/block.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/primitives/transaction.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/protocol.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/pubkey.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/random.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/reverselock.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/rpc/client.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/rpc/protocol.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/rpc/register.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/rpc/server.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/scheduler.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/script/xrjv1consensus.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/script/interpreter.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/script/ismine.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/script/script.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/script/script_error.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/script/sigcache.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/script/sign.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/script/standard.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/serialize.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/streams.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/support/allocators/secure.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/support/allocators/zeroafterfree.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/support/cleanse.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/support/events.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/support/lockedpool.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/sync.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/threadinterrupt.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/threadsafety.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/timedata.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/tinyformat.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/torcontrol.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/txdb.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/txmempool.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/uint256.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/ui_interface.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/undo.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/univalue/include/univalue.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/univalue/lib/univalue_escapes.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/univalue/lib/univalue_utffilter.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/univalue/univalue-config.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/util.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/utilmoneystr.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/utilstrencodings.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/utiltime.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/validation.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/validationinterface.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/version.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/versionbits.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/wallet/coincontrol.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/wallet/crypter.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/wallet/db.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/wallet/rpcwallet.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/wallet/wallet.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/wallet/walletdb.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/warnings.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/zmq/zmqabstractnotifier.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/zmq/zmqconfig.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/zmq/zmqnotificationinterface.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/zmq/zmqpublishnotifier.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/wintype.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/xrjv1d.h"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/xrjv1-cli.h")

	if (MSVC)
		set (SOURCES_files_BlockchainV1__Main__Headers 
			"${libRadJav_SOURCE_DIR}/blockchainV1/src/config/xrjv1-config-win.h"
			"${libRadJav_SOURCE_DIR}/blockchainV1/stdafx.h"
			${SOURCES_files_BlockchainV1__Main__Headers})
	endif ()

	source_group ("RadJav\\BlockchainV1" FILES ${SOURCES_files_BlockchainV1__Main__Headers})

	set (SOURCES ${SOURCES_files_BlockchainV1__Main__Headers} ${SOURCES})
endif ()

