
import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { ArrowLeft } from "react-feather";
import { FormGroup, Input, Label, Button, Row } from "reactstrap";
import Delete from "./components/delete";
import EditEvents from "./components/edit";
import SweetAlert from "react-bootstrap-sweetalert";
import moment from "moment";
import "flatpickr/dist/themes/light.css";
import "../../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import "../../../../assets/scss/pages/users.scss";
import {
  CLEAR_SCHEDULE_STATUS,
  GET_PROGRAM_LIST,
} from "../../../../redux/actions/settings/schedule";
import {
  DELETE_SCHEDULE_CLASS,
  ADD_CLASS_SCHEDULE,
  UPDATE_CLASS_SCHEDULE,
  UPDATE_WHOLE_CLASS_SCHEDULE,
} from "../../../../redux/actions/calendar";
import { fetchEvents } from "../../../../redux/actions/calendar/index";
import { Chip } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const getDayName = (dateIs) => {
  let m = moment(dateIs);
  return String(m.format("dddd"));
};
const dayNames = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
const AddEvent = (props) => {
  const [ActiveTab, setTabActive] = React.useState(0);
  const [wholeStartDate, setWholeStartDate] = React.useState(0);
  const [wholeEndDate, setWholeEndDate] = React.useState(0);

  const [state, setState] = useState({
    program_name: "",
    class_name: "",
    start_date: new Date(),
    end_date: new Date(),
    start_time: "",
    end_time: "",
    program_color: "",
    repeat_weekly_on: [],
    defaultAlert: false,
  });

  useEffect(() => {
    props.GET_PROGRAM_LIST();
  }, []);

  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleDateChange = (value, name) => {
    if (name === "start_date") {
      setState({ ...state, [name]: value, start_time: value });
    } else {
      setState({ ...state, [name]: value, end_time: value });
    }
  };

  const SelectProgram = (e) => {
    let program = props?.program?.filter(
      (item) =>
        item?._id === e.target.value || item?.programName === e.target.value
    )[0];
    setState({
      ...state,
      program_name: program?.programName,
      program_color: program?.color,
    });
  };

  const checkboxHandler = (value) => {
    let copyState = state.repeat_weekly_on;
    let index = copyState.indexOf(value);
    if (index > -1) {
      copyState.splice(index, 1);
      setState({ ...state, repeat_weekly_on: [...copyState] });
    } else {
      setState({ ...state, repeat_weekly_on: [...copyState, value] });
    }
  };

  const handleAddEvent = async () => {
    const { ...rest } = state;
    rest.start_time = rest.start_date;
    rest.end_time = rest.end_date;
    rest.start_date = moment(rest.start_date).format("MM/DD/YYYY");
    rest.end_date = moment(rest.end_date).format("MM/DD/YYYY");
    props.ADD_CLASS_SCHEDULE(rest);
    setState({
      program_name: "",
      class_name: "",
      start_date: "",
      end_date: "",
      start_time: "",
      end_time: "",
      repeat_weekly_on: [],
    });
    props.handleSidebar(false);
  };

  const updateEvent = async (id) => {
    let { ...rest } = state;
    let { event } = props;
    let payload = {
      ...rest,
      start_time: rest.start_date,
      end_time: rest.end_date,
      start_date: new Date(event?.start_date),
      end_date: new Date(event?.end_date)
    };

    delete payload?._id;
    await props.UPDATE_CLASS_SCHEDULE(payload, id);
    setState({
      program_name: "",
      class_name: "",
      start_time: new Date(),
      end_time: new Date(),
      start_time: "",
      end_time: "",
      repeat_weekly_on: [],
      wholeSeriesEndDate: "",
      wholeSeriesStartDate: "",
    });
    props.handleSidebar(false);
  };

  const UpdateWholeSeries = async () => {
    let payload = {
      ...state,
      isResetTimeline: true,
      start_time: wholeStartDate,
      end_time: wholeEndDate,
      defaultprogram_name: state?.program_name,
      defaultclass_name: state?.class_name,
      wholeSeriesStartDate: moment(wholeStartDate).format("MM/DD/YYYY"),
      wholeSeriesEndDate: moment(wholeEndDate).format("MM/DD/YYYY"),
    };
    if (state?.end_time !== wholeEndDate || state?.start_time !== wholeStartDate) {
      payload.isResetTimeline = true
    }
    delete payload?._id;
    delete payload?.end_date;
    delete payload?.start_date;
    props.UPDATE_WHOLE_CLASS_SCHEDULE(payload);
    props.handleSidebar(false);
  };

  const onCancel = () => {
    props.CLEAR_SCHEDULE_STATUS();
  };
  useEffect(() => {
    let { event } = props;
    if (event !== null) {
      let aftermodify = {
        class_name: event?.class_name,
        end_date: event?.end,
        start_date: event?.start,
        end_time: event?.end,
        start_time: event?.start,
        program_color: event?.program_color,
        program_name: event?.program_name,
        repeat_weekly_on: event?.repeat_weekly_on,
        title: event?.title,
        wholeSeriesEndDate: event?.wholeSeriesEndDate,
        wholeSeriesStartDate: event?.wholeSeriesStartDate,
        series_id: event?.series_id,
        _id: event?._id,
      };
      setState(aftermodify);
    }
    let startTimeH = new Date(event?.start_time).getHours();
    let startTimeM = new Date(event?.start_time).getMinutes();

    let endTimeH = new Date(event?.end_time).getHours();
    let endTimeM = new Date(event?.end_time).getMinutes();
    let start_date = new Date(
      moment(event?.wholeSeriesStartDate).set({
        hour: Number(startTimeH),
        minute: Number(startTimeM),
      })?._d
    );
    let end_date = new Date(
      moment(event?.wholeSeriesEndDate).set({
        hour: Number(endTimeH),
        minute: Number(endTimeM),
      })?._d
    );

    setWholeStartDate(start_date);
    setWholeEndDate(end_date);
  }, [props?.event]);

  const { repeat_weekly_on } = state;

  return (
    <>
      {props.status && (
        <SweetAlert
          success
          title={"Success"}
          onCancel={onCancel}
          customButtons={
            <React.Fragment>
              <Button.Ripple color="primary" onClick={onCancel}>
                Okay
              </Button.Ripple>
            </React.Fragment>
          }
        >
          {props?.message}
        </SweetAlert>
      )}

      <div className={`add-event-sidebar ${props.sidebar ? "show" : "hidden"}`}>
        <div className="d-flex justify-content-between">
          <h3 className="text-bold-600 mb-0">
            {props?.eventInfo !== null && props.eventInfo?.title?.length > 0 ? (
              <div
                className="close-icon cursor-pointer"
                onClick={() => props.handleSidebar(false)}
              >
                <ArrowLeft size={20} /> Update Class
              </div>
            ) : (
              "Add Class"
            )}
          </h3>
          {
            props?.eventInfo !== null &&
            props.eventInfo?.title?.length > 0 && <div
              className="close-icon cursor-pointer"
              onClick={() => {
                setState({ ...state, defaultAlert: true });
              }}
            >
              <Delete setState={setState} handleSidebar={props.handleSidebar} event={state} />
            </div>
          }

        </div>
        <div className="p-1">
          {props.eventInfo?.title?.length > 0 ? (
            <Fragment>
              <EditEvents
                ActiveTab={ActiveTab}
                setTabActive={setTabActive}
                handleDateChange={handleDateChange}
                event={state}
                wholeEndDate={wholeEndDate}
                wholeStartDate={wholeStartDate}
                setWholeStartDate={setWholeStartDate}
                setWholeEndDate={setWholeEndDate}
                setState={setState}
                SelectProgram={SelectProgram}
                updateOneEvent={updateEvent}
                getDayName={getDayName}
                UpdateWholeSeries={UpdateWholeSeries}
                changeHandler={changeHandler}
                checkboxHandler={checkboxHandler}
                repeat_weekly_on={repeat_weekly_on}
                dayNames={dayNames}
                programList={props?.program}
              />
            </Fragment>
          ) : (
            <div className="add-event-fields">
              <FormGroup>
                <Label>Program Name</Label>
                <Input
                  type="select"
                  name="program_name"
                  onChange={SelectProgram}
                  id="ProgramName"
                >
                  <option>
                    {state?.program_name === ""
                      ? "-- Select Program --"
                      : props.eventInfo?.program_name}
                  </option>
                  {props?.program?.map((item, index) => {
                    return (
                      <option key={index} value={item?._id}>
                        {item.programName}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
              <FormGroup className="form-label-group">
                <Input
                  type="text"
                  id="ClassName"
                  placeholder="Class Name"
                  name="class_name"
                  value={state.class_name}
                  onChange={changeHandler}
                />
                <Label for="ClassName">Class Name</Label>
              </FormGroup>
              <div className="d-flex justify-content-between">
                <FormGroup className="mr-1">
                  <Label htmlFor="startDate">Start Date & time</Label>
                  <DatePicker
                    selected={state.start_date}
                    onChange={(date) => {
                      handleDateChange(date, "start_date");
                    }}
                    showTimeSelect
                    id="startDate"
                    className="form-control"
                    dateFormat="MM/d/yyyy h:mm aa"
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="endDate">End Date & time</Label>
                  <DatePicker
                    selected={state.end_date}
                    onChange={(date) => {
                      handleDateChange(date, "end_date");
                    }}
                    showTimeSelect
                    id="endDate"
                    className="form-control"
                    dateFormat="MM/d/yyyy h:mm aa"
                  />
                </FormGroup>
              </div>
              <FormGroup>
                <b>Repeat weekly on</b>
                <Row>
                  <div className="col-md-12">
                    {repeat_weekly_on?.length > 0 &&
                      repeat_weekly_on?.map((item, i) => {
                        return (
                          <Chip
                            button="true"
                            key={i}
                            size="small"
                            icon={
                              <CheckCircleOutlineIcon
                                style={{ color: "#4f7fff" }}
                              />
                            }
                            onClick={() => checkboxHandler(item)}
                            style={{
                              margin: "4px",
                              background: "#6610f21a",
                              color: "#4f7fff",
                              fontWeight: "bold",
                            }}
                            label={item}
                            variant="outlined"
                          />
                        );
                      })}
                    {dayNames?.map((item, i) => {
                      return (
                        !repeat_weekly_on?.includes(item) && (
                          <Chip
                            button="true"
                            size="small"
                            style={{
                              margin: "4px",
                              background: "#f8f8f8",
                              fontWeight: "bold",
                            }}
                            key={i}
                            variant="outlined"
                            onClick={() => checkboxHandler(item)}
                            label={item.toLocaleLowerCase()}
                          />
                        )
                      );
                    })}
                  </div>
                </Row>
              </FormGroup>
              <div className="add-event-actions text-right">
                <Button.Ripple color="primary" onClick={handleAddEvent}>
                  Add Class
                </Button.Ripple>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    status: state.setting.class_schedule.status,
    message: state.setting.class_schedule.msg,
    program: state.setting.programList,
  };
};
export default connect(mapStateToProps, {
  DELETE_SCHEDULE_CLASS,
  fetchEvents,
  ADD_CLASS_SCHEDULE,
  CLEAR_SCHEDULE_STATUS,
  UPDATE_CLASS_SCHEDULE,
  UPDATE_WHOLE_CLASS_SCHEDULE,
  GET_PROGRAM_LIST,
})(AddEvent);