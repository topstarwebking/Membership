import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import AddProgramRankOrEdit from "./addProgramRank";

class ModalForm extends React.Component {
  render() {
    const { editRankStatus, toggleModal, modalOpen, editRank } = this.props;
    return (
      <React.Fragment>
        <Button.Ripple
          color="primary"
          // outline 
          onClick={toggleModal}>
          Create Program Rank
        </Button.Ripple>
        <Modal
          isOpen={modalOpen}
          toggle={toggleModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={toggleModal}>
            {editRankStatus ? "Edit Program Rank" : "Create Program Rank"}
          </ModalHeader>
          <ModalBody>
            <AddProgramRankOrEdit
              editRankStatus={editRankStatus}
              toggle={toggleModal}
              editRank={editRank}
            />
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
export default ModalForm;
