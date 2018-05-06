const React = require('react');
const BlockDisplay = require('./BlockDisplay');

class BlockChainDisplay extends React.Component {

  getBlocks() {
    const blocks = [];
    for (let i = this.props.chain.length - 1; i >= 0; i--) {
      const block = this.props.chain[i];
      blocks.push(
        <BlockDisplay
          key={block.hash}
          block={block}
          height={i}
        />
      );
    }
    return blocks;
  }

  render() {
    return (
      <div className="blockchain">
        {this.getBlocks()}
      </div>
    );
  }
}

module.exports = BlockChainDisplay;
