/*
	MIT-LICENSE
	Copyright (c) 2017 Higher Edge Software, LLC

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
	and associated documentation files (the "Software"), to deal in the Software without restriction, 
	including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
	and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
	subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial 
	portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
	LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
#ifndef _RADJAV_V8_BLOCKCHAIN_V1_H_
	#define _RADJAV_V8_BLOCKCHAIN_V1_H_

	#include "RadJavPreprocessor.h"
	#include "RadJavString.h"
	#include "RadJavThread.h"

	#include "v8/RadJavV8GUIGObject.h"

	#ifdef USE_V8
		#include <v8.h>

		namespace RadJAV
		{
			#ifdef USE_BLOCKCHAIN_V1
				class RADJAV_EXPORT BlockchainV1: public GUI::GObjectBase
				{
					public:
						static void createV8Callbacks(v8::Isolate *isolate, v8::Local<v8::Object> object);

						static void connectToNetwork(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void on(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void rpcCommand(const v8::FunctionCallbackInfo<v8::Value> &args);

						// Blockchain
						static void getBestBlockHash(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getBlock(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getBlockchainInfo(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getBlockCount(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getBlockHash(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getBlockHeader(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getChainTips(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getDifficulty(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getMempoolAncestors(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getMempoolDescendants(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getMempoolEntry(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getMempoolInfo(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getRawMempool(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getTxout(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getTxoutProof(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getTxoutSetInfo(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void preciousBlock(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void pruneBlockchain(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void verifyChain(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void verifyTxoutProof(const v8::FunctionCallbackInfo<v8::Value> &args);

						// Control
						static void getInfo(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getMemoryInfo(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void stop(const v8::FunctionCallbackInfo<v8::Value> &args);

						// Generating
						static void generate(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void generateToAddress(const v8::FunctionCallbackInfo<v8::Value> &args);

						// Mining
						static void getBlockTemplate(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getMiningInfo(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getNetworkHashPS(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void prioritiseTransaction(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void submitBlock(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void setGenerate(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getGenerate(const v8::FunctionCallbackInfo<v8::Value> &args);

						// Network
						static void addNode(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void clearBanned(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void disconnectNode(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getAddedNodeInfo(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getConnectionCount(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getNetTotals(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getNetworkInfo(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getPeerInfo(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void listBanned(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void setBan(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void setNetworkActive(const v8::FunctionCallbackInfo<v8::Value> &args);

						// Raw Transactions
						static void createRawTransaction(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void decodeRawTransaction(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void decodeScript(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void fundRawTransaction(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getRawTransaction(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void sendRawTransaction(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void signRawTransaction(const v8::FunctionCallbackInfo<v8::Value> &args);

						// Util
						static void createMultiSig(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void estimateFee(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void signMessageWithPrivKey(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void validateAddress(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void verifyMessage(const v8::FunctionCallbackInfo<v8::Value> &args);

						// Wallet
						static void abandonTransaction(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void abortRescan(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void addMultiSigAddress(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void addWitnessAddress(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void backupWallet(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void bumpFee(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void dumpPrivKey(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void dumpWallet(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void encryptWallet(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getAccount(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getBalance(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getNewAddress(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getRawChangeAddress(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getReceivedByAddress(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getTransaction(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getUnconfirmedBalance(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void getWalletInfo(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void importAddress(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void importMulti(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void importPrivKey(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void importPrunedFunds(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void importPubKey(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void importWallet(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void keypoolRefill(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void listAddressGroupings(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void listLockUnspent(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void listReceivedByAddress(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void listSinceBlock(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void listTransactions(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void listUnspent(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void lockUnspent(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void removePrunedFunds(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void sendMany(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void sendToAddress(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void setTxFee(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void signMessage(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void walletLock(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void walletPassphrase(const v8::FunctionCallbackInfo<v8::Value> &args);
						static void walletPassphraseChange(const v8::FunctionCallbackInfo<v8::Value> &args);

						static void startBlockchain();

						static RJBOOL hasBlockchainStarted;
						static int connectArgsc;
						static char **connectArgsv;
						static v8::Persistent<v8::Function> *onReadyFunction;
						static v8::Persistent<v8::Function> *connectBlockFunction;
						static v8::Persistent<v8::Function> *proofOfWorkFoundFunction;
						static v8::Persistent<v8::Function> *passphraseRequiredFunction;
						static v8::Persistent<v8::Function> *onErrorFunction;
				};

				#ifdef GUI_USE_WXWIDGETS
					class RADJAV_EXPORT BlockchainV1Thread : public Thread
					{
						public:
							BlockchainV1Thread();

							wxThread::ExitCode Entry();
					};
				#endif
			#endif
		}
	#endif
#endif

