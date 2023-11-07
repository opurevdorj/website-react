import React, { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { commentCollection } from "../../firebase/myfirebase";
import EditCommentModal from "./EditCommentModal";

function Comment(props) {
  const { comment, userId } = props;
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState({});

  const handleDeleteComment = async (commentId) => {
    await deleteDoc(doc(commentCollection, commentId))
      .then((responce) => {
        console.log("Successfully deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOpenEditModal = (comment) => {
    setSelectedComment(comment);
    setOpenEditModal(true);
  };

  const closeEditModal = () => {
    setOpenEditModal(false);
  };
  return (
    <div>
      {comment.userId === userId && (
        <div>
          <button
            style={{
              width: "100px",
              height: "30px",
              backgroundColor: "#0BBEF2",
              borderRadius: "5px",
            }}
            onClick={(e) => {
              handleOpenEditModal(comment);
            }}
          >
            Edit
          </button>
          <button
            style={{
              width: "100px",
              height: "30px",
              backgroundColor: "#0BBEF2",
              borderRadius: "5px",
            }}
            onClick={(e) => {
              handleDeleteComment(comment.commentId);
            }}
          >
            Delete
          </button>
        </div>
      )}

      <EditCommentModal
        openEditModal={openEditModal}
        selectedComment={selectedComment}
        closeEditModal={closeEditModal}
      />
    </div>
  );
}

export default Comment;
