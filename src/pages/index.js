import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import events from '../utils/events';
import ModalCustom from '../customized-vendors/modalVendor';


const home = () => {
  const { emit } = events;
  return (
    <div>


      <ModalCustom isOpen={false} >
        <Typography component="h2" variant="h2" gutterBottom>
                  Display 4
        </Typography>
        <Typography component="h2" variant="h2" gutterBottom>
                  Display 4
        </Typography>
        <Button variant="contained" color="primary" onClick={() => { emit('CLOSE_MODAL'); }}>Cancel Modal</Button>
      </ModalCustom>
      <Button variant="contained" color="primary" onClick={() => { emit('OPEN_MODAL'); }} >open Modals</Button>

    </div>
  );
};

export default home;
