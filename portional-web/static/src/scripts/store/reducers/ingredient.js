const ingredientReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      if (action.entities && action.entities.ingredient) {
        return {
          ...action.entities.ingredient,
          ...state,
        };
      }
      return state;
  }
};

export default ingredientReducer;
