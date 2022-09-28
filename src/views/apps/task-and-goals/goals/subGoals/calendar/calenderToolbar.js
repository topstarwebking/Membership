import React from "react";
import { Button, ButtonGroup } from "reactstrap";
import { ChevronLeft, ChevronRight } from "react-feather";

const CalendarToolbar = (props) => {

  return (
    <div className="d-flex justify-content-start align-items-center mb-1">
      <Button.Ripple
        className="text-gray btn-icon rounded-circle"
        size="sm"
        // color="primary"
        onClick={() => props.onNavigate("PREV")}
      >
        <ChevronLeft size={24} color="#4F4F4F" />
      </Button.Ripple>
      <div style={{ color: '#4F4F4F' }}>
        {props.label}
      </div>
      <Button.Ripple
        className="text-gray btn-icon rounded-circle"
        size="sm"
        // color="primary"
        onClick={() => props.onNavigate("NEXT")}
      >
        <ChevronRight size={24} color="#4F4F4F" />
      </Button.Ripple>
    </div>
  );
};

export default CalendarToolbar;