import React, { Fragment } from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
  CustomInput,
  ButtonGroup,
} from "reactstrap";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { EDIT_MEMBERSHIP } from "../../../../redux/actions/shop";
import { GET_PROGRAM_LIST } from "../../../../redux/actions/programe";
import AttachDocxfile from "./components/attacheFiles";

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.userinfo;
    this.changeHandler = this.changeHandler.bind(this);
    this.handleDocument = this.handleDocument.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.shop.membershipList.length >
      prevProps.shop.membershipList.length
    ) {
      this.props.toggle();
    }
  }

  changeHandler(e) {
    this.setState({ ...this.state, [e.target.name]: e.target.value }, () => {
      var total_price = Number(this.state.total_price);
      var down_payment = Number(this.state.down_payment);
      var balance_amount = total_price - down_payment;
      var no_of_payment = Number(this.state.no_of_payment);
      var emi_amount = balance_amount / no_of_payment || 0;
      this.setState({
        balance: String(balance_amount),
        amount: String(emi_amount),
      });
    });
  }

  handleSelectsubFolder = (e, newValue) => {
    this.setState({
      folderId: newValue?._id,
      old_folderId: this.props.folderId,
    });
  };
  handleDocument = (docFile) => {
    this.setState({ ...this.state, docs: docFile });
  };

  onsubmit = (e) => {
    e.preventDefault();
    let memberIdShip = this.state?._id;
    delete this.state?.__v;
    delete this.state?.userId;
    delete this.state?._id;
    delete this.state?.updatedAt;
    delete this.state?.createdAt;
    if (this.state?.regular_price === null) {
      delete this.state?.regular_price;
    }
    if (this.state?.docs !== undefined) {
      delete this.state?.membershipDoc
      delete this.state?.membershipDocName
    }
    this.props.EDIT_MEMBERSHIP(this.state, memberIdShip);
    this.props.toggle();
  };

  render() {
    const { getmebershipfolderlisting } = this.props;
    return (
      <Card>
        <CardBody>
          <Form className="mt-10" onSubmit={this.onsubmit}>
            <Row>
              <Col sm="6" md="6">
                <div>
                  <Label htmlFor="nameFloating">
                    Membership Name<sup>*</sup>
                  </Label>
                </div>
                <FormGroup className="form-label-group">
                  <Input
                    type="text"
                    name="membership_name"
                    value={this.state.membership_name}
                    id="nameFloating"
                    placeholder="Membership Name"
                    onChange={this.changeHandler}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup className="form-label-group">
                  <div>
                    <Label>
                      Membership Type <sup>*</sup>
                    </Label>
                  </div>
                  <CustomInput
                    type="select"
                    name="membership_type"
                    value={this.state.membership_type}
                    id="status"
                    onChange={this.changeHandler}
                    required
                  >
                    <option value="">Select Membership Type</option>
                    <option value="Trial">Trial</option>
                    <option value="Beginner">Beginner</option>
                    <option value="BBC">BBC</option>
                    <option value="LC">LC</option>
                    <option value="IC">IC</option>
                    <option value="MC">MC </option>
                    <option value="TC">TC </option>
                    <option value="After School">After School</option>
                  </CustomInput>
                </FormGroup>
              </Col>
              <Col sm="12" md="12">
                <div>Pricing</div>
                <ButtonGroup>
                  <button
                    type="button"
                    className={
                      this.state.isRecurring === 1
                        ? `btn btn-primary`
                        : "btn btn-outline-primary"
                    }
                    onClick={() => {
                      this.setState({ ...this.state, isRecurring: 1 });
                    }}
                  >
                    Recurring
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      this.setState({
                        ...this.state,
                        isRecurring: 2,
                        payment_type: "pif",
                      });
                    }}
                    className={
                      this.state.isRecurring === 2
                        ? `btn btn-primary`
                        : "btn btn-outline-primary"
                    }
                  >
                    One Time
                  </button>
                </ButtonGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup className="form-label-group">
                  <div>
                    <Label htmlFor="passwordFloating">Total Price</Label>
                  </div>
                  <Input
                    type="number"
                    name="total_price"
                    value={this.state.total_price}
                    onChange={this.changeHandler}
                    onBlur={this.calculateBalanceAmount}
                    onFocus={this.calculateBalanceAmount}
                    id="PriceFloating"
                    placeholder="Total Price"
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup className="form-label-group">
                  <div>
                    <Label htmlFor="BalanceFloating">Balance</Label>
                  </div>
                  <Input
                    type="number"
                    name="balance"
                    required
                    value={this.state.balance}
                    id="BalanceFloating"
                    placeholder="Balance"
                  />
                </FormGroup>
              </Col>
              <Fragment>
                <Col sm="6" md="6">
                  <FormGroup className="form-label-group">
                    <div>
                      <Label htmlFor="nameFloating">Down Payment</Label>
                    </div>
                    <Input
                      type="number"
                      name="down_payment"
                      value={this.state.down_payment}
                      onChange={this.changeHandler}
                      id="paymentFloating"
                      placeholder="Down Payment"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col sm="3" md="3">
                  <FormGroup className="form-label-group">
                    <div>
                      <Label htmlFor="nameFloating">
                        Duration <sup>*</sup>
                      </Label>
                    </div>
                    <Input
                      type="text"
                      name="duration_time"
                      value={this.state.duration_time}
                      id="durationFloating"
                      placeholder="Please Specify Year"
                      onChange={this.changeHandler}
                      required
                    />
                  </FormGroup>
                </Col>
              </Fragment>
              <Col sm="3" md="3">
                <FormGroup className="form-label-group">
                  <div>
                    <Label>
                      Duration Type <sup>*</sup>
                    </Label>
                  </div>
                  <CustomInput
                    type="select"
                    name="duration_type"
                    value={this.state.duration_type}
                    onChange={this.changeHandler}
                    id="status"
                    required
                  >
                    <option>Please Select</option>
                    <option value="month">Months </option>
                    <option value="week">Weeks </option>
                  </CustomInput>
                </FormGroup>
              </Col>
              <Col sm="12" md="6" lg="6">
                <FormGroup className="form-label-group">
                  <div>
                    <Label for="PaymentsFloating"># of Payments</Label>
                  </div>
                  <Input
                    type="number"
                    name="no_of_payment"
                    onChange={this.changeHandler}
                    value={this.state.no_of_payment}
                    id="paymentsFloating"
                    placeholder="Payments"
                  />
                </FormGroup>
              </Col>
              <Col sm="12" md="6" lg="6">
                <FormGroup className="form-label-group">
                  <div>
                    <Label for="dollerFloating">#Amount</Label>
                  </div>
                  <Input
                    type="number"
                    name="amount"
                    value={this.state.amount === NaN ? 0 : this.state.amount}
                    onChange={this.changeHandler}
                    id="dollerFloating"
                    placeholder="$"
                  />
                </FormGroup>
              </Col>
              <Col sm="12" md="6" lg="6">
                <FormGroup>
                  <div>
                    <label>Payment Type</label>
                  </div>
                  <div className="d-flex align-content-around">
                    {this.state.isRecurring === 2 ? (
                      <Fragment>
                        <div className="m-1">
                          <input
                            type="radio"
                            id="periph1"
                            name="payment_type"
                            value="pif"
                            checked={this.state.payment_type === "pif"}
                            onChange={this.changeHandler}
                          />
                          <label htmlFor="periph1">PIF</label>
                        </div>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <div className="m-1 d-flex justify-content-center">
                          <input
                            type="radio"
                            id="periph2"
                            name="payment_type"
                            value="monthly"
                            checked={this.state.payment_type === "monthly"}
                            onChange={this.changeHandler}
                          />
                          <label htmlFor="periph1">Monthly</label>
                        </div>
                        <div className="m-1 d-flex  justify-content-center">
                          <input
                            type="radio"
                            id="periph3"
                            name="payment_type"
                            value="weekly"
                            checked={this.state.payment_type === "weekly"}
                            onChange={this.changeHandler}
                          />
                          <label htmlFor="periph1">Weekly</label>
                        </div>
                      </Fragment>
                    )}
                  </div>
                </FormGroup>
              </Col>
              <Col sm="12" md="6" lg="6">
                <FormGroup className="mb-0">
                  <span>Folder</span>
                  <Autocomplete
                    size="small"
                    style={{ border: "1px solid #d9d9d9", borderRadius: "8px" }}
                    options={getmebershipfolderlisting}
                    onChange={(e, newValue) => {
                      this.handleSelectsubFolder(e, newValue);
                    }}
                    getOptionLabel={(option) => option?.folderName}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        size="small"
                        variant={"outlined"}
                        {...params}
                        placeholder={"Folder"}
                      />
                    )}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6" lg="6">
                <div className="d-flex justify-content-between align-items-center">
                  <span>Select color</span>
                  <input
                    type="color"
                    id="colorFloating"
                    style={{
                      padding: "4px",
                      height: "2.5em",
                      width: "2.5em",
                      border: "none",
                    }}
                    name="color"
                    value={this.state.color}
                    onChange={this.changeHandler}
                  />
                </div>
              </Col>
              <Col sm="6" md="6" lg="6">
                <AttachDocxfile
                  membershipDocName={this.props.userinfo?.membershipDocName}
                  title={"Click or drag and drop to Attach your DocxFile"}
                  handleDocument={this.handleDocument}
                />
              </Col>
              <Col sm="6" md="6" lg="6">
                <FormGroup className="form-label-group">
                  <Button.Ripple
                    color="primary"
                    value={this.state.color}
                    type="submit"
                    className="m-1"
                    onSubmit={this.onsubmit}
                  >
                    Update
                  </Button.Ripple>
                  {this.state.errorFound && this.state.folderId === null ? (
                    <div className="alert alert-danger" role="alert">
                      Please Select Folder and Fields are required before you
                      save!
                    </div>
                  ) : null}
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    getmebershipfolderlisting: state.shop.getmebershipfolderlisting,
    shop: state.shop,
    programList: state.program.programList,
  };
};
export default connect(mapStateToProps, { EDIT_MEMBERSHIP, GET_PROGRAM_LIST })(
  EditModal
);
