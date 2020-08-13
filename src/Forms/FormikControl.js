import React from "react";
import ChakraInput from "./ChakraInput";
import TextArea from "./TextArea";

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "chakraInput":
      return <ChakraInput {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
