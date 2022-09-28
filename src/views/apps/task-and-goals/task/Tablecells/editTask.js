import React, { Fragment, useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  Grid,
  TextField,
  FormControl,
  Typography,
  Checkbox,
  Chip,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { Button } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { toast } from "react-toastify";
import "../../task-and-goals.css";
import { connect } from "react-redux";
import Switch from "@material-ui/core/Switch";
import { CustomInput, Input } from "reactstrap";
import moment from "moment";
import { useHistory } from 'react-router-dom';
import { EDIT_TASK, EDIT_TASK_WITHOUT_GONE_INTO_FOLDER } from "../../../../../redux/actions/task-and-goals/task";
import { GET_SUB_USERS_ASSIGNEE } from "../../../../../redux/actions/employee_subusers_roles";
import { CircularProgress } from '@material-ui/core'


function EditTask(props) {
  const {
    openEdit,
    setOpenEdit,
    Info,
    GET_SUB_USERS_ASSIGNEE,
    EDIT_TASK,
    EDIT_TASK_WITHOUT_GONE_INTO_FOLDER,
    sub_users_info,
    taskToDisplayToUser,
  } = props;
  const getLogedInUser = () => {
    return JSON.parse(localStorage.getItem("userdata"))?.data;
  };
  const [taskType, setTaskType] = useState("Ongoing");
  const [daysFilter, setDaysFilter] = useState("Day");
  const [payload, setPayload] = useState({});
  const history = useHistory()
  const [state, setState] = React.useState({});
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);


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
    };
  };

  const handleSubmit = async () => {
    setLoading(true)
    let ObjFormat;
    if (taskType === "Ongoing") {
      function dateRange(startDate, endDate, steps = 1) {
        const dateArray = [];
        let currentDate = new Date(startDate);

        while (currentDate <= new Date(endDate)) {
          dateArray.push(`${new Date(currentDate)}`);
          // Use UTC date to prevent problems with time zones and DST
          currentDate.setUTCDate(currentDate.getUTCDate() + steps);
        }
        return dateArray;
      }

      const dates = dateRange(
        moment(startDate).format("MM-DD-YYYY"),
        moment(endDate).format("MM-DD-YYYY")
      );

      ObjFormat = {
        ...payload,
        ...state,
        repeatedDates: dates,
        start: moment(startDate).format("YYYY-MM-DD"),
        start_time: startTime,
        end: moment(endDate).format("YYYY-MM-DD"),
        end_time: endTime,
        status: taskToDisplayToUser?.status,
        repeatedConcurrence: daysFilter,
        type: taskType,
      };
    } else {
      ObjFormat = {
        ...payload,
        ...state,
        start: moment(startDate).format("YYYY-MM-DD"),
        end: moment(endDate).format("YYYY-MM-DD"),
        status: taskToDisplayToUser?.status,
        type: taskType,
      };
    }
    let result = null;
    if (history?.subtaskFolderId === null) {
      result = await EDIT_TASK_WITHOUT_GONE_INTO_FOLDER(ObjFormat, { _id: Info?._id });
    } else {
      result = await EDIT_TASK(ObjFormat, Info, history?.maintaskFolderId, history?.subtaskFolderId);
    }

    if (result) {
      setOpenEdit(false);
      setLoading(false)
    } else {
      toast.error("something went wrong, please try again!", toastCSS());
    }

  };

  useEffect(() => {
    if (openEdit) {
      GET_SUB_USERS_ASSIGNEE();
      setEndDate(Info.end);
      setEndTime(Info.end_time);
      setStartDate(Info.start);
      setStartTime(Info.start_time);
      setTaskType(Info.type);
      let { isproof, isRating, isEnterData, isYesOrNo } = Info;
      setState({ isproof, isRating, isEnterData, isYesOrNo });

      let objResult = {
        priority: Info.priority,
        label: Info.label,
        name: Info.name,
        assign: Info.assign,
        daysFilter: Info.repeatedConcurrence,
        status: Info.status,
        days: Info?.repeatedDates.length,
      };
      setPayload(objResult);
    }
  }, []);

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const handleStartDate = (date) => {
    setStartDate(date);
  };
  const handleStartTime = (date) => {
    setStartTime(date);
  };
  const handleEndDate = (enddate) => {
    setEndDate(enddate);
  };
  const handleEndTime = (time) => {
    setEndTime(time);
  };

  const handleChange = (event) => {
    let selectTask = {
      isproof: false,
      isRating: false,
      isEnterData: false,
      isYesOrNo: false,
    };
    setState({ ...selectTask, [event.target.name]: event.target.checked });
  };

  const handleTasktype = (e) => {
    setTaskType(e?.target?.value)
  };

  const handleDaysfilter = (e) => {
    setDaysFilter(e.target.value);
  };

  return (
    <Fragment>
      <Dialog
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
        }}
      >
        <DialogContent>
          <Typography>Edit Task</Typography>
          <div>
            <div className="task-body1 p-1 mb-2">
              <Grid spacing={2} container>
                <Grid item sm={12} md={12} lg={12}>
                  <label style={{ fontSize: "15px" }}> Task Name</label>
                  <Input
                    name="name"
                    value={payload?.name}
                    placeholder="Task name"
                    onChange={onChangeHandler}
                  />
                </Grid>
                <Grid item sm={6} md={6} lg={6}>
                  <label style={{ fontSize: "15px" }}>Task Type</label>
                  <FormControl required fullWidth>
                    <Select
                      style={{
                        borderRadius: "0.4em",
                        border: "1px solid #b8c2cc",
                        background: "none",
                        height: "40px",
                        margin: "0",
                        padding: "10px",
                      }}
                      inputprops={{
                        disableUnderline: true,
                      }}
                      onChange={handleTasktype}
                      fullWidth
                      labelId="priority-select-required-label"
                      id="priority-select-required"
                      name="task_type"
                      value={taskType}
                    >
                      <MenuItem value="Ongoing">Ongoing</MenuItem>
                      <MenuItem value="One Time">One Time</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={6} md={6} lg={6}>
                  <label style={{ fontSize: "15px" }}>Assignee</label>
                  <FormControl required fullWidth>
                    <CustomInput
                      style={{
                        borderRadius: "0.4em",
                        border: "1px solid #b8c2cc",
                        background: "none",
                        height: "40px",
                        margin: "0",
                        // padding: "10px",
                      }}
                      inputprops={{
                        disableUnderline: true,
                      }}
                      type="select"
                      id="assign"
                      name="assign"
                      defaultValue={payload?.assing}
                      onChange={onChangeHandler}
                    >
                      {sub_users_info.map((item, i) => {
                        return (
                          <option
                            key={i}
                          >{`${item.firstname} ${item.lastname}`}</option>
                        );
                      })}
                      <option key={getLogedInUser()?._id}>
                        {getLogedInUser()?.username}
                      </option>
                    </CustomInput>
                  </FormControl>
                </Grid>
                <Grid item sm={6} md={6} lg={6}>
                  <label style={{ fontSize: "15px" }}>Start Date</label>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      style={{
                        borderRadius: "0.4em",
                        border: "1px solid #b8c2cc",
                        background: "none",
                        height: "40px",
                        padding: "10px",
                      }}
                      inputprops={{
                        disableUnderline: true,
                      }}
                      name="start"
                      margin="normal"
                      value={startDate}
                      id="date-picker-dialog"
                      format="MM/dd/yyyy"
                      onChange={handleStartDate}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item sm={6} md={6} lg={6}>
                  <label style={{ fontSize: "15px" }}>Start Time</label>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                      style={{
                        borderRadius: "0.4em",
                        border: "1px solid #b8c2cc",
                        background: "none",
                        height: "40px",
                        padding: "10px",
                        textDecoration: "none",
                      }}
                      inputprops={{
                        disableUnderline: true,
                      }}
                      name="start_time"
                      margin="normal"
                      id="time-picker"
                      value={startTime}
                      defaultValue={moment(startTime).format("hh:mm A")}
                      onChange={handleStartTime}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item sm={6} md={6} lg={6}>
                  <label style={{ fontSize: "15px" }}>Priority</label>
                  <FormControl required fullWidth>
                    <CustomInput
                      style={{
                        borderRadius: "0.4em",
                        border: "1px solid #b8c2cc",
                        background: "none",
                        height: "40px",
                        margin: "0",
                        // padding: "10px",
                      }}
                      inputprops={{
                        disableUnderline: true,
                      }}
                      type="select"
                      id="priority"
                      name="priority"
                      value={payload.priority}
                      onChange={onChangeHandler}
                    >
                      <option>Urgent</option>
                      <option>High</option>
                      <option>Normal</option>
                      <option>Low</option>
                      <option>Clear</option>
                    </CustomInput>
                  </FormControl>
                </Grid>
                <Grid item sm={6} md={6} lg={6}>
                  <label style={{ fontSize: "15px" }}>Task Label</label>
                  {/* <FormControl required fullWidth> */}
                  <CustomInput
                    style={{
                      borderRadius: "0.4em",
                      border: "1px solid #b8c2cc",
                      background: "none",
                      height: "40px",
                      margin: "0",
                      // padding: "10px",
                    }}
                    inputprops={{
                      disableUnderline: true,
                    }}
                    className="mr-1"
                    type="select"
                    id="label"
                    name="label"
                    value={payload?.label}
                    onChange={onChangeHandler}
                  >
                    <option>Office</option>
                    <option>Personal</option>
                    <option>Event</option>
                    <option>Home</option>
                  </CustomInput>
                  {/* </FormControl> */}
                </Grid>
              </Grid>
              {taskType === "Ongoing" ? (
                <Fragment>
                  <div className="pt-2">
                    <Typography>
                      <b>Repeat </b>
                    </Typography>

                    <div className="d-flex">
                      <Typography className="mt-1 p-0 mr-2">
                        {"Every"}
                      </Typography>
                      <TextField
                        // className='mt-1'
                        style={{
                          borderRadius: "0.4em",
                          border: "1px solid #b8c2cc",
                          width: "6em",
                          height: "2.5em",
                          marginRight: "1em",
                          marginTop: "3px",
                        }}
                        variant={"outlined"}
                        size="small"
                        type="number"
                        name="days"
                        value={payload?.days}
                      // onChange={onChangeHandler}
                      />
                      <div
                        style={{
                          borderRadius: "0.4em",
                          height: "2.5em",
                          border: "1px solid #b8c2cc",
                          width: "200px",
                          marginTop: "3px",
                        }}
                      >
                        <Select
                          fullWidth
                          variant="outlined"
                          name="repeatedConcurrence"
                          value={daysFilter}
                        // onChange={handleDaysfilter}
                        >
                          <MenuItem value="Day">Day</MenuItem>
                          <MenuItem value="Week">Week</MenuItem>
                          <MenuItem value="Month">Month</MenuItem>
                          <MenuItem value="Year">Year</MenuItem>
                        </Select>
                      </div>
                    </div>
                    {daysFilter === "Day" ? (
                      <div className="border m-1 d-flex justify-content-center">
                        <Typography className="mt-1">
                          {` Repeats every Day from ${moment(new Date()).format(
                            "MMM Do YYYY"
                          )} ending on ${moment(new Date()).format(
                            "MM/DD/YYYY"
                          )}`}
                        </Typography>
                      </div>
                    ) : daysFilter === "Week" ? (
                      <div
                        className="m-1"
                        style={{
                          borderTop: "1px solid #ededed",
                          borderBottom: "1px solid #ededed",
                        }}
                      >
                        {/* {Days.map((item, index2) => {
                                                    return (
                                                        <Chip
                                                            size="small"
                                                            variant="outlined"
                                                            style={{
                                                                color: "#2896f3",
                                                                border: "1px solid #2896f3",
                                                                margin: "0.5em",
                                                            }}
                                                            key={index2}
                                                            label={item}
                                                        />
                                                    );
                                                })} */}
                      </div>
                    ) : daysFilter === "Month" ? (
                      <div className="border m-1 d-flex justify-content-center">
                        <Typography className="mt-1">
                          {` Repeats every Month on ${moment(new Date()).format(
                            "MMM Do YYYY"
                          )} ending on ${moment(new Date()).format(
                            "MM/DD/YYYY"
                          )}`}
                        </Typography>
                      </div>
                    ) : daysFilter === "Year" ? (
                      <div className="border m-1 d-flex justify-content-center">
                        <Typography className="mt-1">
                          {` Repeats every Year on ${moment(new Date()).format(
                            "MMM Do YYYY"
                          )} ending on ${moment(new Date()).format(
                            "MM/DD/YYYY"
                          )}`}
                        </Typography>
                      </div>
                    ) : null}
                  </div>
                  <div className="pt-2">
                    <Typography>
                      <b>End</b>
                    </Typography>
                    <div className="d-flex p-0">
                      <Checkbox className="m-0" />
                      <Typography className="mt-1 p-0 mr-2">
                        {"Never"}
                      </Typography>
                    </div>
                    <div className="d-flex align-items-center">
                      <Typography className="mt-1 p-0 mx-2">{"On"}</Typography>
                      <Grid spacing={2} container>
                        <Grid item sm={6} md={6} lg={6}>
                          <label style={{ fontSize: "15px" }}>End Date</label>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              style={{
                                borderRadius: "0.4em",
                                border: "1px solid #b8c2cc",
                                background: "none",
                                height: "40px",
                                padding: "10px",
                              }}
                              inputprops={{
                                disableUnderline: true,
                              }}
                              name="dueDate"
                              margin="normal"
                              value={endDate}
                              id="date-picker-dialog"
                              format="MM/dd/yyyy"
                              onChange={handleEndDate}
                            />
                          </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item sm={6} md={6} lg={6}>
                          <label style={{ fontSize: "15px" }}>End Time</label>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                              style={{
                                borderRadius: "0.4em",
                                border: "1px solid #b8c2cc",
                                background: "none",
                                height: "40px",
                                padding: "10px",
                                textDecoration: "none",
                              }}
                              inputprops={{
                                disableUnderline: true,
                              }}
                              name="end_time"
                              margin="normal"
                              id="time-picker"
                              value={endTime}
                              defaultValue={moment(endTime).format("hh:mm A")}
                              onChange={handleEndTime}
                              KeyboardButtonProps={{
                                "aria-label": "change time",
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </Fragment>
              ) : (
                <Grid spacing={2} container>
                  <Grid item sm={6} md={6} lg={6}>
                    <label style={{ fontSize: "15px" }}>End Date</label>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        style={{
                          borderRadius: "0.4em",
                          border: "1px solid #b8c2cc",
                          background: "none",
                          height: "40px",
                          padding: "10px",
                        }}
                        inputprops={{
                          disableUnderline: true,
                        }}
                        name="due_date"
                        margin="normal"
                        value={endDate}
                        id="date-picker-dialog"
                        format="MM/dd/yyyy"
                        onChange={handleEndDate}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
              )}
            </div>
            <div className="task-body2 p-1 my-2">
              <Grid spacing={2} container>
                <Grid item sm={12} md={12} lg={12}>
                  <div>
                    <p>Select one task completion method below.</p>
                    <div className="d-flex justify-content-start align-items-center">
                      <Switch
                        style={{ color: "#0184FF" }}
                        checked={state.isproof}
                        onChange={handleChange}
                        name="isproof"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />{" "}
                      <p className="mb-0">Upload an image.</p>
                    </div>
                    <div className="d-flex justify-content-start align-items-center">
                      <Switch
                        style={{ color: "#0184FF" }}
                        checked={state.isRating}
                        onChange={handleChange}
                        name="isRating"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />{" "}
                      <p className="mb-0"> Select rating</p>
                    </div>
                    <div className="d-flex justify-content-start align-items-center">
                      <Switch
                        style={{ color: "#0184FF" }}
                        checked={state.isEnterData}
                        onChange={handleChange}
                        name="isEnterData"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />{" "}
                      <p className="mb-0">Enter Data</p>
                    </div>
                    <div className="d-flex justify-content-start align-items-center">
                      <Switch
                        style={{ color: "#0184FF" }}
                        checked={state.isYesOrNo}
                        onChange={handleChange}
                        name="isYesOrNo"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />{" "}
                      <p className="mb-0">Yes or No</p>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="d-flex justify-content-end align-items-center mt-2">
              <Button
                className="mr-50"
                style={{
                  color: "#6b6b6b",
                  height: 40,
                  borderRadius: "4px",
                  width: "100px",
                  border: "1px solid #b8c2cc",
                }}
                onClick={() => {
                  setOpenEdit(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleSubmit();
                }}
                style={{
                  color: "#fff",
                  height: 40,
                  background: "#0184FF",
                  borderRadius: "4px",
                  width: "90px",
                }}
              >
                {loading ? <CircularProgress style={{ color: '#fff', width: '20px', height: '20px' }} /> : <span>Save</span>}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    sub_users_info: state.employeeSubUser.sub_users_info,
    taskToDisplayToUser: state?.TaskAndGoalsTaskReducer?.taskToDisplayToUser,
  };
};
export default connect(mapStateToProps, { GET_SUB_USERS_ASSIGNEE, EDIT_TASK, EDIT_TASK_WITHOUT_GONE_INTO_FOLDER })(
  EditTask
);
