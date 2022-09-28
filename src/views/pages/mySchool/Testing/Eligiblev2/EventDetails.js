import Breadcrumbs from "../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, CardImg, CardBody, CardSubtitle, Button } from "reactstrap";
import "./style.css";
import Chart from "react-apexcharts"
import { Chip } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory, useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import ProductionTabs from "./ProductionTabs";
import GeneralTabs from "./GanaralTabs";
import notFound from "../../../../../assets/img/notfound.jpg"
import NoDataImage from "../../../../../assets/img/nodatafound.png"
import moment from "moment";
import {
    FETCH_TEST_LIST_COUNT,
    FETCH_APPOINMENT_DETAILS,
    FETCH_EVENT_DETAILS,
    GET_ATTENDED_INVITESE,
    GET_GENERAL_RANK_DETAILS,
    GET_PROMPTION_RANK_DETAILS,
    GET_INVITEES_OF_EVENT,
    GET_INVITEES_OF_EVENT_COUNT,
    GET_REGISTERED_FOR_EVENT,
    FETCH_EVENTS,
    SELECTED_EVENT,
} from "../../../../../redux/actions/test";
import RankDetails from "./RankDetails";

const EventDetails = (props) => {
    const {
        FETCH_TEST_LIST_COUNT,
        selectedEvent,
        testListCount,
        SELECTED_EVENT,
        GET_ATTENDED_INVITESE,
        GET_INVITEES_OF_EVENT,
        GET_GENERAL_RANK_DETAILS,
        GET_PROMPTION_RANK_DETAILS,
        GET_INVITEES_OF_EVENT_COUNT,
        GET_REGISTERED_FOR_EVENT,
        getInvitestudentsCount,
        getInvitestudents,
        getRegisteredforEvent,
        promotionRankDetails,
        generalRankDetails,
        getAttendedforEvent } = props;
    const { eventId } = useParams()
    const history = useHistory();
    const [openRankDetails, setOpenRankDetails] = useState(false);

    useEffect(() => {
        FETCH_TEST_LIST_COUNT(eventId)
        GET_INVITEES_OF_EVENT(eventId)
        GET_INVITEES_OF_EVENT_COUNT(eventId)
        GET_REGISTERED_FOR_EVENT(eventId)
        GET_GENERAL_RANK_DETAILS(eventId)
        GET_PROMPTION_RANK_DETAILS(eventId)
        GET_ATTENDED_INVITESE(eventId)
        FETCH_EVENTS(moment(new Date()).format("MM-DD-YYYY"))
    }, [eventId])
    useEffect(() => {
        FETCH_APPOINMENT_DETAILS(eventId).then(resp => {
            SELECTED_EVENT(resp.data.result)
        })
    }, [eventId])

    const options = {
        plotOptions: {
            radialBar: {
                size: 150,
                offsetY: 20,
                startAngle: -150,
                endAngle: 150,
                hollow: {
                    size: '65%'
                },
                track: {
                    background: '#fff',
                    strokeWidth: '100%'
                },
                dataLabels: {
                    name: {
                        offsetY: -5,
                        fontFamily: 'Montserrat',
                        fontSize: '1rem'
                    },
                    value: {
                        offsetY: 15,
                        fontFamily: 'Montserrat',
                        fontSize: '1.714rem'
                    }
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        stroke: {
            dashArray: 8
        },
        labels: ['Registered']
    },
        series = selectedEvent?.appointment_type === "Promotion Test" ? testListCount?.recommeded || testListCount?.Registered ?
            [Math.round(testListCount?.Registered / (testListCount?.recommeded + testListCount?.Registered) * 100)] : [0]
            : getInvitestudentsCount?.invitees || getInvitestudentsCount?.registeredInvitee ?
                [Math.round(getInvitestudentsCount?.registeredInvitee / (getInvitestudentsCount?.invitees + getInvitestudentsCount?.registeredInvitee) * 100)] : [0]
    return (
        <>
            <div className="d-flex justify-content-start align-items-center mb-1">
                <Chip onClick={() => {
                    history.fromback = true
                    history.goBack()
                }} label='Back' icon={<ArrowBackIcon color='secondary' />} />
                <h2 className="ml-1 content-header-title float-left mb-0">
                    {"Event Details"}
                </h2>
            </div>
            <Row>
                <Col md={4}>
                    <Card>
                        <CardImg
                            alt="Card image cap"
                            src={selectedEvent?.eventBanner ? selectedEvent?.eventBanner : notFound}
                            top
                            width="100%"
                            height="10%"
                            className="eventImage"
                        />
                        <CardBody>
                            <Row>
                                <Col md={3} className="text-center">
                                    <h2>
                                        {moment(selectedEvent?.start_time).format("ddd")}
                                        <br />
                                        {moment(selectedEvent?.start_time).format("DD")}
                                    </h2>

                                </Col>
                                <div className="vr"></div>
                                <Col md={8}>
                                    <h3>
                                        {selectedEvent?.title}
                                    </h3>
                                    <CardSubtitle>
                                        {selectedEvent?.notes}
                                    </CardSubtitle>
                                </Col>
                                <Col md={10} className="ml-5">
                                    <div className="d-flex mt-1 ml-2">
                                        <div className="iconsColor">
                                            <i className="fa fa-calendar-o" ></i>
                                        </div>
                                        <div>
                                            <p className="mt-1 font-weight-bold" style={{ fontSize: "18px" }}>
                                                {moment(selectedEvent?.start_time).format("ddd, MMM DD, YYYY")}
                                                <br />
                                                <span className="font-weight-normal" style={{ fontSize: "16px" }}>
                                                    {moment(selectedEvent?.start_time).format("HH:mm A")} To {moment(selectedEvent?.end_time).format("HH:mm A")}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="d-flex ml-2">
                                        <div className="iconsColor">
                                            <i className="fa fa-map-marker" ></i>
                                        </div>
                                        <div>
                                            <p className="mt-1 font-weight-bold" style={{ fontSize: "18px" }}>
                                                {selectedEvent?.eventLocation}
                                                <br />
                                                <span className="font-weight-normal" style={{ fontSize: "16px" }}>
                                                    {selectedEvent?.eventCity}, {selectedEvent?.eventState}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <div className="d-flex m-1 justify-content-between">
                            <h3>Guest Tracker</h3>
                            <Button
                                onClick={() => setOpenRankDetails(true)}
                                style={{
                                    color: "#6b6b6b",
                                    height: 40,
                                    borderRadius: "6px",
                                    width: "100px",
                                    border: "1px solid #b8c2cc",
                                }}
                            >
                                Ranks
                            </Button>
                            {openRankDetails ?
                                <RankDetails
                                    setOpenRankDetails={setOpenRankDetails}
                                    promotionRankDetails={promotionRankDetails}
                                    generalRankDetails={generalRankDetails}
                                    openRankDetails={openRankDetails}
                                    eventType={selectedEvent?.appointment_type} />
                                : ""}
                            <Link to={`/app/school/test/add-guest/${eventId}`}>
                                <Button color="primary">Add Guests</Button>
                            </Link>
                        </div>
                        <div className="d-flex ml-2 mt-2">
                            <div>
                                <p className="font-weight-bold mb-0 pl-1" style={{ fontSize: "20px", color: "#000" }}>
                                    {selectedEvent?.appointment_type === "Promotion Test" ? testListCount?.recommeded || testListCount?.Registered || testListCount?.Promoted ?
                                        testListCount?.recommeded + testListCount?.Registered + testListCount?.Promoted : 0
                                        : getInvitestudentsCount?.invitees || getInvitestudentsCount?.registeredInvitee || getInvitestudentsCount?.attendee ?
                                            getInvitestudentsCount?.invitees + getInvitestudentsCount?.registeredInvitee + getInvitestudentsCount?.attendee : 0
                                    }
                                </p>
                                <span className="font-weight-normal mt-0" style={{ fontSize: "18px", color: "#626262" }}> Total</span>
                            </div>
                            <Chart
                                options={options}
                                series={series}
                                type="radialBar"
                                height={290}
                                style={{
                                    width: "100%",

                                }}
                            />
                        </div>
                        <div className="d-flex mx-2 my-1 justify-content-between">
                            <div className="text-center">
                                <span className="mt-1 " style={{ fontSize: "18px", color: "#626262" }}>
                                    {selectedEvent?.appointment_type === "Promotion Test" ? "Recommended" : "Invited"}
                                </span>
                                <br />
                                <span className="font-weight-bold" style={{ fontSize: "16px", color: "#000" }}>
                                    {selectedEvent?.appointment_type === "Promotion Test" ? testListCount?.recommeded ? testListCount?.recommeded : 0 : getInvitestudentsCount?.invitees ? getInvitestudentsCount?.invitees : 0}
                                </span>
                            </div>
                            <div className="text-center">
                                <span className="mt-1 " style={{ fontSize: "18px", color: "#626262" }}>
                                    Registered
                                </span>
                                <br />
                                <span className="font-weight-bold" style={{ fontSize: "16px", color: "#000" }}>
                                    {selectedEvent?.appointment_type === "Promotion Test" ? testListCount?.Registered ? testListCount?.Registered : 0 : getInvitestudentsCount?.registeredInvitee ? getInvitestudentsCount?.registeredInvitee : 0}
                                </span>
                            </div>
                            <div className="text-center">
                                <span className="mt-1 " style={{ fontSize: "18px", color: "#626262" }}>
                                    {selectedEvent?.appointment_type === "Promotion Test" ? "Promoted" : "Attended"}
                                </span>
                                <br />
                                <span className="font-weight-bold" style={{ fontSize: "16px", color: "#000" }}>
                                    {selectedEvent?.appointment_type === "Promotion Test" ? testListCount?.Promoted ? testListCount?.Promoted : 0 : getInvitestudentsCount?.attendee ? getInvitestudentsCount?.attendee : 0}
                                </span>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <div className="mt-1 ml-1">
                            <h3>Invitation Details</h3>
                        </div>
                        <div className="m-1 d-flex justify-content-center align-items-center" style={{
                            backgroundImage: selectedEvent?.eventBanner ? `url(${selectedEvent?.eventBanner})` : `url(${notFound})`,
                            width: "92%",
                            height: "17vh",
                            backgroundSize: "cover",
                            boxShadow: '1px 2px 9px #babfc7'

                            // backgroundRepeat: "no-repeat"
                        }}>

                            <div
                                className="m-0 w-100 h-100 d-flex justify-content-center align-items-center"
                                style={{
                                    backgroundColor: "#ffff",
                                    opacity: 0.5,
                                }}>
                                <h1
                                    className="text-capitalize mb-0"
                                    style={{
                                        fontWeight: 900,
                                        color: "#000000"
                                    }}
                                ><b>{selectedEvent?.title}</b></h1>
                            </div>
                        </div>
                        <div>
                            <h5 className="ml-1">Send Invitation</h5>
                            <div className="d-flex ml-1 mb-1 shareBtns ">
                                <div className="one">
                                    <i className="fa fa-paperclip" aria-hidden="true"></i>
                                </div>
                                <div className="two">
                                    <i className="fa fa-envelope-o" aria-hidden="true"></i>
                                </div>
                                <div className="three">
                                    <i className="fa fa-send-o" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h5 className="ml-1">Share Your Event</h5>
                            <div className="d-flex ml-1 mb-1 social">
                                <div className="one">
                                    <i className="fa fa-facebook" aria-hidden="true"></i>
                                </div>
                                <div className="two">
                                    <i className="fa fa-twitter" aria-hidden="true"></i>
                                </div>
                                <div className="three">
                                    <i className="fa fa-instagram" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
            {selectedEvent?.appointment_type !== "Promotion Test" ? <GeneralTabs getInvitestudents={getInvitestudents} selectedrow={selectedEvent} getRegisteredforEvent={getRegisteredforEvent} getAttendedforEvent={getAttendedforEvent} /> : <ProductionTabs selectedrow={selectedEvent} eventId={eventId} />}
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        fetchAllEvents: state.appointmentAndEvent.fetchAllEvents,
        selectedEvent: state.appointmentAndEvent.selectedEvent,
        getInvitestudentsCount: state.test.getInvitestudentsCount,
        getInvitestudents: state.test.getInvitestudents,
        getRegisteredforEvent: state.test.getRegisteredforEvent,
        getAttendedforEvent: state.test.getAttendedforEvent,
        testListCount: state.test.testListCount,
        promotionRankDetails: state.test.promotionRankDetails,
        generalRankDetails: state.test.generalRankDetails,
    };
};
export default connect(mapStateToProps, {
    FETCH_TEST_LIST_COUNT,
    GET_GENERAL_RANK_DETAILS,
    GET_PROMPTION_RANK_DETAILS,
    GET_INVITEES_OF_EVENT,
    GET_INVITEES_OF_EVENT_COUNT,
    FETCH_EVENT_DETAILS,
    FETCH_APPOINMENT_DETAILS,
    GET_REGISTERED_FOR_EVENT,
    GET_ATTENDED_INVITESE,
    SELECTED_EVENT,
    FETCH_EVENTS,
})(EventDetails);