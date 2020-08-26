import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  console.log("isAuthenticated: ", isAuthenticated);
  return (
    <>
      <Route
        {...rest}
        component={(props) =>
          // isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
          localStorage.getItem("auth") ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated:
    state && state.auth && state.auth.data && state.auth.data.token,
  //state && state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
