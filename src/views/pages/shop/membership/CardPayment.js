import { makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { FormGroup, Input, Label, Row, Col } from "reactstrap";
import NumberFormat from "react-number-format";
import PaymentandBillingInfo from "./components/payment-and-billinfo";
import BillingAddress from "./components/billingAddress";
import CreditCard from "./components/credit-card/Credit-Card.png";

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
  membershipInfo,
  paymentValidation,
  loading,
}) => {
  const classes = useStyles();
  const [toggle, setToggle] = useState(false);
  const addressChange = (e) => {
    addressChanges(e);
  };

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
                defaultValue={state.card_holder_name}
                onChange={(e) => HandleChange(e, "valorPIF")}
              />
              {paymentValidation?.card_holder_name && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {paymentValidation?.card_holder_name}
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
                defaultValue={state.pan}
                onChange={(e) => HandleChange(e, "valorPIF")}
                format="#### #### #### ####"
                className="form-control"
              />
              {paymentValidation?.pan && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {paymentValidation?.pan}
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
                type="number"
                name="cvv"
                id="cvv"
                placeholder="cvv"
                defaultValue={state.cvv}
                onChange={(e) => HandleChange(e, "valorPIF")}
                format="###"
                className="form-control"
              />
              {paymentValidation?.cvv && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {paymentValidation?.cvv}
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
                value={state.expiry_date}
                onChange={(e) => HandleChange(e, "valorPIF")}
                format="####"
                className="form-control"
              />
              {paymentValidation?.expiry_date && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {paymentValidation?.expiry_date}
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
                value={state.amount}
                onChange={(e) => HandleChange(e, "valorPIF")}
              />
              {paymentValidation?.amount && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {paymentValidation?.amount}
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
                value={state.phone}
                onChange={(e) => HandleChange(e, "valorPIF")}
                format="## #### ####"
                className="form-control"
              />
              {paymentValidation?.phone && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {paymentValidation?.phone}
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
                defaultValue={state.email}
                onChange={(e) => HandleChange(e, "valorPIF")}
              />
              {paymentValidation?.email && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {paymentValidation?.email}
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
                    defaultValue={state?.address?.street_no}
                    onChange={(e) => HandleChange(e, "valorPIF", true)}
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
                    defaultValue={state?.address?.zip}
                    onChange={(e) => HandleChange(e, "valorPIF", true)}
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
                    defaultValue={state?.address?.address}
                    onChange={(e) => HandleChange(e, "valorPIF", true)}
                  />
                </FormGroup>
              </Col>
            </>
          )}
          <Col md="12" sm="12" lg="12">
            <div className={classes.cardlogoWrapper}>
              <img src={CreditCard} className={classes.cardlogo} alt={"Card"} />
            </div>
          </Col>
        </Row>
      </Col>
      <Col md="6" sm="12" lg="6">
        <div style={{ background: "#f6f6f6" }}>
          <BillingAddress
            addressChange={addressChange}
            address={state?.address}
            handelToggle={handelToggle}
            HandleChange={HandleChange}
          />
          <PaymentandBillingInfo
            HandleChange={HandleChange}
            membershipInfo={membershipInfo}
            loading={loading}
          />
        </div>
      </Col>
    </Row>
  );
};

export default CardPayment;
