import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';


class RenderPropsMenu extends React.Component {

  state = {showDropDownMenu:false}
  anchorEl = React.createRef();

  toggleMenuOpen = (showDropDownMenuState) => {
    this.setState({ showDropDownMenu: !showDropDownMenuState });


    //const el = ReactDOM.findDOMNoconsole.log(this.props);
  }
  hideDropDown = (icon) => {
    this.setState({ showDropDownMenu: false });
    this.anchorEl.current.querySelector('span').innerHTML=icon;
  };

  render(){

    const {showDropDownMenu} = this.state;

    return (
      <div>
        {/*dropdown trigger from outside=*/}
        <div onClick={()=>{this.toggleMenuOpen(showDropDownMenu);}} ref={this.anchorEl}>
          {this.props.children } 
        </div>
        <Menu id="render-props-menu"  open={showDropDownMenu} >
          <MenuItem onClick={()=>{this.hideDropDown('alarm_off');}}>
            <Icon>expand_more</Icon>
            <Typography variant="inherit">A short message</Typography>
          </MenuItem>
          <MenuItem onClick={()=>{this.hideDropDown('alarm_add');}}>Logout</MenuItem>
          <MenuItem onClick={()=>{this.hideDropDown('all_out');}}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default RenderPropsMenu;
