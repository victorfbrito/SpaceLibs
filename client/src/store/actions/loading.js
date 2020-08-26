export const startLoading = () => ({
    type: 'LOADING_START',
  });
  
  export const stopLoading = () => ({
    type: 'LOADING_END',
  });
  
  export const addLoading = () => dispatch => dispatch(startLoading());
  
  export const removeLoading = () => dispatch => dispatch(stopLoading());