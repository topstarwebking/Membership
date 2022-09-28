import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { ChevronLeft, ChevronRight } from "react-feather";
import AddEventButton from "./AddEventButton";
import {  fetchEvents } from "../../../redux/actions/calendar/index";
import moment from "moment";
import { connect } from "react-redux";
import Tablesidebar from "./tablesidebar";


const CalendarToolbar = (props) => {
  const preMonth = props.label.split(' ')[0]
  const [activeYear, setActiveYear] = useState('')
  const [activeMonth, setActiveMonth] = useState('')
  const [getdataByDate, setGetDataByDate] = useState('')
  // let date = moment('01, ' + props.label).format('MM-DD-YYYY')

  useEffect(() => {
    let weekdate = moment(`01, ${preMonth} ${activeYear}`).format('MM-DD-YYYY')
    if (props?.view === 'day') {
      let getmonth = moment(`${props?.label} ${activeYear}`).format('MMMM')
      weekdate = moment(`01, ${getmonth} ${activeYear}`).format('MM-DD-YYYY')
      setActiveMonth(getmonth)
    }
    try {
      if (activeMonth === '') {
        setActiveMonth(moment(props.label).format('MMMM'))
        setActiveYear(moment(props.label).format('YYYY'))
      }
      if (getdataByDate !== weekdate) {
        setGetDataByDate(weekdate)
        localStorage.setItem('appointmentActivedate', weekdate)
        props.fetchEvents()
      }
      setActiveMonth(moment(props.label).format('MMMM'))
    } catch (error) {
      console.log(error)
    }

  }, [props.label])

  return (
    <div>
       <div className="mb-3 d-flex justify-content-end">
       <Tablesidebar />
        <AddEventButton />
      </div>
    <div className="calendar-header mb-2 d-flex justify-content-between flex-wrap">
      <AddEventButton />
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
    </div>
  );
};

export default connect(null, {
    fetchEvents,
})(CalendarToolbar);
