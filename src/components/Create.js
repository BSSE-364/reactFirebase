import React from "react";
import { Heading } from "@chakra-ui/core";
import FormikContainer from "../Forms/FormikContainer";
import { NavLink } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

function Create() {
  return (
    <>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={8} sm={6} md={5} lg={12}>
          <Heading fontSize="2xl" mt="10" mb="4" textAlign="center">
            <span style={{ color: "teal" }}>Add Your Informations</span>
          </Heading>
          <NavLink to="/view">
            <Heading mt="4" mb="5" fontSize="sm " textAlign="center">
              <span style={{ color: "skyblue" }}>View Your Informations</span>
            </Heading>
          </NavLink>
        </Grid>
        <Grid item xs={10} sm={6} md={5} lg={4}>
          <FormikContainer />
        </Grid>
      </Grid>
    </>
  );
}

export default Create;
