import React, { Fragment, useEffect, useState } from "react";
import { FormGroup, CustomInput } from "reactstrap";
import {
  Card,
  Chip,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { TablePagination } from "@material-ui/core";
import SweetAlert from "react-bootstrap-sweetalert";
import moment from "moment";
import NoDataImage from "../../../../assets/img/nodatafound.png";


const useStyles = makeStyles(() => ({
  cardStyle: {
    boxShadow: "none",
    borderRadius: "8px",
  },
  avtStyle: {
    height: "30px",
    width: "30px",
  },
  inputStyle: {
    height: "3em",
    borderRadius: "0.4em",
    border: "1px solid #b8c2cc",
    "& div": {
      padding: "0px !important",
    },
  },
  row: {
    display: "grid",
    gridTemplateColumns: "25% 30% 25% 15% auto",
  },
}));

const TableNotes = (props) => {
  const classes = useStyles();
  const { GET_NOTES_BY_MEMBERID, setfilterBy } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [defaultAlert, setDefaultAlert] = useState(false);
  const [SelectedNote, setSelectedNote] = useState(false);
  const [seemore, setseemore] = useState(false);
  const { data, gobackdata } = props;

  useEffect(() => {
    gobackdata();
  }, [gobackdata]);

  const HanldeFilterNote = (e) => {
    let { value } = e.target;
    setfilterBy(value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(event.target.value);
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

  // const DeleteNote = (note) => {
  //   setSelectedNote(note);
  //   setDefaultAlert(true);
  // };
  return (
    <Fragment>
      <Card className={classes.cardStyle}>
        <div className="d-flex justify-content-between align-items-start mt-2">
          <Typography className="pl-1 mb-0" style={{ fontSize: "1em" }}>
            <b>{`${props.title} Notes`}</b>
          </Typography>
          <div className="d-flex justify-content-end align-items-center mr-2">
            <FormGroup className="form-label-group">
              <CustomInput
                onChange={HanldeFilterNote}
                required
                type="select"
                id="profiletype"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">Week</option>
                <option value="last_month">Last Month</option>
                <option value="this_month">This Month</option>
              </CustomInput>
            </FormGroup>
          </div>
        </div>
        <div className="px-1 pt-0">
          <div className={`pt-0 ${classes.row} border-bottom`}>
            <div className="d-flex justify-content-start">
              <b>Date & Time</b>
            </div>
            <div className="d-flex justify-content-center">
              <b>Full Name</b>
            </div>
            <div className="d-flex justify-content-center">
              <b>Status</b>
            </div>
            <div className="d-flex justify-content-center">
              <b>Notes</b>
            </div>
            {/* <div className="d-flex justify-content-center">
              <b>Manage</b>
            </div> */}
          </div>
          {data?.length > 0 ? (
            data?.map((item, i) => {
              return (
                <div  key={i}>
                  <div className={classes.row}>
                    <div className="">
                      <Typography className="mb-0 mt-1">
                        {moment(item?.createdAt).format("MM/DD/YYYY")} 
                      </Typography>
                      <Typography style={{fontSize: "12px"}} className="mt-0" >
                        {item?.time}
                      </Typography>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      {item?.firstName} {item?.lastName}
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      <Chip
                        size="small"
                        label={item?.followupType || "nodata"}
                        style={{
                          background: "#dee8ff",
                          color: "#1d54d8",
                          fontWeight: "bold",
                        }}
                      />
                    </div>
                    <div className="d-flex justify-content-start align-items-center">
                      <Typography
                        color="textSecondary"
                        style={{
                          fontSize: "10px",
                          marginBottom: "0px",
                          width: "5em",
                          maxWidth: "150px"
                        }}
                        className={`${seemore === "seemoreId" + i
                          ? ""
                          : "col-2 text-truncate"
                          }`}
                      >
                        {item?.note}

                      </Typography>

                      <Chip
                        onClick={() => {
                          handlseemore(i);
                        }}
                        label={
                          seemore === "seemoreId" + i
                            ? "less"
                            : "more"
                        }
                        size="small"
                        style={{
                          background: "none",
                          color: "#5982e4",
                        }}
                      />
                    </div>
                    {/* <div className="d-flex justify-content-center align-items-center">
                      <DeleteIcon
                        onClick={() => {
                          DeleteNote(item);
                        }}
                        color="action"
                      />
                    </div> */}
                  </div>
                </div>
              );
            })
          ) : (
            <center>
              <img
                src={NoDataImage}
                height="180px"
                alt="No Data"
              />
              <b />
              <h4>No Data</h4>
            </center>
          )}

          <TablePagination
            component="div"
            count={data?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
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

export default TableNotes;
