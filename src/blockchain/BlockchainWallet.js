const Wallet = require('./wallet');

const bcWallet = new Wallet();
Object.freeze(bcWallet);

module.exports = bcWallet;
