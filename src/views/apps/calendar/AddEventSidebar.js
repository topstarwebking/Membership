import React from "react";
import "./style.css";
import {
  Button,
  Card,
  CardBody,
  Col,
  Row,
  // Label
} from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/pages/users.scss";
import {
  FETCH_ATTENDEE_LIST,
  fetchEvents,
  STUD_GET,
  ADD_STUDENT_TO_CLASS,
  FETCH_CLASS_STUDENTS,
  RENDER_STUDENT,
  ATTENDENCE_STUDENTS_REMOVE_BY_ID,
} from "../../../redux/actions/calendar";
import { connect } from "react-redux";
import "flatpickr/dist/themes/light.css";
import moment from "moment";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import InputSuggetionForStudentTableView from "./inputSuggetionForStudentTableView";
import {
  FormGroup,
  Typography,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Avatar,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

class AddEvent extends React.Component {
  state = {
    selectedStudentForAttendance: null,
    value: "Search",
    startDate: new Date(),
    endDate: new Date(),
    title: "",
    label: null,
    allDay: true,
    selectable: true,
    toGetStudents: [],
    searchString: "",
    searchStringIsOpen: false,
    currentSearchInput: "",
    searchInputValue: "",
    searchSelectTime: "",
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
    columnDefs: [],
    pageSize: 20,
    scheduleId: "",
    sweetAlertOpen: false,
    studentId: "",
    submittedDate: false,
  };

  async componentDidMount() {
    this.props.RENDER_STUDENT();
    this.props.STUD_GET();
  }
  
  addStudentToClass = (e) => {
    let id = e.target.parentElement.getAttribute("value");
    let studentName = e.target.parentElement.getAttribute("text");
    let scheduleId = this.props.eventInfo?._id;

    this.setState({
      searchStringIsOpen: false,
      currentSearchInput: studentName,
      searchInputValue: id,
    });

    this.props.FETCH_CLASS_STUDENTS(scheduleId);
  };

  handleDeleteStudent = () => {
    this.props.ATTENDENCE_STUDENTS_REMOVE_BY_ID(
      this.state.scheduleId,
      this.state.studentId
    );
    this.setState({ sweetAlertOpen: false });
  };

  handleSearchChanged = (e) => {
    if (this.state.value) {
      this.setState({
        searchStringIsOpen: true,
        currentSearchInput: e.target.value,
        searchString: e.target.value,
      });
    } else {
      this.setState({ searchStringIsOpen: false });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const scheduleId = this.props.eventInfo?._id;
    const { searchSelectTime, selectedStudentForAttendance } = this.state;
    let time =
      searchSelectTime === ""
        ? this.props.eventInfo?.start_time
        : searchSelectTime;
    this.props.ADD_STUDENT_TO_CLASS(
      scheduleId,
      selectedStudentForAttendance?._id,
      time
    );
  };

  onTimeChange = (time) => {
    this.setState({ searchSelectTime: time });
  };
  handleAddEvent = (id) => {
    this.props.handleSidebar(false);
    this.props.addEvent({
      id: id,
      title: this.state.title,
      start: this.state.startDate,
      end: this.state.endDate,
      label: this.state.label === null ? "others" : this.state.label,
      allDay: this.state.allDay,
      selectable: this.state.selectable,
    });
    this.setState({
      startDate: new Date(),
      endDate: new Date(),
      title: "",
      label: null,
      allDay: true,
      selectable: true,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.eventInfo === null ? "" : nextProps.eventInfo.title,
      url: nextProps.eventInfo === null ? "" : nextProps.eventInfo.url,
      startDate:
        nextProps.eventInfo === null
          ? new Date()
          : new Date(nextProps.eventInfo.start),
      endDate:
        nextProps.eventInfo === null
          ? new Date()
          : new Date(nextProps.eventInfo.end),
      label: nextProps.eventInfo === null ? null : nextProps.eventInfo.label,
      allDay: nextProps.eventInfo === null ? true : nextProps.eventInfo.allDay,
      selectable:
        nextProps.eventInfo === null ? true : nextProps.eventInfo.selectable,
    });
  }

  handleSelectStudent = (e, value) => {
    this.setState({ selectedStudentForAttendance: value });
    this.props.FETCH_CLASS_STUDENTS(value?._id);
  };
  
  handleDeleteClick = (id, studentId) => {
    this.setState({
      scheduleId: id,
      sweetAlertOpen: true,
      studentId: studentId,
    });
  };
  render() {
    let style = {
      right: "20px",
      fontSize: "1.5em",
      paddingTop: "1em",
      marginBottom: "0 !important",
    };
    return (
      <div
        className={`add-event-sidebar ${this.props.sidebar ? "show" : "hidden"
          }`}
        style={{ width: "620px" }}
      >
        <Card style={{ boxShadow: "none" }} className="p-1">
          <form onSubmit={this.handleSubmit}>
            <div className="d-flex justify-content-between mb-1 p-1">
              <div>
                <Typography className="my-0">
                  {moment(
                    this.props.calendar?.classStudentList[0]?.start_date
                  ).format("MMMM Do YYYY")}
                </Typography>
                <Typography className="text-capitalize my-0" style={{ fontSize: "1.5em", }}>
                  <b>{this.props.eventInfo?.class_name}</b>
                </Typography>
                <Typography className="my-0">
                  {`${moment(this.props.calendar?.classStudentList[0]?.start_time).format("hh:mm A")} - ${moment(this.props.eventInfo?.end_time).format("hh:mm A")}`}
                </Typography>
              </div>
              <div className="d-flex align-items-center">
                <Typography style={style}>
                  <b>
                    {this.props.calendar?.classStudentList[0]?.attendence?.length
                      ? "Total: " +
                      this.props.calendar?.classStudentList[0]?.attendence
                        ?.length
                      : "Total: " + 0}
                  </b>
                </Typography>
              </div>
            </div>
            <Row className="p-1">
              <Col sm="4">
                <FormGroup>
                  <InputSuggetionForStudentTableView
                    style={{ background: "#fffff" }}
                    handleSelectStudent={this.handleSelectStudent}
                    students={this.props?.calendar?.filterStudents}
                    handleSearchChanged={this.handleSearchChanged}
                  />
                </FormGroup>
              </Col>
              <Col sm="3" className="ml-0">
                <div style={{ width: "150px" }}>
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    style={{ width: "150px" }}
                  >
                    <KeyboardTimePicker
                      fullWidth
                      id="time-picker"
                      style={{
                        borderRadius: "0.4em",
                        border: "1px solid #b8c2cc",
                        height: "3em",
                        padding: "4px 10px",
                      }}
                      value={
                        this.state.searchSelectTime ||
                        this.props.eventInfo?.start_time
                      }
                      onChange={(date) => {
                        this.onTimeChange(date);
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                      InputProps={{
                        disableUnderline: true,
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </Col>
              <Col sm="5" className="">
                <div className="d-flex justify-content-end align-items-center">
                  <Button color="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
        </Card>
        <Card style={{ boxShadow: "none", padding: "1em", height: "600px" }}>
          <CardBody className="cd-body-rm pd-body">
            <Table style={{ overflow: "auto" }}>
              <TableHead style={{ background: "#eaf4fe" }}>
                <TableRow>
                  <TableCell style={{ padding: "0.5em 1em" }}>
                    <b>Profile</b>
                  </TableCell>
                  <TableCell style={{ padding: "0.5em 1em" }} align="left">
                    <b>Name</b>
                  </TableCell>
                  <TableCell style={{ padding: "0.5em 1em" }}>
                    <b>Classe</b>
                  </TableCell>
                  <TableCell style={{ padding: "0.5em 1em" }}>
                    <b>Date & Time</b>
                  </TableCell>
                  <TableCell style={{ padding: "0.5em 1em" }}>
                    <b>Manage</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                {this.props.calendar?.classStudentList
                  ? this.props.calendar?.classStudentList[0]?.attendence?.map(
                    (item, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell
                            className="pl-1"
                            style={{ padding: "0.5em" }}
                          >
                            <Avatar
                              src={item?.memberprofileImage}
                              size="small"
                              style={{ width: "2em", height: "2em" }}
                            />
                          </TableCell>
                          <TableCell className="p-0 pl-1" align="left">
                            {item?.firstName} {item?.lastName}
                          </TableCell>
                          <TableCell className="p-0 pl-1" align="left">
                            {
                              this.props.calendar?.classStudentList[0]
                                ?.class_name
                            }
                          </TableCell>
                          <TableCell className="p-0 pl-1">
                            {moment(
                              this.props.calendar?.classStudentList[0]?.start_date
                            ).format("MM/DD/YYYY")}
                            <Typography style={{ marginBottom: "0px" }}>
                              {moment(` ${item?.time}`).format("hh:mm A")}
                            </Typography>
                          </TableCell>
                          <TableCell className="p-0 pl-1" align="left">
                            <DeleteIcon
                              color="action"
                              onClick={() => {
                                this.handleDeleteClick(
                                  this.props.calendar?.classStudentList[0]
                                    ?._id,
                                  item?._id
                                );
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )
                  : null}
              </TableBody>
            </Table>
          </CardBody>
          <SweetAlert
            title="Are you sure?"
            warning
            show={this.state.sweetAlertOpen}
            showCancel
            reverseButtons
            cancelBtnBsStyle="danger"
            confirmBtnText="Yes, Delete"
            cancelBtnText="Cancel"
            onConfirm={this.handleDeleteStudent}
            onCancel={() => {
              this.setState({ sweetAlertOpen: false });
            }}
          >
            Are you sure you want to delete?
          </SweetAlert>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    calendar: state.calendar,
    classStudentList: state.calendar.classStudentList,
    attendList: state.calendar.attendList,
  };
};

export default connect(mapStateToProps, {
  fetchEvents,
  FETCH_ATTENDEE_LIST,
  STUD_GET,
  ADD_STUDENT_TO_CLASS,
  FETCH_CLASS_STUDENTS,
  ATTENDENCE_STUDENTS_REMOVE_BY_ID,
  RENDER_STUDENT,
})(AddEvent);
