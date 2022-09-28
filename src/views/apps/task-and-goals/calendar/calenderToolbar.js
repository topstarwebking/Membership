import React from "react";
import { Button, ButtonGroup } from "reactstrap";
import { ChevronLeft, ChevronRight } from "react-feather";

const CalendarToolbar = (props) => {

  return (
    <div className="calendar-header mb-2 d-flex justify-content-between flex-wrap">
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

export default CalendarToolbar;