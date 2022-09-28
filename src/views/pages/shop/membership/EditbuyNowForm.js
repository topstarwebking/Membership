import React, { Fragment } from "react";
import {
  FormGroup,
  Input,
  Label,
  CustomInput,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Table,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import {
  GET_STUDENT_PURCHASE_LIST,
  GET_MEMBERSHIP_LIST,
  EDIT_MEMBERSHIP,
  EDIT_BOUGTH_MEMBERSHIP_OF_STUDENT,
} from "../../../../redux/actions/shop";
import { connect } from "react-redux";
import { Button, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

class PaymentSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  changeHandler = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
    // let { balance, payment_time, payment_money, register_fees, dpayment, totalp } = this.state;
    // balance = parseInt(totalp) - (parseInt(register_fees) + parseInt(dpayment))
    // payment_money = (parseInt(balance) / parseInt(payment_time)) // money to dive
    // if (balance !== NaN && balance !== NaN) {
    //   this.setState({ ...this.state, balance, payment_money })
    // }
  };

  EditMemberShip = (e) => {
    let selected = this.props.shop.membershipList.filter(
      (item) => item?._id === e.target.value
    )[0];
    this.setState({
      ...this.state,
      [e.target.name]: selected?.membership_name,
      Selectedmembership: selected,
    });
  };
  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };
  BuyNow = (e) => {
    e.preventDefault();
    let payload = this.state;
    delete payload.Selectedmembership;
    delete payload.modal;
    this.props.EDIT_BOUGTH_MEMBERSHIP_OF_STUDENT(payload, this.props.data?._id);
    this.props.toggle();
  };
  componentDidMount() {
    this.props.GET_MEMBERSHIP_LIST();
  }

  render() {
    const { membershipList } = this.props.shop;
    const { data } = this.props;
    return (
      <Fragment>
        <IconButton size="small" onClick={this.toggleModal}>
          <EditIcon />
        </IconButton>
        <Modal
          style={{ zIndex: 0 }}
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered modal-lg"
        >
          <ModalHeader toggle={this.toggleModal}>Edit Membership</ModalHeader>
          <ModalBody>
            <Card>
              <CardBody>
                <Row>
                  <Col md="12" sm="12">
                    <Form onSubmit={this.BuyNow}>
                      <Row>
                        <Col sm="4">
                          <FormGroup>
                            <Label> Membership</Label>
                            <CustomInput
                              required
                              type="select"
                              name="membership_name"
                              onChange={this.EditMemberShip}
                              defaultValue={data?.membership_name}
                              id="name"
                            >
                              {membershipList?.map((value, index) => {
                                return (
                                  <option key={index} value={value?._id}>
                                    {value?.membership_name}
                                  </option>
                                );
                              })}
                            </CustomInput>
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup>
                            <div>
                              <Label htmlFor="durationVertical">
                                Duration:
                              </Label>
                            </div>
                            <Input
                              required
                              type="number"
                              name="membership_duration"
                              defaultValue={data?.membership_duration}
                              onChange={this.changeHandler}
                              id="durationVertical"
                              placeholder="Duration"
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup>
                            <div>
                              <Label htmlFor="registrationVertical">
                                Registration Fee:
                              </Label>
                            </div>
                            <Input
                              required
                              type="number"
                              name="register_fees"
                              defaultValue={data?.register_fees}
                              onChange={this.changeHandler}
                              id="registrationVertical"
                              placeholder="$"
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup>
                            <div>
                              <Label htmlFor="EmailVertical">
                                Membership Activation Date:
                              </Label>
                            </div>
                            <Input
                              required
                              type="date"
                              name="mactive_date"
                              id="dateVertical"
                              defaultValue={data?.mactive_date}
                              onChange={this.changeHandler}
                              placeholder="Membership Activation Date"
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup>
                            <div>
                              <Label htmlFor="expiryVertical">
                                Membership Expiry Date:
                              </Label>
                            </div>
                            <Input
                              required
                              type="date"
                              name="expiry_date"
                              defaultValue={data?.expiry_date}
                              onChange={this.changeHandler}
                              id="expiryVertical"
                              placeholder="Membership Expiry Date:"
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup>
                            <div>
                              <Label htmlFor="totalpriceVertical">
                                {" "}
                                Total Price:
                              </Label>
                            </div>
                            <Input
                              required
                              type="number"
                              name="totalp"
                              defaultValue={data?.totalp}
                              onChange={this.changeHandler}
                              id="totalpriceVertical"
                              placeholder="$"
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup>
                            <div>
                              <Label htmlFor="totalpriceVertical">
                                {" "}
                                Balance:
                              </Label>
                            </div>
                            <Input
                              required
                              type="number"
                              name="balance"
                              defaultValue={data?.balance}
                              onChange={this.changeHandler}
                              id="balanceVertical"
                              placeholder="$"
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup>
                            <div>
                              <Label htmlFor="totalpriceVertical">
                                Down Payment:
                              </Label>
                            </div>
                            <Input
                              required
                              type="number"
                              name="dpayment"
                              defaultValue={data?.dpayment}
                              onChange={this.changeHandler}
                              id="downPaymentVertical"
                              placeholder="$"
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup className="form-label-group">
                            <div>
                              <Label htmlFor="PaymentsFloating">Payments</Label>
                            </div>
                            <Input
                              required
                              type="number"
                              name="payment_time"
                              defaultValue={data?.payment_time}
                              onChange={this.changeHandler}
                              id="paymentsFloating"
                              placeholder="Payments"
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup className="form-label-group">
                            <div>
                              <Label> Monthly </Label>
                            </div>
                            <CustomInput
                              required
                              type="select"
                              name="payment_type"
                              defaultValue={data?.payment_type}
                              onChange={this.changeHandler}
                              id="profiletype"
                            >
                              <option value="">Please Select</option>
                              <option value="Monthly">Monthly</option>
                              <option value="Weekly">Weekly</option>
                              <option value="PIF">PIF</option>
                            </CustomInput>
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup className="form-label-group">
                            <div>
                              <Label htmlFor="dollerFloating">Of $</Label>
                            </div>
                            <Input
                              required
                              type="text"
                              name="payment_money"
                              defaultValue={data?.payment_money}
                              onChange={this.changeHandler}
                              id="dollerFloating"
                              placeholder="$"
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup className="form-label-group">
                            <div>
                              <Label> Due Every </Label>
                            </div>
                            <CustomInput
                              required
                              type="select"
                              name="due_every"
                              defaultValue={data?.due_every}
                              onChange={this.changeHandler}
                              id="Due"
                            >
                              <option value="1">1</option>
                              <option value="5">5</option>
                              <option value="10">10</option>
                              <option value="15">15</option>
                              <option value="20">20</option>
                              <option value="25">25</option>
                              <option value="30">30</option>
                            </CustomInput>
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup className="form-label-group">
                            <div>
                              <Label> Please Select </Label>
                            </div>
                            <CustomInput
                              required
                              type="select"
                              name="ptype"
                              defaultValue={data?.ptype}
                              onChange={this.changeHandler}
                              id="Due"
                            >
                              <option value="cash">Cash</option>
                              <option value="check">Check</option>
                              <option value="credit card">Credit card</option>
                            </CustomInput>
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <FormGroup className="form-label-group">
                            <div>
                              <Label> Please Select </Label>
                            </div>
                            <CustomInput
                              required
                              type="select"
                              name="pay_inout"
                              defaultValue={data?.pay_inout}
                              onChange={this.changeHandler}
                              id="Due"
                            >
                              <option value="">Please Select</option>
                              <option value="In house">In house</option>
                              <option value="auto pay">Auto pay</option>
                            </CustomInput>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Table striped>
                        <thead>
                          <tr>
                            <th style={{ columnWidth: "50rem" }}>
                              Description
                            </th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              {this.state?.payments_types === "month"
                                ? "Months(Monthly)"
                                : "Weeks(Weekly)"}
                            </td>
                            <td>{this.state?.duration_time}</td>
                          </tr>
                          <tr>
                            <td>Down Payment</td>
                            <td>{this.state?.down_payment}</td>
                          </tr>
                          <tr>
                            <td style={{ color: "red" }}>Balance</td>
                            <td>{this.state?.balance}</td>
                          </tr>
                        </tbody>
                      </Table>
                      <Button
                        type="submit"
                        style={{
                          color: "#55a65b",
                          background: "#def8e7",
                          fontWeight: "bold",
                          float: "right",
                          borderRadius: "10px",
                        }}
                      >
                        {this.props?.editTrue
                          ? "Update Membership"
                          : "Buy Membership"}
                        <span
                          role="img"
                          aria-label="party emoji here"
                          className="ml-1"
                        >
                          🎉
                        </span>
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    shop: state.shop,
  };
};

export default connect(mapStateToProps, {
  EDIT_MEMBERSHIP,
  EDIT_BOUGTH_MEMBERSHIP_OF_STUDENT,
  GET_STUDENT_PURCHASE_LIST,
  GET_MEMBERSHIP_LIST,
})(PaymentSummary);
