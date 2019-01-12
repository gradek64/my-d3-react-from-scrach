import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fakeAuth } from '../services/fakeAuth';
import CostModel from '../pages/Admin/CostModels/';
import HomePage from '../pages';

const AuthRoute = ({ component:Component, ...rest }) => {


  const { userNameRedux } = rest;

  console.log('...rest',rest);

  return (
    <Route
      {...rest}
      render={
        (props) => {
          console.log('this is not proccessed if route doenst match /admin/:any',props);

          /*
            *@there 2 ways to detect if cookie/localstoragte is set 
            *@Aproach I took is check it in redux store rather than harsly chekcig this localStorage.getItem('usernameAuth');
            *@reason for that everting happnes in one file (authreducer) so if you want use cookies or anything you would change there in one place !
          */
          //return localStorage.getItem('usernameAuth') ? (
          return  userNameRedux ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          );
        }}
    />
  );
};


const mapStateToProps = (state) => {
  return {
    userNameRedux: state.user.username,
  };
};
//if it is conncected to redux store it needs be exported as default;
export default connect(mapStateToProps)(AuthRoute);
//export { AuthRoute };