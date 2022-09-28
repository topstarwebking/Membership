import React, { useEffect, useState } from "react";
import {
  Card,
  Chip,
  Collapse,
  IconButton,
  TablePagination,
  Tooltip,
  Typography,
  InputBase,
} from "@material-ui/core";
import { format } from 'date-fns';
import moment from "moment";
import DateRangeIcon from "@material-ui/icons/DateRange";
import {
  FETCH_ATTENDEE_LIST,
  ATTENDENCE_STUDENTS_REMOVE,
  GET_SERACH_CLASSNAME,
  GET_SERACH_BY_DAYS,
} from "../../../redux/actions/calendar";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Delete from "@material-ui/icons/Delete";
import NestedTable from "./NestedTable";
import { FormGroup, CustomInput } from "reactstrap";
import RowSkeleton from "../../dashboard1/components/RowSkeleton";
import { Drawer } from "@material-ui/core";
import { Button } from "reactstrap"

const IsSmallDevise = window.matchMedia("(max-width:664px)").matches;

const TextOnlyTooltip = withStyles({
  tooltip: {
    color: "gray",
    backgroundColor: "#fff",
    fontSize: "12px",
    border: `2px solid rgb(109 117 141 / 10%)`,
    boxShadow: "0 12px 48px rgb(109 117 141 / 30%)",
  },
})(Tooltip);

const useStyles = makeStyles(() => ({
  cardStyle: {
    boxShadow: "0 5px 10px #e4e0e0",
    borderRadius: "8px",
  },
  avtStyle: {
    height: "30px",
    width: "30px",
  },
  inputStyle: {
    height: "3em",
    borderRadius: "0.4em",
    border: "1px solid #b8c2cc",
    "& div": {
      padding: "0px !important",
    },
  },
  row: {
    display: "grid",
    gridTemplateColumns: "200px auto auto auto",
  },
}));

const StudentAttandanceTable = (props) => {
  const classes = useStyles();
  const {
    FETCH_ATTENDEE_LIST,
    ATTENDENCE_STUDENTS_REMOVE,
    GET_SERACH_BY_DAYS,
    attendeeList,
    GET_SERACH_CLASSNAME,
    seachClass,
  } = props;
  const [collapase, setCollapse] = useState(null);
  const [pageNumber, setpageNumber] = useState(0);
  const [actionOn, setActionOn] = useState(null);
  const [sweetAlertOpen, setSweetAlertOpen] = useState(false);
  const [searchLoading, setsearchLoading] = useState(false);
  const [data, setdata] = useState([]);
  const perrows = 10;
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleFilterByday = (e) => {
    let { value } = e.target;
    let payload = {
      filter: value,
    };
    GET_SERACH_BY_DAYS(payload, pageNumber, perrows);
    setdata(seachClass);
  };
  const handlePagination = async (e, value) => {
    setpageNumber(value);
    FETCH_ATTENDEE_LIST(value);
  };

  const searchClassname = (e) => {
    let { value } = e.target;
    if (value.length > 2) {
      setsearchLoading(true);
      GET_SERACH_CLASSNAME(value, pageNumber, perrows);
      setsearchLoading(false);
    } else if (value === "") {
      FETCH_ATTENDEE_LIST(pageNumber);
    }
  };
  const handleOpenCollapse = (id) => {
    if (collapase === id) {
      setCollapse(null);
    } else {
      setCollapse(id);
    }
  };
  const handleDeleteClick = (id) => {
    setActionOn(id);
    setSweetAlertOpen(true);
  };

  const handleDeleteStudent = () => {
    ATTENDENCE_STUDENTS_REMOVE(actionOn, pageNumber);
    setSweetAlertOpen(false);
  };
  useEffect(() => {
    FETCH_ATTENDEE_LIST(0);
  }, [FETCH_ATTENDEE_LIST]);
  useEffect(() => {
    if (attendeeList !== null) {
      setdata(attendeeList?.data);
    } else if (seachClass !== null) {
      setdata(seachClass);
      setsearchLoading(false);
    }
  }, [attendeeList]);

  return (
    <div>
      <Button.Ripple
        outline
        color="primary"
        onClick={() => setOpenDrawer(true)}
        className="d-sm-block d-none mr-2"
      >
        <span className="align-middle">View Attendance History</span>
      </Button.Ripple>
      <Drawer
        anchor={"right"}
        PaperProps={{
          elevation: 0,
          style: {
            width: IsSmallDevise ? "100%" : "600px",
          },
        }}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <div className="px-1">
          {searchLoading ? (
            [1, 2, 3, 4, 5, 6].map((i) => {
              return <RowSkeleton key={i} />;
            })
          ) : (
            <>
              {/* <Card className={classes.cardStyle}> */}
              <div className="p-1 pb-0">
                <div className="d-flex justify-content-between">
                  <div className="my-1 mr-1">
                    <Typography style={{ fontSize: "1.2em" }}>
                      Attendance History
                    </Typography>
                  </div>
                  <div className="my-1 ml-1 d-flex">
                    <InputBase
                      className={`${classes.inputStyle} pl-1`}
                      fullWidth
                      type="text"
                      name="className"
                      placeholder="🔍 search"
                      onChange={searchClassname}
                    />

                    <div className="ml-1">
                      <FormGroup className="form-label-group">
                        <CustomInput
                          className={classes.inputStyle}
                          onChange={handleFilterByday}
                          required
                          type="select"
                          id="profiletype"
                          style={{ width: "100px" }}
                        >
                          <option value="Today">Today</option>
                          <option value="All">All</option>
                          <option value="Yesterday">Yesterday</option>
                          <option value="Tomorrow">Tomorrow</option>
                        </CustomInput>
                      </FormGroup>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pl-1 pr-1 pt-0">
                <div className={`${classes.row}`} style={{ backgroundColor: "#eaf4fe", padding: "10px 1rem" }}>
                  <div>
                    <b>Class</b>
                  </div>
                  <div>
                    <b>Date</b>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <b>Program</b>
                  </div>
                  <div className="text-right">
                    <b>Manage</b>
                  </div>
                </div>

                {data?.map((item, i) =>
                  <>
                    <div
                      key={i}
                      style={{ borderTop: "1px solid #dddddd" }}
                      onClick={() => handleOpenCollapse("pannel" + i)}
                    >
                      <div className={classes.row}>
                        <div className="d-flex justify-content-start align-items-center">
                          {collapase === "pannel" + i ? (
                            <ExpandLessIcon className="mr-1" />
                          ) : (
                            <ExpandMoreIcon className="mr-1" />
                          )}
                          <div title={item?.class_name}>
                            {item?.class_name}
                          </div>
                        </div>
                        <div title={item?.start_date} className="d-flex align-items-center">
                          {item?.start_date}
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                          <Chip
                            className="rounded text-white"
                            label={<b>{item?.program_name}</b>}
                            size="small"
                            style={{ background: item?.program_color }}
                          />
                        </div>

                        <div className="d-flex justify-content-end align-items-center">
                          <TextOnlyTooltip
                            arrow
                            title={
                              <div style={{ width: "200px" }}>
                                {
                                  <div>
                                    <Typography className="mb-0">
                                      <b>Class Start</b>
                                    </Typography>
                                    <div>
                                      {moment(item?.start_time).format("LLL")}
                                    </div>
                                    <Typography className="mb-0">
                                      <b>Class End</b>
                                    </Typography>
                                    <div>
                                      {moment(item.start_date).format("LLL")}
                                    </div>
                                  </div>
                                }
                              </div>
                            }
                          >
                            <div className="pl-1">
                              <DateRangeIcon color="action" />
                            </div>
                          </TextOnlyTooltip>
                          <IconButton
                            onClick={() => {
                              handleDeleteClick(item?._id);
                            }}
                          >
                            <Delete fontSize="normal" />
                          </IconButton>
                        </div>
                      </div>
                      <Collapse in={collapase === "pannel" + i}>
                        <div className="p-1">
                          <NestedTable data={item?.attendence} />
                        </div>
                      </Collapse>
                    </div>

                  </>
                )}
                <center>
                  <TablePagination
                    component="div"
                    count={attendeeList?.totalCount || 0}
                    page={pageNumber}
                    onPageChange={handlePagination}
                    rowsPerPage={10}
                    rowsPerPageOptions={[]}
                  />
                </center>
              </div>
              {/* </Card> */}
            </>
          )}
          <SweetAlert
            title="Are you sure?"
            warning
            show={sweetAlertOpen}
            showCancel
            reverseButtons
            cancelBtnBsStyle="danger"
            confirmBtnText="Yes, Delete"
            cancelBtnText="Cancel"
            onConfirm={handleDeleteStudent}
            onCancel={() => {
              setSweetAlertOpen(false);
            }}
          >
            Are you sure you want to delete?
          </SweetAlert>
        </div>
      </Drawer>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    attendeeList: state.calendar.attendeeList,
    seachClass: state.calendar.seachClass,
  };
};

export default connect(mapStateToProps, {
  FETCH_ATTENDEE_LIST,
  GET_SERACH_CLASSNAME,
  ATTENDENCE_STUDENTS_REMOVE,
  GET_SERACH_BY_DAYS,
})(StudentAttandanceTable);
