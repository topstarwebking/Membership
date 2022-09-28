import React, { useEffect, useState } from "react";
import { CardContent } from "@material-ui/core";
import moment from "moment";
import { Card, Row, Col } from "reactstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "../../../assets/scss/plugins/calendars/react-big-calendar.scss";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import CalendarToolbar from "./component/calendarToolbar";
import ListOfEventAndAppointment from "./component/ListappointmentEvent";
import {
  FETCH_EVENTS_OR_APPOINMENT,
  GET_APPOINTMENT_BY_CETEGORY,
  FILTER_FOR_APPONMNET,
  APPOINTMENT_CATEGORYLIST,
} from "../../../redux/actions/appointment";
import { connect } from "react-redux";
import DrawerEventAppoinment from "./component/drawerEventAppoinment";
import BreadCrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import Spinner from "../../../components/@vuexy/spinner/Fallback-spinner";
import { GET_ALL_TYPE_STUDENT } from "../../../redux/actions/member";

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

const AppoinmentAndEvent = (props) => {
  const localizer = momentLocalizer(moment);
  const [actionOnEvent, setActionOnEvent] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [dataAfterFormate, setDataAfterFormate] = useState([]);
  const {
    GET_APPOINTMENT_BY_CETEGORY,
    FETCH_EVENTS_OR_APPOINMENT,
    FILTER_FOR_APPONMNET,
    eventsAndAppointment,
    GET_ALL_TYPE_STUDENT,
    APPOINTMENT_CATEGORYLIST,
  } = props;
  const [open, setOpen] = useState(false);
  const handleCloseOpen = () => {
    setOpen(!open);
    if (isEdit) {
      setIsEdit(!isEdit);
    }
  };
  const handleCloseOpen2 = (editItem) => {
    setIsEdit(!isEdit);
    setOpen(!open);
    setActionOnEvent(editItem);
  };

  const handleEventColors = (event) => {
    let style = {
      fontWeight: "bold",
      borderRadius: "8px",
      paddingTop: "0.2em",
      border: 0,
      color: event?.app_color || "#40a7e1",
      backgroundColor: hexToRGB(event?.app_color || "#40a7e1", 0.16),
    };
    return {
      style: style,
      className: eventColors[event.title],
    };
  };

  const handleSelectEvent = (event) => {
    setActionOnEvent(event);
    setOpen(!open);
    setIsEdit(!isEdit);
  };

  const selectSlot = (dates) => {
    setActionOnEvent(dates);
    setOpen(!open);
  };

  useEffect(() => {
    GET_ALL_TYPE_STUDENT();
    APPOINTMENT_CATEGORYLIST();
    FETCH_EVENTS_OR_APPOINMENT();
    APPOINTMENT_CATEGORYLIST();
  }, [
    APPOINTMENT_CATEGORYLIST,
    FETCH_EVENTS_OR_APPOINMENT,
    GET_ALL_TYPE_STUDENT,
  ]);

  const formatEventList = async () => {
    let formated = eventsAndAppointment?.data?.map((event) => {
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
        moment(event.start).set({
          hour: Number(startTimeH),
          minute: Number(startTimeM),
        })?._d
      );
      event.end = new Date(
        moment(event.end).set({
          hour: Number(endTimeH),
          minute: Number(endTimeM),
        })?._d
      );
      return event;
    });
    await setDataAfterFormate(formated);
  };
  useEffect(() => {
    if (eventsAndAppointment?.data !== undefined) {
      formatEventList();
    }
  }, [eventsAndAppointment]);

  if (props?.eventsAndAppointment === null) {
    return <Spinner />;
  }
  return (
    <div>
      <BreadCrumbs
        breadCrumbTitle="Events"
        breadCrumbParent="Calendar"
        breadCrumbActive="Events"
      />
      <Row>
        <Col sm="12" md="8" lg="8">
          <Card>
            <CardContent>
              <DragAndDropCalendar
                localizer={localizer}
                events={dataAfterFormate}
                startAccessor="start"
                endAccessor="end"
                resourceAccessor="url"
                views={{
                  month: true,
                  week: true,
                  day: true,
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
            </CardContent>
          </Card>
        </Col>
        <Col sm="12" lg="4" md="4">
          <Card style={{ height: "96%" }}>
            <ListOfEventAndAppointment
              gobackdata={GET_APPOINTMENT_BY_CETEGORY}
              filterbydata={FILTER_FOR_APPONMNET}
              handleCloseOpen={handleCloseOpen2}
              isEdit={isEdit}
            />
          </Card>
        </Col>
      </Row>
      <DrawerEventAppoinment
        actionOnEvent={actionOnEvent}
        handleCloseOpen={handleCloseOpen}
        open={open}
        isEdit={isEdit}
        perpage={0}
        perrows={10}
        cetogary={"event"}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    appointmentCategoryList: state.appointmentAndEvent.appointmentCategoryList,
    eventsAndAppointment: state.appointmentAndEvent.eventsAndAppointment,
  };
};

export default connect(mapStateToProps, {
  GET_APPOINTMENT_BY_CETEGORY,
  FETCH_EVENTS_OR_APPOINMENT,
  FILTER_FOR_APPONMNET,
  GET_ALL_TYPE_STUDENT,
  APPOINTMENT_CATEGORYLIST,
})(AppoinmentAndEvent);
