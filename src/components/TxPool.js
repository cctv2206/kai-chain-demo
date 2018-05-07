const React = require('react');
const TransactionsDisplay = require('./TransactionsDisplay');
const { Card } = require('semantic-ui-react');

class TxPool extends React.Component {
  render() {
    const style = {
      height: '310px'
    };
    return (
      <Card className="tx-pool" fluid style={style}>
        <Card.Content
          header="Uncomfirmed Transactions"
          style={{ flexGrow: 0 }}
        />
        <Card.Content style={{ overflow: 'auto' }}>
          <TransactionsDisplay transactions={this.props.txPool.transactions} />
        </Card.Content>
      </Card>
    );
  }
}

module.exports = TxPool;
