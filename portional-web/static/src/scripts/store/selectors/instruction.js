import { createSelector } from 'reselect';

import { recipeByMatchUid } from './recipe';

const instructions = state => state.instruction;
export const instructionsByMatchRecipeId = createSelector(
  [instructions, recipeByMatchUid],
  (insts, recipe) => (recipe === undefined
    ? null
    : recipe.instructions
      .map(instId => insts[instId])
      .sort(inst => inst.order)
  ),
);
