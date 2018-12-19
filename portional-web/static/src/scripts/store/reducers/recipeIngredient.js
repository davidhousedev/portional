const recipeIngredientReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      if (action.entities && action.entities.recipeIngredient) {
        return {
          ...action.entities.recipeIngredient,
          ...state,
        };
      }
      return state;
  }
};

export default recipeIngredientReducer;
