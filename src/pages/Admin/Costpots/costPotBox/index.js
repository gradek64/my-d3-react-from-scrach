import React from 'react';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';

/* import SvgIcon from '@material-ui/core/SvgIcon';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button'; */
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import './costPotBox.scss';

/*
  *@list of icons can be found on : https://material.io/tools/icons/?style=baseline
  *@ just grab a name from the list and change for {icon} = {'icon name'}
*/


const styles = {
  card: {
    minWidth: 275,
    mmaxWidth: 300,
  },
  extraLarge: {
    fontSize: '100px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

const CostPotBox = (props) => {
  const {
    classes, name, heroIcon, hideDelete, hideAndroid, actionIcons, iconColor,
  } = props;
  // deconstract for 'assignment_turned_in' icon
  const { icon, linkParams } = actionIcons.assignment_turned_in;
  return (
    <Card className={classes.card}>
      <CardContent className="customStyleBox">
        <Typography className={classes.title} color="textSecondary" variant="h1" component="h1" gutterBottom>
          {name}
        </Typography>
        <Icon className={`${classes.icon} ${classes.extraLarge}`} color={iconColor || 'secondary'}>
          {heroIcon}
        </Icon>
        <div className="icons">
          {
            !hideDelete ?
              <Icon className={classes.icon} color={iconColor || 'primary'} onClick={actionIcons.delete.action}>
                {actionIcons.delete.icon}
              </Icon> : null
          }
          {
            !hideAndroid ?
              <NavLink
                to={`/admin/cost-models/${linkParams.costModelId}/costpots/${linkParams.costPotId}/dataset-filters/`}
              >
                <Icon className={classes.icon} color={iconColor || 'primary'}>
                  {actionIcons.android.icon}
                </Icon>
              </NavLink> : null
          }
          <NavLink to={`/admin/cost-models/${linkParams.costModelId}/costpots/${linkParams.costPotId}/file-management/`}>
            <Icon className={classes.icon} color={iconColor || 'primary'}>
              {icon}
            </Icon>
          </NavLink>
        </div>
      </CardContent>
    </Card>
  );
};

CostPotBox.propTypes = {
  selectDropdownDataFixed: PropTypes.instanceOf(Array),
  onSubmit: PropTypes.instanceOf(Function),
};

CostPotBox.defaultProps = {
  selectDropdownDataFixed: [],
  onSubmit: () => {},
};

export default withStyles(styles)(CostPotBox);
