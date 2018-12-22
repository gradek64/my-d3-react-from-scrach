import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import HomePage from '../pages';
import Login from '../pages/Login';
import CostModel from '../pages/Admin/CostModels/';
import CostPots from '../pages/Admin/Costpots/';
import FileManagementCostPot from '../pages/Admin/FileManagement/';
import NotFoundPage from '../pages/NotFoundPage/';
import Header from '../pages/pagePartials/Header';
import MainNavBar from '../pages/pagePartials/MainNavBar';
import { AuthRoute } from './AuthRoute';
import '../main.scss';
export const ProtectedRoutes = (props) => {

  console.log('start route......');

  const { params, url} = props.match;

  console.log('url',url);
  const allParams = Object.keys(params).length;
  const arr = Object.keys(params).map(i => params[i]);
  const lastParam = arr[allParams-1];

  //*cost Models
  if(/admin\/cost-models\/?$/.test(url)){
    return <CostModel />;
  }
  //*costPostRoutes
  if(/admin\/cost-models\/\d+\/costpots\/?$/.test(url)){
    return <CostPots costModelId={params.costModelId}/>;
  }
  //*file-management Routes
  if(/admin\/cost-models\/\d+\/costpots\/\d+\/file-management\/?$/.test(url)){
    return <FileManagementCostPot costModelId={params.costModelId} costPotId={params.costPotId}/>;
  }

  if(url.includes('edit')){
    return <HomePage />;
  }

  return  <div> Authorized but page does not exist </div>;
};

const AppRouter = () => (

  <BrowserRouter>
    <div className="containerFlex">
      <header>
        <Header />
        <MainNavBar />
      </header>
      
      <div className="content"> 
        <Switch>
          <Route path="/" component={HomePage} exact={true} />
          {/*edit routes */}
          <AuthRoute path="/admin/edit/:auth" component={ProtectedRoutes}/>
          {/*cost Models*/}
          <AuthRoute path="/admin/cost-models" exact component={ProtectedRoutes}/>
          {/*costPost Routes*/}
          <AuthRoute path="/admin/cost-models/:costModelId/costpots" exact component={ProtectedRoutes}/> 
          {/*file-manangement Routes*/}
          <AuthRoute path="/admin/cost-models/:costModelId/costpots/:costPotId/file-management" exact component={ProtectedRoutes}/>
          {/*fallback to login */}
          {<Route path="/login" component={Login} />}
          <Route component={NotFoundPage} />
        </Switch>
      </div>
       
      <footer>this is footer fixed bottom footer</footer>
    </div>
  </BrowserRouter>
);

export default AppRouter;
