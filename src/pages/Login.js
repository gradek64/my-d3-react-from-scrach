import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fakeAuth } from '../services/fakeAuth';
import Tabs from '../components/tabs';
import Card from '../components/card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addExpense } from '../reduxFiles/actions/expenses';






class Login extends React.Component {
  state = { 
    redirectToReferrer: false,
    loginForm:{
      username:'',
      password:'',
    }
  };
  /*username = React.createRef();
  password = React.createRef();*/

  login = () => {
    let expense = {
      username: 'this.state.description',
      amount: 122,
      createdAt: 'this.state.createdAt.valueOf()',
      note: 'this.state.note'
    };
    // this.props.dispatch(addExpense(expense));

    console.log(this.state);

    /*fakeAuth.authenticate((UserName) => {
      this.setState({ redirectToReferrer: true });
      localStorage.setItem('authenticated','true');

    });*/
  };

  handleInput = (event) => {
    const { name, value  } = event.target;
    this.setState((state)=>{
      return {
        loginForm:{ 
          ...state.loginForm,[name]:value
        }
      };
    });
  }

 

  render() {
    let { from } = this.props.location.state || { from: { pathname: '/' } };
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
                name='username'
                onChange={this.handleInput}

              />
              <TextField
                required
                id="outlined-required"
                label="Password"
                margin="normal"
                variant="outlined"
                name='password'
                onChange={this.handleInput}               

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
                dos
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

//export default Login;
const mapStateToProps = (state) => {

  console.log('store', state);
  return {
    expenses: state.expenses
  };
};
//export default UserLoginDisplay;
export default connect(mapStateToProps)(Login);