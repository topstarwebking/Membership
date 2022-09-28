import React, { useEffect, useState } from "react";
import { ButtonGroup, Button } from "reactstrap";
import { ChevronLeft, ChevronRight } from "react-feather";
import moment from "moment";
import { connect } from "react-redux";
import {
  FETCH_EVENTS_OR_APPOINMENT,
  UPDATE_APPOINTMENT,
} from "../../../../redux/actions/appointment";
import {
  ADD_INVITE_FOR_EVNET,
  MANAGE_EVENT_MODAL_OPEN_REGISTER_STUDENT,
  MANAGE_REGISTER_MODAL_OPEN_REGISTER_STUDENT,
} from "../../../../redux/actions/test";
const CalendarToolbar = (props) => {
  const preMonth = props.label.split(" ")[0];
  const [activeYear, setActiveYear] = useState("");
  const [activeMonth, setActiveMonth] = useState("");
  const [getdataByDate, setGetDataByDate] = useState("");

  useEffect(() => {
    let weekdate = moment(`01, ${preMonth} ${activeYear}`).format("MM-DD-YYYY");
    if (props?.view === "day") {
      let getmonth = moment(`${props?.label} ${activeYear}`).format("MMMM");
      weekdate = moment(`01, ${getmonth} ${activeYear}`).format("MM-DD-YYYY");
      setActiveMonth(getmonth);
    }
    try {
      if (activeMonth === "") {
        setActiveMonth(moment(props.label).format("MMMM"));
        setActiveYear(moment(props.label).format("YYYY"));
      }
      if (getdataByDate !== weekdate) {
        setGetDataByDate(weekdate);
        localStorage.setItem("appointmentActivedate", weekdate);
        props.FETCH_EVENTS_OR_APPOINMENT();
      }
      setActiveMonth(moment(props.label).format("MMMM"));
    } catch (error) {
      console.log(error);
    }
  }, [props.label]);

  return (
    <div className="calendar-header mb-2 d-flex justify-content-between flex-wrap">
      <div>
        <ButtonGroup>
          <button
            className={`btn ${
              props.view === "month"
                ? "btn-primary"
                : "btn-outline-primary text-primary"
            }`}
            onClick={() => {
              props.onView("month");
            }}
          >
            Month
          </button>
          <button
            className={`btn ${
              props.view === "week"
                ? "btn-primary"
                : "btn-outline-primary text-primary"
            }`}
            onClick={() => {
              props.onView("week");
            }}
          >
            Week
          </button>
          <button
            className={`btn ${
              props.view === "day"
                ? "btn-primary"
                : "btn-outline-primary text-primary"
            }`}
            onClick={() => {
              props.onView("day");
            }}
          >
            Day
          </button>
        </ButtonGroup>
      </div>
      <div
        className="month-label d-flex text-center text-md-center"
        style={{ padding: "0.5em" }}
      >
        <div className="calendar-navigation">
          <Button.Ripple
            className="btn-icon rounded-circle"
            size="sm"
            color="primary"
            onClick={() => props.onNavigate("PREV")}
          >
            <ChevronLeft size={15} />
          </Button.Ripple>
          <div className="month d-inline-block mx-75 text-bold-500 font-medium-2 align-middle">
            {props.label}
          </div>
          <Button.Ripple
            className="btn-icon rounded-circle"
            size="sm"
            color="primary"
            onClick={() => props.onNavigate("NEXT")}
          >
            <ChevronRight size={15} />
          </Button.Ripple>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    handleaddtoevent: state.test.handleaddtoevent,
    getSelectedTestToRecommand: state.test.getSelectedTestToRecommand,
    activeEvent: state.appointmentAndEvent.activeEvent,
  };
};
export default connect(mapStateToProps, {
  FETCH_EVENTS_OR_APPOINMENT,
  MANAGE_EVENT_MODAL_OPEN_REGISTER_STUDENT,
  MANAGE_REGISTER_MODAL_OPEN_REGISTER_STUDENT,
  UPDATE_APPOINTMENT,
  ADD_INVITE_FOR_EVNET,
})(CalendarToolbar);
