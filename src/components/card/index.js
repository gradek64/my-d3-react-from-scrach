import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = {
  card: {
    minWidth: 275,
  },
  position: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '70vh',
    alignItems: 'center',
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

function SimpleCard(props) {
  const { classes } = props;

  return (
    <div className={props.center ? classes.position : ''}>
      <Card className={classes.card} /* style={{maxWidth:props.maxWidth}} */ >
        <CardContent>
          {props.children}
        </CardContent>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  center: PropTypes.bool,
  children: PropTypes.instanceOf(Array),
};

SimpleCard.defaultProps = {
  children: [],
  center: true,
};

SimpleCard.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(SimpleCard);
