import { createSelector } from 'reselect';
import { recipeByMatchUid } from './recipe';
import { makeGetInstructionsByMatchUid } from './instruction';
import { mapById } from './common';

const recipeIngredients = state => state.recipeIngredient;
export const recipeIngredientsByMatchRecipeId = createSelector(
  [recipeIngredients, recipeByMatchUid],
  (recIngs, rec) => rec
    ? (rec.ingredients.map(ingId => recIngs[ingId]))
    : null,
);

export const mapRecipeIngredientByMatchRecipeId = mapById(recipeIngredientsByMatchRecipeId);
