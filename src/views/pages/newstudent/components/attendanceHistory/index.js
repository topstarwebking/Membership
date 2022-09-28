import moment from "moment";
import React from "react";
import { CardContent, Card, Chip } from "@material-ui/core";
import DataTable from "react-data-table-component";
import { ArrowDown } from "react-feather";
import NoDataImage from "../../../../../assets/img/nodatafound.png";

const getFormattedDate = (date)=>{
  let _date = new Date(date)
}

const columns = [
  {
    name: "Date",
    sortable: false,
    filterable: false,
    cell: (params) => {
      return <>{(params?.attendence?.date)} </>;
    },
  },
  // {
  //   name: "Attended",
  //   sortable: false,
  //   filterable: false,
  //   cell: (params) => {
  //     return <>Attended</>;
  //   },
  // },
  {
    name: "Name",
    sortable: false,
    filterable: false,
    cell: (params) => {
      return <p className="mb-0" >{params?.class_name}</p>;
    },
  },
  {
    name: "Time",
    sortable: false,
    filterable: false,
    // width:"120px",
    cell: (params) => {

      return <> {moment(params?.attendence?.time).format("hh:mm:ss A")}</>;
    },
  },
  {
    name: "Type",
    sortable: false,
    filterable: false,
    width: "70px",
    cell: (params) => {
      return <>NA</>;
    },
  },
  {
    name: "Details",
    sortable: false,
    filterable: false,
    cell: (params) => {
      return moment(params?.start_date).format("MM/DD/YYYY");
    },
  },

];

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
const AttendanceHistory = (props) => {
  return (
    <Card
      style={{
        width: "100%",
        overflowX: "scroll",
        boxShadow: "none",
        border: "1px solid #b8c2cc",
        marginTop: "1em",
        height: "100%",
      }}
    >
      <CardContent>
        <h4 className="mb-1">Attendance Activity</h4>
        <div id="updated_table_ui">
          {
            props.getAttendanceByStudentId?.data || [].length > 0 ? (
              <DataTable
                responsive={true}
                columns={columns}
                data={props.getAttendanceByStudentId?.data || []}
                noHeader
                paginationPerPage={5}
                defaultSortDirection={"asc"}
                defaultSortField="firstName"
                defaultSortAsc={true}
                pagination
                sortIcon={<ArrowDown style={{ color: "#bababa" }} />}
                highlightOnHover
                customStyles={customStyles}
              />
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
        </div>
      </CardContent>
    </Card>
  );
};
export default AttendanceHistory;
