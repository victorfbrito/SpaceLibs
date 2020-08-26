import React, { Component } from "react";

import Header from "~/components/header";

import ForgotPasswordServer from "~/server/pages/forgotpassword";

class ForgotPassword extends Component {
  state = {
    token: "",
    password: "",
    password_confirmation: "",
    Email: "",
    Inputbox: false,
    FormError: null,
    TokenError: null,
  };

  HandleSendEmail = async (e) => {
    e.preventDefault();

    const email = {
      email: this.state.Email,
    };

    const error = await ForgotPasswordServer.send(email);
    if (error) {
      this.setState({ FormError: error });
    } else {
      this.setState({ FormError: false });
    }
  };

  HandleChangePassword = async (e) => {
    e.preventDefault();

    const data = {
      token: this.state.token,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
    };

    const error = await ForgotPasswordServer.post(data);
    if (error) {
      this.setState({ TokenError: error });
    } else {
      this.setState({ TokenError: false });
    }
  };

  render() {
    return (
      <>
        <Header />
        {this.state.Inputbox && (
          <>
            <div className="Background" />
            <div className="Container">
              <form onSubmit={this.HandleChangePassword}>
                <input
                  name="token"
                  placeholder="Token"
                  value={this.state.token}
                  onChange={(e) => this.setState({ token: e.target.value })}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="New Password"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                <input
                  type="password"
                  name="password_confirmation"
                  placeholder="Password confirmation"
                  value={this.state.password_confirmation}
                  onChange={(e) =>
                    this.setState({ password_confirmation: e.target.value })
                  }
                />
                {!!this.state.TokenError && (
                  <p class="error">
                    Check if token/password confirmation are correct
                  </p>
                )}
                <div className="Buttons">
                  <button
                    className="delete"
                    type="button"
                    onClick={(e) => this.setState({ Inputbox: false })}
                  >
                    CANCEL
                  </button>
                  <button type="submit">CONFIRM</button>
                </div>
              </form>
            </div>
          </>
        )}
        <div className="forgotpassword-card">
          <form onSubmit={this.HandleSendEmail}>
            <img src="/img/recover.svg" alt="Universe" />
            {!!this.state.FormError ? (
              <p class="error">Oops! This e-mail is not registered</p>
            ) : (
              <p>We will send you an e-mail with a recovery token</p>
            )}
            <input
              type="email"
              name="email"
              placeholder="your e-mail"
              onChange={(e) => this.setState({ Email: e.target.value })}
              value={this.state.Email}
            />

            <button type="submit">SEND EMAIL</button>
            <button
              className="tokenbutton"
              type="button"
              onClick={(e) => this.setState({ Inputbox: true })}
            >
              I HAVE A TOKEN
            </button>
            <p className="forgot">
              or{" "}
              <a href="/login">
                <strong>Login</strong>
              </a>
            </p>
          </form>
        </div>
      </>
    );
  }
}

export default ForgotPassword;
