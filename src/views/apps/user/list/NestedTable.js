import React, { useEffect, useState } from "react";
import {
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Table,
} from "@material-ui/core";
import moment from "moment";
// import StudentlistuserEyeModal from "../../dashboard1/StudentlistuserEyeModal";
const NestedTable = (props) => {
  const { data, selectedItem, lastStripe } = props;

  return (
    <div>
      {data.length > 0 ? (
        <Table
          style={{ overflow: "auto", background: "#f8f8f8", margin: "0.5" }}
        >
          <TableHead>
            <TableRow>
              <TableCell style={{ padding: "0.8em" }}>
                <b>Candidate</b>
              </TableCell>
              <TableCell style={{ padding: "0.8em" }} align="right">
                <b>Current Stripe</b>
              </TableCell>
              <TableCell style={{ padding: "0.8em" }}>
                <b>Last Stripe Given</b>
              </TableCell>
              <TableCell style={{ padding: "0.8em" }}>
                <b>Reason</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length > 0
              ? data?.sort(function(a,b){
                return new Date(a.last_stripe_given).getTime() - new Date(b.last_stripe_given).getTime();
              }).map((item, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell style={{ padding: "0.8em" }} align="left">
                      <Typography className="m-0 pl-0">
                        {`${item?.candidate || "no data"} `}
                      </Typography>
                    </TableCell>
                    <TableCell style={{ padding: "0.8em" }}>
                      {item?.current_stripe || "#stripe0"}
                    </TableCell>
                    <TableCell style={{ padding: "0.8em" }}>
                      {moment(item?.last_stripe_given).format("MM/DD/YYYY")}
                    </TableCell>
                    <TableCell style={{ padding: "0.8em" }}>
                      {selectedItem[i]?.candidate === item?.candidate ? selectedItem[i - 1]?.reason : ""}
                    </TableCell>
                  </TableRow>
                );
              })
              : null}
          </TableBody>
        </Table>
      ) : (
        <div className="d-flex justify-content-center">Nodata</div>
      )}
    </div>
  );
};

export default NestedTable;
