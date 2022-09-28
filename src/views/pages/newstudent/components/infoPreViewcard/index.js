import React, { useEffect, useState } from "react";
import { Collapse, Chip } from "@material-ui/core";
import moment from "moment";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Memership from "../Memership/Memership";

const useStyles = makeStyles(() => ({
  secondaryTitle: {
    color: "#424f60",
    textAlign: "right",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "50% 50%",
    padding: "0.5em",
  },
  limitedTex: {
    marginBottom: "3px",
    wordWrap: "break-word",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "4",
    maxHeight: "4em",
    wordBreak: "break-word",
  },
}));

const InfoPreViewCard = (props) => {
  const classes = useStyles();
  const [seemore, setseemore] = useState(false);
  const [collapase, setCollapse] = useState(null);
  const { studentinfo } = props;

  const handlseemore = () => {
    if ("seemore" === seemore) {
      setseemore("");
    } else {
      setseemore("seemore");
    }
  };
  const handleOpenCollapse = (id) => {
    if (collapase === id) {
      setCollapse(null);
    } else {
      setCollapse(id);
    }
  };


  const getMobileFormat = (number) => {
    let newNumber = number;
    var newph1 = newNumber.substr(0, 3);
    var newph2 = newNumber.substr(3, 3);
    var newph3 = newNumber.substr(6, 4);
    return newph1 + "-" + newph2 + "-" + newph3;
  };
  return (
    <div>
      <div className={classes.cardStyle}>
        <div className="pt-0">
          <div className="px-2">
            {/* <h5 className="mt-1">Contact Info</h5> */}
            <div className="d-flex justify-content-between">
              <div className="mb-1 ">
                <h6 className="mb-0">Address</h6>

                <div style={{ fontSize: 12 }}>
                  {studentinfo?.street +
                    " " +
                    studentinfo?.town +
                    " " +
                    studentinfo?.state +
                    " " +
                    studentinfo?.zipPostalCode +
                    " " || ""}
                </div>
              </div>
              <div className="mb-1">
                <h6 className="mb-0">Phone</h6>
                <div style={{ fontSize: 12, width: "100px" }}>
                  {getMobileFormat(studentinfo?.primaryPhone || "")}
                </div>
              </div>
            </div>
            <div className="mb-1">
              <h6 className="mb-0">Notes</h6>

              <div style={{ fontSize: 12 }}>
                <span
                  color="textSecondary"
                  className={
                    seemore === "seemore"
                      ? `${classes.secondaryTitle} p-0`
                      : `${classes.limitedTex}`
                  }
                >
                  {studentinfo?.notes}
                </span>
              </div>
            </div>
          </div>
          <div className="mx-2" style={{ borderTop: "1px solid #e7e7e7" }}>
            <h5 className="mt-1">Membership Info</h5>
            <div className="mb-1">
              <h6 className="mb-0">Member Since</h6>
              <div style={{ fontSize: 12 }}>
                {moment(studentinfo?.createdAt).format("MM/DD/YYYY")}
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="mb-1 ">
                <h6 className="mb-0">Program</h6>
                <div style={{ fontSize: 12 }}>{studentinfo?.program}</div>
              </div>
              <div className="mb-1 ">
                <h6 className="mb-0">Rank</h6>

                <div>
                  <img
                    style={{
                      objectFit: "contain !importent",
                      width: "4em",
                      height: "2.5em",
                      borderRadius: "50%",
                    }}
                    src={studentinfo?.current_rank_img}
                    alt={`${studentinfo?.firstName}`}
                    className={classes?.rankImg}
                  />
                </div>
              </div>
            </div>

            {/* <div className="mb-1 ">
              <h6 className="mb-0">Status</h6>
              <div style={{ fontSize: 12 }}>{studentinfo?.status}</div>
            </div> */}
          </div>
          <div onClick={() => handleOpenCollapse("pannel")} className="px-1">
            <div className={classes.row}>
              <div className="d-flex justify-content-start align-items-center p-0">
                <span className={classes.secondaryTitle}>
                  {<b>Membership:</b>}
                </span>
              </div>
              <div className="d-flex justify-content-end align-items-center pt-0 ">
                <span className="mb">view All</span>
                {collapase === "pannel" ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </div>
            </div>
            <Collapse in={collapase === "pannel"}>
              <div>
                <Memership item={studentinfo?.membership_details}></Memership>
              </div>
            </Collapse>
          </div>
          <div className={classes.row}>
            <div>
              <span className={classes.secondaryTitle}>{""}</span>
            </div>
            <div className="align-items-center pr-1">
              <div className={classes.secondaryTitle}>
                {" "}
                {studentinfo?.notes?.length > 50 ? (
                  <Chip
                    onClick={() => {
                      handlseemore();
                    }}
                    label={seemore === "seemore" ? "Show less" : "Show more"}
                    size="small"
                    style={{
                      background: "none",
                      color: "#5982e4",
                      marginLeft: "1em",
                    }}
                  />
                ) : null}
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    attendeeList: state.calendar.attendeeList,
    seachClass: state.calendar.seachClass,
  };
};

export default connect(mapStateToProps, null)(InfoPreViewCard);
