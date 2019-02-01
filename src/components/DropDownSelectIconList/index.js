import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/core/styles';


import './dropDownSelectIconList.scss';

const styles = (theme) => ({
  container: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius:'4px',
    padding: '6px'
  },
  iconSpacer:{
    marginRight:'5px'
  }
});


class DropDownSelectIconList extends React.Component {

  state = {
    showDropDownMenu:false,
    selected:this.props.selected
  }
  anchorEl = React.createRef();


  componentDidUpdate(prevProps) {
    /*console.log('prevProps',prevProps);
    // Typical usage (don't forget to compare props):

    console.log('this.props.selected.....',this.props.selected);
    console.log('prevProps.selected.....',prevProps.selected);
    if (this.props.selected !== prevProps.selected) {
      console.log('this.props.selected',this.props.selected);
    }*/
  }

  hideDropDown = (icon) => {
    this.setState({ showDropDownMenu: false });
    if(icon) {
      //change first icon to selected to menu only;
      const firstIcon = this.anchorEl.current.querySelector('span');
      if(firstIcon) firstIcon.innerHTML=icon;
    }
  };

  performAction = (icon,value) =>{
    console.log(value);
    this.setState({selected:value});
    this.hideDropDown(icon);
    //call action 
    this.props.action(value);
  }

  render(){

    const {showDropDownMenu, selected  } = this.state;
    const {  items, classes } = this.props;

    return (
      <div>
        {/*show ClickAwayListener only when manu is open*/}
        { showDropDownMenu?
          <ClickAwayListener onClickAway={ this.hideDropDown.bind(null,null) }>
            <div></div>
          </ClickAwayListener>:null}
        {/*dropdown trigger from outside=*/}
        <div onClick={()=>{ this.setState({ showDropDownMenu: true });} } className={classes.container} ref={this.anchorEl}>
          {this.props.children } 
        </div>
        <Menu open={showDropDownMenu} anchorEl={this.anchorEl.current}>

          {items?items.map( ({label,value, materialIcon},key) => 
          {return selected!==value?
            <MenuItem onClick={ this.performAction.bind(null,materialIcon,value) } key={`item${key}`}>
              <Icon color={'primary'} className={classes.iconSpacer}>{materialIcon}</Icon>
              <Typography variant="inherit" color={'primary'}>{label}</Typography>
            </MenuItem>:null;}
          ):null}
        
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(DropDownSelectIconList);
