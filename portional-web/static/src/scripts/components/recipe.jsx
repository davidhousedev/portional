import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import shortid from 'shortid';

const Recipe = ({ recipe, instructions, ingredients }) => {
  const domIngredients = ingredients.map(ingredient => (
    <div className="recipe-ingredient" key={shortid.generate()}>
      <Typography component="p" variant="body1">{ingredient.ingredient}</Typography>
    </div>
  ));

  const domInstructions = instructions.map(instruction => (
    <div className="recipe-ingredient" key={shortid.generate()}>
      <Typography component="p" variant="body1">{instruction.text}</Typography>
    </div>
  ));

  return (
    <div className="recipe">
      <Typography component="h1" variant="h1" gutterBottom>{recipe.name}</Typography>
      <Typography component="h2" variant="h2" gutterBottom>Ingredients</Typography>
      {domIngredients}
      <Typography component="h2" variant="h2" gutterBottom>Instructions</Typography>
      {domInstructions}
    </div>
  );
};

Recipe.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default Recipe;
