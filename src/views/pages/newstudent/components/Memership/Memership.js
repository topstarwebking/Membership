import * as React from "react";
import {
  Chip,
  TableCell,
  Table,
  TableRow,
  TableContainer,
  TableBody,
} from "@material-ui/core";

const Memership = (props) => {
  const { item } = props;
  return (
    <TableContainer>
      <Table style={{ background: "#eaf4fe" }}>
        <TableBody>
          {item?.map((i, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{i?.membership_name}</TableCell>
                <TableCell>
                  <Chip
                    label={i?.membership_status}
                    size="small"
                    style={{
                      marginRight: "1px",
                      background:
                        i?.membership_status?.toLowerCase() === "active"
                          ? "#def8e7"
                          : i?.membership_status?.toLowerCase() === "expired"
                          ? "#f6d2d0"
                          : "#f6d2d0",
                      color:
                        i?.membership_status?.toLowerCase() === "active"
                          ? "#55a65b"
                          : i?.membership_status?.toLowerCase() === "expired"
                          ? "#e46666"
                          : "#e46666",

                      fontWeight: "bold",
                      fontSize: "1em",
                    }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Memership;
