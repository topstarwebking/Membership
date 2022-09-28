import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Select, MenuItem } from "@material-ui/core";
import { Upload } from "react-feather";
import { Input } from "reactstrap";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { EDIT_DOCUMENT_IN_FOLDER } from "../../../../redux/actions/document/document";
import LoadingForUplaod from "./LoadingForUplaod";

const AddfileTofolder = (props) => {
  const { activeMainFolder,  IsEdit, userinformation } =
    props;
  const [open, setOpen] = React.useState(true);
  const [state, setState] = React.useState({ ...props.item });
  const [defaltAlert, setdefaltAlert] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const fileHandler = async (e) => {
    setdefaltAlert(true);
    if (state.folderId === undefined) {
      let payload = {
        document: state.document,
        document_name: state.document_name,
        old_FolderId: state?.rootFolderId,
        new_FolderId: state?.rootFolderId,
      };
      const res = await props.EDIT_DOCUMENT_IN_FOLDER(payload, state?._id);
      if (res) {
        setdefaltAlert(false);
      } else {
        setdefaltAlert(true);
      }
    } 
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
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
        <DialogTitle id="alert-dialog-title">{"Rename"}</DialogTitle>
        <DialogContent>
          <span>Document Name</span>
          <div
            style={{
              borderRadius: "0.4em",
              height: "3em",
              width: "300px",
            }}
          >
            <Input
              variant="outlined"
              name="document_name"
              className="text-capitalize"
              defaultValue={state?.document_name}
              onChange={(e) => {
                setState({ ...state, [e.target.name]: e.target.value });
              }}
            />
          </div>
          <div className="d-flex justify-content-between m-1">
            <Button
              variant="outlined"
              onClick={handleClose}
              style={{
                textTransform: "none",
                fontWeight: "600",
                borderRadius: "6px",
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
              }}
              onClick={fileHandler}
              variant="contained"            >
              Save
            </Button>
            
          </div>
        </DialogContent>
      </Dialog>
      <LoadingForUplaod open={defaltAlert} title={"Updating..."} />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    userinformation: state.userinfo.userinformation,
  };
};
export default connect(mapStateToProps, { EDIT_DOCUMENT_IN_FOLDER })(
  AddfileTofolder
);
