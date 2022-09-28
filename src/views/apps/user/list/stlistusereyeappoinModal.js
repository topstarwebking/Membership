import React from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import AppoineyemdlForm from "./appoineyemdlForm";
import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
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
        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.toggleModal}
            disabled
            style={{marginTop:"1em", paddingLeft:"1rem", paddingRight:"1rem"}}
          >
             Add Appointment
          </button>
        </div>
        <Dialog
          open={this.state.modal}
          onClose={this.toggleModal}
        >
          <DialogActions toggle={this.toggleModal}></DialogActions>
          <DialogContent>
            <AppoineyemdlForm />
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}
export default ModalForm;
