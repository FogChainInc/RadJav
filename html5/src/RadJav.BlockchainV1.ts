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

namespace RadJav
{
	/** @class RadJav.BlockchainV1
	* The BlockchainV1 class. This is basically a wrapper for the BlockchainV1 cli. For a more 
	* detailed reference, please visit: https://bitcoin.org/en/developer-reference. This 
	* documentation will be improved upon later.
	* Available on platforms: Windows,Linux,OSX
	*/
	class BlockchainV1 {

		/** @method connectToNetwork
		* @static
		* Connect to the RadJav Blockchain V1 (XRJV1) network.
		* Available on platforms: Windows,Linux,OSX
		*/
		connectToNetwork() {
		}

		/** @method on
		* @static
		* When an event occurs, execute a function.
		* Available on platforms: Windows,Linux,OSX
		* @param {String} eventName The event associated with the event.
		* Possible events are:
		* * ready
		* * error
		* @param {Function} eventFunction The function to execute.
		*/
		on(eventName: string, eventFunction: Function){
		}

		/** @method getBestBlockHash
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getBestBlockHash() {
		}

		/** @method getBlock
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getBlock(){
		}

		/** @method getBlockchainInfo
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getBlockchainInfo(){
		}

		/** @method getBlockCount
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getBlockCount(){
		}

		/** @method getBlockHash
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getBlockHash() {
		}

		/** @method getBlockHeader
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getBlockHeader() {
		}

		/** @method getChainTips
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getChainTips() {
		}

		/** @method getDifficulty
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getDifficulty() {
		}

		/** @method getMempoolAncestors
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getMempoolAncestors() {
		}

		/** @method getMempoolDescendants
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getMempoolDescendants() {
		}

		/** @method getMempoolEntry
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getMempoolEntry() {
		}

		/** @method getMempoolInfo
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getMempoolInfo() {
		}

		/** @method getRawMempool
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getRawMempool() {
		}

		/** @method getTxout
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getTxout() {
		}

		/** @method getTxoutProof
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getTxoutProof() {
		}

		/** @method getTxoutSetInfo
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getTxoutSetInfo() {
		}

		/** @method preciousBlock
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		preciousBlock() {
		}

		/** @method pruneBlockchain
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		pruneBlockchain() {
		}

		/** @method verifyChain
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		verifyChain() {
		}

		/** @method verifyTxoutProof
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		verifyTxoutProof() {
		}

		/** @method getInfo
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getInfo() {
		}

		/** @method getMemoryInfo
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getMemoryInfo() {
		}

		/** @method stop
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		stop() {
		}

		/** @method generate
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		generate() {
		}

		/** @method generateToAddress
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		generateToAddress(){
		}

		/** @method getBlockTemplate
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getBlockTemplate(){
		}

		/** @method getMiningInfo
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getMiningInfo(){
		}

		/** @method getNetworkHashPS
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getNetworkHashPS(){
		}

		/** @method prioritiseTransaction
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		prioritiseTransaction(){
		}

		/** @method submitBlock
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		submitBlock(){
		}

		/** @method addNode
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		addNode(){
		}

		/** @method clearBanned
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		clearBanned(){
		}

		/** @method disconnectNode
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		disconnectNode(){
		}

		/** @method getAddedNodeInfo
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getAddedNodeInfo(){
		}

		/** @method getConnectionCount
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getConnectionCount(){
		}

		/** @method getNetTotals
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getNetTotals(){
		}

		/** @method getNetworkInfo
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getNetworkInfo(){
		}

		/** @method getPeerInfo
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getPeerInfo() {

		}

		/** @method listBanned
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		listBanned() {

		}

		/** @method setBan
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		setBan() {

		}

		/** @method setNetworkActive
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		setNetworkActive() {

		}

		/** @method createRawTransaction
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		createRawTransaction() {

		}

		/** @method decodeRawTransaction
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		decodeRawTransaction() {

		}

		/** @method decodeScript
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		decodeScript() {

		}

		/** @method fundRawTransaction
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		fundRawTransaction() {

		}

		/** @method getRawTransaction
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getRawTransaction() {

		}

		/** @method sendRawTransaction
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		sendRawTransaction() {

		}

		/** @method signRawTransaction
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		signRawTransaction() {

		}

		/** @method createMultiSig
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		createMultiSig() {

		}

		/** @method estimateFee
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		estimateFee() {

		}

		/** @method signMessageWithPrivKey
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		signMessageWithPrivKey() {

		}

		/** @method validateAddress
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		validateAddress() {

		}

		/** @method verifyMessage
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		verifyMessage() {

		}

		/** @method abandonTransaction
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		abandonTransaction() {

		}

		/** @method abortRescan
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		abortRescan() {

		}

		/** @method addMultiSigAddress
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		addMultiSigAddress() {

		}

		/** @method addWitnessAddress
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		addWitnessAddress() {

		}

		/** @method backupWallet
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		backupWallet() {

		}

		/** @method bumpFee
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		bumpFee() {

		}

		/** @method dumpPrivKey
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		dumpPrivKey() {

		}

		/** @method dumpWallet
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		dumpWallet() {

		}

		/** @method encryptWallet
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		encryptWallet() {

		}

		/** @method getAccount
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getAccount() {

		}

		/** @method getBalance
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getBalance() {

		}

		/** @method getNewAddress
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getNewAddress() {

		}

		/** @method getRawChangeAddress
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getRawChangeAddress() {

		}

		/** @method getReceivedByAddress
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getReceivedByAddress() {

		}

		/** @method getTransaction
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getTransaction() {

		}

		/** @method getUnconfirmedBalance
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getUnconfirmedBalance() {

		}

		/** @method getWalletInfo
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		getWalletInfo() {

		}

		/** @method importAddress
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		importAddress() {

		}

		/** @method importMulti
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		importMulti() {

		}

		/** @method importPrivKey
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		importPrivKey() {

		}

		/** @method importPrunedFunds
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		importPrunedFunds() {

		}

		/** @method importPubKey
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		importPubKey() {

		}

		/** @method importWallet
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		importWallet() {

		}

		/** @method keypoolRefill
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		keypoolRefill() {

		}

		/** @method listAddressGroupings
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		listAddressGroupings() {

		}

		/** @method listLockUnspent
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		listLockUnspent() {

		}

		/** @method listReceivedByAddress
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		listReceivedByAddress() {

		}

		/** @method listSinceBlock
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		listSinceBlock() {

		}

		/** @method listTransactions
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		listTransactions() {

		}

		/** @method listUnspent
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		listUnspent() {

		}

		/** @method lockUnspent
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		lockUnspent() {

		}

		/** @method removePrunedFunds
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		removePrunedFunds() {

		}

		/** @method sendMany
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		sendMany() {

		}

		/** @method sendToAddress
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		sendToAddress() {

		}

		/** @method setTxFee
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		setTxFee() {

		}

		/** @method signMessage
		* @static
		* Available on platforms: Windows,Linux,OSX
		*/
		signMessage() {

		}
	}
}
