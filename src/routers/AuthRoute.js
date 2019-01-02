import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { fakeAuth } from '../services/fakeAuth';
import CostModel from '../pages/Admin/CostModels/';
import HomePage from '../pages';

const AuthRoute = ({ component:Component, ...rest }) => {

  console.log('fakeAuth.isAuthenticated',fakeAuth.isAuthenticated);

  console.log('path',rest);

  return (
    <Route
      {...rest}
      render={
        (props) => {
          console.log('this is not proccessed if route doenst match /admin/:any',props);
          return fakeAuth.isAuthenticated || localStorage.getItem('authenticated') ? (
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

export { AuthRoute };