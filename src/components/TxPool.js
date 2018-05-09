require('./TxPool.css')
const React = require('react');
const TransactionsDisplay = require('./TransactionsDisplay');
const { Card, Message, Icon } = require('semantic-ui-react');

class TxPool extends React.Component {
  getHint() {
    return (
      <Message icon className="tx-pool-message">
        <Icon name='info circle' size='large' className="tx-pool-message-icon" />
        <Message.Content>
          <Message.Header>There are no transactions.</Message.Header>
          Use transaction form to create some.
        </Message.Content>
      </Message>
    );
  }

  render() {
    return (
      <Card className="tx-pool" fluid >
        <Card.Content
          header="Uncomfirmed Transactions"
          style={{ flexGrow: 0 }}
        />
        <Card.Content style={{ overflow: 'auto' }}>
          {
            this.props.txPool.transactions.length === 0
              ? this.getHint()
              : <TransactionsDisplay
                  transactions={this.props.txPool.transactions}
                  mobileLayout={this.props.mobileLayout}
                />
          }
        </Card.Content>
      </Card>
    );
  }
}

module.exports = TxPool;
