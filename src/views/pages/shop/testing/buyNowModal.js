import { Chip } from "@material-ui/core";
import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import BuyNowForm from "./buyNowForm";

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
      <div>
        <Chip
          size="small"
          label={<b>Buy Now</b>}
          onClick={this.toggleModal}
          style={{
            borderRadius: "4px",
            background: "#eaf4fe",
            color: "#2a9cf5",
          }}
        />
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered modal-lg"
        >
          <ModalHeader toggle={this.toggleModal}>Buy Testing</ModalHeader>
          <ModalBody>
            <BuyNowForm toggle={this.toggleModal} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default ModalForm;
