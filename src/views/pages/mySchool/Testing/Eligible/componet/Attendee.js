import { Avatar, Chip } from "@material-ui/core";
import moment from "moment";
import React from "react";
import DataTable from "react-data-table-component";
import ActionForEyemodal from "../../../../../apps/user/list/ActionForEyemodal";
import TestPaper from "../../../../../apps/user/list/testData";
const customStyles = {
  headCells: {
    style: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#4F4F4F",
      width: "100%",
      display: "flex",
      justifyContent: "center",
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
  ".gKsGGb": {
    minWidth: "30px !important",
    background: "red",
  },
};

const Attendee = (props) => {
  const columns = [
    {
      name: "Full Name",
      selector: (row) => row.firstName,
      sortable: true,
      width: "150px",
      style: {
        display: "flex",
        justifyContent: "flex-start",
      },
      cell: (row) => (
        <div>
          <span
            style={{ paddingLeft: "0.8" }}
            className="text-capitalize"
          >{`${row.firstName} ${row.lastName}`}</span>
        </div>
      ),
    },
    {
      selector: (row) => row.program,
      name: "Program",
      sortable: true,
      width: 130,
      style: {
        display: "flex",
        justifyContent: "center",
      },
    },
    {
      selector: (row) => row.current_rank_img,
      name: "Rank",
      sortable: true,
      width: 130,
      style: {
        display: "flex",
        justifyContent: "center",
      },
      cell: (row) => {
        return (
          <>
            <Avatar
              style={{
                height: "2em",
                widht: "2em",
                margin: "0px",
                objectFit: "contain !importent",
              }}
              src={row?.current_rank_img}
              alt={row?.current_rank_name}
            />
          </>
        );
      },
    },
    {
      selector: (row) => row.next_rank_img,
      name: "Next Rank",
      sortable: true,
      width: 130,
      style: {
        display: "flex",
        justifyContent: "center",
      },
      cell: (row) => {
        return (
          <>
            <Avatar
              style={{
                height: "2em",
                widht: "2em",
                margin: "0px",
                objectFit: "contain !importent",
              }}
              src={row?.next_rank_img}
              alt={row?.next_rank_name}
            />
          </>
        );
      },
    },
    {
      selector: (row) => row.lastPromoedDate,
      name: "Last Promoted",
      sortable: true,
      width: 160,
      style: {
        display: "flex",
        justifyContent: "center",
      },
      cell: (row) => {
        return (
          <>
            <span>{moment(row?.lastPromotedDate).format("MM/DD/YYYY")}</span>
          </>
        );
      },
    },
  
    {
      selector: (row) => row.isPaid,
      name: "Status",
      sortable: true,
      width: 100,
      style: {
        display: "flex",
        justifyContent: "center",
      },
      cell: (row) => {
        return (
          <>
  
            <TestPaper studentData={row} selectedrow={props.selectedrow}/>
          </>
        );
      },
    },
  
    {
      name: "Action",
      sortable: false,
      width: 100,
      style: {
        display: "flex",
        justifyContent: "center",
      },
      cell: (row) => {
        return (
          <>
            <ActionForEyemodal item={row?.studentId} />
          </>
        );
      },
    },
  ];
  
  return (
    <div className="pt-2 card">
      <DataTable
        columns={columns}
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 50, 100]}
        data={props.data}
        noHeader
        defaultSortField="id"
        defaultSortAsc={false}
        pagination
        selectableRows
        highlightOnHover
        onSelectedRowsChange={props.handleSelectRows}
        customStyles={customStyles}
      />
    </div>
  );
};

export default Attendee;

