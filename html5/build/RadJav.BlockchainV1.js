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
var RadJav;
(function (RadJav) {
    /** @class RadJav.BlockchainV1
    * The BlockchainV1 class. This is basically a wrapper for the BlockchainV1 cli. For a more
    * detailed reference, please visit: https://bitcoin.org/en/developer-reference. This
    * documentation will be improved upon later.
    * Available on platforms: Windows,Linux,OSX
    */
    var BlockchainV1 = /** @class */ (function () {
        function BlockchainV1() {
        }
        /** @method connectToNetwork
        * @static
        * Connect to the RadJav Blockchain V1 (XRJV1) network.
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.connectToNetwork = function () {
        };
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
        BlockchainV1.prototype.on = function (eventName, eventFunction) {
        };
        /** @method getBestBlockHash
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getBestBlockHash = function () {
        };
        /** @method getBlock
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getBlock = function () {
        };
        /** @method getBlockchainInfo
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getBlockchainInfo = function () {
        };
        /** @method getBlockCount
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getBlockCount = function () {
        };
        /** @method getBlockHash
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getBlockHash = function () {
        };
        /** @method getBlockHeader
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getBlockHeader = function () {
        };
        /** @method getChainTips
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getChainTips = function () {
        };
        /** @method getDifficulty
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getDifficulty = function () {
        };
        /** @method getMempoolAncestors
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getMempoolAncestors = function () {
        };
        /** @method getMempoolDescendants
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getMempoolDescendants = function () {
        };
        /** @method getMempoolEntry
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getMempoolEntry = function () {
        };
        /** @method getMempoolInfo
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getMempoolInfo = function () {
        };
        /** @method getRawMempool
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getRawMempool = function () {
        };
        /** @method getTxout
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getTxout = function () {
        };
        /** @method getTxoutProof
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getTxoutProof = function () {
        };
        /** @method getTxoutSetInfo
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getTxoutSetInfo = function () {
        };
        /** @method preciousBlock
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.preciousBlock = function () {
        };
        /** @method pruneBlockchain
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.pruneBlockchain = function () {
        };
        /** @method verifyChain
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.verifyChain = function () {
        };
        /** @method verifyTxoutProof
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.verifyTxoutProof = function () {
        };
        /** @method getInfo
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getInfo = function () {
        };
        /** @method getMemoryInfo
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getMemoryInfo = function () {
        };
        /** @method stop
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.stop = function () {
        };
        /** @method generate
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.generate = function () {
        };
        /** @method generateToAddress
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.generateToAddress = function () {
        };
        /** @method getBlockTemplate
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getBlockTemplate = function () {
        };
        /** @method getMiningInfo
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getMiningInfo = function () {
        };
        /** @method getNetworkHashPS
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getNetworkHashPS = function () {
        };
        /** @method prioritiseTransaction
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.prioritiseTransaction = function () {
        };
        /** @method submitBlock
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.submitBlock = function () {
        };
        /** @method addNode
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.addNode = function () {
        };
        /** @method clearBanned
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.clearBanned = function () {
        };
        /** @method disconnectNode
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.disconnectNode = function () {
        };
        /** @method getAddedNodeInfo
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getAddedNodeInfo = function () {
        };
        /** @method getConnectionCount
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getConnectionCount = function () {
        };
        /** @method getNetTotals
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getNetTotals = function () {
        };
        /** @method getNetworkInfo
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getNetworkInfo = function () {
        };
        /** @method getPeerInfo
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getPeerInfo = function () {
        };
        /** @method listBanned
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.listBanned = function () {
        };
        /** @method setBan
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.setBan = function () {
        };
        /** @method setNetworkActive
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.setNetworkActive = function () {
        };
        /** @method createRawTransaction
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.createRawTransaction = function () {
        };
        /** @method decodeRawTransaction
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.decodeRawTransaction = function () {
        };
        /** @method decodeScript
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.decodeScript = function () {
        };
        /** @method fundRawTransaction
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.fundRawTransaction = function () {
        };
        /** @method getRawTransaction
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getRawTransaction = function () {
        };
        /** @method sendRawTransaction
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.sendRawTransaction = function () {
        };
        /** @method signRawTransaction
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.signRawTransaction = function () {
        };
        /** @method createMultiSig
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.createMultiSig = function () {
        };
        /** @method estimateFee
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.estimateFee = function () {
        };
        /** @method signMessageWithPrivKey
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.signMessageWithPrivKey = function () {
        };
        /** @method validateAddress
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.validateAddress = function () {
        };
        /** @method verifyMessage
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.verifyMessage = function () {
        };
        /** @method abandonTransaction
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.abandonTransaction = function () {
        };
        /** @method abortRescan
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.abortRescan = function () {
        };
        /** @method addMultiSigAddress
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.addMultiSigAddress = function () {
        };
        /** @method addWitnessAddress
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.addWitnessAddress = function () {
        };
        /** @method backupWallet
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.backupWallet = function () {
        };
        /** @method bumpFee
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.bumpFee = function () {
        };
        /** @method dumpPrivKey
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.dumpPrivKey = function () {
        };
        /** @method dumpWallet
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.dumpWallet = function () {
        };
        /** @method encryptWallet
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.encryptWallet = function () {
        };
        /** @method getAccount
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getAccount = function () {
        };
        /** @method getBalance
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getBalance = function () {
        };
        /** @method getNewAddress
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getNewAddress = function () {
        };
        /** @method getRawChangeAddress
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getRawChangeAddress = function () {
        };
        /** @method getReceivedByAddress
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getReceivedByAddress = function () {
        };
        /** @method getTransaction
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getTransaction = function () {
        };
        /** @method getUnconfirmedBalance
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getUnconfirmedBalance = function () {
        };
        /** @method getWalletInfo
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.getWalletInfo = function () {
        };
        /** @method importAddress
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.importAddress = function () {
        };
        /** @method importMulti
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.importMulti = function () {
        };
        /** @method importPrivKey
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.importPrivKey = function () {
        };
        /** @method importPrunedFunds
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.importPrunedFunds = function () {
        };
        /** @method importPubKey
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.importPubKey = function () {
        };
        /** @method importWallet
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.importWallet = function () {
        };
        /** @method keypoolRefill
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.keypoolRefill = function () {
        };
        /** @method listAddressGroupings
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.listAddressGroupings = function () {
        };
        /** @method listLockUnspent
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.listLockUnspent = function () {
        };
        /** @method listReceivedByAddress
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.listReceivedByAddress = function () {
        };
        /** @method listSinceBlock
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.listSinceBlock = function () {
        };
        /** @method listTransactions
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.listTransactions = function () {
        };
        /** @method listUnspent
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.listUnspent = function () {
        };
        /** @method lockUnspent
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.lockUnspent = function () {
        };
        /** @method removePrunedFunds
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.removePrunedFunds = function () {
        };
        /** @method sendMany
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.sendMany = function () {
        };
        /** @method sendToAddress
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.sendToAddress = function () {
        };
        /** @method setTxFee
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.setTxFee = function () {
        };
        /** @method signMessage
        * @static
        * Available on platforms: Windows,Linux,OSX
        */
        BlockchainV1.prototype.signMessage = function () {
        };
        return BlockchainV1;
    }());
})(RadJav || (RadJav = {}));
