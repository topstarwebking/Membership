import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { ChevronLeft, ChevronRight } from "react-feather";
import AddEventOrAppointment from "./AddEventAppoinment";
import { FETCH_EVENTS_OR_APPOINMENT } from "../../../../redux/actions/appointment";
import moment from "moment";
import { connect } from "react-redux";

const CalendarToolbar = (props) => {
  const preMonth = props.label.split(' ')[0]
  const [activeYear, setActiveYear] = useState(new Date().getFullYear())
  const [activeMonth, setActiveMonth] = useState('')
  const [getdataByDate, setGetDataByDate] = useState('')
  // let date = moment('01, ' + props.label).format('MM-DD-YYYY')

  useEffect(() => {
    const month = moment(props.label).format('MMMM')
    const year =moment(props.label).format('YYYY')
    setActiveMonth(month)
    setActiveYear(year)
    if (props?.view === 'day') {
      setActiveMonth(moment(props.label).format('MMMM'))
    } 
    const date = moment(`01, ${month} ${year}`).format('MM-DD-YYYY')
    setGetDataByDate(date)
    localStorage.setItem('appointmentActivedate', date)
    try {
      if (getdataByDate !== date) {
        props.FETCH_EVENTS_OR_APPOINMENT()
      }
    } catch (error) {
      console.log(error)
    }

  }, [props.label, props.view])

  // api/add_appointment/
  // api/add_appointment/v2


  return (
    <div className="calendar-header mb-2 d-flex justify-content-between flex-wrap">
      <AddEventOrAppointment />
      <div className="text-center view-options mt-1 mt-sm-0 ml-lg-5 ml-0">
        <ButtonGroup>
          <button
            className={`btn ${props.view === "month"
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
            className={`btn ${props.view === "week"
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
            className={`btn ${props.view === "day"
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
      <div className="month-label d-flex flex-column text-center text-md-right mt-1 mt-md-0">
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

export default connect(null, {
  FETCH_EVENTS_OR_APPOINMENT,
})(CalendarToolbar);
