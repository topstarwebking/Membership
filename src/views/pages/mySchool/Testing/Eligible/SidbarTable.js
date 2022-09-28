import { Chip } from "@material-ui/core";
import { ArrowDown } from "react-feather";
import moment from "moment";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
const customStyles = {
  headCells: {
    style: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#4F4F4F",
      width: "100%",
      display: "flex",
      justifyContent: "start",
    },
  },
  columnsCell: {
    style: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#4F4F4F",
      width: "100%",
      display: "flex",
      justifyContent: "start",
    },
  },
};

const SidbarTable = (props) => {
  const conditionalRowStyles = [
    {
      when: (row) => row?._id === props?.EventId,
      style: {
        backgroundColor: "#eaf4fe",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "#eaf4fe",
        },
      },
    },
  ];
  const column = [
    {
      name: "Date",
      selector: (row) => row.start,
      sortable: true,
      style: {
        display: "flex",
        justifyContent: "start",
      },
      cell: (row) => {
        return <>{moment(row?.start).format("MM/DD/YYYY")}</>;
      },
    },
    {
      name: "Type",
      selector: (row) => row.appointment_type,
      sortable: true,
      style: {
        display: "flex",
        justifyContent: "start",
      },
    },
    {
      name: "Event Name",
      selector: (row) => row.title,
      sortable: true,
      style: {
        display: "flex",
        justifyContent: "start",
      },
      cell: (row) => {
        return <>{row?.title}</>;
      },
    },
    {
      name: "Action",
      selector: (row) => row.title,
      sortable: true,
      style: {
        display: "flex",
        justifyContent: "start",
      },
      cell: (row) => {
        return (
          <>
            <Chip
              label={"view"}
              size="small"
              style={{
                background: props.Id === `${row?._id}` && "#0184ff",
                color: props.Id === `${row?._id}` && "#fff",
              }}
              onClick={() => {
                props.handledata(row?.appointment_type, row?._id, row);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <div>
      <DataTable
        responsive={true}
        columns={column}
        data={props.data || []}
        noHeader
        defaultSortDirection={"asc"}
        defaultSortField="firstName"
        defaultSortAsc={true}
        pagination
        sortIcon={<ArrowDown style={{ color: "#bababa" }} />}
        highlightOnHover
        conditionalRowStyles={conditionalRowStyles}
        customStyles={customStyles}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    EventId: state.test.EventId,
  };
};
export default connect(mapStateToProps, null)(SidbarTable);
