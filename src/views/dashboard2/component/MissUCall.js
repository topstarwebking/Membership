import React, { useEffect, useState } from "react";
import "../../../assets/scss/pages/dashboard2.scss";
// import TimerIcon from "@material-ui/icons/Timer";
import { Card, CardBody } from "reactstrap";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";

import StudentlistuserEyeModal from "../../dashboard1/StudentlistuserEyeModal";
import PhoneMissedIcon from "@material-ui/icons/PhoneMissed";
import { useDispatch, useSelector } from "react-redux";
// import {
//   THIS_MONTH_MISS_U_CALL,
//   ALL_MISS_U_CALL,
// } from "./../../../redux/actions/dashboard2";
import NoData from "./../../../images/NoData.svg";
import { GET_MISS_CALL_MORETHEN14 } from "./../../../redux/actions/member";
import { useHistory } from "react-router-dom";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#FCFCFC",
    color: "#4F4F4F",
    fontWeight: "bold",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#FAFAFA",
    },
  },
}))(TableRow);

export default function MissUCall() {
  const dispatch = useDispatch();

  function fetchMissUCall(pageNumber, perpage) {
    dispatch(GET_MISS_CALL_MORETHEN14(pageNumber, perpage));
  }

  useEffect(() => {
    fetchMissUCall(0, 5);
  }, [dispatch]);

  const [option, setOption] = useState("month");

  //   this month pagination
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  /////////////////////////  Active Trial
  const [allPage, setAllPage] = useState(1);
  const [allPageSize] = useState(5);

  const { getMorthen14DaysMissCall } = useSelector((state) => state.member);

  const history = useHistory();

  return (
    <>
      <Card className="_card stat-card">
        <CardBody>
          <div className="stat-card-header">
            <div className="sch-left">
              <div className="sch-icon" style={{ backgroundColor: "#FFC6C6" }}>
                <PhoneMissedIcon style={{ color: "#FF3E3E" }} />
              </div>
              <span>Miss You Call</span>
            </div>
            <button
              onClick={() => {
                history.push(`/app/miss-you-call`);
              }}
              className="viewAllBtn"
            >
              View All
            </button>
          </div>
          <div className="stat-filter-area">
            <button
              onClick={() => setOption("month")}
              className={
                option === "month"
                  ? "btn-filter-primary"
                  : "btn-filter-secondary"
              }
            >
              This Month
            </button>
            <button
              onClick={() => setOption("all")}
              className={
                option !== "month"
                  ? "btn-filter-primary m-r-10"
                  : "btn-filter-secondary"
              }
            >
              All
            </button>
          </div>
          {option === "month" ? (
            <div>
              {!getMorthen14DaysMissCall?.success ? (
                <div className="data-center">
                  <img src={NoData} className="no-data" alt="No data" />
                </div>
              ) : (
                <TableContainer component={Paper}>
                  <Table
                    // className={classes.table}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Type</StyledTableCell>
                        <StyledTableCell>Phone</StyledTableCell>
                        <StyledTableCell>Manage</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {getMorthen14DaysMissCall?.success === true &&
                        getMorthen14DaysMissCall.data.map((row) => (
                          <StyledTableRow key={row._id}>
                            <StyledTableCell align="left">
                              {row.firstName && row.lastName !== undefined
                                ? `${row.firstName}  ${row.lastName}`
                                : "N/A"}
                            </StyledTableCell>
                            <StyledTableCell>
                              {row.studentType !== undefined &&
                              row.studentType.length
                                ? `${row.studentType}`
                                : "N/A"}
                            </StyledTableCell>
                            <StyledTableCell>
                              {row.primaryPhone !== undefined &&
                              row.primaryPhone.length
                                ? `${row.primaryPhone}`
                                : "N/A"}{" "}
                            </StyledTableCell>
                            <StyledTableCell>
                              <div className="table-action-area">
                                <StudentlistuserEyeModal studentInfo={row} />
                              </div>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                      <div className="table-pagination">
                        <Pagination
                          page={page}
                          onChange={(a, b) => {
                            setPage(b);
                            fetchMissUCall(b - 1, pageSize);
                          }}
                          count={
                            getMorthen14DaysMissCall
                              ? Math.ceil(
                                  getMorthen14DaysMissCall.totalCount / 5
                                )
                              : 0
                          }
                          className="dash-pagination"
                        />
                      </div>
                    </TableFooter>
                  </Table>
                </TableContainer>
              )}
            </div>
          ) : (
            <div>
              {!getMorthen14DaysMissCall?.success ? (
                <div className="data-center">
                  <img src={NoData} className="no-data" alt="No data" />
                </div>
              ) : (
                <TableContainer component={Paper}>
                  <Table
                    // className={classes.table}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Type</StyledTableCell>
                        <StyledTableCell>Phone</StyledTableCell>
                        <StyledTableCell>Manage</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {getMorthen14DaysMissCall?.success === true &&
                        getMorthen14DaysMissCall.data.map((row) => (
                          <StyledTableRow key={row._id}>
                            <StyledTableCell align="left">
                              {row.firstName && row.lastName !== undefined
                                ? `${row.firstName}  ${row.lastName}`
                                : "N/A"}{" "}
                            </StyledTableCell>
                            <StyledTableCell>
                              {row.studentType !== undefined &&
                              row.studentType.length
                                ? `${row.studentType}`
                                : "N/A"}
                            </StyledTableCell>
                            <StyledTableCell>
                              {row.primaryPhone !== undefined &&
                              row.primaryPhone.length
                                ? `${row.primaryPhone}`
                                : "N/A"}{" "}
                            </StyledTableCell>
                            <StyledTableCell>
                              <div className="table-action-area">
                                <Tooltip
                                  arrow
                                  title={
                                    <p
                                      style={{
                                        fontSize: "1.5em",
                                        marginBottom: "0px",
                                      }}
                                    >
                                      <b>{row?.notes || "no notes"}</b>
                                    </p>
                                  }
                                >
                                  <InfoIcon className="action-icon-info" />
                                </Tooltip>
                                <StudentlistuserEyeModal studentInfo={row} />
                              </div>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                      <div className="table-pagination">
                        <Pagination
                          page={allPage}
                          onChange={(a, b) => {
                            setAllPage(b);
                            fetchMissUCall(b - 1, allPageSize);
                          }}
                          count={
                            getMorthen14DaysMissCall
                              ? Math.ceil(
                                  getMorthen14DaysMissCall.totalCount / 5
                                )
                              : 0
                          }
                          className="dash-pagination"
                        />
                      </div>
                    </TableFooter>
                  </Table>
                </TableContainer>
              )}
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
}
