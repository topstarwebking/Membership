import { Button } from "reactstrap";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import { Button as Buttonmui, Chip } from "@material-ui/core";
import Eventmaneger from "../../../pages/mySchool/Testing/Eligible/Eventmaneger";
import {
  Add_TEST_DATA,
  SELECTED_TEST_DATA,
  SELECT_STUDENT_FOR_TEST_OR_RECOMAND,
  HandleEventButton,
  MANAGE_EVENT_MODAL_OPEN_REGISTER_STUDENT,
  MANAGE_REGISTER_MODAL_OPEN_REGISTER_STUDENT,
  MANAGE_EVENT_SELECTED_REGISTER_STUDENT,
  ADD_INVITE_FOR_EVNET,
} from "../../../../redux/actions/test/index";
import { X } from "react-feather";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import { GET_PROGRAM_LIST } from "../../../../redux/actions/programe/index";
import { connect } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import CalendarToolbar from "./calendarToolbar";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import moment from "moment";
import BreadCrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import {
  FETCH_EVENTS_OR_APPOINMENT,
  ACTIVE_EVENT,
} from "../../../../redux/actions/appointment";
import ConfirmationModal from "../../../../components/gloabal/confirmation";
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
 
} from "reactstrap";

const DragAndDropCalendar = withDragAndDrop(Calendar);
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
const eventColors = {
  business: "bg-success",
  work: "bg-warning",
  personal: "bg-danger",
  others: "bg-primary",
};

const TestModal = (props) => {
  const localizer = momentLocalizer(moment);
  const {
    eventsAndAppointment,
    FETCH_EVENTS_OR_APPOINMENT,
    MANAGE_EVENT_MODAL_OPEN_REGISTER_STUDENT,
    getSelectedTestToRecommand,
    manageEventModalOpenRegisterStudent,
    MANAGE_REGISTER_MODAL_OPEN_REGISTER_STUDENT,
    MANAGE_EVENT_SELECTED_REGISTER_STUDENT,
    getDataBack
  } = props;
  const [dataAfterFormate, setDataAfterFormate] = useState([]);
  const [defaultAlert, setdefaultAlert] = useState(false);
  const [modal, setModal] = useState(false);

  const confirmAddCandidate = () => {
    props.HandleEventButton(true);
  };
  const Handleregister = async () => {
    if (
      props.activeEvent.appointment_type?.toLowerCase() === "promotion test"
    ) {
      let data = props.activeEvent;
      let list = [];
      // console.log(props.getSelectedTestToRecommand)
      for (let i of props.getSelectedTestToRecommand) {
        delete i.isInvitee;
        list.push(i);
      }
      data.studentInfo = props.getSelectedTestToRecommand;
      await props.Add_TEST_DATA(list, props.activeEvent?._id);
      await setdefaultAlert(false);
      MANAGE_EVENT_MODAL_OPEN_REGISTER_STUDENT(false);
      MANAGE_REGISTER_MODAL_OPEN_REGISTER_STUDENT(true);
      props.clearSelect()
    } else {
      const list = [];
      for (let i of props.getSelectedTestToRecommand) {
        let item = {
          studentId: i?.studentId,
          firstName: i?.firstName,
          lastName: i?.lastName,
          memberprofileImage: i?.memberprofileImage,
          primaryPhone: i?.primaryPhone,
          isInvitee: i?.isInvitee,
          program: i.program,
          current_rank_img: i?.current_rank_img || "no data",
          next_rank_img: i?.next_rank_img || "no data",
          next_rank_name: i?.next_rank_name || "no data",
          current_rank_name: i?.current_rank_name || "no data",
        };
        list.push(item);
      }
      await props.ADD_INVITE_FOR_EVNET(list, props.activeEvent?._id);
      await setdefaultAlert(false);
      MANAGE_EVENT_MODAL_OPEN_REGISTER_STUDENT(false);
      MANAGE_REGISTER_MODAL_OPEN_REGISTER_STUDENT(true);
      props.clearSelect()
    }
    props.clearSelect()

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

  useEffect(() => {
    FETCH_EVENTS_OR_APPOINMENT();
  }, [FETCH_EVENTS_OR_APPOINMENT]);

  const toggleModal = () => {
    setModal(!modal)
  };
  return (
    <>
      <Button
        className="btn-lg fides3 btn waves-effect waves-light"
        onClick={() => {
          getSelectedTestToRecommand?.length > 0
            ? MANAGE_EVENT_MODAL_OPEN_REGISTER_STUDENT(
              !manageEventModalOpenRegisterStudent
            )
            : MANAGE_REGISTER_MODAL_OPEN_REGISTER_STUDENT(
              !props.manageRegitsertModalOpenRegisterStudent
            );
        }}
        style={{ color: "#565656" }}
      >
        <EventOutlinedIcon size={21} color="action" />
        <br></br>
        Event
      </Button>
      <div id="add-event-zIndex">
      <Modal
        isOpen={props.manageRegitsertModalOpenRegisterStudent}
        className="modal-dialog-centered modal-xl"
        fullWidth
        toggle={()=>toggleModal()}
        fullScreen
      >
          <div className="px-2 pt-2 pb-2" style={{backgroundColor:"#ffffff"}}>
          <div className="d-flex justify-content-between w-100">
            <div className="d-flex justify-content-start w-100">
              <BreadCrumbs
                breadCrumbTitle="Event Manager"
                breadCrumbParent="My School"
                breadCrumbActive="Events"
              />
            </div>
            <div className="d-flex justify-content-end w-100">
              <IconButton
                onClick={() => {
                  props.MANAGE_REGISTER_MODAL_OPEN_REGISTER_STUDENT(false);
                  getDataBack();
                  toggleModal()
                }}
                className="p-0"
              >
                <X />
              </IconButton>
            </div>
          </div>
          </div>
        <ModalBody>
          <Eventmaneger getDataBackOfStudent={getDataBack} istoggle={true} />
        </ModalBody>
      </Modal>
      </div>
      <Dialog
        open={manageEventModalOpenRegisterStudent}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle style={{ padding: "0.5em", color: "#40a7e1" }}>
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-start">
              <span className="mr-1"> Members will be added to</span>
              {props.handleaddtoevent ? (
                <Chip
                  label={props?.activeEvent?.title}
                  style={{
                    color: props.activeEvent?.app_color,
                    backgroundColor: hexToRGB(
                      props.activeEvent?.app_color || "#40a7e1",
                      0.16
                    ),
                    fontWeight: "bold",
                  }}
                  size="small"
                />
              ) : null}
            </div>
            <div className="d-flex justify-content-end">
              <Buttonmui
                disabled={!props.handleaddtoevent}
                style={{
                  background: !props.handleaddtoevent ? "#c8c5c5" : "#40a7e1",
                  color: "#fff",
                  borderRadius: "6px",
                }}
                onClick={() => {
                  setdefaultAlert(true);
                }}
              >
                Add to events
              </Buttonmui>
              <IconButton
                onClick={() => {
                  MANAGE_EVENT_MODAL_OPEN_REGISTER_STUDENT(false);
                  props.HandleEventButton(false);
                  props.ACTIVE_EVENT(null);
                  MANAGE_EVENT_SELECTED_REGISTER_STUDENT(null);
                }}
                className="p-0"
              >
                <X />
              </IconButton>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
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
              props.ACTIVE_EVENT(event);
              MANAGE_EVENT_SELECTED_REGISTER_STUDENT(event);
              confirmAddCandidate();
            }}
            onSelectSlot={() => {
              props.ACTIVE_EVENT(null);
              MANAGE_EVENT_SELECTED_REGISTER_STUDENT(null);
              props.HandleEventButton(false);
            }}
            selectable={true}
          />
        </DialogContent>
        <ConfirmationModal
          primaryColor="#0483fd"
          secondaryColor="#fff"
          imagePath="/images/delete.png"
          open={defaultAlert}
          title="Add members to event ?"
          onConfirm={() => {
            Handleregister();
          }}
          onCancel={() => {
            setdefaultAlert(false);
          }}
          onCancelButtonTitle={"Cancel"}
          contiunuebuttonTitle={"Add"}
          description=""
        />
      </Dialog>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    handleaddtoevent: state.test.handleaddtoevent,
    activeEvent: state.appointmentAndEvent.activeEvent,
    manageEventModalOpenRegisterStudent:
      state.test.manageEventModalOpenRegisterStudent,
    getSelectedTestToRecommand: state.test.getSelectedTestToRecommand,
    programList: state.program.programList,
    pageNumebrperpage: state.student.pageNumebrperpage,
    eventsAndAppointment: state.appointmentAndEvent.eventsAndAppointment,
    manageRegitsertModalOpenRegisterStudent:
      state.test.manageRegitsertModalOpenRegisterStudent,
  };
};

export default connect(mapStateToProps, {
  Add_TEST_DATA,
  ADD_INVITE_FOR_EVNET,
  SELECTED_TEST_DATA,
  GET_PROGRAM_LIST,
  SELECT_STUDENT_FOR_TEST_OR_RECOMAND,
  FETCH_EVENTS_OR_APPOINMENT,
  HandleEventButton,
  ACTIVE_EVENT,
  MANAGE_EVENT_MODAL_OPEN_REGISTER_STUDENT,
  MANAGE_REGISTER_MODAL_OPEN_REGISTER_STUDENT,
  MANAGE_EVENT_SELECTED_REGISTER_STUDENT,
})(TestModal);
