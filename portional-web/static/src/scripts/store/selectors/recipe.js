import { createSelector } from 'reselect';

const recipesState = state => state.recipe;
export const recipeByMatchUid = (state, props) => state.recipe[props.match.params.uid];

const currentRecipeIds = state => Object.values(state.recipe).map(recipe => recipe.uid);

export const currentRecipes = createSelector(
  [ recipesState, currentRecipeIds ],
  (recipes, ids) => ids.map(id => recipes[id]),
);
