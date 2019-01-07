import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';


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
    select: '',
    open: false,
    hasError:false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { label, options, validate, error } = this.props;

    return (
      <FormControl className='textfield'>
        <InputLabel htmlFor="demo-controlled-open-select">{label}</InputLabel>
        <Select
          open={this.state.open}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          error={Boolean(error)}
          value={this.state.select}
          name='select'
          onChange={(e)=>{this.handleChange(e); validate(e);}}
          inputProps={{
            name: 'select',
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
        {error?<FormHelperText error>({error})</FormHelperText>:null}
      </FormControl>
    );
  }
}

ControlledOpenSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledOpenSelect);