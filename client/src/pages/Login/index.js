import React, { Component } from "react";

import Header from "~/components/header";
import { history } from "~/router";

import LoginServer from "~/server/pages/login";

class Login extends Component {
  state = {
    Email: "",
    Password: "",
    error: false,
  };

  HandleCreateSession = async (e) => {
    e.preventDefault();

    const session = {
      email: this.state.Email,
      password: this.state.Password,
    };

    const result = await LoginServer.post(session);
    if (result) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
      history.push("/");
    }
  };

  render() {
    return (
      <>
        <Header />
        <div className="space_background"></div>
        <div className="login-card">
          <form onSubmit={this.HandleCreateSession}>
            <img src="/img/universelogo.svg" alt="Universe" />
            <p>
              Build your <strong>own</strong> space library!
            </p>
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={(e) => this.setState({ Email: e.target.value })}
              value={this.state.Email}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={(e) => this.setState({ Password: e.target.value })}
              value={this.state.Password}
            />
            {this.state.error && (
              <p className="error"> check your email/password</p>
            )}

            <button type="submit">TAKE OFF</button>
            <p className="forgot">
              Are you a new passenger?{" "}
              <a href="/register">
                <strong>Create account</strong>
              </a>
            </p>
            <p>
              <a href="/forgotpassword">
                <strong>Forgot password</strong>
              </a>
            </p>
          </form>
        </div>
      </>
    );
  }
}

export default Login;
