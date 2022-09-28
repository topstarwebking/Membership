import React from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap"
import Financedata from './financebillingForm'
// import { modalForm } from "./ModalSourceCode"

class ModalForm extends React.Component {
  state = {
    activeTab: "1",
    modal: false
  }

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab })
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  render() {
    return (
      <React.Fragment>

        <Button.Ripple
          color="primary"
          // outline
          onClick={this.toggleModal}
        >
          Launch Modal 
        </Button.Ripple>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleModal} style={{ background:"none",paddingLeft:"35px"}}>
            Add New Finance Info
          </ModalHeader>
          <ModalBody>
            <Financedata />
          </ModalBody>
        </Modal>

      </React.Fragment>
    )
  }
}
export default ModalForm
