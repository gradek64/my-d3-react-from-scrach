import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
/* import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel'; */

import DropDownSelect from '../../../../components/selectDropdown';
import events from '../../../../utils/events';
import { validationRules } from './fileManagementFormValidationRules';

import './fileUploadFormRules.scss';


class uploadForm extends React.Component {
  state = {
    submitted: false,
    fields: {
      select: null,
      uploadfiled: null,
    },
    errorsSet: {
      select: '',
      uploadfiled: '',
    },
  };

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


  checkEmptyFields = ({ fields }) => {
    let valid = true;

    Object.keys(fields).forEach((value) => {
      /*
       *@to update state based on multiple cycle you need use
       callback to not SKIP other object properties
     */
      // validate if the form is not empty
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
      const objArg = obj;
      const property = e.path;
      objArg[property] = e.message;
      return objArg;
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
      console.log('form READY!');
    }
  }

  render() {
    const { errorsSet, fields, submitted } = this.state;

    return (
      <form name="form1" className="file-upload-form">
        <div className="modal-content">
          <Typography component="h4" variant="h4" gutterBottom>
              Upload File
          </Typography>
          <div className="f-body">
            <div className="input-field row">
              <DropDownSelect
                label="file type"
                error={submitted && errorsSet.select}
                // pass validate method for this component
                validate={this.handleChange}
                options={[
                  { value: 'Greg', optionName: 'Greg' },
                  { value: 'Libby', optionName: 'Libby' },
                  { value: 'Katarzynas', optionName: 'Katarzynas' },
                ]}
              />
            </div>
            <div className="uploadfiled row">
              <label htmlFor="contained-button-file">
                <Button variant="contained" component="span" color="primary">
                        Upload
                  <CloudUploadIcon style={{ marginLeft: '10px' }} />
                </Button>
              </label>
              <input
                id="contained-button-file"
                name="uploadfiled"
                onChange={this.handleChange}
                multiple
                type="file"
              />
              <TextField
                className="filePathDisplay"
                id="standard-read-only-input"
                error={submitted && Boolean(errorsSet.uploadfiled)}
                value={fields.uploadfiled ? fields.uploadfiled : ''}
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>

          </div>
        </div>
        <div className="modal-footer">
          <Button variant="contained" color="primary" className="buttonConfirm" onClick={this.submit} >Upload</Button>
          <Button variant="contained" color="primary" className="buttonCancel" onClick={() => { events.emit('CLOSE_MODAL'); }} >Cancel</Button>
        </div>
      </form>
    );
  }
}

export default uploadForm;
