import React from "react";
import { FormGroup, Input, Label, Row, Col } from "reactstrap";
const Forfeit = ({ viewActiveStudentInfo, data, payload, changeHandler }) => {
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
      <Col sm="12">
        <FormGroup>
          <div>
            <Label for="reason">Forfeit Reason</Label>
          </div>
          <Input
            required
            type="textarea"
            name="reason"
            value={payload.reason}
            onChange={changeHandler}
            id="reason"
            placeholder="Forfeit Reason..."
          />
        </FormGroup>
      </Col>
    </Row>
  );
};

export default Forfeit;
