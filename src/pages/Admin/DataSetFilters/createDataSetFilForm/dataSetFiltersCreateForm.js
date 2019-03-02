import React from 'react';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';

import DropDownSelect from '../../../../components/selectDropdown';
import events from '../../../../utils/events';
import { validationRules } from './dataSetFiltersFormValidationRules';
import RadioButtonsGroup from './radioButtonsGroup';


class DataSetFilterForm extends React.Component {
   state = {
     value: 'none',
     submitted: false,
     fields: {
       username: null,
       email: null,
       filename: null,
       select: null,
     },
     errorsSet: {
       username: '',
       email: '',
       filename: '',
       select: '',
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

  setActiveTab = (value) => {
    this.setState({ value });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    // update form fields
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value,
      },
    });

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


  checkEmptyFields = ({ fields }) => {
    let valid = true;

    Object.keys(fields).forEach((value) => {
      /*
       *@to update state based on multiple cycle you need use
       *@callback to not SKIP other object properties
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

  submit = () => {
    this.setState({ submitted: true });

    if (this.checkEmptyFields(this.state)) {
      console.log('form READY!');
    }
  }

  render() {
    const { costPot } = this.props;
    const { errorsSet, submitted } = this.state;

    return (
      <form name="form1" ng-submit="onSubmit(formObj1,'upload'); $event.preventDefault();">
        <div className="create-dataset-filter-form">
          <Typography component="h4" variant="h4" gutterBottom>
                Create Dataset Filter for {costPot}
          </Typography>
          <FormControl aria-describedby="component-error-text" className="row">
            <InputLabel htmlFor="component-error">File Name</InputLabel>
            <Input id="component-error" name="filename" error={submitted && Boolean(errorsSet.filename)} onChange={this.handleChange} />
            {submitted && errorsSet.filename ? <FormHelperText id="component-error-text" error >({submitted && errorsSet.filename})</FormHelperText> : null}
          </FormControl>
          <FormControl aria-describedby="component-error-text" className="row">
            <InputLabel htmlFor="component-error">user Name</InputLabel>
            <Input id="component-error" name="username" error={submitted && Boolean(errorsSet.username)} onChange={this.handleChange} />
            {submitted && errorsSet.username ? <FormHelperText id="component-error-text" error >({submitted && errorsSet.username})</FormHelperText> : null}
          </FormControl>
          <FormControl aria-describedby="component-error-text" className="row">
            <InputLabel htmlFor="component-error">email</InputLabel>
            <Input id="component-error" name="email" error={submitted && Boolean(errorsSet.email)} onChange={this.handleChange} />
            {submitted && errorsSet.email ? <FormHelperText id="component-error-text" error >({submitted && errorsSet.email})</FormHelperText> : null}
          </FormControl>
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
          <RadioButtonsGroup
            actionAll={(value) => { this.setActiveTab(value); }}
            items={
              [
                { label: 'None', value: 'none' },
                { label: 'Match By', value: 'matchby' },
                { label: 'Filter By', value: 'filterby' },
                { label: 'Ratio File', value: 'ratiofile' },
              ]
            }
          />
          <div className="f-body">

            {this.state.value === 'none' ?
              <div className="f-body">
              none section
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
              </div> : null}
            {this.state.value === 'matchby' ? <div className="f-body">two</div> : null}
            {this.state.value === 'filterby' ? <div className="f-body">three</div> : null}
            {this.state.value === 'ratiofile' ? <div className="f-body">four</div> : null}


          </div>
        </div>
        <div className="modal-footer">
          <Button variant="contained" color="primary" className="buttonConfirm" onClick={this.submit} >Create</Button>
          <Button variant="contained" color="primary" className="buttonCancel" onClick={() => { events.emit('CLOSE_MODAL'); }} >Cancel</Button>
        </div>
      </form>
    );
  }
}

DataSetFilterForm.propTypes = {
  costPot: PropTypes.string.isRequired,
};

export default DataSetFilterForm;
