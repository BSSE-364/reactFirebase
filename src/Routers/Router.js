import React from "react";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Route, Switch, useHistory } from "react-router-dom";
import Create from "../components/Create";
import View from "../components/View";
import { firebaseAuth } from "../Database/firebase";
import { Box, Button, useToast } from "@chakra-ui/core";

function Router() {
  const history = useHistory();
  const toast = useToast()

  const logout = () => {
    firebaseAuth.signOut();
    history.push('/');
    toast({
      position: "top-left",
      title: 'Logout',
      description: "You are signed out into the system",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  }
  return (
    <>
      <Box style={{ display: "grid", placeItems: "center" }} mt="5">
        <Button
          size="sm"
          color="#ffffff"
          bg="#47B881"
          onClick={logout}
          rightIcon={ExitToAppIcon}
        >
          Signin
              </Button>
      </Box>
      <Switch>
        <Route exact path="/" component={Create} />
        <Route path="/view" component={View} />
      </Switch>
    </>
  );
}

export default Router;
