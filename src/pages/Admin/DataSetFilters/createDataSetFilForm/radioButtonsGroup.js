import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormLabel from '@material-ui/core/FormLabel';


const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
  group: {
    flexDirection: 'row',
  },
};

class RadioButtons extends React.Component {
  state = {
    value: 'none',
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes, items, actionAll } = this.props;

    return (
      <div className={classes.container}>
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup
            aria-label="Gender"
            name="gender1"
            className={classes.group}
            value={this.state.value}
            onChange={(event) => { this.handleChange(event); actionAll(event.target.value); }}
          >
            {
              items.map(({ label, value }, key) =>
                (
                  <FormControlLabel
                    key={`radio${key}`}
                    value={value}
                    control={<Radio />}
                    label={label}
                  />
                ))
            }

          </RadioGroup>
        </FormControl>

        {
          /* items.map(({label,value,action},key)=>
            (
              <div  key={`radio${key}`}>
                <label>{label}</label>
                <Radio
                  checked={this.state.selectedValue === value}
                  onChange={(event)=>{ this.handleChange(event);action(); }}
                  value={value}
                  classes={{
                    root: classes.root,
                    checked: classes.checked,
                  }}
                  name="radio-button-demo"
                  aria-label={label}
                />
              </div>
            )
          ) */
        }
        {/* <Radio
          checked={this.state.selectedValue === 'a'}
          onChange={this.handleChange}
          value="a"
          name="radio-button-demo"
          aria-label="A"
        />


        <Radio
          checked={this.state.selectedValue === 'b'}
          onChange={this.handleChange}
          value="b"
          name="radio-button-demo"
          aria-label="B"
        />
        <Radio
          checked={this.state.selectedValue === 'c'}
          onChange={this.handleChange}
          value="c"
          name="radio-button-demo"
          aria-label="C"
          classes={{
            root: classes.root,
            checked: classes.checked,
          }}
        />
        <Radio
          checked={this.state.selectedValue === 'd'}
          onChange={this.handleChange}
          value="d"
          color="default"
          name="radio-button-demo"
          aria-label="D"
        />
        <Radio
          checked={this.state.selectedValue === 'e'}
          onChange={this.handleChange}
          value="e"
          color="default"
          name="radio-button-demo"
          aria-label="E"
          icon={<RadioButtonUncheckedIcon fontSize="small" />}
          checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
        /> */}
      </div>
    );
  }
}

RadioButtons.propTypes = {
  classes: PropTypes.instanceOf(Object),
  items: PropTypes.instanceOf(Array),
  actionAll: PropTypes.instanceOf(Function),
};

RadioButtons.defaultProps = {
  classes: {},
  items: [],
  actionAll: () => {},
};

export default withStyles(styles)(RadioButtons);
