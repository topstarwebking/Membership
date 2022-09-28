import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Upload } from "react-feather";
import { Button } from "@material-ui/core";
import AttachDocxfile from "./attacheFiles";
import LoadingForUplaod from "./LoadingForUplaod";
const AddOrEditDoc = (props) => {
  const { activeMainFolder, activeSubMainFolder, IsEdit, userinformation } =
    props;
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({});
  const [defaltAlert, setdefaltAlert] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const fileHandler = async (e) => {
    setdefaltAlert(true);
    let data = state;
    e.preventDefault();
    let payload = {
      document: data.document,
      document_name: data.document_name,
    };
    const res = await props.UPLOAD_DOCUMENT(payload, activeSubMainFolder._id);
    setOpen(false);
    if (res) {
      setdefaltAlert(false);
    } else {
      setdefaltAlert(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const HandleFile = (docname, doc) => {
    setState({
      ...state,
      document_name: docname,
      document: doc,
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
        <DialogContent className="p-1">
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

export default AddOrEditDoc;
