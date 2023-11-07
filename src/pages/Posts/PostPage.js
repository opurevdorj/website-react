import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { blogsCollection, commentCollection } from "../../firebase/myfirebase";
import { addDoc, getDocs, onSnapshot } from "firebase/firestore";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Comment from "./Comment";
import EditPost from "./EditPost";
import ReactLoading from "react-loading";

function PostPage(props) {
  const { user } = props;
  const { id } = useParams();
  const selectedBlogId = id;

  const [blogData, setBlogData] = useState({});
  const [commentsData, setCommentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const getBlogData = async () => {
      setLoading(true);
      onSnapshot(blogsCollection, (collection) => {
        const firebaseBlogsData = collection.docs.map((doc) => {
          const blogId = doc.id;
          const blogData = doc.data();
          blogData.blogId = blogId;
          return blogData;
        });
        const selectedBlog = firebaseBlogsData.find((blog) => {
          return blog.blogId === selectedBlogId;
        });
        setBlogData(selectedBlog);

        if (selectedBlog) {
          onSnapshot(commentCollection, (collection) => {
            const firebaseCommentData = collection.docs.map((doc) => {
              const commentId = doc.id;
              const commentData = doc.data();
              commentData.commentId = commentId;
              return commentData;
            });
            const blogComments = firebaseCommentData.filter((comment) => {
              return comment.blogId === selectedBlog.blogId;
            });
            setCommentsData(blogComments);
          });
        } 
        
      });
      setLoading(false);
    };
    return () => getBlogData();
  }, [selectedBlogId]);

  const handleCommentButton = async () => {
    await addDoc(commentCollection, {
      comment: inputValue,
      blogId: blogData.blogId,
      userId: user.uid,
      userName: user.displayName,
      userImage: user.photoURL,
    })
      .then((responce) => {
        console.log(responce);
        setInputValue("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <div>
      {loading && <div
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
      </div>}
      {!loading && blogData === undefined && <div>Blog not found</div>}
      {!loading && blogData !== undefined && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <Header darkTheme user={user} />
          </div>
          <div
            style={{
              width: "1080px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <div style={{ paddingBottom: "30px", fontSize: "32px" }}>
              {blogData.title}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "700px",
                textAlign: "left",
              }}
            >
              <img
                style={{ borderRadius: "50%", width: "56px", height: "56px" }}
                src={blogData.userImage}
                alt=""
              />
              <span
                style={{
                  paddingLeft: "20px",
                  color: "grey",
                  paddingRight: "280px",
                }}
              >
                {blogData.userName}
              </span>
              <EditPost blogData={blogData} userId={user.uid} />
            </div>
            <img
              style={{
                width: "1080px",
                marginTop: "20px",
                marginBottom: "30px",
              }}
              src={blogData.blogImage}
              alt=""
            />
            <div style={{ width: "700px", textAlign: "left" }}>
              <div style={{ fontSize: "18px", lineHeight: "163.15%" }}>
                {blogData.blogParagraph}
              </div>
            </div>
            <div>
              {commentsData.map((comment) => {
                return (
                  <div
                    key={""}
                    style={{
                      display: "flex",
                      marginTop: "40px",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "700px",
                        textAlign: "left",
                      }}
                    >
                      <img
                        style={{
                          borderRadius: "50%",
                          width: "56px",
                          height: "56px",
                          // paddingRight: "20px",
                        }}
                        alt=""
                        src={comment.userImage}
                      />
                      <div
                        style={{ paddingLeft: "20px", paddingRight: "290px" }}
                      >
                        {comment.userName}
                      </div>
                      <Comment comment={comment} userId={user.uid} />
                    </div>

                    <div
                      style={{
                        heigth: "10px",
                        backgroundColor: "white",
                        // border: "1px solid #0BBEF2",
                        borderRadius: "5px",
                        width: "700px",
                        height: "100px",
                        fontSize: "14px",
                      }}
                    >
                      {comment.comment}
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                flexDirection: "column",
                marginTop: "20px",
                width: "700px",
                marginBottom: "40px",
              }}
            >
              <label
                style={{
                  textAlign: "left",
                  paddingBottom: "10px",
                  fontSize: "24px",
                  color: "grey",
                }}
              >
                Join the conversation
              </label>
              <div
                style={{
                  display: "flex",
                  width: "700px",
                  marginBottom: "30px",
                }}
              >
                <img
                  style={{
                    borderRadius: "50%",
                    width: "56px",
                    height: "56px",
                  }}
                  src={commentsData.userImage}
                  alt=""
                />
                <textarea
                  style={{ width: "620px", marginLeft: "20px" }}
                  type="text"
                  onChange={handleInputValue}
                  placeholder="Comment here"
                  rows={5}
                  value={inputValue}
                />
              </div>
              <div style={{ textAlign: "right" }}>
                <button
                  style={{
                    width: "100px",
                    height: "30px",
                    backgroundColor: "#0BBEF2",
                    borderRadius: "5px",
                  }}
                  onClick={handleCommentButton}
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default PostPage;
