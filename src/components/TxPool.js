require('./TxPool.css')
const React = require('react');
const TransactionsDisplay = require('./TransactionsDisplay');
const { Card } = require('semantic-ui-react');

class TxPool extends React.Component {
  render() {
    return (
      <Card className="tx-pool" fluid >
        <Card.Content
          header="Uncomfirmed Transactions"
          style={{ flexGrow: 0 }}
        />
        <Card.Content style={{ overflow: 'auto' }}>
          <TransactionsDisplay
            transactions={this.props.txPool.transactions}
            mobileLayout={this.props.mobileLayout}
          />
        </Card.Content>
      </Card>
    );
  }
}

module.exports = TxPool;
