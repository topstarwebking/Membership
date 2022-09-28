import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Upload } from "react-feather";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import AttachDocxfile from "./attacheFiles";
import LoadingForUplaod from "./LoadingForUplaod";
const AddfileTofolder = (props) => {
  const { activeMainFolder, IsEdit, userinformation } = props;
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({});
  const [defaltAlert, setdefaltAlert] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const fileHandler = async (e) => {
    setdefaltAlert(true);
    if (userinformation?.role === 0 && activeMainFolder.adminId === undefined) {
      let data = state;
      e.preventDefault();
      let payload = {
        document: data.document,
        document_name: data.document_name,
      };
      const res = await props.UPLOAD_DOCUMENT_IN_FOLDER(
        payload,
        activeMainFolder?._id
      );
      setOpen(false);
      if (res) {
        setdefaltAlert(false);
      } else {
        setdefaltAlert(true);
      }
    } else if (
      userinformation?.role === 1 &&
      activeMainFolder.adminId !== undefined
    ) {
      let data = state;
      e.preventDefault();
      let payload = {
        document: data.document,
        document_name: data.document_name,
      };
      const res = await props.UPLOAD_DOCUMENT_IN_FOLDER(
        payload,
        activeMainFolder?._id
      );
      setOpen(false);
      if (res) {
        setdefaltAlert(false);
      } else {
        setdefaltAlert(true);
      }
    } else {
      toast.info("This is admin folder you cant upload ");
      setOpen(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const HandleFile = (filename, file) => {
    setState({
      ...state,
      document_name: filename,
      document: file,
    });
  };

  return (
    <>
      <div className="d-flex p-0 ml-1">
        {IsEdit ? null : (
          <div className={`p-0`}>
            <label htmlFor="icon-button-file">
              <Button
                color="primary"
                type="button"
                size="small"
                fontSize="16px"
                disabled={
                  activeMainFolder?.adminId !== undefined &&
                  userinformation?.role === 0
                    ? true
                    : false
                }
                startIcon={
                  <Upload
                    style={{
                      color: "#FFF",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  />
                }
                onClick={handleClickOpen}
                style={{
                  textTransform: "none",
                  fontWeight: "600",
                  color: "#FFF",
                  background: "#0184FF",
                  padding: "10px 10px",
                  width: "100%",
                  borderRadius: "6px",
                  borderColor: "rgb(1, 132, 255)",
                }}
              >
                Upload Document
              </Button>
            </label>
          </div>
        )}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <AttachDocxfile
            title={"Click or drag and drop to Attach your DocxFile"}
            handleDocument={HandleFile}
          />
          <div className="d-flex justify-content-between m-1">
            <Button
              variant="outlined"
              onClick={handleClose}
              style={{
                textTransform: "none",
                fontWeight: "600",
                borderRadius: "6px",
                margin: "1em",
              }}
            >
              Cancel
            </Button>
            <Button
              style={{
                textTransform: "none",
                fontWeight: "600",
                borderRadius: "6px",
                background: "#2796f3",
                color: "#fff",
                margin: "1em",
              }}
              onClick={fileHandler}
              variant="contained"
              autoFocus
            >
              Upload
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <LoadingForUplaod open={defaltAlert} title={"uploading..."} />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    userinformation: state.userinfo.userinformation,
  };
};
export default connect(mapStateToProps, null)(AddfileTofolder);
