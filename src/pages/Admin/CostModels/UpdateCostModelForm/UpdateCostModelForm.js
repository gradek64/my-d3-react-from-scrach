import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DropDownSelect from '../../../../components/selectDropdown';
import Hidden from '@material-ui/core/Hidden';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import events from '../../../../utils/events';
import {validationRules} from './createCostModelValidationRules.js';

import './createCostModelForm.scss';


class uploadForm extends React.Component {

  componentDidMount(){
    document.addEventListener('keypress', this.onKeyPress);
  }

  componentWillUnmount(){
    //both remove and add needs handler outside to work;
    document.removeEventListener('keypress',this.onKeyPress, false);
  }

  onKeyPress = (event) => {
    //submit form also on enter key press;
    if (event.keyCode == 13) {
      this.submit();
    }
  }

  state = {
    submitted:false,
    fields:{
      select:null,
      costModelName:null,
    },
    errorsSet:{
      select:'',
      costModelName:'',
    }
  };

  checkEmptyFields = ({ fields }) => {
    let valid = true;
    
    Object.keys(fields).forEach((value) => {
      /*
       *@to update state based on multiple cycle you need use callback to not SKIP other object properties
     */
      // validate if the form is not empty
      if(!fields[value]){
        this.setState((state) => {
          return {
            errorsSet: {...state.errorsSet, [value]:`${value} is empty`}
          };
        });
        valid = false;
      }
    });

    return valid;
  };

  handleChange = (event) => {
    const { name } = event.target;
    const value  = event.target.files? event.target.files[0].name : event.target.value;

    //update form fields
    this.setState((state)=>{ 
      return {fields: { 
        ...state.fields, 
        [name]:value,
      }
      };
    });

    //start validating but show errors only on submit form;
    //checks one at the time
    let errorField = { [name]:value};
    let errors = validationRules[name].validate(errorField);

    //convert error array to object for simplicity;
    let errorsObject = errors.reduce((obj,e)=>{
      let property = e.path;
      obj[property] = e.message;
      return obj;
    },{});

    //update errors
    this.setState({ 
      errorsSet: { 
        ...this.state.errorsSet, [name]:errorsObject[name]
      }   
    });
  };

  submit = () => {
    this.setState({ submitted:true });

    if( this.checkEmptyFields(this.state) ){
      const configurationNumber = Math.floor(Math.random()*100000);

      const { costModelName, select:selectValue } = this.state.fields;

      const objectCreate = {
        configurationNumber,
        createdBy: 'joy@amalytics.co',
        creationDate: new Date(),
        id: configurationNumber,
        name: costModelName,
        parentConfigurationId: selectValue,
        type: 'USER',
        uuid: '5bc86a0a-978c-4364-88dd-58832569113f',
        version: 1
      };

      this.props.onSubmit(objectCreate);
    }
    
  }

  render() {

    const { errorsSet, submitted} = this.state;
    const { selectDropdownData } = this.props;

    return (
      <form name="form1" className="file-upload-form">
        <div className="modal-content">
          <Typography component="h4" variant="h4" gutterBottom>
              Update CostModel
          </Typography>
          <div className="f-body">
            <div className="input-field row">
              <DropDownSelect 
                label={'file type'}
                error={submitted && errorsSet.select}
                //pass validate method for this component
                validate={this.handleChange}
                options = {selectDropdownData}
              />
            </div>
            <FormControl  aria-describedby="component-error-text" className='row'>
              <InputLabel htmlFor="component-error">CostModel Name</InputLabel>
              <Input id="component-costModelName" name="costModelName" error={submitted && Boolean(errorsSet.costModelName)} onChange={this.handleChange} />
              {submitted && errorsSet.costModelName?<FormHelperText id="component-error-text" error >({submitted && errorsSet.costModelName})</FormHelperText>:null}
            </FormControl>
          </div>
        </div>
        <div className="modal-footer">
          <Button variant="contained" color="primary" className='buttonConfirm' onClick={this.submit} >Create</Button>
          <Button variant="contained" color="primary" className='buttonCancel' onClick={()=>{events.emit('CLOSE_MODAL');}} >Cancel</Button>
        </div>
      </form>
    );
  }

}

export default uploadForm;