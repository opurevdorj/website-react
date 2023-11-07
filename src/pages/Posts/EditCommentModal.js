import { React, useEffect, useState } from "react";
import Modal from "react-modal";
import { commentCollection } from "../../firebase/myfirebase";
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

function EditCommentModal(props) {
  const { openEditModal, selectedComment, closeEditModal } = props;
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (selectedComment) {
      setInputValue(selectedComment.comment);
    }
  }, [selectedComment]);

  const handleCancelButton = () => {
    setInputValue(selectedComment.comment);
    closeEditModal();
  };
  console.log(selectedComment);
  const handleSaveButton = async () => {
    await updateDoc(doc(commentCollection, selectedComment.commentId), {
      ...selectedComment,
      comment: inputValue,
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
          justifyContent: "center",
          alignItems: "start",
          
          // flexDirection: "column",
        }}
      >
        <input
        type="text"
          style={{
            width: "400px",
            height: "100px",
            border: "1px solid #0BBEF2",
            borderRadius: "5px",
            display: "flex",
            flexWrap: "wrap"
          }}
          value={inputValue}
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

export default EditCommentModal;
