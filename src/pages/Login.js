import "./Login.css";
import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/myfirebase";
import Logo from "../icons/Logo";

const validateForm = yup.object().shape({
  email: yup.string().email("Invalid email address").required(),
  password: yup.string().required(),

  checkbox: yup.boolean().oneOf([true], "Must check the box").required(),
});

function Login() {
  const navigate = useNavigate();
  const navigateToSignUpPage = () => {
    navigate("/SignUp");
  };
  // const navigateToHomePage = () => {
  //   navigate("/HomePage");
  // };

  const [formValues, setFormValues] = useState({
    password: "",
    email: "",
    checkbox: "",
  });

  const [formErrors, setFormErrors] = useState({
    checkbox: true,
    email: "",
    password: "",
    required: "",
  });

  const emailCheck =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

  const handleCheckBox = (e) => {
    yup
      .reach(validateForm, e.target.name)
      .validate(e.target.checked)
      .then((res) => {
        setFormErrors({ ...formErrors, [e.target.name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [e.target.name]: err.message });
      });
    setFormValues({ ...formValues, checkbox: e.target.checked });
  };

  const handleInput = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    yup
      .reach(validateForm, name)
      .validate(value)
      .then((res) => {
        setFormValues({ ...formValues, [name]: value });
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.message });
      });

    setFormValues({ ...formValues, [name]: value });
  };

  const handleLogin = async (e) => {
    if (
      // checks if any inputs are empty
      formValues.email === "" ||
      formValues.password === "" ||
      formValues.checkbox === false
    ) {
      setFormErrors({ ...formErrors, required: "All inputs must be required" });
    } else if (
      // checks if there is any errors
      formErrors.email !== "" ||
      formErrors.password !== "" ||
      formErrors.checkbox !== ""
    ) {
      setFormErrors({ ...formErrors, required: "All error must be cleared" });
    } else {
      setFormErrors({ ...formErrors, required: "" });
      await signInWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      )
        .then((response) => {
          console.log(response);
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
          setFormErrors({ ...formErrors, required: error.message });
        });
    }
  };

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        setFormErrors({ ...formErrors, required: error.message });
      });
  };

  return (
    <div id="container">
      <Header />
      <div id="title">Welcome <Logo/> </div>

      <div id="inputContainer">
        <div className="inputNames">Email address</div>
        <input
          className="inputs"
          value={formValues.email}
          placeholder="Enter your email address"
          onChange={handleInput}
          name="email"
        />
        <div id="notification">{formErrors.email}</div>

        <div className="inputNames">
          Password
        </div>

        <input
          type="password"
          className="inputs"
          value={formValues.password}
          placeholder="Enter your password"
          onChange={handleInput}
          name="password"
        />
        <div id="notification">{formErrors.password}</div>
      </div>
      <div id="policyContainer">
        <input
          type="checkbox"
          checked={formValues.checkbox}
          onChange={handleCheckBox}
          name="checkbox"
        />
        <div>Remember for 30 days</div>
      </div>
      <div id="notification">{formErrors.checkbox}</div>
      <div id="notification">{formErrors.required}</div>
      <button id="signupButton" onClick={handleLogin}>
        Login
      </button>
      <div style={{ fontSize: "12px" }}>
       
        ~~~~~~~~or~~~~~~~~
      </div>
      <button id="googleButton" onClick={handleSignInWithGoogle}>
        Sign in with Google
      </button>
      <div id="haveAccount">
        Don't have an account?
        <button className="signInandSignUp" onClick={navigateToSignUpPage}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;
