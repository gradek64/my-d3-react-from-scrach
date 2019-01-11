import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fakeAuth } from '../services/fakeAuth';
import CostModel from '../pages/Admin/CostModels/';
import HomePage from '../pages';

const AuthRoute = ({ component:Component, ...rest }) => {

  /*console.log('fakeAuth.isAuthenticated',fakeAuth.isAuthenticated);
  console.log('path',rest);*/

  console.log('...rest',rest);

  return (
    <Route
      {...rest}
      render={
        (props) => {
          console.log('this is not proccessed if route doenst match /admin/:any',props);
          //return fakeAuth.isAuthenticated || localStorage.getItem('authenticated') ? (
          return  localStorage.getItem('usernameAuth') ? (
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

  console.log('store UserLoginDisplay AuthRoute', state);
  return {
    userNameRedux: state.user.username,
  };
};
export default connect(mapStateToProps)(AuthRoute);
export { AuthRoute };