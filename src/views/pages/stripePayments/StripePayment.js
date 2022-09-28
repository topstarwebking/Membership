// import React, { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// import "./stripePayment.css";
// import axios from "axios";

// const StripePayment = ({ paymentValidation, membershipInfo }) => {
//   console.log("membershipInfo", membershipInfo);
//   const stripe = loadStripe(
//     "pk_test_51LBxh7SF7FMHqBc5J0yZidscAvaJij9lSE76OqzN1fGwjpcf9xuEtnUXFTrxTtAuqBgyt1r3Dl9kvzJ7M2WMLv6b006cyqDF6V"
//   );
//   return (
//     <Elements stripe={stripe}>
//       <CheckoutForm membershipInfo={membershipInfo} />
//     </Elements>
//   );
// };

// function CheckoutForm({ membershipInfo }) {
//   const baseUrl = process.env.REACT_APP_BASE_URL;
//   const [isPaymentLoading, setPaymentLoading] = useState(false);
//   const stripe = useStripe();
//   const elements = useElements();
//   const payMoney = async (e) => {
//     console.log("element", elements);
//     e.preventDefault();
//     if (!stripe || !elements) {
//       return;
//     }
//     setPaymentLoading(true);
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: elements.getElement(CardElement),
//     });

//     if (!error) {
//       try {
//         const { id } = paymentMethod;
//         console.log("paymentMethod", paymentMethod);
//         const response = await axios.post(`${baseUrl}/payments`, {
//           amount: membershipInfo.payment_money,
//           id,
//         });
//         console.log(" response :>> ", response);
//         if (response.data.success) {
//           alert("Success!");
//         }
//       } catch (err) {
//         alert(err);
//       }
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: "3rem",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: "500px",
//           margin: "0 auto",
//         }}
//       >
//         <form
//           style={{
//             display: "block",
//             width: "100%",
//           }}
//           onSubmit={payMoney}
//         >
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <CardElement
//               className="card"
//               options={{
//                 style: {
//                   base: {
//                     backgroundColor: "white",
//                   },
//                 },
//               }}
//             />
//             <button className="pay-button" disabled={isPaymentLoading}>
//               {isPaymentLoading ? "Loading..." : "Pay"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default StripePayment;

import { makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { FormGroup, Input, Label, Row, Col } from "reactstrap";
import NumberFormat from "react-number-format";
import PaymentandBillingInfo from "../shop/membership/components/payment-and-billinfo";
import BillingAddress from "../shop/membership/components/billingAddress"; 
import CreditCard from "../shop/membership/components/credit-card/Credit-Card.png";

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

const StripePayment = ({
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
                <Label htmlFor="card_number">Card Number</Label>
              </div>
              <NumberFormat
                required
                type="text"
                name="card_number"
                id="card_number"
                placeholder="Card number"
                defaultValue={state.card_number}
                onChange={(e) => HandleChange(e, "valorPIF")}
                format="#### #### #### ####"
                className="form-control"
              />
              {paymentValidation?.card_number && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {paymentValidation?.card_number}
                </span>
              )}
            </FormGroup>
          </Col>
          <Col md="12" sm="12" lg="12">
            <FormGroup className="form-label-group">
              <div>
                <Label htmlFor="Pan">Pan Number</Label>
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
                type="text"
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

export default StripePayment;
