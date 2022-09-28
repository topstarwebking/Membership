import React from "react";
import { Row, Col } from "reactstrap";
import UserModal from "./stripModal";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../assets/scss/pages/users.scss";
import { connect } from "react-redux";
import {
  getStripeList,
  TrashCandidate,
  TrashStripe,
} from "../../../../redux/actions/stripe";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import ShireenModal from "./strip2modal";
import EditDeleteStripActionPopMenu from "./editDeleteStrip";
import NoRankSvg from "../../../../assets/img/not_found.jpg";

class StripeList extends React.Component {
  componentDidMount() {
    this.props.getStripeList();
  }
  state = {
    handleUpdateTask: null,
    modal: false,
    selectedData: null,
    defaultAlert: false,
    defaultAlert2: false,
    color: "#626262",
    id: "",
    listingStudent: [],
    Modal: false,
    selectedData2: null,
    deleteCandidate: false,
    selectedProgramId: null,
    send: false,
  };
  openModal = (v) => {
    this.setState({
      modal: !this.state.modal,
      selectedData: v,
    });
  };
  openModal2 = (v) => {
    this.setState({
      selectedData2: v,
      Modal: !this.state.Modal,
    });
  };
  handleClickOpen = () => {
    this.setState({ defaultalert: true });
  };
  handleClose = () => {
    this.setState({ defaultalert: false });
  };

  OpenAlert = (id) => {
    this.setState({
      defaultAlert: !this.state.defaultAlert,
      id: id,
    });
  };
  deleteStripe = (id) => {
    if (this.state.deleteCandidate === true) {
      this.props.TrashCandidate(id);
      this.setState({ defaultAlert: !this.state.defaultAlert });
    } else {
      this.props.TrashStripe(id);
      this.setState({ defaultAlert: !this.state.defaultAlert });
    }
  };
  handeleStripe = (id) => {
    this.props.GET_MANAGE_STRIP(id);
    this.setState({
      listingStudent: this.promanagestripe,
    });
  };
  ModifyValueSendDeleteBooleon = (v) => {
    this.setState({
      send: true,
      deleteCandidate: true,
      id: v._id,
    });
  };

  chageSendToTrue = () => {
    this.setState({
      send: true,
    });
  };
  render() {
    const { selectedData, modal, Modal, selectedData2 } = this.state;
    return (
      <div>
        <div className="d-flex justify-content-between mt-3 pl-1 pr-1">
          <h5 style={{ fontSize: "20px" }}>Candidate</h5>
          <UserModal
            modal={modal}
            closeModal={this.openModal}
            selectedData={selectedData}
          />
        </div>
        <Row className="p-2 pt-0">
          {this.props.stripe?.length > 0 &&
            this.props.stripe?.map((v, i) => (
              <Col lg="3" sm="12" md="3" className="mt-1" key={i}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "8px",
                    boxShadow:
                      this.state.selectedProgramId === v?._id
                        ? `0px 1px 8px ${v.color}`
                        : "rgba(0, 0, 0, 0.1) 0px 4px 14px",
                  }}
                  onClick={() => {
                    this.setState({
                      listingStudent: v?.stripes,
                      selectedProgramId: v?._id,
                    });
                  }}
                >
                  <div
                    className="card-body rounded" 
                    style={{ height: "100%" }}
                  >
                    <div className="d-flex justify-content-between">
                      <div className="d-flex justify-content-start">
                        <Avatar
                          src={v?.candidate_image}
                          alt={v?.candidate}
                          className="mr-1"
                        />
                        <div>
                          <h5 className="mb-0" style={{ color: v?.color }}>
                            <b>{v?.candidate}</b>
                          </h5>
                          <p style={{ fontSize: 12 }}>
                            {moment(v.updatedAt).format("DD/MM/YYYY HH:mm A")}
                          </p>
                        </div>
                      </div>
                      <div>
                        <EditDeleteStripActionPopMenu
                          ModifyValueSendDeleteBooleon={
                            this.ModifyValueSendDeleteBooleon
                          }
                          openModal2={this.state.send ? this.openModal : null}
                          item={v}
                          deleteStripe={
                            this.state.send ? this.deleteStripe : null
                          }
                          OpenAlert={this.OpenAlert}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <p className="mb-0" style={{ fontWeight: 600 }}>
                          Stripe:{" "}
                        </p>
                        <span style={{ fontSize: 12 }}>{v.total_stripe}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <p className="mb-0" style={{ fontWeight: 600 }}>
                          Progression:{" "}
                        </p>
                        <span style={{ fontSize: 12 }}>{v.progression}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
        </Row>
        <div className="d-flex justify-content-between pl-1 mt-4 pr-1">
          <h5 style={{ fontSize: "20px" }}>Stripe </h5>
          <ShireenModal
            modal={Modal}
            closeModal={this.openModal2}
            selectedData={selectedData2}
          />
        </div>
        <br></br>
        <div className="px-1 mb-3">
          {this.state?.listingStudent?.length > 0?
        <Table>
          <TableHead style={{ backgroundColor: "rgb(234 244 254)" }}>
            <TableRow>
              <TableCell style={{ padding: "0.6em", fontSize: "14px" }}>
                {" "}
                <b>Stripe Image</b>
              </TableCell>
              <TableCell style={{ padding: "0.6em", fontSize: "14px" }}>
                <b>Candidate Name</b>
              </TableCell>
              <TableCell style={{ padding: "0.6em", fontSize: "14px" }}>
                {" "}
                <b>Stripe Name</b>
              </TableCell>
              <TableCell style={{ padding: "0.6em", fontSize: "14px" }}>
                {" "}
                <b>Stripe Order</b>
              </TableCell>
              <TableCell style={{ padding: "0.6em", fontSize: "14px" }}>
                {" "}
                <b>Manage</b>
              </TableCell>
            </TableRow>
          </TableHead>

          {this.state?.listingStudent?.length > 0 &&
            this.state?.listingStudent.map((v, i) => (
              <TableBody>
                <TableCell style={{ padding: "0.6em" }}>
                  {v?.stripe_image ? (
                    <img
                      src={v?.stripe_image}
                      className="mr-1"
                      style={{ width: "44px" }}
                    />
                  ) : (
                    <Avatar
                      src={v?.stripe_image}
                      alt={v?.stripe_name}
                      className="mr-1"
                    />
                  )}
                </TableCell>
                <TableCell style={{ padding: "0.6em", fontSize: "14px" }}>
                  <Typography className="m-0">{v?.candidate}</Typography>
                </TableCell>
                <TableCell style={{ padding: "0.6em", fontSize: "14px" }}>
                  <Typography className="m-0">{v?.stripe_name}</Typography>
                </TableCell>
                <TableCell style={{ padding: "0.6em", fontSize: "14px" }}>
                  {" "}
                  <Typography className="m-0">{v?.stripe_order}</Typography>
                </TableCell>

                <TableCell style={{ padding: "0.6em", marginRight: "0" }}>
                  <EditDeleteStripActionPopMenu
                    ModifyValueSendDeleteBooleon={this.chageSendToTrue}
                    openModal2={this.state.send ? this.openModal2 : null}
                    item={v}
                    deleteStripe={this.state.send ? this.deleteStripe : null}
                    OpenAlert={this.OpenAlert}
                  />
                </TableCell>
              </TableBody>
            ))}
        </Table>: <div>
                  <center>
                    <img src={NoRankSvg} width="230px" alt="No rank found" />
                    <b />
                    <h5>No Program Rank Found!</h5>
                  </center>
                </div>
  }
        </div>
        <SweetAlert
          title="Are you sure?"
          warning
          show={this.state.defaultAlert}
          showCancel
          reverseButtons
          cancelBtnBsStyle="danger"
          confirmBtnText="Yes, delete it!"
          cancelBtnText="Cancel"
          onConfirm={() => this.deleteStripe(this.state.id)}
          onCancel={() => {
            this.setState({ defaultAlert: !this.state.defaultAlert });
          }}
        >
          You won't be able to revert this!
        </SweetAlert>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    stripe: state.stripe.stripeList,
    candidate: state.candidate,
  };
};
export default connect(mapStateToProps, {
  getStripeList,
  TrashCandidate,
  TrashStripe,
})(StripeList);
