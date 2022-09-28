import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { GET_NOTES_BY_MEMBERID } from "../../../../redux/actions/member";
import { DELETE_NOTE_BY_STUDENTID } from "../../../../redux/actions/newstudent";
import { FormGroup, CustomInput } from "reactstrap";

import {
  Card,
  CardContent,
  Chip,
  TableHead,
  Typography,
} from "@material-ui/core";
import { TablePagination } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import SweetAlert from "react-bootstrap-sweetalert";
import moment from "moment";

const NotesTable = (props) => {
  const { getNotesByMemberId, GET_NOTES_BY_MEMBERID } = props;
  const [NotesListSelect, setNotesListSelect] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [defaultAlert, setDefaultAlert] = useState(false);
  const [SelectedNote, setSelectedNote] = useState(false);
  const [seemore, setseemore] = useState(false);
  useEffect(() => {
    GET_NOTES_BY_MEMBERID();
  }, [GET_NOTES_BY_MEMBERID]);

  useEffect(() => {
    setNotesListSelect(getNotesByMemberId);
  }, [getNotesByMemberId]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handlseemore = (id) => {
    if ("seemoreId" + id === seemore) {
      setseemore("");
    } else {
      setseemore("seemoreId" + id);
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const ConFirmDelete = () => {
    props.DELETE_NOTE_BY_STUDENTID(SelectedNote);
    setDefaultAlert(false);
    GET_NOTES_BY_MEMBERID();
  };

  const DeleteNote = (note) => {
    setSelectedNote(note);
    setDefaultAlert(true);
  };
  return (
    <Fragment>
      <Card
        className="mb-1 rounded"
        style={{
          boxShadow:
            "0 0 2px 0 rgb(145 158 171 / 24%), 0 16px 32px -4px rgb(145 158 171 / 24%)",
        }}
      >
        <div
          className="d-flex justify-content-start p-1"
          style={{ fontSize: "1em" }}
        >
          <b>{`${props.title} Notes`}</b>
        </div>
        <div className="d-flex justify-content-end p-1">
          <FormGroup className="form-label-group">
            <CustomInput required type="select" name="" id="profiletype">
              <option value="This Month">This Month</option>
              <option value="This Week">This Week</option>
              <option value="Today">Today</option>
            </CustomInput>
          </FormGroup>
        </div>
        <CardContent>
          <TableContainer style={{ width: "100%", height: "76vh" }}>
            <Table className="table-hover" size="small">
              <TableHead>
                <TableCell>
                  <b>Full Name</b>
                </TableCell>
                <TableCell className="p-0">
                  <b>Date & Time</b>
                </TableCell>
                <TableCell className="p-0">
                  <b>Status</b>
                </TableCell>
                <TableCell className="p-0">
                  <b>Notes</b>
                </TableCell>
                <TableCell className="p-0">
                  <b>Manage</b>
                </TableCell>
              </TableHead>
              <TableBody>
                {NotesListSelect.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      {item?.firstName} {item?.lastName}
                    </TableCell>
                    <TableCell className="p-0">
                      {moment(item?.date).format("MM/DD/YYYY")}
                      <Typography style={{ marginBottom: "0px" }}>
                        {moment(`${item?.date} ${item?.time}`).format(
                          "hh:mm A"
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell className="p-0">
                      <Chip
                        size="small"
                        label={item?.followupType}
                        style={{
                          background: "#dee8ff",
                          color: "#1d54d8",
                          fontWeight: "bold",
                        }}
                      />
                    </TableCell>
                    <TableCell className="p-0">
                      <Typography
                        color="textSecondary"
                        style={{ marginBottom: "0px", width: "8em" }}
                        className={`${
                          seemore === "seemoreId" + i
                            ? ""
                            : "col-6 text-truncate"
                        } p-0`}
                      >
                        {item?.note}
                      </Typography>
                      <Chip
                        onClick={() => {
                          handlseemore(i);
                        }}
                        label={
                          seemore === "seemoreId" + i
                            ? "Show less"
                            : "Show more"
                        }
                        size="small"
                        style={{ background: "none", color: "#5982e4" }}
                      />
                    </TableCell>
                    <TableCell className="p-0">
                      <DeleteIcon
                        onClick={() => {
                          DeleteNote(item);
                        }}
                        color="action"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={getNotesByMemberId.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardContent>
      </Card>
      <SweetAlert
        title="Are you sure?"
        warning
        show={defaultAlert}
        showCancel
        reverseButtons
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        onConfirm={ConFirmDelete}
        onCancel={() => {
          setDefaultAlert(false);
        }}
      >
        You won't be able to revert this!
      </SweetAlert>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    getNotesByMemberId: state.member.getNotesByMemberId,
  };
};

export default connect(mapStateToProps, {
  GET_NOTES_BY_MEMBERID,
  DELETE_NOTE_BY_STUDENTID,
})(NotesTable);
