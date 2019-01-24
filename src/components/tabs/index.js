import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';



function LinkTab(props) {
  return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

const styles = theme => ({
  
});

class NavTabs extends React.Component {
  state = {
    value: this.props.value,
  };

  handleChange = (event, value) => {
    this.setState({ value });
    //send it to parent for current tab
    this.props.currentTabCallback({value});
  };

  render() {
    const { classes, tabs  } = this.props;
    const { value } = this.state;

    return (
      <NoSsr>
        <AppBar position="static" color={'default'}>
          <Tabs fullWidth value={value} onChange={this.handleChange}>
            {tabs.map(({label,href},i) => 
              <LinkTab key={`tab${i}`}label={label} href={href} />)
            }              
          </Tabs>
        </AppBar>
        {<div>
          {this.props.children[value]}
        </div>
        }
      </NoSsr>
    );
  }
}

NavTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTabs);
