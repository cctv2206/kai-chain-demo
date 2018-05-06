const React = require('react');
const MinerDisplay = require('./MinerDisplay');
const { Grid } = require('semantic-ui-react');

class MinerList extends React.Component {
  getMiners = () => {
    return this.props.miners.map((miner, index) => {
      return (
        <Grid.Column key={miner.wallet.publicKey}>
          <MinerDisplay
            miner={miner}
            newBlock={this.props.newBlock}
            minerIndex={index}
          />
        </Grid.Column>
      );
    });
  }

  render() {
    return (
      <Grid className="miner-list" columns={this.props.miners.length}>
        <Grid.Row>
          {this.getMiners()}
        </Grid.Row>
      </Grid>
    );
  }
}

module.exports = MinerList;
