import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fakeAuth } from '../../services/fakeAuth';
import Typography from '@material-ui/core/Typography';
import { logUser, logUserByGoogle, logOutByGoogle } from '../../reduxFiles/actions/userAuth_actions';
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

  login = (form,authProvider='internal') => {
    let expense = {
      username: 'this.state.description',
      amount: 122,
      createdAt: 'this.state.createdAt.valueOf()',
      note: 'this.state.note'
    };
    // this.props.dispatch(logUser(expense));

    const authenticateResponse = fakeAuth.authenticate(form, authProvider);
    authenticateResponse.then((res)=>{
      const {username,byProvider} = res.data;
      //is approved;
      if(username){
        localStorage.setItem('usernameAuth',username);
        //update userdisplay name in navbar 
        console.log(typeof username);
        console.log('byProvider',byProvider);
        this.props.loginUser(username, byProvider);
        this.setState({ redirectToReferrer: true });
        console.log('here');
      }
      //not approved;
      else {
        this.setState({
          authenticationCallback:'System doesn`t recognize You, try again...'
        });

      }
    });
  };

  logOutByGoogle = () => {
    this.props.logOutByGoogle();
  }

  register = () => {
    //to be done;
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

  customAligment = () => {
    return {
      display:'flex',
      flexDirection:'column',
      minHeight:'300px',
      justifyContent:'space-between'
    };
  }


  render() {
    let { from } = this.props.location.state || { from: { pathname: '/' } };
    let { redirectToReferrer, authenticationCallback } = this.state;

    console.log('from route', from );
    if (redirectToReferrer) return <Redirect to={from} />;

   

    return (
      <CardCustom  /*maxWidth={350}*/ center >
        <div style={this.customAligment()}>
          <TabsCustom 
            value={0} 
            tabs={[
              {label:'Logins', href:'login'},
              {label:'Register', href:'register'},
              {label:'Social Media Login', href:'social_media_login'},
            ]} 
            style={{backgroundColor:'pink'}}
            currentTabCallback={this.currentTabCallback}
          >
            {/*tabs children below*/}
            {<div style={{marginBottom:'70px'}}>
              <LoginForm submitCallback={this.login} authenticationCallback={authenticationCallback}/>
            </div>}
            {/*tabs children below*/}
            {<div>
              <RegisterForm submitCallback={this.register} />
            </div>}
            {/*tabs children below*/}
            {<div>
              <div onClick={ ()=>{this.login({empty:'empty'},'gmail'); }} >log in google</div>
              <div onClick={ ()=>{this.login({empty:'empty'},'facebook');} } >log in facebook</div>
              <div onClick={ this.logOutByGoogle } >log out</div>
            </div>}
          </TabsCustom>
        </div>
      </CardCustom>
    );
  }
}

//export default Login;
const mapDispathToProps = (dispatch) => ({
  //this needs double function since it is jsut assigment
  loginUser: (username, byProvider)=>dispatch(logUser(username, byProvider)),
  logUserByGoogle: ()=>dispatch(logUserByGoogle()),
  logOutByGoogle: ()=>dispatch(logOutByGoogle())
});
//export default UserLoginDisplay;
export default connect(undefined,mapDispathToProps)(Login);