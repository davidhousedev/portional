// Selectors instantiated here will encounter circular import issues
// if contained in more relevant modules.
import { createSelector } from 'reselect';

import { mapRecipeIngredientByMatchRecipeId } from './recipeIngredient';
import { instructionsByMatchRecipeId } from './instruction';
import { recipeByMatchUid } from './recipe';


// return a recipe, with ingredients and instructions ordered by appearance
// in the recipe
//
// Note: This is written as a closure to isolate reselect memoization
//       between multiple components that select different recipes
export const makeGetRecipeDetailByMatchUid = () => (
  createSelector(
    [
      recipeByMatchUid,
      instructionsByMatchRecipeId,
      mapRecipeIngredientByMatchRecipeId,
    ],
    (recipe, instructions, recipeIngredients) => {
      // guard against processing the selector before an async request
      // has completed
      if (!recipe) {
        return {
          recipe: null,
          ingredients: [],
          instructions: [],
        };
      }

      const orderedInstructions = instructions.sort(inst => inst.order);
      // populate a list of ingredient ids that appear within instructions
      const ingredientIds = [].concat(
        ...orderedInstructions.map(inst => inst.ingredients),
        ...recipe.ingredients,
      );
      const uniqueIngredientIds = [...new Set(ingredientIds)];
      const orderedIngredients = uniqueIngredientIds
        .map(ingId => recipeIngredients[ingId]);
      return {
        recipe,
        ingredients: orderedIngredients,
        instructions,
      }
    },
  )
);
