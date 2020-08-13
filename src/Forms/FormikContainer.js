import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
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
  const validationSchema = Yup.object({
    username: Yup.string().min(3, "To Short!").required("Required!"),
    email: Yup.string().email("Invalid email format!").required("Required!"),
    city: Yup.string().min(3, "To Short!").required("Required!"),
    message: Yup.string()
      .min(15, "Minimum 15 character required!")
      .max(250, "Maximum 250 character required!")
      .required("Required!"),
  });
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
      duration: 4000,
      isClosable: true,
    });
    history.push("/view");
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
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
