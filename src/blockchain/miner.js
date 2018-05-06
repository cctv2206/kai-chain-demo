
/**
 * Miner - a miner object contains blockchain, transaction pool and a wallet.
 *
 * @returns {Object} miner
 */
const Miner = (blockchain, txPool, wallet) => {
  return { blockchain, txPool, wallet };
}

module.exports = Miner;
