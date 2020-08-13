import React from "react";
import { Formik, Form } from "formik";
import FormikControl from "./FormikControl";

import firebaseDB from "../Database/firebase";
import firebase from "firebase/app";

import { Button, Box, useToast } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";

function FormikContainer() {
  const history = useHistory();
  const toast = useToast();
  const initialValues = {
    username: "",
    email: "",
    city: "",
    message: "",
  };
  const onSubmit = (values, onSubmitProps) => {
    firebaseDB.collection("informations").add({
      values,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
    toast({
      position: "top",
      title: "Success",
      description: "Data successfully Added",
      status: "success",
      duration: 6000,
      isClosable: true,
    });
    history.push("/view");
  };
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
              type="text"
              label="Email"
            />
            <FormikControl
              control="chakraInput"
              name="city"
              type="text"
              label="City"
            />
            <FormikControl
              control="chakraInput"
              name="message"
              type="text"
              label="Message"
            />
            <Box style={{ display: "grid", placeItems: "center" }}>
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
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default FormikContainer;
