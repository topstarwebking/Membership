import React from "react";
import { FormGroup, Input, Label, Row, Col } from "reactstrap";
import CardDetails from "../cardDetails";
const Refund = ({
  viewActiveStudentInfo,
  data,
  payload,
  changeHandler,
  paymentData,
  cardDetails
}) => {
  const { membership_name, payment_type, totalp } = data;
  const { lastName, firstName } = viewActiveStudentInfo;
  return (
    <Row>
      <Col sm="4" md="4" >
        <FormGroup>
          <div>
            <Label for="fName">First Name</Label>
          </div>
          <Input type="text" value={firstName} id="fName" />
        </FormGroup>
      </Col>
      <Col sm="4" md="4" >
        <FormGroup>
          <div>
            <Label for="lname">Last Name</Label>
          </div>
          <Input type="text" value={lastName} id="lname" />
        </FormGroup>
      </Col>
      <Col sm="4" md="4" >
        <FormGroup>
          <div>
            <Label for="pname">Membership Name</Label>
          </div>
          <Input type="text" value={membership_name} id="pname" />
        </FormGroup>
      </Col>
      <Col sm="4" md="4" >
        <FormGroup>
          <div>
            <Label for="Amount">Total Paid Amount</Label>
          </div>
          <Input
            type="text"
            name="Amount"
            defaultValue={
              payment_type == "pif" ? parseInt(totalp) : paymentData.Amount
            }
            id="Amount"
            disabled={true}
            placeholder="Total Paid Amount:"
          />
        </FormGroup>
      </Col>
      <Col sm="4" md="4" >
        <FormGroup>
          <div>
            <Label for="refund_percentage">Total Refund Percentage</Label>
          </div>
          <Input
            required
            type="text"
            name="refund_percentage"
            value={payload.refund_percentage}
            onChange={changeHandler}
            id="refund_percentage"
            placeholder="Total Refund Percentage"
          />
        </FormGroup>
      </Col>
      <Col sm="4" md="4">
        <FormGroup>
          <div>
            <Label for="total_refund">Total Refund Amount</Label>
          </div>
          <Input
            required
            disabled
            type="text"
            name="total_refund"
            value={payload.total_refund}
            id="total_refund"
            placeholder="Total Refund Amount:"
          />
        </FormGroup>
      </Col>
      <Col sm="4" md="4" > 
        <FormGroup>
          <div>
            <Label for="payment_type">Refund Type</Label>
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
          </Input>
        </FormGroup>
      </Col>

      {payload.payment_type == "card" && <CardDetails cardDetails={cardDetails} changeHandler={changeHandler}/>}
      <Col sm="12">
        <FormGroup>
          <div>
            <Label for="reason">Refund Reason</Label>
          </div>
          <Input
            required
            type="textarea"
            name="reason"
            value={payload.reason}
            onChange={changeHandler}
            id="reason"
            placeholder="Refund Reason..."
          />
        </FormGroup>
      </Col>
    </Row>
  );
};

export default Refund;
