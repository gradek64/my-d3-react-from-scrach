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
  };

  toggleMenuOpen = (showDropDownMenuState) => {
    this.setState({ showDropDownMenu: !showDropDownMenuState });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { children } = this.props;
    const { showDropDownMenu } = this.state;

    return (
      <div  onMouseEnter={this.showDropDown}
        onMouseLeave={this.hideDropDown}>
        {React.Children.map(children, (child, i) => {

          /* first child is alway a trigger for mobile Click*/
          if (i == 0)return <div onClick={()=>{this.toggleMenuOpen(showDropDownMenu);}}> {child}</div>;
          
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
      </div>
    );
  }
}

export default DropDownMenu;
