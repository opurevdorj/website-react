import { React, useEffect, useState } from "react";
import Modal from "react-modal";
import { blogsCollection } from "../../firebase/myfirebase";
import { updateDoc, doc } from "firebase/firestore";


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


function EditPostModal(props) {
  const { openEditModal, selectedPost, closeEditModal } = props;
  const [inputValue, setInputValue] = useState({title:"", blogParagraph: ""});
 

  const handleInput = (e) => {
      const inputName = e.target.name;
      const value = e.target.value; 
      setInputValue({ ...inputValue, [inputName]: value});
    
  };

  useEffect(() => {
    if (selectedPost) {
      setInputValue({title:selectedPost.title, blogParagraph:selectedPost.blogParagraph});
    }
  }, [selectedPost]);

  const handleCancelButton = () => {
    setInputValue({title: selectedPost.title, blogParagraph: selectedPost.blogParagraph});
    closeEditModal();
  };
  console.log(inputValue);

  const handleSaveButton = async () => {
    await updateDoc(doc(blogsCollection, selectedPost.blogId), {
      ...selectedPost,
      title: inputValue.title,
      blogParagraph: inputValue.blogParagraph
    })
      .then((response) => {
        closeEditModal();  
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Modal style={customStyles} isOpen={openEditModal}>
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
      <label>Title</label>
        <textarea
        type="text"
        name="title"
        rows={5}
          style={{
            border: "1px solid #9de5f9",
            borderRadius: "5px",
          }}
          value={inputValue.title}
          onChange={handleInput}
        />
        <label>Paragraph</label>
        <textarea
        type="text"
        name="blogParagraph"
        rows={10}
          style={{
            border: "1px solid #9de5f9",
            borderRadius: "5px",
          }}
          value={inputValue.blogParagraph}
          onChange={handleInput}
        />
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <button
          style={{
            width: "100px",
            height: "30px",
            backgroundColor: "#0BBEF2",
            borderRadius: "5px",
          }}
          onClick={handleSaveButton}
        >
          Save
        </button>
        <button
          style={{
            width: "100px",
            height: "30px",
            backgroundColor: "#0BBEF2",
            borderRadius: "5px",
          }}
          onClick={handleCancelButton}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default EditPostModal;
