import React, { useEffect, useState } from "react";
import "../../../assets/scss/pages/dashboard2.scss";
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
import moment from "moment";
import AssignmentIcon from "@material-ui/icons/Assignment";
import useDateformat from "./../../../utilities/useDateFormat";
import { useDispatch, useSelector } from "react-redux";
import NoData from "./../../../images/NoData.svg";
import {
  GET_TODAY_TASKS,
  GET_ALL_TASKS,
} from "./../../../redux/actions/dashboard2";
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

export default function ActiveTrial() {
  const dispatch = useDispatch();

  function fetchTodaysTask(pageNumber, perpage) {
    dispatch(GET_TODAY_TASKS(pageNumber, perpage));
  }
  function fetchAllTasks(pageNumber, perpage) {
    dispatch(GET_ALL_TASKS(pageNumber, perpage));
  }

  useEffect(() => {
    fetchTodaysTask(1, 5);
    fetchAllTasks(1, 5);
  }, [dispatch]);

  const [option, setOption] = useState("month");

  //   this month pagination
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  /////////////////////////
  /////////////////////////  Tasks
  /////////////////////////
  const [allPage, setAllPage] = useState(1);
  const [allPageSize] = useState(5);

  const { todayTasks, allTasks } = useSelector((state) => state.dashboard2);

  const STATUS_DICT = {
    1: "Pending",
    2: "In Progress",
    3: "Completed",
    5: "Not completed",
  };

  function remainingHour(due_date) {
    const task = moment(new Date(due_date).getTime());
    const now = moment(new Date().getTime());
    return `${task.diff(now, "hours")} Hrs`;
  }

  const { basicFormatDash } = useDateformat();
  const history = useHistory();

  return (
    <>
      <Card className="_card stat-card my_task_card">
        <CardBody>
          <div className="stat-card-header">
            <div className="sch-left">
              <div className="sch-icon" style={{ backgroundColor: "#DFDCFF" }}>
                <AssignmentIcon style={{ color: "#1400FB" }} />
              </div>
              <span>My Tasks</span>
            </div>
            <button
              onClick={() => history.push(`/todo/all`)}
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
              Today Task
            </button>
            <button
              onClick={() => setOption("all")}
              className={
                option !== "month"
                  ? "btn-filter-primary m-r-10"
                  : "btn-filter-secondary"
              }
            >
              This Week
            </button>
          </div>
          {option === "month" ? (
            <div>
              {todayTasks === null || todayTasks?.total === 0 ? (
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
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell>Title</StyledTableCell>
                        <StyledTableCell>Type</StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {todayTasks &&
                        todayTasks?.success === true &&
                        todayTasks.data.map((row) => (
                          <StyledTableRow key={row._id}>
                            <StyledTableCell align="left">
                              {basicFormatDash(row.due_date)}
                            </StyledTableCell>
                            <StyledTableCell>{row.name}</StyledTableCell>
                            <StyledTableCell>{row.type}</StyledTableCell>
                            <StyledTableCell>
                              {/* {row.status} */}
                              {/* <div className="table-action-area">
                             
                            </div> */}

                              <div
                                className={`table-tag ${
                                  row.status === 1 ? "progress" : ""
                                }  ${row.status === 2 ? "progress" : ""} ${
                                  row.status === 3 ? "completed" : ""
                                } ${row.status === 5 ? "notcompleted" : ""}`}
                              >
                                <span>{STATUS_DICT[row.status]}</span>
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
                            fetchTodaysTask(b, pageSize);
                          }}
                          count={
                            todayTasks ? Math.ceil(todayTasks.total / 5) : 0
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
              {allTasks === null || allTasks?.total === 0 ? (
                <div className="data-center">
                  <img src={NoData} className="no-data" alt="No data" />
                </div>
              ) : (
                <>
                  <TableContainer component={Paper}>
                    <Table
                      // className={classes.table}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Date</StyledTableCell>
                          <StyledTableCell>Time</StyledTableCell>
                          <StyledTableCell>Title</StyledTableCell>
                          <StyledTableCell>Type</StyledTableCell>
                          <StyledTableCell>Status</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {allTasks &&
                          allTasks.data.map((row) => (
                            <StyledTableRow key={row._id}>
                              <StyledTableCell align="left">
                                {basicFormatDash(row.due_date)}
                              </StyledTableCell>
                              <StyledTableCell>
                                {remainingHour(row.due_date)}
                              </StyledTableCell>
                              <StyledTableCell>{row.name}</StyledTableCell>
                              <StyledTableCell>{row.type}</StyledTableCell>
                              <StyledTableCell>
                                {/* {row.status} */}
                                {/* <div className="table-action-area">
                              
                            </div> */}
                                <div
                                  className={`task-tag ${
                                    row.status === 1 ? "progress-tag" : ""
                                  }  ${
                                    row.status === 2 ? "progress-tag" : ""
                                  } ${
                                    row.status === 3 ? "completed-tag" : ""
                                  } ${
                                    row.status === 5 ? "notcompleted-tag" : ""
                                  }`}
                                >
                                  <span>{STATUS_DICT[row.status]}</span>
                                </div>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                      </TableBody>
                      {/* <TableFooter>
                      
                    </TableFooter> */}
                    </Table>
                  </TableContainer>
                  <div className="table-pagination">
                    <Pagination
                      page={allPage}
                      onChange={(a, b) => {
                        setAllPage(b);
                        fetchAllTasks(b, allPageSize);
                      }}
                      count={allTasks ? Math.ceil(allTasks.total / 5) : 0}
                      className="dash-pagination"
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
}
