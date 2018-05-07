const React = require('react');
const bcWallet = require('../blockchain/BlockchainWallet');
const Transaction = require('../blockchain/transaction');
const Block = require('../blockchain/block');
const { Card, Checkbox, Loader } = require('semantic-ui-react');

const MINE_DELAY = 100; // ms

class MinerDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.miner = this.props.miner;
    this.mineABit = this.mineABit.bind(this);
    this.state = {
      nonce: 0,
      mining: true
    };
  }

  componentDidMount() {
    if (this.state.mining) {
      this.mineTimeout =
        this.mineTimeout || window.setTimeout(this.mineABit, MINE_DELAY);
    }
  }

  componentDidUpdate() {
    if (this.state.mining) {
      this.mineTimeout =
        this.mineTimeout || window.setTimeout(this.mineABit, MINE_DELAY);
    }
  }

  componentWillUnmount() {
    if (this.mineTimeout) {
      window.clearTimeout(this.mineTimeout);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      nonce: 0
    };
  }

  mineABit() {
    // console.log(`miner ${this.props.minerIndex} mining`);
    const validTxs = this.miner.txPool.validTransactions();
    validTxs.unshift(
      Transaction.rewardTransaction(this.miner.wallet, bcWallet)
    );

    let newBlock;
    let hash = '';
    let timestamp = Date.now();
    let nonce = this.state.nonce;
    const lastBlock = this.miner.blockchain.chain[
      this.miner.blockchain.chain.length - 1
    ];
    const lastHash = lastBlock.hash;
    const difficulty = lastBlock.difficulty;

    // only mine for a while.
    for (let i = 0; i < 250; i++) {
      nonce++;
      timestamp = Date.now();
      hash = Block.hash(timestamp, lastHash, validTxs, nonce, difficulty);
      if (hash.substring(0, difficulty) === '0'.repeat(difficulty)) {
        newBlock = new Block(
          timestamp,
          lastHash,
          hash,
          validTxs,
          nonce,
          difficulty
        );
        break;
      }
    }

    if (newBlock) {
      this.props.newBlock(newBlock);
    } else {
      this.setState({
        nonce: nonce
      });
    }
  }

  render() {
    if (this.mineTimeout) {
      window.clearTimeout(this.mineTimeout);
      this.mineTimeout = null;
    }

    const balance = this.props.miner.wallet.calculateBalance(
      this.props.miner.blockchain
    );

    const style = {
      display: 'inline-block',
      maxWidth: '200px',
      minWidth: '125px',
      margin: '5px',
      width: '30%'
    };

    return (
      <Card className="miner" style={style}>
        <Card.Content>
          <Card.Header>{`Miner${this.props.minerIndex + 1}`}</Card.Header>
          <Card.Meta>{`Balance: ${balance}`}</Card.Meta>
          <Card.Description>
            {`${this.miner.wallet.publicKey.substring(0, 10)}...`}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <Checkbox
            style={{ verticalAlign: 'center' }}
            toggle
            checked={this.state.mining}
            onChange={() => this.setState({ mining: !this.state.mining })}
          />
          <Loader
            style={{ float: 'right' }}
            active={this.state.mining}
            inline
            size="small"
          />
        </Card.Content>
      </Card>
    );
  }
}

module.exports = MinerDisplay;
