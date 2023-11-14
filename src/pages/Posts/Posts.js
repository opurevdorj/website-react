import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PostsModal from "../../components/PostsModal";
import { blogsCollection } from "../../firebase/myfirebase";
import { getDocs, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { ToastContainer } from "react-toastify";

function Posts(props) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      onSnapshot(blogsCollection, (collection) => {
        const firebaseDocData = collection.docs.map((doc) => {
          const blogId = doc.id;
          const blogData = doc.data();
          blogData.blogId = blogId;
          return blogData;
        });
        setData(firebaseDocData);
      });
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };

  getData();
  }, []);
  console.log(data);
  const [openModal, setOpenModal] = useState(false);
  const handleCreateNewPostButton = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };

  const handlePostClick = (id) => {
    navigate(`/Posts/${id}`);
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header user={props.user} darkTheme={true} />
      <div
        style={{
          marginTop: "50px",
          width: "1080px",

          // height: "100vh",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: "48px" }}>Blog posts</div>
          <button
            style={{
              width: "150px",
              height: "45px",
              backgroundColor: "#0BBEF2",
              borderRadius: "5px",
              color: "#fff",
            }}
            onClick={handleCreateNewPostButton}
          >
            Create new post
          </button>
        </div>
        <div
          style={{
            fontSize: "14px",
            color: "grey",
            textAlign: "left",
            marginTop: "10px",
          }}
        >
          Our latest updates and blogs about managing your team
        </div>

        {loading && (
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ReactLoading
              type="spinningBubbles"
              color="#0BBEF2"
              height={100}
              width={50}
            />
          </div>
        )}
        {!loading && data.length === 0 && <div>There is no blog</div>}
        {!loading && data.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "20px",

              maxHeight: "90vh",
              overflow: "scroll",
              paddingTop: "16px",
            }}
          >
            {data.map((blogData) => {
              return (
                <div
                  onClick={(e) => {
                    handlePostClick(blogData.blogId);
                  }}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    width: "320px",
                    height: "300px",
                    borderRadius: "5px",
                    gap: "10px",
                    textAlign: "left",
                  }}
                  key={""}
                >
                  <img
                    style={{ width: "320px", height: "150px" }}
                    src={blogData.blogImage}
                    alt=""
                  />
                  <div
                    style={{
                      // width: "250px",
                      //  height: "50px",
                      fontSize: "20px",
                    }}
                  >
                    {blogData.title}
                  </div>
                  <div
                    style={{
                      // width: "250px",
                      height: "100px",
                      fontSize: "14px",
                    }}
                  >
                    {blogData.previewText}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      style={{
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                      }}
                      src={blogData.userImage}
                      alt=""
                    />
                    <div style={{ fontSize: "12px", color: "grey" }}>
                      {blogData.userName}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <ToastContainer />
      <Footer />
      <PostsModal
        openModal={openModal}
        closeModal={closeModal}
        user={props.user}
      />
    </div>
  );
}

export default Posts;
