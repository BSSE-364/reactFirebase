import React, { createContext, useEffect, useState } from "react";
import Router from "./Routers/Router";
import firebaseDB from "./Database/firebase";

import { Box, useToast } from "@chakra-ui/core";
import { ConfirmProvider } from "material-ui-confirm";

export const ContextValues = createContext();

function App() {
  const toast = useToast();
  const [fetchData, setFetchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [exist, setExist] = useState(null);
  const [currentEditValues, setCurrentEditValues] = useState({});

  //// Get data
  useEffect(() => {
    setLoading(true);
    firebaseDB.collection("informations").onSnapshot((querySnapshot) => {
      setFetchData(
        querySnapshot.docs.map((doc) => ({
          ...doc.data().values,
          id: doc.id,
        }))
      );
      setLoading(false);
    });
  }, []);

  /////////  Edit data
 
  const editData = (editId) => {
    setShowModal(true)
    setEditId(editId)
    firebaseDB
      .collection("informations")
      .doc(editId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const currentEditValues = doc.data().values;
          setCurrentEditValues(currentEditValues);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };
  useEffect(() => {
    if (editId != null) {
      editData();
    }
  }, [])

  const ocjectValues = {
    fetchData: fetchData,
    loading: loading,
    editData: editData,
    currentEditValues: currentEditValues,
    setCurrentEditValues: setCurrentEditValues,
    editId: editId,
    setEditId:setEditId,
    setShowModal: setShowModal,
    showModal: showModal,
    setExist: setExist,
    exist:exist
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
