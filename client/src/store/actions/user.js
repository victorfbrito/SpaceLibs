export const saveUserDispatch = (user) => ({
    type: 'SAVE_USER',
    payload: user
  });
  
export const saveUser = (user) => dispatch => dispatch(saveUserDispatch(user));
  