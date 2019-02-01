import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

import './dropDownSelectIconList.scss';


class DropDownSelectIconList extends React.Component {

  state = {showDropDownMenu:false}
  anchorEl = React.createRef();

  hideDropDown = (showDropDownMenuState) => {
    this.setState({ showDropDownMenu: !showDropDownMenuState });


    //const el = ReactDOM.findDOMNoconsole.log(this.props);
  }
  hideDropDown = (icon) => {
    this.setState({ showDropDownMenu: false });
    //change first icon to selected;
    const firstIcon = this.anchorEl.current.querySelector('span');
    if(firstIcon) firstIcon.innerHTML=icon;
  };

  performAction = (value) =>{
    console.log(value);
    this.hideDropDown(value);
  }

  render(){

    const {showDropDownMenu} = this.state;
    const { items } = this.props;

    return (
      <div className='typeToggle'>
        {/*dropdown trigger from outside=*/}
        <div onClick={()=>{ this.setState({ showDropDownMenu: true });} } ref={this.anchorEl}>
          {this.props.children } 
        </div>
        <Menu open={showDropDownMenu} anchorEl={this.anchorEl.current}>

          {items?items.map( ({label,iconName},key) => (
            <MenuItem onClick={ this.performAction.bind(null,{iconName}) } key={`item${key}`}>
              <Icon>{iconName}</Icon>
              <Typography variant="inherit">{label}</Typography>
            </MenuItem>
          )):null}
        
        </Menu>
      </div>
    );
  }
}

export default DropDownSelectIconList;
