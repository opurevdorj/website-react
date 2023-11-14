import React, { useState } from "react";
import EditPostModal from "./EditPostModal";
import DeletePostModal from "./DeletePostModal";


function EditPost(props) {
  const { blogData, userId } = props;
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  

  const handleOpenDeleteModal = (blogData) => {
    setSelectedPost(blogData);
    setOpenDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  const handleOpenEditModal = (blogData) => {
    setSelectedPost(blogData);
    setOpenEditModal(true);
  };

  const closeEditModal = () => {
    setOpenEditModal(false);
  };
  
console.log(blogData);
const ts = new Date(blogData.timeStamp);
console.log(ts.toDateString());
  return (
    <div>
      {blogData.userId === userId && (
        <div>
          <button
            style={{
              width: "100px",
              height: "30px",
              backgroundColor: "#0BBEF2",
              borderRadius: "5px",
            }}
            onClick={(e) => {
              handleOpenEditModal(blogData);
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
              handleOpenDeleteModal(blogData);
            }}
          >
            Delete
          </button>
        </div>
      )}
      <DeletePostModal
        openDeleteModal={openDeleteModal}
        selectedPost={selectedPost}
        closeDeleteModal={closeDeleteModal}
      />
      <EditPostModal
        openEditModal={openEditModal}
        selectedPost={selectedPost}
        closeEditModal={closeEditModal}
      />
    </div>
  );
}

export default EditPost;
