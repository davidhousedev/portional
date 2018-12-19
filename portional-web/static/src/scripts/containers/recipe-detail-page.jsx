import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Recipe from '../components/recipe';
import { makeGetRecipeDetailByMatchUid } from '../store/selectors/compositions';
import { getRecipe } from '../store/actions/recipe';

class RecipeDetailPage extends React.Component {
  componentDidMount() {
    // Retrieve this recipe if it is not already in state
    if (!this.props.recipe) {
      this.props.getRecipe(this.props.match.params.uid);
    }
  }

  render() {
    const {
      recipe,
      instructions,
      ingredients,
    } = this.props;

    if (!recipe) {
      return null;
    }
    return <Recipe recipe={recipe} instructions={instructions} ingredients={ingredients} />
  }
}

RecipeDetailPage.defaultProps = {
  recipe: undefined,
  instructions: [],
  ingredients: [],
};

RecipeDetailPage.propTypes = {
  recipe: PropTypes.object,
  instructions: PropTypes.array,
  ingredients: PropTypes.array,
  getRecipe: PropTypes.func.isRequired,
};

const makeMapStateToProps = () => {
  const getRecipeById = makeGetRecipeDetailByMatchUid();
  const mapStateToProps = (state, props) => {
    const {
      recipe,
      ingredients,
      instructions,
    } = getRecipeById(state, props);
    return {
      recipe,
      ingredients,
      instructions,
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
  getRecipe: (id) => dispatch(getRecipe({ id })),
});

export default withRouter(
  connect(
    makeMapStateToProps,
    mapDispatchToProps
  )(RecipeDetailPage)
);
