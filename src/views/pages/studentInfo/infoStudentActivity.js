import React from "react";
import { Card, Row, Col, CardContent } from "reactstrap";
import { connect } from "react-redux";
// import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
// import "../../../assets/scss/pages/users.scss";
import {
  GET_NOTES_BY_STUDENT,
  GET_STUDENT_ATTENDANCE,
} from "../../../redux/actions/newstudent";
import DataTable from "react-data-table-component";
import AttendanceHistory from "../newstudent/components/attendanceHistory";
import { ArrowDown } from "react-feather";
import moment from "moment";
import NoDataImage from "../../../../src/assets/img/nodatafound.png";
import "./style.css"

const customStyles = {
  headCells: {
    style: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#4F4F4F",
      width: "100%",
      display: "flex",
      justifyContent: "start",
      backgroundColor: "#eaf4fe",
      height: "36px"
    },
  },
  columnsCell: {
    style: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#4F4F4F",
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
  },
};

class UsersList extends React.Component {
  state = {
    pageSize: 20,
    isVisible: true,
    reload: false,
    collapse: true,
    defaultColDef: {
      resizable: true,
      editable: true,
      sortable: true,
      flex: 1,
    },
    searchVal: "",

    getRowHeight: function (params) {
      return 50;
    },
    columns: [
      {
        name: "Date",
        sortable: true,
        width: "100px",
        style: {
          display: "flex",
          justifyContent: "flex-start",
        },
        cell: (row) => <div>{moment(row?.data).format("MM/DD/YYYY")}</div>,
      },
      {
        cell: (row) => row.time,
        name: "Time",
        sortable: true,
        width: "110px",
      },
      {
        cell: (row) => row.noteType,
        name: "Type",
        sortable: true,
        width: "100px",
      },

      {
        cell: (row) => {
          return <div><p>{row.note}</p></div>
        },
        name: "Details",
        // width:"300px",
        sortable: true,
      },
    ],
  };

  async componentDidMount() {
    let studentId = window.location.pathname.split("/")[2];
    this.props.GET_NOTES_BY_STUDENT(studentId);
    this.props.GET_STUDENT_ATTENDANCE(0);
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  filterSize = (val) => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val));
      this.setState({
        pageSize: val,
      });
    }
  };
  updateSearchQuery = (val) => {
    this.gridApi.setQuickFilter(val);
    this.setState({
      searchVal: val,
    });
  };

  render() {
    const { columns } = this.state;
    const { NotesByStudentId } = this.props.student;
    return (
      <Row>
        <Col sm="12" lg="6" md="6">
          <AttendanceHistory
            getAttendanceByStudentId={this.props?.getAttendanceByStudentId}
          />

        </Col>
        <Col sm="12" lg="6" md="6">
          <Card
            style={{
              width: "100%",
              overflow: "scroll",
              boxShadow: "none",
              border: "1px solid #b8c2cc",
              marginTop: "1em",
              height: "100%",
              padding: "1em"
            }}
          >
            <h4 className="mb-1">Other Activity</h4>

            {
              NotesByStudentId.length > 0 ? (
                <div id="updated_table_ui">
                  <DataTable
                    responsive={true}
                    columns={columns}
                    data={NotesByStudentId || []}
                    noHeader
                    paginationPerPage={5}
                    defaultSortDirection={"asc"}
                    defaultSortField="firstName"
                    defaultSortAsc={true}
                    pagination
                    sortIcon={<ArrowDown style={{ color: "#bababa" }} />}
                    highlightOnHover
                    // touchScrollEnabled={true}
                    customStyles={customStyles}
                  />
                </div>

              ) : (
                <center>
                  <img
                    src={NoDataImage}
                    height="160px"
                    alt="No Data"
                  />
                  <b />
                  <h4>No Data</h4>
                </center>
              )
            }
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    student: state.student,
    getAttendanceByStudentId: state.student.getAttendanceByStudentId,
  };
};

export default connect(mapStateToProps, {
  GET_NOTES_BY_STUDENT,
  GET_STUDENT_ATTENDANCE,
})(UsersList);
