import React from 'react';
import Button from '@material-ui/core/Button';
import events from '../utils/events';
import ModalCustom from '../customized-vendors/modalVendor';

import Typography from '@material-ui/core/Typography';

import BarChart from '../services/d3-charts/BarChart/Resizer';

const home = () => {
  const {emit} = events;
  return (
    <div>
      <BarChart />


      <ModalCustom isOpen={false} >
        <Typography component="h2" variant="h2" gutterBottom>
                  Display 4
        </Typography>
        <Typography component="h2" variant="h2" gutterBottom>
                  Display 4
        </Typography>
        <Button variant="contained" color="primary" onClick={()=>{emit('CLOSE_MODAL');}}>Cancel Modal</Button>
      </ModalCustom>
      <Button variant="contained" color="primary" onClick={()=>{emit('OPEN_MODAL');}} >open Modals</Button>

    </div>
  );

};

export default home;