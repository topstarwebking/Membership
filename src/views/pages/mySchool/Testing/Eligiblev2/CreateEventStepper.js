import React, { useState } from "react";
import {
    Typography,
    Card,
    Button,
    Stepper,
    Step,
    StepLabel,

} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
    useForm,
    Controller,
    FormProvider,
    useFormContext,
} from "react-hook-form";
import {
    ADD_APPOINTMENT_OR_EVENT,
} from "../../../../../redux/actions/appointment";
import { connect } from "react-redux";
import EventCreate from "./CreateNewEvent/EventCreate"
import EventImage from "./CreateNewEvent/EventImage"
import HostInformation from "./CreateNewEvent/HostInformation"
import EventVenue from "./CreateNewEvent/EventVenue"
import Payment from "./CreateNewEvent/Payment"
import "./style.css"

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(1),
        backgroundColor: "#0184FF"
    },
}));

const getSteps = [
    {
        icons: "fa fa-align-left",
        title: "Basic info",
        text: "Give a title & description",
    },
    {
        icons: "fa fa-image",
        title: "Event Banner",
        text: "Upload an Event Banner",
    },
    {
        icons: "fa fa-user-md",
        title: "Host Info",
        text: "Add host info",
    },
    {
        icons: "fa fa-map-marker",
        title: "Venue",
        text: "Add Address",
    },
    {
        icons: "fa fa-ticket",
        title: "Tickets",
        text: "Tickets",
    }
];

const LinaerStepper = () => {
    const classes = useStyles();
    const methods = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            nickName: "",
            emailAddress: "",
            phoneNumber: "",
            alternatePhone: "",
            address1: "",
            address2: "",
            country: "",
            cardNumber: "",
            cardMonth: "",
            cardYear: "",
        },
    });
    const [activeStep, setActiveStep] = useState(0);
    const [skippedSteps, setSkippedSteps] = useState([]);
    const [mainPayload, setMainPayload] = useState({});

    const isStepOptional = (step) => {
        return step === 1 || step === 2;
    };

    const isStepSkipped = (step) => {
        return skippedSteps.includes(step);
    };

    const handleNext = (data) => {
        if (activeStep === getSteps.length - 1) {
        } else {
            setActiveStep(activeStep + 1);
            setSkippedSteps(
                skippedSteps.filter((skipItem) => skipItem !== activeStep)
            );
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    return (
        <>
            <div className="row stepperSection">
                <div className="col-md-3">
                    <Stepper alternativeLabel activeStep={activeStep} orientation="vertical">
                        {getSteps.map((step, index) => {
                            const labelProps = {};
                            const stepProps = {};
                            if (isStepOptional(index)) {
                                labelProps.optional = (
                                    <>

                                    </>
                                );
                            }
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step {...stepProps} className="column">
                                    <StepLabel className="d-flex justify-content-between align-items-start stepsLabel">
                                        <div className="d-flex align-items-center">
                                            <div className="iconsColor">
                                                <i className={step.icons} ></i>
                                            </div>
                                            <div>
                                                <p
                                                    className="mb-0"
                                                    style={{ fontSize: "16px", paddingBottom: "4px" }}
                                                >
                                                    {step.title}
                                                </p>
                                                <span>{step.text}</span>

                                            </div>
                                        </div>
                                    </StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </div>

                <Card className="col-md-9 ">
                    {activeStep === getSteps.length ? (
                        <Typography variant="h3" align="center">
                            Thank You
                        </Typography>
                    ) : (
                        <div className="p-1 stepperCard">
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(handleNext)}>
                                    {activeStep === 0 && <EventCreate setMainPayload={setMainPayload} />}
                                    {activeStep === 1 && <EventImage setMainPayload={setMainPayload} />}
                                    {activeStep === 2 && <HostInformation setMainPayload={setMainPayload} />}
                                    {activeStep === 3 && <EventVenue setMainPayload={setMainPayload} />}
                                    {activeStep === 4 && <Payment setMainPayload={setMainPayload} />}
                                    <div className="d-flex justify-content-between position-relative ml-5 col-md-10">
                                        <Button
                                            disabled={activeStep === 0}
                                            variant="contained"
                                            className={`btn btn-outline-primary text-primary ml-4 ${activeStep ? getSteps : "d-none"}`}
                                            onClick={handleBack}
                                        >
                                            <i className="fa fa-arrow-left text-dark mr-1" aria-hidden="true"></i> Previous
                                        </Button>
                                        <Button
                                            className={`${classes.button} btn btn-primary text-white ml-3`}
                                            variant="contained"
                                            type="submit"

                                        >
                                            {activeStep === getSteps.length - 1 ? "Finish" : "Next "} <i className="fa fa-arrow-right text-white ml-1" aria-hidden="true"></i>
                                        </Button>
                                    </div>
                                </form>
                            </FormProvider>
                        </div>
                    )}
                </Card>
            </div>


        </>
    );
};

const mapStateToProps = (state) => {
    return {
        appointmentCategoryList: state.appointmentAndEvent.appointmentCategoryList,
    };
};
export default connect(mapStateToProps, {
    ADD_APPOINTMENT_OR_EVENT
})(LinaerStepper)