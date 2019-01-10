import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';


/*
  *@list of Icons can be found here : https://material.io/tools/icons/?icon=assignment_turned_in&style=baseline
  *@
*/



const styles = theme => ({
  root: {
    display: 'flex',
  },
  fixIndex:{
    zIndex:100,
  },
  paddingFix:{
    paddingLeft:'0 !important',
  },
  icon: {
    margin: theme.spacing.unit - 10,
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
});

const  MenuListComposition = (props) => {
  const { classes, list, clickAwayHandler ,open , placement , anchor , direction } = props;

  return (
    <div className={classes.root}>
      {/*show ClickAwayListener only when manu is open*/}
      { open?
        <ClickAwayListener onClickAway={ clickAwayHandler }>
          <div></div>
        </ClickAwayListener>:null}
      <div>
        {/*show ClickAwayListener only when manu is open*/}
        <Popper open={open} anchorEl= {anchor} transition disablePortal placement={placement} className={classes.fixIndex} >
          {({ TransitionProps ,placement}) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
            >
              <Paper>                     
                <MenuList>
                  {
                    list.map(({el,icon,iconColor,handler},key)=>{
                      if(icon){
                        return (
                          <MenuItem key={`dropIcon${key}`} className={classes.menuItem} onClick={ (e)=>{ handler(),clickAwayHandler(e); } }>
                            {direction=='right'? <ListItemText primary={el} />:null}
                            <ListItemIcon className={classes.icon}>
                              <Icon className={classes.icon} color={iconColor?iconColor:'primary'}>  
                                {icon}                
                              </Icon>
                            </ListItemIcon>
                            {direction=='left'? <ListItemText primary={el} />:null}
                                                              
                          </MenuItem>
                        );
                      }
                      return (<MenuItem key={`drop${key}`} className={classes.menuItem} onClick={ (e)=>{ handler(),clickAwayHandler(e); }  }>{el}</MenuItem>);
                    })
                  } 

                </MenuList>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};


export default withStyles(styles)(MenuListComposition);
