import React, { Component } from "react";

import Header from "~/components/header";

import RegisterServer from "~/server/pages/register";

class Register extends Component {
  state = {
    newName: "",
    newEmail: "",
    newPassword: "",
    newPasswordConfirmation: "",
    error: null,
  };

  HandleCreateUser = async (e) => {
    e.preventDefault();

    const user = {
      username: this.state.newName,
      email: this.state.newEmail,
      password: this.state.newPassword,
      password_confirmation: this.state.newPasswordConfirmation,
      error: null,
    };

    const error = await RegisterServer.post(user);
    if (error) {
      this.setState({ error: error });
    } else {
      this.setState({ error: false });
    }
  };

  render() {
    return (
      <>
        <Header />
        <div className="signup-card">
          <form onSubmit={this.HandleCreateUser}>
            <img src="/img/signup.svg" alt="Join us!" />
            <p>Join us in this journey!</p>
            {!!this.state.error && (
              <p class="error">Oops! Something went wrong!</p>
            )}
            <input
              type="name"
              name="name"
              placeholder="Name"
              onChange={(e) => this.setState({ newName: e.target.value })}
              value={this.state.newName}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => this.setState({ newEmail: e.target.value })}
              value={this.state.newEmail}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => this.setState({ newPassword: e.target.value })}
              value={this.state.newPassword}
            />
            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirm password"
              onChange={(e) =>
                this.setState({ newPasswordConfirmation: e.target.value })
              }
              value={this.state.PasswordConfirmation}
            />

            <button type="submit">TAKE OFF</button>

            <div className="formfooter">
              <p>Already a passenger?</p>
              <a href="/login">Login</a>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default Register;
