import React from "react";
import { FormGroup, Input, Label, CustomInput, Row, Col } from "reactstrap";
import { Typography } from "@material-ui/core";
import InputAutoComplete from "../../autoCompleteStudent";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";
const BuyMemberShipInfoForm = (props) => {
  const {
    getAllTypeStudent,
    payment_type,
    info,
    changeHandler,
    handleSelectStudent,
    studentProfileType,
    handleDateChange,
    formValidation,
    handleStudentInfo
  } = props;
  return (
    <div style={{ width: "100%" }}>
      <Row>
        <Col sm="12" md="12" lg="12">
          <Typography
            style={{ color: "#393939", fontSize: "1.5rem" }}
            className="mt-1"
          >
            Membership Info
          </Typography>
        </Col>
        {window.location.pathname === "/company/shop/membership" && (
          <Col sm="12" md="6" lg="6">
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
          </Col>
        )}
        <Col sm="12" md="3" lg="3">
          {studentProfileType === "student profile" ? (
            
            <FormGroup>
              <Label> Membership Name </Label>
              <Input
                required
                type="text"
                name="membership_name"
                defaultValue={info.membership_name}
                id="durationVertical"
                placeholder="Member Ship Name"
              />
            </FormGroup>
            
          ) : (
            <FormGroup>
              <Label> Student Name </Label>
              <CustomInput
                required
                type="select"
                name="student_name"
                onChange={changeHandler}
                value={info.student_name}
                id="name"
              >
                {props.studentList.map((value, index) => {
                  return (
                    <option key={index} value={`${value.firstName}, ${value.lastName}`}>
                      {value.firstName}
                    </option>
                  );
                })}
              </CustomInput>
            </FormGroup>
          )}
        </Col>
        <Col sm="12" md="3" lg="3">
          <FormGroup>
            <div>
              <Label for="EmailVertical">Start Date</Label>
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                required
                style={{
                  borderRadius: "0.4em",
                  border: "1px solid #b8c2cc",
                  margin: "0",
                  padding: "6px",
                }}
                format="MM/dd/yyyy"
                InputProps={{
                  disableUnderline: true,
                }}
                margin="normal"
                id="date-picker-inline"
                value={moment(info.mactive_date).format("MM/DD/YYYY")}
                onChange={(date) => {
                  handleDateChange(date, "mactive_date");
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </FormGroup>
        </Col>
        <Col sm="12" md="3" lg="3">
          <FormGroup>
            <div>
              <Label for="expiryVertical">Expiry Date:</Label>
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                required
                style={{
                  borderRadius: "0.4em",
                  border: "1px solid #b8c2cc",
                  margin: "0",
                  padding: "6px",
                }}
                format="MM/dd/yyyy"
                InputProps={{
                  disableUnderline: true,
                }}
                margin="normal"
                id="date-picker-inline"
                value={moment(info.expiry_date).format("MM/DD/YYYY")}
                onChange={(date) => {
                  handleDateChange(date, "expiry_date");
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </FormGroup>
        </Col>
        <Col sm={"12"} md={"12"}>
          {" "}
          <Typography style={{ fontSize: "1.5rem" }}>
            Payment Information
          </Typography>
        </Col>
        <Col sm="12" md="3" lg="3">
          <FormGroup>
            <div>
              <Label for="totalpriceVertical">Total Price:</Label>
            </div>
            <Input
              required
              type="number"
              name="totalp"
              value={info.totalp}
              onChange={changeHandler}
              id="totalpriceVertical"
              placeholder="$"
            />
          </FormGroup>
        </Col>
        <Col sm="12" md="3" lg="3">
          <FormGroup>
            <div>
              <Label for="registrationVertical">Registration Fee:</Label>
            </div>
            <Input
              required
              type="number"
              name="register_fees"
              value={info.register_fees}
              onChange={changeHandler}
              id="registrationVertical"
              placeholder="$"
            />
          </FormGroup>
        </Col>
        <Col sm="12" md="3" lg="3">
          <FormGroup>
            <div>
              <Label for="totalpriceVertical">Down Payment:</Label>
            </div>
            <Input
              required
              type="number"
              name="dpayment"
              value={info.dpayment}
              onChange={changeHandler}
              id="downPaymentVertical"
              placeholder="$"
            />
          </FormGroup>
        </Col>
        <Col sm="12" md="3" lg="3">
          <FormGroup>
            <div>
              <Label for="totalpriceVertical"> Balance:</Label>
            </div>
            <Input
              required
              disabled={payment_type === "pif" ? true : false}
              type="number"
              name="balance"
              value={info.balance}
              onChange={changeHandler}
              id="balanceVertical"
              placeholder="$"
            />
            {payment_type !== "pif" && formValidation?.balance && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {formValidation.balance}
              </span>
            )}
          </FormGroup>
        </Col>
        <Col sm="6" md="3" lg="3">
          <div className="d-flex justify-content-start">
            <FormGroup style={{ width: "100px" }} className="form-label-group">
              <div>
                <Label for="PaymentsFloating"># of Payments</Label>
              </div>
              <Input
                required
                disabled={payment_type === "pif" ? true : false}
                type="number"
                name="payment_time"
                value={info.payment_time}
                onChange={changeHandler}
                id="paymentsFloating"
                placeholder="Payments"
              />
              {payment_type !== "pif" && formValidation?.payment_time && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {formValidation?.payment_time}
                </span>
              )}
            </FormGroup>
            <FormGroup className="ml-1 form-label-group">
              <div>
                <Label> Frequency</Label>
              </div>
              <CustomInput
                required
                type="select"
                name="payment_type"
                value={info.payment_type}
                onChange={changeHandler}
                id="paymentType"
              >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="pif">PIF</option>
              </CustomInput>
            </FormGroup>
          </div>
        </Col>
        <Col sm="6" md="2" lg="2">
          <FormGroup className="form-label-group">
            <div>
              <Label for="dollerFloating">Amount</Label>
            </div>
            <Input
              required
              disabled={payment_type === "pif" ? true : false}
              type="text"
              name="payment_money"
              value={info.payment_money}
              onChange={changeHandler}
              id="dollerFloating"
              placeholder="$"
            />
            {payment_type !== "pif" && formValidation?.payment_money && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {formValidation?.payment_money}
              </span>
            )}
          </FormGroup>
        </Col>
        <Col sm="6" md="2" lg="2">
          <FormGroup className="form-label-group">
            <div>
              <Label>Due</Label>
            </div>
            <CustomInput
              required
              type="select"
              name="due_every"
              value={info.due_every}
              onChange={changeHandler}
              disabled={payment_type === "pif" ? true : false}
              id="Due"
            >
              <option value="0">No due</option>
              <option value="1">1st</option>
              <option value="5">5th</option>
              <option value="10">10th</option>
              <option value="15">15th</option>
              <option value="20">20th</option>
              <option value="25">25th</option>
              <option value="30">30th</option>
            </CustomInput>
            {payment_type !== "pif" && formValidation?.due_every && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {formValidation?.due_every}
              </span>
            )}
          </FormGroup>
        </Col>
        <Col sm="6" md="3" lg="3">
          <FormGroup>
            <div>
              <Label for="expiryVertical">Next payment</Label>
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                style={{
                  borderRadius: "0.4em",
                  border: "1px solid #b8c2cc",
                  margin: "0",
                  padding: "6px",
                }}
                format="MM/dd/yyyy"
                InputProps={{
                  disableUnderline: true,
                }}
                margin="normal"
                id="date-picker-inline"
                value={moment(info.start_payment_Date).format("MM/DD/YYYY")}
                onChange={(date) => {
                  handleDateChange(date, "start_payment_Date");
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </FormGroup>
        </Col>
        <Col sm="6" md="2" lg="2">
          <FormGroup className="form-label-group">
            <div>
              <Label>Payment Type </Label>
            </div>
            <CustomInput
              required
              type="select"
              name="pay_inout"
              defaultValue={info.pay_inout}
              onChange={changeHandler}
              id="Due"
            >
              <option value="In house">In house</option>
              <option value="auto pay">Auto pay</option>
            </CustomInput>
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
};

export default BuyMemberShipInfoForm;
