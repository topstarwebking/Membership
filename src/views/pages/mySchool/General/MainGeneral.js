import React, { useEffect, useState } from "react";
import { Card, Chip, Collapse, Typography, Avatar } from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import moment from "moment";
import StudentlistuserEyeModal from "../../../dashboard1/StudentlistuserEyeModal";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import "react-toastify/dist/ReactToastify.css";
import NestedTable from "./NestedTable";
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
    gridTemplateColumns: " 20% 10% 15% 15% 15% 15% auto",
  },
}));

const MainGeneral = (props) => {
  const classes = useStyles();
  const [collapase, setCollapse] = useState(null);
  const [pageNumber, setpageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { rowdata, GetMoreNewData, studentType } = props;
  const [data, setData] = useState(null);

  const handleOpenCollapse = (id) => {
    if (collapase === id) {
      setCollapse(null);
    } else {
      setCollapse(id);
    }
  };

  useEffect(() => {
    if (rowdata === null) {
      setData(null);
    } else {
      setData(rowdata);
    }
  }, [rowdata]);

  const handlePagination = async (e, value) => {
    setData(null);
    setpageNumber(value);
    setRowsPerPage(5);
    await GetMoreNewData(value, rowsPerPage);
  };

  useEffect(() => {
    let params = {
      studentType,
    };
    if (studentType === "All") {
      GetMoreNewData(pageNumber, rowsPerPage);
    } else {
      GetMoreNewData(pageNumber, rowsPerPage, params);
    }
  }, [studentType, GetMoreNewData, pageNumber, rowsPerPage]);
  return (
    <div>
      <Card className={classes.cardStyle}>
        <div className="pl-1 pr-1 pt-0">
          <div className={`p-1 pt-0 ${classes.row} border-bottom`}>
            <div className="d-flex justify-content-start">
              <b>Full Name </b>
            </div>
            <div className="d-flex justify-content-start">
              <b>Status</b>
            </div>
            <div className="d-flex justify-content-start">
              <b>Phone</b>
            </div>
            <div className="d-flex justify-content-start">
              <b>Last Attended</b>
            </div>
            <div className="d-flex justify-content-start">
              <b>Last Contacted</b>
            </div>
            <div className="d-flex justify-content-start">
              <b>Notes</b>
            </div>
            <div className=" d-flex justify-content-center">
              <b>Manage</b>
            </div>
          </div>
          {data?.data?.length > 0 ? (
            data?.data?.map((item, i) => {
              return (
                <div>
                  <div
                    key={i}
                    style={{ borderBottom: "1px solid #dddddd" }}
                    onClick={() => handleOpenCollapse("pannel" + i)}
                  >
                    <div className={classes.row}>
                      <div className="d-flex justify-content-start align-items-center cursor-pointer">
                        {collapase === "pannel" + i ? (
                          <ExpandLessIcon className="mr-1" />
                        ) : (
                          <ExpandMoreIcon className="mr-1" />
                        )}
                        <span>{item?.class_name}</span>
                        {/* <Avatar
                          src={item?.firstName}
                          alt={item?.firstName}
                          style={{ height: "1.5em", width: "1.5em" }}
                        /> */}
                        <Typography
                          style={{
                            fontSize: "12px",
                            marginBottom: "0px",
                            // marginLeft: "1em",
                          }}
                          color="textSecondary"
                        >
                          {item?.firstName} {item?.lastName}
                        </Typography>
                      </div>
                      <div className="d-flex align-items-start justify-content-start">
                        <Chip
                          size="small"
                          style={{
                            marginRight: "1px",
                            background:
                              item?.status.toLowerCase() === "active"
                                ? "#def8e7"
                                : "#f9d2d0",
                            color:
                              item?.status.toLowerCase() === "active"
                                ? "#55a65b"
                                : "#e05252",
                            fontWeight: "bold",
                            fontSize: "0.8  em",
                          }}
                          // size="small"
                          label={item?.status.toUpperCase()}
                        />
                      </div>
                      <div className="d-flex align-items-center justify-content-start">
                        {item?.primaryPhone}{" "}
                      </div>
                      <div className="d-flex align-items-center justify-content-start">
                        {item?.last_attended_date
                          ? moment(item?.last_attended_date).format(
                              "MM/DD/YYYY"
                            )
                          : "N/A"}
                      </div>
                      <div className="d-flex align-items-center justify-content-start">
                        {item?.notes ? item?.notes.date : "N/A"}
                      </div>
                      <div className="d-flex align-items-center justify-content-start">
                        <span>{item?.notes ? item?.notes.note : "N/A"}</span>
                      </div>
                      <div className="d-flex align-items-center justify-content-center">
                        <StudentlistuserEyeModal studentInfo={item} />
                      </div>
                    </div>
                    <Collapse in={collapase === "pannel" + i}>
                      <div className="p-1">
                        <NestedTable data={item?.memberships} />
                      </div>
                    </Collapse>
                  </div>
                </div>
              );
            })
          ) : (
            <center>
              <img src={NoDataImage} height="160px" alt="No Data" />
              <b />
              <h4>No Data</h4>
            </center>
          )}
          <TablePagination
            component="div"
            count={Number(data?.totalCount) || 0}
            page={pageNumber}
            onPageChange={handlePagination}
            rowsPerPage={10}
            labelRowsPerPage=""
            rowsPerPageOptions={[]}
          />
        </div>
      </Card>
    </div>
  );
};
// const mapStateToProps = (state) => {
//   return {
//     attendeeList: state.calendar.attendeeList,
//     seachClass: state.calendar.seachClass,
//   };
// };

export default MainGeneral;
