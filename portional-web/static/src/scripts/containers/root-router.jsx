import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RecipesPage from './recipes-page'
import RecipeDetailPage from './recipe-detail-page';

const RootRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={RecipesPage} />
      <Route path="/recipe/:uid" component={RecipeDetailPage} />
    </Switch>
  </Router>
);

export default RootRouter;
