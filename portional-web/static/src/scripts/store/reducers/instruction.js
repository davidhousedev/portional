const instructionReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      if (action.entities && action.entities.instruction) {
        return {
          ...action.entities.instruction,
          ...state,
        };
      }
      return state;
  }
};

export default instructionReducer;
