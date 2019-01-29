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

  const links = [
    {
      name: 'cost-overview',
      icon: {name: 'itCostOverview', color: 'white'},
      href: '/#!/cost-overview',
      label: 'Cost Overview',
      toBePresentOn: [
        'cost-overview',
        'service-statement',
        'kpi',
        'analytics',
        'my-reports',
      ],
    },
    {
      name: 'cost-overview',
      icon: {name: 'itCostOverview', color: 'white'},
      href: '/#!/cost-overview',
      label: 'Cost Overview',
      toBePresentOn: [
        'cost-overview',
        'service-statement',
        'kpi',
        'analytics',
        'my-reports',
      ],
    },
    {
      name: 'cost-overview',
      icon: {name: 'itCostOverview', color: 'white'},
      href: '/#!/cost-overview',
      label: 'Cost Overview',
      toBePresentOn: [
        'cost-overview',
        'service-statement',
        'kpi',
        'analytics',
        'my-reports',
      ],
    }
  ];

  const { asMobile, multipleOpenPass }= props;
  const { location } = history;
  const activetab = {
    active: location.pathname==='/'?'true':'false'
  };
  return (<div className={asMobile?'menuMobile':'menuDesktop'}>
    <ul className={'MainNavList'}>
      <li className={'menuItem'} 
        onClick={(e)=>{props.callback?props.callback(e):null;}}
        {...activetab}
      >
        <NavLink to="/"   exact={true}>
          <div className='verticalAlignment' >
            <Accessibility  color="secondary" />
            <Typography variant="h6" color="secondary" className={props.classes.robotoLight}>
              News
            </Typography>
          </div>
        </NavLink>
      </li>
      <li className={'menuItem'} dropped='false' dropdownmenuanchor='yes' onClick={(e)=>{props.callback?props.callback(e):null;}}>
        <DropDownMenu 
          onMouseEnter={asMobile?false:true} 
          collapsebleAccordion={asMobile?true:false}
          multipleOpen={multipleOpenPass?multipleOpenPass:false}
          animation={asMobile?true:false} >
          <div className='verticalAlignment'>
            <AlarmOn  color="secondary" />
            <Typography variant="h6" color="secondary" className={props.classes.robotoLight}>
             Dropdown mobile 2
            </Typography>
          </div>
          <div>
            <DropdownContent/>
          </div>
        </DropDownMenu>
      </li>
      <li className={'menuItem'} dropped='false' dropdownmenuanchor='yes'   >
        <DropDownMenu 
          onMouseEnter={asMobile?false:true} 
          collapsebleAccordion={asMobile?true:false}
          multipleOpen={multipleOpenPass?multipleOpenPass:false}
          animation={asMobile?true:false} >
          <div className='verticalAlignment'>
            <PetsRounded  color="secondary" />
            <Typography variant="h6" color="secondary" className={props.classes.robotoLight}>
             Dropdown 3
            </Typography>
          </div>
          <div>
            <DropdownContent/>
          </div>
        </DropDownMenu>
      </li>
      <li className={'menuItem'} onClick={(e)=>{props.callback?props.callback(e):null;}}>
        <NavLink to="/admin/cost-models/">
          <div className='verticalAlignment' >
            <CameraEnhanceTwoTone  color="secondary" />
            <Typography variant="h6" color="secondary" className={props.classes.robotoLight}>
               News
            </Typography>
          </div>
        </NavLink>
      </li>
      <li className={'menuItem'} onClick={(e)=>{props.callback(e);}}>
        <NavLink to="/admin/edit/76">
          <div className='verticalAlignment' >
            <FaceOutlined  color="secondary" />
            <Typography variant="h6" color="secondary" className={props.classes.robotoLight}>
             News
            </Typography>
          </div>
        </NavLink>
      </li>
      <li className={'menuItem'} onClick={(e)=>{props.callback(e);}}>
        <NavLink to="/cost-overview">
          <div className='verticalAlignment' >
            <FaceOutlined  color="secondary" />
            <Typography variant="h6" color="secondary" className={props.classes.robotoLight}>
             Cost Overview
            </Typography>
          </div>
        </NavLink>
      </li>
      <li className={'menuItem'} dropped='false' dropdownmenuanchor='yes' onClick={(e)=>{props.callback?props.callback(e):null;}}>
        <DropDownMenu 
          onMouseEnter={asMobile?false:true} 
          collapsebleAccordion={asMobile?true:false}
          multipleOpen={multipleOpenPass?multipleOpenPass:false}
          animation={asMobile?true:false} >
          <div className='verticalAlignment'>
            <EjectSharp  color="secondary" />
            <Typography variant="h6" color="secondary" className={props.classes.robotoLight}>
             Dropdown
            </Typography>
          </div>
          <div>
            <DropdownContent/>
          </div>
        </DropDownMenu>
      </li>
    </ul>
  </div>
  );};


export default withStyles(styles)(MainNavList);
