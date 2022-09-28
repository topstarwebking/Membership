
import { List, ListItem, makeStyles, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { Fragment } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  mainTitle: {
    fontSize: "1.4rem",
    fontWeight: 600,
  },
  primaryTitle: {
    color: "#112236",
  },
  secondaryTitle: {
    color: "#424f60",
    textAlign: "right",
  },
  buybtn: {
    color: "#FFF",
    background: "#2796f3",
    fontWeight: "bold",
    borderRadius: "4px !important",
    width: "100%",
    "&:hover": {
      background: "#2796f3",
    },
  },
  greebBtn: {
    color: "#FFF",
    background: "#6ec871",
    fontWeight: "bold",
    borderRadius: "4px !important",
    width: "100%",
    "&:hover": {
      background: "#6ec871",
    },
  },
}));
const PaymentandBillingInfo = (props) => {
  const classes = useStyles();
  const { state, payLatterChange, loading, isMembershipPaymentDone } = props;

  return (
    <div className="p-1" style={{ background: "#f6f6f6" }}>
      <List dense style={{ width: "100%" }}>
        <ListItem>
          <b>Cart Summary</b>
        </ListItem>
        <ListItem
          style={{ borderBottom: "1px solid #d4d5d9" }}
          className="d-flex justify-content-between"
        >
          <div className={classes.primaryTitle}>Total Price</div>
          <div className={classes.secondaryTitle}>${state?.total_price}</div>
        </ListItem>
        <ListItem>
          <b>PAY NOW</b>
        </ListItem>
        <ListItem className="d-flex justify-content-between">
          <div className={classes.primaryTitle}>Down Payment</div>
          <div className={classes.secondaryTitle}>${state?.deposite}</div>
        </ListItem>

        {state?.balance !== 0 && (
          <>
            <ListItem className="d-flex justify-content-between">
              <b>PAY LATER</b>
              <FormGroup className="form-label-group">
                <div>
                  <Label htmlFor="pay_now_later">Payment Method</Label>
                </div>
                <Input
                  id="pay_latter"
                  name="pay_latter"
                  onChange={payLatterChange}
                  type="select"
                  value={state?.pay_latter}
                >
                  <option value="cash">Cash</option>
                  <option value="credit card">Card</option>
                  <option value="cheque">Cheque</option>
                </Input>
              </FormGroup>
            </ListItem>
            <ListItem className="d-flex justify-content-between">
              <div className={classes.primaryTitle}>Total Due</div>
              <div className={classes.secondaryTitle}>${state?.balance}</div>
            </ListItem>
            <ListItem
              style={{ borderBottom: "1px solid #d4d5d9" }}
              className="d-flex justify-content-between"
            >
              <div className={classes.primaryTitle}>
                {state?.payment_time} {state?.payment_type} Payments,
                <br style={{ marginBottom: 0 }}></br>
                of ${state?.payment_money} due every {state?.due_every} of the{" "}
                {state?.payment_type}
              </div>
            </ListItem>
          </>
        )}
        <ListItem
          style={{ fontSize: "1.4rem" }}
          className="mt-2 d-flex justify-content-between text-success"
        >
          <div className={classes.primaryTitle}>
            <b>Total</b>
          </div>
          <div>
            <b>${parseInt(state?.deposite)}</b>
          </div>
        </ListItem>
        <ListItem className="d-flex justify-content-center">
          <Button
            disabled={
              state.ptype === "check" && !state?.cheque_no
                ? true
                : false
            }
            className={props.isPaymentDoneMS ? classes.greebBtn : classes.buybtn}
            type="submit"
            onClick={!props.isPaymentDoneMS ? props.productPayment : null}
          >
            {loading ? (
              <div className={classes.root}>
                <CircularProgress
                  size={30}
                  style={{ color: "#fff !important" }}
                />
              </div>
            ) : (<Fragment>
              {props.isPaymentDoneMS ? 'Payment Paid' : 'Pay Now'}
            </Fragment>
            )}
            {/* {console.log(props.isPaymentDoneMS )} */}
          </Button>
        </ListItem>
      </List>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isMembershipPaymentDone: state.shop?.isMembershipPaymentDone,
  };
};
export default connect(mapStateToProps, null)(PaymentandBillingInfo);
// isMembershipPaymentDone: state.navbarReducer?.isMembershipPaymentDone
