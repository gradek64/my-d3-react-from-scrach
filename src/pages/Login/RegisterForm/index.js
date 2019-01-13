import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';


import {validationRules} from './registerFormValidationRules.js';

import './registerFormValidationRules.scss';


class LoginRegisterForm extends React.Component {

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
      username:null,
      password:null,
      email:null,
      favoritePet:null,
      favoriteFood:null
    },
    errorsSet:{
      username:'',
      password:'',
      email:'',
      favoritePet:'',
      favoriteFood:''
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
      console.log('form READY!');
    }
  }

  render() {

    const { errorsSet, submitted} = this.state;

    return (
      <form name="form1" className="register-form" style={{flexDirection:'column',display:'flex'}}>
        <FormControl  aria-describedby="component-error-text" className='row'>
          <InputLabel htmlFor="component-error">user Name</InputLabel>
          <Input 
            id="component-username" 
            name="username" 
            error={submitted && Boolean(errorsSet.username)} 
            onChange={this.handleChange} />
          {submitted && errorsSet.username?
            <FormHelperText id="component-error-text" error >({submitted && errorsSet.username})
            </FormHelperText>:null}
        </FormControl>
        <FormControl  aria-describedby="component-error-text" className='row'>
          <InputLabel htmlFor="component-error">password</InputLabel>
          <Input 
            id="component-password" 
            name="password" 
            error={submitted && Boolean(errorsSet.password)} 
            onChange={this.handleChange} />
          {submitted && errorsSet.password?
            <FormHelperText id="component-error-text" error >({submitted && errorsSet.password})
            </FormHelperText>:null}
        </FormControl>
        <FormControl  aria-describedby="component-error-text" className='row'>
          <InputLabel htmlFor="component-error">email</InputLabel>
          <Input 
            id="component-email" 
            name="email" 
            error={submitted && Boolean(errorsSet.email)} 
            onChange={this.handleChange} />
          {submitted && errorsSet.email?
            <FormHelperText id="component-error-text" error >({submitted && errorsSet.email})
            </FormHelperText>:null}
        </FormControl>
        <FormControl  aria-describedby="component-error-text" className='row'>
          <InputLabel htmlFor="component-error">favorite Pet</InputLabel>
          <Input 
            id="component-favoritePet" 
            name="favoritePet" 
            error={submitted && Boolean(errorsSet.favoritePet)} 
            onChange={this.handleChange} />
          {submitted && errorsSet.favoritePet?
            <FormHelperText id="component-error-text" error >({submitted && errorsSet.favoritePet})
            </FormHelperText>:null}
        </FormControl>
        <FormControl  aria-describedby="component-error-text" className='row'>
          <InputLabel htmlFor="component-error">favorite Food</InputLabel>
          <Input 
            id="component-favoriteFood" 
            name="favoriteFood" 
            error={submitted && Boolean(errorsSet.favoriteFood)} 
            onChange={this.handleChange} />
          {submitted && errorsSet.favoriteFood?
            <FormHelperText id="component-error-text" error >({submitted && errorsSet.favoriteFood})
            </FormHelperText>:null}
        </FormControl>
        <Button variant="contained" className='submit' color="primary" onClick={this.submit}>
                    Register
        </Button>
      </form>
    );
  }

}

export default LoginRegisterForm;