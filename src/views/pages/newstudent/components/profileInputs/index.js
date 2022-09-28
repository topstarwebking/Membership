import React from "react";
import {
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";
import ReactModernCalender from "../../../../../components/ReactModernCalender";
import NumberFormat from "react-number-format";
import CardMembershipIcon from '@material-ui/icons/CardMembership';
const ProfileInput = (props) => {
  const { studentinfo, changeHandler, isEdit, handleDateofBirth } = props;
  return (
    <>
      <Grid container spacing={1}>
        <Grid item sm={12} md={3} lg={3}>
          <Typography className="mb-0 fw-bolder" color="textSecondary">
            Member type
          </Typography>
          <div
            style={{
              borderRadius: "0.4em",
              height: "3em",
              border: "1px solid #b8c2cc",
            }}
          >
            {studentinfo?.studentType !== undefined ? (
              <Select
                fullWidth
                name="studentType"
                disabled={!isEdit}
                variant="outlined"
                value={studentinfo?.studentType || "Leads"}
                onChange={changeHandler}
              >
                <MenuItem value="Former Trial">Former Trial</MenuItem>
                <MenuItem value="Leads">Leads</MenuItem>
                <MenuItem value="Active Student">Active Member</MenuItem>
                <MenuItem value="Former Student">Former Member</MenuItem>
                <MenuItem value="Active Trial">Active Trial</MenuItem>
              </Select>
            ) : null}
          </div>
        </Grid>
        <Grid item sm={12} md={3} lg={3}>
          <Typography className="mb-0 fw-bolder" color="textSecondary">
            Member # ID
          </Typography>
          <TextField
            fullWidth
            style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}
            variant={"outlined"}
            size="small"
            type="text"
            name="customId"
            disabled={!isEdit}
            placeholder="id"
            value={studentinfo?.customId}
            onChange={changeHandler}
          />
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={1}>
        <Grid item sm={12} md={12} lg={12}>
          <Typography
            className="mb-0 fw-bolder"
            color="textSecondary"
            style={{ fontSize: "1.3em" }}
          >
            <CardMembershipIcon style={{ color: "#757575", marginRight: "10px" }} />
            Member Info
          </Typography>
        </Grid>
        <Grid item sm={12} md={3} lg={3}>
          <Typography className="mb-0 fw-bolder" color="textSecondary">
            First Name
          </Typography>
          <TextField
            fullWidth
            style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}
            variant={"outlined"}
            disabled={!isEdit}
            size="small"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={studentinfo?.firstName}
            onChange={changeHandler}
          />
        </Grid>
        <Grid item sm={12} md={3} lg={3}>
          <Typography className="mb-0 fw-bolder" color="textSecondary">
            Last Name
          </Typography>
          <TextField
            fullWidth
            disabled={!isEdit}
            style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}
            variant={"outlined"}
            size="small"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={studentinfo?.lastName}
            onChange={changeHandler}
          />
        </Grid>
        <Grid item sm={12} md={3} lg={2}>
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
            {studentinfo?.gender !== undefined ? (
              <Select
                type="select"
                style={{ padding: "10px !imporant", height: "100%" }}
                disabled={!isEdit}
                fullWidth
                variant={"outlined"}
                value={studentinfo?.gender}
                name={"gender"}
                onChange={changeHandler}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            ) : null}
          </div>
        </Grid>
        <Grid item sm={12} md={3} lg={3}>
          <Typography className="mb-0 fw-bolder" color="textSecondary">
            DOB
          </Typography>
          <ReactModernCalender
            isEdit={isEdit}
            changeHandler={changeHandler}
            dob={studentinfo?.dob}
            handleDateofBirth={handleDateofBirth}
            flag={true}
            Isdisable={false}
          />
        </Grid>
        <Grid item sm={12} md={2} lg={1}>
          <Typography className="mb-0 fw-bolder" color="textSecondary">
            Age
          </Typography>
          <TextField
            fullWidth
            disabled={!isEdit}
            style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}
            variant={"outlined"}
            size="small"
            type="number"
            name="age"
            placeholder="Age"
            value={studentinfo?.age}
          />
        </Grid>
        <Grid item sm={12} md={3} lg={3}>
          <Typography className="mb-0 fw-bolder" color="textSecondary">
            Street
          </Typography>
          <TextField
            fullWidth
            disabled={!isEdit}
            style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}
            variant={"outlined"}
            size="small"
            type="text"
            placeholder="Street"
            name={"street"}
            value={studentinfo?.street}
            onChange={changeHandler}
          />
        </Grid>

        <Grid item sm={12} md={3} lg={3}>
          <Typography className="mb-0 fw-bolder" color="textSecondary">
            City
          </Typography>
          <TextField
            fullWidth
            disabled={!isEdit}
            style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}
            variant={"outlined"}
            size="small"
            type="text"
            name="town"
            placeholder="City"
            value={studentinfo?.town}
            onChange={changeHandler}
          />
        </Grid>
        <Grid item sm={12} md={3} lg={3}>
          <Typography className="mb-0 fw-bolder" color="textSecondary">
            State
          </Typography>
          <TextField
            fullWidth
            disabled={!isEdit}
            style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}
            variant={"outlined"}
            size="small"
            type="text"
            name="state"
            placeholder="State"
            value={studentinfo?.state}
            onChange={changeHandler}
          />
        </Grid>
        <Grid item sm={12} md={3} lg={3}>
          <Typography className="mb-0 fw-bolder" color="textSecondary">
            Zip Code
          </Typography>
          <TextField
            fullWidth
            disabled={!isEdit}
            style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}
            variant={"outlined"}
            size="small"
            type="number"
            name="zipPostalCode"
            pattern="[0-9]{5}"
            placeholder="Zip Postal code"
            value={studentinfo?.zipPostalCode}
            onChange={changeHandler}
          />
        </Grid>
        <Grid item sm={12} md={3} lg={3}>
          <Typography className="mb-0 fw-bolder" color="textSecondary">
            Country
          </Typography>
          <TextField
            fullWidth
            style={{
              height: "3em",
              borderRadius: "0.4em",
              border: "1px solid #b8c2cc",
            }}
            variant={"outlined"}
            size="small"
            disabled
            type="text"
            placeholder="Country"
            name={"country"}
            defaultValue={"united states"}
            onChange={changeHandler}
          />
        </Grid>
        <Grid item sm={12} md={3} lg={3}>
          <Typography className="mb-0 fw-bolder" color="textSecondary">
            Phone
          </Typography>
          <NumberFormat
            style={{ height: "3em" }}
            type="text"
            name="primaryPhone"
            id="mobile_number"
            disabled={!isEdit}
            placeholder="Phone number"
            onChange={changeHandler}
            value={studentinfo?.primaryPhone}
            format="###-###-####"
            mask="_"
            className="form-control"
          />
          {/* <TextField
            fullWidth
            disabled={!isEdit}
            style={{
              borderRadius: "0.4em",
              border: "1px solid #b8c2cc",
              paddingTop: "1px",
            }}
            variant={"outlined"}
            size="small"
            name="primaryPhone"
            type={"number"}
            onChange={changeHandler}
            placeholder="Phone number"
            value={studentinfo?.primaryPhone}
            mask="_"
            className="form-control"
            format="###-###-####"
          /> */}
        </Grid>
        <Grid item sm={12} md={3} lg={3}>
          <Typography className="mb-0 fw-bolder" color="textSecondary">
            Secondary Number
          </Typography>
          {/* <TextField
            fullWidth
            disabled={!isEdit}
            style={{
              borderRadius: "0.4em",
              border: "1px solid #b8c2cc",
              paddingTop: "1px",
            }}
            variant={"outlined"}
            size="small"
            type="number"
            name="secondaryNumber"
            onChange={changeHandler}
            placeholder="Secondary Phone Number"
            value={studentinfo?.secondaryNumber}
            mask="_"
            className="form-control"
          /> */}
          <NumberFormat
            style={{ height: "3em" }}
            type="text"
            name="secondaryNumber"
            id="mobile_number"
            disabled={!isEdit}
            placeholder="Secondary Phone Number"
            onChange={changeHandler}
            value={studentinfo?.secondaryNumber}
            format="###-###-####"
            mask="_"
            className="form-control"
          />
        </Grid>
        <Grid item sm={12} md={3} lg={3}>
          <Typography className="mb-0 fw-bolder" color="textSecondary">
            Email
          </Typography>
          <TextField
            fullWidth
            style={{ borderRadius: "0.4em", border: "1px solid #b8c2cc" }}
            variant={"outlined"}
            size="small"
            type="email"
            name="email"
            disabled={!isEdit}
            placeholder="email"
            value={studentinfo?.email}
            onChange={changeHandler}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileInput;
