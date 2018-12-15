import API from '../api/api'
import { recipeActions } from '../constants/action-types'
import { recipeList } from '../normalizers';

export const listRecipes = (params = {}) => ({
  types: [
    recipeActions.list.LIST_RECIPES_STARTED,
    recipeActions.list.LIST_RECIPES_SUCCESS,
    recipeActions.list.LIST_RECIPES_ERROR,
  ],
  callApi: () => new API().get('recipes/'),
  schema: recipeList,
});
