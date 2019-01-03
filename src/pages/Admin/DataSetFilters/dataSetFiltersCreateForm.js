import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import RadioButtonsGroup from './radioButtonsGroup';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DropDownSelect from '../../../components/selectDropdown';
import events from '../../../utils/events';



class DataSetFilterForm extends React.Component {

  state = {
    value: 'none',
  };

  /* handleChange = event => {
    this.setState({ value: event.target.value });
  };*/

  setActiveTab = (value)=> {
    this.setState({ value });
  }

  render() {

    const { costPot } = this.props;

    return (
      <form name="form1" ng-submit="onSubmit(formObj1,'upload'); $event.preventDefault();">
        <div className="create-dataset-filter-form">
          <Typography component="h4" variant="h4" gutterBottom>
                Create Dataset Filter for {costPot}
          </Typography>
          <TextField
            id="standard-with-placeholder"
            label="With placeholder"
            placeholder="Placeholder"
            className={'dataset-filter-name'}
            margin="normal"
          />
          <DropDownSelect 
            label={'File type'}
            options = {[
              {value:10,optionName:'Greg'},
              {value:20,optionName:'Libby'},
              {value:30,optionName:'Katarzyna'},
            ]}
          />
          <RadioButtonsGroup actionAll={(value)=>{ this.setActiveTab(value); }} items={
            [
              {label:'None', value:'none'},
              {label:'Match By', value:'matchby' },
              {label:'Filter By', value:'filterby' },
              {label:'Ratio File', value:'ratiofile' },
            ]
          } />
          <div className="f-body">
            
            {this.state.value==='none'?<div className="f-body">

              <TextField
                id="standard-with-placeholder"
                label="With placeholder"
                placeholder="Placeholder"
                className={'dataset-filter-name'}
                margin="normal"
              />
              <DropDownSelect 
                label={'File type'}
                options = {[
                  {value:10,optionName:'Greg'},
                  {value:20,optionName:'Libby'},
                  {value:30,optionName:'Katarzyna'},
                ]}
              />


            </div>:null}
            {this.state.value==='matchby'?<div className="f-body">two</div>:null}
            {this.state.value==='filterby'?<div className="f-body">three</div>:null}
            {this.state.value==='ratiofile'?<div className="f-body">four</div>:null}

             
          </div>
        </div>
        <div className="modal-footer">
          <Button variant="contained" color="primary" className='buttonConfirm' onClick={()=>{events.emit('CLOSE_MODAL');}}>Create</Button>
          <Button variant="contained" color="primary" className='buttonCancel' onClick={()=>{events.emit('OPEN_MODAL');}} >Cancel</Button>
        </div>
      </form>
    );
  }

}

export default DataSetFilterForm;