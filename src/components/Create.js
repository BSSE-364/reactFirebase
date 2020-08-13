import React from "react";
import { Box, Heading } from "@chakra-ui/core";
import FormikContainer from "../Forms/FormikContainer";
import { NavLink } from "react-router-dom";

function Create() {
  return (
    <>
      <Box>
        <Heading fontSize="3xl" mt="10" mb="5">
          Add Your Informations
        </Heading>
      </Box>
      <Box w="25%">
        <FormikContainer />
      </Box>
      <NavLink to="/view">
        <Heading mt="10" fontSize="md">
          View Data
        </Heading>
      </NavLink>
    </>
  );
}

export default Create;
