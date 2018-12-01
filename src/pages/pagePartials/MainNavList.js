import React from 'react';
import { NavLink } from 'react-router-dom';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DropDownMenu from '../../components/dropDownMenu';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


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
    flexDirection: 'column',
    alignItems:'center',
  },
  inLine: {
    display:'inline-block',
    marginRight:'15px',
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



const MainNavList = (props) => (
  <div>
    <NavLink to="/"  className={props.classes.inLine}  exact={true}>
      <div className={props.classes.root} >
        <HomeIcon  color="secondary" />
        <Typography variant="h6" color="secondary" className={props.classes.robotoLight}>
              News
        </Typography>
      </div>
    </NavLink>
    <NavLink to="/admin/cost-models/" className={props.classes.inLine}>
      <div className={props.classes.root} >
        <HomeIcon  color="secondary" />
        <Typography variant="h6" color="secondary" className={props.classes.robotoLight}>
               News
        </Typography>
      </div>
    </NavLink>
    <NavLink to="/admin/edit/76" className={props.classes.inLine}>
      <div className={props.classes.root} >
        <HomeIcon  color="secondary" />
        <Typography variant="h6" color="secondary" className={props.classes.robotoLight}>
             News
        </Typography>
      </div>
    </NavLink>
    <div className={props.classes.inLine} onMouseEnter={()=>{console.log('onMouseEnter');}}>
      <DropDownMenu >
        <div className={props.classes.root}>
          <HomeIcon  color="secondary" />
          <Typography variant="h6" color="secondary" className={props.classes.robotoLight}>
             Dropdown
          </Typography>
        </div>
        <div>
          <Card>
            <CardContent>
              <Typography  color="textSecondary" gutterBottom>
                  Word of the Day
              </Typography>
              <Typography variant="h5" component="h2">
                  be
                dfwfw
                  lent
              </Typography>
              <Typography  color="textSecondary">
                  adjective
              </Typography>
              <Typography component="p">
                  well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
      </DropDownMenu>
    </div>
  </div>
);

export default withStyles(styles)(MainNavList);
