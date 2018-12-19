import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import shortid from 'shortid';
import { Link } from 'react-router-dom';
import { currentRecipes } from '../store/selectors/recipe';
import { listRecipes } from '../store/actions/recipe';

class RecipesPage extends React.Component {

  componentDidMount() {
    this.props.listRecipes()
  }

  render() {
    const recipes = this.props.recipes.map(recipe => (
      <div className="recipe-card" key={shortid.generate()}>
        <Link to={`/recipe/${recipe.uid}/`}>
          <Typography component="h3" variant="h3" gutterBottom>{recipe.name}</Typography>
        </Link>
      </div>
    ));

    return (
      <div className="recipes-page">
        <Typography component="h1" variant="h1" gutterBottom>
          Recipes Page
        </Typography>
        {recipes}
        <Button variant="contained" color="primary">Hi</Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: currentRecipes(state),
});

const mapDispatchToProps = dispatch => ({
  listRecipes: () => dispatch(listRecipes()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(RecipesPage)
);
