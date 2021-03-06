const Wallet = require('../wallet');
const Transaction = require('../wallet/transaction');

class Miner {
    constructor(blockchain, transactionPool, wallet, p2pServer) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;
    }

    mine() {
        const validTransaction = this.transactionPool.validTransactions();
        validTransaction.push(
            Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet())
        );
        const block = this.blockchain.addBlock(validTransaction);
        this.p2pServer.syncChains();
        this.transactionPool.clear();
        this.p2pServer.broadcastClearTransaction();

        return block;
    }
}

module.exports = Miner;