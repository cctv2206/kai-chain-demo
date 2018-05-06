const React = require('react');
const TransactionsDisplay = require('./TransactionsDisplay');
const { Card } = require('semantic-ui-react');

class TxPool extends React.Component {
  render() {
    const style = {
      marginTop: '14px'
    }
    return (
      <Card className="tx-pool" fluid style={style}>
        <Card.Content header='Uncomfirmed Transactions' />
        <Card.Content>
          <TransactionsDisplay transactions={this.props.txPool.transactions}/>
        </Card.Content>
      </Card>
    );
  }
}

module.exports = TxPool;
