const React = require('react');
const { Grid, Segment, Label, Icon } = require('semantic-ui-react');
const bcWallet = require('../blockchain/BlockchainWallet');

const TransactionsDisplay = props => {
  const transactions = props.transactions;

  const txAddressStyle = {
    paddingTop: '7px',
    paddingBottom: '7px',
    display: 'flex'
  };
  const labelStyle = {
    fontSize: '0.7em',
    paddingTop: '4px',
    paddingBottom: '4px',
    float: 'right'
  };
  const addressTextStyle = {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: 1
  };

  const txRows = transactions.map((tx, index) => {
    const { input, outputs, id } = tx;
    const outputSegments = outputs.map((output, index) => {
      return (
        <Segment
          key={`{tx-${index}-${id}-${output.address}}`}
          style={txAddressStyle}
        >
          <div style={addressTextStyle}>{output.address}</div>
          <Label content={`${output.amount} KAI`} style={labelStyle} />
        </Segment>
      );
    });

    const arrowStyle = {
      paddingLeft: 0,
      paddingRight: 0,
      display: 'flex',
      alignItems: 'center'
    };

    const iconStyle = {
      margin: 'auto'
    };

    return (
      <Grid.Row key={id}>
        <Grid.Column>
          <Segment style={txAddressStyle}>
            <div style={addressTextStyle}>
              {input.address === bcWallet.publicKey
                ? 'No Inputs (Newly Generated Coins)'
                : input.address}
            </div>
          </Segment>
        </Grid.Column>
        <Grid.Column width={1} style={arrowStyle}>
          <Icon
            name="arrow right"
            size="large"
            color="teal"
            style={iconStyle}
          />
        </Grid.Column>
        <Grid.Column>{outputSegments}</Grid.Column>
      </Grid.Row>
    );
  });

  return (
    <Grid columns="equal" divided="vertically">
      {txRows}
    </Grid>
  );
};

module.exports = TransactionsDisplay;
