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
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import StudentlistuserEyeModal from "../../dashboard1/StudentlistuserEyeModal";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NoData from "./../../../images/NoData.svg";
import {
  LEADS_OF_THIS_MONTH,
  LEADS_ALL_TIME_DATA,
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

const Leads = () => {
  const dispatch = useDispatch();

  function fetchLeadsThisMonth(pageNumber, perpage) {
    dispatch(LEADS_OF_THIS_MONTH(pageNumber, perpage));
  }

  function fetchLeadsAllTime(pageNumber, perpage) {
    dispatch(LEADS_ALL_TIME_DATA(pageNumber, perpage));
  }

  useEffect(() => {
    fetchLeadsThisMonth(0, 5);
    fetchLeadsAllTime(0, 5);
  }, [dispatch]);

  const getactivetrialsofThismonth = useSelector(
    (state) => state.dashboard.getactivetrialsofThismonth
  );

  const [option, setOption] = useState("month");

  //   this month pagination
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  /////////////////////////
  /////////////////////////  Active Trial
  /////////////////////////
  const [allPage, setAllPage] = useState(1);
  const [allPageSize] = useState(5);

  const { leadsThisMonth, leadsAllTime } = useSelector(
    (state) => state.dashboard2
  );

  const history = useHistory();

  return (
    <Card className="_card stat-card">
      <CardBody>
        <div className="stat-card-header">
          <div className="sch-left">
            <div className="sch-icon" style={{ backgroundColor: "#FFF8DE" }}>
              <EqualizerIcon style={{ color: "#FFCB0A" }} />
            </div>
            <span>Leads</span>
          </div>
          <button
            onClick={() => {
              history.push(`/app/student/lead-list/list`);
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
              option === "month" ? "btn-filter-primary" : "btn-filter-secondary"
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
            {leadsThisMonth === null ? (
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
                        <StyledTableCell>Manage</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {leadsThisMonth &&
                        leadsThisMonth.data.map((row) => (
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
                    {/* <TableFooter>
                    
                  </TableFooter> */}
                  </Table>
                </TableContainer>
                <div className="table-pagination">
                  <Pagination
                    page={page}
                    onChange={(a, b) => {
                      setPage(b);
                      fetchLeadsThisMonth(b - 1, pageSize);
                    }}
                    count={
                      leadsThisMonth
                        ? Math.ceil(leadsThisMonth.totalCount / 5)
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
            {leadsThisMonth === null ? (
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
                        <StyledTableCell>Manage</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {leadsAllTime &&
                        leadsAllTime.data.map((row) => (
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
                    {/* <TableFooter>
                   
                  </TableFooter> */}
                  </Table>
                </TableContainer>
                <div className="table-pagination">
                  <Pagination
                    page={allPage}
                    onChange={(a, b) => {
                      setAllPage(b);
                      fetchLeadsAllTime(b - 1, allPageSize);
                    }}
                    count={
                      leadsAllTime ? Math.ceil(leadsAllTime.totalCount / 5) : 0
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
  );
};

export default Leads;
