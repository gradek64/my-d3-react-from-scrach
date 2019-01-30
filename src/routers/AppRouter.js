import React from 'react';
import { Redirect, Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import HomePage from '../pages';
import Login from '../pages/Login/';
import CostModel from '../pages/Admin/CostModels/';
import CostPots from '../pages/Admin/Costpots/';
import FileManagementCostPot from '../pages/Admin/FileManagement/';
import DataSetFilterstCostPot from '../pages/Admin/DataSetFilters/';
import NotFoundPage from '../pages/NotFoundPage/';
import Header from '../pages/pagePartials/Header';
import MainNavBar from '../pages/pagePartials/MainNavBar';
import AuthRoute  from './AuthRoute';
import '../main.scss';

//front-end pages 
import CostOverview from '../pages/front-reports/cost-overview';

//make history available everywhere
export const history = createHistory();
const {location} = history;

// Listen to history changes.
// You can unlisten by calling the constant (`unlisten()`).
/*
  history.listen((location, action) => {

    console.log('routes changes,,,,,');
    console.log('props........', this.props);
    console.log(action, location.pathname, location.state);
  });
*/

export const ProtectedRoutes = (props) => {


  const { params, url} = props.match;

  const allParams = Object.keys(params).length;
  const arr = Object.keys(params).map(i => params[i]);

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
  //*dataset-filters Routes
  if(/admin\/cost-models\/\d+\/costpots\/\d+\/dataset-filters\/?$/.test(url)){
    return <DataSetFilterstCostPot costModelId={params.costModelId} costPotId={params.costPotId}/>;
  }
  //*cost-overview Routes
  if(/cost-overview || cost-overview\/\w+?$/.test(url)){

    //even if the user is on /cost-overview general then redirect it to cost-overview/general-ledger
    if(params.reportName){
      return <CostOverview activeTab={params.reportName} costPotId={params.costPotId}/>;
    }else {
      return <Redirect to={'/cost-overview/general-ledger'} />;
    } 
  }

  if(url.includes('edit')){
    return <HomePage />;
  }

  return  <div> Authorized but page does not exist </div>;
};

const AppRouter = () => (

  <Router history={history}>
    <div className="containerFlex">
      <header>
        <Header />
        {/*show MainNavBar only for non-admin pages*/}
        { /^\/admin\//.test(location.pathname)?null:<MainNavBar />}
       
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
          {/*dataset-filters Routes*/}
          <AuthRoute path="/admin/cost-models/:costModelId/costpots/:costPotId/dataset-filters" exact component={ProtectedRoutes}/>
          {/* front end pages */}
          {<AuthRoute path="/cost-overview/:reportName?" component={ProtectedRoutes} />}
          {/*fallback to login */}
          {<Route path="/login" component={Login} />}
          <Route component={NotFoundPage} />
        </Switch>
      </div>
       
      <footer>this is footer fixed bottom footer</footer>
    </div>
  </Router>
);

export default AppRouter;
