import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addDoc } from "firebase/firestore";
import { auth, usersCollection } from "../firebase/myfirebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

const validateForm = yup.object().shape({
  name: yup
    .string()
    .min(4, "Must be more than 4 characters")
    .max(10, "Must be less than 10 characters")
    .required(),
  email: yup.string().email("Invalid email address").required(),
  password: yup.string().min(8, "Must be more than 8 characters").required(),
  confirmPassword: yup
    .string()
    .min(8, "Must be more than 8 characters")
    .required(),
  checkbox: yup
    .boolean()
    .oneOf([true], "Must agree with terms and conditions")
    .required(),
});

function SignUp() {
  const navigate = useNavigate();
  const navigateToLoginPage = () => {
    navigate("/");
  };

  const [formValues, setFormValues] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
    checkbox: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    required: "",
    checkbox: "",
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

  const handleSignUp = async (e) => {
    if (formValues.password !== formValues.confirmPassword) {
      // checks if password matches with confirmPassword
      setFormErrors({
        ...formErrors,
        confirmPassword: "Must match with the password",
      });
    } else if (
      // checks if any inputs are empty
      formValues.name === "" ||
      formValues.email === "" ||
      formValues.password === "" ||
      formValues.confirmPassword === "" ||
      formValues.checkbox === false
    ) {
      setFormErrors({ ...formErrors, required: "All inputs must be required" });
    } else if (
      // checks if there is any errors
      formErrors.name !== "" ||
      formErrors.email !== "" ||
      formErrors.password !== "" ||
      formErrors.confirmPassword !== "" ||
      formErrors.checkbox !== ""
    ) {
      setFormErrors({ ...formErrors, required: "All error must be cleared" });
    } else {
      setFormErrors({ ...formErrors, required: "" });
      await createUserWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      )
        .then((response) => {
          // const userId = response.user.uid;
          updateProfile(response.user, {displayName: formValues.name})
          navigate("/")
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
      <div id="title">Get Started Now</div>
      <div id="inputContainer">
        <div className="inputNames">Name</div>
        <input
          className="inputs"
          placeholder="Enter your name"
          onChange={handleInput}
          value={formValues.name}
          name="name"
        />

        <div id="notification">{formErrors.name}</div>

        <div className="inputNames">Email address</div>
        <input
          className="inputs"
          value={formValues.email}
          placeholder="Enter your email address"
          onChange={handleInput}
          name="email"
        />
        <div id="notification">{formErrors.email}</div>

        <div className="inputNames">Password</div>
        <input
          type="password"
          className="inputs"
          value={formValues.password}
          placeholder="Enter your password"
          onChange={handleInput}
          name="password"
        />
        <div id="notification">{formErrors.password}</div>
        <div className="inputNames">Confirm Password</div>
        <input
          type="password"
          className="inputs"
          value={formValues.confirmPassword}
          placeholder="Confirm your password"
          onChange={handleInput}
          name="confirmPassword"
        />
        <div id="notification">{formErrors.confirmPassword}</div>
      </div>
      <div id="policyContainer">
        <input
          type="checkbox"
          name="checkbox"
          checked={formValues.checkbox}
          onChange={handleCheckBox}
        />
        <div>I agree to the terms & policy</div>
      </div>
      <div id="notification">{formErrors.checkbox}</div>
      <div id="notification">{formErrors.required}</div>
      <button id="signupButton" onClick={handleSignUp}>
        Signup
      </button>
      <div style={{ fontSize: "12px" }}> ~~~~~~~~or~~~~~~~~</div>
      <button id="googleButton" onClick={handleSignInWithGoogle}>
        Sign in with Google
      </button>
      <div id="haveAccount">
        Have an account?
        <button className="signInandSignUp" onClick={navigateToLoginPage}>
          Login
        </button>
      </div>
    </div>
  );
}

export default SignUp;
