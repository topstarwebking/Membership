import React, { useState } from "react";
import { Badge, Avatar, IconButton, Chip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { HANDLE_STUDENT_IMAGE_UPDATE } from "../../../../../redux/actions/newstudent";
import { connect } from "react-redux";
import StudentlistuserEyeModal from "../../../../dashboard1/StudentlistuserEyeModal";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  avatrStyle: {
    width: "16em",
    height: "12em",
    borderRadius: "0.5em",
    padding: "0.6em",
  },
  begIcon: {
    height: "2rem",
    width: "2rem",
    background: "#40a7e1",
    borderRadius: "50% !important",
    marginLeft: "-2rem",
    marginTop: "-3rem",
  },
  ChipStyle: {
    borderRadius: "2px",
    margin: "1em",
    color: "#1992d7",
    background: "#c8dce8",
  },
  maindiv: {
    display: "flex",
    flex: "column",
    justifyContent: "center",
  },
}));

function ProfileAvatar(props) {
  const classes = useStyles();
  const myRef = React.createRef();
  const { studentinfo, isEdit, HANDLE_STUDENT_IMAGE_UPDATE } = props;
  const [imageprofile, setImageProfile] = useState("");

  const imageHandler = (e) => {
    e.preventDefault();
    setImageProfile(e.target.files[0]);
    HANDLE_STUDENT_IMAGE_UPDATE(e.target.files[0]);
  };

  return (
    <div>
      {isEdit ? (
        <div className="d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-center my-1 mx-2">
            <Badge
              style={{ bottom: "2rem !important" }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                <label htmlFor="icon-button-file">
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    type={"file"}
                    required
                    ref={myRef}
                    onChange={imageHandler}
                  />
                  <IconButton
                    disabled={!isEdit}
                    className={`${classes.begIcon}`}
                    onClick={() => {
                      myRef.current.click();
                    }}
                  >
                    {isEdit ? (
                      <EditIcon fontSize="small" style={{ color: "#fff" }} />
                    ) : (
                      ""
                    )}
                  </IconButton>
                </label>
              }
            >
              <Avatar
                className={`${classes.avatrStyle}`}
                style={{ width: "130px", height: "130px", borderRadius: "50%" }}
                src={
                  imageprofile === ""
                    ? studentinfo?.memberprofileImage
                    : URL.createObjectURL(imageprofile) ||
                      "images/userProfile.png"
                }
              />
              <h4 className="text-center mt-1 mb-0" >{`${studentinfo?.firstName} ${studentinfo?.lastName}`}</h4>
            </Badge>
          </div>
          <div className="d-flex justify-content-center align-items-center pb-1 px-2" style={{borderBottom:"1px solid #e7e7e7"}}>
            <div className="d-flex justify-content-center align-items-center" style={{borderRight: "2px solid #e7e7e7"}}>
              <Chip
                label={<b>{studentinfo?.studentType?.toUpperCase()}</b>}
                size="small"
                className={`${classes.ChipStyle} ml-0 my-0`}
                style={{backgroundColor:"#eaf4fe"}}
              ></Chip>
            </div>
            <div className="d-flex justify-content-center align-items-center ml-1">
              <Chip
                style={{
                  marginRight: "1px",
                  background:
                    studentinfo?.status?.toLowerCase() === "active"
                      ? "#def8e7"
                      : "#f9d2d0",
                  color:
                    studentinfo?.status?.toLowerCase() === "active"
                      ? "#55a65b"
                      : "#e05252",
                  fontWeight: "bold",
                  borderRadius: "2px",
                  padding: "2px",
                }}
                size="small"
                label={studentinfo?.status?.toUpperCase()}
              />
              <StudentlistuserEyeModal studentInfo={studentinfo} />
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className=" my-1 mx-2">
            <Avatar
              className={`${classes.avatrStyle}`}
              style={{width: "130px", height: "130px", borderRadius: "50%" }}
              src={
                imageprofile === ""
                  ? studentinfo?.memberprofileImage
                  : URL.createObjectURL(imageprofile) ||
                    "images/userProfile.png"
              }
            />

          <h3 className="text-center mt-1 mb-0" >{`${studentinfo?.firstName} ${studentinfo?.lastName}`}</h3>
          </div>
          <div className="d-flex justify-content-center align-items-center pb-1 px-2" style={{borderBottom:"1px solid #e7e7e7"}}>
            <div className="d-flex justify-content-center align-items-center" style={{borderRight: "2px solid #e7e7e7"}}>
              <Chip
                label={<b>{studentinfo?.studentType?.toUpperCase()}</b>}
                size="small"
                className={`${classes.ChipStyle} ml-0 my-0`}
                style={{backgroundColor:"#eaf4fe"}}
              ></Chip>
            </div>
            <div className="d-flex justify-content-center align-items-center ml-1">
              <Chip
                style={{
                  marginRight: "1px",
                  background:
                    studentinfo?.status?.toLowerCase() === "active"
                      ? "#def8e7"
                      : "#f9d2d0",
                  color:
                    studentinfo?.status?.toLowerCase() === "active"
                      ? "#55a65b"
                      : "#e05252",
                  fontWeight: "bold",
                  borderRadius: "2px",
                  padding: "2px",
                }}
                size="small"
                label={studentinfo?.status?.toUpperCase()}
              />
              <StudentlistuserEyeModal studentInfo={studentinfo} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default connect(null, {
  HANDLE_STUDENT_IMAGE_UPDATE,
})(ProfileAvatar);
