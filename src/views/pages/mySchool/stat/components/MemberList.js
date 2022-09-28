import React, { useState, useMemo } from "react";
import {
  Row,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Button,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import useMonth from "./useMonth";
import { useSelector, useDispatch } from "react-redux";
// -
import {
  GET_RANKS_BY_PROGRAM,
  GET_MEMBER_LIST_BY_PROGRAMID,
} from "../../../../../redux/actions/statictics";

import useDateFormat from "./../../../../../utilities/useDateFormat";
import TablePagination from "@material-ui/core/TablePagination";
import moment from "moment";

const MemberList = ({ selectedName, selectedProgram }) => {
  const dispatch = useDispatch();
  const { basicFormat } = useDateFormat();
  const customStyles = {
    rows: {
      style: {
        minHeight: "40px",
      },
    },
    header: {
      style: {
        fontSize: "10px",
      },
    },
    cells: {
      style: {
        color: "#828282",
        fontSize: "12px",
      },
    },
  };
  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      selector: (row) => (
        <>
          {row.firstName} {row.lastName}{" "}
        </>
      ),
    },
    {
      name: "Rank",
      selector: "current_rank_name",
      sortable: true,
    },
    {
      name: "Join Date",
      selector: "createdAt",
      selector: (row) => moment(row.createdAt).format("L"),
    },
    {
      name: "Last Attended",
      selector: "last_attended",
      sortable: true,
      width: "16%",
      selector: (row) => moment(row.createdAt).format("L"),
    },
  ];

  // fetch user by rank & month & year
  const { getMonthName, month } = useMonth();
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    rank: "",
    year: 1,
    month: 1,
    programID: "",
  });

  const [ranks, setRanks] = useState([]);

  function fetchMemberList(Param) {
    dispatch(GET_MEMBER_LIST_BY_PROGRAMID(Param));
  }

  function fetchRanksByProgramId(programID) {
    dispatch(GET_RANKS_BY_PROGRAM({ programID }));
  }

  useMemo(() => {
    if (selectedProgram !== "") {
      let date = new Date();
      setParams((x) => ({
        ...x,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        programID: selectedProgram,
      }));
      fetchRanksByProgramId(selectedProgram);
      fetchMemberList({
        programID: selectedProgram,
        page: 1,
        perPage: 10,
        rank: "",
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      });
    }
  }, [selectedProgram]);

  function changeMonth(index) {
    setParams((x) => ({
      ...x,
      month: index,
    }));
  }

  function monthList() {
    return (
      <React.Fragment>
        {month.map((x) => (
          <DropdownItem
            key={x.index}
            onClick={() => changeMonth(x.index)}
            tag="a"
          >
            {x.name}
          </DropdownItem>
        ))}
      </React.Fragment>
    );
  }

  const [years] = useState(() => {
    let data = [];
    let currentYear = new Date().getFullYear();
    for (let i = 5; i > 0; i--) {
      data.push(currentYear - i);
    }
    data.reverse();
    return [currentYear, ...data];
  });

  function changeYear(key) {
    setParams((x) => ({
      ...x,
      year: key,
    }));
  }

  function yearList() {
    return (
      <React.Fragment>
        {years.map((x) => (
          <DropdownItem key={x} onClick={() => changeYear(x)} tag="a">
            {x}
          </DropdownItem>
        ))}
      </React.Fragment>
    );
  }

  const { ranksData, memberData } = useSelector((state) => state.statictics);
  useMemo(() => {
    if (ranksData) {
      setRanks(ranksData);
    }
  }, [ranksData]);

  function changeRank(rankName) {
    setParams((x) => ({
      ...x,
      rank: rankName,
    }));
  }

  function buildRanks() {
    return (
      <React.Fragment>
        <DropdownItem key={"select-all"} onClick={() => changeRank("")} tag="a">
          Select All
        </DropdownItem>
        {ranks &&
          ranks.map((x) => (
            <DropdownItem
              key={x.rank_name}
              onClick={() => changeRank(x.rank_name)}
              tag="a"
            >
              {x.rank_name}
            </DropdownItem>
          ))}
      </React.Fragment>
    );
  }

  return (
    <>
      <Row className="d-flex justify-content-between align-items-center pb-1">
        <div className="filter-title d-flex align-items-center justify-content-center">
          <h4>{selectedName}s</h4>{" "}
          <span className="ml-1">({memberData ? memberData.total : 0})</span>
        </div>

        <div className="d-flex">
          <UncontrolledDropdown className="data-list-dropdown mr-1">
            <DropdownToggle className="p-1 filter-toggle">
              <span className="align-middle dropdown-label">
                {params.rank === "" ? "Select Rank" : params.rank}
              </span>
              <ChevronDown size={15} className="chevron" />
            </DropdownToggle>
            <DropdownMenu tag="div" right>
              {buildRanks()}
            </DropdownMenu>
          </UncontrolledDropdown>

          <UncontrolledDropdown className="data-list-dropdown mr-1">
            <DropdownToggle className="p-1 filter-toggle">
              <span className="align-middle dropdown-label">
                {getMonthName(params.month)}
              </span>
              <ChevronDown size={15} className="chevron" />
            </DropdownToggle>
            <DropdownMenu tag="div" right>
              {monthList()}
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown className="data-list-dropdown mr-1">
            <DropdownToggle className="p-1 filter-toggle">
              <span className="align-middle dropdown-label">{params.year}</span>
              <ChevronDown size={15} className="chevron" />
            </DropdownToggle>
            <DropdownMenu tag="div" right>
              {yearList()}
            </DropdownMenu>
          </UncontrolledDropdown>
          <Button
            onClick={() => {
              fetchMemberList(params);
            }}
            color="primary"
          >
            Filter
          </Button>
        </div>
      </Row>

      <Row>
        <Card className="finance-col-two">
          <CardBody>
            {memberData && (
              <>
                <DataTable
                  data={memberData.data}
                  columns={columns}
                  noHeader
                  customStyles={customStyles}
                />

                <TablePagination
                  component="div"
                  count={memberData.total}
                  page={params.page - 1}
                  onPageChange={(e, d) => {
                    setParams((p) => ({
                      ...p,
                      page: d + 1,
                    }));
                    fetchMemberList({
                      ...params,
                      page: d + 1,
                    });
                  }}
                  rowsPerPage={params.perPage}
                  onRowsPerPageChange={(e, d) => {
                    setParams((p) => ({
                      ...p,
                      perPage: e.target.value,
                    }));
                    fetchMemberList({
                      ...params,
                      perPage: e.target.value,
                    });
                  }}
                />
              </>
            )}
          </CardBody>
        </Card>
      </Row>
    </>
  );
};

export default MemberList;
