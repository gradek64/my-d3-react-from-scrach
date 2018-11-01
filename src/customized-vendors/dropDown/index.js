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


const styles = theme => ({
    root: {
        display: 'flex',
    },
    icon: {
        margin: theme.spacing.unit - 10,
    },
    paper: {
        marginRight: theme.spacing.unit * 2,
    },
});
//                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center top' }}

const  MenuListComposition = (props) => {
    const { classes, list, clickAwayHandler ,open , verticalPlacement  } = props;
    //HACK for placement
    const placement = verticalPlacement==='left' ? {} : {right:'10px'};

    return (
        <div className={classes.root}>
            <ClickAwayListener onClickAway={ clickAwayHandler }>
                <div>
                    <Popper open={open} style={Object.assign(placement,{position:'absolute'})} transition disablePortal placement='left-end'>
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
                                                        <MenuItem key={`dropIcon${key}`} className={classes.menuItem} onClick={ handler }>
                                                            <ListItemIcon className={classes.icon}>
                                                                <Icon className={classes.icon} color={iconColor?iconColor:'primary'}>
                                                                                      add_circle
                                                                </Icon>
                                                            </ListItemIcon>
                                                            <ListItemText classes={{ primary: classes.primary }} inset primary={placement} />
                                                        </MenuItem>
                                                    );
                                                }
                                                return (<MenuItem key={`drop${key}`} onClick={ handler }>{el}</MenuItem>);
                                            })
                                        } 
                                    </MenuList>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </ClickAwayListener>
        </div>
    );
};


export default withStyles(styles)(MenuListComposition);
