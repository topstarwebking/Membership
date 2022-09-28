import React from "react";
import moment from "moment";
import { FormGroup, Input, Label, Row, Col } from "reactstrap";
import NumberFormat from 'react-number-format';
import CardDetails from "../cardDetails";
const PaymentProcess = ({
  viewActiveStudentInfo,
  data,
  payload,
  changeHandler,
  paymentData,
  cardDetails,
}) => {
  const { membership_name } = data;
  const { lastName, firstName } = viewActiveStudentInfo;
  return (
    <Row>
      <Col sm="12">
        <FormGroup>
          <div>
            <Label for="pname">Membership Name</Label>
          </div>
          <Input type="text" value={membership_name} id="pname" />
        </FormGroup>
      </Col>
      <Col sm="4" md="4">
        <FormGroup>
          <div>
            <Label for="fName">First Name</Label>
          </div>
          <Input type="text" value={firstName} id="fName" />
        </FormGroup>
      </Col>
      <Col sm="4" md="4">
        <FormGroup>
          <div>
            <Label for="lname">Last Name</Label>
          </div>
          <Input type="text" value={lastName} id="lname" />
        </FormGroup>
      </Col>
      <Col sm="4" md="4">
        <FormGroup>
          <div>
            <Label for="amount">Amount</Label>
          </div>
          <Input type="text" value={paymentData.Amount} id="amount" />
        </FormGroup>
      </Col>
      <Col sm="4" md="4">
        <FormGroup>
          <div>
            <Label for="due-date">Due Date</Label>
          </div>
          <Input
            type="text"
            value={moment(paymentData?.date).format("MM-DD-YYYY")}
            id="due-date"
          />
        </FormGroup>
      </Col>
      <Col sm="4" md="4">
        <FormGroup>
          <div>
            <Label for="payment_type">Payment Type</Label>
          </div>
          <Input
            type="select"
            name="payment_type"
            id="payment_type"
            value={payload.payment_type}
            onChange={changeHandler}
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="cheque">Cheque</option>
          </Input>
        </FormGroup>
      </Col>
      {payload.payment_type === "card" && (
        <CardDetails cardDetails={cardDetails} changeHandler={changeHandler} />
      )}
      {payload.payment_type === "cheque" && (
        <>
          <Col sm="4" md="4">
            <FormGroup>
              <div>
                <Label htmlFor="cheque_number">Check Number</Label>
              </div>
              <NumberFormat
                required
                name="cheque_number"
                id="cheque_number"
                value={payload?.cheque_number}
                placeholder="Check number"
                onChange={changeHandler}
                format="#### #### ####"
                className="form-control"
              />
              {!payload?.cheque_number && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  cheque number required!
                </span>
              )}
            </FormGroup>
          </Col>
        </>
      )}
    </Row>
  );
};

export default PaymentProcess;
