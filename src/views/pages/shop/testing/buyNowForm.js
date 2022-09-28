import React from "react";
import { FormGroup, Input, Label, Row, Col, CustomInput } from "reactstrap";
import { TextField, Typography } from "@material-ui/core";
import InputAutoComplete from "../autoCompleteStudent";
const BuyProdectForm = (props) => {
  const {
    getAllTypeStudent,
    state,
    changeHandler,
    handleSelectStudent,
    studentData,
  } = props;
  return (
    <div style={{ width: "100%" }}>
      <form>
        <Row>
          <Col sm="12" md="12" lg="12">
            <Typography
              style={{ color: "#393939", fontSize: "1.5rem" }}
              className="mt-1"
            >
              Product Info
            </Typography>
          </Col>
          <Col>
            {studentData === undefined ? (
              <FormGroup>
                <div>
                  <Label>
                    <b>Select Student</b>
                  </Label>
                </div>
                <InputAutoComplete
                  labelName={"firstName"}
                  keyName="firstName"
                  data={getAllTypeStudent || []}
                  handleSelect={handleSelectStudent}
                />
              </FormGroup>
            ) : (
              <FormGroup>
                <Label> Student Name </Label>
                <CustomInput
                  required
                  type="select"
                  name="student_name"
                  onChange={() => {
                    props.handleStudentId(props.studentData);
                  }}
                  defaultValue={props?.studentData?.firstName}
                  id="name"
                >
                  <option defaultValue={`${props?.studentData?.firstName}`}>
                    {props?.studentData?.firstName}
                  </option>
                </CustomInput>
              </FormGroup>
            )}
          </Col>
          <Col sm="12" md="6" lg="6">
            <FormGroup>
              <Label>Product Name </Label>
              <Input
                required
                type="student_name"
                name="student_name"
                defaultValue={props.Product?.product_name}
                id="durationVertical"
                placeholder="name"
                onChange={changeHandler}
              />
            </FormGroup>
          </Col>
          <Col sm={"12"} md={"12"}>
            <Typography style={{ fontSize: "1.5rem" }}>
              Payment Information
            </Typography>
          </Col>
          <Col sm="12" md="4" lg="4">
            <FormGroup>
              <div>
                <Label for="total_price">Total Price:</Label>
              </div>
              <Input
                required
                type="number"
                name="total_price"
                defaultValue={state?.total_price}
                onChange={changeHandler}
                id="total_price"
                placeholder="$"
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="4" lg="4">
            <FormGroup>
              <div>
                <Label for="deposite"> Pay Now:</Label>
              </div>
              <Input
                required
                type="number"
                name="deposite"
                defaultValue={state?.deposite}
                onChange={changeHandler}
                id="deposite"
                placeholder="$"
              />
            </FormGroup>
          </Col>
          <Col sm="6" md="4" lg="4">
            <FormGroup className="form-label-group">
              <div>
                <Label for="amount">Pay Later*</Label>
              </div>
              <TextField
                required
                type="text"
                name="payment_money"
                id="amount"
                placeholder=""
                onChange={changeHandler}
                value={state?.payment_money}
                style={{
                  background:
                    (state.deposite == state.total_price) === true
                      ? "#dcdfe3"
                      : "#fff",
                  borderRadius: "0.4em",
                  border: "1px solid #b8c2cc",
                  width: "10rem",
                  height: "2.6em",
                  marginRight: "1em",
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                disabled={
                  state?.payment_money === 0 ||
                  state.deposite == state.total_price
                    ? true
                    : false
                }
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="6" lg="6">
            <FormGroup className="form-label-group">
              <div>
                <Label for="next_payment_date">Next Payment</Label>
              </div>
              <TextField
                required
                type="date"
                name="next_payment_date"
                defaultValue={state?.start_payment_Date}
                onChange={changeHandler}
                disabled={
                  state?.deposite == state?.total_price ||
                  state?.payment_type === "pif"
                    ? true
                    : false
                }
                style={{
                  background:
                    (state.deposite == state.total_price) === true
                      ? "#dcdfe3"
                      : "#fff",
                  borderRadius: "0.4em",
                  border: "1px solid #b8c2cc",
                  height: "2.6em",
                  marginRight: "1em",
                }}
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                id="next_payment_date"
                placeholder="Next Payment Date:"
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="6" lg="6">
            <FormGroup>
              <div>
                <Label>Payment Type </Label>
              </div>
              <CustomInput
                required
                type="select"
                name="pay_inout"
                defaultValue={state?.pay_inout}
                onChange={changeHandler}
                id="pay_inout"
              >
                <option defaultValue="In house">In house</option>
                <option defaultValue="auto pay">Credit Card</option>
              </CustomInput>
            </FormGroup>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default BuyProdectForm;
