import { React, useEffect, useState } from "react";
import Header from "../components/Header";
import { useUserContext } from "../components/UserContext";
import { contactCollection } from "../firebase/myfirebase";
import { getDocs } from "firebase/firestore";
import Footer from "../components/Footer";

function Admin(props) {
  const { user } = useUserContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const firebaseCollectionInfo = await getDocs(contactCollection);
      const firebaseDocData = firebaseCollectionInfo.docs.map((doc) => {
        const contactId = doc.id;
        const contactData = doc.data();
        contactData.contactId = contactId;
        return contactData;
      });

      setData(firebaseDocData);
    };
    getData();
  }, []);

  return (
    <div style={{height: "100%"}}>
      <Header user={user} darkTheme={true} />
      {data.map((contactData) => {
        return (
          <div style={{  display: "flex",
          flexDirection: "column",
          width: "320px",
          height: "300px",
          borderRadius: "5px",
          gap: "10px",
          textAlign: "left",}}>
            <div>{contactData.userName}</div>
            <div>{contactData.email}</div>
            <div>{contactData.message}</div>
          </div>
        );
      })}
      <Footer/>
    </div>
  );
}

export default Admin;
