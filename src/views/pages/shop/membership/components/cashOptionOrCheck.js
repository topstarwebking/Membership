import React, { useState } from "react";
import { makeStyles, Typography, Button, Checkbox } from "@material-ui/core";
import { Row, Col, Label, FormGroup } from "reactstrap";
import NumberFormat from "react-number-format";
import PaymentandBillingInfo from "./payment-and-billinfo";

const useStyles = makeStyles(() => ({
  btnOption: {
    boxShadow: "0px 2px 5px 0px rgb(0 0 0 / 21%) !important",
    borderRadius: "4px !important",
  },
}));

const CashOptionOrCheck = (props) => {
  const classes = useStyles();
  const [payOption, setPayOption] = useState("cash");

  return (
    <div>
      <Row>
        <Col sm="6" md="6" lg="6">
          <div>
            <Typography>
              <b>Select PIayment option</b>
            </Typography>
          </div>

          <Button
            fullWidth
            onClick={() => {
              setPayOption("cash");
              props.payNowMethod("cash");
            }}
            className={`d-flex justify-content-start align-items-center ${classes.btnOption}`}
          >
            <Checkbox checked={payOption === "cash"} />
            <span>Cash Payment</span>
          </Button>
          <Button
            fullWidth
            onClick={() => {
              setPayOption("check");
            }}
            className={`mt-1 d-flex justify-content-start align-items-center ${classes.btnOption}`}
          >
            <Checkbox checked={payOption === "check"} />
            <span>Check Payment</span>
          </Button>
          <br />
          {payOption === "check" && (
            <FormGroup className="form-label-group">
              <div>
                <Label htmlFor="check_number">Check Number</Label>
              </div>
              <NumberFormat
                required
                name="cheque_no"
                id="check_number"
                value={props?.membershipInfo?.cheque_no}
                placeholder="Check number"
                onChange={(e) => props.payNowMethod("cheque", e, true)}
                format="#### #### ####"
                className="form-control"
              />
              {!props?.membershipInfo?.cheque_no && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  cheque number required!
                </span>
              )}
            </FormGroup>
          )}
        </Col>
        <Col sm="12" md="6" lg="6">
          <PaymentandBillingInfo
            HandleChange={props.HandleChange}
            membershipInfo={props.membershipInfo}
            loading={props.loading}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CashOptionOrCheck;
