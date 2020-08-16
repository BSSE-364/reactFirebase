import React, { useContext } from "react";
import { ContextValues } from "../App";
import { Pane, Dialog } from "evergreen-ui";
import FormikContainer from "../Forms/FormikContainer";

function UpdateModal() {
  const context = useContext(ContextValues);
  return (
    <>
      <Pane>
        <Dialog
          isShown={context.showModal}
          title="Update Data"
          shouldCloseOnOverlayClick={false}
          hasHeader={false}
          hasFooter={false}
          topOffset="5vmin"
          width={400}
        >
          <FormikContainer />
        </Dialog>
      </Pane>
    </>
  );
}

export default UpdateModal;
