import { Avatar, Chip } from "@material-ui/core";
import moment from "moment";
import React from "react";
import DataTable from "react-data-table-component";
import ActionForEyemodal from "../../../../../apps/user/list/ActionForEyemodal";
import TestPaper from "../../../../../apps/user/list/testData";
const NotAttende = (props) => {
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
        justifyContent: "start",
      },
    },
    {
      selector: (row) => row.current_rank_img,
      name: "Rank",
      sortable: true,
      width: 130,
      style: {
        display: "flex",
        justifyContent: "start",
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
        justifyContent: "start",
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
      selector: (row) => row.lastPromotedDate,
      name: "Last Promoted",
      sortable: true,
      width: 160,
      style: {
        display: "flex",
        justifyContent: "start",
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
        justifyContent: "start",
      },
      cell: (row) => {
        return (
          <>
            <TestPaper studentData={row} selectedrow={props.selectedrow} />
          </>
        );
      },
    },
    {
      selector: (row) => row.Action,
      name: "Action",
      sortable: false,
      width: 100,
      style: {
        display: "flex",
        justifyContent: "start",
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
      />
    </div>
  );
};

export default NotAttende;
