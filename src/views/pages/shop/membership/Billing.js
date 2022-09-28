import { Typography } from "@material-ui/core";
import React from "react";
import { FormGroup, Input, Label, Row, Col, Form } from "reactstrap";

const Billing = ({ state, HandleChange }) => {
  return (
    <Row>
      <Col md="12" sm="12">
          <Row>
            <Col sm="12">
              <Typography>Card Details</Typography>
            </Col>
            <Col md="4" sm="4">
              <FormGroup className="form-label-group">
                <div>
                  <Label>Card Holder Name</Label>
                </div>
                <Input
                  required
                  type="text"
                  name="card_holder_name"
                  id="card_holder_name"
                  placeholder="Card Holder Name"
                  value={state.card_holder_name}
                  onChange={(e) => HandleChange(e, "valorMonthly")}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="4">
              <FormGroup className="form-label-group">
                <div>
                  <Label>Card Number</Label>
                </div>
                <Input
                  required
                  type="pan"
                  name="pan"
                  id="pan"
                  placeholder="Card number"
                  value={state.pan}
                  onChange={(e) => HandleChange(e, "valorMonthly")}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="4">
              <FormGroup className="form-label-group">
                <div>
                  <Label>Card CVV Number</Label>
                </div>
                <Input
                  required
                  type="number"
                  name="cvv"
                  id="cvv"
                  placeholder="cvv number.."
                  value={state.cvv}
                  onChange={(e) => HandleChange(e, "valorMonthly")}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="4">
              <FormGroup className="form-label-group">
                <div>
                  <Label>Card Expiry Date</Label>
                </div>
                <Input
                  required
                  type="expiry_date"
                  name="expiry_date"
                  id="expiry_date"
                  placeholder="Expiry Date"
                  value={state.expiry_date}
                  onChange={(e) => HandleChange(e, "valorMonthly")}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="4">
              <FormGroup className="form-label-group">
                <div>
                  <Label>Amount</Label>
                </div>
                <Input
                  required
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="amount"
                  value={state.amount}
                  onChange={(e) => HandleChange(e, "valorMonthly")}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="4">
              <FormGroup className="form-label-group">
                <div>
                  <Label>Email</Label>
                </div>
                <Input
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email"
                  value={state.email}
                  onChange={(e) => HandleChange(e, "valorMonthly")}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="4">
              <FormGroup className="form-label-group">
                <div>
                  <Label>Phone</Label>
                </div>
                <Input
                  required
                  type="phone"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  value={state.phone}
                  onChange={(e) => HandleChange(e, "valorMonthly")}
                />
              </FormGroup>
            </Col>

            <Col sm="12">
              <Typography>Billing Details</Typography>
            </Col>
            <Col md="4" sm="4">
              <FormGroup className="form-label-group">
                <div>
                  <Label>Customer Name</Label>
                </div>
                <Input
                  required
                  type="text"
                  name="billing_customer_name"
                  id="billing_customer_name"
                  placeholder="Billing Customer Name"
                  value={state.address.billing_customer_name}
                  onChange={(e) => HandleChange(e, "valorMonthly", true)}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="4">
              <FormGroup className="form-label-group">
                <div>
                  <Label>Street Name</Label>
                </div>
                <Input
                  required
                  type="text"
                  name="billing_street_name"
                  id="billing_street_name"
                  placeholder="Billing Street Name"
                  value={state.address.billing_street_name}
                  onChange={(e) => HandleChange(e, "valorMonthly", true)}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="4">
              <FormGroup className="form-label-group">
                <div>
                  <Label>Street No</Label>
                </div>
                <Input
                  required
                  type="number"
                  name="billing_street_no"
                  id="billing_street_no"
                  placeholder="Billing Street No"
                  value={state.address.billing_street_no}
                  onChange={(e) => HandleChange(e, "valorMonthly", true)}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="4">
              <FormGroup className="form-label-group">
                <div>
                  <Label>City</Label>
                </div>
                <Input
                  required
                  type="text"
                  name="billing_city"
                  id="billing_city"
                  placeholder="Billing City"
                  value={state.address.billing_city}
                  onChange={(e) => HandleChange(e, "valorMonthly", true)}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="4">
              <FormGroup>
                <div>
                  <Label for="expiryVertical">State</Label>
                </div>
                <Input
                  required
                  type="text"
                  name="billing_state"
                  id="billing_state"
                  placeholder="Billing State"
                  value={state.address.billing_state}
                  onChange={(e) => HandleChange(e, "valorMonthly", true)}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="4">
              <FormGroup className="form-label-group">
                <div>
                  <Label>Unit</Label>
                </div>
                <Input
                  required
                  type="number"
                  name="billing_unit"
                  id="billing_unit"
                  placeholder="Billing Unit"
                  value={state.address.billing_unit}
                  onChange={(e) => HandleChange(e, "valorMonthly", true)}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="4">
              <FormGroup className="form-label-group">
                <div>
                  <Label>Zip</Label>
                </div>
                <Input
                  required
                  type="number"
                  name="billing_zip"
                  id="billing_zip"
                  placeholder="Billing Zip"
                  value={state.address.billing_zip}
                  onChange={(e) => HandleChange(e, "valorMonthly", true)}
                />
              </FormGroup>
            </Col>

            <Col sm="12">
              <Typography>Subscription Details</Typography>
            </Col>
            <Col md="4" sm="4">
              <FormGroup className="form-label-group">
                <div>
                  <Label>Subscription Valid For</Label>
                </div>
                <Input
                  required
                  type="number"
                  name="Subscription_valid_for"
                  id="Subscription_valid_for"
                  placeholder="subscription valid for"
                  value={state.Subscription_valid_for}
                  onChange={(e) => HandleChange(e, "valorMonthly")}
                />
              </FormGroup>
            </Col>

            <Col md="4" sm="4">
              <FormGroup className="form-label-group">
                <div>
                  <Label>Custom Fee</Label>
                </div>
                <Input
                  required
                  type="text"
                  name="custom_fee"
                  id="custom_fee"
                  placeholder="Custom Fee"
                  value={state.custom_fee}
                  onChange={(e) => HandleChange(e, "valorMonthly")}
                />
              </FormGroup>
            </Col>

            <Col md="4" sm="4">
              <FormGroup className="form-label-group">
                <div>
                  <Label>Subscription Start Date</Label>
                </div>
                <Input
                  required
                  type="date"
                  name="subscription_starts_from"
                  id="subscription_starts_from"
                  placeholder="subscription_starts_from"
                  value={state.subscription_starts_from}
                  onChange={(e) => HandleChange(e, "valorMonthly")}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="4">
              <FormGroup className="form-label-group">
                <div>
                  <Label>Subscription Day of The Month</Label>
                </div>
                <Input
                  required
                  type="text"
                  name="subscription_day_of_the_month"
                  id="subscriptionDayOfTheMonth"
                  value={state.subscription_day_of_the_month}
                  placeholder="Subscription Day of The Month"
                  onChange={(e) => HandleChange(e, "valorMonthly")}
                />
              </FormGroup>
            </Col>
            <Col md="4" sm="4">
              <FormGroup className="form-label-group">
                <div>
                  <Label>Tax</Label>
                </div>
                <Input
                  required
                  type="text"
                  name="tax"
                  id="tax"
                  placeholder="Tax if any"
                  value={state.tax}
                  onChange={(e) => HandleChange(e, "valorMonthly")}
                />
              </FormGroup>
            </Col>
          </Row>
      </Col>
    </Row>
  );
};

export default Billing;
