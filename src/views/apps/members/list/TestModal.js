import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Plus } from "react-feather";
import TestTabs from "./TestTabs";
const TestModal = () => {
  const [state, setState] = useState({
    modal: false,
  });

  const toggleModal = () => {
    setState({
      modal: state.modal,
    });
  };

  return (
    <React.Fragment>
      <Button
        className="btn-lg fides3 btn waves-effect waves-light"
        onClick={toggleModal}
      >
        <Plus size={21} />
        <br></br>
        Test
      </Button>

      <Modal
        isOpen={state.modal}
        toggle={toggleModal}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader toggle={toggleModal}>
          The following student have been selected for promoption.Please promote
          rank.
        </ModalHeader>
        <ModalBody>
          <TestTabs />
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default TestModal;
