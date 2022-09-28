import React, { Fragment } from "react";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import ProgramModal from "./programeModal";
import CategoryModal from "./categoryModal";
import { connect } from "react-redux";
import CreatePrograme from "./createprograme";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  GET_PROGRAM_LIST,
  DELETE_PROGRAM,
} from "../../../../redux/actions/programe";
import "../../../../assets/scss/pages/users.scss";
import moment from "moment";
import { Avatar, IconButton } from "@material-ui/core";
import EditDeleteStripActionPopMenu from "./editDeletProgram";

class UsersList extends React.Component {
  componentDidMount() {
    this.props.GET_PROGRAM_LIST();
  }
  state = {
    selectedProgramId: null,
    programToEdit: [],
    defaultAlert: false,
    handleUpdateTask: null,
    color: "#626262",
    send: false,
  };

  ConFirmDelete = () => {
    this.props.DELETE_PROGRAM(this.state?.selectedProgramId);
    this.setState({ defaultAlert: false, actionFolder: null });
  };

  handleCancel = () => {
    this.setState({ defaultAlert: false, actionFolder: null });
  };

  toggleModal = (v) => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
      programToEdit: v,
    }));
  };

  SelectProgram = (v) => {
    this.setState({ selectedProgramId: v?._id });
    this.props.handleSelectProgram(
      v?.program_category,
      v?.program_rank,
      v?.programName
    );
  };

  deleteProgram = (id) => {
    this.setState({
      selectedProgramId: id,
      defaultAlert: true,
      actionFolder: null,
    });
  };

  changesSendValueTrue = () => {
    this.setState({
      send: true,
    });
  };
  render() {
    const { selectedProgramId } = this.state;
    return (
      <Fragment>
        <Row className="app-user-list">
          <Col sm="12">
            <Card>
              <CardHeader>
                <h3 className="mb-0">Programs</h3>
                <ProgramModal />
                {/* <CategoryModal /> */}
              </CardHeader>
              <CardBody>
                <Row>
                  {this.props.program?.programList.length > 0 &&
                    this.props.program?.programList.map((v, i) => (
                      <Col lg="3" sm="12" md="3" className="mt-1" key={i}>
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "8px",
                            boxShadow:
                              selectedProgramId === v?._id
                                ? `0px 1px 8px ${v.color}`
                                : "0px 4px 14px rgb(0 0 0 / 10%)",
                          }}
                        >
                          <div
                            className="card-body"
                            style={{ cursor: "pointer"}}
                            onClick={() => this.SelectProgram(v)}
                          >
                            <div className="d-flex justify-content-between">
                              <div className="d-flex justify-content-start">
                                <Avatar
                                  style={{ background: v.color }}
                                  alt={v?.programName}
                                  src="bwkqb"
                                  className="mr-1"
                                />
                                <div>
                                  <h5 className="font-bold mb-0">
                                    <b>{v.programName}</b>
                                  </h5>
                                  <p style={{ fontSize: 12 }}>
                                    {moment(v.createdAt).format(
                                      "MM/DD/YYYY HH:mm"
                                    )}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <EditDeleteStripActionPopMenu
                                  changesSendValueTrue={
                                    this.changesSendValueTrue
                                  }
                                  openModal2={
                                    this.state.send ? this.toggleModal : null
                                  }
                                  item={v}
                                  deleteStripe={
                                    this.state.send ? this.deleteStripe : null
                                  }
                                  OpenAlert={this.deleteProgram}
                                />
                              </div>
                            </div>
                            <div className="d-flex justify-content-between">
                              <div className="d-flex align-items-center">
                                <p className="mb-0" style={{ fontWeight: 600 }}>
                                  Total Rank:{" "}
                                </p>
                                <span style={{ fontSize: 12 }}>
                                  {v.total_rank}
                                </span>
                              </div>
                              <div className="d-flex align-items-center">
                                <p className="mb-0" style={{ fontWeight: 600 }}>
                                  Type:{" "}
                                </p>
                                <span style={{ fontSize: 12 }}>{v.type}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleModal}>Edit Program</ModalHeader>
          <ModalBody>
            <CreatePrograme
              programToEdit={this.state.programToEdit}
              toggleModal={this.toggleModal}
            />
          </ModalBody>
        </Modal>
        <SweetAlert
          title="Are you sure?"
          warning
          show={this.state.defaultAlert}
          showCancel
          reverseButtons
          cancelBtnBsStyle="danger"
          confirmBtnText="Yes, delete it!"
          cancelBtnText="Cancel"
          onConfirm={this.ConFirmDelete}
          onCancel={this.handleCancel}
        >
          You won't be able to revert this!
        </SweetAlert>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    program: state.program,
  };
};
export default connect(mapStateToProps, { GET_PROGRAM_LIST, DELETE_PROGRAM })(
  UsersList
);
