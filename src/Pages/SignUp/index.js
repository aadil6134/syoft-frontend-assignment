import React, { useState } from "react";
import logo from "../../components/logo.jpeg";
import image from "../../components/signupImage.png";
import "./index.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [success, setSuccess] = useState({ isSuccess: false, successMsg: "" });
  const [firstName, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ isError: false, errorMsg: "" });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const userDetails = {
      user_firstname: firstName,
      user_email: email,
      user_phone: phone,
      user_password: password,
      user_lastname: "ni",
      user_city: "Hyderabad",
      user_zipcode: "500072",
    };
    const url =
      "https://syoft.dev/Api/user_registeration/api/user_registeration";
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
      setSuccess({ isSuccess: true, successMsg: data.msg });
      console.log(data);
    } else {
      setError({ isError: true, errorMsg: data.msg });
      console.error("error occured: ", data.msg);
    }
  };

  const title = success.isSuccess ? success.successMsg : error.errorMsg;
  const bodyText = success.isSuccess
    ? "New user created successfully. Click on Login to logging in."
    : "User already exists. Try giving new data or login by clicking the Login button.";

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
        <h3 className="text-black">Sign up</h3>
        <p>
          Already have an account?&nbsp; 
          <span>
            <Link to="/login">Sign in</Link>
          </span>
        </p>
        <div className="input-container">
          <label className="input-label" htmlFor="firstName">
            FIRST NAME
          </label>
          <input
            type="text"
            id="firstName"
            className="username-input-field"
            value={firstName}
            onChange={(e) => setName(e.target.value)}
            placeholder="Firstname"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="email">
            EMAIL
          </label>
          <input
            type="text"
            id="email"
            className="username-input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="password-input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="phone">
            PHONE
          </label>
          <input
            type="text"
            id="phone"
            className="username-input-field"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
          />
        </div>
        <button
          type="submit"
          className="login-button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Signup
        </button>
        {/* Modal */}
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  {title}
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">{bodyText}</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <Link to="/login">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Login
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {error.isError && <p className="error-message">*{error.errorMsg}</p>}
      </form>
    </div>
  );
};

export default SignUp;
