import { Chip } from "@material-ui/core";
import React from "react";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { Edit, Trash } from "react-feather";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

const CreateStatus = (props) => {
  const { row } = props;
  const getColor = (status) => {
    if (status === "incomplete") {
      return "#FF0000";
    } else if (status === "completed") {
      return "#37D400";
    } else if (status === "inprogress") {
      return "#B1530F";
    } else if (status === "pending") {
      return "#FFB800";
    }
  };
  return (
    <UncontrolledDropdown>
      <DropdownToggle>
        <Chip
          size="small"
          label={row?.Status}
          className="text-capitalize cursor-pointer"
          style={{
            fontWeight: "bold",
            background: getColor(row?.Status),
            color: "#fff",
          }}
        />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem>
          <Chip
            size="small"
            label={"In Complete"}
            className="text-capitalize w-100"
            style={{
              fontWeight: "bold",
              background: getColor("incomplete"),
              color: "#fff",
            }}
          />
        </DropdownItem>
        <DropdownItem>
          <Chip
            size="small"
            label={"Completed"}
            className="text-capitalize w-100"
            style={{
              fontWeight: "bold",
              background: getColor("completed"),
              color: "#fff",
            }}
          />
        </DropdownItem>
        <DropdownItem>
          <Chip
            size="small"
            label={"inprogress"}
            className="text-capitalize w-100"
            style={{
              fontWeight: "bold",
              background: getColor("inprogress"),
              color: "#fff",
            }}
          />
        </DropdownItem>
        <DropdownItem>
          <Chip
            size="small"
            label={"pending"}
            className="text-capitalize w-100"
            style={{
              fontWeight: "bold",
              background: getColor("pending"),
              color: "#fff",
            }}
          />
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

const MakeAction = (props) => {
  // const { row } = props

  return (
    <UncontrolledDropdown>
      <DropdownToggle className="cursor-pointer">
        <MoreHorizIcon fontSize="large" style={{ color: "#C4C4C4" }} />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem>
          <Edit size={24} className="mr-1" style={{ color: "#0184FF" }} />
          Edit
          {/* <Chip size='small' label={'In Complete'}
                        className='text-capitalize w-100'
                        style={{ fontWeight: 'bold', background: getColor('incomplete'), color: '#fff' }} /> */}
        </DropdownItem>
        <DropdownItem>
          <Trash size={24} className="mr-1" style={{ color: "#EB5757" }} />{" "}
          Delete
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
export const columns = [
  {
    name: "Name",
    selector: (row) => row.title,
    sortable: true,
    style: {
      display: "flex",
      justifyContent: "center",
    },
    cell: (row) => (
      <span>
        {row?.title} {row?.id}{" "}
      </span>
    ),
  },
  // {
  //     name: "Label",
  //     selector: (row) => row.Label",
  //     sortable: true,
  //     style: {
  //         display: 'flex',
  //         justifyContent: 'center'
  //     },
  //     // cell: (row) => (
  //     //     <Chip size='small'
  //     //         label={row?.Label}
  //     //         // className='text-capitalize '
  //     //         style={{ fontWeight: 'bold', background: 'rgba(1, 132, 255, 0.15)', color: '#0184FF' }} />),

  // },
  {
    name: "Due Date",
    selector: (row) => row.DueDate,
    sortable: true,
    style: {
      display: "flex",
      justifyContent: "center",
    },
  },
  // {
  //     name: "Priority",
  //     selector: (row) => row.Priority",
  //     sortable: true,
  //     style: {
  //         display: 'flex',
  //         justifyContent: 'center'
  //     },
  //     // cell: (row) => (
  //     //     <PriorityStatus row={row} />
  //     // ),
  // },
  {
    name: "Status",
    selector: (row) => row.Status,
    sortable: true,
    cell: (row) => <CreateStatus row={row} />,
    style: {
      display: "flex",
      justifyContent: "center",
    },
  },
  {
    name: "Action",
    selector: (row) => row.Status,
    sortable: true,
    style: {
      display: "flex",
      justifyContent: "center",
    },
    cell: (row) => <MakeAction row={row} />,
  },
];
