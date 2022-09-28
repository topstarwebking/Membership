import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Select, MenuItem, Button } from "@material-ui/core";
import LoadingForUplaod from "./LoadingForUplaod";

export default function MoveDoc(props) {
  const { item, data, activeSubMainFolder, activeMainFolder } = props;
  const [open, setOpen] = React.useState(true);
  const [defaltAlert, setdefaltAlert] = React.useState(false);

  const [state, setState] = React.useState({
    ...item,
  });
  const fileHandler = async (e) => {
    setdefaltAlert(true);
    let data = state;
    e.preventDefault();
    let payload = {};
    if (data.new_SubfolderId === undefined) {
      payload = {
        document: data.document,
        document_name: data.document_name,
      };
    } else {
      payload = {
        document: data.document,
        document_name: data.document_name,
        old_SubfolderId: data.subFolderId,
        new_SubfolderId: data.new_SubfolderId || data?.new_SubfolderId,
      };
    }
    setOpen(!open);
    const res = await props.EDIT_DOCUMENT(payload, state?._id);
    if (res) {
      setdefaltAlert(false);
    } else {
      setdefaltAlert(true);
    }
  };
  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert               
        -dialog-description"
        className="p-1"
      >
        <DialogTitle id="alert-dialog-title" className="pb-0">
          {"Move"}
        </DialogTitle>
        <DialogContent>
          <span>
            Current Folder:
            {activeSubMainFolder?.subFolderName}
          </span>
          <div
            style={{
              borderRadius: "0.4em",
              height: "3em",
              border: "1px solid #b8c2cc",
              width: "300px",
            }}
          >
            <Select
              fullWidth
              variant="outlined"
              name="subFolderId"
              defaultValue={activeSubMainFolder?.subFolderName}
              onChange={(e) => {
                setState({
                  ...state,
                  new_SubfolderId: e.target.value,
                  old_SubfolderId: data?._id,
                });
              }}
            >
              {activeMainFolder?.subFolder?.length > 0
                ? activeMainFolder.subFolder.map((i, index) => {
                    return (
                      <MenuItem key={index} value={i?._id}>
                        {i?.subFolderName}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
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
              disabled={state.new_SubfolderId === undefined}
              onClick={fileHandler}
              variant="contained"
              autoFocus
            >
              Move
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <LoadingForUplaod open={defaltAlert} title={"Moving..."} />
    </div>
  );
}
