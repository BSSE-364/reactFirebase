import React, { useContext } from "react";
import { ContextValues } from "../App";
import {
  List,
  ListItem,
  ListIcon,
  Divider,
  Box,
  Heading,
} from "@chakra-ui/core";
import { EditIcon, DeleteIcon } from "evergreen-ui";
import { NavLink } from "react-router-dom";

function View() {
  const context = useContext(ContextValues);

  return (
    <>
      <NavLink to="/">
        <Heading mt="10" fontSize="md">
          Add more data
        </Heading>
      </NavLink>
      <Box d="flex" flexWrap="wrap" mt="10">
        {Object.keys(context.fetchData).map((info) => (
          <List
            mb="5"
            p="5"
            color="#DDEBF7"
            key={info}
            ml="8"
            mr="8"
            bg="#1070CA"
            w="20%"
          >
            <ListItem>
              <ListIcon icon="check-circle" />
              {context.fetchData[info].values.username}
            </ListItem>
            <ListItem pt="3">
              <ListIcon icon="check-circle" />
              {context.fetchData[info].values.email}
            </ListItem>
            <ListItem pt="3">
              <ListIcon icon="check-circle" />
              {context.fetchData[info].values.city}
            </ListItem>
            <ListItem pt="3" textAlign="justify">
              <ListIcon icon="check-circle" />
              {context.fetchData[info].values.message}
            </ListItem>
            <Divider />
            <Box d="flex" justifyContent="center">
              <EditIcon color="#ffffff" marginRight={20} />
              <DeleteIcon color="#ffffff" />
            </Box>
          </List>
        ))}
      </Box>
    </>
  );
}

export default View;
