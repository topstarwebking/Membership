import React, { useEffect, useState } from "react";
import { Chip, withStyles, Tooltip, TablePagination } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { FormGroup, CustomInput } from "reactstrap";
import DialogTitle from "@material-ui/core/DialogTitle";
import DateRangeIcon from "@material-ui/icons/DateRange";
import SweetAlert from "react-bootstrap-sweetalert";
import { ButtonGroup } from "reactstrap";
import {
  DELETE_APPOINTMENT_OR_EVENT,
  UPDATE_APPOINTMENT,
  FETCH_EVENTS_OR_APPOINMENT,
} from "../../../../redux/actions/appointment";
import { connect } from "react-redux";
import { Info } from "react-feather";
import RowSkeleton from "../../../dashboard1/components/RowSkeleton";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import EditAndDeleteEventOrAppt from "./EditAndDeleteEventOrAppt";
const TextOnlyTooltip = withStyles({
  tooltip: {
    color: "gray",
    backgroundColor: "#fff",
    fontSize: "12px",
    border: `2px solid rgb(109 117 141 / 10%)`,
    boxShadow: "0 12px 48px rgb(109 117 141 / 30%)",
  },
})(Tooltip);

const ListOfEventAndAppointment = (props) => {
  const [defaultAlert, setdefaultAlert] = useState(false);
  const [loading, setloading] = useState(true);
  const [tabsActive, setActiveTab] = useState("event");
  const [pageNumber, setpageNumber] = useState(0);
  const [defaultAlert2, setdefaultAlert2] = useState(false);
  const [data, setdata] = useState(null);
  const rowsPerPage = 10;
  const [id, setId] = useState(null);
  const [item, setitems] = useState(null);
  const {
    filterbydata,
    DELETE_APPOINTMENT_OR_EVENT,
    gobackdata,
    getEvent_or_ApppoitnmentBy_cetegory,
    handleCloseOpen,
    isEdit,
  } = props;
  const confirmAnswer = () => {
    setdefaultAlert(false);
    props.UPDATE_APPOINTMENT(
      { status: !item?.status },
      id,
      pageNumber,
      10,
      tabsActive
    );
  };
  
  const handleDefalt = (item) => {
    setdefaultAlert2(true);
    setId(item);
  };
  const ConFirmDelete = (id) => {
    DELETE_APPOINTMENT_OR_EVENT(id);
    setdefaultAlert2(false);

  };

  const handleAlert = (item) => {
    setdefaultAlert(true);
    setId(item?._id);
    setitems(item);
  };
  const handlePagination = async (e, value) => {
    setpageNumber(value);
    gobackdata(pageNumber, rowsPerPage, tabsActive);
    setloading(false);
  };
  useEffect(() => {
    setloading(true);
    if (getEvent_or_ApppoitnmentBy_cetegory === null) {
      gobackdata(pageNumber, 10, tabsActive);
      setdata(getEvent_or_ApppoitnmentBy_cetegory);
    } else {
      setloading(false);
    }
  }, [
    gobackdata,
    getEvent_or_ApppoitnmentBy_cetegory,
    pageNumber,
    data,
    tabsActive,
  ]);

  const handleActivetab = async (value) => {
    setloading(true);
    await setActiveTab(value);
    await gobackdata(pageNumber, rowsPerPage, value);
    setloading(false);
  };
  const handleFilterByday = async (e) => {
    let { value } = e.target;
    await setloading(true);
    await filterbydata(tabsActive, pageNumber, rowsPerPage, value);
    await setloading(false);
  };
  return (
    <div>
      <div className="p-1 d-flex justify-content-between">
        <div>
          <ButtonGroup>
            <button
              className={`btn ${
                tabsActive === "event"
                  ? "btn-primary"
                  : "btn-outline-primary text-primary"
              }`}
              onClick={() => {
                handleActivetab("event");
              }}
            >
              Event
            </button>
            <button
              className={`btn ${
                tabsActive === "appointment"
                  ? "btn-primary"
                  : "btn-outline-primary text-primary"
              }`}
              onClick={() => {
                handleActivetab("appointment");
              }}
            >
              Appointment
            </button>
          </ButtonGroup>
        </div>

        <FormGroup className="form-label-group">
          <CustomInput
            onChange={handleFilterByday}
            required
            type="select"
            id="profiletype"
            style={{ cursorL: "pointer" }}
          >
            <option value="Today">Today</option>
            <option value="Tomorrow">Tomorrow</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
          </CustomInput>
        </FormGroup>
      </div>
      {loading ? (
        [1, 2, 3, 4, 5, 6, 7].map((i) => {
          return <RowSkeleton key={i} />;
        })
      ) : (
        <TableContainer>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "center" }}>
                  <b>Date</b>
                </TableCell>
                <TableCell align="left">
                  <b>Name</b>
                </TableCell>
                <TableCell align="left">
                  <b>Type</b>
                </TableCell>
                {/* <TableCell>
                  <b>Attendee</b>
                </TableCell>
                <TableCell>
                  <b>Status</b>
                </TableCell>
                <TableCell>
                  <b>Notes</b>
                </TableCell> */}
                <TableCell>
                  <b>Manage</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getEvent_or_ApppoitnmentBy_cetegory?.data?.map((Map_item) => (
                <TableRow
                  key={Map_item?._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  
                  <TableCell style={{ textAlign: "center" }}>
                    {moment(
                      `${Map_item?.start}`
                    ).format("MM/DD/YYYY")}
                    <br />
                    {moment(
                      `${Map_item?.start_time}`
                    ).format("hh:mm A")}
                    {/* <TextOnlyTooltip
                      arrow
                      title={
                        <div style={{ width: "200px" }}>
                          <div>
                            <div>
                              <b>Start </b>
                              <span>
                                {moment(
                                  `${Map_item?.start} ${Map_item?.start_time}`
                                ).format("MM/DD/YYYY, hh:mm A")}
                              </span>
                            </div>
                            <div>
                              <b>End </b>
                              <span>
                                {moment(
                                  `${Map_item?.end} ${Map_item?.end_time}`
                                ).format("MM/DD/YYYY, hh:mm A")}
                              </span>
                            </div>
                          </div>
                        </div>
                      }
                    >
                      <DateRangeIcon color="action" />
                    </TextOnlyTooltip> */}
                  </TableCell>
                  <TableCell>{Map_item?.title}</TableCell>
                  <TableCell>{Map_item?.appointment_type}</TableCell>
                  {/* <TableCell align="left">
                    <TextOnlyTooltip
                      arrow
                      title={
                        <div style={{ width: "200px" }}>
                          <div>
                            <div>
                              {Map_item?.groupInfoList.length > 0 ? (
                                <div>
                                  <b>Smartlist </b>
                                  <br></br>
                                  {Map_item?.groupInfoList?.map(
                                    (smartlist, index) => {
                                      return (
                                        <span key={index}>{smartlist}</span>
                                      );
                                    }
                                  )}
                                </div>
                              ) : Map_item?.studentInfo.length > 0 ? (
                                <div>
                                  <b>Student </b>
                                  <br></br>
                                  {Map_item?.studentInfo?.map(
                                    (student, index) => {
                                      return (
                                        <span key={index}>
                                          {`${student?.firstName} ${student?.fullName}`}
                                        </span>
                                      );
                                    }
                                  )}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      }
                    >
                      <div>
                        <img
                          src="/images/idea-icons.png"
                          size="small"
                          style={{
                            height: "1.5em",
                            widht: "1.5em",
                            objectFit: "contain",
                          }}
                          alt="idea icon"
                        />
                      </div>
                    </TextOnlyTooltip>
                  </TableCell>
                  <TableCell align="left">
                    <Chip
                      style={{
                        marginRight: "1px",
                        background:
                          Map_item?.status === true ? "#def8e7" : "#f9d2d0",
                        color:
                          Map_item?.status === true ? "#55a65b" : "#e05252",
                        fontWeight: "bold",
                        fontSize: "0.9em",
                      }}
                      size="small"
                      label={
                        Map_item?.status === true
                          ? "Completed"
                          : "Not Completed"
                      }
                      onClick={() => {
                        handleAlert(Map_item);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextOnlyTooltip
                      arrow
                      title={
                        <div style={{ width: "200px" }}>
                          <b>Note: </b> {Map_item?.notes}
                        </div>
                      }
                    >
                      <Info size={18} style={{ margin: "1em" }} />
                    </TextOnlyTooltip>
                  </TableCell> */}
                  <TableCell>
                    <EditAndDeleteEventOrAppt
                      OpenAlert={handleDefalt}
                      item={Map_item}
                      handleCloseOpen={handleCloseOpen}
                      isEdit={isEdit}
                      perpage={pageNumber}
                      perrows={10}
                      cetogary={tabsActive}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <center>
            <TablePagination
              component="div"
              count={getEvent_or_ApppoitnmentBy_cetegory?.totalCount || 0}
              page={pageNumber}
              onPageChange={handlePagination}
              rowsPerPage={10}
              rowsPerPageOptions={[]}
            />
          </center>
        </TableContainer>
      )}

      <Dialog
        open={defaultAlert}
        onClose={() => {
          setdefaultAlert(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div className="d-flex">
            <div className="mt-1">
              <CheckCircleOutlineIcon
                style={{
                  color: item?.status === true ? "#e05252" : "#55a65b",
                  marginTop: "0.2em",
                }}
              />
            </div>
            <div className="m-1" style={{ fontSize: "1.2em" }}>{`Mark As ${
              item?.status ? "Not Completed" : "Completed"
            }`}</div>
          </div>{" "}
        </DialogTitle>
        <DialogActions>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              setdefaultAlert(false);
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              confirmAnswer();
            }}
            className="btn btn-success"
          >
            Yes
          </button>
        </DialogActions>
      </Dialog>
      <SweetAlert
        title="Are you sure?"
        warning
        show={defaultAlert2}
        showCancel
        reverseButtons
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, Delete"
        cancelBtnText="Cancel"
        onConfirm={() => {
          ConFirmDelete(id);
        }}
        onCancel={() => {
          setdefaultAlert2(false);
        }}
      >
        Are you sure you want to delete?
      </SweetAlert>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    getEvent_or_ApppoitnmentBy_cetegory:
      state.appointmentAndEvent.getEvent_or_ApppoitnmentBy_cetegory,
    getsearchappoinmnt: state.appointmentAndEvent.getsearchappoinmnt,
  };
};

export default connect(mapStateToProps, {
  DELETE_APPOINTMENT_OR_EVENT,
  UPDATE_APPOINTMENT,
  FETCH_EVENTS_OR_APPOINMENT,
})(ListOfEventAndAppointment);
