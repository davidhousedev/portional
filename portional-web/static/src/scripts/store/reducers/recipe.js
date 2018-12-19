const recipeReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      if (action.entities && action.entities.recipe) {
        return {
          ...action.entities.recipe,
          ...state,
        };
      }
      return state;
  }
};

export default recipeReducer;
