import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "evergreen-ui";
import { firebaseAuth } from "../Database/firebase";
import { useToast } from "@chakra-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigned, setIsSigned] = useState(false);
  const toast = useToast();

  const signIn = () => {
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        toast({
          position: "top-left",
          title: `${username}`,
          description: "Signin successfully done",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setPassword("");
        setEmail("");
      })
      .catch((error) => {
        toast({
          position: "top",
          title: "Error",
          description: `${error.message}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setEmail("");
      });
  };
  const signUp = () => {
    firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        toast({
          position: "top-left",
          title: `${username}`,
          description: "You are registered successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => {
        toast({
          position: "top",
          title: "Error",
          description: `${error.message}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setPassword("");
      });
  };

  const classes = useStyles();
  return (
    <>
      <div style={{
        display: "grid",
        placeItems: "center",
      }}>
        <div
          style={{
            backgroundColor: "#DDEBF7",
            display: "grid",
            placeItems: "center",
            height: 300,
            width: 340,
            marginTop: 80,
            borderRadius: 10
          }}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          {isSigned ? (
            <div>
              {isSigned ? (
                <TextField
                  id="registerUsername"
                  label="Username"
                  fullWidth
                  style={{ marginTop: 15 }}
                  size="small"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              ) : null}
              <TextField
                id="registerEmail"
                label="Email"
                value={email}
                size="small"
                fullWidth
                style={{ marginTop: 15 }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="registerPassword"
                label="Password"
                value={password}
                size="small"
                fullWidth
                style={{ marginTop: 15 }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div style={{
                display: "flex",
                justifyContent:'center'
              }}>
                <Button
                  margin={10}
                  intent="success"
                  style={{ marginTop: 30 }}
                  appearance="primary"
                  onClick={signUp}
                >
                  Signup
              </Button>
                <p
                  style={{
                    margin: 20,
                    marginTop: 40,
                    color: "blue",
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                  onClick={() => setIsSigned(false)}
                >
                  Signin
              </p>
              </div>
            </div>
          ) : (
              <div>
                <TextField
                  id="loginEmail"
                  label="Email"
                  size="small"
                  value={email}
                  fullWidth
                  style={{ marginTop: 15 }}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  id="loginPassword"
                  label="Password"
                  size="small"
                  value={password}
                  fullWidth
                  style={{ marginTop: 15 }}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div style={{ display: "flex", justifyContent:'center' }}>
                  <Button
                    margin={10}
                    style={{ marginTop: 30 }}
                    intent="success"
                    appearance="primary"
                    onClick={signIn}
                  >
                    Signin
              </Button>
                  <p
                    style={{
                      margin: 20,
                      marginTop: 40,
                      fontSize: 14,
                      cursor: "pointer",
                      color: "blue",
                    }}
                    onClick={() => setIsSigned(true)}
                  >
                    Signup
              </p>
                </div>
              </div>
            )}
        </div>
     </div>
    </>
  );
}

export default Login;
