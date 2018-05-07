const React = require('react');
const {
  Card,
  Form,
  Button,
  Dropdown,
  Input,
  Label
} = require('semantic-ui-react');

/**
 * TransactionForm is used for creating transactions.
 */
class TransactionForm extends React.Component {
  state = {
    senderWallet: null,
    recipientWallet: null,
    amount: ''
  };

  /**
   * Handler for submitting a new transaction to parent component.
   */
  handleSubmit = () => {
    const { senderWallet, recipientWallet, amount } = this.state;
    if (senderWallet && recipientWallet && amount && !isNaN(amount)) {
      this.props.newTx(senderWallet, recipientWallet, parseFloat(amount, 10));
    }
  };

  /**
   * getRandomInt - generates a random integer from [0, max)
   *
   * @param   {number} max - exclusive upper bound.
   * @returns {number}       random integer
   */
  getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  /**
   * createRandomTx - generates a random valid transaction.
   *
   * @returns {Object} transaction
   */
  createRandomTx = () => {
    const length = this.props.miners.length;
    const senderIndex = this.getRandomInt(length);
    const recipientIndex =
      (senderIndex + this.getRandomInt(length - 1)) % length;
    const sender = this.props.miners[senderIndex];
    const recipient = this.props.miners[recipientIndex];
    const senderBalance = sender.wallet.calculateBalance(sender.blockchain);
    const amount = Math.round(
      (10 + this.getRandomInt(10)) / 100 * senderBalance
    );
    this.props.newTx(sender.wallet, recipient.wallet, amount);
  };

  /**
   * getAmountField - renders a input field for entering an transaction amount.
   *
   * @returns {element} input field.
   */
  getAmountField = () => {
    const errorLabelStyle = {
      position: 'absolute',
      left: '30%',
      top: '-10px',
      visibility: isNaN(this.state.amount) ? 'visible' : 'hidden'
    };

    return (
      <Form.Field style={{ position: 'relative' }}>
        <label>Amount</label>
        <Label style={errorLabelStyle} basic color="red" pointing="below">
          Amount must be a number
        </Label>
        <Input
          placeholder="Amount"
          fluid
          label={{ basic: true, content: 'KAI' }}
          labelPosition="right"
          value={this.state.amount}
          onChange={e => this.setState({ amount: e.target.value })}
        />
      </Form.Field>
    );
  };

  /**
   * getMinerDropdownField - renders a form dropdown field for selecting miners.
   *
   * @param  {bool}   isSender
   * @param  {Array}  minerOptions - all miner options
   * @return {element}               dropdown field
   */
  getMinerDropdownField(isSender, minerOptions) {
    const label = isSender ? 'sender' : 'recipient';
    const wallet = isSender
      ? this.state.senderWallet
      : this.state.recipientWallet;
    const exclusion = isSender
      ? this.state.recipientWallet
      : this.state.senderWallet;
    const dropDownValue = wallet ? wallet.publicKey : null;
    const dropDownOptions = minerOptions.filter(
      option => !exclusion || option.key !== exclusion.publicKey
    );
    const onChange = (e, { value, options }) => {
      const { wallet } = options.find(option => option.value === value);
      if (isSender) {
        this.setState({ senderWallet: wallet });
      } else {
        this.setState({ recipientWallet: wallet });
      }
    };
    return (
      <Form.Field>
        <label>{label}</label>
        <Dropdown
          placeholder={label}
          fluid
          selection
          options={dropDownOptions}
          value={dropDownValue}
          onChange={onChange}
        />
      </Form.Field>
    );
  }

  render() {
    const minerOptions = this.props.miners.map((miner, index) => {
      return {
        key: miner.wallet.publicKey,
        value: miner.wallet.publicKey,
        wallet: miner.wallet,
        text: `Miner${index + 1}`
      };
    });

    const style = {
      height: '310px'
    };

    return (
      <Card fluid className='transaction-form' style={style}>
        <Card.Content>
          <Card.Header>Transaction Form</Card.Header>
          <Form>
            {this.getMinerDropdownField(true, minerOptions)}
            {this.getMinerDropdownField(false, minerOptions)}
            {this.getAmountField()}
            <Button onClick={this.handleSubmit}>Create Transaction</Button>
            <Button onClick={this.createRandomTx}>Random Transaction</Button>
          </Form>
        </Card.Content>
      </Card>
    );
  }
}

module.exports = TransactionForm;
