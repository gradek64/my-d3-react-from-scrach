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
  anchorEl = React.createRef();

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

  handleClose = (event) => {
    /*
      *@ClickAwayListener Class is Material UI overlay that listenes for any click on the entire page
      *@once any element is clicked it assigns to event.target === elementClicked
      *@now if our element clicked is our react refference element this.anchorEl.current === event.target
      *@which is the same as 'contaoins' then funcioned is returned in if statament so doenst go any further
      *@by if statement if(this.anchorEl.current.contains(event.target)) checking what element is clicked
    */
    if (this.anchorEl.current.contains(event.target)) {
      return;
    }
    this.setState({ showDropDownMenu:false });
  };

  render() {
    const { children} = this.props;
    const { showDropDownMenu } = this.state;

    return (
        
      <div 
        ref={this.anchorEl}
        onMouseEnter={this.showDropDown}
        onMouseLeave={this.hideDropDown}>
        {/*show ClickAwayListener only when manu is open*/}
        {showDropDownMenu?
          <ClickAwayListener onClickAway={ this.handleClose }>
            <div></div>
          </ClickAwayListener>:null
        }
        {/*show ClickAwayListener only when manu is open*/}
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
        
      </div>
       
    );
  }
}

DropDownMenu.defaultProps = {
  onMouseEnter: true,
};

export default DropDownMenu;
