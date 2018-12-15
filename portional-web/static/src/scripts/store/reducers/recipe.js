import { combineReducers } from 'redux';
import { recipeActions } from '../constants/action-types';

const recipeReducer = (state = {}, action) => {
  console.log(action);
  switch (action.type) {
    case recipeActions.list.LIST_RECIPES_SUCCESS:
      return {
        ...action.payload,
        ...state,
      };
    default:
      return state;
  }
};


export default recipeReducer;
