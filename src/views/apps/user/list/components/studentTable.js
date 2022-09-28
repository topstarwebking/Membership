import React, { useEffect, useState } from "react";
import {
  Avatar,
  Chip,
  Card,
  CardContent,
  Grid,
  InputBase,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import "../../../../../assets/scss/pages/users.scss";
import StudentManageMenu from "../UserMoreMenu";
import InputAutoComplete from "./autoComplete";
import { connect } from "react-redux";
import { ArrowDown } from "react-feather";
import {
  GET_SERACH_STDUNET_BY_TYPE,
  GET_SERACH_STDUNET_BY_INTREST,
  GET_FILTER_STDUNET_BY_FIELD,
} from "../../../../../redux/actions/newstudent";
import StudentlistuserEyeModal from "../../../../dashboard1/StudentlistuserEyeModal";
import { GET_PROGRAM_LIST } from "../../../../../redux/actions/programe";
import { GET_MEMBERSHIP_LIST } from "../../../../../redux/actions/shop";
import { GET_AFTER_CAMPS } from "../../../../../redux/actions/member";
import DataTable from "react-data-table-component";
import {
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import "./index.css";

const customStyles = {
  headCells: {
    style: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#4F4F4F",
      width: "100%",
    },
  },
  columnsCell: {
    style: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#4F4F4F",
      width: "100%",
    },
  },
};
const useStyles = makeStyles((theme) => ({
  cardroot: {
    width: "100%",
    height: "100%",
    boxShadow:
      " 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2)",
    marginTop: "6px",
    overflow: "scroll",
    padding: "0",
  },
  rowstart: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "start",
  },
  inputStyle: {
    height: "3em",
    width: "100%",
    borderRadius: "0.4em",
    border: "1px solid #b8c2cc",
    "& div": {
      padding: "0px !important",
    },
  },
  textFontSize: {
    fontSize: "1em",
    width: "1.2em",
    height: "1,2em",
  },
  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
}));

export const RowSkeleton = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.cardroot}>
      <CardContent>
        <div className={classes.rowstart}>
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
          <div style={{ width: "60em", paddingLeft: "8px" }}>
            <Skeleton
              animation="wave"
              variant="rect"
              width={"100%"}
              height={10}
            />
            <Skeleton
              animation="wave"
              variant="text"
              width={"100%"}
              height={10}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
const StudentTable = (props) => {
  const {
    listofStudentdata,
    SELECTED_TEST_DATA,
    GET_FILTER_STDUNET_BY_FIELD,
    GET_MEMBERSHIP_LIST,
    GET_PROGRAM_LIST,
    getDataBack,
    programList,
    StudentTypeOrInterest,
    activeUserActionComponent,
    GET_AFTER_CAMPS,
    onSelectionChanged,
    usersChatAlertList,
  } = props;
  const rowsPerPage = 10;
  const [selectProgram, setSelectedProgram] = useState([]);
  const [FilterPayload, setFilterPayload] = useState({
    studentType: [StudentTypeOrInterest],
    program: [],
    current_rank_name: [],
    after_camp: [],
    membership_name: [],
    membership_type: [],
  });
  const [selectedId, setSelectedId] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const pageNumber = 0;
  const history = useHistory();
  const classes = useStyles();

  const HandleSearchingAll = async (e) => {
    const { value } = e.target;
    if (value.length > 2) {
      if (
        StudentTypeOrInterest === "camp" ||
        StudentTypeOrInterest === "After School"
      ) {
        await props.GET_SERACH_STDUNET_BY_INTREST(value, StudentTypeOrInterest);
      } else {
        await props.GET_SERACH_STDUNET_BY_TYPE(value, StudentTypeOrInterest);
      }
    }
    if (value === "") {
      getDataBack();
    }
  };

  const getRatingColor = (RatingCount, attendnce) => {
    if (RatingCount >= 0 && RatingCount <= 7 && attendnce > 0) {
      return "#60aa0ed4"; // green
    } else if (RatingCount >= 8 && RatingCount <= 14) {
      return "#ffc107"; // yellow
    } else if (RatingCount === 0) {
      return "gray";
    } else {
      return "#ff3f00";
    }
  };

  useEffect(() => {
    history.memberpage = 1;
    history.memberrowCount = 10;

    if (!history?.fromback) {
      history.fromback = false;
      history.updated = false;
      getDataBack();
      GET_PROGRAM_LIST();
      GET_MEMBERSHIP_LIST();
      GET_AFTER_CAMPS();
    }
    if (history?.updated) {
      getDataBack();
      GET_PROGRAM_LIST();
      GET_MEMBERSHIP_LIST();
      GET_AFTER_CAMPS();
      history.fromback = false;
      history.updated = false;
    }
  }, [GET_AFTER_CAMPS, GET_MEMBERSHIP_LIST, GET_PROGRAM_LIST, getDataBack]);

  useEffect(() => {
    onSelectionChanged(selectedId, selectedRows, pageNumber, rowsPerPage);
    if (selectedRows.length > 0) {
      SELECTED_TEST_DATA(selectedRows);
    } else {
      SELECTED_TEST_DATA([]);
    }
  }, [SELECTED_TEST_DATA, selectedId, selectedRows]);

  const getFilterValueFromList = (data, keyName) => {
    let filterResult = [];
    for (let item of data) {
      filterResult.push(item[keyName]);
    }
    return filterResult;
  };

  const handleSelectAutoComp = (e, newValue, name) => {
    let payload = FilterPayload;
    if (name === "programName") {
      setFilterPayload({
        ...FilterPayload,
        program: getFilterValueFromList(newValue, name),
      });
      payload["program"] = getFilterValueFromList(newValue, name);
      setSelectedProgram(newValue.map((i) => i?.program_rank || []));
    } else if (name === "rank_name") {
      payload["current_rank_name"] = getFilterValueFromList(newValue, name);
      setFilterPayload({
        ...FilterPayload,
        current_rank_name: getFilterValueFromList(newValue, name),
      });
    } else if (name === "membership_type") {
      payload["membership_type"] = getFilterValueFromList(newValue, name);
      setFilterPayload({
        ...FilterPayload,
        membership_type: getFilterValueFromList(newValue, "membership_type"),
      });
    } else if (name === "after_camp_category") {
      payload["after_camp"] = getFilterValueFromList(newValue, name);
      setFilterPayload({
        ...FilterPayload,
        after_camp: getFilterValueFromList(newValue, name),
      });
    }
    GET_FILTER_STDUNET_BY_FIELD(payload);
  };

  const getAllIds = (data) => {
    let ids = [];
    for (let item of data) {
      ids.push(item?._id);
    }
    return ids;
  };

  const handleSelectRows = async (state) => {
    let _ids = await getAllIds(state.selectedRows);
    await setSelectedId(_ids);
    await setSelectedRows(state.selectedRows);
  };

  const RCcolumns = [
    {
      name: "Full Name",
      selector: (row) => row.firstName,
      sortable: true,
      width: "220px",
      style: {
        display: "flex",
        justifyContent: "flex-start",
      },
      cell: (row) => (
        <div>
          <Link
            to={`/student-info/${row._id}`}
            title={`${row?.firstName} ${row?.lastName}`}
            style={{ cursor: "pointer" }}
            className="d-flex align-items-center justify-content-start text-capitalize"
          >
            <Avatar
              style={{ width: "1.8em", height: "1.8em" }}
              alt={row?.firstName}
              src={row?.memberprofileImage}
              className="mr-1"
            />
            {/* {row?.firstName} {row?.lastName} */}
            <div className="d-flex">
              <p style={{paddingRight: "3px"}}>{row?.firstName}</p>
              <p>{row?.lastName}</p>
            </div>
          </Link>
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            className="rounded textstart"
            style={{
              padding: 6,
              textAlign: "center",
              background:
                row?.status?.toLowerCase() === "active"
                  ? "#def8e7"
                  : row?.status?.toLowerCase() === "expired"
                  ? " #f9d2d0"
                  : "#efebeb",
              color:
                row?.status?.toLowerCase() === "active"
                  ? "#55a65b"
                  : row?.status?.toLowerCase() === "expired"
                  ? "#ff3f00"
                  : "#454040",
              fontWeight: "bold",
              fontSize: "0.9em",
            }}
          >
            {row?.status?.toLowerCase() === "active"
              ? "Active"
              : row?.status?.toLowerCase() === "expired"
              ? "Expired"
              : "New"}
          </div>
        </div>
      ),
    },
    {
      name: "Program",
      selector: (row) => row.program,
      sortable: true,
      cell: (row) => <div>{row?.program === "" ? "N/A" : row?.program}</div>,
    },
    {
      name: "Rank",
      selector: (row) => row.rank_order,
      sortable: true,
      cell: (row) => (
        <div>
          <Avatar
            style={{
              width: "1.8em",
              height: "1.8em",
              margin: "0px",
              objectFit: "contain !importent",
            }}
            src={row?.current_rank_img}
            alt={`${row?.current_rank_name}`}
          />
        </div>
      ),
    },
    {
      name: "Type",
      selector: (row) => row.membership_type,
      sortable: true,
      cell: (row) => (
        <div>
          {StudentTypeOrInterest === "Active Trial" || StudentTypeOrInterest ===  "Former Trial" ? 
          row?.membership_details.slice(-1)[0]?.membership_type ||
          row?.data?.membership_type ||
          "N/A"
          :
          row?.membership_details.slice(-1)[0]?.membership_type ||
            row?.data?.membership_type ||
            "N/A"}
        </div>
      ),
    },
    {
      name: "Start Date",
      selector: (row) => row.membership_start,
      sortable: true,
      cell: (row) => (
        <div>
          {row?.membership_start === undefined
            ? "N/A"
            : moment(row?.membership_start).format("MM/DD/YYYY")}
        </div>
      ),
    },
    {
      name: "End Date",
      selector: (row) => row.membership_expiry,
      sortable: true,
      cell: (row) => (
        <div>
          {row?.membership_expiry === undefined
            ? "N/A"
            : moment(row?.membership_expiry).format("MM/DD/YYYY")}
        </div>
      ),
    },
    {
      name: "Rating",
      selector: (row) => row.rating,
      sortable: true,
      cell: (row) => (
        <div>
          <Avatar
            className={classes.textFontSize}
            style={{
              fontWeight: "bold",
              width: "2em",
              height: "2em",
              backgroundColor: getRatingColor(
                Number(row?.rating),
                row?.attendedclass_count
              ),
            }}
          >
            {row?.rating}
          </Avatar>
        </div>
      ),
    },
    {
      name: "Tag",
      selector: (row) => row.after_camp,
      sortable: true,
      style: {
        paddingLeft: "1rem",
      },
      cell: (row) =>
        row?.after_camp === 0 ? (
          <div style={{ cursor: "pointer" }}>
            <Chip
              size="small"
              label={"None"}
              style={{ color: "#00a6e1", background: "#b7c9cf !important" }}
            />
          </div>
        ) : (
          <UncontrolledButtonDropdown
            tag="li"
            className="dropdown-user nav-item"
          >
            <DropdownToggle className="p-0">
              <Chip
                label={"Selected"}
                size="small"
                style={{ color: "#00a6e1", background: "#b7c9cf !important" }}
              />
            </DropdownToggle>
            <DropdownMenu right>
              {row?.after_camp?.map((item, i) => {
                return (
                  <DropdownItem
                    style={{
                      width: "100%",
                      color: "#00a6e1",
                      background: "#eaf4fe !important",
                      fontWeight: "600",
                    }}
                    key={i}
                  >
                    {item}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        ),
    },
    {
      name: "Action",
      sortable: true,
      style: {
        paddingLeft: "1rem",
      },
      cell: (row) => (
        <div className="d-flex justify-content-start p-0">
          <StudentlistuserEyeModal studentInfo={row} studentId={row?._id} />
          <StudentManageMenu
            item={row}
            alertCount={usersChatAlertList[row?._id]}
            StudentTypeOrInterest={StudentTypeOrInterest}

          />
        </div>
      ),
    },
  ];
  const handlePageChange = (page) => {
    history.memberpage = page;
  };
  const handlePageRowChange = (rowCount) => {
    history.memberrowCount = rowCount;
  };

  return (
    <React.Fragment>
      <div>
        <div className="d-flex justify-content-between">
          <div className="w-100">
            <Grid spacing={1} container>
              <Grid item sm={12} md={5} lg={5}>
                <InputBase
                  className={`${classes.inputStyle} pl-1 `}
                  fullwidth={"true"}
                  type="text"
                  placeholder="Search for students..... "
                  onChange={HandleSearchingAll}
                />
              </Grid>
            </Grid>
          </div>
          <div className="w-100 d-flex justify-content-end">
            <Grid container spacing={1} className="w-100">
              <Grid item sm={12} md={3} lg={3}>
                <InputAutoComplete
                  labelName={"Program"}
                  keyName="programName"
                  data={programList || []}
                  handleSelect={handleSelectAutoComp}
                />
              </Grid>
              <Grid item sm={12} md={3} lg={3}>
                <InputAutoComplete
                  labelName={"Rank Name"}
                  keyName="rank_name"
                  data={selectProgram[0] || []}
                  handleSelect={handleSelectAutoComp}
                />
              </Grid>

              <Grid item sm={12} md={3} lg={3}>
                <InputAutoComplete
                  labelName={"Type"}
                  keyName="membership_name"
                  handleSelect={handleSelectAutoComp}
                  data={memebeshipType}
                />
              </Grid>
              <Grid item sm={12} md={3} lg={3}>
                <InputAutoComplete
                  labelName={"Tags"}
                  keyName="after_camp_category"
                  data={props.getAfterCamps || []}
                  handleSelect={handleSelectAutoComp}
                />
              </Grid>
            </Grid>
          </div>
        </div>
        <br />
        <div className="card m-0">
          {activeUserActionComponent}
          {listofStudentdata === null ? (
            [1, 2, 3, 4, 5, 12].map((i) => {
              return <RowSkeleton key={i} />;
            })
          ) : (
            <DataTable
              responsive={true}
              columns={RCcolumns}
              paginationPerPage={history?.memberrowCount || 10}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePageRowChange}
              paginationRowsPerPageOptions={[
                10, 50, 100, 150, 200, 250, 300, 400,
              ]}
              clearSelectedRows={props.clearSelectedRow}
              paginationDefaultPage={history?.memberpage || 1}
              data={listofStudentdata || []}
              noHeader
              defaultSortDirection={"asc"}
              defaultSortField="firstName"
              defaultSortAsc={true}
              pagination
              sortIcon={<ArrowDown style={{ color: "#bababa" }} />}
              selectableRows
              onSelectedRowsChange={handleSelectRows}
              highlightOnHover
              customStyles={customStyles}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    SearchStudent: state.member.SearchStudent,
    listofStudentdata: state.student.listofStudentdata,
    programList: state.program.programList,
    membershipList: state.shop.membershipList,
    getAfterCamps: state.member.getAfterCamps,
    usersChatAlertList: state.V2textChat?.usersChatAlertList,
    getSelectedTestToRecommand: state.test.getSelectedTestToRecommand,
    clearSelectedRow: state.student.clearSelectedRow,
  };
};

export default connect(mapStateToProps, {
  GET_SERACH_STDUNET_BY_TYPE,
  GET_SERACH_STDUNET_BY_INTREST,
  GET_FILTER_STDUNET_BY_FIELD,
  GET_PROGRAM_LIST,
  GET_MEMBERSHIP_LIST,
  GET_AFTER_CAMPS,
})(StudentTable);
const memebeshipType = [
  { membership_name: "Trial" },
  { membership_name: "Beginner" },
  { membership_name: "BBC" },
  { membership_name: "LC" },
  { membership_name: "IC" },
  { membership_name: "MC" },
  { membership_name: "After School" },
];
