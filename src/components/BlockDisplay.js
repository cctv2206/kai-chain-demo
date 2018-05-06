const React = require('react');
const { Card, Table, Divider } = require('semantic-ui-react');
const TransactionsDisplay = require('./TransactionsDisplay');

class BlockDisplay extends React.Component {
  render() {
    const { timestamp, lastHash, hash } = this.props.block;
    const time = new Date(timestamp);

    const hashStyle = {
      maxWidth: '175px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    };
    return (
      <Card className="block" fluid>
        <Card.Content>
          <Table basic="very" colums={4} style={{ marginBottom: 0 }}>
            <Table.Body>
              <Table.Row>
                <Table.Cell><b>Hash</b></Table.Cell>
                <Table.Cell style={hashStyle}>{hash}</Table.Cell>
                <Table.Cell><b>Last Hash</b></Table.Cell>
                <Table.Cell style={hashStyle}>{lastHash}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><b>Block Height</b></Table.Cell>
                <Table.Cell>{this.props.height}</Table.Cell>
                <Table.Cell><b>Time</b></Table.Cell>
                <Table.Cell>
                  {`mined ${time.toLocaleTimeString()} ${time.toDateString()}`}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          {
            this.props.block.data.length === 0
              ? ''
              : <div>
                  <Divider style={{ marginTop: 0 }} />
                  <TransactionsDisplay transactions={this.props.block.data} />
                </div>
          }
        </Card.Content>
      </Card>
    );
  }
}

module.exports = BlockDisplay;
