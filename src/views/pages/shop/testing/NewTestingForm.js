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
} from "reactstrap";
import {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODECT_FOLDER,
} from "../../../../redux/actions/shop/index";
import "../../../../assets/scss/pages/users.scss";
import AttachDocxfile from "./attacheFiles";
import { connect } from "react-redux";
import { HANDLE_STUDENT_IMAGE_UPDATE } from "../../../../redux/actions/newstudent";

class ProductsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.editData,
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.addthumnail = this.addthumnail.bind(this);
  }
  imageHandler = (e) => {
    e.preventDefault();
    HANDLE_STUDENT_IMAGE_UPDATE(e.target.files[0]);
  };
  componentDidUpdate(prevProps) {
    if (
      this.props.shop.Getprodectlist?.length >
      prevProps.shop.Getprodectlist?.length
    ) {
      this.props.toggle();
    }
  }
  componentDidMount() {
    this.props.GET_PRODECT_FOLDER();
  }

  changeHandler(e) {
    let { name, value } = e.target;
    // var total_price = Number(this.state.total_price || 0)
    // var deposite = Number(this.state.deposite || 0)
    // var balance_amount = total_price - deposite
    // var no_of_payment = Number(this.state.no_of_payment || 0);
    // var amount = balance_amount / no_of_payment || 0;
    // this.setState({
    //   balance: Number(balance_amount),
    //   amount: Number(amount),
    //   total_price: Number(total_price),
    //   deposite: Number(deposite)
    // });
    // if (name === "file") {
    //   this.setState({ ...this.state, attach: e.target.files[0] });
    // } else {
    //   this.setState({ ...this.state, [name]: value });
    // }
    this.setState({ ...this.state, [name]: value }, () => {
      var total_price = Number(this.state.total_price);
      var deposite = Number(this.state.deposite);
      var no_of_payment = Number(this.state.no_of_payment);
      var balance_amount = total_price - deposite;
      var amount = balance_amount / no_of_payment || 0;
      this.setState({
        balance: String(balance_amount),
        amount: String(amount),
      });
    });
    if (name === "file") {
      this.setState({ ...this.state, attach: e.target.files[0] });
    } else {
      this.setState({ ...this.state, [name]: value });
    }
  }
  onsubmit = (e) => {
    e.preventDefault();
    let { UPDATE_PRODUCT, CREATE_PRODUCT } = this.props;
    if (this.props?.editStatus) {
      let {
        color,
        folderId,
        productFile,
        thumbnail,
        product_description,
        product_name,
        total_price,
        event_date,
        product_type,
        deposite,
        payment_type,
        // duration_time,
        // duration_type,
        amount,
        no_of_payment,
        balance,
      } = this.state;
      let payload = {
        color: color,
        product_description: product_description,
        product_name: product_name,
        total_price: Number(total_price),
        attach: productFile,
        thumbnail: thumbnail,
        old_folderId: this.props.editData?.folderId,
        folderId: folderId,
        event_date: event_date,
        product_type: product_type,
        deposite: deposite,
        payment_type: payment_type,
        // duration_time: duration_time,
        // duration_type: duration_type,
        amount: amount,
        no_of_payment: no_of_payment,
        balance: balance,
      };
      if (payload?.old_folderId === folderId) {
        delete payload?.old_folderId;
        delete payload?.folderId;
      }
      UPDATE_PRODUCT(payload, this.props.editData?._id);
    } else {
      let payload = {
        color: this.state.color,
        product_description: this.state.product_description,
        product_name: this.state.product_name,
        total_price: Number(this.state.total_price),
        attach: this.state.productFile,
        thumbnail: this.state.thumbnail,
        old_folderId: this.props.editData?.folderId,
        folderId: this.state.folderId,
        event_date: this.state.event_date,
        product_type: this.state.product_type,
        deposite: this.state.deposite,
        payment_type: this.state.payment_type,
        // duration_time: this.state.duration_time,
        // duration_type: this.state.duration_type,
        amount: this.state.amount,
        no_of_payment: this.state.no_of_payment,
        balance: this.state.balance,
      };
      CREATE_PRODUCT(payload, this.state.folderId);
    }
    this.props.toggle();
  };

  handleDocument = (docFile) => {
    this.setState({ ...this.state, attach: docFile });
  };

  addthumnail = (e) => {
    let file = e.target.files[0];
    file["name"] = "thumbnail." + file.type?.split("image/")[1];
  };

  render() {
    return (
      <Card>
        <CardBody>
          <Form className="mt-10" onSubmit={this.onsubmit}>
            <Row>
              <Col sm="6" md="6">
                <div>
                  <Label htmlFor="nameFloating">
                    Products Name<sup>*</sup>
                  </Label>
                </div>
                <FormGroup className="form-label-group">
                  <Input
                    type="text"
                    name="product_name"
                    value={this.state.product_name}
                    id="nameFloating"
                    placeholder="Products Name"
                    onChange={this.changeHandler}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup className="form-label-group">
                  <div>
                    <Label>
                      Products Type <sup>*</sup>
                    </Label>
                  </div>
                  <CustomInput
                    type="select"
                    name="product_type"
                    value={this.state?.product_type}
                    id="product_type"
                    onChange={this.changeHandler}
                    onBlur={this.product_type}
                    onFocus={this.product_type}
                    required
                  >
                    <option value="">Select Product Type </option>
                    <option value="Events">Events</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Test">Test</option>


                  </CustomInput>
                </FormGroup>
              </Col>
              <Col sm="12" md="12" lg="12">
                <FormGroup className="form-label-group">
                  <div>
                    <Label htmlFor="product_description">
                      Product Description:
                    </Label>
                  </div>

                  <Input
                    type="text"
                    name="product_description"
                    id="product_description"
                    value={this.state?.product_description}
                    onChange={this.changeHandler}
                    placeholder="Product Description"
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup className="form-label-group">
                  <div>
                    <Label htmlFor="passwordFloating">Total Price</Label>
                  </div>
                  <Input
                    type="number"
                    name="total_price"
                    value={this.state?.total_price}
                    onChange={this.changeHandler}
                    onBlur={this.total_price}
                    onFocus={this.total_price}
                    id="total_price"
                    placeholder="Total Price"
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6">
                <FormGroup className="form-label-group">
                  <div>
                    <Label htmlFor="nameFloating">Pay Now</Label>
                  </div>
                  <Input
                    type="number"
                    name="deposite"
                    value={this.state.deposite}
                    onChange={this.changeHandler}
                    id="paymentFloating"
                    placeholder="Down Payment"
                    required
                  />
                </FormGroup>
              </Col>

              <Fragment>
                <Col sm="6" md="6">
                  <FormGroup className="form-label-group">
                    <div>
                      <Label htmlFor="BalanceFloating">Pay Later</Label>
                    </div>
                    <Input
                      type="number"
                      name="balance"
                      value={this.state?.balance}
                      onChange={this.changeHandler}
                      id="BalanceFloating"
                      placeholder="Balance"
                    />
                  </FormGroup>
                </Col>

                {/* <Col sm="3" md="3">
                  <FormGroup className="form-label-group">
                    <div>
                      <Label htmlFor="durationFloating">
                        Duration <sup>*</sup>
                      </Label>
                    </div>
                    <Input
                      type="number"
                      name="duration_time"
                      value={this.state?.duration_time}
                      id="duration_time"
                      placeholder="Duration"
                      onChange={this.changeHandler}
                      onBlur={this.duration_time}
                      onFocus={this.duration_time}
                      required
                    />
                  </FormGroup>
                </Col> */}
              </Fragment>

              {/* <Col sm="3" md="3">
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
                    id="duration_type"
                    onBlur={this.duration_type}
                    onFocus={this.duration_type}
                    required
                  >
                    <option>Please Select</option>
                    <option value="month">Months </option>
                    <option value="week">Weeks </option>
                  </CustomInput>
                </FormGroup>
              </Col> */}
              {/* <Col sm="12" md="6" lg="6">
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
              </Col> */}
              {/* <Col sm="12" md="6" lg="6">
                <FormGroup className="form-label-group">
                  <div>
                    <Label for="dollerFloating">Amount</Label>
                  </div>
                  <Input
                    type="number"
                    name="amount"
                    value={this.state.amount === NaN ? 0 : this.state.amount}
                    onChange={this.changeHandler}
                    id="dollerFloating"
                    placeholder="$ Amount"
                  />
                </FormGroup>
              </Col> */}
              {/* <Col sm="12" md="6" lg="6">
                <FormGroup>
                  <div>
                    <label> Payment Type</label>
                  </div>
                  <div className="d-flex align-content-around">
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
                  </div>
                </FormGroup>
              </Col> */}
              <Col sm="6" md="6">
                <FormGroup className="form-label-group">
                  <div>
                    <Label>Folder Name:</Label>
                  </div>
                  <CustomInput
                    type="select"
                    name="folderName"
                    value={this.state?.folderName}
                    onChange={(e) => {
                      this.setState({
                        ...this.state,
                        folderId: e.target.value,
                      });
                    }}
                    id="folderName"
                    required
                  >
                    <option>Please select</option>
                    {this.props.getProdectfolder?.length > 0
                      ? this.props.getProdectfolder?.map((item, i) => {
                          return (
                            <option key={i} value={item?._id}>
                              {item?.folderName}
                            </option>
                          );
                        })
                      : null}
                  </CustomInput>
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
                    Save
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
    shop: state.shop,
    getProdectfolder: state.shop.getProdectfolder,
  };
};
export default connect(mapStateToProps, {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODECT_FOLDER,
  HANDLE_STUDENT_IMAGE_UPDATE,
})(ProductsForm);
