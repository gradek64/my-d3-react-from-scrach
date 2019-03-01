import React from 'react';
/* import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden'; */
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';

import events from '../../../../utils/events';
// import DropDownSelect from '../../../../components/selectDropdown';
import { validationRules } from './createCostModelValidationRules';
import './createCostModelForm.scss';


class UpdateCostModelForm extends React.Component {
  state = {
    submitted: false,
    value: 'costModelNameSelected',
    fields: {
      costModelName: null,
    },
    errorsSet: {
      costModelName: '',
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
      *@to update state based on multiple cycle you need
      *@use callback to not SKIP other object properties
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
      const { costModelName } = this.state.fields;

      const objectCreate = {
        name: costModelName,
      };
      this.props.onSubmit(objectCreate);
    }
  }

  render() {
    const { errorsSet, submitted, value } = this.state;
    const { selectDropdownDataFixed } = this.props;


    return (
      <form name="form1" className="file-upload-form">
        <div className="modal-content">
          <div className="f-body">
            <div className="input-field row">
              <FormControl className="row">
                <InputLabel htmlFor="name-readonly">CostModel Name</InputLabel>
                <Select
                  value={value}
                  input={<Input name="name-readonly-CM" id="name-readonly" readOnly />}
                >
                  <MenuItem value="fetete4t">
                    <em>gertgret4</em>
                  </MenuItem>
                  <MenuItem value="costModelNameSelected">{selectDropdownDataFixed}</MenuItem>
                </Select>
              </FormControl>
            </div>
            <FormControl aria-describedby="component-error-text" className="row">
              <InputLabel htmlFor="component-error">CostModel Name</InputLabel>
              <Input id="component-costModelName" name="costModelName" error={submitted && Boolean(errorsSet.costModelName)} onChange={this.handleChange} />
              {submitted && errorsSet.costModelName ? <FormHelperText id="component-error-text" error >({submitted && errorsSet.costModelName})</FormHelperText> : null}
            </FormControl>
          </div>
        </div>
        <div className="modal-footer">
          <Button variant="contained" color="primary" className="buttonConfirm" onClick={this.submit} >Update</Button>
          <Button variant="contained" color="primary" className="buttonCancel" onClick={() => { events.emit('CLOSE_MODAL'); }} >Cancel</Button>
        </div>
      </form>
    );
  }
}

UpdateCostModelForm.propTypes = {
  selectDropdownDataFixed: PropTypes.instanceOf(Array),
  onSubmit: PropTypes.instanceOf(Function),
};

UpdateCostModelForm.defaultProps = {
  selectDropdownDataFixed: [],
  onSubmit: () => {},
};

export default UpdateCostModelForm;
