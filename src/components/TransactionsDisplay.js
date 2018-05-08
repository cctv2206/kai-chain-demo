require('./TransactionsDisplay.css');
const React = require('react');
const { Grid, Segment, Label, Icon, List } = require('semantic-ui-react');
const bcWallet = require('../blockchain/BlockchainWallet');

const TransactionsDisplay = props => {
  const transactions = props.transactions;
  const mobileLayout = props.mobileLayout;

  const txRowsMobile = transactions.map((tx, index) => {
    const { input, outputs, id } = tx;
    const outputListItems = outputs.map((output, index) => {
      return (
        <List.Item key={`{tx-${index}-${id}-${output.address}}`} className="tx-output-item">
          <div className="address">{output.address}</div>
          <Label content={`${output.amount} KAI`} className="output-label" />
        </List.Item>
      );
    });

    const outputList = (
      <Segment className="output">
        <List divided className="mobile-tx-output-list">
          {outputListItems}
        </List>
      </Segment>
    );

    return (
      <Grid.Row key={id}>
        <Segment className="input">
          <div className="address">
            {input.address === bcWallet.publicKey
              ? 'No Inputs (Newly Generated Coins)'
              : input.address}
          </div>
        </Segment>
        <Icon
          className="tx-arrow"
          name="arrow down"
          size="large"
          color="teal"
        />
        {outputList}
      </Grid.Row>
    );
  });

  const txRows = transactions.map((tx, index) => {
    const { input, outputs, id } = tx;
    const outputSegments = outputs.map((output, index) => {
      return (
        <Segment
          key={`{tx-${index}-${id}-${output.address}}`}
          className="output"
        >
          <div className="address">{output.address}</div>
          <Label content={`${output.amount} KAI`} className="output-label" />
        </Segment>
      );
    });

    return (
      <Grid.Row key={id}>
        <Grid.Column className="input-column">
          <Segment className="input">
            <div className="address">
              {input.address === bcWallet.publicKey
                ? 'No Inputs (Newly Generated Coins)'
                : input.address}
            </div>
          </Segment>
        </Grid.Column>
        <Grid.Column width={1} className="arrow-column">
          <Icon
            name="arrow right"
            size="large"
            color="teal"
            className="tx-arrow"
          />
        </Grid.Column>
        <Grid.Column className="output-column">{outputSegments}</Grid.Column>
      </Grid.Row>
    );
  });

  return (
    <Grid columns="equal" divided="vertically" className="tx-display mobile">
      {mobileLayout ? txRowsMobile : txRows}
    </Grid>
  );
};

module.exports = TransactionsDisplay;
