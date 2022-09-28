import React from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import NewCategory from "./documentUploadForm";
import { Upload } from "react-feather";

class ModalForm extends React.Component {
  state = {
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
        <Button
          color="primary"
          style={{
            padding: "0.6rem 1rem",
            marginLeft: "10px",
            fontWeight: 700,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onClick={this.toggleModal}
        >
          <Upload size={15} strokeWidth={3} style={{ marginRight: 10 }} />
          Upload Document
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleModal}>
            Upload Documents Management
          </ModalHeader>
          <ModalBody>
            <NewCategory toggle={this.toggleModal} />
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
export default ModalForm;
