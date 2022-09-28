import React, { useState, useEffect } from "react";
import Mangecategory from "./mangecategory";
import { Typography, Chip } from "@material-ui/core";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "reactstrap";
import { ManageCategory } from "./menuCategoryEditDelete";
import {
  DELETE_APPOINTMENT_OR_EVENT_CATEGORY,
  APPOINTMENT_CATEGORYLIST,
} from "../../../../redux/actions/appointment";
import RowSkeleton from "../../../dashboard1/components/RowSkeleton";
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";

const ListAllCategories = (props) => {
  const { appointmentCategoryList } = props;
  const [actionOn, setActionOn] = useState(null);
  const [open, setOpen] = useState(false);
  const handleCloseOpen = () => {
    setOpen(!open);
    setActionOn(null);
  };

  const handleAction = (item) => {
    setOpen(!open);
    if (actionOn !== null) {
      setActionOn(null);
    } else {
      setActionOn(item);
    }
  };
  useEffect(() => {
    props.APPOINTMENT_CATEGORYLIST();
  }, []);

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between p-1">
          <Typography className="pb-0">
            <b>Category</b>
          </Typography>
          <Button.Ripple
            // onClick={handleCloseOpen} 
            disabled={true}
            color="primary">
            <b>Add Category</b>
          </Button.Ripple>
        </div>
        {appointmentCategoryList === null ? (
          [1, 2, 3, 4, 5, 6, 7].map((item) => {
            return <RowSkeleton key={item} />;
          })
        ) : (
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <b>Category</b>
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <b>Type</b>
                  </TableCell>
                  <TableCell style={{ textAlign: "right" }}>
                    <b>Manage</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointmentCategoryList?.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      <Chip
                        size="small"
                        label={row?.app_event_name}
                        style={{ color: "#fff", background: row?.app_color }}
                        className={"rounded"}
                      />
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "center" }}
                      className="text-capitalize"
                    >
                      {row?.category}
                    </TableCell>
                    <TableCell style={{ textAlign: "right" }}>
                      {row?.adminId !== undefined ? (
                        <HttpsOutlinedIcon
                          style={{ color: "#757575", fontSize: "1.2em" }}
                        />
                      ) : (
                        <ManageCategory
                          handleCloseOpen={handleAction}
                          item={row}
                          deleteAPI={props.DELETE_APPOINTMENT_OR_EVENT_CATEGORY}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      <Mangecategory
        item={actionOn}
        handleCloseOpen={handleCloseOpen}
        open={open}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    appointmentCategoryList: state.appointmentAndEvent.appointmentCategoryList,
  };
};

export default connect(mapStateToProps, {
  DELETE_APPOINTMENT_OR_EVENT_CATEGORY,
  APPOINTMENT_CATEGORYLIST,
})(ListAllCategories);
