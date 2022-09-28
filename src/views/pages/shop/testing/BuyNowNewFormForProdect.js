import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
import { Paper } from "@material-ui/core";
import CardOrChequeOption from "./cardOrChequeOption";
import { validationError } from "../../../../utilities/errorMessage";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    borderRadius: "6px !important",
  },
  primarybtn: {
    borderRadius: "6px !important",
    background: "#2396f3 !important",
    color: "#fff",
  },
  primarybtn1: {
    borderRadius: "6px !important",
    color: "#fff",
  },
  stepsStyle: {
    width: "100%",
    background: "#f9fbfc",
    "& .MuiStepIcon-root.MuiStepIcon-active": {
      color: "#2796f3 !important",
      fontWeight: "bold !important",
      boxShadow: "0 4px 20px 0 rgb(0 0 0 / 5%)",
    },
    "& .MuiStepIcon-root.MuiStepIcon-completed": {
      color: "#2796f3 !important",
      background: "#fff",
      boxShadow: "0 4px 20px 0 rgb(0 0 0 / 5%)",
    },
    "& .MuiStepConnector-lineHorizontal": {
      borderTop: "4 solid #2796f3 !important",
    },
  },
}));

export default function BuyNowNewFormForProdect(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const alertInfo = false;
  const steps = ["Product Info", "Checkout summary", "Document sign"];
  const handleNext = () => {
    const { payment_type, payment_money, due_every, balance, payment_time } =
      props?.state;
    const subscription_starts_from =
      props?.state?.valorPayload?.subscription_starts_from;
    const { studentId } = props?.studentDetails;
    const isPaymentDoneMS = props?.isPaymentDoneMS;
    if (payment_type === "monthly" || payment_type === "weekly") {
      if (activeStep === 0) {
        if (
          parseInt(balance) &&
          parseInt(payment_money) &&
          studentId &&
          subscription_starts_from
        ) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          const errorMessage = validationError({
            balance,
            payment_money,
            due_every: parseInt(due_every),
            payment_time,
            studentId,
            subscription_starts_from,
          });
          if (props?.state.deposite == props?.state.total_price) {
            props.setErrorMessage({
              ...errorMessage,
              subscription_starts_from: false,
            });
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          } else {
            props.setErrorMessage(errorMessage);
          }
        }
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
      if (activeStep === 1 && isPaymentDoneMS) {
        toast.info("Please Pay First!", {
          position: "top-center",
          autoClose: 3000,
          icon: true,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        if (!studentId && activeStep === 0) {
          let errorMessage = validationError({ studentId });
          if (props?.state.deposite == props?.state.total_price) {
            props.setErrorMessage({
              ...errorMessage,
              subscription_starts_from: false,
            });
          } else {
            props.setErrorMessage(errorMessage);
          }
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      }
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <div className={classes.root}>
      <div className={classes.StepperTrackBox}>
        <Paper square style={{ width: "100%" }}>
          <Stepper
            className={classes.stepsStyle}
            activeStep={activeStep}
            alternativeLabel
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>
      </div>
      <div>
        {alertInfo && (
          <div className=" m-1 alert alert-warning" role="alert">
            <b> EMI is not available with Card!</b>
          </div>
        )}
        {activeStep === 0 && props.buyNow}
        {activeStep === 1 && (
          <CardOrChequeOption
            CardPaymentFormComponent={props.CardPayment}
            membershipInfo={props.state}
            loading={props.loading}
            HandleChange={props.HandleChange}
            payNowMethod={props.payNowMethod}
            payLatterChange={props.payLatterChange}
            isPaymentDoneMS={props.isPaymentDoneMS}
            productPayment={props.productPayment}
            StripePayment={props.StripePayment}
          />
        )}
        <div className="d-flex justify-content-between">
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
            className={classes.backButton}
          >
            Back
          </Button>
          {steps[activeStep] !== "Document sign" && (
            <Button
              style={{
                background: activeStep === 1 ? "#cdc7c7" : "#2396f3",
              }}
              disabled={
                !props.isPaymentDoneMS && activeStep === 1 ? true : false
              }
              className={classes.primarybtn1}
              onClick={handleNext}
            >
              {"Next"}
            </Button>
          )}
          {activeStep === 2 && (
            <Button className={classes.primarybtn} onClick={props.toggleModal}>
              Close
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
