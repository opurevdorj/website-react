import React, { useState } from "react";
import Modal from "react-modal";
import { addDoc } from "firebase/firestore";
import { blogsCollection, storage } from "../firebase/myfirebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PostsModal.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
};

const validateForm = yup.object().shape({
  title: yup
    .string()
    .min(4, "Must be more than 4 characters")
    .max(20, "Must be less than 20 characters")
    .required(),

  previewText: yup
    .string()
    .min(8, "Must be more than 8 characters")
    .max(60, "Must be less than 60 characters")
    .required(),
  paragraph: yup
    .string()
    .min(8, "Must be more than 8 characters")
    .max(250, "Must be less than 250 characters")
    .required(),
  image: yup.mixed().required("File is required"),
});

// toast.configure()
function PostsModal(props) {
  const [file, setFile] = useState();
  const { closeModal, user, openModal } = props;
  const [formValues, setFormValues] = useState({
    title: "",
    previewText: "",
    image: "",
    paragraph: "",
  });
  const [formErrors, setFormErrors] = useState({
    title: "",
    previewText: "",
    image: "",
    paragraph: "",
    required: "",
  });

  const handleChange = (e) => {
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    // console.log(URL.createObjectURL(e.target.files[0]));
  };

  const uploadImage = async () => {
    console.log(file);
    const storageRef = ref(storage, file.name);
    const imageUrl = await uploadBytes(storageRef, file);
    const downloadImageUrl = await getDownloadURL(storageRef);

    return downloadImageUrl;
  };

  const handleSubmitButton = async () => {
    if (file === undefined) {
      setFormErrors({
        ...formErrors,
        image: "Must add file",
      });
    } else if (
      // checks if any inputs are empty
      formValues.title === "" ||
      formValues.previewText === "" ||
      formValues.paragraph === ""
    ) {
      setFormErrors({ ...formErrors, required: "All inputs must be required" });
    } else if (
      // checks if there is any errors
      formErrors.title !== "" ||
      formErrors.previewText !== "" ||
      formErrors.paragraph !== ""
    ) {
      setFormErrors({ ...formErrors, required: "All error must be cleared" });
    } else {
      const imageUrl = await uploadImage();
      await addDoc(blogsCollection, {
        title: formValues.title,
        previewText: formValues.previewText,
        userImage: user.photoURL,
        blogImage: imageUrl,
        userName: user.displayName,
        userId: user.uid,
        blogParagraph: formValues.paragraph,
      })
        .then((response) => {
          setFormValues({image: "", title: "", previewText: "", paragraph: ""});
          closeModal();
          toast("Successfully added post", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
          });
        })
        .catch((error) => {
          console.log(error);
          setFormErrors({ ...formErrors, required: error.message });
        });

    }
  };

  const handleCloseButton = () => {
    setFormValues({image: "", title: "", previewText: "", paragraph: ""});
    setFormErrors({image: "", title: "", previewText: "", paragraph: ""});
    closeModal();
  };

  return (
    <Modal isOpen={openModal} style={customStyles} ariaHideApp={false}>
      <div
        style={{
          width: "500px",
          height: "500px",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <label>Blog image</label>
        <input
          type="file"
          placeholder="Enter your blog image"
          name="blogImage"
          onChange={handleFileChange}
          style={{
            height: "40px",
            border: "1px solid #9de5f9",
            borderRadius: "5px",
          }}
        />
        <div id="notification">{formErrors.image}</div>
        <label>Title</label>
        <input
          placeholder="Enter your blog title"
          name="title"
          onChange={handleChange}
          value={formValues.title}
          style={{
            height: "40px",
            border: "1px solid #9de5f9",
            borderRadius: "5px",
          }}
        />
        <div id="notification">{formErrors.title}</div>
        <label>Preview text</label>
        <textarea
          placeholder="Enter your blog text"
          name="previewText"
          type="text"
          onChange={handleChange}
          value={formValues.previewText}
          style={{
            height: "40px",
            border: "1px solid #9de5f9",
            borderRadius: "5px",
          }}
        />
        <div id="notification">{formErrors.previewText}</div>
        <label>Paragraph</label>
        <textarea
          placeholder="Enter your blog text"
          name="paragraph"
          type="text"
          rows={5}
          onChange={handleChange}
          value={formValues.paragraph}
          style={{
            height: "40px",
            border: "1px solid #9de5f9",
            borderRadius: "5px",
          }}
        />
        <div id="notification">{formErrors.paragraph}</div>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <button className="buttonDesigns" onClick={handleSubmitButton}>
            Submit
          </button>
          <button className="buttonDesigns" onClick={handleCloseButton}>
            Close
          </button>
        </div>
      </div>
     
    </Modal>
  );
}

export default PostsModal;
