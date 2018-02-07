set (SOURCES_files_RADJAV__Main__Sources
	"${libRadJav_SOURCE_DIR}/src/RadJav/RadJav.cpp"
	"${libRadJav_SOURCE_DIR}/src/RadJav/RadJavHashMap.cpp"
	"${libRadJav_SOURCE_DIR}/src/RadJav/RadJavArray.cpp"
	"${libRadJav_SOURCE_DIR}/src/RadJav/RadJavString.cpp"
	"${libRadJav_SOURCE_DIR}/src/RadJav/RadJavDate.cpp"
	"${libRadJav_SOURCE_DIR}/src/RadJav/RadJavThread.cpp"
	"${libRadJav_SOURCE_DIR}/src/RadJav/RadJavLang.cpp"
	"${libRadJav_SOURCE_DIR}/src/RadJav/RadJavTheme.cpp")
source_group ("RadJav\\Main" FILES ${SOURCES_files_RADJAV__Main__Sources})

set (SOURCES ${SOURCES_files_RADJAV__Main__Sources} ${SOURCES})

set (SOURCES_files_wxWidgets__Main__Sources 
	"${libRadJav_SOURCE_DIR}/src/RadJav/RadJavWxWidgets.cpp"
	"${libRadJav_SOURCE_DIR}/src/RadJav/RadJavWxWidgetsNetworking.cpp")
source_group ("RadJav\\wxWidgets" FILES ${SOURCES_files_wxWidgets__Main__Sources})

set (SOURCES ${SOURCES_files_wxWidgets__Main__Sources} ${SOURCES})

set (SOURCES_files_RadJav__v8__Sources 
	"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8JavascriptEngine.cpp")
source_group ("RadJav\\V8" FILES ${SOURCES_files_RadJav__v8__Sources})

set (SOURCES ${SOURCES_files_RadJav__v8__Sources} ${SOURCES})

set (SOURCES_files_RadJav__v8__GUI__Sources 
	"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8GUIGObject.cpp"
	"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8GUIWindow.cpp"
	"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8GUIWebView.cpp"
	"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8GUIButton.cpp"
	"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8GUILabel.cpp"
	"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8GUIImage.cpp"
	"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8GUIContainer.cpp"
	"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8GUICombobox.cpp"
	"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8GUITextbox.cpp"
	"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8GUITextarea.cpp"
	"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8GUICheckbox.cpp"
	"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8GUIRadio.cpp"
	"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8GUIList.cpp"
	"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8GUIMenuBar.cpp"
	"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8GUIMenuItem.cpp")
source_group ("RadJav\\V8\\GUI" FILES ${SOURCES_files_RadJav__v8__GUI__Sources})

set (SOURCES ${SOURCES_files_RadJav__v8__GUI__Sources} ${SOURCES})

set (SOURCES_files_RadJav__v8__Global__Sources 
	"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8Global.cpp")
source_group ("RadJav\\V8\\Global" FILES ${SOURCES_files_RadJav__v8__Global__Sources})

set (SOURCES ${SOURCES_files_RadJav__v8__Global__Sources} ${SOURCES})

set (SOURCES_files_RadJav__v8__OS__Sources 
	"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8OS.cpp")
source_group ("RadJav\\V8\\OS" FILES ${SOURCES_files_RadJav__v8__OS__Sources})

set (SOURCES ${SOURCES_files_RadJav__v8__OS__Sources} ${SOURCES})

set (SOURCES_files_RadJav__v8__Console__Sources 
	"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8Console.cpp")
source_group ("RadJav\\V8\\Console" FILES ${SOURCES_files_RadJav__v8__Console__Sources})

set (SOURCES ${SOURCES_files_RadJav__v8__Console__Sources} ${SOURCES})

set (SOURCES_files_RadJav__v8__IO__Sources 
	"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8IO.cpp")
source_group ("RadJav\\V8\\IO" FILES ${SOURCES_files_RadJav__v8__IO__Sources})

set (SOURCES ${SOURCES_files_RadJav__v8__IO__Sources} ${SOURCES})

set (SOURCES_files_RadJav__v8__Net__Sources 
	"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8Net.cpp")
source_group ("RadJav\\V8\\Net" FILES ${SOURCES_files_RadJav__v8__Net__Sources})

set (SOURCES ${SOURCES_files_RadJav__v8__Net__Sources} ${SOURCES})

set (SOURCES_files_RadJav__v8__Blockchain__Sources 
	"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8BlockchainV1.cpp")
source_group ("RadJav\\V8\\Blockchain" FILES ${SOURCES_files_RadJav__v8__Blockchain__Sources})

set (SOURCES ${SOURCES_files_RadJav__v8__Blockchain__Sources} ${SOURCES})

set (SOURCES_files_Javascript__Main__Sources 
	"${libRadJav_SOURCE_DIR}/src/RadJav/RadJavJavascriptEngine.cpp")
source_group ("RadJav\\Javascript" FILES ${SOURCES_files_Javascript__Main__Sources})

set (SOURCES ${SOURCES_files_Javascript__Main__Sources} ${SOURCES})

set (SOURCES_files_Networking__Main__Sources 
	"${libRadJav_SOURCE_DIR}/src/RadJav/RadJavNetworking.cpp")
source_group ("RadJav\\Networking" FILES ${SOURCES_files_Networking__Main__Sources})

set (SOURCES ${SOURCES_files_Networking__Main__Sources} ${SOURCES})

if (USE_OGRE)
	set (SOURCES_files_RadJav__v8__C3D__Sources 
		"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8C3DObject3D.cpp"
		"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8C3DEntity.cpp"
		"${libRadJav_SOURCE_DIR}/src/RadJav/v8/RadJavV8C3DWorld.cpp")
	source_group ("RadJav\\V8\\C3D" FILES ${SOURCES_files_RadJav__v8__C3D__Sources})

	set (SOURCES ${SOURCES_files_RadJav__v8__C3D__Sources} ${SOURCES})
endif ()

if (libRadJav_INCLUDE_BLOCKCHAIN_V1)
	set (SOURCES_files_BlockchainV1__Main__Sources 
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/arith_uint256.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/amount.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/addrdb.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/addrman.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/base58.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/blockencodings.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/bloom.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/chain.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/chainparams.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/chainparamsbase.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/checkpoints.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/clientversion.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/coins.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/compat/glibcxx_sanity.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/compat/glibc_sanity.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/compat/strnlen.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/compressor.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/consensus/merkle.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/core_read.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/core_write.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/crypto/aes.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/crypto/hmac_sha256.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/crypto/hmac_sha512.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/crypto/ripemd160.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/crypto/sha1.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/crypto/sha256.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/crypto/sha512.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/dbwrapper.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/hash.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/httprpc.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/httpserver.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/init.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/key.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/keystore.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/merkleblock.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/miner.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/net.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/netaddress.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/netbase.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/net_processing.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/noui.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/policy/fees.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/policy/policy.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/policy/rbf.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/pow.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/primitives/block.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/primitives/transaction.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/protocol.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/pubkey.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/random.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/rest.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/rpc/blockchain.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/rpc/client.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/rpc/mining.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/rpc/misc.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/rpc/net.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/rpc/protocol.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/rpc/rawtransaction.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/rpc/server.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/scheduler.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/script/xrjv1consensus.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/script/interpreter.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/script/ismine.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/script/script.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/script/script_error.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/script/sigcache.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/script/sign.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/script/standard.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/support/cleanse.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/support/lockedpool.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/sync.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/threadinterrupt.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/timedata.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/torcontrol.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/txdb.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/txmempool.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/uint256.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/ui_interface.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/univalue/lib/univalue.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/univalue/lib/univalue_read.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/univalue/lib/univalue_write.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/util.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/utilmoneystr.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/utilstrencodings.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/utiltime.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/validation.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/validationinterface.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/versionbits.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/wallet/crypter.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/wallet/db.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/wallet/rpcdump.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/wallet/rpcwallet.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/wallet/wallet.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/wallet/walletdb.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/warnings.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/zmq/zmqabstractnotifier.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/zmq/zmqnotificationinterface.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/zmq/zmqpublishnotifier.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/xrjv1d.cpp"
		"${libRadJav_SOURCE_DIR}/blockchainV1/src/xrjv1-cli.cpp")

	if (MSVC)
		set (SOURCES_files_BlockchainV1__Main__Sources 
		"${libRadJav_SOURCE_DIR}/blockchainV1/stdafx.cpp"
			${SOURCES_files_BlockchainV1__Main__Sources})
	endif ()

	source_group ("RadJav\\BlockchainV1" FILES ${SOURCES_files_BlockchainV1__Main__Sources})

	set (SOURCES ${SOURCES_files_BlockchainV1__Main__Sources} ${SOURCES})
endif ()

