import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import UserCreateForm from "./createstrip";

class ModalForm extends React.Component {
  state = {
    activeTab: "2",
    modal: false,
  };

  componentDidUpdate(prevProps) {
    if (this.props.modal !== prevProps.modal) {
      this.setState({
        modal: this.props.modal,
      });
    }
  }
  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
    this.props.closeModal();
  };


  render() {
    return (
      <React.Fragment>
        <React.Fragment>
          <Button.Ripple color="primary" onClick={this.toggleModal}>
            New {this.props?.candidateOrStripe}
          </Button.Ripple>

          <Modal
            isOpen={this.state.modal}
            toggle={this.toggleModal}
            className="modal-dialog-centered"
            id="bigModal"
          >
            <ModalHeader toggle={this.toggleModal} style={{ background:"none",paddingLeft:"35px"}}>
             {this.props.selectedData ? "Manage Candidate" :"Create Candidate"}
            </ModalHeader>
            <ModalBody >
              <UserCreateForm
                toggle={this.toggleModal}
                selectedData={this.props.selectedData}
              />
            </ModalBody>
          </Modal>
        </React.Fragment>
      </React.Fragment>
    );
  }
}
export default ModalForm;
