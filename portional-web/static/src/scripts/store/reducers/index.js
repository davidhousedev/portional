import { combineReducers } from 'redux';
import recipeIngredientReducer from './recipeIngredient';
import recipeReducer from './recipe';
import ingredientReducer from './ingredient';
import instructionReducer from './instruction';

const rootReducer = combineReducers({
  'recipe': recipeReducer,
  'instruction': instructionReducer,
  'recipeIngredient': recipeIngredientReducer,
  'ingredient': ingredientReducer,
});

export default rootReducer;
