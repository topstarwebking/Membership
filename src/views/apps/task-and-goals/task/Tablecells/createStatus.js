import { Chip } from "@material-ui/core";
import React, { useState } from "react";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { EDIT_TASK, EDIT_TASK_WITHOUT_GONE_INTO_FOLDER } from "../../../../../redux/actions/task-and-goals/task";
import { connect } from "react-redux";

function hexToRGB(hex, alpha) {
  try {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  } catch (error) {
    return hex;
  }
}
const CreateStatus = (props) => {
  const { row, EDIT_TASK, EDIT_TASK_WITHOUT_GONE_INTO_FOLDER } = props;
  const [changeStatus, setChangeStatus] = useState(row?.status);
  const history = useHistory();

  const handleChangeStatus = (lable) => {
    if (row?.subfolderId?._id !== undefined) {
      EDIT_TASK_WITHOUT_GONE_INTO_FOLDER(
        { ...row, status: lable },
        { _id: row?._id },
      );
    } else {
      EDIT_TASK(
        { ...row, status: lable },
        { _id: row?._id },
        history?.maintaskFolderId,
        history?.subtaskFolderId
      );
    }

    setChangeStatus(lable);
  };

  const getColor = (status) => {
    if (status === "Due") {
      return { c: "#FF0000", bg: hexToRGB("#FF0000", 0.16) };
    } else if (status === "Completed") {
      return { c: "#37D400", bg: hexToRGB("#37D400", 0.16) };
    } else if (status === "Past Due") {
      return { c: "#B1530F", bg: hexToRGB("#B1530F", 0.16) };
    } else if (status === "Pending") {
      return { c: "#FFB800", bg: hexToRGB("#FFB800", 0.16) };
    }
  };

  return (
    <UncontrolledDropdown>
      <DropdownToggle>
        <Chip
          size="small"
          label={row?.status}
          className="rounded rounded"
          style={{
            fontWeight: "bold",
            background: getColor(row?.status)?.bg,
            color: getColor(row?.status)?.c,
          }}
        />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem className="d-flex justify-content-center w-100">
          <Chip
            size="small"
            label="Completed"
            className="rounded rounded"
            style={{
              fontWeight: "bold",
              background: getColor("Completed").bg,
              color: getColor("Completed").c,
            }}
            onClick={() => {
              handleChangeStatus("Completed");
            }}
          />
        </DropdownItem>
        <DropdownItem className="d-flex justify-content-center w-100">
          <Chip
            size="small"
            label="Past Due"
            className="rounded rounded"
            style={{
              fontWeight: "bold",
              background: getColor("Past Due").bg,
              color: getColor("Past Due").c,
            }}
            onClick={() => {
              handleChangeStatus("Past Due");
            }}
          />
        </DropdownItem>
        <DropdownItem className="d-flex justify-content-center w-100">
          <Chip
            size="small"
            label="Pending"
            className="rounded rounded"
            style={{
              fontWeight: "bold",
              background: getColor("Pending").bg,
              color: getColor("Pending").c,
            }}
            onClick={() => {
              handleChangeStatus("Pending");
            }}
          />
        </DropdownItem>
        <DropdownItem className="d-flex justify-content-center w-100">
          <Chip
            size="small"
            label="Due"
            className="rounded rounded"
            style={{
              fontWeight: "bold",
              background: getColor("Due").bg,
              color: getColor("Due").c,
            }}
            onClick={() => {
              handleChangeStatus("Due");
            }}
          />
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default connect(null, { EDIT_TASK, EDIT_TASK_WITHOUT_GONE_INTO_FOLDER })(CreateStatus);
