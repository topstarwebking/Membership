import React from "react";
import { Button, Modal, ModalBody, Row, Label } from "reactstrap";
import NumberFormat from "react-number-format";
import { Checkbox } from "@material-ui/core";
import CMAPlannerLogo from "../../../../assets/img/logo/cmaPlannerLogo.png";
import { connect } from "react-redux";
import { PAY_AND_REGISTER } from "../../../../redux/actions/test";
import CardDetails from "../../../pages/studentInfo/componets/membershipActions/cardDetails";

class ModalForm extends React.Component {
  state = {
    modal: false,
    method: "Cash",
    cardDetails: {
      pan: "",
      cvv: "",
      card_holder_name: "",
      expiry_month: "",
      expiry_year: "",
      address: "",
      street_no: "",
      zip: "",
    },
    financeId: "",
    cheque_no: "",
  };

  updateCardDetails = () => {
    const [cardInfo] = this.props.getStudentFinanceInfo;
    this.setState({
      financeId: cardInfo?._id,
      cardDetails: {
        ...this.state.cardDetails,
        pan: cardInfo?.pan,
        cvv: cardInfo?.cvv,
        card_holder_name: cardInfo?.card_holder_name,
        address: cardInfo?.address?.address,
        street_no: cardInfo?.address?.street_no,
        zip: cardInfo?.address?.zip,
        expiry_month: cardInfo?.expiry_date
          ? cardInfo?.expiry_date.substr(0, 2)
          : "",
        expiry_year: cardInfo?.expiry_date
          ? cardInfo?.expiry_date.substr(2, 3)
          : "",
      },
    });
  };

  toggleModal = () => {
    const { getStudentFinanceInfo } = this.props;
    if (getStudentFinanceInfo.length) this.updateCardDetails();
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  payAndRegister = async () => {
    const { testInfo, studentData, PAY_AND_REGISTER } = this.props;
    const { method } = this.state;
    let payload = {
      testId: testInfo?._id,
      firstName: studentData?.firstName,
      lastName: studentData?.lastName,
      rating: studentData?.rating,
      current_rank_name: studentData?.current_rank_name,
      next_rank_name: studentData?.next_rank_name,
      next_rank_img: studentData?.next_rank_img,
      current_rank_img: studentData?.current_rank_img,
      program: studentData?.program,
      memberprofileImage: studentData?.memberprofileImage,
      studentId: studentData?.studentId,
      paidAmount: testInfo?.total_price,
      date: testInfo?.createdAt,
      isDeleted: studentData?.isDeleted,
      method: method,
      phone: studentData?.phone,
      lastPromotedDate: studentData?.lastPromotedDate,
      cheque_no: this.state.cheque_no,
    };
    if (method === "Credit Card") {
      payload.cardDetails = this.state.cardDetails;
      payload.financeId = this.state.financeId;
    }
    const pay = await PAY_AND_REGISTER(payload,this.props.activeEvent?._id);
    if (pay) {
      this.toggleModal();
    } else {
      this.toggleModal();
    }
  };

  changeHandler = (e) => {
    const { value, name } = e.target;
    this.setState({
      cardDetails: {
        ...this.state.cardDetails,
        [name]: value,
      },
    });
  };
  onChange = (e) => {
    this.setState({
      method: e.target.value,
    });
  };
  render() {
    const { testInfo } = this.props;
    return (
      <React.Fragment>
        <Button.Ripple color="success" size="sm" onClick={this.toggleModal}>
          Buy Now
        </Button.Ripple>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered modal-lg"
        >
          <ModalBody>
            <div className="d-flex justify-content-around">
              <h1>Checkout</h1>
              <img alt="logo" src={CMAPlannerLogo} />
            </div>
            <table className="table table-striped">
              <thead className="m-10 bg-primary text-white">
                <tr>
                  <th>Product Name</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{testInfo?.programName}</td>
                  <td>{testInfo?.total_price}</td>
                </tr>
              </tbody>
            </table>
            <div className="pt-4">
              <h4 className="text-primary">Select Payment Method </h4>
            </div>
            <div className="d-flex justify-content-around pt-2 pb-2  bg-light">
              <div className="form-check-inline">
                <span>Cash</span>
                <Checkbox
                  onChange={() => this.setState({ method: "Cash" })}
                  size="small"
                  label={"Cash"}
                  checked={this.state.method === "Cash"}
                />
              </div>
              <div className="form-check-inline">
                <span>Check</span>
                <Checkbox
                  onChange={() => this.setState({ method: "Check" })}
                  size="small"
                  label={"Check"}
                  checked={this.state.method === "Check"}
                />
              </div>
              <div className="form-check-inline">
                <span>Credit Card</span>
                <Checkbox
                  onChange={() => this.setState({ method: "Credit Card" })}
                  size="small"
                  label={"Credit Card"}
                  checked={this.state.method === "Credit Card"}
                />
              </div>
            </div>
            {this.state.method === "Credit Card" && (
              <div className="pt-4 pb-4">
                <Row>
                  <CardDetails
                    changeHandler={this.changeHandler}
                    cardDetails={this.state.cardDetails}
                  />
                </Row>
              </div>
            )}
            {this.state.method === "Check" && (
              <div className="pt-2 pb-4">
                <div>
                  <Label htmlFor="cheque_number">Check Number</Label>
                </div>
                <NumberFormat
                  required
                  name="cheque_no"
                  id="cheque_number"
                  value={this.state.cheque_no}
                  placeholder="Check number"
                  onChange={(e) =>
                    this.setState({ [e.target.name]: e.target.value })
                  }
                  format="#### #### ####"
                  className="form-control"
                />
                {!this.state?.cheque_no && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    cheque number required!
                  </span>
                )}
              </div>
            )}
            <div className="pt-4 pb-4 col-md-12 text-center">
              <button
                type="submit"
                className="btn btn-lg btn-primary"
                onClick={this.payAndRegister}
              >
                Pay Now
              </button>
            </div>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getStudentFinanceInfo: state.billingFinance.getStudentFinanceInfo,
    activeEvent: state.appointmentAndEvent.activeEvent,
  };
};
export default connect(mapStateToProps, { PAY_AND_REGISTER })(ModalForm);
