import React, { useContext } from "react";
import { ContextValues } from "../App";
import firebaseDB from "../Database/firebase";
import {
  List,
  ListItem,
  ListIcon,
  Divider,
  Box,
  Heading,
  Icon,
  useToast,
} from "@chakra-ui/core";

import { NavLink } from "react-router-dom";
import { Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { blue } from "@material-ui/core/colors";
import { useConfirm } from "material-ui-confirm";
import BackdropLoading from "./BackdropLoading";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  green: {
    color: "#fff",
    backgroundColor: blue[500],
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function View() {
  const context = useContext(ContextValues);
  const classes = useStyles();
  const toast = useToast();
  const confirm = useConfirm();

  const deleteInfo = (uniqueId, name) => {
    confirm({ description: `This will permanently delete ${name}'s data.` })
      .then(() => {
        firebaseDB
          .collection("informations")
          .doc(uniqueId)
          .delete()
          .then(() => {
            toast({
              position: "top",
              title: "Success",
              description: "Data successfully Deleted",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          })
          .catch(() => {
            toast({
              position: "top",
              title: "Error",
              description: "Error! while data delting",
              status: "success",
              duration: 4000,
              isClosable: true,
            });
          });
      })
      .catch(() => console.log("Deletion cancelled."));
  };

  return (
    <>
      {context.loading ? <BackdropLoading /> : null}
      <Grid container justify="center" alignItems="center">
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          style={{ marginBottom: "50px" }}
        >
          <NavLink to="/">
            <Heading mt="10" fontSize="md" textAlign="center">
              <span style={{ color: "skyblue" }}>Add more Informations</span>
            </Heading>
          </NavLink>
        </Grid>
        {context.fetchData.map((info) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={info.id}>
            <Box style={{ display: "grid", placeItems: "center" }}>
              <Avatar className={classes.green} style={{ marginBottom: -20 }}>
                <AssignmentIcon />
              </Avatar>
            </Box>
            <List
              mb="4"
              p="5"
              ml="5"
              mr="5"
              color="#DDEBF7"
              bg="#1070CA"
              style={{ borderRadius: "10px" }}
            >
              <ListItem mt="4">
                <ListIcon icon="check-circle" />
                {info.values.values.username}
              </ListItem>
              <ListItem pt="3">
                <ListIcon icon="check-circle" />
                {info.values.values.email}
              </ListItem>
              <ListItem pt="3">
                <ListIcon icon="check-circle" />
                {info.values.values.city}
              </ListItem>
              <ListItem pt="3" textAlign="justify">
                <ListIcon icon="check-circle" />
                {info.values.values.message}
              </ListItem>
              <Divider />
              <Box d="flex" justifyContent="center">
                <Icon name="edit" color="#ffffff" mr="10" cursor="pointer" />
                <Icon
                  name="delete"
                  color="#ffffff"
                  cursor="pointer"
                  onClick={() =>
                    deleteInfo(info.id, info.values.values.username)
                  }
                />
              </Box>
            </List>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default View;
