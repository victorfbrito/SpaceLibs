import React from "react";
import { Switch } from "react-router-dom";

import PublicRoute from "./publicRoute";
import PrivateRoute from "./privateRoute";

import HomePage from "~/pages/Home";
import CardPage from "~/pages/Card";
import LoginPage from "~/pages/Login";
import RegisterPage from "~/pages/Register";
import ForgotPasswordPage from "~/pages/ForgotPassword";
import NotFoundPage from "~/pages/NotFound";

import PATHS from "./paths";

const Content = () => (
  <Switch>
    <PrivateRoute path={PATHS.HOME} component={HomePage} exact />
    <PrivateRoute path={PATHS.CARD} component={CardPage} exact />
    <PublicRoute path={PATHS.LOGIN} component={LoginPage} exact />
    <PublicRoute path={PATHS.REGISTER} component={RegisterPage} exact />
    <PublicRoute
      path={PATHS.FORGOT_PASSWORD}
      component={ForgotPasswordPage}
      exact
    />
    <PublicRoute component={NotFoundPage} />
  </Switch>
);

export default Content;
