import React from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { blogsCollection } from "../../firebase/myfirebase";
import { useNavigate } from "react-router-dom";

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

function DeletePostModal(props) {
  const { closeDeleteModal, openDeleteModal, selectedPost } = props;
  const navigate = useNavigate();
  console.log(selectedPost);
  const handleYesButton = async () => {
    console.log("hello world!");
    await deleteDoc(doc(blogsCollection, selectedPost.blogId))
      .then((responce) => {
        console.log(responce);
        toast("Successfully deleted", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        });
        navigate("/Posts");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNoButton = () => {
    closeDeleteModal();
  };

  return (
    <Modal style={customStyles} isOpen={openDeleteModal}>
      <div  style={{
        width: "400px",
        height: "400px",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        
        
      }}>
        <div>Are sure you want to delete this post? </div>
        <div>{selectedPost.title}</div>
        <div>
        <button className="buttonDesigns" onClick={handleNoButton}>No</button>
        <button className="buttonDesigns" onClick={handleYesButton}>Yes</button>
        </div>
        
      </div>
    </Modal>
  );
}

export default DeletePostModal;
