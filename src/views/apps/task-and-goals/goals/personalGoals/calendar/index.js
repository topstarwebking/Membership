import React from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarToolbar from "./calenderToolbar";
import './index.scss'

const DragAndDropCalendar = withDragAndDrop(Calendar);

const eventColors = {
    business: "bg-success",
    work: "bg-warning",
    personal: "bg-danger",
    others: "bg-primary",
};
function hexToRGB(hex, alpha) {
    try {
        var r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);

        if (alpha) {
            return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
        } else {
            return "rgb(" + r + ", " + g + ", " + b + ")";
        }
    } catch (error) {
        return hex;
    }
}

const SubGoalsCalender = (props) => {
    const localizer = momentLocalizer(moment);

    const handleEventColors = (event) => {
        let style = {
            fontWeight: "bold",
            borderRadius: "8px",
            paddingTop: "0.2em",
            borderRadius: 4,
            border: 0,
            marginTop: '-10px',
            height: '100%',
            color: props?.item?.color || "#40a7e1",
            backgroundColor: hexToRGB(props?.item?.color || "#40a7e1", 0.16),
        };
        return {
            style: style,
            className: eventColors[event.title],
        };
    };

    const handleSelectEvent = (event) => {
        // setOpen(!open);
    };

    const selectSlot = (dates) => {
    };

    return (
        <div id="goals-calendar">
            <DragAndDropCalendar
                localizer={localizer}
                events={props?.item?.subGoals}
                startAccessor="start"
                endAccessor="end"
                resourceAccessor="url"
                views={{
                    month: true,
                    // week: true,
                    // day: true,
                }}
                components={{ toolbar: CalendarToolbar }}
                eventPropGetter={handleEventColors}
                popup={true}
                onSelectEvent={(event) => {
                    handleSelectEvent(event);
                }}
                onSelectSlot={({ start, end }) => {
                    selectSlot({
                        start: new Date(start),
                        end: new Date(end),
                    });
                }}
                selectable={true}

            />
        </div>
    );
};
export default SubGoalsCalender
