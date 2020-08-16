import React, { useContext, useState } from "react";
import { ContextValues } from "../App";
import FormikControl from "./FormikControl";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import firebaseDB from "../Database/firebase";
import firebase from "firebase/app";

import { Button, Box, useToast, Flex } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";

function FormikContainer() {
  const context = useContext(ContextValues);
  const [formikForm, setFormikForm] = useState(null);
  const history = useHistory();
  const toast = useToast();

  const initialValues = {
    username: "",
    email: "",
    city: "",
    message: "",
  };

  const editSvaedValues = {
    username: context.currentEditValues.username,
    email: context.currentEditValues.email,
    city: context.currentEditValues.city,
    message: context.currentEditValues.message,
  };

  const validationSchema = Yup.object({
    username: Yup.string().min(3, "To Short!").required("Required!"),
    email: Yup.string().email("Invalid email format!").required("Required!"),
    city: Yup.string().min(3, "To Short!").required("Required!"),
    message: Yup.string()
      .min(15, "Minimum 15 character required!")
      .max(250, "Maximum 250 character required!")
      .required("Required!"),
  });

  const addDataIntoFirestore = (values, onSubmitProps) => {
    firebaseDB
      .collection("informations")
      .add({
        values,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
        toast({
          position: "top",
          title: "Success",
          description: "Data successfully Added",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        history.push("/view");
      })
      .catch((error) => {
        toast({
          position: "top",
          title: "Error",
          description: "Error while data adding",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const updateDataIntoFirestore = ( values, onSubmitProps) => {
    firebaseDB
      .collection("informations")
      .doc(context.editId)
      .set({values})
      .then(() => {
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
        context.setShowModal(false);
        toast({
          position: "top",
          title: "Success",
          description: "Data Successfully Updated ",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error)=> {
        toast({
          position: "top",
          title: "Error",
          description: "Error while data adding",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        context.setEditId(null);
      });
  };

  const onSubmit = (values, onSubmitProps) => {
    if (context.editId === null) {
      addDataIntoFirestore(values, onSubmitProps);
    } else {
      updateDataIntoFirestore(values, onSubmitProps);
    }
  };

  const cancelData = (formik) => {
    formik.resetForm();
    context.setEditId(null);
    context.setShowModal(false);
  };

  return (
    <>
        <Formik
          initialValues={
            context.editId === null ? initialValues : editSvaedValues
          }
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {(formik) => (
            <Form>
              <FormikControl
                control="chakraInput"
                name="username"
                type="text"
                label="Username"
              />
              <FormikControl
                control="chakraInput"
                name="email"
                type="email"
                label="Email"
              />
              <FormikControl
                control="chakraInput"
                name="city"
                type="text"
                label="City"
              />
              <FormikControl
                control="textarea"
                name="message"
                type="text"
                label="Message"
              />
              <Box
                style={{
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {context.editId === null ? (
                  <Button
                    isFullWidth
                    mt="10"
                    size="sm"
                    type="submit"
                    variantColor="teal"
                    isDisabled={!formik.dirty || !formik.isValid}
                    isLoading={formik.isSubmitting}
                    loadingText="Submitting..."
                  >
                    Add Data
                  </Button>
                ) : (
                  <Flex w="100%">
                    <Button
                      isFullWidth
                      mt="5"
                      size="sm"
                      type="submit"
                      variantColor="teal"
                      isDisabled={!formik.dirty || !formik.isValid}
                      isLoading={formik.isSubmitting}
                      loadingText="Updating..."
                    >
                      Update Data
                    </Button>
                    <Button
                      mt="5"
                      size="sm"
                      isFullWidth
                      type="button"
                      bg="#D2EEF3"
                      ml="5"
                      onClick={() => cancelData(formik)}
                    >
                      Cancel
                    </Button>
                  </Flex>
                )}
              </Box>
            </Form>
          )}
        </Formik>
    </>
  );
}

export default FormikContainer;
