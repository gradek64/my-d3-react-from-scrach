import React from 'react';
import { NavLink } from 'react-router-dom';
// import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
/* import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'; */
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';


/*
  *@List of icons can be found there they need to capitalized for svg use
  *@https://material.io/tools/icons/?style=baseline
  *@instruction what to capitalize
  *@https://www.npmjs.com/package/@material-ui/icons
  *@ icons can be outlined , two-tone , rounded and sharp
*/

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

// icons
/* import Accessibility from '@material-ui/icons/Accessibility';
import AlarmOn from '@material-ui/icons/AlarmOn';
import PetsRounded from '@material-ui/icons/PetsRounded';
import CameraEnhanceTwoTone from '@material-ui/icons/CameraEnhanceTwoTone';
import FaceOutlined from '@material-ui/icons/FaceOutlined';
import EjectSharp from '@material-ui/icons/EjectSharp'; */

import { history } from '../../../routers/AppRouter';
import './reportsMenuSubLinks.scss';


/* function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
} */
/*
  *@relativePosition needs to be set
  *@cause there are element in the menu that have position absolute
  *@so this has to dictate boundaries of container
*/
const styles = theme => ({
  icon: {
    margin: theme.spacing.unit - 10,
  },
  robotoLight: {
    fontWeight: theme.typography.fontWeightLight,
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
});


const ReportSubNav = (props) => {
  const { linkActive, configuration } = props;

  const links = Object.keys(configuration).reduce((a, key, i) => {
    const accumulator = a;
    accumulator[i] = configuration[key].reportsMenuButton;
    return accumulator;
  }, []);
  // only consider an event active if its event id is an odd number

  const onKeyPressHandler = (event, href) => {
    // submit form also on enter key press;
    if (event.key === 'Enter') {
      history.push(href);
      // props.callback(event);
    }
  };


  return (
    <AppBar position="static" color="default">
      <Toolbar className="sub-links-menu" style={{ minHeight: '40px', height: '40px' }} >
        <Switch value="checkedC" />
        <ul className="ReportSubNav">
          {links ?
            links
              .map(({ label, href, id }, i) => (
                <li
                  className="menuItem"
                  active={id === linkActive ? 'true' : 'false'}
                  key={`link}${i}`}
                >
                  <button onKeyPress={(e) => { onKeyPressHandler(e, href); }}>
                    {/*
                By clicking on NavLink , the whole component that NavLink is injected it will
                RE-RENDER therefore it will run its props and state (if defined) again , no point
                of assing methods from props to other function cause it will
                call it any time you click on it
                unless U will need that feature, and it doesnt need event handler for click;
              */}
                    <NavLink to={href} /* isActive={()=>true} */ >
                      <div className="verticalAlignment" >
                        <Typography variant="h6" color="secondary" className={props.classes.robotoLight}>
                          {label}
                        </Typography>
                      </div>
                    </NavLink>
                  </button>
                </li>)) : null

          }
        </ul>
      </Toolbar>
    </AppBar>
  );
};


ReportSubNav.propTypes = {
  classes: PropTypes.instanceOf(Object),
  linkActive: PropTypes.string.isRequired,
  configuration: PropTypes.instanceOf(Object).isRequired,
};

ReportSubNav.defaultProps = {
  classes: {},
};


export default withStyles(styles)(ReportSubNav);
