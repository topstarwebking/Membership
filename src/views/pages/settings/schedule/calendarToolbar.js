import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { ChevronLeft, ChevronRight } from "react-feather";
import AddEventButton from "./AddEventButton";
import { fetchEvents, IS_LOADING } from "../../../../redux/actions/calendar/index";
import moment from "moment";
import { connect } from "react-redux";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../../../assets/scss/plugins/calendars/react-big-calendar.scss";

const CalendarToolbar = (props) => {
  const preMonth = props.label.split(' ')[0]
  const [activeYear, setActiveYear] = useState('')
  const [activeMonth, setActiveMonth] = useState('')
  const [getdataByDate, setGetDataByDate] = useState('')
  // let date = moment('01, ' + props.label).format('MM-DD-YYYY')
  const fetchdata = async () => {
    let weekdate = moment(`01, ${preMonth} ${activeYear}`).format('MM-DD-YYYY')
    if (props?.view === 'day') {
      let getmonth = moment(`${props?.label} ${activeYear}`).format('MMMM')
      weekdate = moment(`01, ${getmonth} ${activeYear}`).format('MM-DD-YYYY')
      await setActiveMonth(getmonth)
    }
    try {
      if (activeMonth === '') {
        await setActiveMonth(moment(props.label).format('MMMM'))
        await setActiveYear(moment(props.label).format('YYYY'))
      }
      if (getdataByDate !== weekdate) {
        await setGetDataByDate(weekdate)
        await localStorage.setItem('appointmentActivedate', weekdate)
        const istrue = await props.fetchEvents()
        if (istrue) {
            props.IS_LOADING(false)
        }
      }
      await setActiveMonth(moment(props.label).format('MMMM'))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchdata()
  }, [props.label])

  const handlechangemonth = () => {
    props.IS_LOADING(true)
  }
  return (
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
              handlechangemonth()
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
              handlechangemonth()
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
              props.onView("day")
              handlechangemonth()
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
            onClick={() => {
              props.onNavigate("PREV")
              handlechangemonth()
            }}
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
            onClick={() => {
              props.onNavigate("NEXT")
              handlechangemonth()
            }}
          >
            <ChevronRight size={15} />
          </Button.Ripple>
        </div>
      </div>
    </div >
  );
};
const mapStateToProps = (state) => {
  return {
    app: state.calendar,

  }
}
export default connect(mapStateToProps, {
  fetchEvents, IS_LOADING
})(CalendarToolbar);
