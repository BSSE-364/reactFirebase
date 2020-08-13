import React, { createContext, useEffect, useState } from "react";
import Router from "./Routers/Router";
import firebaseDB from "./Database/firebase";

import { Box } from "@chakra-ui/core";
import { ConfirmProvider } from "material-ui-confirm";

export const ContextValues = createContext();

function App() {
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    firebaseDB
      .collection("informations")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const vals = snapshot.docs.map((doc) => ({
          values: doc.data(),
          id: doc.id,
        }));
        setFetchData(vals);
      });
  }, []);

  const ocjectValues = {
    fetchData: fetchData,
  };
  return (
    <>
      <ContextValues.Provider value={ocjectValues}>
        <Box>
          <ConfirmProvider>
            <Router />
          </ConfirmProvider>
        </Box>
      </ContextValues.Provider>
    </>
  );
}

export default App;
