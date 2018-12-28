import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import recipeIngredientReducer from './recipeIngredient';
import recipeReducer from './recipe';
import ingredientReducer from './ingredient';
import instructionReducer from './instruction';

const rootReducer = combineReducers({
  recipe: recipeReducer,
  instruction: instructionReducer,
  recipeIngredient: recipeIngredientReducer,
  ingredient: ingredientReducer,
  form: formReducer,
});

export default rootReducer;
