import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, CardText, CustomInput } from "reactstrap";
import "react-circular-progressbar/dist/styles.css";
import Breadcrumbs from "../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import "../../../../../assets/scss/pages/finance.scss";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import SidbarTable from "./SidbarTable";
import Sidecontent from "./sidecontent";
import Modalforaddevent from "./Modalforaddevent";
import { APPOINTMENT_CATEGORYLIST, ACTIVE_EVENT } from "../../../../../redux/actions/appointment";
import { connect } from "react-redux";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GET_INVITEES_OF_EVENT,
  GET_REGISTERED_FOR_EVENT,
  GET_ATTENDED_INVITESE,
  EVENT_ID,
  EVENT_FILTER,
  FETCH_EVENTS,
  MANAGE_EVENT_SELECTED_REGISTER_STUDENT,
  FETCH_TEST_LIST
} from "../../../../../redux/actions/test";

const Eventmaneger = (props) => {
  const {
    istoggle,
    FETCH_EVENTS,
    APPOINTMENT_CATEGORYLIST,
    manageEventSelectedRegisterStudent,
    EVENT_FILTER,
    getDataBackOfStudent,
    FETCH_TEST_LIST
  } = props;

  const [iSTest, setisTest] = useState(false);
  const [Id, setId] = useState("");
  const [monthNum, setMonthNum] = useState(moment(new Date()).format("MM-DD-YYYY"));
  const [yearNum, setYearNum] = useState(new Date().getFullYear());
  const [eventtype, setEventType] = useState();
  const [selectedrow, setselectedrow] = useState(props?.fetchAllEvents[0]);


  const handledata = (type, id, item) => {
    props.ACTIVE_EVENT(item)
    if (type.toLowerCase() === "promotion test") {
      setisTest(true);
    } else {
      setisTest(false);
    }
    setId(id);
    setselectedrow(item);
    props.GET_INVITEES_OF_EVENT(id);
    props.GET_REGISTERED_FOR_EVENT(id);
    props.GET_ATTENDED_INVITESE(id);
    props.EVENT_ID(id);
    FETCH_TEST_LIST(id)
  };

  useEffect(() => {
    if (manageEventSelectedRegisterStudent !== null) {
      let { appointment_type, _id } = manageEventSelectedRegisterStudent;
      handledata(appointment_type, _id, manageEventSelectedRegisterStudent);
    }
  }, []);
  useEffect(() => {
    if(Id === "" && props?.fetchAllEvents[0]?._id){
      handledata(props?.fetchAllEvents[0]?.appointment_type,props?.fetchAllEvents[0]?._id,props?.fetchAllEvents[0])
    }
  }, [props?.fetchAllEvents]);


  useEffect(() => {
    if (props?.eventsAndAppointment !== null) {
      if (props?.eventsAndAppointment?.data?.length > 0) {
        let { appointment_type, _id } = props?.eventsAndAppointment?.data[0];
        props.MANAGE_EVENT_SELECTED_REGISTER_STUDENT(
          props?.eventsAndAppointment?.data[0]
        );
        handledata(appointment_type, _id, props?.eventsAndAppointment?.data[0]);
      }
    }
  }, []);

  const handleMonth = (e) => {
    setMonthNum(moment().month(e.target.value).format("MM-DD-YYYY"));
  };
  const handleYear = (e) => {
    setYearNum(e.target.value);
  };
  const handleEventType = (e) => {
    setEventType(e.target.value);
  };
  const hanldeFilter = () => {
    let m = Number(monthNum) + 1;
    let defaultdate = m > 9 ? m : "0" + m;
    let payload = {
      appttype: eventtype,
      startDate: monthNum + "-01-" + yearNum,
      endDate: defaultdate + "-01-" + yearNum,
    };
    EVENT_FILTER(payload);
  };

  useEffect(() => {
    if (props.fetchAllEvents?.length > 0) {
      props.EVENT_ID(props.fetchAllEvents[0]?._id)
      props.ACTIVE_EVENT(props.fetchAllEvents[0])
    }
  }, [props.fetchAllEvents])

  useEffect(() => {
    APPOINTMENT_CATEGORYLIST();
    FETCH_EVENTS(monthNum);
  }, [FETCH_EVENTS, APPOINTMENT_CATEGORYLIST]);
  
  return (
    <div>
      {istoggle === undefined && (
        <Breadcrumbs
          breadCrumbTitle="Event Manager"
          breadCrumbParent="My School"
          breadCrumbActive="Events"
        />
      )}
      <Row>
        <Col md="4">
          <Card className="h-100">
            <CardBody>
              <div className="section-header">
                <div className="d-flex justify-content-end">
                  <div className="d-flex justify-content-end">
                    <div className="d-flex justify-content-between">
                      <CustomInput
                        type="select"
                        id="category"
                        name={"app_event_name"}
                        onChange={handleEventType}
                      >
                        {props.appointmentCategoryList?.map((type) => {
                          return (
                            <option key={type?._id}>
                              {type?.app_event_name}
                            </option>
                          );
                        })}
                      </CustomInput>
                      <CustomInput
                        onChange={handleMonth}
                        type="select"
                        id="Month"
                        className="ml-1"
                      >
                        {months?.map((m, i) => {
                          return <option key={i}>{m}</option>;
                        })}
                      </CustomInput>
                      <CustomInput
                        onChange={handleYear}
                        type="select"
                        id="years"
                        className="ml-1"
                        style={{ width: "4.9em" }}
                      >
                        {years?.map((m, i) => {
                          return <option key={i}>{m}</option>;
                        })}
                      </CustomInput>
                      <button
                        onClick={hanldeFilter}
                        className="custom-inline-btn ml-1"
                      >
                        Filter
                      </button>
                    </div>
                  </div>
                </div>
                <div className="divider" />
              </div>
              <Modalforaddevent />
              <div className="w-100">
                <SidbarTable
                  handledata={handledata}
                  Id={Id}
                  data={props.fetchAllEvents}
                />
              </div>
              <div className="d-flex align-items-center finance-nav cursor-pointer p-1">
                <SettingsIcon
                  style={{
                    fontSize: "2em",
                    color: "#AAAAAA",
                    marginRight: "10px",
                  }}
                />
                <CardText>Setting</CardText>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm={"8"}>
          <Sidecontent
            getDataBackOfStudent={getDataBackOfStudent}
            iSTest={iSTest}
            selectedrow={selectedrow}
            data={props.fetchAllEvents}
          />
        </Col>
      </Row>
      <ToastContainer />

    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    eventsAndAppointment: state.appointmentAndEvent.eventsAndAppointment,
    appointmentCategoryList: state.appointmentAndEvent?.appointmentCategoryList,
    manageEventSelectedRegisterStudent:
      state?.test?.manageEventSelectedRegisterStudent,
    fetchAllEvents: state.appointmentAndEvent.fetchAllEvents,
  };
};
export default connect(mapStateToProps, {
  MANAGE_EVENT_SELECTED_REGISTER_STUDENT,
  FETCH_EVENTS,
  APPOINTMENT_CATEGORYLIST,
  GET_INVITEES_OF_EVENT,
  GET_REGISTERED_FOR_EVENT,
  GET_ATTENDED_INVITESE,
  EVENT_ID,
  EVENT_FILTER,
  ACTIVE_EVENT,
  FETCH_TEST_LIST
})(Eventmaneger);
const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
const months = [
  "This month",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
