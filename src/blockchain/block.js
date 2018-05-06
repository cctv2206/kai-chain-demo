const ChainUtil = require('./chain-util');
const { DIFFICULTY, MINE_RATE } = require('./config');

/**
 * Block class.
 */
class Block {
  constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty || DIFFICULTY;
  }

  toString() {
    return `Block
      Timestamp : ${this.timestamp}
      Last Hash : ${this.lastHash.substring(0, 10)}
      Hash      : ${this.hash.substring(0, 10)}
      Nonce     : ${this.nonce}
      Difficulty: ${this.difficulty}
      Data      : ${this.data}
    `;
  }

  static genesis() {
    return new this(
      '2009-01-03 18:15:05',
      '0000000000000000000000000000000000000000000000000000000000000000',
      '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f',
      [],
      2083236893,
      DIFFICULTY
    );
  }

  // static mineBlock(lastBlock, data) {
  //   let hash, timestamp;
  //   const lastHash = lastBlock.hash;
  //   let nonce = 0;
  //   let { difficulty } = lastBlock;
  //
  //   do {
  //     nonce++;
  //     timestamp = Date.now();
  //     // todo: no need to call this every loop. every 100 loop?
  //     // if (nonce % 10000 === 0) {
  //     //   difficulty = Block.adjustDifficulty(lastBlock, timestamp);
  //     // }
  //     hash = this.hash(timestamp, lastHash, data, nonce, difficulty);
  //   } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));
  //
  //   return new this(timestamp, lastHash, hash, data, nonce, difficulty);
  // }

  static hash(timestamp, lastHash, data, nonce, difficulty) {
    return ChainUtil.hash(
      `${timestamp}${lastHash}${data}${nonce}${difficulty}`
    );
  }

  static blockHash(block) {
    const { timestamp, lastHash, data, nonce, difficulty } = block;
    return this.hash(timestamp, lastHash, data, nonce, difficulty);
  }

  static adjustDifficulty(lastBlock, currentTime) {
    let { difficulty } = lastBlock;
    difficulty =
      lastBlock.timestamp + MINE_RATE > currentTime
        ? difficulty + 1
        : difficulty - 1;
    return difficulty;
  }
}

module.exports = Block;
