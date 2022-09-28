import React from "react";
import {
  Grid,
  Typography,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
function ProgramProfileInfo(props) {
  const {
    studentinfo,
    changeHandler,
    SelectCategory,
    SelectProgram,
    programList,
    FilteredProgram,
    isEdit,
  } = props;
  return (
    <Grid container spacing={1}>
      <Grid item sm={12} md={12} lg={12}>
        <div className="d-flex align-items-center">
          <CardGiftcardIcon
            style={{ color: "#757575" }}
            className="mr-1 mt-1"
          />
          <Typography
            style={{ fontSize: "1.2em" }}
            className="mb-0 mt-1"
            color="textSecondary"
          >
            Membership Info
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}

export default ProgramProfileInfo;
