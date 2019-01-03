import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Schema from 'validate';
const user = new Schema({
  username: {
    required: true
  }
});

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width:'100%',
  },
});

class ControlledOpenSelect extends React.Component {
  state = {
    age: '',
    open: false,
    hasError:false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    let obj = {username:event.target.value};
    const errors = user.validate(obj);

    if(errors.length>0){
      this.setState({hasError:true});
    }else {
      this.setState({hasError:false});
    }


  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { label, options, classes } = this.props;

    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="demo-controlled-open-select">{label}</InputLabel>
        <Select
          open={this.state.open}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          error={this.state.hasError}
          value={this.state.age}
          onChange={this.handleChange}
          inputProps={{
            name: 'age',
            id: 'demo-controlled-open-select',
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            options.map(({value,optionName},i)=><MenuItem key={`option${i}`} value={value}>{optionName}</MenuItem>) 
          }
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>*/}
        </Select>
        {this.state.hasError?<FormHelperText error>You can display an error</FormHelperText>:null}
      </FormControl>
    );
  }
}

ControlledOpenSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledOpenSelect);