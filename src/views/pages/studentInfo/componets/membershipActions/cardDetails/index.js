import React from "react";
import { FormGroup, Input, Label, Col, CustomInput } from "reactstrap";
import { Typography } from "@material-ui/core";
const CardDetails = (props) => {
  const { cardDetails, changeHandler } = props;
  return (
    <>
      <Col sm="12">
        <Typography>Card Details</Typography>
      </Col>
      <Col sm="4" md="4">
        <FormGroup>
          <Label>Card Holder name</Label>
          <Input
            defaultValue={cardDetails?.card_holder_name}
            onChange={(e) => changeHandler(e, true)}
            placeholder="Enter name"
            type="text"
            name="card_holder_name"
          />
        </FormGroup>
      </Col>

      <Col md="4" sm="4">
        <FormGroup>
          <Label>Card Number</Label>
          <Input
            defaultValue={cardDetails?.pan}
            onChange={(e) => changeHandler(e, true)}
            type="number"
            name="pan"
          />
        </FormGroup>
      </Col>
      <Col md="4" sm="4">
        <FormGroup>
          <Label>CVV </Label>
          <Input
            defaultValue={cardDetails?.cvv}
            onChange={(e) => changeHandler(e, true)}
            name="cvv"
            type="number"
          />
        </FormGroup>
      </Col>
      <Col md="4" sm="4">
        <FormGroup>
          <Label>Expiry Month </Label>
          <CustomInput
            onChange={(e) => changeHandler(e, true)}
            defaultValue={cardDetails?.expiry_month}
            type="select"
            name="expiry_month"
          >
            <option value="">--Select Month--</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </CustomInput>
        </FormGroup>
      </Col>
      <Col md="4" sm="4">
        <FormGroup>
          <Label>Expiry Year </Label>
          <CustomInput
            onChange={(e) => changeHandler(e, true)}
            defaultValue={cardDetails?.expiry_year}
            type="select"
            name="expiry_year"
          >
            <option value="">--Select year--</option>
            <option value="22">2022</option>
            <option value="23">2023</option>
            <option value="24">2024</option>
            <option value="25">2025</option>
            <option value="26">2026</option>
            <option value="27">2027</option>
            <option value="28">2028</option>
            <option value="29">2029</option>
            <option value="30">2030</option>
            <option value="31">2031</option>
            <option value="33">2033</option>
            <option value="34">2034</option>
            <option value="35">2035</option>
            <option value="36">2036</option>
            <option value="37">2037</option>
            <option value="38">2038</option>
            <option value="39">2039</option>
            <option value="40">2040</option>
            <option value="41">2041</option>
            <option value="42">2042</option>
            <option value="43">2043</option>
            <option value="44">2044</option>
          </CustomInput>
        </FormGroup>
      </Col>
      <Col md="4" sm="4">
        <FormGroup className="form-label-group">
          <div>
            <Label for="Address">Address</Label>
          </div>
          <Input
            required
            type="text"
            name="address"
            id="Address"
            placeholder="Address"
            defaultValue={cardDetails?.address}
            onChange={(e) => changeHandler(e, true)}
          />
        </FormGroup>
      </Col>
      <Col md="4" sm="4">
        <FormGroup className="form-label-group">
          <div>
            <Label for="Street">Street</Label>
          </div>
          <Input
            required
            type="text"
            name="street_no"
            id="Street"
            placeholder="Street"
            defaultValue={cardDetails?.street_no}
            onChange={(e) => changeHandler(e, true)}
          />
        </FormGroup>
      </Col>
      <Col md="4" sm="4">
        <FormGroup className="form-label-group">
          <div>
            <Label for="Zip">Zip</Label>
          </div>
          <Input
            required
            type="number"
            name="zip"
            id="Zip"
            placeholder="Zip"
            defaultValue={cardDetails?.zip}
            onChange={(e) => changeHandler(e, true)}
            format="#####"
            className="form-control"
          />
        </FormGroup>
      </Col>
    </>
  );
};

export default CardDetails;
