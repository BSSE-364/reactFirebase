import React, { createContext, useState, useEffect } from "react";
import Login from "./Login";
import { firebaseAuth } from "../Database/firebase";
import App from "../App";

export const ContextValues = createContext();

const Main = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const obj = {
    user: user,
  };
  return (
    <>
      <ContextValues.Provider value={obj}>
        {user ? <App /> : <Login />}
      </ContextValues.Provider>
    </>
  );
};

export default Main;
