import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import EditMemberShip from "./editMembershipForm";

class ModalForm extends React.Component {
  state = {
    activeTab: "1",
    modal: true,
    pricingOption:1
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
    const { userinfo } = this.props;
    return (
      <React.Fragment>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-lg"
        >
          <ModalHeader toggle={this.toggleModal}>Edit Membership</ModalHeader>
          <ModalBody>
            <EditMemberShip
              folderId={this.props.folderId}
              toggle={this.toggleModal}
              userinfo={userinfo}
              pricingOption={this.state.pricingOption}

            />
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
export default ModalForm;
