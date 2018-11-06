import React from 'react';
import Button from '@material-ui/core/Button';
import events from '../utils/events';
import ModalCustom from '../components/modal';
import Typography from '@material-ui/core/Typography';
import './index.scss';


const home = () => {
    const {emit} = events;
    return (
        <div>
            <ModalCustom isOpen={false} opts={{
                shownOn:'CLICK_ON_CREATE_COST_MODEL',
                hideOn:'CLICK_ON_CANCEL_COST_MODEL' 
            }}>
                <Typography component="h2" variant="h2" gutterBottom>
                  Display 4
                </Typography>
                 <Typography component="h2" variant="h2" gutterBottom>
                  Display 4
                </Typography>
                <Button variant="contained" color="primary" onClick={()=>{emit('CLICK_ON_CANCEL_COST_MODEL');}}>Cancel Modal</Button>
            </ModalCustom>
            <Button variant="contained" color="primary" onClick={()=>{emit('CLICK_ON_CREATE_COST_MODEL');}} >open Modals</Button>
        </div>
    );

};

export default home;