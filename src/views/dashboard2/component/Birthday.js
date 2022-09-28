import React, { useEffect, useState } from "react";
import "../../../assets/scss/pages/dashboard2.scss";
// import TimerIcon from "@material-ui/icons/Timer";
import { Card, CardBody } from "reactstrap";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
// import TableFooter from "@material-ui/core/TableFooter";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import { useHistory } from "react-router-dom";
import CakeIcon from "@material-ui/icons/Cake";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import NoData from "./../../../images/NoData.svg";
import {
  BIRTHDAY_LIST_OF_THIS_MONTH,
  BIRTHDAY_LIST_OF_ALL_TIME,
} from "./../../../redux/actions/dashboard2";
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

  function fetchBirthdayListThisMonth(pageNumber, perpage) {
    dispatch(BIRTHDAY_LIST_OF_THIS_MONTH(pageNumber, perpage));
  }
  function fetchBirthdayListAllTime(pageNumber, perpage) {
    dispatch(BIRTHDAY_LIST_OF_ALL_TIME(pageNumber, perpage));
  }

  useEffect(() => {
    fetchBirthdayListThisMonth(0, 5);
    fetchBirthdayListAllTime(0, 5);
  }, [dispatch]);

  const [option, setOption] = useState("month");

  //   this month pagination
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  /////////////////////////
  /////////////////////////  Active Trial
  /////////////////////////
  const [allPage, setAllPage] = useState(1);
  const [allPageSize] = useState(5);

  const { birthDayListThisMonth, birthDayListAllTime } = useSelector(
    (state) => state.dashboard2
  );

  const history = useHistory();

  return (
    <>
      <Card className="_card stat-card">
        <CardBody>
          <div className="stat-card-header">
            <div className="sch-left">
              <div className="sch-icon" style={{ backgroundColor: "#F1DFFF" }}>
                <CakeIcon style={{ color: "#CE41FF" }} />
              </div>
              <span>Birthdays</span>
            </div>
            <button
              onClick={() => {
                history.push(`/app/birthday`);
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
              {birthDayListThisMonth === null ? (
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
                          <StyledTableCell>Name</StyledTableCell>
                          <StyledTableCell>Date of Birth</StyledTableCell>
                          <StyledTableCell>Phone</StyledTableCell>
                          <StyledTableCell>Days Left</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {birthDayListThisMonth &&
                          birthDayListThisMonth.data.map((row) => (
                            <StyledTableRow key={row._id}>
                              <StyledTableCell align="left">
                                {row.firstName && row.lastName !== undefined
                                  ? `${row.firstName}  ${row.lastName}`
                                  : "N/A"}{" "}
                              </StyledTableCell>
                              <StyledTableCell>
                                {moment(row.dob).format("l")}
                              </StyledTableCell>
                              <StyledTableCell>
                                {row.primaryPhone !== undefined &&
                                row.primaryPhone.length
                                  ? `${row.primaryPhone}`
                                  : "N/A"}{" "}
                              </StyledTableCell>
                              <StyledTableCell>
                                {row.daysTillBirthday}
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
                      page={page}
                      onChange={(a, b) => {
                        setPage(b);
                        fetchBirthdayListThisMonth(b - 1, pageSize);
                      }}
                      count={
                        birthDayListThisMonth
                          ? Math.ceil(birthDayListThisMonth.totalCount / 5)
                          : 0
                      }
                      className="dash-pagination"
                    />
                  </div>
                </>
              )}
            </div>
          ) : (
            <div>
              {!birthDayListAllTime.success ? (
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
                          <StyledTableCell>Name</StyledTableCell>
                          <StyledTableCell>Date of Birth</StyledTableCell>
                          <StyledTableCell>Phone</StyledTableCell>
                          <StyledTableCell>Days Left</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {birthDayListAllTime &&
                          birthDayListAllTime.success &&
                          birthDayListAllTime.data.map((row) => (
                            <StyledTableRow key={row._id}>
                              <StyledTableCell align="left">
                                {row.firstName && row.lastName !== undefined
                                  ? `${row.firstName}  ${row.lastName}`
                                  : "N/A"}{" "}
                              </StyledTableCell>
                              <StyledTableCell>
                                {moment(row.dob).format("l")}
                              </StyledTableCell>
                              <StyledTableCell>
                                {row.primaryPhone !== undefined &&
                                row.primaryPhone.length
                                  ? `${row.primaryPhone}`
                                  : "N/A"}{" "}
                              </StyledTableCell>
                              <StyledTableCell>
                                {row.daysTillBirthday}
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
                        fetchBirthdayListAllTime(b - 1, allPageSize);
                      }}
                      count={
                        birthDayListAllTime
                          ? Math.ceil(birthDayListAllTime.totalCount / 5)
                          : 0
                      }
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
