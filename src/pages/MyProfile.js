import { React, useState, useEffect } from "react";
import Header from "../components/Header";
import { useUserContext } from "../components/UserContext";
import Footer from "../components/Footer";
import { getDocs } from "firebase/firestore";
import { blogsCollection } from "../firebase/myfirebase";

function MyProfile(props) {
  const { user } = useUserContext();

  const [data, setData] = useState([]);
  useEffect(() => {
   
    const getData = async () => {
      const firebaseCollectionInfo = await getDocs(blogsCollection);
      const firebaseDocData = firebaseCollectionInfo.docs.map((doc) => {
        return doc.data();
      });
      setData(firebaseDocData);
    };
    getData();
  }, []);

  return (
    <div>
      <Header user={user} darkTheme={true} />
      <div style={{ height: "100vh", display: "flex", justifyContent: "center", marginTop: "30px" }}>
        <div style={{height: "400px", width: "800px", border: "1px solid #0BBEF2", borderRadius: "20px", backgroundColor: "white" }}>
          <img
            style={{ borderRadius: "50px", marginTop: "80px" }}
            src={user.photoURL}
            alt="profileImage"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "50%",
                justifyContent: "space-between",
              }}
            >
              <div>{user.displayName}</div>
              <div>{user.email}</div>
            </div>
          </div>
          <div style={{ marginTop: "30px" }}>Posted blogs: {data.length}</div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MyProfile;
