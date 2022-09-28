import React, { Fragment, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Button, Label } from "reactstrap";
import { Grid, IconButton } from "@material-ui/core";
import { CustomInput, Input } from "reactstrap";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  styleDropZone: {
    margin: "10px 0px 8px 0px",
    borderRadius: "18px",
    padding: "10px",
    border: "4px dashed #2796f3",
    background: "#F7FDFF",
    height: "100px",
  },
  attchBtn: {
    width: "100%",
    // color: '#2796f3 !important',
    // background: '#eaf4fe !important',
    border: "3px dashed #E9E9E9",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
}));

const StyledDialog = withStyles(() => ({
  paper: {
    "& .MuiDropzoneArea-icon": {
      display: "none",
    },
    borderRadius: "14px",
    textAlign: "center",
    maxWidth: "50%",
    width: "50vh",
  },
}))(Dialog);

const Editfile = (props) => {
  const { EDIT_FILE_OF_STUDENTS } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [payload, setPayload] = useState({});

  const addfile = () => {
    EDIT_FILE_OF_STUDENTS(payload);
    setOpen(false);
  };

  const changeInput = (e) => {
    let { name } = e.target;
    if (name === "doc") {
      setPayload({ ...payload, [name]: e.target.files[0] });
    } else {
      setPayload({ ...payload, [name]: e.target.value });
    }
  };

  return (
    <Fragment>
      <StyledDialog open={open} aria-labelledby="responsive-dialog-title">
        <DialogContent>
          <IconButton
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon />
          </IconButton>
          <form>
            <Grid container spacing={1}>
              <Grid item sm={6} md={6} lg={6}>
                <div className="text-left">
                  <Label htmlFor="fileType">File type</Label>
                  <CustomInput
                    type="select"
                    id="fileType"
                    name="fileType"
                    onChange={changeInput}
                  >
                    <option>Please Select</option>
                    <option value="Membership">Membership</option>
                    <option value="Product">Product</option>
                  </CustomInput>
                </div>
              </Grid>
              <Grid item sm={6} md={6} lg={6}>
                <div className="text-left pl-1">
                  <Label htmlFor="fileName">Filename</Label>
                  <Input
                    id="fileName"
                    onChange={changeInput}
                    name="fileName"
                    placeholder="filename"
                  />
                </div>
              </Grid>
              <Grid item sm={12} md={12} lg={12}>
                <div className="text-left">
                  <Label htmlFor="Note">Note</Label>
                  <Input
                    id="Note"
                    onChange={changeInput}
                    name="description"
                    placeholder="Note"
                  />
                </div>
              </Grid>
              <Grid item sm={12} md={12} lg={12}>
                <div className="text-left">
                  <Input
                    type="file"
                    className="ml-1"
                    onChange={changeInput}
                    name="doc"
                  />
                </div>
              </Grid>
              <Grid item sm={12} md={12} lg={12}>
                <br />
                <div className="d-flex justify-content-end p-1">
                  <Button.Ripple onClick={addfile} color="primary" outline>
                    Done
                  </Button.Ripple>
                </div>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </StyledDialog>
    </Fragment>
  );
};

export default Editfile;
