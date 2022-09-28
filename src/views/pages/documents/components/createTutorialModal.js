import React from "react";
import { Modal, ModalHeader, ModalBody, } from "reactstrap";
import NewCategory from "./createTutorialForm";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "@material-ui/core";

class ModalForm extends React.Component {
  state = {
    hover: false,
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
        <div className="p-1">
          <Button
            size="small"
            startIcon={<AddIcon style={{ color: "#fff" }} />}
            label={<b>Add Tutorial</b>}
            onClick={this.toggleModal}
            style={{ background: "#2796f3", color: "#ffff", padding:"10px 10px", width:"100%", borderRadius:"6px"}}
          >
            Add Tutorial
          </Button>
        </div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered"
          
        >
          <ModalHeader toggle={this.toggleModal}>Add Tutorial</ModalHeader>
          <ModalBody>
            <NewCategory toggle={this.toggleModal} 
            activeSubMainFolder={this.props.activeSubMainFolder}
            />
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
export default ModalForm;
