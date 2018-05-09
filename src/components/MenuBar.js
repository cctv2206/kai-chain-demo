require('./MenuBar.css');
const React = require('react');
const { Menu, Icon } = require('semantic-ui-react');

const MenuBar = (props) => {
  return (
    <Menu className="menu-bar">
      <Menu.Item href='//github.com/cctv2206/kai-chain-demo' target='_blank' >
        <Icon size='large' name='github' />
        Kai
      </Menu.Item>
      <Menu.Menu position='right'>
          <Menu.Item name='setting'  onClick={this.handleItemClick}>
            <Icon size='large' name='setting' />
            Setting
          </Menu.Item>
        </Menu.Menu>
    </Menu>
  );
}

module.exports = MenuBar;
