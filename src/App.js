require('./App.css');
const React = require('react');
const { Container, Grid, Divider } = require('semantic-ui-react');
const MinerList = require('./components/MinerList');
const TxPool = require('./components/TxPool');
const BlockChainDisplay = require('./components/BlockChainDisplay');
const TransactionForm = require('./components/TransactionForm');
const BlockChain = require('./blockchain/blockchain');
const TransactionPool = require('./blockchain/transaction-pool');
const Wallet = require('./blockchain/wallet');
const Miner = require('./blockchain/miner');

/**
 * Top level component.
 *
 * @author Kai Kang 05/05/2018
 */
class App extends React.Component {
  constructor(props) {
    super(props);

    this.blockchain = new BlockChain();
    const txPool = new TransactionPool();
    const miners = [
      Miner(new BlockChain(), txPool, new Wallet()),
      Miner(new BlockChain(), txPool, new Wallet()),
      Miner(new BlockChain(), txPool, new Wallet())
    ];

    this.state = {
      chain: this.blockchain.chain,
      miners: miners,
      txPool: txPool
    };
  }

  /**
   * newBlock - Callback function. Invoked when one of the miners just mined
   *            a new block. It potentially updates the blockchain for all miners.
   *
   * @param {Object} newBlock - newly mined block
   */
  newBlock = newBlock => {
    // update the blockchain if the new block is valid.
    if (this.blockchain.addNewBlock(newBlock)) {
      const miners = this.state.miners.map(miner => {
        miner.blockchain.replaceChain(this.blockchain.chain.slice());
        miner.txPool.clear();
        return miner;
      });
      this.setState({
        miners: miners,
        chain: this.blockchain.chain
      });
    }
  };

  /**
   * newTx - Callback function. Invoked when users submit a new transaction
   *         through the transaction form.
   *
   * @param {Object} sender - sender wallet
   * @param {Object} recipient - recipient wallet
   * @param {number} amount - transaction amount
   */
  newTx = (sender, recipient, amount) => {
    sender.createTransaction(
      recipient.publicKey,
      amount,
      this.blockchain,
      this.state.txPool
    );
    this.setState({ txPool: this.state.txPool });
  };

  render() {
    return (
      <div className="App">
        <link rel="stylesheet" type="text/css" href="css/App.css" />
        <Container className="top-container">
          <MinerList miners={this.state.miners} newBlock={this.newBlock} />
          <Divider />
          <Grid>
            <Grid.Column width={6}>
              <Grid.Row>
                <TransactionForm
                  miners={this.state.miners}
                  newTx={this.newTx}
                />
              </Grid.Row>
              <Grid.Row>
                <TxPool txPool={this.state.txPool} />
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={10}>
              <BlockChainDisplay chain={this.state.chain} />
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
