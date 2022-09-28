import moment from "moment"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Link, useHistory, useParams } from "react-router-dom"
import { Container, Row, Col, Card, CardImg, CardBody, CardSubtitle } from "reactstrap"
// import Img from "../../../../../assets/img/eventviewpage.png"
import { FETCH_EVENTS } from "../../../../../redux/actions/test"
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Chip } from "@material-ui/core"



const EventPreview = (props) => {
    const { FETCH_EVENTS, fetchAllEvents } = props
    const { eventId } = useParams()
    const history = useHistory()
    const selectedEvent = fetchAllEvents.filter((item) => item?._id === eventId)
    useEffect(() => {
        FETCH_EVENTS(moment(new Date()).format("MM-DD-YYYY"))
    }, [FETCH_EVENTS])

    return (
        <div className="m-4">

            <div className="d-flex justify-content-between headerSection p-1">
                <Chip onClick={() => {
                    history.fromback = true
                    history.goBack()
                }} label='Back' icon={<ArrowBackIcon color='secondary' />} />
                {/* <div>
                    <ul className=" nav d-flex">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Learn More
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Create Event
                            </Link>
                        </li>
                    </ul>
                </div> */}
            </div>

            <div className="text-center  eventPreviewText">
                <h1 className="text-capitalize">
                {selectedEvent[0]?.title}
                </h1>
                
            </div>
            <div className="mt-1">
                <Row>
                    <Col sm={4} md={4} lg={4}>
                        <Card>
                            <button className="btn btn-primary m-2">Buy Ticket</button>
                            <CardBody>
                                <Row>
                                    <Col md={3} className="text-center">
                                        <h2>{moment(selectedEvent[0]?.start).format("ddd")}<br />{moment(selectedEvent[0]?.start).format("DD")}</h2>

                                    </Col>
                                    <div className="vr"></div>
                                    <Col md={8}>
                                        <h3 className="text-capitalize">{selectedEvent[0]?.title}</h3>
                                        {/* <CardSubtitle>Meet worlds popular developers</CardSubtitle> */}
                                    </Col>
                                    <Col md={10} className="ml-2">
                                        <div className="d-flex mt-1 ml-2">
                                            <div
                                                className="d-flex justify-content-center align-items-center p-1"
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    fontSize: "24px",
                                                    color: "#0783fb",
                                                    background: "#d9edfe",
                                                    borderRadius: "5px",
                                                    margin: "10px",
                                                }}
                                            >
                                                <CalendarTodayIcon />
                                            </div>
                                            <div>
                                                <p className="mt-1 font-weight-bold" style={{ fontSize: "18px" }}>
                                                    {moment(selectedEvent[0]?.start).format("ddd DD YYYY")}
                                                    <br />
                                                    <span className="font-weight-normal" style={{ fontSize: "16px" }}>{moment(selectedEvent[0]?.start_time).format("h:mm A")} To {moment(selectedEvent[0]?.start_time).format("h:mm A")}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex ml-2">
                                            <div
                                                className="d-flex justify-content-center align-items-center p-1"
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    fontSize: "24px",
                                                    color: "#0783fb",
                                                    background: "#d9edfe",
                                                    borderRadius: "5px",
                                                    margin: "10px",
                                                }}
                                            >
                                                <i className="fa fa-map-marker" ></i>
                                            </div>
                                            <div>
                                                <p className="mt-1 font-weight-bold" style={{ fontSize: "18px" }}>
                                                    {selectedEvent[0]?.eventCity}
                                                    <br />
                                                    <span className="font-weight-normal" style={{ fontSize: "16px" }}>{selectedEvent[0]?.eventStreet}, {selectedEvent[0]?.eventState}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardBody>
                                <Row>
                                    <h3 className="ml-2">Host Information</h3>
                                    <Col md={10} className="ml-2">
                                        <div className="d-flex ml-2">
                                            <div
                                                className="d-flex justify-content-center align-items-center p-1"
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    fontSize: "24px",
                                                    color: "#0783fb",
                                                    background: "#d9edfe",
                                                    borderRadius: "5px",
                                                    margin: "10px",
                                                }}
                                            >
                                                <i className="fa fa-user" ></i>
                                            </div>
                                            <div>
                                                <p className="mt-1 font-weight-bold text-capitalize" style={{ fontSize: "18px" }}>
                                                    {selectedEvent[0]?.hostName}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex ml-2">
                                            <div
                                                className="d-flex justify-content-center align-items-center p-1"
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    fontSize: "24px",
                                                    color: "#0783fb",
                                                    background: "#d9edfe",
                                                    borderRadius: "5px",
                                                    margin: "10px",
                                                }}
                                            >
                                                <i className="fa fa-phone" ></i>
                                            </div>
                                            <div>
                                                <p className="mt-1 font-weight-bold text-capitalize" style={{ fontSize: "18px" }}>
                                                    {selectedEvent[0]?.hostMobileNumber}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex ml-2">
                                            <div
                                                className="d-flex justify-content-center align-items-center p-1"
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    fontSize: "24px",
                                                    color: "#0783fb",
                                                    background: "#d9edfe",
                                                    borderRadius: "5px",
                                                    margin: "10px",
                                                }}
                                            >
                                                <i className="fa fa-envelope-o" ></i>
                                            </div>
                                            <div>
                                                <p className="mt-1 font-weight-bold" style={{ fontSize: "18px" }}>
                                                    {selectedEvent[0]?.hostEmail}
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm={8} md={8} lg={8}>
                        <Card>
                            <CardImg
                                alt="Card image cap"
                                src={selectedEvent[0]?.eventBanner}
                                top
                                width="100%"
                                height="10%"
                                className="eventDetailsImage p-1"
                            />
                            <Col className="ml-1">
                                {/* <h3>Biggest Developer Meetup In The History Of NYC</h3> */}
                                <button className="btn btn-primary">Buy Ticket</button>
                                <div className="mt-2">
                                    <h2>Event Description</h2>
                                </div>
                                <div className="mt-1 mr-1">
                                    <p>{selectedEvent[0]?.notes}</p>
                                </div>
                            </Col>
                        </Card>
                    </Col>
                </Row>
            </div>
            <div className="text-center mt-3 font-weight-bold mapTitle">
                <h1>Find Us Here</h1>
                <div className="dv">
                    <hr />
                </div>
            </div>
            <div className="map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6753.649862266358!2d76.31998407578007!3d32.18199532462287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391b51c788a0bc61%3A0x75e5dd1b8005faa5!2sAlphanzo%20Technology%20Private%20Limited!5e0!3m2!1sen!2sin!4v1655899987388!5m2!1sen!2sin"
                        width="100%"
                        height="500"
                        frameborder="0"
                        allowfullscreen=""
                        aria-hidden="false"
                        tabindex="0" />

            </div>

            <div className="footerText mt-5 mb-5 text-center">
                <i className="fa fa-map-marker"></i>
                <h4>7935 Foster St. <br />Lockport, NY 14094</h4>
            </div>

        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        fetchAllEvents: state.appointmentAndEvent.fetchAllEvents,
    };
};

export default connect(mapStateToProps, { FETCH_EVENTS })(EventPreview);
