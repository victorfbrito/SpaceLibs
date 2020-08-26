export default (state = 0, action) => {
    switch (action.type) {
      case 'SAVE_USER':
        return {
            ...state,
            data: action.payload
        }
      default:
        return state;
    }
  };
  