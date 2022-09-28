import React, { useEffect, useMemo } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { Chip, FormGroup, makeStyles } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { Button, Col, CustomInput, Row, Input, Label } from "reactstrap";
import moment from "moment";

const useStyles = makeStyles(() => ({
  inputStyle: {
    marginBottom: "10px",
    borderRadius: "0.4em",
    width: "100%",
    height: "2.8rem",
    border: "1px solid #b8c2cc",
    "& div": {
      padding: "0px !important",
    },
  },
  ActivationUpon: {
    color: "#2796f3",
    fontWeight: "bold",
    marginRight: "10px",
    borderRadius: "6px !important",
  },
  BeforAfter: {
    margin: "10px",
  },
  styleforChip: {
    flex: 1,
    display: "flex",
    borderRadius: "4px",
    height: "3.3em",
    background: "#ebf3ff",
  },
}));
export default function ActivationUpon(props) {
  const {
    value = null,
    templatePayload,
    setTemplatePayload,
    dateAndtime,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    immediately: true,
    days: 0,
    days_type: "after",
  });

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (value) {
      setState({ ...state, ...value });
    }
  }, [value]);

  const handleClose = () => {
    setOpen(false);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit();
    setOpen(false);
  };
  return (
    <div style={{ minWidth: 150 }}>
      <Chip
        onClick={handleClickOpen}
        className={classes.styleforChip}
        label={
          <span style={{ widht: "100%" }}>
            {templatePayload.immediately ? (
              "Immediately"
            ) : (
              <>
                {dateAndtime.sent_date ? (
                  <span>
                    {`${moment(dateAndtime.sent_date).format(
                      "MM/DD/YYYY"
                    )} ${moment(dateAndtime.sent_time).format(
                      "MM/DD/YYYY LT"
                    )}`}
                  </span>
                ) : (
                  <span>Schedule</span>
                )}
              </>
            )}
            <DateRangeIcon color="action"></DateRangeIcon>
          </span>
        }
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ width: "100%" }}
      >
        <form
          onSubmit={(e) => {
            HandleSubmit(e);
          }}
        >
          <DialogContent>
            <Row>
              <Col item sm={12}>
                <span>By Criteria Met</span>
              </Col>
              <Col item xs={12}>
                <FormGroup
                  className="mt-1"
                  style={{
                    opacity: !templatePayload.immediately ? 0.6 : null,
                  }}
                >
                  <CustomInput
                    onChange={(e) => {
                      setTemplatePayload({
                        ...templatePayload,
                        immediately: !templatePayload.immediately,
                      });
                    }}
                    type="checkbox"
                    label="Send immediately upon entry into system"
                    id="sendImididately"
                    name="sendImididately"
                    checked={templatePayload.immediately}
                  />
                </FormGroup>

                <div
                  className="d-flex flex-column mt-2"
                  style={{
                    opacity: templatePayload.immediately ? 0.6 : null,
                  }}
                >
                  <CustomInput
                    onChange={(e) => {
                      setTemplatePayload({
                        ...templatePayload,
                        immediately: !templatePayload.immediately,
                      });
                    }}
                    type="checkbox"
                    label="After criteria met send email based on rule below"
                    id="sendImididately"
                    name="sendImididately"
                    className="mb-1"
                    checked={!templatePayload.immediately}
                  />
                  <div
                    className="d-flex align-items-center"
                    style={{
                      pointerEvents: templatePayload.immediately
                        ? "none"
                        : "auto",
                    }}
                  >
                    <FormGroup className="d-flex flex-column flex-1">
                      <Label>Enter days</Label>
                      <Input
                        type="number"
                        required
                        label={"Enter days"}
                        defaultValue={0}
                        placeholder="days"
                        name="selectinvite"
                        id="selectinvite"
                        onChange={(e) => {
                          setTemplatePayload({
                            ...templatePayload,
                            days: e.target.value,
                          });
                        }}
                        value={state.days}
                        style={{ width: 100, textAlign: "center" }}
                      />
                    </FormGroup>

                    <span
                      className="d-flex flex-1 mx-2 pt-1"
                      style={{ fontSize: 12 }}
                    >
                      days
                    </span>

                    <FormGroup className="mr-1 d-flex flex-1 flex-column ">
                      <Label>Select One</Label>
                      <CustomInput
                        type="select"
                        required
                        name="selectinvite"
                        id="selectinvite"
                        className=""
                        onChange={(e) => {
                          setState({ ...state, days_type: e.target.value });
                          setTemplatePayload({
                            ...templatePayload,
                            days_type: e.target.value,
                          });
                        }}
                        style={{ width: 100 }}
                      >
                        <option
                          selected={state.days_type === "before"}
                          value="before"
                        >
                          Before
                        </option>
                        <option
                          selected={state.days_type === "after"}
                          value="after"
                        >
                          After
                        </option>
                      </CustomInput>
                    </FormGroup>

                    <span
                      className="d-flex flex-1 mx-2 pt-1"
                      style={{ fontSize: 12 }}
                    >
                      criteria is met on
                    </span>

                    <FormGroup>
                      <Label>Select time</Label>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                          margin="normal"
                          id="time-picker"
                          style={{
                            borderRadius: "0.4em",
                            border: "1px solid #b8c2cc",
                            height: "2.8em",
                            padding: "5px",
                            margin: "0px",
                            width: 130,
                            textAlign: "center",
                          }}
                          value={dateAndtime.sent_time}
                          onChange={(date) => {
                            state.sent_time = moment(date).format("h:mm:ss a");
                            setState({ ...state });
                            props.handleDateChange(date, "sent_time");
                          }}
                          KeyboardButtonProps={{
                            "aria-label": "change time",
                          }}
                          InputProps={{
                            disableUnderline: true,
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </FormGroup>
                  </div>
                </div>
              </Col>
            </Row>
          </DialogContent>
          <div className="d-flex justify-content-between p-1">
            <Button outline onClick={handleClose} color="secondary">
              Cancel
            </Button>

            <Button color="primary" type="submit">
              Apply
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
