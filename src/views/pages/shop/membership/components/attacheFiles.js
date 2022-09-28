import React, { Fragment, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { DropzoneArea } from "material-ui-dropzone";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "reactstrap";

const useStyles = makeStyles((theme) => ({
  styleDropZone: {
    margin: "10px 0px 8px 0px",
    borderRadius: "18px",
    padding: "10px",
    border: "4px dashed #2796f3",
    background: "#F7FDFF",
  },
  attchBtn: {
    width: "100%",
    color: "#2796f3 !important",
    background: "#eaf4fe !important",
    border: "1px dashed #2796f3 !important",
    borderRadius: "8px",
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

const AttachDocxfile = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [fileUploaded, setFileUploaded] = useState([]);
  const [alert, setAlert] = useState(false);

  const FilesChange = (files) => {
    setFileUploaded(files);
  };
  const handleClickOpen = () => {
    setOpen(!open);
  };

  const addfile = () => {
    if (fileUploaded?.length === 0) {
      setAlert(true);
      return;
    }
    props.handleDocument(fileUploaded[0]);
    setOpen(false);
    setAlert(false);
  };

  const cancelFile = () => {
    props.handleDocument(null);
    setAlert(false);
    setOpen(false);
  };
  return (
    <Fragment>
      <Button fullWidth className={classes.attchBtn} onClick={handleClickOpen}>
        {props?.membershipDocName !== undefined && fileUploaded?.length === 0 ?
          props?.membershipDocName
          : <Fragment>
            {fileUploaded?.length > 0 ? (
              <span>{fileUploaded[0]["name"]}</span>
            ) : (
              <Fragment>
                Attach Document <AddIcon style={{ color: "#2796f3" }} />
              </Fragment>
            )}
          </Fragment>}

      </Button>

      <StyledDialog open={open} aria-labelledby="responsive-dialog-title">
        <DialogContent>
          {alert && (
            <div className="alert alert-warning" role="alert">
              Please Select Docx
            </div>
          )}
          <DropzoneArea
            dropzoneText={props.title}
            dropzoneClass={classes.styleDropZone}
            onChange={FilesChange}
            showAlerts={true}
            showPreviews={true}
            filesLimit={1}
            showPreviewsInDropzone={true}
          // showPreviewsInDropzone={false}
          />
        </DialogContent>
        <div className="d-flex justify-content-end p-1">
          <Button onClick={cancelFile} className="mr-1" outline>
            Cancel
          </Button>
          <Button.Ripple onClick={addfile} color="primary" outline>
            Done
          </Button.Ripple>
        </div>
      </StyledDialog>
    </Fragment>
  );
};

export default AttachDocxfile;
