const Block = require('./block');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addNewBlock(newBlock) {
    const newChain = this.chain.slice();
    newChain.push(newBlock);
    return this.replaceChain(newChain);
  }

  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];

      if (
        block.lastHash !== lastBlock.hash ||
        block.hash !== Block.blockHash(block)
      ) {
        return false;
      }

      return true;
    }
  }

  replaceChain(newChain) {
    if (newChain.length <= this.chain.length) {
      return false;
    }
    else if (!this.isValidChain(newChain)) {
      return false;
    }

    this.chain = newChain;
    return true;
  }
}

module.exports = Blockchain;
