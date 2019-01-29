import React from 'react';
import { NavLink } from 'react-router-dom';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DropDownMenu from '../../../components/dropDownMenu';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import DropdownContent from '../../../components/dropDownContent/contentRandom';


/*
  *@List of icons can be found there they need to capitalized for svg use
  *@https://material.io/tools/icons/?style=baseline
  *@instruction what to capitalize
  *@https://www.npmjs.com/package/@material-ui/icons
  *@ icons can be outlined , two-tone , rounded and sharp
*/

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

//icons
import Accessibility from '@material-ui/icons/Accessibility';
import AlarmOn from '@material-ui/icons/AlarmOn';
import PetsRounded from '@material-ui/icons/PetsRounded';
import CameraEnhanceTwoTone from '@material-ui/icons/CameraEnhanceTwoTone';
import FaceOutlined from '@material-ui/icons/FaceOutlined';
import EjectSharp from '@material-ui/icons/EjectSharp';
import { history } from '../../../routers/AppRouter';

import './menuSubLinks.scss';
import { links } from './mainNavList_config';


function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
/*
  *@relativePosition needs to be set 
  *@cause there are element in the menu that have position absolute 
  *@so this has to dictate boundaries of container 
*/
const styles = theme => ({
  icon: {
    margin: theme.spacing.unit - 10,
  },
  robotoLight:{
    fontWeight:theme.typography.fontWeightLight,
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
});


const MainNavList = (props) => {

  

  const { asMobile, multipleOpenPass, linkActive }= props;
  const { location } = history;
  return (
    <AppBar position="static" color='default'>
      <Toolbar className='sub-links-menu' style={{minHeight:'40px', 'height':'40px'}} >
        <Switch value="checkedC" />
        <ul className={'MainNavList'}>
          {
            links
              .filter((link)=>link.toBePresentOn.includes( 'cost-overview' ))
              .map(({label,type,href,name},i)=>{
                if ( type==='link' ){
                  return <li className={'menuItem'}
                    active= { name==linkActive ? 'true':'false'}
                    key={`link}${i}`}
                    onClick={(e)=>{props.callback?props.callback(e):null;}}
               
                  >
                    <NavLink to={href}   exact={true}>
                      <div className='verticalAlignment' >
                        <Typography variant="h6" color="secondary" className={props.classes.robotoLight}>
                          {label}
                        </Typography>
                      </div>
                    </NavLink>
                  </li>;
                }


              })
      
          }
        </ul>
      </Toolbar>
    </AppBar>
  );};


export default withStyles(styles)(MainNavList);
