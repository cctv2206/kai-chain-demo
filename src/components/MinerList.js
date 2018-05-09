require('./MinerList.css');
const React = require('react');
const MinerDisplay = require('./MinerDisplay');

class MinerList extends React.Component {
  getMiners = () => {
    return this.props.miners.map((miner, index) => {
      return (
        <MinerDisplay
          key={miner.wallet.publicKey}
          miner={miner}
          newBlock={this.props.newBlock}
          minerIndex={index}
        />
      );
    });
  }

  render() {
    return (
      <div className="miner-list">
        {this.getMiners()}
      </div>
    );
  }
}

module.exports = MinerList;
