import React, { useState, useEffect } from "react";
import {
  Typography,
  Chip,
  Card,
  TablePagination,
  Avatar,
  makeStyles,
} from "@material-ui/core";
import moment from "moment";
import { Link } from "react-router-dom";
import StudentlistuserEyeModal from "../../../dashboard1/StudentlistuserEyeModal";
import { RowSkeleton } from "../../../apps/user/list/components/studentTable"
import NoDataImage from "../../../../assets/img/nodatafound.png";

const useStyles = makeStyles(() => ({
  cardStyle: {
    boxShadow: "none",
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
    gridTemplateColumns: " 20% 15% 10% 10% 10% 15% 15% 5%",
  },
}));

const BirthdyaTable = (props) => {
  const classes = useStyles();
  const [pageNumber, setpageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { rowdata, gobackdata, GetMoreNewData, studentType, Tabsvalue, loading, tillDate } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (rowdata === null) {
      setData(null)
    } else {
      setData(rowdata);
    }
  }, [rowdata]);

  const handlePagination = (e, value) => {
    setData(null);
    setpageNumber(value);
    setRowsPerPage(10);
    GetMoreNewData(value, rowsPerPage, studentType, Tabsvalue);
  };

  const changeHandler = (date) => {
    if (date !== undefined) {
      var dob = new Date(date).getFullYear();
      var current = new Date().getFullYear();
      return current - dob;
    }
  };

  useEffect(() => {
    if (studentType === "All") {
      GetMoreNewData(pageNumber, rowsPerPage);
    } else {
      GetMoreNewData(pageNumber, rowsPerPage, studentType, Tabsvalue);
    }
  }, [studentType, GetMoreNewData]);


  const getRatingColor = (DaysLeft) => {
    if (DaysLeft >= 0 && DaysLeft <= 7) {
      return "#60aa0ed4"; // green
    } else if (DaysLeft >= 8 && DaysLeft <= 14) {
      return "#ffc107"; // yellow
    } else if (DaysLeft === 0) {
      return "gray";
    } else {
      return "#ff3f00";
    }
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value)
    GetMoreNewData(e, e.target.value, studentType, Tabsvalue);
  }

  return (
    <div>
      <Card className={classes.cardStyle}>
        <div className="pl-1 pr-1 pt-0">
          <div className={`p-1 pt-0 ${classes.row} border-bottom`}>
            <div className="d-flex justify-content-Start">
              <b>Full Name</b>
            </div>
            <div className="d-flex justify-content-Start ml-2">
              <b>Status</b>
            </div>
            <div className="d-flex justify-content-Start">
              <b>Dob</b>
            </div>

            <div className="d-flex justify-content-Start">
              <b>Days Left</b>
            </div>
            <div className="d-flex justify-content-Start">
              <b>Age</b>
            </div>
            <div className="d-flex justify-content-start">
              <b>Last Contacted</b>
            </div>
            <div className="d-flex justify-content-Start">
              <b>Notes</b>
            </div>
            <div className="d-flex justify-content-center">
              <b>Manage</b>
            </div>
          </div>


          {
            loading ? [1, 2, 3, 4, 5].map((i) => {
              return <RowSkeleton key={i} />
            }) : (

              data?.data.length > 0 ? (
                data?.data.map((item, i) => {
                  return (
                    <div key={item?._id}>
                      <div
                        key={item?._id}
                        style={{ borderBottom: "1px solid #dddddd" }}
                        className="p-1"
                      >
                        <div className={classes.row}>
                          <div className="d-flex justify-content-start align-items-center">
                            {/* <Avatar
                          sr={item?.memberprofileImage}
                          alt={item?.firstName}
                          style={{ height: "1.5em", width: "1.5em" }}
                        /> */}
                            <div className=" d-flex align-items-center">
                              <Link to={`/student-info/${item._id}`}>
                                <Typography
                                  className="m-0 pl-0"
                                  color="textSecondary"
                                >
                                  {item?.firstName} {item?.lastName}
                                </Typography>
                              </Link>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-start">
                            {
                              <Chip
                                size="small"
                                label={
                                  item?.status.toLowerCase() === "inactive"
                                    ? "New"
                                    : item?.status
                                }
                                style={{
                                  marginRight: "1px",
                                  background:
                                    item?.status.toLowerCase() === "active"
                                      ? "#def8e7"
                                      : item?.status.toLowerCase() === "inactive"
                                        ? "#efebeb"
                                        : "#f9d2d0",
                                  color:
                                    item?.status.toLowerCase() === "active"
                                      ? "#55a65b"
                                      : item?.status.toLowerCase() === "inactive"
                                        ? ""
                                        : "#e05252",
                                  fontWeight: "bold",
                                  fontSize: "0.8  em",
                                }}
                              />
                            }
                          </div>
                          <div className="d-flex justify-content-start align-items-center">
                            {moment(item?.dob).format("MM/DD/YYYY")}
                          </div>

                          <div className="d-flex justify-content-start align-items-center">
                            <Chip
                              size="small"
                              label={`${item?.daysTillBirthday}`}
                              style={{
                                color: "#ffffff",
                                backgroundColor: getRatingColor(
                                  item?.daysTillBirthday
                                ),
                              }}
                            />
                          </div>
                          <div className="d-flex justify-content-start align-items-center">
                            {`${changeHandler(
                              moment(item?.dob).format("MM/DD/YYYY")
                            )}`}
                          </div>
                          {item.note !== undefined ?
                            <div className="d-flex align-items-center justify-content-start">
                              {item?.date !== undefined ? moment(item?.date).format("MM/DD/YYYY") : "N/A"}<br />
                              {item?.time !== undefined ? item?.time : ""}
                            </div> :
                            <div className="d-flex align-items-center justify-content-start">
                              {item?.notes ? moment(item?.notes.date).format("MM/DD/YYYY") : "N/A"}<br />
                              {(item?.notes?.time) ? item?.notes.time : ""}
                            </div>}
                          <div className="d-flex align-items-center justify-content-start">
                            {/* <Chip
                        size="small"
                        label={item?.dayDifference || item?.dayssince}
                        style={{
                          color:
                            item?.dayssince > 7 ? "#65b06b" : "#e05252",
                          background:
                            item?.dayssince > 7 ? "#def8e7" : "#f6d2d0",
                        }} */}
                            {/* /> */}
                            <span>{item?.notes ? item?.notes.note : "N/A"} </span>
                          </div>
                          <div className="d-flex justify-content-center align-items-center">
                            <StudentlistuserEyeModal studentInfo={item} studentType={studentType} tillDate={tillDate} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <center>
                  <img src={NoDataImage} height="160px" alt="No Data" />
                  <b />
                  <h4>No Data</h4>
                </center>
              ))
          }
        </div>
      </Card>
      <TablePagination
        component="div"
        count={Number(data?.totalCount) || 0}
        page={pageNumber}
        onPageChange={handlePagination}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Rows per page"
        rowsPerPageOptions={[5, 10, 20, 50, 100, 150, 200]}
      />
    </div>
    //   )}
    // </Card>
  );
};

export default BirthdyaTable;
