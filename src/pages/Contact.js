import { React, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { addDoc } from "firebase/firestore";
import { contactCollection } from "../firebase/myfirebase";
import * as yup from "yup";

const validateForm = yup.object().shape({
  userName: yup
    .string()
    .min(4, "Must be more than 4 characters")
    .max(20, "Must be less than 20 characters")
    .required(),

  email: yup.string().email("Invalid email address").required(),
  message: yup
    .string()
    .min(8, "Must be more than 8 characters")
    .max(250, "Must be less than 250 characters")
    .required(),
});

function Contact(props) {
  const { user } = props;
  const [formValues, setFormValues] = useState({
    userName: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    userName: "",
    email: "",
    message: "",
    required: "",
  });

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const setNotification = (text) => {
    setNotificationMessage(text);
    setShowNotification(true); //display the notification
    setTimeout(() => {
      setNotificationMessage("");
      setShowNotification(false);
    }, 5000);
  };

  const handleInputValue = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    yup
      .reach(validateForm, inputName)
      .validate(inputValue)
      .then((res) => {
        setFormValues({ ...formValues, [inputName]: inputValue });
        setFormErrors({ ...formErrors, [inputName]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [inputName]: err.message });
      });

    setFormValues({ ...formValues, [inputName]: inputValue });
  };

  const handleContactUsButton = async () => {
    if (
      // checks if any inputs are empty
      formValues.userName === "" ||
      formValues.email === "" ||
      formValues.message === ""
    ) {
      setFormErrors({ ...formErrors, required: "All inputs must be required" });
    } else if (
      // checks if there is any errors
      formErrors.userName !== "" ||
      formErrors.email !== "" ||
      formErrors.message !== ""
    ) {
      setFormErrors({ ...formErrors, required: "All error must be cleared" });
    } else {
      setFormErrors({ ...formErrors, required: "" });
      await addDoc(contactCollection, {
        message: formValues.message,
        userId: user.uid,
        userName: formValues.userName,
        email: formValues.email,
      })
        .then((responce) => {
          console.log(responce);
          setFormValues({ userName: "", email: "", message: "" });
          setNotification("Successfully added contact");
        })
        .catch((error) => {
          console.log(error.message);
          setFormErrors({ ...formErrors, required: error.message });
        });
    }
  };

  return (
    <div>
      <Header user={user} darkTheme={true} />
      <div id="title">Contact Us</div>
      <div id="inputContainer">
        <div className="inputNames">Name</div>
        <input
          className="inputs"
          placeholder="Enter your name"
          onChange={handleInputValue}
          value={formValues.userName}
          name="userName"
        />
        <div id="notification">{formErrors.userName}</div>
        <div className="inputNames">Email address</div>
        <input
          className="inputs"
          value={formValues.email}
          placeholder="Enter your email address"
          onChange={handleInputValue}
          name="email"
        />
        <div id="notification">{formErrors.email}</div>
        <div className="inputNames">Message</div>
        <textarea
          type="text"
          rows={10}
          value={formValues.message}
          placeholder="Message us"
          onChange={handleInputValue}
          name="message"
          style={{
            width: "100%",
            height: "",
            borderRadius: "10px",
            border: "transparent",
          }}
        />
        <div id="notification">{formErrors.message}</div>
        <div id="notification">{formErrors.required}</div>
        <button
          style={{
            width: "100px",
            height: "30px",
            backgroundColor: "#0BBEF2",
            borderRadius: "5px",
            marginTop: "30px",
            marginBottom: "30px",
          }}
          onClick={handleContactUsButton}
        >
          Contact Us
        </button>
      </div>
      {showNotification ? (
        <div id="notification">{notificationMessage}</div>
      ) : (
        <div />
      )}
      <Footer />
    </div>
  );
}

export default Contact;
