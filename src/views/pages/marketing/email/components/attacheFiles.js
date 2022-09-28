import React, { Fragment, useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AttachmentIcon from "@material-ui/icons/Attachment";
import {
  Badge,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Card, CardContent } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { DropzoneArea } from "material-ui-dropzone";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
// import DescriptionIcon from '@material-ui/icons/Description';

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  CardStyle: {
    paddingTop: "2rem",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    boxShadow: "0px 3px 20px rgb(0 0 0 / 10%)",
    position: "fixed",
    bottom: "1rem",
    right: "1rem",
    zIndex: 13000,
  },
  fileAvatar: {
    borderRadius: "0px",
  },
  styleDropZone: {
    margin: "10px 0px 8px 0px",
    borderRadius: "18px",
    padding: "10px",
    border: "4px dashed #2796f3",
    background: "#F7FDFF",
  },
  previewIcons: {
    background: "#f0f0f1",
    color: "#2796f3",
  },
  popupOpenButton: {
    background: "#2796f3",
    color: "#fff",
    position: "fixed",
    bottom: "1rem",
    right: "1rem",
    "&:hover": {
      background: "#2796f3",
    },
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

const AttachFiles = (props) => {
  const classes = useStyles();
  const { setFileUploaded, fileUploaded } = props;
  const [open, setOpen] = useState(false);
  const [popupAttachment, setpopupAttachment] = useState(false);

  const removeFileFromList = (deleteIndex) => {
    let filesHasBeenCopy = fileUploaded.filter(
      (_, index) => index !== deleteIndex
    );
    setFileUploaded(filesHasBeenCopy);
  };

  const FilesChange = (files) => {
    setFileUploaded([...fileUploaded, ...files]);
  };

  const handleClickOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    fileUploaded?.length > 0
      ? setpopupAttachment(true)
      : setpopupAttachment(false);
  }, [fileUploaded]);

  return (
    <Fragment>
      <Badge
        color="secondary"
        badgeContent={fileUploaded?.length}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Tooltip arrow title="Attach files max 30 at a time">
          <IconButton
            style={{ color: "#2796f3" }}
            variant="contained"
            component="span"
            onClick={handleClickOpen}
          >
            <AttachmentIcon />
          </IconButton>
        </Tooltip>
      </Badge>

      {popupAttachment ? (
        <Card className={classes.CardStyle}>
          <div
            style={{ background: "#2796f3" }}
            className="d-flex justify-content-between align-items-center"
          >
            <Typography className="mb-0 p-1 text-white">
              <b>Attached files</b>
            </Typography>
            <IconButton
              className="rounded-circle"
              style={{ marginTop: "-3rem", background: "#2796f3" }}
              onClick={() => {
                setpopupAttachment(!popupAttachment);
              }}
            >
              <KeyboardArrowDownIcon className="text-white" />
            </IconButton>
          </div>
          <CardContent className={"mb-0"}>
            <div
              style={{
                overflow: "auto",
                maxHeight: 300,
              }}
            >
              {fileUploaded?.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="d-flex justify-content-between pl-1"
                    style={{
                      background: "#eaf4fe",
                      marginTop: "4px",
                      color: "#2796f3",
                    }}
                  >
                    <span>
                      {i + 1} {item?.name}{" "}
                    </span>
                    <IconButton
                      onClick={() => {
                        removeFileFromList(i);
                      }}
                      className="rounded-circle"
                      size="small"
                    >
                      <HighlightOffIcon />
                    </IconButton>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : fileUploaded?.length > 0 ? (
        <IconButton
          className={`rounded-circle ${classes.popupOpenButton}`}
          onClick={() => {
            setpopupAttachment(!popupAttachment);
          }}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
      ) : (
        ""
      )}

      <StyledDialog
        open={open}
        onClose={handleClickOpen}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DropzoneArea
            dropzoneText="Click or drag and drop to Attach your files!"
            dropzoneClass={classes.styleDropZone}
            onChange={FilesChange}
            showAlerts={true}
            showPreviews={true}
            filesLimit={30}
            // showPreviewsInDropzone
            showPreviewsInDropzone={false}
          />
        </DialogContent>
      </StyledDialog>
    </Fragment>
  );
};

export default AttachFiles;
