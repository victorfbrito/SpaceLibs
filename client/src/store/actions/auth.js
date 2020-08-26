export const saveAuthToken = (data) => ({
  type: "AUTH_TOKEN",
  payload: data,
});

export const saveSession = (data) => (dispatch) =>
  dispatch(saveAuthToken(data));
