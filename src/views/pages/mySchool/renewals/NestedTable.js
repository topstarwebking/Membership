import React from "react";
import {
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Table,
  Chip,
} from "@material-ui/core";
import moment from "moment";
const NestedTable = (props) => {
  const { data } = props;

  return (
    <Table style={{ overflow: "auto", background: "#f8f8f8", margin: "0.5" }}>
      <TableHead>
        <TableRow>
          <TableCell style={{ padding: "0.8em" }}>
            <b>Membership</b>
          </TableCell>
          <TableCell style={{ padding: "0.8em" }} align="right">
            <b>Status</b>
          </TableCell>
          <TableCell style={{ padding: "0.8em" }}>
            <b>End Date</b>
          </TableCell>
          <TableCell style={{ padding: "0.8em", width: "10em" }} align="right">
            <div>
              <b>{data[0]?.days_till_Expire ? "Days Left" : "Days Expired"}</b>
            </div>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.length > 0
          ? data?.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell style={{ padding: "0.8em" }} align="left">
                    <Typography className="m-0 pl-0">
                      {`${item?.membership_name}`}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ padding: "0.8em" }} align="left">
                    <Typography align="left" className="m-0">
                      {item?.membership_status}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ padding: "0.8em" }}>
                    {moment(item?.expiry_date).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell style={{ padding: "0.8em" }}>
                    <Chip
                      size="small"
                      label={
                        item?.days_till_Expire ? item?.days_till_Expire : "N/A"
                      }
                      style={{
                        color:
                          item?.days_till_Expire > 7 ? "#65b06b" : "#e05252",
                        background:
                          item?.days_till_Expire > 7 ? "#def8e7" : "#f6d2d0",
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          : null}
      </TableBody>
    </Table>
  );
};

export default NestedTable;
