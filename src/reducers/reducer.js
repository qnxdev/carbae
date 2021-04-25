export default (state, action) => {
  switch (action.type) {
    case "cars":
      return {
        cars: action.payload,
      };
    default:
      return state;
  }
};
