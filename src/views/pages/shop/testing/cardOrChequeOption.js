import React from "react";
import { CardContent, Card, makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CashOptionOrCheck from "./chequCardInfo";
const useStyles = makeStyles(() => ({
  wrapper: {},
  CheckImageMemberShip: {
    width: "80%",
    objectFit: "contain",
  },
  activeTab: {
    color: "#2796f3",
  },
  inactiveTab: {
    color: "#2796f3",
  },
  cardStyle: {
    width: "100%",
    boxShadow: "2px 0 14px #f8f8f8",
  },
}));

const CardOrChequeOption = (props) => {
  const classes = useStyles();
  const { CardPaymentFormComponent, HandleChange, payNowMethod, loading, StripePayment } = props;
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newTab) => {
    setTab(newTab);
    if (newTab === 0) {
      payNowMethod("credit card");
    } else if (newTab === 1){
      payNowMethod("cash");
    } else{
      payNowMethod("stripe");
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper square style={{ width: "100%" }}>
        <Tabs
          value={tab}
          centered
          TabIndicatorProps={{
            style: { background: "#2796f3", height: "2px" },
          }}
          onChange={handleChange}
        >
          <Tab
            className={tab === 0 ? classes.activeTab : ""}
            label={
              <div>
                <span>
                  <b>Credit card</b>
                </span>
              </div>
            }
          />
          <Tab
            className={tab === 1 ? classes.activeTab : ""}
            label={
              <div>
                <span>
                  <b>Cash or Check</b>
                </span>
              </div>
            }
          />
          <Tab
            className={tab === 2 ? classes.activeTab : ""}
            label={
              <div>
                <span>
                  <b>Pay by Stripe</b>
                </span>
              </div>
            }
          />
        </Tabs>
      </Paper>
      <div className="p-1">
        <Card className={classes.cardStyle}>
          <CardContent>
            {tab === 0 && CardPaymentFormComponent}
            {tab === 1 && (
              <CashOptionOrCheck
                HandleChange={HandleChange}
                membershipInfo={props.membershipInfo}
                loading={loading}
                payNowMethod={props.payNowMethod}
                payLatterChange={props.payLatterChange}
                isPaymentDoneMS={props.isPaymentDoneMS}
                productPayment={props.productPayment}
              />
            )}
            {tab === 2 && StripePayment}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CardOrChequeOption;
