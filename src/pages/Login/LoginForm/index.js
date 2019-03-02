import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import { validationRules } from './loginFormValidationRules.js';

import './loginFormValidationRules.scss';


class LoginRegisterForm extends React.Component {
  componentDidMount() {
    document.addEventListener('keypress', this.onKeyPress);
  }

  componentWillUnmount() {
    // both remove and add needs handler outside to work;
    document.removeEventListener('keypress', this.onKeyPress, false);
  }

  onKeyPress = (event) => {
    // submit form also on enter key press;
    if (event.keyCode === 13) {
      this.submit();
    }
  }

  state = {
    submitted: false,
    fields: {
      username: null,
      password: null,
    },
    errorsSet: {
      username: '',
      password: '',
    },
  };

  checkEmptyFields = ({ fields }) => {
    let valid = true;

    Object.keys(fields).forEach((value) => {
      /*
       *@to update state based on multiple cycle you need use callback to not SKIP other object properties
     */
      // validate if the form is not empty
      console.log('fields[value]', fields[value]);
      if (!fields[value]) {
        this.setState(state => ({
          errorsSet: { ...state.errorsSet, [value]: `${value} is empty` },
        }));
        valid = false;
      }
    });

    return valid;
  };

  handleChange = (event) => {
    const { name } = event.target;
    const value = event.target.files ? event.target.files[0].name : event.target.value;

    // update form fields
    this.setState(state => ({
      fields: {
        ...state.fields,
        [name]: value,
      },
    }));

    // start validating but show errors only on submit form;
    // checks one at the time
    const errorField = { [name]: value };
    const errors = validationRules[name].validate(errorField);

    // convert error array to object for simplicity;
    const errorsObject = errors.reduce((obj, e) => {
      const property = e.path;
      obj[property] = e.message;
      return obj;
    }, {});

    // update errors
    this.setState({
      errorsSet: {
        ...this.state.errorsSet, [name]: errorsObject[name],
      },
    });
  };


  submit = () => {
    this.setState({ submitted: true });

    if (this.checkEmptyFields(this.state)) {
      // send fields to Login page
      this.props.submitCallback(this.state.fields);
    }
  }

  render() {
    const { errorsSet, submitted } = this.state;
    const { authenticationCallback } = this.props;

    return (
      <form name="form1" className="login-form" style={{ flexDirection: 'column', display: 'flex' }}>
        {authenticationCallback ?
          <Typography className="row authentication" color="primary" variant="subtitle1" component="h6" gutterBottom>
            {authenticationCallback}
          </Typography> : null
        }
        <FormControl aria-describedby="component-error-text" className="row">
          <InputLabel htmlFor="component-error">user Name</InputLabel>
          <Input
            id="component-username"
            name="username"
            error={submitted && Boolean(errorsSet.username)}
            onChange={this.handleChange}
          />
          {submitted && errorsSet.username ?
            <FormHelperText id="component-error-text" error >({submitted && errorsSet.username})
            </FormHelperText> : null}
        </FormControl>
        <FormControl aria-describedby="component-error-text" className="row">
          <InputLabel htmlFor="component-error">password</InputLabel>
          <Input
            id="component-password"
            name="password"
            type="password"
            error={submitted && Boolean(errorsSet.password)}
            onChange={this.handleChange}
          />
          {submitted && errorsSet.password ?
            <FormHelperText id="component-error-text" error >({submitted && errorsSet.password})
            </FormHelperText> : null}
        </FormControl>
        <Button variant="contained" className="submit" color="primary" onClick={this.submit} onKeyPress={this.handleKeyPress}>
                    Login
        </Button>
      </form>
    );
  }
}

export default LoginRegisterForm;
