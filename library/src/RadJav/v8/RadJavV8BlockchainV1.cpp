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
#ifdef USE_BLOCKCHAIN_V1
	#include "xrjv1d.h"
	#include "noui.h"
	#include "util.h"
#endif

#include "v8/RadJavV8BlockchainV1.h"
#include "v8/RadJavV8IO.h"

#include "RadJav.h"
#include "RadJavString.h"

#ifdef USE_V8
	#include "v8/RadJavV8JavascriptEngine.h"

#ifdef USE_BLOCKCHAIN_V1
	#include "xrjv1-cli.h"
#endif

namespace RadJAV
{
	#ifdef USE_BLOCKCHAIN_V1
	RJBOOL BlockchainV1::hasBlockchainStarted = false;
	int BlockchainV1::connectArgsc = 0;
	char **BlockchainV1::connectArgsv = NULL;
	v8::Persistent<v8::Function> *BlockchainV1::onReadyFunction = NULL;
	v8::Persistent<v8::Function> *BlockchainV1::connectBlockFunction = NULL;
	v8::Persistent<v8::Function> *BlockchainV1::proofOfWorkFoundFunction = NULL;
	v8::Persistent<v8::Function> *BlockchainV1::passphraseRequiredFunction = NULL;
	v8::Persistent<v8::Function> *BlockchainV1::onErrorFunction = NULL;

	static XRJV1CLIResult getXRJV1CLIResult(String command);
	static XRJV1CLIResult getXRJV1CLIResult(String command, Array<String> args, RJBOOL throwError = true);

	void BlockchainV1::createV8Callbacks(v8::Isolate *isolate, v8::Local<v8::Object> object)
	{
		V8_CALLBACK(object, "connectToNetwork", BlockchainV1::connectToNetwork);
		V8_CALLBACK(object, "on", BlockchainV1::on);
		V8_CALLBACK(object, "rpcCommand", BlockchainV1::rpcCommand);

		// Blockchain
		V8_CALLBACK(object, "getBestBlockHash", BlockchainV1::getBestBlockHash);
		V8_CALLBACK(object, "getBlock", BlockchainV1::getBlock);
		V8_CALLBACK(object, "getBlockchainInfo", BlockchainV1::getBlockchainInfo);
		V8_CALLBACK(object, "getBlockCount", BlockchainV1::getBlockCount);
		V8_CALLBACK(object, "getBlockHash", BlockchainV1::getBlockHash);
		V8_CALLBACK(object, "getBlockHeader", BlockchainV1::getBlockHeader);
		V8_CALLBACK(object, "getChainTips", BlockchainV1::getChainTips);
		V8_CALLBACK(object, "getDifficulty", BlockchainV1::getDifficulty);
		V8_CALLBACK(object, "getMempoolAncestors", BlockchainV1::getMempoolAncestors);
		V8_CALLBACK(object, "getMempoolDescendants", BlockchainV1::getMempoolDescendants);
		V8_CALLBACK(object, "getMempoolEntry", BlockchainV1::getMempoolEntry);
		V8_CALLBACK(object, "getMempoolInfo", BlockchainV1::getMempoolInfo);
		V8_CALLBACK(object, "getRawMempool", BlockchainV1::getRawMempool);
		V8_CALLBACK(object, "getTxout", BlockchainV1::getTxout);
		V8_CALLBACK(object, "getTxoutProof", BlockchainV1::getTxoutProof);
		V8_CALLBACK(object, "getTxoutSetInfo", BlockchainV1::getTxoutSetInfo);
		V8_CALLBACK(object, "preciousBlock", BlockchainV1::preciousBlock);
		V8_CALLBACK(object, "pruneBlockchain", BlockchainV1::pruneBlockchain);
		V8_CALLBACK(object, "verifyChain", BlockchainV1::verifyChain);
		V8_CALLBACK(object, "verifyTxoutProof", BlockchainV1::verifyTxoutProof);

		// Control
		V8_CALLBACK(object, "getInfo", BlockchainV1::getInfo);
		V8_CALLBACK(object, "getMemoryInfo", BlockchainV1::getMemoryInfo);
		V8_CALLBACK(object, "stop", BlockchainV1::stop);

		// Generating
		V8_CALLBACK(object, "generate", BlockchainV1::generate);
		V8_CALLBACK(object, "generateToAddress", BlockchainV1::generateToAddress);

		// Mining
		V8_CALLBACK(object, "getBlockTemplate", BlockchainV1::getBlockTemplate);
		V8_CALLBACK(object, "getMiningInfo", BlockchainV1::getMiningInfo);
		V8_CALLBACK(object, "getNetworkHashPS", BlockchainV1::getNetworkHashPS);
		V8_CALLBACK(object, "prioritiseTransaction", BlockchainV1::prioritiseTransaction);
		V8_CALLBACK(object, "submitBlock", BlockchainV1::submitBlock);
		V8_CALLBACK(object, "setGenerate", BlockchainV1::setGenerate);
		V8_CALLBACK(object, "getGenerate", BlockchainV1::getGenerate);

		// Network
		V8_CALLBACK(object, "addNode", BlockchainV1::addNode);
		V8_CALLBACK(object, "clearBanned", BlockchainV1::clearBanned);
		V8_CALLBACK(object, "disconnectNode", BlockchainV1::disconnectNode);
		V8_CALLBACK(object, "getAddedNodeInfo", BlockchainV1::getAddedNodeInfo);
		V8_CALLBACK(object, "getConnectionCount", BlockchainV1::getConnectionCount);
		V8_CALLBACK(object, "getNetTotals", BlockchainV1::getNetTotals);
		V8_CALLBACK(object, "getNetworkInfo", BlockchainV1::getNetworkInfo);
		V8_CALLBACK(object, "getPeerInfo", BlockchainV1::getPeerInfo);
		V8_CALLBACK(object, "listBanned", BlockchainV1::listBanned);
		V8_CALLBACK(object, "setBan", BlockchainV1::setBan);
		V8_CALLBACK(object, "setNetworkActive", BlockchainV1::setNetworkActive);

		// Raw Transactions
		V8_CALLBACK(object, "createRawTransaction", BlockchainV1::createRawTransaction);
		V8_CALLBACK(object, "decodeRawTransaction", BlockchainV1::decodeRawTransaction);
		V8_CALLBACK(object, "decodeScript", BlockchainV1::decodeScript);
		V8_CALLBACK(object, "fundRawTransaction", BlockchainV1::fundRawTransaction);
		V8_CALLBACK(object, "getRawTransaction", BlockchainV1::getRawTransaction);
		V8_CALLBACK(object, "sendRawTransaction", BlockchainV1::sendRawTransaction);
		V8_CALLBACK(object, "signRawTransaction", BlockchainV1::signRawTransaction);

		// Util
		V8_CALLBACK(object, "createMultiSig", BlockchainV1::createMultiSig);
		V8_CALLBACK(object, "estimateFee", BlockchainV1::estimateFee);
		V8_CALLBACK(object, "signMessageWithPrivKey", BlockchainV1::signMessageWithPrivKey);
		V8_CALLBACK(object, "validateAddress", BlockchainV1::validateAddress);
		V8_CALLBACK(object, "verifyMessage", BlockchainV1::verifyMessage);

		// Wallet
		V8_CALLBACK(object, "abandonTransaction", BlockchainV1::abandonTransaction);
		V8_CALLBACK(object, "abortRescan", BlockchainV1::abortRescan);
		V8_CALLBACK(object, "addMultiSigAddress", BlockchainV1::addMultiSigAddress);
		V8_CALLBACK(object, "addWitnessAddress", BlockchainV1::addWitnessAddress);
		V8_CALLBACK(object, "backupWallet", BlockchainV1::backupWallet);
		V8_CALLBACK(object, "bumpFee", BlockchainV1::bumpFee);
		V8_CALLBACK(object, "dumpPrivKey", BlockchainV1::dumpPrivKey);
		V8_CALLBACK(object, "dumpWallet", BlockchainV1::dumpWallet);
		V8_CALLBACK(object, "encryptWallet", BlockchainV1::encryptWallet);
		V8_CALLBACK(object, "getAccount", BlockchainV1::getAccount);
		V8_CALLBACK(object, "getBalance", BlockchainV1::getBalance);
		V8_CALLBACK(object, "getNewAddress", BlockchainV1::getNewAddress);
		V8_CALLBACK(object, "getRawChangeAddress", BlockchainV1::getRawChangeAddress);
		V8_CALLBACK(object, "getReceivedByAddress", BlockchainV1::getReceivedByAddress);
		V8_CALLBACK(object, "getTransaction", BlockchainV1::getTransaction);
		V8_CALLBACK(object, "getUnconfirmedBalance", BlockchainV1::getUnconfirmedBalance);
		V8_CALLBACK(object, "getWalletInfo", BlockchainV1::getWalletInfo);
		V8_CALLBACK(object, "importAddress", BlockchainV1::importAddress);
		V8_CALLBACK(object, "importMulti", BlockchainV1::importMulti);
		V8_CALLBACK(object, "importPrivKey", BlockchainV1::importPrivKey);
		V8_CALLBACK(object, "importPrunedFunds", BlockchainV1::importPrunedFunds);
		V8_CALLBACK(object, "importPubKey", BlockchainV1::importPubKey);
		V8_CALLBACK(object, "importWallet", BlockchainV1::importWallet);
		V8_CALLBACK(object, "keypoolRefill", BlockchainV1::keypoolRefill);
		V8_CALLBACK(object, "listAddressGroupings", BlockchainV1::listAddressGroupings);
		V8_CALLBACK(object, "listLockUnspent", BlockchainV1::listLockUnspent);
		V8_CALLBACK(object, "listReceivedByAddress", BlockchainV1::listReceivedByAddress);
		V8_CALLBACK(object, "listTransactions", BlockchainV1::listTransactions);
		V8_CALLBACK(object, "listUnspent", BlockchainV1::listUnspent);
		V8_CALLBACK(object, "lockUnspent", BlockchainV1::lockUnspent);
		V8_CALLBACK(object, "removePrunedFunds", BlockchainV1::removePrunedFunds);
		V8_CALLBACK(object, "sendMany", BlockchainV1::sendMany);
		V8_CALLBACK(object, "sendToAddress", BlockchainV1::sendToAddress);
		V8_CALLBACK(object, "setTxFee", BlockchainV1::setTxFee);
		V8_CALLBACK(object, "signMessage", BlockchainV1::signMessage);
		V8_CALLBACK(object, "walletLock", BlockchainV1::walletLock);
		V8_CALLBACK(object, "walletPassphrase", BlockchainV1::walletPassphrase);
		V8_CALLBACK(object, "walletPassphraseChange", BlockchainV1::walletPassphraseChange);
	}

	void BlockchainV1::connectToNetwork(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		if (args.Length() > 0)
		{
			if (connectArgsv != NULL)
			{
				for (RJINT iIdx = 0; iIdx < connectArgsc; iIdx++)
					RJDELETEARRAY connectArgsv[iIdx];

				RJDELETEARRAY connectArgsv;
			}

			connectArgsc = 0;
			connectArgsv = NULL;
			Array<String> commands;

			v8::Local<v8::Object> connectSettings = v8::Local<v8::Object>::Cast(args[0]);
			v8::Local<v8::Array> nodes = v8::Local<v8::Array>::Cast(connectSettings->Get(String("nodes").toV8String(args.GetIsolate())));

			if (nodes.IsEmpty() == false)
			{
				RJUINT count = nodes->Length();

				for (RJUINT iIdx = 0; iIdx < count; iIdx++)
				{
					v8::Local<v8::String> str = v8::Local<v8::String>::Cast(nodes->Get(iIdx));

					String node = parseV8Value(str);
					commands.push_back("-addnode=" + node);
				}
			}

			connectArgsc = commands.size() + 1;
			connectArgsv = RJNEW char *[connectArgsc];
			connectArgsv[0] = "";

			for (RJUINT iIdx = 0; iIdx < commands.size(); iIdx++)
			{
				String command = commands.at(iIdx);
				connectArgsv[iIdx + 1] = RJNEW char[command.size () + 1];
				strcpy (connectArgsv[iIdx + 1], command.c_str());
			}
		}

		hasBlockchainStarted = true;
	}

	void BlockchainV1::on(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String event = parseV8Value(args[0]);
		v8::Local<v8::Function> func = v8::Local<v8::Function>::Cast(args[1]);

		if (event == "ready")
		{
			if (onReadyFunction != NULL)
				DELETEOBJ(onReadyFunction);

			v8::Persistent<v8::Function> *persistent = RJNEW v8::Persistent<v8::Function>();

			persistent->Reset(args.GetIsolate(), func);
			onReadyFunction = persistent;
		}

		if (event == "connectBlock")
		{
			if (connectBlockFunction != NULL)
				DELETEOBJ(connectBlockFunction);

			v8::Persistent<v8::Function> *persistent = RJNEW v8::Persistent<v8::Function>();

			persistent->Reset(args.GetIsolate(), func);
			connectBlockFunction = persistent;
		}

		if (event == "proofOfWorkFound")
		{
			if (proofOfWorkFoundFunction != NULL)
				DELETEOBJ(proofOfWorkFoundFunction);

			v8::Persistent<v8::Function> *persistent = RJNEW v8::Persistent<v8::Function>();

			persistent->Reset(args.GetIsolate(), func);
			proofOfWorkFoundFunction = persistent;
		}

		if (event == "passphraseRequired")
		{
			if (passphraseRequiredFunction != NULL)
				DELETEOBJ(passphraseRequiredFunction);

			v8::Persistent<v8::Function> *persistent = RJNEW v8::Persistent<v8::Function>();

			persistent->Reset(args.GetIsolate(), func);
			passphraseRequiredFunction = persistent;
		}

		if (event == "error")
		{
			if (onErrorFunction != NULL)
				DELETEOBJ(onErrorFunction);

			v8::Persistent<v8::Function> *persistent = RJNEW v8::Persistent<v8::Function>();

			persistent->Reset(args.GetIsolate(), func);
			onErrorFunction = persistent;
		}
	}

	void BlockchainV1::rpcCommand(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		Array<String> args2;

		for (RJINT iIdx = 0; iIdx < args.Length(); iIdx++)
			args2.push_back(parseV8Value (args[iIdx]->ToString (args.GetIsolate ())));

		XRJV1CLIResult output = getXRJV1CLIResult("rpcCommand", args2);

		if (output.exceptionThrown == true)
			return;

		args.GetReturnValue().Set (output.result.toV8String (args.GetIsolate ()));
	}

	void BlockchainV1::getBestBlockHash(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getbestblockhash";
		XRJV1CLIResult output = getXRJV1CLIResult(cmd);

		if (output.exceptionThrown == true)
			return;

		args.GetReturnValue().Set (output.result.toV8String (args.GetIsolate ()));
	}

	void BlockchainV1::getBlock(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getblock";
		String blockhash = parseV8Value(args[0]);

		Array<String> args2;
		args2.push_back(blockhash);
		args2.push_back("true");
		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::getBlockchainInfo(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getblockchaininfo";
		XRJV1CLIResult output = getXRJV1CLIResult(cmd);

		if (output.exceptionThrown == true)
			return;

		args.GetReturnValue().Set(output.result.toV8String(args.GetIsolate()));
	}

	void BlockchainV1::getBlockCount(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getblockcount";
		XRJV1CLIResult output = getXRJV1CLIResult(cmd);

		if (output.exceptionThrown == true)
			return;

		args.GetReturnValue().Set(v8::Integer::New (args.GetIsolate (), parseInt (output.result)));
	}

	void BlockchainV1::getBlockHash(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getblockhash";
		String blockhash = parseV8Value(args[0]);

		Array<String> args2;
		args2.push_back(blockhash);
		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::getBlockHeader(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getblockheader";
		String hash = parseV8Value(args[0]);

		Array<String> args2;
		args2.push_back(hash);
		args2.push_back("true");
		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::getChainTips(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getchaintips";
		XRJV1CLIResult output = getXRJV1CLIResult(cmd);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::getDifficulty(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getdifficulty";
		XRJV1CLIResult output = getXRJV1CLIResult(cmd);

		if (output.exceptionThrown == true)
			return;

		args.GetReturnValue().Set(v8::Integer::New(args.GetIsolate(), parseInt(output.result)));
	}

	void BlockchainV1::getMempoolAncestors(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getmempoolancestors";
		String txid = parseV8Value(args[0]);

		Array<String> args2;
		args2.push_back(txid);
		args2.push_back("true");
		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::getMempoolDescendants(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getmempooldescendants";
		String txid = parseV8Value(args[0]);

		Array<String> args2;
		args2.push_back(txid);
		args2.push_back("true");
		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::getMempoolEntry(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getmempoolentry";
		String txid = parseV8Value(args[0]);

		Array<String> args2;
		args2.push_back(txid);
		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::getMempoolInfo(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getmempoolinfo";
		XRJV1CLIResult output = getXRJV1CLIResult(cmd);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::getRawMempool(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getrawmempool";

		Array<String> args2;
		args2.push_back("true");
		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::getTxout(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "gettxout";
		String txid = parseV8Value(args[0]);
		String n = parseV8Value(args[1]);
		Array<String> args2;

		args2.push_back(txid);
		args2.push_back(n);

		if (args.Length() > 2)
		{
			String include_mempool = parseV8Value (args[2]);
			args2.push_back(include_mempool);
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::getTxoutProof(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "gettxoutproof";
		v8::Local<v8::Array> ary = v8::Local<v8::Array>::Cast (args[0]);
		String txary = "[";

		for (RJUINT iIdx = 0; iIdx < ary->Length(); iIdx++)
		{
			String comma = ",";

			if (iIdx == (ary->Length() - 1))
				comma = "";

			txary += "\"" + parseV8Value (ary->Get (iIdx)) + "\"" + comma;
		}

		txary += "]";

		Array<String> args2;
		args2.push_back(txary);

		if (args.Length() > 1)
		{
			String blockhash = parseV8Value (args[1]);
			args2.push_back(blockhash);
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::getTxoutSetInfo(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "gettxoutsetinfo";
		XRJV1CLIResult output = getXRJV1CLIResult(cmd);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::preciousBlock(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "preciousblock";
		String blockhash = parseV8Value(args[0]);

		Array<String> args2;
		args2.push_back(blockhash);
		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::pruneBlockchain(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "pruneblockchain";
		XRJV1CLIResult output = getXRJV1CLIResult(cmd);

		if (output.exceptionThrown == true)
			return;

		args.GetReturnValue().Set(v8::Integer::New(args.GetIsolate(), parseInt(output.result)));
	}

	void BlockchainV1::verifyChain(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "verifychain";
		Array<String> args2;

		if (args.Length() > 0)
		{
			String checklevel = parseV8Value(args[0]);
			args2.push_back(checklevel);
		}

		if (args.Length() > 1)
		{
			String nblocks = parseV8Value(args[1]);
			args2.push_back(nblocks);
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		RJBOOL verify = parseBoolean(output.result);

		args.GetReturnValue().Set(v8::Boolean::New (args.GetIsolate (), verify));
	}

	void BlockchainV1::verifyTxoutProof(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "verifytxoutproof";
		String proof = parseV8Value(args[0]);

		Array<String> args2;
		args2.push_back(proof);

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	// Chain
	void BlockchainV1::getInfo(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getinfo";
		XRJV1CLIResult output = getXRJV1CLIResult(cmd);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::getMemoryInfo(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getmemoryinfo";
		XRJV1CLIResult output = getXRJV1CLIResult(cmd);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::stop(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "stop";
		getXRJV1CLIResult(cmd);
	}

	void BlockchainV1::generate(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "generate";
		String nblocks = parseV8Value(args[0]);

		Array<String> args2;
		args2.push_back(nblocks);

		if (args.Length() > 1)
		{
			String maxtries = parseV8Value(args[1]);
			args2.push_back(maxtries);
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::generateToAddress(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "generatetoaddress";
		String nblocks = parseV8Value(args[0]);
		String address = parseV8Value(args[1]);

		Array<String> args2;
		args2.push_back(nblocks);
		args2.push_back(address);

		if (args.Length() > 2)
		{
			String maxtries = parseV8Value(args[2]);
			args2.push_back(maxtries);
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::getBlockTemplate(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getblocktemplate";
		Array<String> args2;

		if (args.Length() > 0)
		{
			String TemplateRequest = parseV8Value(args[0]);
			args2.push_back(TemplateRequest);
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::getMiningInfo(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getmininginfo";
		XRJV1CLIResult output = getXRJV1CLIResult(cmd);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::getNetworkHashPS(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getnetworkhashps";
		Array<String> args2;

		if (args.Length() > 0)
		{
			String nblocks = parseV8Value(args[0]);
			args2.push_back(nblocks);
		}

		if (args.Length() > 1)
		{
			String height = parseV8Value(args[1]);
			args2.push_back(height);
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::prioritiseTransaction(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "prioritisetransaction";
		String txid = parseV8Value(args[0]);
		String priority = parseV8Value(args[1]);
		String fee = parseV8Value(args[1]);

		Array<String> args2;
		args2.push_back(txid);
		args2.push_back(priority);
		args2.push_back(fee);

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		RJBOOL verify = parseBoolean(output.result);

		args.GetReturnValue().Set(v8::Boolean::New(args.GetIsolate(), verify));
	}

	void BlockchainV1::submitBlock(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "submitblock";
		String hexdata = parseV8Value(args[0]);

		Array<String> args2;
		args2.push_back(hexdata);

		if (args.Length() > 1)
		{
			String jsonparametersobject = parseV8Value(args[1]);
			args2.push_back(jsonparametersobject);
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		args.GetReturnValue().Set(output.result.toV8String (args.GetIsolate ()));
	}

	void BlockchainV1::setGenerate(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "setgenerate";
		RJBOOL generate = parseBoolean(parseV8Value(args[0]));
		String strgenerate = "false";

		if (generate == true)
			strgenerate = "true";

		Array<String> args2;
		args2.push_back(strgenerate);

		if (args.Length() > 1)
		{
			String genproclimit = parseV8Value(args[1]);
			args2.push_back(genproclimit);
		}
		else
			args2.push_back("-1");

		getXRJV1CLIResult(cmd, args2);
	}

	void BlockchainV1::getGenerate(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getgenerate";

		XRJV1CLIResult output = getXRJV1CLIResult(cmd);

		if (output.exceptionThrown == true)
			return;

		RJBOOL result = parseBoolean(output.result);

		args.GetReturnValue().Set(v8::Boolean::New(args.GetIsolate(), result));
	}

	void BlockchainV1::addNode(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "addnode";
		String node = parseV8Value(args[0]);

		Array<String> args2;
		args2.push_back(node);

		if (args.Length() > 1)
		{
			String command = parseV8Value(args[1]);
			args2.push_back(command);
		}
		else
			args2.push_back("add");

		getXRJV1CLIResult(cmd, args2);
	}

	void BlockchainV1::clearBanned(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "clearbanned";
		getXRJV1CLIResult(cmd);
	}

	void BlockchainV1::disconnectNode(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "disconnectnode";
		String address = parseV8Value(args[0]);

		Array<String> args2;
		args2.push_back(address);

		if (args.Length() > 1)
		{
			String nodeid = parseV8Value(args[1]);
			args2.push_back(nodeid);
		}

		getXRJV1CLIResult(cmd, args2);
	}

	void BlockchainV1::getAddedNodeInfo(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getaddednodeinfo";
		String node = parseV8Value(args[0]);

		Array<String> args2;
		args2.push_back(node);

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::getConnectionCount(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getconnectioncount";
		XRJV1CLIResult output = getXRJV1CLIResult(cmd);

		if (output.exceptionThrown == true)
			return;

		args.GetReturnValue().Set(v8::Integer::New(args.GetIsolate(), parseInt(output.result)));
	}

	void BlockchainV1::getNetTotals(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getnettotals";
		XRJV1CLIResult output = getXRJV1CLIResult(cmd);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::getNetworkInfo(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getnetworkinfo";
		XRJV1CLIResult output = getXRJV1CLIResult(cmd);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::getPeerInfo(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getpeerinfo";
		XRJV1CLIResult output = getXRJV1CLIResult(cmd);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::listBanned(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "listbanned";
		XRJV1CLIResult output = getXRJV1CLIResult(cmd);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::setBan(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "setban";
		String subnet = parseV8Value(args[0]);
		String command = parseV8Value(args[1]);

		Array<String> args2;
		args2.push_back(subnet);
		args2.push_back(command);

		if (args.Length() > 2)
		{
			String bantime = parseV8Value(args[2]);
			args2.push_back(bantime);
		}

		if (args.Length() > 3)
		{
			String absolute = parseV8Value(args[3]);
			args2.push_back(absolute);
		}

		getXRJV1CLIResult(cmd, args2);
	}

	void BlockchainV1::setNetworkActive(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "setnetworkactive";
		RJBOOL activate = parseBoolean(parseV8Value (args[0]));

		Array<String> args2;
		args2.push_back(activate);

		getXRJV1CLIResult(cmd, args2);
	}

	void BlockchainV1::createRawTransaction(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "createrawtransaction";
		v8::Local<v8::Array> ary = v8::Local<v8::Array>::Cast(args[0]);
		String inputs = "[";

		for (RJUINT iIdx = 0; iIdx < ary->Length(); iIdx++)
		{
			String comma = ",";

			if (iIdx == (ary->Length() - 1))
				comma = "";
			
			v8::Local<v8::Object> inputObj = v8::Local<v8::Object>::Cast (ary->Get(iIdx));
			v8::MaybeLocal<v8::String> input = v8::JSON::Stringify(args.GetIsolate ()->GetCurrentContext (), inputObj);
			inputs += "\"" + parseV8Value(input.ToLocalChecked ()) + "\"" + comma;
		}

		inputs += "]";

		v8::Local<v8::Object> addrv8Obj = v8::Local<v8::Object>::Cast(args[1]);
		v8::MaybeLocal<v8::String> addrv8 = v8::JSON::Stringify(args.GetIsolate ()->GetCurrentContext (), addrv8Obj);
		String addr = parseV8Value (addrv8.ToLocalChecked ());
		Array<String> args2;

		args2.push_back(inputs);
		args2.push_back(addr);

		if (args.Length() > 2)
		{
			String locktime = parseV8Value(args[2]);
			args2.push_back(locktime);
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::decodeRawTransaction(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "decoderawtransaction";
		String serializedTransaction = parseV8Value(args[0]);

		Array<String> args2;
		args2.push_back(serializedTransaction);

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::decodeScript(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "decodescript";
		String redeemScript = parseV8Value(args[0]);

		Array<String> args2;
		args2.push_back(redeemScript);

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::fundRawTransaction(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "fundrawtransaction";
		String hexstring = parseV8Value(args[0]);

		Array<String> args2;
		args2.push_back(hexstring);

		if (args.Length() > 1)
		{
			v8::Local<v8::Object> optionsObj = v8::Local<v8::Object>::Cast(args[1]);
			v8::MaybeLocal<v8::String> options = v8::JSON::Stringify (args.GetIsolate ()->GetCurrentContext (), optionsObj);
			args2.push_back(parseV8Value (options.ToLocalChecked()));
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::getRawTransaction(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getrawtransaction";
		String txid = parseV8Value(args[0]);

		Array<String> args2;
		args2.push_back(txid);
		args2.push_back("true");

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::sendRawTransaction(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "sendrawtransaction";
		String transaction = parseV8Value(args[0]);

		Array<String> args2;
		args2.push_back(transaction);

		if (args.Length() > 1)
		{
			v8::Local<v8::Boolean> allowHighFeesObj = v8::Local<v8::Boolean>::Cast (args[1]);
			RJBOOL allowHighFees = allowHighFeesObj->Value();

			if (allowHighFees == true)
				args2.push_back("true");
			else
				args2.push_back("false");
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::signRawTransaction(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "signrawtransaction";
		String transaction = parseV8Value(args[0]);
		Array<String> args2;

		args2.push_back(transaction);

		if (args.Length() > 1)
		{
			v8::Local<v8::Object> dependenciesObj = v8::Local<v8::Object>::Cast(args[1]);
			v8::MaybeLocal<v8::String> dependencies = v8::JSON::Stringify(args.GetIsolate ()->GetCurrentContext (), dependenciesObj);

			args2.push_back(parseV8Value (dependencies.ToLocalChecked ()));
		}

		if (args.Length() > 2)
		{
			v8::Local<v8::Object> privateKeysObj = v8::Local<v8::Object>::Cast(args[2]);
			v8::MaybeLocal<v8::String> privateKeys = v8::JSON::Stringify(args.GetIsolate ()->GetCurrentContext (), privateKeysObj);

			args2.push_back(parseV8Value (privateKeys.ToLocalChecked ()));
		}

		if (args.Length() > 3)
		{
			String sigHash = parseV8Value(args[3]);

			args2.push_back(sigHash);
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::createMultiSig(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "createmultisig";
		String nrequired = parseV8Value(args[0]);
		Array<String> args2;

		args2.push_back(nrequired);

		if (args.Length() > 1)
		{
			v8::Local<v8::Object> keysObj = v8::Local<v8::Object>::Cast(args[1]);
			v8::MaybeLocal<v8::String> keys = v8::JSON::Stringify(args.GetIsolate ()->GetCurrentContext (), keysObj);

			args2.push_back(parseV8Value(keys.ToLocalChecked()));
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::estimateFee(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "estimatefee";
		String numBlocks = parseV8Value(args[0]);
		Array<String> args2;

		args2.push_back(numBlocks);

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		args.GetReturnValue().Set(v8::Number::New (args.GetIsolate (), parseDecimal (output.result)));
	}

	void BlockchainV1::signMessageWithPrivKey(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "signmessagewithprivkey";
		String privKey = parseV8Value(args[0]);
		String message = parseV8Value(args[1]);
		Array<String> args2;

		args2.push_back(privKey);
		args2.push_back(message);

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		args.GetReturnValue().Set(output.result.toV8String (args.GetIsolate ()));
	}

	void BlockchainV1::walletLock(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "walletlock";

		getXRJV1CLIResult(cmd);
	}

	void BlockchainV1::walletPassphrase(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "walletpassphrase";
		String passphrase = parseV8Value(args[0]);
		String seconds = parseV8Value(args[1]);
		Array<String> args2;

		args2.push_back(passphrase);
		args2.push_back(seconds);

		getXRJV1CLIResult(cmd, args2);
	}

	void BlockchainV1::walletPassphraseChange(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "walletpassphrasechange";
		String passphrase = parseV8Value(args[0]);
		String newPassphrase = parseV8Value(args[1]);
		Array<String> args2;

		args2.push_back(passphrase);
		args2.push_back(newPassphrase);

		getXRJV1CLIResult(cmd, args2);
	}

	void BlockchainV1::validateAddress(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "validateaddress";
		String address = parseV8Value(args[0]);
		Array<String> args2;

		args2.push_back(address);

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::verifyMessage(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "verifymessage";
		String address = parseV8Value(args[0]);
		String signature = parseV8Value(args[1]);
		String message = parseV8Value(args[2]);
		Array<String> args2;

		args2.push_back(address);
		args2.push_back(signature);
		args2.push_back(message);

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::abandonTransaction(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "abandontransaction";
		String txid = parseV8Value(args[0]);
		Array<String> args2;

		args2.push_back(txid);

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		args.GetReturnValue().Set(output.result.toV8String(args.GetIsolate()));
	}

	void BlockchainV1::abortRescan(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "abortrescan";

		getXRJV1CLIResult(cmd);
	}

	void BlockchainV1::addMultiSigAddress(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "addmultisigaddress";
		String nrequired = parseV8Value(args[0]);
		v8::Local<v8::Object> keysObj = v8::Local<v8::Object>::Cast(args[1]);
		v8::MaybeLocal<v8::String> keys = v8::JSON::Stringify(args.GetIsolate ()->GetCurrentContext (), keysObj);
		Array<String> args2;

		args2.push_back(nrequired);
		args2.push_back(parseV8Value(keys.ToLocalChecked()));

		if (args.Length() > 2)
		{
			String account = parseV8Value(args[2]);

			args2.push_back(account);
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		args.GetReturnValue().Set(output.result.toV8String(args.GetIsolate()));
	}

	void BlockchainV1::addWitnessAddress(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "addwitnessaddress";
		String address = parseV8Value(args[0]);
		Array<String> args2;

		args2.push_back(address);

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		args.GetReturnValue().Set(output.result.toV8String(args.GetIsolate()));
	}

	void BlockchainV1::backupWallet(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "backupwallet";
		String destination = parseV8Value(args[0]);
		Array<String> args2;

		args2.push_back(destination);

		getXRJV1CLIResult(cmd, args2);
	}

	void BlockchainV1::bumpFee(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "bumpfee";
		String txid = parseV8Value(args[0]);
		Array<String> args2;

		args2.push_back(txid);

		if (args.Length() > 1)
		{
			v8::Local<v8::Object> optionsObj = v8::Local<v8::Object>::Cast(args[1]);
			v8::MaybeLocal<v8::String> options = v8::JSON::Stringify(args.GetIsolate ()->GetCurrentContext (), optionsObj);

			args2.push_back(parseV8Value (options.ToLocalChecked ()));
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::dumpPrivKey(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "dumpprivkey";
		String txid = parseV8Value(args[0]);
		Array<String> args2;

		args2.push_back(txid);

		if (args.Length() > 1)
		{
			v8::Local<v8::Object> optionsObj = v8::Local<v8::Object>::Cast(args[1]);
			v8::MaybeLocal<v8::String> options = v8::JSON::Stringify(args.GetIsolate ()->GetCurrentContext (), optionsObj);

			args2.push_back(parseV8Value(options.ToLocalChecked()));
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		args.GetReturnValue().Set(output.result.toV8String(args.GetIsolate()));
	}

	void BlockchainV1::dumpWallet(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "dumpwallet";
		String filename = parseV8Value(args[0]);
		Array<String> args2;

		args2.push_back(filename);

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		args.GetReturnValue().Set(output.result.toV8String(args.GetIsolate()));
	}

	void BlockchainV1::encryptWallet(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "encryptwallet";
		String passphrase = parseV8Value(args[0]);
		Array<String> args2;

		args2.push_back(passphrase);

		getXRJV1CLIResult(cmd, args2);
	}

	void BlockchainV1::getAccount(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getaccount";
		String address = parseV8Value(args[0]);
		Array<String> args2;

		args2.push_back(address);

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		args.GetReturnValue().Set(output.result.toV8String(args.GetIsolate()));
	}

	void BlockchainV1::getBalance(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getbalance";
		Array<String> args2;

		if (args.Length() > 0)
		{
			v8::Local<v8::Object> accountObj = v8::Local<v8::Object>::Cast(args[0]);
			v8::MaybeLocal<v8::String> account = v8::JSON::Stringify(args.GetIsolate ()->GetCurrentContext (), accountObj);

			args2.push_back(parseV8Value(account.ToLocalChecked()));
		}

		if (args.Length() > 1)
		{
			v8::Local<v8::Object> confirmationsObj = v8::Local<v8::Object>::Cast(args[1]);
			v8::MaybeLocal<v8::String> confirmations = v8::JSON::Stringify(args.GetIsolate ()->GetCurrentContext (), confirmationsObj);

			args2.push_back(parseV8Value(confirmations.ToLocalChecked()));
		}

		if (args.Length() > 2)
		{
			v8::Local<v8::Boolean> confirmationsObj = v8::Local<v8::Boolean>::Cast(args[2]);
			String includeWatchOnly = "false";

			if (confirmationsObj->Value() == true)
				includeWatchOnly = "true";

			args2.push_back(includeWatchOnly);
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		args.GetReturnValue().Set(v8::Number::New (args.GetIsolate (), parseDecimal (output.result)));
	}

	void BlockchainV1::getNewAddress(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getnewaddress";
		Array<String> args2;

		if (args.Length() > 0)
		{
			v8::Local<v8::Object> accountObj = v8::Local<v8::Object>::Cast(args[0]);
			v8::MaybeLocal<v8::String> account = v8::JSON::Stringify(args.GetIsolate ()->GetCurrentContext (), accountObj);

			args2.push_back(parseV8Value(account.ToLocalChecked()));
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		args.GetReturnValue().Set(output.result.toV8String (args.GetIsolate ()));
	}

	void BlockchainV1::getRawChangeAddress(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getrawchangeaddress";

		XRJV1CLIResult output = getXRJV1CLIResult(cmd);

		if (output.exceptionThrown == true)
			return;

		args.GetReturnValue().Set(output.result.toV8String(args.GetIsolate()));
	}

	void BlockchainV1::getReceivedByAddress(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getreceivedbyaddress";
		String address = parseV8Value(args[0]);
		Array<String> args2;

		args2.push_back(address);

		if (args.Length() > 1)
		{
			String numConfs = parseV8Value (args[1]);

			args2.push_back(numConfs);
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		args.GetReturnValue().Set(v8::Number::New (args.GetIsolate (), parseDecimal (output.result)));
	}

	void BlockchainV1::getTransaction(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "gettransaction";
		String txid = parseV8Value(args[0]);
		Array<String> args2;

		args2.push_back(txid);

		if (args.Length() > 1)
		{
			v8::Local<v8::Boolean> confirmationsObj = v8::Local<v8::Boolean>::Cast(args[2]);
			String includeWatchOnly = "false";

			if (confirmationsObj->Value() == true)
				includeWatchOnly = "true";

			args2.push_back(includeWatchOnly);
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::getUnconfirmedBalance(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getunconfirmedbalance";

		XRJV1CLIResult output = getXRJV1CLIResult(cmd);

		if (output.exceptionThrown == true)
			return;

		args.GetReturnValue().Set(v8::Number::New (args.GetIsolate (), parseDecimal (output.result)));
	}

	void BlockchainV1::getWalletInfo(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "getwalletinfo";

		XRJV1CLIResult output = getXRJV1CLIResult(cmd);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::importAddress(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "importaddress";
		String address = parseV8Value(args[0]);
		Array<String> args2;

		args2.push_back(address);

		if (args.Length() > 1)
		{
			String account = parseV8Value(args[1]);

			args2.push_back(account);
		}

		if (args.Length() > 2)
		{
			v8::Local<v8::Boolean> rescanObj = v8::Local<v8::Boolean>::Cast(args[1]);
			RJBOOL rescan = rescanObj->Value();

			if (rescan == true)
				args2.push_back("true");
			else
				args2.push_back("false");
		}

		getXRJV1CLIResult(cmd, args2);
	}

	void BlockchainV1::importMulti(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "importmulti";
		Array<String> args2;

		v8::Local<v8::Object> requestsObj = v8::Local<v8::Object>::Cast(args[0]);
		v8::MaybeLocal<v8::String> requests = v8::JSON::Stringify(args.GetIsolate ()->GetCurrentContext (), requestsObj);
		args2.push_back(parseV8Value(requests.ToLocalChecked()));

		if (args.Length() > 1)
		{
			v8::Local<v8::Boolean> rescanObj = v8::Local<v8::Boolean>::Cast(args[1]);
			RJBOOL rescan = rescanObj->Value();

			if (rescan == true)
				args2.push_back("true");
			else
				args2.push_back("false");
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::importPrivKey(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "importprivkey";
		String privKey = parseV8Value(args[0]);
		Array<String> args2;

		if (args.Length() > 1)
		{
			String account = parseV8Value(args[1]);
			args2.push_back(account);
		}

		if (args.Length() > 2)
		{
			v8::Local<v8::Boolean> rescanObj = v8::Local<v8::Boolean>::Cast(args[2]);
			RJBOOL rescan = rescanObj->Value();

			if (rescan == true)
				args2.push_back("true");
			else
				args2.push_back("false");
		}

		getXRJV1CLIResult(cmd, args2);
	}

	void BlockchainV1::importPrunedFunds(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "importprunedfunds";
		String rawTransaction = parseV8Value(args[0]);
		Array<String> args2;

		args2.push_back(rawTransaction);

		if (args.Length() > 1)
		{
			String txOutProof = parseV8Value(args[1]);
			args2.push_back(txOutProof);
		}

		getXRJV1CLIResult(cmd, args2);
	}

	void BlockchainV1::importPubKey(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "importpubkey";
		String rawTransaction = parseV8Value(args[0]);
		Array<String> args2;

		args2.push_back(rawTransaction);

		if (args.Length() > 1)
		{
			String txOutProof = parseV8Value(args[1]);
			args2.push_back(txOutProof);
		}

		getXRJV1CLIResult(cmd, args2);
	}

	void BlockchainV1::importWallet(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "importwallet";
		String filename = parseV8Value(args[0]);
		Array<String> args2;

		args2.push_back(filename);

		getXRJV1CLIResult(cmd, args2);
	}

	void BlockchainV1::keypoolRefill(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "keypoolrefill";
		String keypoolSize = parseV8Value(args[0]);
		Array<String> args2;

		args2.push_back(keypoolSize);

		getXRJV1CLIResult(cmd, args2);
	}

	void BlockchainV1::listAddressGroupings(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "listaddressgroupings";

		XRJV1CLIResult output = getXRJV1CLIResult(cmd);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::listLockUnspent(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "listlockunspent";

		XRJV1CLIResult output = getXRJV1CLIResult(cmd);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::listReceivedByAddress(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "listreceivedbyaddress";
		Array<String> args2;

		if (args.Length() > 0)
		{
			String confs = parseV8Value (args[0]);

			args2.push_back(confs);
		}

		if (args.Length() > 1)
		{
			v8::Local<v8::Boolean> includeEmptyObj = v8::Local<v8::Boolean>::Cast(args[1]);
			String includeEmpty = "false";

			if (includeEmptyObj->Value() == true)
				includeEmpty = "true";

			args2.push_back(includeEmpty);
		}

		if (args.Length() > 2)
		{
			v8::Local<v8::Boolean> confirmationsObj = v8::Local<v8::Boolean>::Cast(args[2]);
			String includeWatchOnly = "false";

			if (confirmationsObj->Value() == true)
				includeWatchOnly = "true";

			args2.push_back(includeWatchOnly);
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::listSinceBlock(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "listsinceblock";
		Array<String> args2;

		if (args.Length() > 0)
		{
			String blockHash = parseV8Value(args[0]);

			args2.push_back(blockHash);
		}

		if (args.Length() > 1)
		{
			String targetConfs = parseV8Value(args[1]);

			args2.push_back(targetConfs);
		}

		if (args.Length() > 2)
		{
			v8::Local<v8::Boolean> confirmationsObj = v8::Local<v8::Boolean>::Cast(args[2]);
			String includeWatchOnly = "false";

			if (confirmationsObj->Value() == true)
				includeWatchOnly = "true";

			args2.push_back(includeWatchOnly);
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::listTransactions(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "listtransactions";
		Array<String> args2;

		if (args.Length() > 0)
		{
			String account = parseV8Value(args[0]);

			args2.push_back(account);
		}

		if (args.Length() > 1)
		{
			String maxTransactions = parseV8Value(args[1]);

			args2.push_back(maxTransactions);
		}

		if (args.Length() > 2)
		{
			String skipTransactions = parseV8Value(args[2]);

			args2.push_back(skipTransactions);
		}

		if (args.Length() > 3)
		{
			v8::Local<v8::Boolean> confirmationsObj = v8::Local<v8::Boolean>::Cast(args[3]);
			String includeWatchOnly = "false";

			if (confirmationsObj->Value() == true)
				includeWatchOnly = "true";

			args2.push_back(includeWatchOnly);
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::listUnspent(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "listunspent";
		Array<String> args2;

		if (args.Length() > 0)
		{
			String minConfs = parseV8Value(args[0]);

			args2.push_back(minConfs);
		}

		if (args.Length() > 1)
		{
			String maxConfs = parseV8Value(args[1]);

			args2.push_back(maxConfs);
		}

		if (args.Length() > 2)
		{
			v8::Local<v8::Object> addressesObj = v8::Local<v8::Object>::Cast(args[2]);
			v8::MaybeLocal<v8::String> addresses = v8::JSON::Stringify(args.GetIsolate ()->GetCurrentContext (), addressesObj);
			args2.push_back(parseV8Value(addresses.ToLocalChecked()));
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		v8::Local<v8::Value> json = v8::JSON::Parse(output.result.toV8String(args.GetIsolate()));

		args.GetReturnValue().Set(json);
	}

	void BlockchainV1::lockUnspent(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "lockunspent";
		Array<String> args2;
		v8::Local<v8::Boolean> unlockObj = v8::Local<v8::Boolean>::Cast(args[0]);
		RJBOOL unlock = unlockObj->Value();

		if (unlock == true)
			args2.push_back("true");
		else
			args2.push_back("false");

		if (args.Length() > 1)
		{
			v8::Local<v8::Object> outputsObj = v8::Local<v8::Object>::Cast(args[1]);
			v8::MaybeLocal<v8::String> outputs = v8::JSON::Stringify(args.GetIsolate ()->GetCurrentContext (), outputsObj);
			args2.push_back(parseV8Value(outputs.ToLocalChecked()));
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		RJBOOL result = parseBoolean (output.result);

		args.GetReturnValue().Set(v8::Boolean::New (args.GetIsolate (), result));
	}

	void BlockchainV1::removePrunedFunds(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "removeprunedfunds";
		String txid = parseV8Value(args[0]);
		Array<String> args2;

		args2.push_back(txid);

		getXRJV1CLIResult(cmd, args2);
	}

	void BlockchainV1::sendMany(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "sendmany";
		String fromAccount = parseV8Value(args[0]);
		Array<String> args2;

		args2.push_back(fromAccount);

		v8::Local<v8::Object> outputsObj = v8::Local<v8::Object>::Cast(args[1]);
		v8::MaybeLocal<v8::String> outputs = v8::JSON::Stringify(args.GetIsolate()->GetCurrentContext(), outputsObj);
		args2.push_back(parseV8Value(outputs.ToLocalChecked()));

		if (args.Length() > 2)
		{
			String confs = parseV8Value(args[2]);
			args2.push_back(confs);
		}

		if (args.Length() > 3)
		{
			String comment = parseV8Value(args[3]);
			args2.push_back(comment);
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		args.GetReturnValue().Set(output.result.toV8String (args.GetIsolate ()));
	}

	void BlockchainV1::sendToAddress(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "sendtoaddress";
		String toAddress = parseV8Value(args[0]);
		Array<String> args2;

		args2.push_back(toAddress);

		String amount = parseV8Value(args[1]);
		args2.push_back(amount);

		if (args.Length() > 2)
		{
			String comment = parseV8Value(args[2]);
			args2.push_back(comment);
		}

		if (args.Length() > 3)
		{
			String commentTo = parseV8Value(args[3]);
			args2.push_back(commentTo);
		}

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		args.GetReturnValue().Set(output.result.toV8String(args.GetIsolate()));
	}

	void BlockchainV1::setTxFee(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "settxfee";
		String amount = parseV8Value(args[0]);
		Array<String> args2;

		args2.push_back(amount);

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		RJBOOL result = parseBoolean (output.result);
		args.GetReturnValue().Set(v8::Boolean::New (args.GetIsolate (), result));
	}

	void BlockchainV1::signMessage(const v8::FunctionCallbackInfo<v8::Value> &args)
	{
		String cmd = "signmessage";
		String address = parseV8Value(args[0]);
		String message = parseV8Value(args[1]);
		Array<String> args2;

		args2.push_back(address);
		args2.push_back(message);

		XRJV1CLIResult output = getXRJV1CLIResult(cmd, args2);

		if (output.exceptionThrown == true)
			return;

		args.GetReturnValue().Set(output.result.toV8String (args.GetIsolate ()));
	}

	void BlockchainV1::startBlockchain()
	{
		BlockchainV1Thread *thread = RJNEW BlockchainV1Thread();
		V8_JAVASCRIPT_ENGINE->addThread(thread);
	}

	XRJV1CLIResult getXRJV1CLIResult(String command)
	{
		Array<String> args;

		return (getXRJV1CLIResult(command, args, true));
	}

	XRJV1CLIResult getXRJV1CLIResult(String command, Array<String> args, RJBOOL throwError)
	{
		int argc = 0;
		char **argv = NULL;

		if (command != "rpcCommand")
		{
			argc = 2 + args.size();
			argv = new char *[argc];

			argv[0] = "";
			argv[1] = (char *)command.c_str();

			for (RJINT iIdx = 2; iIdx < argc; iIdx++)
				argv[iIdx] = (char *)args.at(iIdx - 2).c_str();
		}
		else
		{
			argc = 1 + args.size();
			argv = new char *[argc];

			argv[0] = "";

			for (RJINT iIdx = 1; iIdx < argc; iIdx++)
				argv[iIdx] = (char *)args.at(iIdx - 1).c_str();
		}

		XRJV1CLIResult output = startXRJV1CLI(argc, argv, throwError);

		DELETEARRAY(argv);

		if (output.exceptionThrown == true)
		{
			if (output.result.find("passphrase") != String::npos)
			{
				if (BlockchainV1::passphraseRequiredFunction != NULL)
					V8_JAVASCRIPT_ENGINE->blockchainEvent("passphraseRequired");
			}

			if (output.exceptionThrown == true)
			{
				if (output.result != "")
				{
					if (RadJAV::RadJav::javascriptEngine != NULL)
						RadJAV::RadJav::javascriptEngine->throwException(output.result);
				}
			}
		}

		return (output);
	}

	#ifdef GUI_USE_WXWIDGETS
	BlockchainV1Thread::BlockchainV1Thread()
		: Thread()
	{
	}

	wxThread::ExitCode BlockchainV1Thread::Entry()
	{
		try
		{
			Array<String> args;
			XRJV1CLIResult result = getXRJV1CLIResult("getinfo", args, false);

			if (result.exceptionThrown == false)
			{
				v8::Local<v8::Value> *v8args = RJNEW v8::Local<v8::Value>[1];
				v8args[0] = String ("XRJV1 node is already running. Shut down the node before continuing.").toV8String(V8_JAVASCRIPT_ENGINE->isolate);

				V8_JAVASCRIPT_ENGINE->blockchainEvent("error", 1, v8args);

				return (0);
			}

			SetupEnvironment();
			noui_connect();
			AppInit(BlockchainV1::connectArgsc, BlockchainV1::connectArgsv);
		}
		catch (std::exception ex)
		{
			if (BlockchainV1::onErrorFunction != NULL)
			{
				String exstr = ex.what();
				v8::Local<v8::Value> *v8args = RJNEW v8::Local<v8::Value>[1];
				v8args[0] = exstr.toV8String(V8_JAVASCRIPT_ENGINE->isolate);

				V8_JAVASCRIPT_ENGINE->blockchainEvent("error", 1, v8args);
			}
		}

		return (0);
	}
	#endif
	#endif
}
#endif

