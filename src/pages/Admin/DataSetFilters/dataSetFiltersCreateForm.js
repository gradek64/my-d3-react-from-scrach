import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import RadioButtonsGroup from './radioButtonsGroup';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DropDownSelect from '../../../components/selectDropdown';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import events from '../../../utils/events';
import Schema from 'validate';

const file = new Schema({
  filename: {
    required: true,
    length: { min: 3, max: 32 }
  }
});



class DataSetFilterForm extends React.Component {

  state = {
    value: 'none',
    hasError:false,
    errorMsg:''
  };


  validateField = (event) => {
    console.log(event);
    let obj = {filename:event.target.value};
    const errors = file.validate(obj);

    if(errors.length>0){
      this.setState({
        hasError:true,
        errorMsg:errors[0].message,
      });
      
    }else {
      this.setState({hasError:false});
    }

    console.log(errors);
  };

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
          <FormControl  aria-describedby="component-error-text">
            <InputLabel htmlFor="component-error">File Name</InputLabel>
            <Input id="component-error" error={this.state.hasError} value={this.state.name} onChange={this.validateField} />
            {this.state.hasError?<FormHelperText id="component-error-text" error >Error</FormHelperText>:null}
          </FormControl>
          <TextField
            id="standard-with-placeholder"
            label="With placeholder"
            error={this.state.hasError}
            onChange={this.validateField}
            placeholder="Placeholder"
            className={'dataset-filter-name'}
            margin="normal"
          />
          {this.state.hasError?<p className={'error'}>{this.state.errorMsg}</p>:null}
          <DropDownSelect 
            label={'File type'}
            options = {[
              {value:10,optionName:'Greg'},
              {value:20,optionName:'Libby'},
              {value:30,optionName:'Katarzynas'},
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
                error 
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