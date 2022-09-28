import React, { useEffect, useState } from "react";
import "../../../assets/scss/pages/dashboard2.scss";
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
import PeopleIcon from "@material-ui/icons/People";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  MEMBER_LIST_OF_THIS_MONTH,
  MEMBER_LIST_OF_ALL_TIME,
} from "./../../../redux/actions/dashboard2";
import NoData from "./../../../images/NoData.svg";
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

  function fetchMemberListThisMonth(pageNumber, perpage) {
    dispatch(MEMBER_LIST_OF_THIS_MONTH(pageNumber, perpage));
  }
  function fetchMemberListAllTime(pageNumber, perpage) {
    dispatch(MEMBER_LIST_OF_ALL_TIME(pageNumber, perpage));
  }

  useEffect(() => {
    fetchMemberListThisMonth(0, 5);
    fetchMemberListAllTime(0, 5);
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

  const { memberListThisMonth, memberListAllTime } = useSelector(
    (state) => state.dashboard2
  );

  const history = useHistory();
  return (
    <>
      <Card className="_card stat-card">
        <CardBody>
          <div className="stat-card-header">
            <div className="sch-left">
              <div className="sch-icon" style={{ backgroundColor: "#E9F1FF" }}>
                <PeopleIcon style={{ color: "#0184FF" }} />
              </div>
              <span>Latest Members</span>
            </div>
            <button
              onClick={() => {
                history.push(`/app/student/list`);
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
              {memberListThisMonth === null ? (
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
                          <StyledTableCell>Type</StyledTableCell>
                          <StyledTableCell>Phone</StyledTableCell>
                          <StyledTableCell>Date</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {memberListThisMonth &&
                          memberListThisMonth.data.map((row) => (
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
                                  : "N/A"}{" "}
                              </StyledTableCell>
                              <StyledTableCell>
                                {row.primaryPhone !== undefined &&
                                row.primaryPhone.length
                                  ? `${row.primaryPhone}`
                                  : "N/A"}{" "}
                              </StyledTableCell>
                              <StyledTableCell>
                                {moment(row.createdAt).format("l")}
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
                        fetchMemberListThisMonth(b - 1, pageSize);
                      }}
                      count={
                        memberListThisMonth
                          ? Math.ceil(memberListThisMonth.totalCount / 5)
                          : 0
                      }
                      className="dash-pagination"
                    />
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="dashboard_table_Wrapper">
              {memberListAllTime === null ? (
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
                          <StyledTableCell>Type</StyledTableCell>
                          <StyledTableCell>Phone</StyledTableCell>
                          <StyledTableCell>Date</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {memberListAllTime &&
                          memberListAllTime.data.map((row) => (
                            <StyledTableRow key={row._id}>
                              <StyledTableCell>
                                {row.firstName && row.lastName !== undefined
                                  ? `${row.firstName}  ${row.lastName}`
                                  : "N/A"}{" "}
                              </StyledTableCell>
                              <StyledTableCell>
                                <span>
                                  {row.studentType !== undefined &&
                                  row.studentType.length
                                    ? `${row.studentType}`
                                    : "N/A"}
                                </span>
                              </StyledTableCell>
                              <StyledTableCell>
                                {row.primaryPhone !== undefined &&
                                row.primaryPhone.length
                                  ? `${row.primaryPhone}`
                                  : "N/A"}{" "}
                              </StyledTableCell>
                              <StyledTableCell>
                                {moment(row.createdAt).format("l")}
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
                        fetchMemberListAllTime(b - 1, allPageSize);
                      }}
                      count={
                        memberListAllTime
                          ? Math.ceil(memberListAllTime.totalCount / 5)
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
