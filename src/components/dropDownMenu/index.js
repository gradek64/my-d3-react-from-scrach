import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
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
    if(this.props.onMouseEnter) this.setState({ showDropDownMenu: true });
  };

  hideDropDown = () => {
    if(this.props.onMouseEnter) this.setState({ showDropDownMenu: false });
  };

  toggleMenuOpen = (showDropDownMenuState) => {
    console.log('is toggeling ....!');
    this.setState({ showDropDownMenu: !showDropDownMenuState });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { children} = this.props;
    const { showDropDownMenu } = this.state;

    return (
        
      <div  onMouseEnter={this.showDropDown}
        onMouseLeave={this.hideDropDown}>
        <ClickAwayListener onClickAway={ ()=>{this.toggleMenuOpen(true);} }>
          <div>
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
        </ClickAwayListener>
      </div>
       
    );
  }
}

DropDownMenu.defaultProps = {
  onMouseEnter: true,
};

export default DropDownMenu;
