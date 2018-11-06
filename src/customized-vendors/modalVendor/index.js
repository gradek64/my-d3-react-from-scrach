import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import events from '../../utils/events';

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
        width: theme.spacing.unit * 50,
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

        //EXTRA
        //bind custom events for external calls
        events.on('CLICK_ON_CREATE_COST_MODEL', this.handleOpen);
        events.on('CLICK_ON_CANCEL_COST_MODEL', this.handleClose);

    }
    
    handleOpen() {
        this.setState({ open: true });
    }

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
