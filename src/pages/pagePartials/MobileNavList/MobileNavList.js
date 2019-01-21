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
import './mobileNavList.scss';


function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'left',
  },
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



const MobileNavList = (props) => (
  <div>
    <ul className={'mobileNavList'}>
      <li className={'menuItem'} >
        <NavLink to="/"   exact={true}>
          <div className={props.classes.root} >
            <HomeIcon  color="secondary" />
            <Typography variant="h6" color="secondary" className={props.classes.robotoLight}>
              News
            </Typography>
          </div>
        </NavLink>
      </li>
      <li className={'menuItem'} >
        <div>
          <DropDownMenu collapsebleAccordion={true} onMouseEnter={false} multipleOpen={true} 
            animation={true}>
            <div className={props.classes.root}>
              <HomeIcon  color="secondary" />
              <Typography variant="h6" color="secondary" className={props.classes.robotoLight}>
             Dropdown mobile
              </Typography>
            </div>
            <div>
              <DropdownContent/>
            </div>
          </DropDownMenu>
        </div>
      </li>
      <li className={'menuItem'} >
        <NavLink to="/admin/cost-models/">
          <div className={props.classes.root} >
            <HomeIcon  color="secondary" />
            <Typography variant="h6" color="secondary" className={props.classes.robotoLight}>
               News
            </Typography>
          </div>
        </NavLink>
      </li>
      <li className={'menuItem'} >
        <div>
          <DropDownMenu collapsebleAccordion={true} onMouseEnter={false} multipleOpen={true} 
            animation={true}>
            <div className={props.classes.root}>
              <HomeIcon  color="secondary" />
              <Typography variant="h6" color="secondary" className={props.classes.robotoLight}>
             Dropdown mobile 2
              </Typography>
            </div>
            <div>
              <DropdownContent/>
            </div>
          </DropDownMenu>
        </div>
      </li>
      <li className={'menuItem'} >
        <NavLink to="/admin/edit/76">
          <div className={props.classes.root} >
            <HomeIcon  color="secondary" />
            <Typography variant="h6" color="secondary" className={props.classes.robotoLight}>
             News
            </Typography>
          </div>
        </NavLink>
      </li>
      <li className={'menuItem'} >
        <div>
          <DropDownMenu collapsebleAccordion={true} onMouseEnter={false} multipleOpen={true} 
            animation={true}>
            <div className={props.classes.root}>
              <HomeIcon  color="secondary" />
              <Typography variant="h6" color="secondary" className={props.classes.robotoLight}>
             Dropdown
              </Typography>
            </div>
            <div>
              <DropdownContent/>
            </div>
          </DropDownMenu>
        </div>
      </li>
    </ul>
  </div>
);

export default withStyles(styles)(MobileNavList);
