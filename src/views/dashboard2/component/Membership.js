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
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import NoData from "./../../../images/NoData.svg";
import {
  GET_EXPIRED_MEMBERSHIP,
  GET_ALL_MEMBERSHIP,
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

export default function Membership() {
  const dispatch = useDispatch();
  function fetchExpiredMembership(pageNumber, perpage) {
    dispatch(GET_EXPIRED_MEMBERSHIP(pageNumber, perpage));
  }
  function fetchAllMembership(pageNumber, perpage) {
    dispatch(GET_ALL_MEMBERSHIP(pageNumber, perpage));
  }

  useEffect(() => {
    fetchExpiredMembership(0, 5);
    fetchAllMembership(0, 5);
  }, [dispatch]);

  const [option, setOption] = useState("month");
  //   this month pagination
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  const [allPage, setAllPage] = useState(1);
  const [allPageSize] = useState(5);
  const { expiredMembership, allMemberships } = useSelector(
    (state) => state.dashboard2
  );

  const history = useHistory();

  return (
    <>
      <Card className="_card stat-card">
        <CardBody>
          <div className="stat-card-header">
            <div className="sch-left">
              <div className="sch-icon" style={{ backgroundColor: "#FFEAD2" }}>
                <FavoriteIcon style={{ color: "#FB8700" }} />
              </div>
              <span>Membership</span>
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
              Expired
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
              {expiredMembership === null || expiredMembership?.total === 0 ? (
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
                          <StyledTableCell>Expire Date</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {expiredMembership &&
                          expiredMembership.data.map((row) => (
                            <StyledTableRow key={row._id}>
                              <StyledTableCell align="left">
                                {row.student_name !== undefined &&
                                row.student_name.length
                                  ? `${row.student_name}`
                                  : "N/A"}{" "}
                              </StyledTableCell>
                              <StyledTableCell>
                                {row.membership_type !== undefined &&
                                row.membership_type.length
                                  ? `${row.membership_type}`
                                  : "N/A"}{" "}
                              </StyledTableCell>
                              <StyledTableCell>{row.phone}</StyledTableCell>
                              <StyledTableCell>
                                <div className="table-action-area">
                                  {moment(row.expiry_date).format("l")}
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
                        fetchExpiredMembership(b, pageSize);
                      }}
                      count={
                        expiredMembership
                          ? Math.ceil(expiredMembership.total / 5)
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
              {allMemberships === null || allMemberships?.total === 0 ? (
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
                          <StyledTableCell>Expire Date</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {allMemberships &&
                          allMemberships.data.map((row) => (
                            <StyledTableRow key={row._id}>
                              <StyledTableCell align="left">
                                {row.student_name !== undefined &&
                                row.student_name.length
                                  ? `${row.student_name}`
                                  : "N/A"}{" "}
                              </StyledTableCell>
                              <StyledTableCell>
                                {row.membership_type !== undefined &&
                                row.membership_type.length
                                  ? `${row.membership_type}`
                                  : "N/A"}
                              </StyledTableCell>
                              <StyledTableCell>{row.phone}</StyledTableCell>
                              <StyledTableCell>
                                <div className="table-action-area">
                                  {moment(row.expiry_date).format("l")}
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
                        fetchAllMembership(b - 1, allPageSize);
                      }}
                      count={
                        allMemberships ? Math.ceil(allMemberships.total / 5) : 0
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
