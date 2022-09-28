import React, { useState, useEffect, useMemo } from "react";
import "../../../assets/scss/pages/dashboard2.scss";

import { Card, CardBody } from "reactstrap";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
// import TableFooter from "@material-ui/core/TableFooter";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import NoData from "./../../../images/NoData.svg";
import { useDispatch, useSelector } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

import { GET_CANDIDATE_ACTION } from "./../../../redux/actions/dashboard2";

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

const Candidate = () => {
  function createData(name, data1, data2) {
    return { name, data1, data2 };
  }

  const [option, setOption] = useState("BBC");
  const stp = (p) => setOption(p);
  const dispatch = useDispatch();

  function fetchCandidate(type, page, size) {
    dispatch(GET_CANDIDATE_ACTION(type, page, size));
  }

  useEffect(() => {
    fetchCandidate("BBC", 1, 5);
    fetchCandidate("LC", 1, 5);
    fetchCandidate("IC", 1, 5);
    fetchCandidate("AC", 1, 5);
  }, [dispatch]);

  const [dataSource, setDataSource] = useState([]);

  let { candidate_BBC, candidate_LC, candidate_IC, candidate_AC } = useSelector(
    (state) => state.dashboard2
  );

  useMemo(() => {
    if (option === "BBC") {
      setDataSource(candidate_BBC);
    }
    if (option === "LC") {
      setDataSource(candidate_LC);
    }
    if (option === "IC") {
      setDataSource(candidate_IC);
    }
    if (option === "AC") {
      setDataSource(candidate_AC);
    }
  }, [candidate_BBC, candidate_LC, candidate_IC, candidate_AC, option]);

  return (
    <Card className="_card stat-card">
      <CardBody>
        <div className="stat-card-header">
          <div className="sch-left">
            <div className="sch-icon" style={{ backgroundColor: "#DDF6FF" }}>
              <GroupAddIcon style={{ color: "#155871" }} />
            </div>
            <span>Candidate</span>
          </div>
          <button className="viewAllBtn">View All</button>
        </div>
        <div className="stat-filter-area">
          <button
            onClick={() => stp("BBC")}
            className={
              option === "BBC"
                ? "btn-filter-primary"
                : "btn-filter-secondary mr-10"
            }
          >
            BBC
          </button>
          <button
            onClick={() => stp("LC")}
            className={
              option === "LC"
                ? "btn-filter-primary"
                : "btn-filter-secondary mr-10"
            }
          >
            LC
          </button>
          <button
            onClick={() => stp("IC")}
            className={
              option === "IC"
                ? "btn-filter-primary"
                : "btn-filter-secondary mr-10"
            }
          >
            IC
          </button>
          <button
            onClick={() => stp("AC")}
            className={
              option === "AC"
                ? "btn-filter-primary"
                : "btn-filter-secondary mr-10"
            }
          >
            AC
          </button>
        </div>
        <div>
          {dataSource === null || dataSource?.total === 0 ? (
            <div className="data-center">
              <img src={NoData} className="no-data" alt="No data" />
            </div>
          ) : (
            <TableContainer component={Paper}>
              <Tble
                key={option}
                type={option}
                dataSource={dataSource}
                fetchCandidate={fetchCandidate}
              />
            </TableContainer>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

function Tble({ type, dataSource, fetchCandidate }) {
  const [page, setPage] = useState(1);

  return (
    <>
      <Table
        // className={classes.table}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Rank</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Last Strive Given</StyledTableCell>
            <StyledTableCell>Candidate Type</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource &&
            dataSource.data.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="left">{row.student_name ? row.student_name : "N/A"}</StyledTableCell>
                <StyledTableCell>{row.rank ? row.rank : "N/A"}</StyledTableCell>
                <StyledTableCell>{row.status ? row.status : "N/A"}</StyledTableCell>
                <StyledTableCell>{row.lastStrive ? row.lastStrive : "N/A"}</StyledTableCell>
                <StyledTableCell>{row.membership_type ? row.membership_type : "N/A"}</StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
        {/* <TableFooter>
        
      </TableFooter> */}
      </Table>
      <div className="table-pagination">
        <Pagination
          page={page}
          onChange={(a, b) => {
            setPage(b);
            fetchCandidate(type, b, 5);
          }}
          count={dataSource ? Math.ceil(dataSource.total / 5) : 0}
          className="dash-pagination"
        />
      </div>
    </>
  );
}

export default Candidate;
