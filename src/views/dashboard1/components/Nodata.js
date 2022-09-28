import { TableCell ,TableRow} from "@material-ui/core";
import React from "react";

const Nodata = () => {
  return (
    <TableRow>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell className="">
        <div
          className="d-flex justify-content-center m-1"
          style={{ width: "100%", height: "100%" }}
        >
          <div>
            <h4 className="ml-10">No Data Found !</h4>
          </div>
        </div>
      </TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};

export default Nodata;
