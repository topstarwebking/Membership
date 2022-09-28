import React from "react";
import { Modal, ModalHeader, ModalBody, } from "reactstrap";
import NewCategory from "./createFolderForm";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "@material-ui/core";

class ModalForm extends React.Component {
  state = {
    hover: false,
    modal: false,
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  render() {
    return (
      <React.Fragment>
        <div className="p-1">
          <Button
            size="small"
            startIcon={<AddIcon style={{ color: "#fff" }} />}
            label={<b>Add Folder</b>}
            onClick={this.toggleModal}
            style={{ background: "#2796f3", color: "#ffff", padding:"10px 10px", width:"100%", borderRadius:"6px"}}
          >
            Add Folder
          </Button>
        </div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleModal}>Add New Folder</ModalHeader>
          <ModalBody>
            <NewCategory toggle={this.toggleModal} />
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
export default ModalForm;
