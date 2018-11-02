import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import HomePage from '../pages';
import CostModel from '../pages/Admin/CostModel';
import NotFoundPage from '../pages/NotFoundPage/';
import Header from '../pages/pagePartials/Header';
import MainNavBar from '../pages/pagePartials/MainNavBar';


const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <MainNavBar />
            <Switch>
                <Route path="/" component={HomePage} exact={true} />
                <Route path="/costModels" component={CostModel} />
                <Route path="/edit/:id" component={CostModel} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
