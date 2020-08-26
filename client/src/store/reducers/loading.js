export default (state = 0, action) => {
    switch (action.type) {
      case 'LOADING_START':
        return state + 1;
      case 'LOADING_END':
        return state - 1;
      default:
        return state;
    }
  };
  