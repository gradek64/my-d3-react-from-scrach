import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import events from '../../utils/events';
import './modalVendor.scss';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const styles = theme => ({
  container:{
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height:'100vh',
  },
  content: {
    maxWidth: theme.spacing.unit * 100,
    minWidth: theme.spacing.unit * 50,
    [theme.breakpoints.up('md')]: {
      minWidth: theme.spacing.unit * 100,
    },
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SimpleModal extends React.Component {
  constructor(props){
    super(props);
    props = this.props;
    this.state = {
      open: props.isOpen,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    //handle more that one trigger event on the page
    const { eventToTrigger } = this.props;
    this.eventName = eventToTrigger ? eventToTrigger : 'OPEN_MODAL';
  }

  componentDidMount() {



    /*
        *@register events once ModaComponed loaded
        *@
      */
    events.on(this.eventName, this.handleOpen);
    events.on('CLOSE_MODAL', this.handleClose);
  }

  componentWillUnmount() {

    /*
        *@remove events once ModaComponed unloaded
        *@that way those events are only set once <Modal /> is initiated and only there;
        *@OPEN_MODAL and CLOSE_MODAL can be used mutiple times on diffrent pages since we remove them on Unmount event
      */
    events.off( this.eventName, this.handleOpen);
    events.off('CLOSE_MODAL', this.handleClose);
  }
    
  handleOpen(payload=undefined) {
    if(payload) this.props.receiveEventPayload(payload);
    this.setState({ open: true });
  }

  //no payload on closing;
  handleClose() {  
    this.setState({ open: false });
  }

  render() {
    const { classes } = this.props;

    return (
      <div >
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          className={classes.container} >
          <div className={classes.content}>
            {this.props.children}
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);
export {SimpleModal};
export default SimpleModalWrapped;
