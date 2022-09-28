import React from "react";
import { FormGroup, Input, Label, Row, Col } from "reactstrap";
const Freeze = ({ viewActiveStudentInfo, data, payload, changeHandler }) => {
  const { membership_name } = data;
  const { lastName, firstName } = viewActiveStudentInfo;
  return (
    <Row>
      <Col sm="6">
        <FormGroup>
          <div>
            <Label for="fName">First Name</Label>
          </div>
          <Input type="text" value={firstName} id="fName" />
        </FormGroup>
      </Col>
      <Col sm="6">
        <FormGroup>
          <div>
            <Label for="lname">Last Name</Label>
          </div>
          <Input type="text" value={lastName} id="lname" />
        </FormGroup>
      </Col>
      <Col sm="12">
        <FormGroup>
          <div>
            <Label for="pname">Membership Name</Label>
          </div>
          <Input type="text" value={membership_name} id="pname" />
        </FormGroup>
      </Col>
      <Col sm="6">
        <FormGroup>
          <div>
            <Label for="freeze_start_date">Freeze start Date</Label>
          </div>
          <Input
            type="date"
            name="freeze_start_date"
            onChange={changeHandler}
            value={payload?.freeze_start_date}
            id="freeze_start_date"
          />
        </FormGroup>
      </Col>
      <Col sm="6">
        <FormGroup>
          <div>
            <Label for="freeze_stop_date">Freeze stop Date</Label>
          </div>
          <Input
            required
            type="date"
            name="freeze_stop_date"
            onChange={changeHandler}
            defaultValue={payload?.freeze_stop_date}
            id="freeze_stop_date"
          />
        </FormGroup>
      </Col>
      <Col sm="12">
        <FormGroup>
          <div>
            <Label for="reason">Freeze Reason</Label>
          </div>
          <Input
            required
            type="textarea"
            name="reason"
            value={payload.reason}
            onChange={changeHandler}
            id="reason"
            placeholder="Freeze Reason..."
          />
        </FormGroup>
      </Col>
    </Row>
  );
};

export default Freeze;
