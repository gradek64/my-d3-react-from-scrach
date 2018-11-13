import React from 'react';
import { Redirect } from "react-router-dom";
import { fakeAuth } from '../services/fakeAuth';
import Tabs from '../components/tabs';
import Card from '../components/card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';




class Login extends React.Component {
  state = { redirectToReferrer: false };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;
    const value = 0;
    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div>
        <Card maxWidth={350} center>
          <Tabs value={0} tabs={[
               {label:'Login', href:'login'},
               {label:'Register', href:'register'},
            ]} style={{backgroundColor:'white'}}>
              {/*tabs children below*/}
              {<div style={{flexDirection:'column',display:'flex'}}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Login"
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Password"
                    margin="normal"
                    variant="outlined"
                  />
                  <Button variant="contained" color="primary" onClick={this.login}>
                    Login
                  </Button>
              </div>}
              {<div style={{flexDirection:'column',display:'flex'}}>

                    <TextField
                      required
                      id="outlined-required"
                      label="UserName"
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Password"
                      margin="normal"
                      variant="outlined"
                    />
                    <Button variant="contained" color="primary">
                    Register
                    </Button>
                </div>}
            </Tabs>
        </Card>
      </div>
    );
  }
}

export default Login;