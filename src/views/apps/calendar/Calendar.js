import React from "react";
import AddEventSidebar from "./AddEventSidebar";
// import AddEventButton from "./AddEventButton";
import { Card, CardBody, Row, Col } from "reactstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import { connect } from "react-redux";
// import Tablesidebar from "./tablesidebar";
import {
  fetchEvents,
  handleSidebar,
  addEvent,
  handleSelectedEvent,
  updateEvent,
  updateDrag,
  updateResize,
  FETCH_CLASS_STUDENTS,
} from "../../../redux/actions/calendar/index";
import "react-toastify/dist/ReactToastify.css";
// import { ChevronLeft, ChevronRight } from "react-feather";
import MuiChip from "@material-ui/core/Chip";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../../assets/scss/plugins/calendars/react-big-calendar.scss";
import BreadCrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import CalendarToolbar from "./calendarToolbar";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);
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

// const Toolbar = (props) => {
//   return (
//     <div>
//        <div className="mb-3 d-flex justify-content-end">
//        <Tablesidebar />
//         <AddEventButton />
//       </div>
//     <div className="calendar-header mb-2 d-flex justify-content-between align-items-center flex-wrap">
//       <div className="text-center view-options mt-1 mt-sm-0 ml-0">
//         <ButtonGroup>
//           <button
//             className={`btn ${
//               props.view === "month"
//                 ? "btn-primary"
//                 : "btn-outline-primary text-primary"
//             }`}
//             onClick={() => {
//               props.onView("month");
//             }}
//           >
//             Month
//           </button>
//           <button
//             className={`btn ${
//               props.view === "week"
//                 ? "btn-primary"
//                 : "btn-outline-primary text-primary"
//             }`}
//             onClick={() => {
//               props.onView("week");
//             }}
//           >
//             Week
//           </button>
//           <button
//             className={`btn ${
//               props.view === "day"
//                 ? "btn-primary"
//                 : "btn-outline-primary text-primary"
//             }`}
//             onClick={() => {
//               props.onView("day");
//             }}
//           >
//             Day
//           </button>
//         </ButtonGroup>
//       </div>
//       <div className="month-label d-flex flex-column text-center text-md-right mt-1 mt-md-0">
//         <div className="calendar-navigation">
//           <Button.Ripple
//             className="btn-icon rounded-circle"
//             size="sm"
//             color="primary"
//             onClick={() => props.onNavigate("PREV")}
//           >
//             <ChevronLeft size={15} />
//           </Button.Ripple>
//           <div className="month d-inline-block mx-75 text-bold-500 font-medium-2 align-middle">
//             {props.label}
//           </div>
//           <Button.Ripple
//             className="btn-icon rounded-circle"
//             size="sm"
//             color="primary"
//             onClick={() => props.onNavigate("NEXT")}
//           >
//             <ChevronRight size={15} />
//           </Button.Ripple>
//         </div>
//         {/* <div className="event-tags d-none d-sm-flex justify-content-end mt-1">
//           <div className="tag mr-1">
//             <span className="bullet bullet-success bullet-sm mr-50"></span>
//             <span>Business</span>
//           </div>
//           <div className="tag mr-1">
//             <span className="bullet bullet-warning bullet-sm mr-50"></span>
//             <span>Work</span>
//           </div>
//           <div className="tag mr-1">
//             <span className="bullet bullet-danger bullet-sm mr-50"></span>
//             <span>Personal</span>
//           </div>
//           <div className="tag">
//             <span className="bullet bullet-primary bullet-sm mr-50"></span>
//             <span>Others</span>
//           </div>
//         </div> */}
//       </div>
//     </div>
//     </div>
//   );
// };

class CalendarApp extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props?.app?.events !== undefined) {
      if (
        props?.app?.events?.length !== state.events ||
        props.app.sidebar !== state.sidebar ||
        props.app.selectedEvent !== state.eventInfo
      ) {
        let dateToObj = props.app.events?.map((event) => {
          let startTimeH = null;
          let startTimeM = null;

          let endTimeH = null;
          let endTimeM = null;
          if (moment(event?.start_time)?._isValid) {
            startTimeH = moment(event?.start_time)?.format("HH");
            startTimeM = moment(event?.start_time)?.format("MM");

            endTimeH = moment(event?.end_time)?.format("HH");
            endTimeM = moment(event?.end_time)?.format("MM");
          } else {
            startTimeH = event?.start_time.split(":")[0];
            startTimeM = event?.start_time.split(":")[1];

            endTimeH = event?.end_time.split(":")[0];
            endTimeM = event?.end_time.split(":")[1];
          }

          event.start = new Date(
            moment(event.start_date).set({
              hour: Number(startTimeH),
              minute: Number(startTimeM),
            })?._d
          );
          event.title = event.class_name;
          event.end = new Date(
            moment(event.end_date).set({
              hour: Number(endTimeH),
              minute: Number(endTimeH),
            })?._d
          );
          return event;
        }
        );
        return {
          events: dateToObj,
          sidebar: props.app.sidebar,
          eventInfo: props.app.selectedEvent,
        };
      }
      return null;
    }

  }
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      views: {
        month: true,
        week: true,
        day: true,
      },
      eventInfo: null,
    };
  }

  async componentDidMount() {
    await this.props.fetchEvents();
  }

  handleEventColors = (event) => {
    var style = {
      // marginTop: '0.4em',
      fontWeight: "bold",
      borderRadius: "6px",
      // height: '2em',
      paddingTop: "0.2em",
      borderLeft: `0.2em solid ${event.program_color}`,
      color: event.program_color,
      backgroundColor: hexToRGB(event.program_color, 0.16),
    };

    return {
      style: style,
      className: eventColors[event.label],
    };
  };

  moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    const { events } = this.state;
    const idx = events.indexOf(event);
    let allDay = event.allDay;
    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }
    const updatedEvent = { ...event, start, end, allDay };
    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);
    this.setState({
      events: nextEvents,
    });
    this.props.updateDrag(updatedEvent);
  };
  resizeEvent = ({ event, start, end }) => {
    const { events } = this.state;
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
    this.setState({
      events: nextEvents,
    });
    this.props.updateResize({ ...event, start, end });
  };
  handleSelectEvent = (event) => {
    this.props.handleSidebar(true);
    this.props.handleSelectedEvent(event);
    this.props.FETCH_CLASS_STUDENTS(event._id);
    let _event = event
    _event.start_time = new Date()
    this.setState({
      eventInfo: _event,
    });
  };
  render() {
    const { events, views, sidebar } = this.state;
    return (
      <div className="app-calendar position-relative">
        <BreadCrumbs
          breadCrumbTitle={
            window.location.pathname === "/calendar"
              ? "Attendance"
              : "Self Check In"
          }
          breadCrumbParent="Calendar"
          breadCrumbActive={
            window.location.pathname === "/calendar"
              ? "Attendance"
              : "Self Check In"
          }
        />
        <div
          className={`app-content-overlay ${sidebar ? "show" : "hidden"}`}
          onClick={() => {
            this.props.handleSidebar(false);
            this.props.handleSelectedEvent("");
          }}
        ></div>

        <Row>
          <Col md="12" lg="12" sm="12">
            <Card>
              <CardBody>
                <DragAndDropCalendar
                  localizer={localizer}
                  events={this.props?.eventsList || []}
                  resizable
                  startAccessor="start"
                  endAccessor="end"
                  resourceAccessor="url"
                  views={views}
                  components={{ toolbar: CalendarToolbar }}
                  eventPropGetter={this.handleEventColors}
                  popup={true}
                  style={{ height: 732 }}
                  onSelectEvent={(event) => {
                    this.handleSelectEvent(event);
                  }}
                  selectable={true}
                  messages={{
                    showMore: (total) => (
                      <MuiChip
                        size="small"
                        color="primary"
                        label={`+${total} more`}
                        style={{
                          cursor: "pointer",
                          background: "#40a7e1",
                          color: "#fff",
                          height: "1.4rem",
                        }}
                        onMouseOver={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                      />
                    ),
                  }}
                />
              </CardBody>
            </Card>
          </Col>
          {/* <Col md={"5"} lg="5" sm="12">
            <Tablesidebar />
          </Col> */}
        </Row>
        {this.props?.handleSidebar && (
          <AddEventSidebar
            sidebar={sidebar}
            handleSidebar={this.props.handleSidebar}
            addEvent={this.props.addEvent}
            events={this.state.events}
            eventInfo={this.state.eventInfo}
            selectedEvent={this.props.handleSelectedEvent}
            updateEvent={this.props.updateEvent}
            resizable
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    app: state.calendar,
    eventsList: state.calendar.events,
  };
};

export default connect(mapStateToProps, {
  fetchEvents,
  handleSidebar,
  addEvent,
  handleSelectedEvent,
  updateEvent,
  updateDrag,
  updateResize,
  FETCH_CLASS_STUDENTS,
})(CalendarApp);