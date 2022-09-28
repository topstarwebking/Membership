import React, { useEffect, useState } from "react";
import {
    Typography,
    Card,
    Button,
    Stepper,
    Step,
    StepLabel,
    Chip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
    useForm,
    FormProvider,
} from "react-hook-form";
import "../style.css"
import EventDetailForm from "./EventDetailForm";
import ImageUpload from "./UploadImage";
import HostInformation from "./HostInformation";
import VenueDetails from "./VenueDetails";
import PaymentForm from "./PaymentForm";
import moment from "moment";
import { ADD_EVENT_V2, FETCH_EVENTS } from "../../../../../../redux/actions/test";
import { connect } from "react-redux";
import { RRule, RRuleSet } from "rrule";
import { useHistory, useLocation, useParams } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { UPDATE_EVENT } from "../../../../../../redux/actions/appointment";


const useStyles = makeStyles((theme) => ({
    button: {
        // marginRight: theme.spacing(1),
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



const LinaerStepper = (props) => {
    const { ADD_EVENT_V2, FETCH_EVENTS, fetchAllEvents, UPDATE_EVENT } = props
    const { actionType, eventId } = useParams()
    const selectedEvent = fetchAllEvents.filter((item) => item?._id === eventId)
    // const location = useLocation()
    // const { data } = location.actionType
    // console.log(fetchAllEvents,selectedEvent)
    const methods = useForm({
        defaultValues: {
            // firstName: "",
            // lastName: "",
            // nickName: "",
            // emailAddress: "",
            // phoneNumber: "",
            // alternatePhone: "",
            // address1: "",
            // address2: "",
            // country: "",
            // cardNumber: "",
            // cardMonth: "",
            // cardYear: "",
        },
    });
    const [activeStep, setActiveStep] = useState(0);
    const [skippedSteps, setSkippedSteps] = useState([]);
    const [payload, setPayload] = useState({
        appointment_type: "General Event",
        app_color: "#52e5f7",
        ticketAvailabeQuantity: "0",
        ticketPrice: "0",
    });
    
    const [option, setOption] = useState(actionType === "Edit" ? selectedEvent[0]?.ticketType : "Paid")
    const [category, setCategory] = useState(actionType === "Edit" ? selectedEvent[0]?.category : "Public")
    const [proofFiles, setProofFiles] = useState()
    const history = useHistory()
    let start = moment(payload.start).format("YYYY-MM-DD");
    let end = moment(payload.end).format("YYYY-MM-DD");
    const startdate = start.split("-");
    const [startyear, startmont, startday] = startdate;
    const enddate = end.split("-");
    const [endtyear, endmonth, endtday] = enddate;

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <EventDetailForm setPayload={setPayload} payload={payload} setCategory={setCategory} category={category} action={actionType} selectedEvent={selectedEvent} />;
            case 1:
                return <ImageUpload setPayload={setPayload} payload={payload} setProofFiles={setProofFiles} action={actionType} selectedEvent={selectedEvent} />;
            case 2:
                return <HostInformation setPayload={setPayload} payload={payload} action={actionType} selectedEvent={selectedEvent} />;
            case 3:
                return <VenueDetails setPayload={setPayload} payload={payload} action={actionType} selectedEvent={selectedEvent} />;
            case 4:
                return <PaymentForm setPayload={setPayload} payload={payload} setOption={setOption} option={option} action={actionType} selectedEvent={selectedEvent} />;
            default:
                return "unknown step";
        }
    }
    const isStepOptional = (step) => {
        return step === 1 || step === 2;
    };

    const isStepSkipped = (step) => {
        return skippedSteps.includes(step);
    };

    const handleNext = async (data) => {
        // console.log(data);
        if (activeStep === getSteps.length - 1) {
            let formData = new FormData();
            const rule = new RRule({
                freq: RRule.DAILY,
                interval: 1,
                dtstart: new Date(
                    Date.UTC(Number(startyear), Number(startmont - 1), Number(startday))
                ),
                until: new Date(
                    Date.UTC(Number(endtyear), Number(endmonth - 1), Number(endtday))
                ),
            });
            // console.log(rule.all())
            if (actionType === "Create") {
                formData.append("title", payload?.title);
                formData.append("notes", payload?.notes);
                formData.append("hostName", payload?.hostName);
                formData.append("hostMobileNumber", payload?.hostMobileNumber);
                formData.append("hostEmail", payload?.hostEmail);
                formData.append("hostAlternateNumber", payload?.hostAlternateNumber);
                formData.append("end", moment(payload?.end).format("YYYY-MM-DD"));
                formData.append("end_time", moment(payload?.end_time).format("YYYY-MM-DDTHH:mm:ss.sssZ"));
                formData.append("eventCity", payload?.eventCity);
                formData.append("zip", payload?.zip);
                formData.append("totalIncome", payload?.totalIncome);
                formData.append("ticketPrice", payload?.ticketPrice);
                formData.append("ticketName", payload?.ticketName);
                formData.append("ticketAvailabeQuantity", payload?.ticketAvailabeQuantity);
                formData.append("start_time", moment(payload?.start_time).format("YYYY-MM-DDTHH:mm:ss.sssZ"));
                formData.append("start", moment(payload?.start).format("YYYY-MM-DD"));
                formData.append("eventStreet", payload?.eventStreet);
                formData.append("eventState", payload?.eventState);
                formData.append("eventLocation", payload?.eventLocation);
                formData.append("app_color", payload?.app_color);
                formData.append("category", category);
                // formData.append("eventBanner", proofFiles);
                for (let file of proofFiles) {
                    formData.append("eventBanner", file);
                }
                formData.append("ticketType", option);
                formData.append("repeatedDates", JSON.stringify(rule.all()));
                formData.append("repeatedConcurrence", "Day");
                formData.append("appointment_type", payload?.appointment_type);
                // rule.all().map((v) => {
                //     formData.append("repeatedDates", v);
                //     return v;
                //   });

                let result = await ADD_EVENT_V2(formData, moment(new Date()).format("MM-DD-YYYY"))
                if (result) {
                    history.fromback = true
                    history.goBack()
                }
            } else {
                if (payload?.title !== undefined) {
                    formData.append("title", payload?.title)
                }
                if (payload?.notes !== undefined) {
                    formData.append("notes", payload?.notes);
                }
                if (payload?.hostName !== undefined) {
                    formData.append("hostName", payload?.hostName);
                }
                if (payload?.hostMobileNumber !== undefined) {
                    formData.append("hostMobileNumber", payload?.hostMobileNumber);
                }
                if (payload?.hostEmail !== undefined) {
                    formData.append("hostEmail", payload?.hostEmail);
                }
                if (payload?.hostAlternateNumber !== undefined) {
                    formData.append("hostAlternateNumber", payload?.hostAlternateNumber);
                }
                if (payload?.end !== undefined) {
                    formData.append("end", moment(payload?.end).format("YYYY-MM-DD"));
                }
                if (payload?.end_time !== undefined) {
                    formData.append("end_time", moment(payload?.end_time).format("YYYY-MM-DDTHH:mm:ss.sssZ"));
                }
                if (payload?.eventCity !== undefined) {
                    formData.append("eventCity", payload?.eventCity);
                }
                if (payload?.zip !== undefined) {
                    formData.append("zip", payload?.zip);
                }
                if (payload?.totalIncome !== undefined) {
                    formData.append("totalIncome", payload?.totalIncome);
                }
                if (payload?.ticketPrice !== undefined) {
                    formData.append("ticketPrice", payload?.ticketPrice);
                }
                if (payload?.ticketName !== undefined) {
                    formData.append("ticketName", payload?.ticketName);
                }
                if (payload?.ticketAvailabeQuantity !== undefined) {
                    formData.append("ticketAvailabeQuantity", payload?.ticketAvailabeQuantity);
                }
                if (payload?.start_time !== undefined) {
                    formData.append("start_time", moment(payload?.start_time).format("YYYY-MM-DDTHH:mm:ss.sssZ"));
                }
                if (payload?.start !== undefined) {
                    formData.append("start", moment(payload?.start).format("YYYY-MM-DD"));
                }
                if (payload?.eventStreet !== undefined) {
                    formData.append("eventStreet", payload?.eventStreet);
                }
                if (payload?.eventState !== undefined) {
                    formData.append("eventState", payload?.eventState);
                }
                if (payload?.eventLocation !== undefined) {
                    formData.append("eventLocation", payload?.eventLocation);
                }
                if (category !== undefined) {
                    formData.append("category", category);
                }
                if (payload?.app_color !== undefined) {
                    formData.append("app_color", payload?.app_color);
                }
                if (proofFiles !== undefined) {
                    for (let file of proofFiles) {
                        formData.append("eventBanner", file);
                    }
                }
                if (option !== undefined) {
                    formData.append("ticketType", option);
                }
                if (payload?.start !== undefined && payload?.end !== undefined) {
                    formData.append("repeatedDates", JSON.stringify(rule.all()));
                }
                formData.append("repeatedConcurrence", "Day");
                if (payload?.appointment_type !== undefined) {
                    formData.append("appointment_type", payload?.appointment_type);
                }


                let result = await UPDATE_EVENT(formData, selectedEvent[0]?._id)
                if (result) {
                    history.fromback = true
                    history.goBack()
                }
            }


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
    useEffect(() => {
        FETCH_EVENTS(moment(new Date()).format("MM-DD-YYYY"))
    }, [FETCH_EVENTS])
    return (
        <>
            <div className="d-flex justify-content-start align-items-center mb-1">
                <Chip onClick={() => {
                    history.fromback = true
                    history.goBack()
                }} label='Back' icon={<ArrowBackIcon color='secondary' />} />
                <h2 className="ml-1 content-header-title float-left mb-0">
                    {actionType === "Create" ? "Create Event" : "Edit Event"}
                </h2>
            </div>
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
                                <Step {...stepProps} className="column" key={index}>
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
                        <div className="p-1 stepperCard" >
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(handleNext)}>
                                    {getStepContent(activeStep)}
                                    <div
                                        className="d-flex justify-content-between col-md-10"
                                        style={{ marginLeft: "60px" }}
                                    >
                                        <Button
                                            disabled={activeStep === 0}
                                            className={`px-2 ${activeStep ? getSteps : "d-none"} ml-4`}
                                            style={{
                                                color: "#40a7e1",
                                                height: 50,
                                                borderRadius: "4px",
                                                border: "1px solid #40a7e1",
                                            }}
                                            onClick={handleBack}
                                        >
                                            <i className="fa fa-arrow-left text-gray mr-1" aria-hidden="true"></i> Previous
                                        </Button>
                                        <Button
                                            className="ml-4 px-2"
                                            style={{
                                                color: "#fff",
                                                height: 50,
                                                borderRadius: "4px",
                                                backgroundColor: "#40a7e1"
                                            }}
                                            type="submit"
                                        >
                                            {activeStep === getSteps.length - 1 ? "Save" : "Next "}
                                            {activeStep === getSteps.length - 1 ? "" : <i className="fa fa-arrow-right text-white ml-1" aria-hidden="true" />}
                                            {/* {isCreate ? <Link></Link> : null} */}
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
        fetchAllEvents: state.appointmentAndEvent.fetchAllEvents,
    };
};
export default connect(mapStateToProps, { FETCH_EVENTS, ADD_EVENT_V2, UPDATE_EVENT })(LinaerStepper);

