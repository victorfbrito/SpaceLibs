const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "AUTH_TOKEN":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
