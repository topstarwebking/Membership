import moment from "moment";
import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import {
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  CustomInput,
  Button,
} from "reactstrap";
import { RRule, RRuleSet } from "rrule";
import {
  ADD_APPOINTMENT_OR_EVENT,
  UPDATE_APPOINTMENT,
} from "../../../../redux/actions/appointment";
import {
  Select,
  MenuItem,
  Chip,
  makeStyles,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import SelectStudent from "./autoCompleteStudent";
import { Typography } from "@material-ui/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles(() => ({
  makeActive: {
    background: "#eaf4fe",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
  },
  inactive: {
    background: "#fff",
  },
  activeChip: {
    color: "#486eaf",
    widht: "100%",
    fontWeight: "bold",
  },
  activeChipNone: {
    color: "none",
    background: "none",
  },
  daysactivation: {
    color: "#40a7e1",
    border: "1px solid #40a7e1",
  },
  daysNonactive: {
    color: "black",
  },
  styleSelect: {
    "& div": { padding: "10px" },
  },
}));

const FormToAddIncalendar = (props) => {
  const {
    handleDrawerClose,
    appointmentCategoryList,
    isEdit,
    perpage,
    perrows,
    cetogary,
    actionOnEvent,
  } = props;
  const [payload, setPayload] = useState({
    start_time: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    end_time: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    start: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    end: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    app_color: "#ff3f00",
    repeatedDates: [],
    repeatedConcurrence: "Never",
    interval: 1,
    range: 1,
    appointment_type: "event",
    days: ["Sunday"],
  });
  const classes = useStyles();
  const [checked2, setChecked2] = React.useState(0);
  const [selectedDays, setSelectedDays] = React.useState(["Sunday"]);
  const [ProcessStart, setProcessStart] = useState(false);
  const handleDaysfilter = (e) => {
    const { value } = e.target;
    setChecked2(value);
    setPayload({
      ...payload,
      repeatedConcurrence: value,
      repeatedDates: [],
    });
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };
  const SelectSingleStudent = (e, value) => {
    setPayload({ ...payload, studentInfo: [value] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let tempPayload = {
      ...payload,
    };
    let start = moment(payload.start).format("YYYY-MM-DD");
    let end = moment(payload.end).format("YYYY-MM-DD");
    const startdate = start.split("-");
    const [startyear, startmont, startday] = startdate;
    const enddate = end.split("-");
    const [endtyear, endmonth, endtday] = enddate;
    var data = [];
    if (start === end) {
      if (checked2 === "Week") {
        function ref(selectedDays) {
          for (let item of selectedDays) {
            data.push(RRule[item.slice(0, 2)?.toUpperCase()]);
          }
          return data;
        }
        const hel = ref(selectedDays);
        const rule = new RRule({
          freq: RRule.WEEKLY,
          interval: payload.interval,
          byweekday: hel,
          dtstart: new Date(
            Date.UTC(Number(startyear), Number(startmont), Number(startday))
          ),
          until: new Date(
            Date.UTC(Number(endtyear), Number(endmonth), Number(endtday))
          ),
        });
        tempPayload.repeatedDates = rule.all();
        tempPayload.repeatedConcurrence = checked2;
      } else if (checked2 === "Month") {
        const rruleSet = new RRuleSet();
        rruleSet.rrule(
          new RRule({
            freq: RRule.MONTHLY,
            interval: payload.interval,
            dtstart: new Date(
              Date.UTC(Number(startyear), Number(startmont), Number(startday))
            ),
            until: new Date(
              Date.UTC(Number(endtyear), Number(endmonth), Number(endtday))
            ),
          })
        );
        tempPayload.repeatedDates = rruleSet.all();
        tempPayload.repeatedConcurrence = checked2;
      } else if (checked2 === "Year") {
        const rruleSet = new RRuleSet();
        rruleSet.rrule(
          new RRule({
            freq: RRule.YEARLY,
            interval: payload.interval,
            dtstart: new Date(
              Date.UTC(Number(startyear), Number(startmont), Number(startday))
            ),
            until: new Date(
              Date.UTC(Number(endtyear), Number(endmonth), Number(endtday))
            ),
          })
        );
        tempPayload.repeatedDates = rruleSet.all();
        tempPayload.repeatedConcurrence = checked2;
      } else if (checked2 === "Day") {
        const rule = new RRule({
          freq: RRule.DAILY,
          interval: payload.interval,
          dtstart: new Date(
            Date.UTC(Number(startyear), Number(startmont), Number(startday))
          ),
          until: new Date(
            Date.UTC(Number(endtyear), Number(endmonth), Number(endtday))
          ),
        });
        tempPayload.repeatedDates = rule.all();
        tempPayload.repeatedConcurrence = checked2;
      }
    } else if (checked2 === "Week") {
      function ref(selectedDays) {
        for (let item of selectedDays) {
          data.push(RRule[item.slice(0, 2)?.toUpperCase()]);
        }
        return data;
      }
      const hel = ref(selectedDays);
      const rule = new RRule({
        freq: RRule.WEEKLY,
        interval: payload.interval,
        byweekday: hel,
        dtstart: new Date(
          Date.UTC(Number(startyear), Number(startmont), Number(startday))
        ),
        until: new Date(
          Date.UTC(Number(endtyear), Number(endmonth), Number(endtday))
        ),
      });
      tempPayload.repeatedDates = rule.all();
      tempPayload.repeatedConcurrence = checked2;
    } else if (checked2 === "Month") {
      const rruleSet = new RRuleSet();
      rruleSet.rrule(
        new RRule({
          freq: RRule.MONTHLY,
          interval: payload.interval,
          dtstart: new Date(
            Date.UTC(Number(startyear), Number(startmont), Number(startday))
          ),
          until: new Date(
            Date.UTC(Number(endtyear), Number(endmonth), Number(endtday))
          ),
        })
      );
      tempPayload.repeatedDates = rruleSet.all();
      tempPayload.repeatedConcurrence = checked2;
    } else if (checked2 === "Year") {
      const rruleSet = new RRuleSet();
      rruleSet.rrule(
        new RRule({
          freq: RRule.YEARLY,
          interval: payload.interval,
          dtstart: new Date(
            Date.UTC(Number(startyear), Number(startmont), Number(startday))
          ),
          until: new Date(
            Date.UTC(Number(endtyear), Number(endmonth), Number(endtday))
          ),
        })
      );
      tempPayload.repeatedDates = rruleSet.all();
      tempPayload.repeatedConcurrence = checked2;
    } else if (checked2 === "Day") {
      const rule = new RRule({
        freq: RRule.DAILY,
        interval: payload.interval,
        dtstart: new Date(
          Date.UTC(Number(startyear), Number(startmont), Number(startday))
        ),
        until: new Date(
          Date.UTC(Number(endtyear), Number(endmonth), Number(endtday))
        ),
      });
      tempPayload.repeatedDates = rule.all();
      tempPayload.repeatedConcurrence = checked2;
    } else {
      const data = [];
      const utcDate1 = new Date(
        Date.UTC(Number(startyear), Number(startmont), Number(startday))
      );
      data.push(utcDate1);
      tempPayload.repeatedDates = data;
      tempPayload.repeatedConcurrence = checked2;
    }
    tempPayload.start = moment(tempPayload?.start).format("MM-DD-YYYY");
    tempPayload.end = moment(tempPayload?.start).format("MM-DD-YYYY");
    setProcessStart(true);
    await apiCall(tempPayload);
  };
  const HandleDays = (value) => {
    let arr = selectedDays;
    if (selectedDays?.includes(value)) {
      let dayAfterRm = arr?.filter((item) => item !== value);
      setSelectedDays(dayAfterRm);
    } else {
      setSelectedDays([...arr, value]);
    }
    setPayload({
      ...payload,
      days: selectedDays,
    });
  };
  useEffect(() => {
    if (actionOnEvent !== null || undefined) {
      if (isEdit) {
        setPayload({
          ...actionOnEvent,
        });
      } else {
        setPayload({
          ...payload,
          start: actionOnEvent?.start,
          end: actionOnEvent?.end,
        });
      }
    }
  }, [actionOnEvent]);

  const apiCall = async (tempPayload) => {
    if (isEdit) {
      let res = await props.UPDATE_APPOINTMENT(
        tempPayload,
        actionOnEvent?._id,
        perpage,
        perrows,
        cetogary
      );
      if (res) {
        setProcessStart(false);
      }
    } else {
      let res = await props.ADD_APPOINTMENT_OR_EVENT(tempPayload);
      if (res) {
        setProcessStart(false);
      }
    }
    handleDrawerClose();
    setProcessStart(false);
  };
  const handleDateChange = (value, name) => {
    if (name === "start_date") {
      setPayload({ ...payload, start: value, start_time: value });
    } else {
      setPayload({ ...payload, end: value, end_time: value });
    }
  };
  return (
    <div className="p-1">
      <h3>{isEdit ? "Edit" : "Add"}</h3>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col sm="10" md="10" lg="10">
            <FormGroup>
              <Label htmlFor="EventTitle">Event Title</Label>
              <Input
                type="text"
                id="EventTitle"
                placeholder="Event Title"
                required
                value={payload?.title}
                name="title"
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col sm="" md="" lg="">
            <FormGroup style={{ padding: "0px" }}>
              <Label htmlFor="colorFloating">Color</Label>
              <Input
                name="app_color"
                onChange={handleChange}
                value={payload?.app_color}
                type="color"
                id="colorFloating"
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="12" lg="12">
            <FormGroup>
              <Fragment>
                <Label htmlFor="selectinvite">Invite</Label>
                <SelectStudent
                  item={actionOnEvent}
                  handleSelect={SelectSingleStudent}
                  keyName="firstName"
                />
              </Fragment>
            </FormGroup>
          </Col>
          <Col sm="6" md="6" lg="6">
            <FormGroup>
              <Label htmlFor="category">Category</Label>
              <CustomInput
                type="select"
                name="category"
                required
                value={payload?.category}
                onChange={handleChange}
                id="category"
              >
                <option value="">Select One</option>
                <option value="event">Event</option>
                <option value="appointment">Appointment</option>
              </CustomInput>
            </FormGroup>
          </Col>
          <Col sm="6" md="6" lg="6">
            <FormGroup>
              <Label htmlFor="EventAppType">Type</Label>
              <CustomInput
                type="select"
                id="appointment_type"
                name="appointment_type"
                required
                value={payload?.appointment_type}
                onChange={handleChange}
              >
                <option value="">Select One</option>
                {appointmentCategoryList
                  .filter((item) => item?.category === payload?.category)
                  ?.map((item, i) => (
                    <option key={i} defaultValue={item.app_event_name}>
                      {item.app_event_name}
                    </option>
                  ))}
              </CustomInput>
            </FormGroup>
          </Col>
          <Col sm="6" md="6" lg="6">
            <FormGroup className="m-0">
              <Label htmlFor="startDate">Start Date & time</Label>
              <DatePicker
                selected={payload.start}
                onChange={(date) => {
                  handleDateChange(date, "start_date");
                }}
                showTimeSelect
                required
                id="startDate"
                name="start_date"
                className="form-control"
                dateFormat="MM/d/yyyy h:mm a"
              />
            </FormGroup>
          </Col>
          <Col sm="6" md="6" lg="6">
            <FormGroup className="m-0">
              <Label htmlFor="startDate">End Date & time</Label>
              <DatePicker
                selected={payload.end}
                onChange={(date) => {
                  handleDateChange(date, "end_date");
                }}
                showTimeSelect
                id="endDate"
                name="endDate"
                required
                className="form-control"
                dateFormat="MM/d/yyyy h:mm a"
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="12" lg="12" >
            <div >
              <Typography className="mt-1 mr-1">
                <b>Repeat</b>
              </Typography>
              <div className="d-flex">
                <Typography className="mt-1  mx-2">Every</Typography>
                <input
                  style={{
                    borderRadius: "0.4em",
                    border: "1px solid #b8c2cc",
                    width: "6em",
                    height: "3em",
                    marginRight: "1em",
                    backgroundColor: payload?.repeatedConcurrence === "Never" ? "#dddddd": "#fff"
                  }}
                  variant={"outlined"}
                  size="small"
                  type="number"
                  name="days"
                  disabled={payload?.repeatedConcurrence === "Never"}
                  defaultValue={payload?.repeatedConcurrence === "Never"? "" : payload?.interval}
                  onChange={(e) => {
                    setPayload({
                      ...payload,
                      interval: e.target.value,
                    });
                  }}
                />
                <div
                  style={{
                    borderRadius: "0.4em",
                    height: "3em",
                    border: "1px solid #b8c2cc",
                    width: "50%",
                  }}
                >
                  <Select
                    fullWidth
                    variant="outlined"
                    className={classes.styleSelect}
                    name="repeatedConcurrence"
                    required
                    value={payload?.repeatedConcurrence}
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
            </div>
            <br></br>

          </Col>
          <Col sm="12" md="12" lg="12">
            {checked2 === "Week" ? (
              <div className="border">
                {Days.map((item, index2) => {
                  return (
                    <Chip
                      key={index2}
                      label={item}
                      variant="outlined"
                      size="small"
                      style={{ margin: "0.5em" }}
                      className={
                        selectedDays.includes(item)
                          ? classes.daysactivation
                          : classes.daysNonactive
                      }
                      onClick={() => {
                        HandleDays(item);
                      }}
                    />
                  );
                })}
              </div>
            ): null}
            {payload?.repeatedConcurrence === "Month" ? (
              <div className="border mx-1 d-flex justify-content-center">
                <Typography className="my-1">
                  {` Repeats every ${payload?.repeatedConcurrence
                    } on the ${moment(payload?.start).format(
                      "MMM Do YYYY"
                    )} ending on ${moment(payload?.end).format("MM/DD/YYYY")}`}
                </Typography>
              </div>
            ) : payload?.repeatedConcurrence === "Year" ? (
              <div className="border mx-1 d-flex justify-content-center">
                <Typography className="my-1">
                  {` Repeats every ${payload?.repeatedConcurrence
                    } on the ${moment(payload?.start).format(
                      "MMM Do YYYY"
                    )} ending on ${moment(payload?.end).format("MM/DD/YYYY")}`}
                </Typography>
              </div>
            ) : payload?.repeatedConcurrence === "Day" ? (
              <div className="border mx-1 d-flex justify-content-center">
                <Typography className="my-1">
                  {` Repeats every ${payload?.repeatedConcurrence
                    } from ${moment(payload?.start).format(
                      "MMM Do YYYY"
                    )} ending on ${moment(payload?.end).format("MM/DD/YYYY")}`}
                </Typography>
              </div>
            ) : payload?.repeatedConcurrence === "Never" ? (
              <div className="border mx-1 d-flex justify-content-center">
                <Typography className="my-1">
                  Never Repeat This Event
                </Typography>
              </div>
            ) : null}
          </Col>
          <Col></Col>
          <Col sm="12" md="12" lg="12">
            <FormGroup className='mt-2 mb-0'>
              <Label htmlFor="exampleTime">Notes</Label>
              <Input
                type="textarea"
                className="form-control"
                name="notes"
                value={payload?.notes}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col sm="12" md="12" lg="12">
            <div className="d-flex justify-content-end ">
              <Button
                className="m-1"
                outline
                type="submit"
                color="secondary"
                onClick={handleDrawerClose}
              >
                Back
              </Button>
              <Button.Ripple color="primary" className="m-1">
                {ProcessStart ? (
                  <CircularProgress size={"small"} />
                ) : (
                  <b>{isEdit ? `UPDATE` : `Add Event`}</b>
                )}
              </Button.Ripple>
            </div>
          </Col>
        </Row>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    appointmentCategoryList: state.appointmentAndEvent.appointmentCategoryList,
  };
};

export default connect(mapStateToProps, {
  ADD_APPOINTMENT_OR_EVENT,
  UPDATE_APPOINTMENT,
})(FormToAddIncalendar);
const Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
