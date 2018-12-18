import React from 'react';
import { NavLink } from 'react-router-dom';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DropDownMenu from '../../components/dropDownMenu';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


const styles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    backgroundColor:'white',
    zIndex:10,
  },  
});

const randomDropDownContent = (props) => (

  <div className={props.classes.container}>

    <div>
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
    </div>
    <div>

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
    </div>
    

  </div>

);

export default withStyles(styles)(randomDropDownContent);
