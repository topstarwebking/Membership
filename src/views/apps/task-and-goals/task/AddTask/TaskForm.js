import React, { Fragment, useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  Grid,
  FormControl,
  Typography,
  Checkbox,
  Chip} from "@material-ui/core";
import { Button } from "@material-ui/core";
import { X } from "react-feather";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { toast } from "react-toastify";
import DateFnsUtils from "@date-io/date-fns";
import "../../task-and-goals.css";
import { connect } from "react-redux";
import Switch from "@material-ui/core/Switch";
import {  CustomInput, Input } from "reactstrap";
import moment from "moment";
import {
  CREATE_TASK,
  CREATE_TASK_WITHOUT_GONE_INTO_FOLDER,
  GET_TASK_FOLDER_LIST,
} from "../../../../../redux/actions/task-and-goals/task";
import { useHistory } from "react-router-dom";
import { GET_SUB_USERS_ASSIGNEE } from "../../../../../redux/actions/employee_subusers_roles";
import { CircularProgress } from "@material-ui/core";
import "./style.css"

const TaskForm = (props) => {
  const {
    CREATE_TASK,
    breadCrumbValue,
    taskFolderList,
    sub_users_info,
    handleClose,
    GET_SUB_USERS_ASSIGNEE,
    CREATE_TASK_WITHOUT_GONE_INTO_FOLDER,
  } = props;
  const toastCSS = () => {
    return {
      position: "bottom-right",
      autoClose: 5000,
      icon: true,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };
  };

  const getLogedInUser = () => {
    return JSON.parse(localStorage.getItem("userdata"))?.data;
  };
  const [taskType, setTaskType] = useState("Ongoing");
  const [SelectedFolderList, setSelectedFolderList] = useState([]);
  const [mainFolderId, setMainFolderId] = useState(null);
  const [subFolderId, setSubFolderId] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [loading, setLoading] = useState(false);

  const [daysFilter, setDaysFilter] = useState("Never");
  const history = useHistory();
  const [payload, setPayload] = useState({
    priority: "Urgent",
    label: "Office",
    assign: "",
  });
  var disabled = "disabled";
  var enabled = !disabled;
  // function formValidation() {
  //   let fieldName = document.forms["name"].value;
  //   if (fieldName === "") {
  //     alert("Name must be filled out")
  //     return false;
  //   }
  // }

  const [state, setState] = React.useState({
    isproof: false,
    isRating: false,
    isEnterData: false,
    isYesOrNo: false,
  });
  const [errorLog, setErrorLog] = useState({
    taskName: false,
    // assignee: false,
    uploadAnImage: false,
    selectRating: false,
    enterData: false,
    yesOrNo: false,
    subList:false,
    todoList:false
  });

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const handleSubmit = async () => {
    setLoading(true);
    let ObjFormat;
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
      status: "Pending",
      repeatedConcurrence: daysFilter,
      type: taskType,
    };

    let newErrorLog = errorLog;
    newErrorLog.taskName = !ObjFormat.name || ObjFormat.name === "" ? true : false;
    // newErrorLog.assignee = ObjFormat.assign === "" ? true : false;
    newErrorLog.uploadAnImage = !ObjFormat.isproof ? true : false;
    newErrorLog.selectRating = !ObjFormat.isRating ? true : false;
    newErrorLog.enterData = !ObjFormat.isEnterData ? true : false;
    newErrorLog.yesOrNo = !ObjFormat.isYesOrNo ? true : false;

    let isMainAndSubFolder= false
    if(breadCrumbValue[0]?.subFolderName === null){
      newErrorLog.subList =!mainFolderId || mainFolderId === "" ? true : false;
      newErrorLog.todoList = !subFolderId || subFolderId === "" ? true : false;
      if(newErrorLog.subList || newErrorLog.todoList){
        isMainAndSubFolder= true
      }
    }
    setErrorLog({ ...newErrorLog });
    let isComplitionMethod = newErrorLog.uploadAnImage ||
      newErrorLog.selectRating ||
      newErrorLog.enterData ||
      newErrorLog.yesOrNo ? false : true

      console.log("errorLog",errorLog,newErrorLog.taskName,
      ObjFormat,
        isComplitionMethod ,
        // newErrorLog.assignee ,
        isMainAndSubFolder)
    if (
      !newErrorLog.taskName &&
      !isComplitionMethod &&
      // !newErrorLog.assignee &&
      !isMainAndSubFolder

    ) {
      // console.log(ObjFormat)
      if (mainFolderId === null && subFolderId === null) {
        if (
          history?.maintaskFolderId !== null &&
          history?.subtaskFolderId !== null
        ) {
          if (
            !state?.isproof &&
            !state?.isRating &&
            !state?.isEnterData &&
            !state?.isYesOrNo
          ) {
            toast.error("Please select a Task completion method", toastCSS());
          } else if (taskName === "") {
            toast.error("Task Name is Required", toastCSS());
          } else {
            let result = await CREATE_TASK(
              ObjFormat,
              history?.maintaskFolderId,
              history?.subtaskFolderId
            );
            if (result) {
              handleClose();
              setLoading(false);
            }
          }
        } else {
          console.log("Please select a folder");
        }
      } else {
        if (
          !state?.isproof &&
          !state?.isRating &&
          !state?.isEnterData &&
          !state?.isYesOrNo
        ) {
          toast.error("Please select a Task completion method", toastCSS());
        } else if (taskName === "") {
          toast.error("Task Name is Required", toastCSS());
        } else {
          let result = await CREATE_TASK_WITHOUT_GONE_INTO_FOLDER(
            ObjFormat,
            subFolderId
          );
          if (result) {
            handleClose();
            setLoading(false);
          }
        }
      }
    } else {
      setLoading(false);
    }
  };
  const onChangeHandler = async (e) => {
    if (e.target.name === "name") {
      setTaskName(e.target.value);
    }
    const { value, name } = e.target;
    if (name === "mainfolder") {
      setMainFolderId(value);
      let selectedFolder = await taskFolderList?.filter(
        (item) => item?._id === value
      );
      if (selectedFolder?.length > 0) {
        setSelectedFolderList(selectedFolder[0]?.subFolder);
        // console.log(selectedFolder[0]?.subFolder)
        if (selectedFolder[0]?.subFolder?.length > 0) {
          setSubFolderId(selectedFolder[0]?.subFolder[0]?._id);
        } else {
          alert("This main folder have no sub folder");
        }
      } else {
        setSelectedFolderList([]);
      }
    } else {
      setPayload({ ...payload, [name]: value });
    }
  };

  useEffect(() => {
    GET_SUB_USERS_ASSIGNEE();
  }, []);

  useEffect(() => {
    // console.log(sub_users_info.length)
      let valueF = getLogedInUser()?.firstname || sub_users_info[0].firstname ;
      let valueL = getLogedInUser()?.lastname || sub_users_info[0].lastname;
      setPayload({ ...payload, assign: `${valueF} ${valueL}` });
    // }
    // else{
    //     let valueF = getLogedInUser()?.firstname ;
    //     let valueL = getLogedInUser()?.lastname;
    //     setPayload({ ...payload, assign:`${valueF} ${valueL}`});
      
    // }
  }, [sub_users_info]);

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
    setTaskType(e.target.value);
  };
  const handleDaysfilter = (e) => {
    setDaysFilter(e.target.value);
  };

  return (
    <div>
      <div className="task-header">
        <div className="d-flex justify-content-between">
          <div className="task-type-title text-bold-600 text-center ">
            <h2 style={{ color: "#0184FF" }}> Create New Task </h2>
          </div>
          <div className="close-icon">
            <X
              className="cursor-pointer"
              size={20}
              onClick={props?.handleClose}
            />
          </div>
        </div>
      </div>
      <div>
        {breadCrumbValue[0]?.subFolderName !== null ? (
          <div className="d-flex ml-1 mt-1">
            <Typography
              className="text-capitalize mb-0"
              style={{ color: "gray" }}
            >
              {breadCrumbValue[0]?.folderName} /
            </Typography>
            <Typography
              className="text-capitalize mb-0"
              style={{ paddingLeft: "5px", color: "gray" }}
            >
              {breadCrumbValue[0]?.subFolderName}
            </Typography>
          </div>
        ) : (
          ""
        )}
        <div className="task-body1 p-1 mb-2">
          <Grid spacing={2} container>
            <Grid item sm={12} md={12} lg={12}>
              <label style={{ fontSize: "15px" }}> Task Name</label>
              <Input
                name="name"
                placeholder="Task name"
                onChange={onChangeHandler}
                invalid={errorLog.taskName}
                required
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
                  onChange={onChangeHandler}
                  // invalid={errorLog.assignee}
                >
                   <option key={getLogedInUser()?._id} defaultValue>
                    {`${getLogedInUser()?.firstname} ${getLogedInUser()?.lastname} `}
                  </option>
                  {sub_users_info.map((item, i) => {
                    return (
                      <option
                        key={i}
                      >{`${item.firstname} ${item.lastname}`}</option>
                    );
                  })}
                 
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
                  // format="yyyy-MM-ddTHH:MM:SS"
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
                  className="mr-1"
                  type="select"
                  id="label"
                  name="label"
                  onChange={onChangeHandler}
                >
                  <option>Office</option>
                  <option>Personal</option>
                  <option>Event</option>
                  <option>Home</option>
                </CustomInput>
              </FormControl>
            </Grid>
          </Grid>
          {taskType === "Ongoing" ? (
            <Fragment>
              <div className="pt-2">
                <Typography>
                  <b>Repeat </b>
                </Typography>

                <div className="d-flex">
                  <Typography className="mt-1 p-0 mr-2">{"Every"}</Typography>

                  <input
                    // className='mt-1'
                    style={{
                      borderRadius: "0.4em",
                      border: "1px solid #b8c2cc",
                      width: "6em",
                      height: "2.5em",
                      marginRight: "1em",
                      marginTop: "3px",
                      paddingLeft: "10px",
                    }}
                    variant={"outlined"}
                    defaultValue={daysFilter === "Never" ? "" : 1}
                    size="small"
                    type="number"
                    name="days"
                    onChange={onChangeHandler}
                    disabled={daysFilter === "Never"}
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
                      onChange={handleDaysfilter}
                    >
                      <MenuItem value="Never">Never</MenuItem>
                      <MenuItem value="Day">Day</MenuItem>
                      <MenuItem value="Week">Week</MenuItem>
                      <MenuItem value="Month">Month</MenuItem>
                      <MenuItem value="Year">Year</MenuItem>
                    </Select>
                  </div>
                </div>
                {daysFilter === "Never" ? (
                  <div className="border m-1 d-flex justify-content-center">
                    {/* {setEndDate(startDate)} */}
                    <Typography className="mt-1">
                      {" "}
                      Never Repeat this Task{" "}
                    </Typography>
                  </div>
                ) : daysFilter === "Day" ? (
                  <div className="border m-1 d-flex justify-content-center">
                    <Typography className="mt-1">
                      {` Repeats every Day from ${moment(new Date()).format(
                        "MMM Do YYYY"
                      )} ending on ${moment(new Date()).format("MM/DD/YYYY")}`}
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
                    {Days.map((item, index2) => {
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
                    })}
                  </div>
                ) : daysFilter === "Month" ? (
                  <div className="border m-1 d-flex justify-content-center">
                    <Typography className="mt-1">
                      {` Repeats every Month on ${moment(new Date()).format(
                        "MMM Do YYYY"
                      )} ending on ${moment(new Date()).format("MM/DD/YYYY")}`}
                    </Typography>
                  </div>
                ) : daysFilter === "Year" ? (
                  <div className="border m-1 d-flex justify-content-center">
                    <Typography className="mt-1">
                      {` Repeats every Year on ${moment(new Date()).format(
                        "MMM Do YYYY"
                      )} ending on ${moment(new Date()).format("MM/DD/YYYY")}`}
                    </Typography>
                  </div>
                ) : null}
              </div>
              <div className="pt-1">
                <Typography>
                  <b>End</b>
                </Typography>
                <div className="d-flex p-0">
                  <Checkbox className="m-0" />
                  <Typography className=" p-0 mr-2">{"Never"}</Typography>
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
                          // format="yyyy-MM-ddTHH:MM:SS"
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
          {breadCrumbValue[0]?.subFolderName === null ? (
            <div className="mt-2">
              <Grid spacing={2} container>
                <Grid item sm={6} md={6} lg={6}>
                  <label style={{ fontSize: "15px" }}>TO-DO LIST</label>
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
                      name="mainfolder"
                      onChange={onChangeHandler}
                      invalid={errorLog.todoList}
                      required
                    >
                      <option>Select Main list</option>
                      {taskFolderList.map((item, i) => {
                        return (
                          <option value={item?._id} key={i}>
                            {item.folderName}
                          </option>
                        );
                      })}
                    </CustomInput>
                  </FormControl>
                </Grid>
                <Grid item sm={6} md={6} lg={6}>
                  <label style={{ fontSize: "15px" }}>SUBLIST</label>
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
                      name="subfolder"
                      invalid={errorLog.todoList}
                      required
                      onChange={(e) => setSubFolderId(e.target.value)}
                    >
                      {SelectedFolderList?.map((item, i) => {
                        return (
                          <option key={i} value={item?._id}>
                            {item.subFolderName}
                          </option>
                        );
                      })}
                    </CustomInput>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          ) : (
            <></>
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
                {errorLog.uploadAnImage &&
                  errorLog.selectRating &&
                  errorLog.enterData &&
                  errorLog.yesOrNo ? (
                  <p
                    className="mb-0 ml-1"
                    style={{ fontSize: 10, color: "red" }}
                  >
                    Please select a Task completion method.
                  </p>
                ) : ""}
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
            onClick={props?.handleClose}
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
            {loading ? (
              <CircularProgress
                style={{ color: "#fff", width: "20px", height: "20px" }}
              />
            ) : (
              <span>Save</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    breadCrumbValue: state?.TaskAndGoalsTaskReducer?.breadCrumbValue,
    sub_users_info: state.employeeSubUser.sub_users_info,
    taskFolderList: state?.TaskAndGoalsTaskReducer?.taskFolderList,
  };
};

export default connect(mapStateToProps, {
  CREATE_TASK,
  CREATE_TASK_WITHOUT_GONE_INTO_FOLDER,
  GET_SUB_USERS_ASSIGNEE,
  GET_TASK_FOLDER_LIST,
})(TaskForm);

const Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
