import React from "react"
import {
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap"
import { Phone } from "react-feather"
import { IconButton} from '@material-ui/core';
// import Financedata from './financeForm'
import "../../../assets/scss/pages/users.scss"

class ModalForm extends React.Component {
  state = {
    modal: false
  }



  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  render() {
    return (
      <React.Fragment>
        <IconButton
          onClick={this.toggleModal}
        >
          <Phone
            size={20}
          />
        </IconButton>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered modal-md"
        >
          <ModalHeader toggle={this.toggleModal}>
            Are you sure you want to call
          </ModalHeader>
          <ModalBody>
            <div className="mdl_align_text">
              <button className="btn_yes_call">
                Yes
              </button>
              <button className="btn_no_call">
                No
              </button>
            </div>
          </ModalBody>
          {/* <ModalFooter>
                  <Button color="primary" onClick={this.toggleModal}>
                    Next
                  </Button>{" "}
                </ModalFooter> */}
        </Modal>

      </React.Fragment>
    )
  }
}
export default ModalForm
