import React, { useContext } from "react";
import { ContextValues } from "../App";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { Heading, Box } from "@chakra-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function BackdropLoading() {
  const context = useContext(ContextValues);
  const loader = context.loading;
  const classes = useStyles();
  const cancelRef = React.createRef();
  return (
    <>
      <Box ref={cancelRef}>
        <Backdrop className={classes.backdrop} open={loader}>
          <Heading fontSize="2xl" mr={8}>
            Loading...
          </Heading>{" "}
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </>
  );
}

export default BackdropLoading;
