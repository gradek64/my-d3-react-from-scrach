import React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import SimpleModalWrapped, {SimpleModal} from '../assets/material-ui-custom/modal';
import SimpleModalWrappedOriginal from '../assets/material-ui-custom/modalOriginal';
import events from '../utils/events';
import CustomModal from '../components/customModal';
import './index.scss';


const home = () => {
    const {emit} = events;
    return (
        <div>
            <SimpleModalWrappedOriginal  isOpen={false} >
                <p>hello there</p>                  
                <p>hello there</p>                  
            </SimpleModalWrappedOriginal>
            <CustomModal isOpen={false} opts={{
                shownOn:'CLICK_ON_CREATE_COST_MODEL',
                hideOn:'CLICK_ON_CANCEL_COST_MODEL' 
            }}>
                <Typography component="h2" variant="h1" gutterBottom>
                        h1. Heading
                </Typography>
                <Typography variant="h2" gutterBottom>
                        h2. Heading
                </Typography>
                <Button variant="contained" color="primary" onClick={()=>{emit('CLICK_ON_CANCEL_COST_MODEL');}}>Cancel Modal</Button>
            </CustomModal>
            <Button variant="contained" color="primary" onClick={()=>{emit('CLICK_ON_CREATE_COST_MODEL');}} >open Modals</Button>
        </div>
    );

};

console.log('SimpleModal',SimpleModal.prototype.handleOpen);

export default home;