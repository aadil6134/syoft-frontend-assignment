import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../components/logo.jpeg";
import image from "../../components/3094352.jpg";
import Cookies from "js-cookie";
import "./index.css";

const Login = () => {
  const navigate = useNavigate();
  const [user_email, setEmail] = useState("");
  const [user_password, setPassword] = useState("");
  const [error, setError] = useState({ isError: false, errorMsg: "" });
  const renderPasswordField = () => {
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={user_password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </>
    );
  };

  const renderUsernameField = () => {
    return (
      <>
        <label className="input-label" htmlFor="username">
          EMAIL
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={user_email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </>
    );
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const userDetails = { user_email, user_password };
    const url = "https://syoft.dev/Api/userlogin/api/userlogin";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.status) {
      const userData = JSON.stringify(data.user_data)
      Cookies.set("user_data", userData, { expires: 30 });
      navigate("/");
    } else {
      setError({ isError: true, errorMsg: data.msg });
      console.error("error occured: ", data.msg);
    }
  };

  return (
    <div className="login-form-container">
      <img
        src={logo}
        className="login-website-logo-mobile-img"
        alt="website logo"
      />
      <img src={image} className="login-img" alt="website login" />
      <form className="form-container" onSubmit={onSubmitForm}>
        <img
          src={logo}
          className="login-website-logo-desktop-img"
          alt="website logo"
        />
        <h3 className="text-black">Sign in</h3>
        <p>
          Don't have an account?&nbsp;
          <span>
            <Link to="/register">Sign up</Link>
          </span>
        </p>
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderPasswordField()}</div>
        <button type="submit" className="login-button">
          Login
        </button>
        {error.isError && <p className="error-message">*{error.errorMsg}</p>}
      </form>
    </div>
  );
};

export default Login;
