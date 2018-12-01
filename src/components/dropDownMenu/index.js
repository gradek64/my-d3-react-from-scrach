import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class DropDownMenu extends React.Component {
  state = {
    anchorEl: null,
    showDropDownMenu: false,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  showDropDown = () => {
    this.setState({ showDropDownMenu: true });
  };

  hideDropDown = () => {
    this.setState({ showDropDownMenu: false });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { children } = this.props;
    const { showDropDownMenu } = this.state;

    return (
      <div >
        {React.Children.map(children, (child, i) => {

          /* first child is alway a trigger */
          if (i == 0) return <div 
            onMouseEnter={this.showDropDown}
            onMouseLeave={this.hideDropDown}>
            {child}
          </div>;
          
          /* second child is DropDownMenu Content */
          if(i==1 && showDropDownMenu) {
            return <div style={{
              position:'absolute',
              color:'black',
            }}>
              {child}
            </div>;
          }
        })}
        {/*<Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </Menu>*/}
      </div>
    );
  }
}

export default DropDownMenu;
