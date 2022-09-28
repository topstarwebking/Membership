import { makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { FormGroup, Input, Label, Row, Col } from "reactstrap";
import NumberFormat from "react-number-format";
import PaymentandBillingInfo from "./componet/payment-and-billinfo";
import BillingAddress from "./componet/billingAddress";

const useStyles = makeStyles(() => ({
  cardlogoWrapper: {
    margin: "0 4px",
    borderRadius: "4px",
    padding: "6px",
    boxShadow: "0px 2px 5px 0px rgb(0 0 0 / 10%) !important",
    display: "flex",
    justifyContent: "center",
  },
  cardlogo: {
    objectFit: "contain",
    width: "60%",
    height: "2.6em",
  },
}));

const CardPayment = ({
  state,
  HandleChange,
  addressChanges,
  isPaymentDoneMS,
  payLatterChange,
  productPayment,
  loading,
  cardvalidation,
}) => {
  const classes = useStyles();
  const [toggle, setToggle] = useState(false);

  const handelToggle = () => {
    setToggle(!toggle);
  };

  return (
    <Row>
      <Col sm="12" md="12" lg="12">
        <Typography
          style={{ color: "#393939", fontSize: "1.6rem" }}
          className="mt-1"
        >
          Card Details
        </Typography>
      </Col>
      <Col md="6" sm="12" lg="6">
        <Row>
          <Col md="12" sm="12" lg="12">
            <FormGroup className="form-label-group">
              <div>
                <Label htmlFor="CardHolder">Card Holder Name</Label>
              </div>
              <Input
                required
                type="text"
                name="card_holder_name"
                id="CardHolder"
                placeholder="card holder name"
                defaultValue={state?.valorPayload?.card_holder_name}
                onChange={HandleChange}
              />
              {cardvalidation?.card_holder_name && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {cardvalidation?.card_holder_name}
                </span>
              )}
            </FormGroup>
          </Col>
          <Col md="12" sm="12" lg="12">
            <FormGroup className="form-label-group">
              <div>
                <Label htmlFor="Pan">Card Number</Label>
              </div>
              <NumberFormat
                required
                type="text"
                name="pan"
                id="Pan"
                placeholder="Card number"
                defaultValue={state?.valorPayload?.pan}
                onChange={HandleChange}
                format="#### #### #### ####"
                className="form-control"
              />
              {cardvalidation?.pan && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {cardvalidation?.pan}
                </span>
              )}
            </FormGroup>
          </Col>

          <Col md="4" sm="6" lg="4">
            <FormGroup className="form-label-group">
              <div>
                <Label htmlFor="cvv">CVV</Label>
              </div>
              <NumberFormat
                type="text"
                name="cvv"
                id="cvv"
                placeholder="cvv"
                defaultValue={state?.valorPayload?.cvv}
                onChange={HandleChange}
                format="###"
                className="form-control"
              />
              {cardvalidation?.cvv && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {cardvalidation?.cvv}
                </span>
              )}
            </FormGroup>
          </Col>
          <Col md="4" sm="6" lg="4">
            <FormGroup>
              <div>
                <Label htmlFor="expiry_date">Expiry Date</Label>
              </div>
              <NumberFormat
                type="text"
                required
                name="expiry_date"
                id="expiry_date"
                placeholder="MM YY"
                defaultValue={state?.valorPayload?.expiry_date}
                onChange={HandleChange}
                format="####"
                className="form-control"
              />
              {cardvalidation?.expiry_date && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {cardvalidation?.expiry_date}
                </span>
              )}
            </FormGroup>
          </Col>
          <Col md="4" sm="12" lg="4">
            <FormGroup className="form-label-group">
              <div>
                <Label htmlFor="Amount">Amount</Label>
              </div>
              <Input
                required
                type="number"
                name="amount"
                id="Amount"
                placeholder="Amount"
                defaultValue={state?.valorPayload?.amount}
              />
              {cardvalidation?.amount && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {cardvalidation?.amount}
                </span>
              )}
            </FormGroup>
          </Col>
          <Col md="6" sm="6" lg="6">
            <FormGroup className="form-label-group">
              <div>
                <Label htmlFor="phone">Phone</Label>
              </div>
              <NumberFormat
                required
                type="text"
                name="phone"
                id="phone"
                placeholder="phone"
                defaultValue={state?.valorPayload?.phone}
                onChange={HandleChange}
                format="## #### ####"
                className="form-control"
              />
              {cardvalidation?.phone && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {cardvalidation?.phone}
                </span>
              )}
            </FormGroup>
          </Col>
          <Col md="6" sm="6" lg="6">
            <FormGroup className="form-label-group">
              <div>
                <Label htmlFor="email">Email</Label>
              </div>
              <Input
                required
                type="email"
                name="email"
                id="email"
                placeholder="email"
                defaultValue={state?.valorPayload?.email}
                onChange={HandleChange}
              />
              {cardvalidation?.email && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {cardvalidation?.email}
                </span>
              )}
            </FormGroup>
          </Col>

          {toggle && (
            <>
              <Col sm="12" md="12" lg="12">
                <Typography>Billing Address</Typography>
              </Col>
              <Col sm="6" md="6" lg="6">
                <FormGroup>
                  <Label>Street Number</Label>
                  <Input
                    type="text"
                    name="street_no"
                    placeholder="Street no.."
                    defaultValue={state?.valorPayload?.address?.street_no}
                    onChange={addressChanges}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6" lg="6">
                <FormGroup>
                  <Label>Zip</Label>
                  <Input
                    type="number"
                    name="zip"
                    placeholder="Zip code.."
                    defaultValue={state?.valorPayload?.address?.zip}
                    onChange={addressChanges}
                  />
                </FormGroup>
              </Col>
              <Col sm="12" md="12" lg="12">
                <FormGroup>
                  <Label>Address</Label>
                  <Input
                    type="textarea"
                    name="address"
                    placeholder="address.."
                    defaultValue={state?.valorPayload?.address?.address}
                    onChange={addressChanges}
                  />
                </FormGroup>
              </Col>
            </>
          )}
          <Col md="12" sm="12" lg="12">
            <div className={classes.cardlogoWrapper}>
            </div>
          </Col>
        </Row>
      </Col>
      <Col md="6" sm="12" lg="6">
        <div style={{ background: "#f6f6f6" }}>
          <BillingAddress
            address={state?.valorPayload?.address}
            handelToggle={handelToggle}
          />
          <PaymentandBillingInfo
            loading={loading}
            isPaymentDoneMS={isPaymentDoneMS}
            state={state}
            payLatterChange={payLatterChange}
            productPayment={productPayment}
          />
        </div>
      </Col>
    </Row>
  );
};

export default CardPayment;
