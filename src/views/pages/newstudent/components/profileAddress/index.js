import React from "react";
import {
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";
import Dateforbuyerinfo from "../../../../../components/ReactModernCalender";
import CallToActionIcon from '@material-ui/icons/CallToAction';
function ProfileAddress(props) {
  const {
    studentinfo,
    isEdit,
    isdisable,
    handleDateofBirth,
    changeHandler2forbuyerinfo,
  } = props;
  return (
    <Grid container spacing={1}>
      <br></br>
      <Grid item sm={12} md={12} lg={12}>
        <div className="d-flex align-items-center">
          <Typography
            style={{ fontSize: "1.2em" }}
            className="mb-0 mt-1"
            color="textSecondary"
          ><CallToActionIcon  style={{color:"#757575",marginRight:"10px"}}/>
            Buyer Info
          </Typography>
        </div>
      </Grid>
      <Grid item sm={12} md={3} lg={3}>
        <Typography className="mb-0 fw-bolder" color="textSecondary">
          First Name
        </Typography>
        <TextField
          fullWidth
          style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}
          variant={"outlined"}
          size="small"
          type="text"
          name="firstName"
          disabled={!isEdit || studentinfo?.age > 18}
          placeholder="firstName"
          value={
            studentinfo?.age > 18
              ? studentinfo?.firstName
              : studentinfo?.buyerInfo?.firstName
          }
          onChange={changeHandler2forbuyerinfo}
        />
      </Grid>
      <Grid item sm={12} md={3} lg={3}>
        <Typography className="mb-0 fw-bolder" color="textSecondary">
          Last Name
        </Typography>
        <TextField
          fullWidth
          style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}
          variant={"outlined"}
          size="small"
          type="text"
          name="lastName"
          disabled={!isEdit || studentinfo?.age > 18}
          placeholder="LastName"
          value={studentinfo?.buyerInfo?.lastName}
          onChange={changeHandler2forbuyerinfo}
        />
      </Grid>
      <Grid item sm={12} md={2} lg={2}>
        <Typography className="mb-0 fw-bolder" color="textSecondary">
          Gender
        </Typography>
        <div
          style={{
            height: "3em",
            borderRadius: "0.4em",
            border: "1px solid #b8c2cc",
          }}
        >
          {studentinfo?.buyerInfo.gender !== undefined ? (
            <Select
              type="select"
              style={{ padding: "10px !imporant", height: "100%" }}
              disabled={!isEdit || studentinfo?.age > 18}
              fullWidth
              variant={"outlined"}
              value={studentinfo?.buyerInfo?.gender}
              name={"gender"}
              onChange={changeHandler2forbuyerinfo}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          ) : null}
        </div>
      </Grid>
      <Grid item sm={12} md={2} lg={2}>
        <Typography className="mb-0 fw-bolder" color="textSecondary">
          DOB
        </Typography>
        <Dateforbuyerinfo
          isEdit={isEdit}
          isdisable={isdisable}
          changeHandler2forbuyerinfo={changeHandler2forbuyerinfo}
          dob={studentinfo?.buyerInfo?.dob}
          handleDateofBirth={handleDateofBirth}
          flag={false}
          Isdisable={studentinfo?.age >= 18 ? true : false}
        />
      </Grid>
      <Grid item sm={12} md={2} lg={2}>
        <Typography className="mb-0 fw-bolder" color="textSecondary">
          Age
        </Typography>
        <TextField
          fullWidth
          disabled={!isEdit || studentinfo?.age > 18}
          style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}
          variant={"outlined"}
          size="small"
          type="number"
          name="age"
          placeholder="Age"
          value={studentinfo?.buyerInfo?.age}
        />
      </Grid>
    </Grid>
  );
}

export default ProfileAddress;
