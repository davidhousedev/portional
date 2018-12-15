import { combineReducers } from 'redux';
import recipeReducer from './recipe';

const rootReducer = combineReducers({
  'recipes': recipeReducer,
});

export default rootReducer;
