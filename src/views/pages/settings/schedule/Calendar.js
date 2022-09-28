import React from "react";
import AddEventSidebar from "./AddEventSidebar";
import calendarToolbar from "./calendarToolbar";
import { Card, CardBody } from "reactstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import { toast } from "react-toastify"
import { connect } from "react-redux";
import {
  fetchEvents,
  handleSidebar,
  addEvent,
  handleSelectedEvent,
  updateEvent,
  updateDrag,
  updateResize,
  IS_LOADING,
  UPDATE_CLASS_SCHEDULE
} from "../../../../redux/actions/calendar";
import MuiChip from '@material-ui/core/Chip'
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../../../assets/scss/plugins/calendars/react-big-calendar.scss";
import "./index.css"


const toastCSS = () => {
  return {
    position: "top-center",
    autoClose: 3000,
    icon: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }
}

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);
const eventColors = {
  business: "bg-success",
  work: "bg-warning",
  personal: "bg-danger",
  others: "bg-primary",
};
function hexToRGB(hex, alpha) {
  var r = parseInt(hex?.slice(1, 3), 16),
    g = parseInt(hex?.slice(3, 5), 16),
    b = parseInt(hex?.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}
class CalendarApp extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.app.events?.length !== state.events ||
      props.app.sidebar !== state.sidebar ||
      props.app.selectedEvent !== state.eventInfo
    ) {
      let dateToObj = props.app.events.map((event) => {
        let startTimeH = null
        let startTimeM = null

        let endTimeH = null
        let endTimeM = null
        if (moment(event?.start_time)?._isValid) {
          startTimeH = new Date(event?.start_time).getHours()
          startTimeM = new Date(event?.start_time).getMinutes()

          endTimeH = new Date(event?.end_time).getHours()
          endTimeM = new Date(event?.end_time).getMinutes()
        } else {
          startTimeH = event?.start_time.split(':')[0]
          startTimeM = event?.start_time.split(':')[1]

          endTimeH = event?.end_time.split(':')[0]
          endTimeM = event?.end_time.split(':')[1]
        }
        event.start = new Date(moment(event.start_date).set({ hour: Number(startTimeH), minute: Number(startTimeM) })?._d)//new Date(event.start_time);
        event.end = new Date(moment(event.end_date).set({ hour: Number(endTimeH), minute: Number(endTimeM) })?._d)// new Date(event.end_time);
        event.title = event.class_name;
        return event;
      });

      return {
        events: dateToObj,
        sidebar: props.app.sidebar,
        eventInfo: props.app.selectedEvent,
      };
    }
    // Return null if the state hasn't changed
    return null;
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
      selectedEvent: null,
    };
  }

  async componentDidMount() {
    await this.props.fetchEvents();
  }


  handleEventColors = (event) => {
    let style = {
      fontWeight: 'bold',
      borderRadius: '4px',
      paddingTop: '0.2em',
      border: 0,
      borderLeft: `0.2em solid ${event.program_color}`,
      color: event.program_color,
      backgroundColor: hexToRGB(event.program_color, 0.16),
    }

    return {
      style: style,
      className: eventColors[event.label]
    };
  };

  resizeEvent = ({ event, start, end }) => {
    const { events } = this.state
    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents
    })

    this.props.updateResize({ ...event, start, end })
  }

  handleSelectEvent = (event) => {
    this.props.handleSidebar(true);
    this.props.handleSelectedEvent(event);
    this.setState({
      ...this.state,
      eventInfo: event,
      selectedEvent: event,
    });
  };
  render() {
    const { events, views, sidebar } = this.state;
    return (
      <React.Fragment>
        <div className="app-calendar position-relative"
          style={{ overflow: "hidden" }}>
          <div
            className={`app-content-overlay ${sidebar ? "show" : "hidden"}`}
            onClick={() => {
              this.props.handleSidebar(false);
              this.props.handleSelectedEvent(null);
            }}
          />
          <Card>
            <CardBody className={this.props.app.isloading ? 'filtering' : null}>
              <DragAndDropCalendar
                localizer={localizer}
                events={events}
                resizable={true}
                startAccessor="start"
                endAccessor="end"
                resourceAccessor="url"
                views={views}
                components={{ toolbar: calendarToolbar }}
                eventPropGetter={this.handleEventColors}
                popup={true}
                loading={true}
                style={{ height: 500 }}
                onSelectEvent={(event) => {
                  this.handleSelectEvent(event);
                }}
                onSelectSlot={({ start, end }) => {
                  let checkRightDate = moment(start).format("YYYY/MM/DD") >= (moment(new Date()).format("YYYY/MM/DD"))
                  if (checkRightDate) {
                    this.props.handleSidebar(true);
                    this.props.handleSelectedEvent({
                      title: "",
                      label: null,
                      start: new Date(start),
                      end: new Date(end),
                      url: "",
                    });
                  } else {
                    toast.info('Sorry!!! Please select a valid date to add your EVENT.', toastCSS());
                  }

                }}
                selectable={true}
                messages={{
                  showMore: (total) => (
                    <MuiChip
                      size='small'
                      color='primary'
                      label={`+${total} more`}
                      style={{
                        cursor: 'pointer',
                        background: '#40a7e1',
                        color: '#fff',
                        height: '1.2rem'
                      }}
                      onMouseOver={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }} />

                  ),
                }}
              />
            </CardBody>
          </Card>
          {this.props.handleSidebar && (
            <AddEventSidebar
              sidebar={sidebar}
              handleSidebar={this.props.handleSidebar}
              addEvent={this.props.addEvent}
              events={this.state.events}
              eventInfo={this.state.eventInfo}
              selectedEvent={this.props.handleSelectedEvent}
              updateEvent={this.props.updateEvent}
              event={this.state.selectedEvent}
              resizable
            />
          )}
        </div>
      </React.Fragment >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    app: state.calendar,
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
  UPDATE_CLASS_SCHEDULE,
  IS_LOADING
})(CalendarApp);
