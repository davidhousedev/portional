import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RecipeCreatePage from './recipe-create-page';
import RecipesPage from './recipes-page'
import RecipeDetailPage from './recipe-detail-page';
import TestForm from './test-form-page';

const RootRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={RecipesPage} />
      <Route exact path="/test_form" component={TestForm} />
      <Route exact path="/recipe/create" component={RecipeCreatePage} />
      <Route path="/recipe/:uid" component={RecipeDetailPage} />
    </Switch>
  </Router>
);

export default RootRouter;
