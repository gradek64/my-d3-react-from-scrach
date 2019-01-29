import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fakeAuth } from '../../services/fakeAuth';
import Typography from '@material-ui/core/Typography';




class CostOverview extends React.Component {
  state = { 
    redirectToReferrer: false,
    authenticationCallback:null,
  };
  /*username = React.createRef();
  password = React.createRef();*/

  login = (form,authProvider='internal') => {
   
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
    return (
      <div>this is CostOverview</div>
    );
  }
}

export default CostOverview;
