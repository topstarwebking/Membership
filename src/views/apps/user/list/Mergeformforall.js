import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Document from "../../../pages/documents/components/Documents";
import { Chip } from "@material-ui/core";

class Mergeformforall extends React.Component {
  state = { modal: false };
  toggleModal = () => {
    this.setState((prevState) => ({ modal: !prevState.modal }));
  };
  
  render() {

    return (
      <React.Fragment>
        <Chip
          size="small"
          label={<b>Print</b>}
          style={{
            background: "#106ab3",
            padding: "0.5em",
            color: "#ffff",
            margin: "1px",
          }}
          onClick={this.toggleModal}
          disabled={this.props.data?.length > 0 ? false : true}
        ></Chip>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered modal-lg"
          style={{ minWidth: "1000px", width: "100%"}}
        >
          <ModalHeader toggle={this.toggleModal}> Member Merge </ModalHeader>
          <ModalBody>
            <Document
              data={this.props.data}
              isrecommendedOrregistered={this.props?.isrecommendedOrregistered}
            />
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
export default Mergeformforall;
