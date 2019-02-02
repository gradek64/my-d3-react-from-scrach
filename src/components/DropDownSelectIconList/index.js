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
    selected:this.props.selected,
    items:this.props.items,
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
    const { items, selected} = this.props;
    const {items:prevItems} = prevProps;
    if(items!==prevItems){
      this.setState(()=>{
        return { 
          items,
          selected,
        };
      });
      
    }
  }

  hideDropDown = (icon) => {
    this.setState({ showDropDownMenu: false });
    if(icon) {
      //change first icon to selected to menu only;
      //const firstIcon = this.anchorEl.current.querySelector('span');
      //if(firstIcon) firstIcon.innerHTML=icon;
    }
  };

  performAction = (selected) =>{
    console.log(selected.value);
    this.setState({ selected });
    this.hideDropDown(selected.materialIcon);
    //call action

    console.log('type selected', selected); 
    this.props.action(selected);
  }

  render(){

    const {showDropDownMenu, items ,selected } = this.state;
    const {   classes  } = this.props;

    console.log('....selected.....',selected);

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

          {items?items.map( (item,key) => 
          {return selected.value!==item.value?
            <MenuItem onClick={ this.performAction.bind(null,item) } key={`item${key}`}>
              <Icon color={'primary'} className={classes.iconSpacer}>{item.materialIcon}</Icon>
              <Typography variant="inherit" color={'primary'}>{item.label}</Typography>
            </MenuItem>:null;}
          ):null}
        
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(DropDownSelectIconList);
