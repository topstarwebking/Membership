import { List, ListItem, makeStyles, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { FormGroup, Input, Label } from "reactstrap";

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
    color: "#fff",
    background: "#2796f3",
    fontWeight: "bold",
    borderRadius: "4px !important",
    width: "100%",
    "&:hover": {
      background: "#2796f3",
    },
  },
  greebBtn: {
    color: "#fff !important",
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
  const { membershipInfo, HandleChange, loading, isMembershipPaymentDone } = props;

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
          <div className={classes.secondaryTitle}>${membershipInfo.totalp}</div>
        </ListItem>
        <ListItem>
          <b>PAY NOW</b>
        </ListItem>
        <ListItem className="d-flex justify-content-between">
          <div className={classes.primaryTitle}>Down Payment</div>
          <div className={classes.secondaryTitle}>
            ${membershipInfo?.dpayment}
          </div>
        </ListItem>
        <ListItem
          style={{ borderBottom: "1px solid #d4d5d9" }}
          className="d-flex justify-content-between"
        >
          <div className={classes.primaryTitle}>Registration Fee</div>
          <div className={classes.secondaryTitle}>
            ${membershipInfo?.register_fees}
          </div>
        </ListItem>
        {membershipInfo?.balance !== 0 && (
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
                  onChange={HandleChange}
                  type="select"
                  value={membershipInfo?.pay_latter}
                >
                  <option value="cash">Cash</option>
                  <option value="credit card">Card</option>
                  <option value="cheque">Cheque</option>
                </Input>
              </FormGroup>
            </ListItem>
            <ListItem className="d-flex justify-content-between">
              <div className={classes.primaryTitle}>Total Due</div>
              <div className={classes.secondaryTitle}>
                ${membershipInfo?.balance}
              </div>
            </ListItem>
            <ListItem
              style={{ borderBottom: "1px solid #d4d5d9" }}
              className="d-flex justify-content-between"
            >
              <div className={classes.primaryTitle}>
                {membershipInfo?.payment_time} {membershipInfo?.payment_type}{" "}
                Payments,
                <br style={{ marginBottom: 0 }}></br>
                of ${membershipInfo?.payment_money} due every{" "}
                {membershipInfo?.due_every} of the{" "}
                {membershipInfo?.payment_type}
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
            <b>${parseInt(membershipInfo?.register_fees) +
              parseInt(membershipInfo?.dpayment)}
            </b>
          </div>
        </ListItem>
        <ListItem className="d-flex justify-content-center">
          <Button
            className={
              isMembershipPaymentDone ? classes.greebBtn : classes.buybtn
            }
            disabled={isMembershipPaymentDone}
            type="submit"
          >
            {loading ? (
              <div className={classes.root}>
                <CircularProgress
                  size={30}
                  style={{ color: "#fff !important" }}
                />
              </div>
            ) : (<Fragment>
              {isMembershipPaymentDone ? 'Payment Paid' : 'Pay Now'}
            </Fragment>
            )}
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
