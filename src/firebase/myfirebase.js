import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {collection, getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBR2Qf9GOtMLF-Eb8-e_c-zMmidO2CTbSk",
  authDomain: "website-react-a3a57.firebaseapp.com",
  projectId: "website-react-a3a57",
  storageBucket: "website-react-a3a57.appspot.com",
  messagingSenderId: "760612293989",
  appId: "1:760612293989:web:6669a176f66112fddd258c"
  }

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const database = getFirestore(app);
  const usersCollection = collection(database, "users")
  const blogsCollection = collection(database, "blogs")
  const commentCollection = collection(database, "comment")
  const contactCollection = collection(database, "contact")
  const storage = getStorage(app);

export {auth, usersCollection, blogsCollection, commentCollection, contactCollection, storage}