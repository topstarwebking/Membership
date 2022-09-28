import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import NewTestingForm from "./NewTestingForm";
class ModalForm extends React.Component {
  state = {
    modal: true,
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleModal}>Edit Product</ModalHeader>
          <ModalBody>
            <NewTestingForm
              editStatus={true}
              editData={this.props.editData}
              toggle={this.toggleModal}
            />
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
export default ModalForm;
