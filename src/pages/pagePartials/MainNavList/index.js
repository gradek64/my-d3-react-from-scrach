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
import DropdownContent from '../../../components/dropDownContent/contentRandom';


/*
  *@List of icons can be found there they need to capitalized for svg use
  *@https://material.io/tools/icons/?style=baseline
  *@instruction what to capitalize
  *@https://www.npmjs.com/package/@material-ui/icons
  *@ icons can be outlined , two-tone , rounded and sharp
*/

//icons
import Accessibility from '@material-ui/icons/Accessibility';
import AlarmOn from '@material-ui/icons/AlarmOn';
import PetsRounded from '@material-ui/icons/PetsRounded';
import CameraEnhanceTwoTone from '@material-ui/icons/CameraEnhanceTwoTone';
import FaceOutlined from '@material-ui/icons/FaceOutlined';
import EjectSharp from '@material-ui/icons/EjectSharp';
import { history } from '../../../routers/AppRouter';

import './mainNavList.scss';
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

  const { asMobile, multipleOpenPass, page }= props;
  const { location } = history;
  const activetab = {
    active: location.pathname==='/'?'true':'false'
  };
  return (<div className={asMobile?'menuMobile':'menuDesktop'}>
    <ul className={'MainNavList'}>
      {

        links
          .filter((link)=>link.toBePresentOn.includes( page ))
          .map(({label,type,href,icon,dropDownContent},i)=>{
            const IconComponet = icon.name;
            const DropdownContent = dropDownContent;

            if ( type==='link' ){

              return <li className={'menuItem'} 
                key={`link}${i}`}
                onClick={(e)=>{props.callback?props.callback(e):null;}}
                {...activetab}
              >
                <NavLink to={href}   exact={true}>
                  <div className='verticalAlignment' >
                    <IconComponet  color="secondary" />
                    <Typography variant="h6" color="secondary" className={props.classes.robotoLight}>
                      {label}
                    </Typography>
                  </div>
                </NavLink>
              </li>;
            }

            if ( type==='dropdown' ) {

              return <li className={'menuItem'} 
                key={`link}${i}`}
                dropped='false' 
                dropdownmenuanchor='yes' 
                onClick={(e)=>{props.callback?props.callback(e):null;}}>
                <DropDownMenu 
                  onMouseEnter={asMobile?false:true} 
                  collapsebleAccordion={asMobile?true:false}
                  multipleOpen={multipleOpenPass?multipleOpenPass:false}
                  animation={asMobile?true:false} >
                  <div className='verticalAlignment'>
                    <IconComponet  color={icon.color} />
                    <Typography variant="h6" color="secondary" className={props.classes.robotoLight}>
                      {label}
                    </Typography>
                  </div>
                  <div>
                    <DropdownContent/>
                  </div>
                </DropDownMenu>
              </li>;
            }

          })
      
      }
    </ul>
  </div>
  );};


export default withStyles(styles)(MainNavList);
