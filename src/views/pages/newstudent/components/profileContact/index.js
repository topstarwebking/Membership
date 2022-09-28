import React from "react";
import NumberFormat from "react-number-format";
import { Grid, Typography, TextField } from "@material-ui/core";

function PofileContact(props) {
  const { studentinfo, changeHandler, isEdit } = props;

  return (
    <Grid container spacing={1}>
      <Grid item sm={12} md={4} lg={4}>
        <Typography
          style={{ marginTop: "0.5em" }}
          className="mb-0 fw-bolder"
          color="textSecondary"
        >
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
      </Grid>
      <Grid item sm={12} md={4} lg={4}>
        <Typography
          style={{ marginTop: "0.5em" }}
          className="mb-0 fw-bolder"
          color="textSecondary"
        >
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
          // required
        />
      </Grid>
      <Grid item sm={12} md={4} lg={4}>
        <Typography
          style={{ marginTop: "0.5em" }}
          className="mb-0 fw-bolder"
          color="textSecondary"
        >
          Secondary Number
        </Typography>
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
    </Grid>
  );
}

export default PofileContact;
