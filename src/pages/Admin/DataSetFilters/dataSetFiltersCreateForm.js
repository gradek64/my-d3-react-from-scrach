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

const validationRules = new Schema({
  filename: {
    length: { min: 3, max: 32 }
  },
  username: {
    required: true,
    length: { min: 3, max: 32 }
  },
  select: {
    length: { min: 3, max: 32 }
  }
});



class DataSetFilterForm extends React.Component {

  state = {
    value: 'none',
    fields:{
      username:'',
      filename:'',
      select:'',
    },
    errorsSet:{
      username:'',
      filename:'',
      select:''
    }
  };

  formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });

    return valid;
  };


  handleChange = (event) => {
    console.log('works');
    const {name, value } = event.target;

    console.log('......NAME VALUE',name,value);

    //checks one at the time
    let errorField = { [name]:value};
    let ss = Object.assign({...this.state.fields}, errorField);
    console.log('ss',ss);
    let errors = validationRules.validate(ss);



    let errorsObject;
    if(errors.length>0){
      //reduce errors array to object for simplicity;

      errorsObject = errors.reduce((obj,e)=>{
        let property = e.path;
        obj[property] = e.message;
        return obj;
      },{});

      console.log('errorsObject', errorsObject);

      this.setState({ 
        errorsSet: { 
          ...this.state.errorsSet, 
          username: errorsObject['username']?errorsObject['username']:'',
          filename: errorsObject['filename']?errorsObject['filename']:'',   
          select: errorsObject['select']?errorsObject['select']:''}    
      });

      console.log('this.state', this.state);

      return;
    }

    this.setState({ 
      errorsSet: { 
        username:'',
        filename:'',
        select:'' }
    });
  };

  setActiveTab = (value)=> {
    this.setState({ value });
  }

  submit = () => {
    this.setState({ submited:true });
  }

  render() {

    const { costPot } = this.props;

    console.log('this.state', this.state);

    return (
      <form name="form1" ng-submit="onSubmit(formObj1,'upload'); $event.preventDefault();">
        <div className="create-dataset-filter-form">
          <Typography component="h4" variant="h4" gutterBottom>
                Create Dataset Filter for {costPot}
          </Typography>
          <FormControl  aria-describedby="component-error-text" className='textfield'>
            <InputLabel htmlFor="component-error">File Name</InputLabel>
            <Input id="component-error" name="filename" error={this.state.errorsSet.filename!==''} value={this.state.name} onChange={this.handleChange} />
            {this.state.errorsSet.filename?<FormHelperText id="component-error-text" error >({this.state.errorsSet.filename})</FormHelperText>:null}
          </FormControl>
          <FormControl  aria-describedby="component-error-text" className='textfield'>
            <InputLabel htmlFor="component-error">user Name</InputLabel>
            <Input id="component-error" name="username" error={this.state.errorsSet.username!==''} value={this.state.name} onChange={this.handleChange} />
            {this.state.errorsSet.username?<FormHelperText id="component-error-text" error >({this.state.errorsSet.username})</FormHelperText>:null}
          </FormControl>
          <DropDownSelect 
            label={'file type'}
            error={this.state.errorsSet.select}
            //pass validate method for this component
            validate={this.handleChange}
            options = {[
              {value:'Greg',optionName:'Greg'},
              {value:'Libby',optionName:'Libby'},
              {value:'Katarzynas',optionName:'Katarzynas'},
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
          <Button variant="contained" color="primary" className='buttonCancel' onClick={()=>{events.emit('CLOSE_MODAL');}} >Cancel</Button>
        </div>
      </form>
    );
  }

}

export default DataSetFilterForm;