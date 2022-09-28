import React from "react";
import {
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Table,
  Avatar,
  Tooltip,
} from "@material-ui/core";
import { Info } from "react-feather";
import StudentlistuserEyeModal from "../../dashboard1/StudentlistuserEyeModal";
const NestedTable = (props) => {
  const { data } = props;
  return (
    <div>
      {data?.length > 0 ? (
        <Table
          style={{ overflow: "auto", background: "#f8f8f8", margin: "0.5" }}
        >
          <TableHead>
            <TableRow>
              <TableCell style={{ padding: "0.8em" }}>
                <b>Profile</b>
              </TableCell>
              <TableCell style={{ padding: "0.8em" }} align="right">
                <b>Student</b>
              </TableCell>
              <TableCell style={{ padding: "0.8em" }}>
                <b>Phone</b>
              </TableCell>
              <TableCell
                style={{ padding: "0.8em", width: "10em" }}
                align="right"
              >
                <b>Notes</b>
              </TableCell>
              <TableCell
                style={{ padding: "0.8em", width: "10em" }}
                align="right"
              >
                <b>Manage</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length > 0
              ? data?.map((item, i) => {
                return (
                  <TableRow key={new Date().getTime()}>
                    <TableCell style={{ padding: "0.2em" }} align="left">
                      <Avatar
                        className="p-0"
                        src={item?.memberprofileImage}
                        alt={item?.firstName}
                      />
                    </TableCell>
                    <TableCell style={{ padding: "0.8em" }} align="left">
                      <Typography className="m-0 pl-0">
                        {`${item?.firstName} ${item?.lastName}`}
                      </Typography>
                    </TableCell>
                    <TableCell style={{ padding: "0.8em" }}>
                      {item?.primaryPhone}
                    </TableCell>
                    <TableCell style={{ padding: "0.8em" }}>
                      <Tooltip
                        arrow
                        title={
                          <p
                            style={{
                              fontSize: "1em",
                              marginBottom: "0px",
                              padding: "0",
                            }}
                          >
                            <b>{item?.notes || "no notes"}</b>
                          </p>
                        }
                      >
                        <div className="d-flex justify-content-start m-1 ml-0">
                          <Info size={19} />
                        </div>
                      </Tooltip>
                    </TableCell>

                    <TableCell style={{ padding: "0.8em" }}>
                      <StudentlistuserEyeModal studentInfo={item} />
                    </TableCell>
                  </TableRow>
                );
              })
              : null}
          </TableBody>
        </Table>
      ) : (
        <div className="d-flex justify-content-center">No Data Found !</div>
      )}
    </div>
  );
};

export default NestedTable;
