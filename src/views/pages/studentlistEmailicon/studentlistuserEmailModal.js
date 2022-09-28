import React, { useState } from "react";
import { ModalHeader, ModalBody } from "reactstrap";
import { Mail } from "react-feather";
import EmailstForm from "./emailstForm";
import { Dialog, IconButton } from "@material-ui/core";
const StudentlistuserEmailModal = (props) => {
  const [state, setState] = useState(false);
  const toggleModal = () => {
    setState(!state);
  };
  return (
    <div>
      <React.Fragment>
        <IconButton onClick={toggleModal} style={{paddingLeft:"0"}}>
          <Mail size={20} />
        </IconButton>
        <Dialog open={state} maxWidth="lg">
          <ModalHeader toggle={toggleModal}>Email</ModalHeader>
          <ModalBody>
            <EmailstForm item={props.item} toggleModal={toggleModal} />
          </ModalBody>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default StudentlistuserEmailModal;
