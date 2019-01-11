import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fakeAuth } from '../../services/fakeAuth';
import Typography from '@material-ui/core/Typography';
import { addExpense } from '../../reduxFiles/actions/expenses';
import LoginForm from './LoginForm/';
import CardCustom from '../../components/card';

import TabsCustom from '../../components/tabs';
import RegisterForm from './RegisterForm/';



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

  login = (form) => {
    let expense = {
      username: 'this.state.description',
      amount: 122,
      createdAt: 'this.state.createdAt.valueOf()',
      note: 'this.state.note'
    };
    // this.props.dispatch(addExpense(expense));

    console.log(form);

    /*fakeAuth.authenticate((UserName) => {
      this.setState({ redirectToReferrer: true });
      localStorage.setItem('authenticated','true');

    });*/
  };

  register = () => {
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
    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <CardCustom  maxWidth={350} center>
        <TabsCustom value={0} tabs={[
          {label:'Login', href:'login'},
          {label:'Register', href:'register'},
        ]} style={{backgroundColor:'white'}}>
          {/*tabs children below*/}
          {<div style={{flexDirection:'column',display:'flex'}}>
            <LoginForm submitCallback={this.login} />
          </div>}
          {/*tabs children below*/}
          {<div style={{flexDirection:'column',display:'flex'}}>
            <RegisterForm submitCallback={this.register} />
          </div>}
        </TabsCustom>
      </CardCustom>
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