import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fakeAuth } from '../../services/fakeAuth';
import Typography from '@material-ui/core/Typography';
import { logUser } from '../../reduxFiles/actions/userAuth_actions';
import LoginForm from './LoginForm/';
import CardCustom from '../../components/card';

import TabsCustom from '../../components/tabs';
import RegisterForm from './RegisterForm/';



class Login extends React.Component {
  state = { 
    redirectToReferrer: false,
    authenticationCallback:null,
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
    // this.props.dispatch(logUser(expense));

    const authenticateResponse = fakeAuth.authenticate(form);
    authenticateResponse.then((res)=>{
      const {username} = res.data;
      //is approved;
      if(username){
        this.setState({ redirectToReferrer: true });
        localStorage.setItem('usernameAuth',username);
        //update userdisplay name in navbar 
        this.props.dispatch(logUser(username));
      }
      //not approved;
      else {
        this.setState({
          authenticationCallback:'System doesn`t recognize You, try again...'
        });

      }
    });
    /*
    (UserName) => {
          this.setState({ redirectToReferrer: true });
          localStorage.setItem('authenticated','true');

        });
    */
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

  currentTabCallback = (tab) =>{
    const {value} = tab;
    if(value===1){
      this.setState({
        authenticationCallback:null
      });
    }
  }

  render() {
    let { from } = this.props.location.state || { from: { pathname: '/' } };
    let { redirectToReferrer, authenticationCallback } = this.state;
    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <CardCustom  maxWidth={350} center>
        <TabsCustom 
          value={0} 
          tabs={[
            {label:'Login', href:'login'},
            {label:'Register', href:'register'},
          ]} 
          style={{backgroundColor:'white'}}
          currentTabCallback={this.currentTabCallback}
        >
          {/*tabs children below*/}
          {<div style={{flexDirection:'column',display:'flex'}}>
            <LoginForm submitCallback={this.login} authenticationCallback={authenticationCallback}/>
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