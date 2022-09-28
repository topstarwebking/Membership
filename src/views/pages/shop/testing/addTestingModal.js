import { Button } from "@material-ui/core";
import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import NewTestingForm from "./NewTestingForm";

class ModalForm extends React.Component {
  state = {
    activeTab: "1",
    modal: false,
  };

  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  render() {
    return (
      <div style={{ widht: "100%" }} className="btn-product">
        <Button
          onClick={this.toggleModal}
          style={{
            textTransform: "none",
            fontWeight: "600",
            color: "#FFF",
            background: "#0184FF",
            padding: "10px 10px",
            width: "100%",
            borderRadius: "6px",
            borderColor: "rgb(1, 132, 255)",
          }}
        >
          + Add Product
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleModal}>Add New Product</ModalHeader>
          <ModalBody>
            <NewTestingForm toggle={this.toggleModal} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default ModalForm;
