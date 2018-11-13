import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import HomePage from '../pages';
import Login from '../pages/Login';
import CostModel from '../pages/Admin/CostModels/';
import CostPots from '../pages/Admin/Costpots/';
import NotFoundPage from '../pages/NotFoundPage/';
import Header from '../pages/pagePartials/Header';
import MainNavBar from '../pages/pagePartials/MainNavBar';
import { AuthRoute } from './AuthRoute';

export const ProtectedRoutes = (props) => {

  const { params, url} = props.match;

  console.log('url',url);
  const allParams = Object.keys(params).length;
  const arr = Object.keys(params).map(i => params[i]);
  const lastParam = arr[allParams-1];

  //cost Models
  if(/admin\/cost-models\/?$/.test(url)){
    return <CostModel />;
  }
  //costPostRoutes
  if(/admin\/cost-models\/\d+\/costpots\/?$/.test(url)){
    return <CostPots costPotId={params.costPotId}/>;
  }

  if(url.includes('edit')){
    return <HomePage />;
  }

  return  <div> Authorized but page does not exist </div>;
};

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <MainNavBar />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <AuthRoute path="/admin/edit/:auth" exact component={ProtectedRoutes}/>
        <AuthRoute path="/admin/cost-models" exact component={ProtectedRoutes}/>
        <AuthRoute path="/admin/cost-models/:costPotId/costpots" exact component={ProtectedRoutes}/>
        <Route path="/login" component={Login} />
        <Route render={() => (<div> Sorry, this page does not exist. </div>)} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
