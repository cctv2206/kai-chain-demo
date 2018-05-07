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
    const style = {
      overflow: 'auto',
      whiteSpace: 'nowrap'
    };
    return (
      <div className="miner-list" style={style}>
        {this.getMiners()}
      </div>
    );
  }
}

module.exports = MinerList;
