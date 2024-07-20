import { Component } from "react";
import Cookies from "js-cookie";
import "./index.css";

class LoginPage extends Component {
  state = {
    username: "",
    password: "",
    errorMsg: "",
    showSubmitError: false,
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSuccess = (jwtToken) => {
    const { history } = this.props;

    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/",
    });
    history.replace("/");
  };

  onFailure = (errorMsg) => {
    console.log(errorMsg);
    this.setState({ showSubmitError: true, errorMsg });
  };

  onSubmitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };

    const url = "https://backend-deploy-00m4.onrender.com/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "content-type": "application/json",
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    if (response.ok === true) {
      this.onSuccess(data.jwt_token);
    } else {
      this.onFailure(data.error_msg);
    }
  };

  render() {
    return (
      <div className="app-container">
        <h1>Login Page</h1>
        <form className="form" onSubmit={this.onSubmitForm}>
          <label htmlFor="username" className="label">
            Username
          </label>
          <br />
          <input
            id="username"
            type="text"
            className="input"
            onChange={this.onChangeUsername}
          />
          <br />
          <label htmlFor="password" className="label">
            Password
          </label>
          <br />
          <input
            id="password"
            type="password"
            className="input"
            onChange={this.onChangePassword}
          />
          <br />
          <button type="submit">Sign in</button>
        </form>
      </div>
    );
  }
}

export default LoginPage;
