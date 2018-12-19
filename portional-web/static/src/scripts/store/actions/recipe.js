import API from '../api/api'
import { recipeActions } from '../constants/action-types'
import { recipe, recipeList } from '../normalizers';

export const listRecipes = (params = {}) => ({
  types: [
    recipeActions.list.LIST_RECIPES_STARTED,
    recipeActions.list.LIST_RECIPES_SUCCESS,
    recipeActions.list.LIST_RECIPES_ERROR,
  ],
  callApi: () => new API().get('recipes/'),
  schema: recipeList,
});

export const getRecipe = (params = {}) => {
  if (!params.id) {
    throw new Error('You must specify a ID to retrieve a recipe.')
  }

  return {
    types: [
      recipeActions.get.GET_RECIPE_STARTED,
      recipeActions.get.GET_RECIPE_SUCCESS,
      recipeActions.get.GET_RECIPE_ERROR,
    ],
      callApi: () => new API().get(`recipes/${params.id}/`),
    schema: recipe,
  };
};
