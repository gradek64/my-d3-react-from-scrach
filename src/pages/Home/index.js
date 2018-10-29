import React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import SimpleModalWrapped, {SimpleModal} from '../../assets/material-ui-custom/modal';
import SimpleModalWrappedOriginal from '../../assets/material-ui-custom/modalOriginal';
import './index.scss';


/*<SimpleModalWrapped isOpen={false} > 
                <div>
                    <p>this is modal content</p>
                    <p>this is modal content</p>
                    <p>this is modal content</p>
                    <p>this is modal content</p>
                    <p>this is modal content</p>
                    <p>this is modal content</p>
                </div>
            </SimpleModalWrapped>*/
const home = () => {

    return (
        <div>
           
            <SimpleModalWrappedOriginal isOpen={true} />
            <Typography gutterBottom>Click to get the full Modal experience!</Typography>
            <Button>open Modal</Button>
        </div>
    );

};

console.log('SimpleModal',SimpleModal.prototype.handleOpen);

export default home;