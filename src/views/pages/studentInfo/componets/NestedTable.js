import React from "react";
import {
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Table,
} from "@material-ui/core";
import moment from "moment";
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
                <b> Amount</b>
              </TableCell>
              <TableCell style={{ padding: "0.8em" }} align="right">
                <b>Payment Type</b>
              </TableCell>
              <TableCell style={{ padding: "0.8em" }}>
                <b>Status</b>
              </TableCell>
              <TableCell
                style={{ padding: "0.8em", width: "10em" }}
                align="right"
              >
                <b>Date</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length > 0
              ? data?.map((item, i) => {
                  return (
                    <TableRow key={i + item?._id}>
                      <TableCell style={{ padding: "0.8em" }} align="left">
                        {` $ ${item?.Amount}`}
                      </TableCell>
                      <TableCell style={{ padding: "0.8em" }} align="left">
                        <Typography className="m-0 pl-0">
                          {`${item?.ptype} `}
                        </Typography>
                      </TableCell>
                      <TableCell style={{ padding: "0.8em" }}>
                        {item?.status}
                      </TableCell>
                      <TableCell style={{ padding: "0.8em" }}>
                        {moment(item?.date).format("MM/DD/YYYY")}
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
