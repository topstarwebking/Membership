import React from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap"
import CreatePrograme from "./createprograme"
import "./style.css"
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
          New Program
        </Button.Ripple>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered"
          id="bigModal"
        >
          <ModalHeader toggle={this.toggleModal} style={{ background:"none",paddingLeft:"35px"}}>
            Create a New Program
          </ModalHeader>
          <ModalBody>
            <CreatePrograme toggleModal={this.toggleModal}/>
          </ModalBody>

        </Modal>

      </React.Fragment>
    )
  }
}
export default ModalForm
