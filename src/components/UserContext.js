import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/myfirebase";

const userContext = createContext();

export const UserProvider = (props) => {
  const { children } = props;
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsUserLoggedIn(true);
      } else {
        setUser(null);
        setIsUserLoggedIn(false);
      }
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    });
    return () => getUser();
  }, []);

  return (
    <userContext.Provider value={{ user, isUserLoggedIn, loading }}>
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(userContext);
};
