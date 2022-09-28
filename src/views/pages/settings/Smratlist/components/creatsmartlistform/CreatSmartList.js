import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Grid, TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  CREATE_SMAART_LIST,
  GET_ALL_SMART_LIST,
  UPDATE_SMART_LIST,
} from "../../../../../../redux/actions/email";
import { CustomInput, Label } from "reactstrap";
const ModalForm = (props) => {
  const [isopen, setisopen] = useState(false);
  const {
    GET_ALL_SMART_LIST,
    getAllSmartList,
    CREATE_SMAART_LIST,
    UPDATE_SMART_LIST,
    smartList,
    setSmartList,
    isEdit,
    handleCloseformain,
    userinformation,
  } = props;
  const [state, setState] = useState({ ...props.item });
  const handleClose = () => {
    setisopen(false);
  };
  const handleOpen = () => {
    let data = Object.values(smartList);
    for (let elemnet of data) {
      if (elemnet.length > 0) {
        return setisopen(true);
      } else {
        setisopen(false);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      if (state.new_folderId === undefined) {
        let payload = {
          smartlistname: state?.smartlistname,
          criteria: props.smartList,
        };
        UPDATE_SMART_LIST(payload, state?._id);
      } else {
        let payload = {
          folderId: state?.new_folderId,
          old_folderId: state?.folderId,
          smartlistname: state?.smartlistname,
          criteria: props.smartList,
        };
        UPDATE_SMART_LIST(payload, state?._id);
      }
      handleCloseformain();
    } else {
      CREATE_SMAART_LIST(
        {
          smartlistname: state?.smartlistname,
          criteria: props.smartList,
        },

        state?.folderId
      );
      handleCloseformain();
    }
    setSmartList({});
    setisopen(false);
  };

  const getOnlyNormalUserInfo = (data) => {
    if (userinformation?.role === 0) {
      let res = data?.filter((item) => item?.adminId === undefined);
      return res;
    } else {
      return data;
    }
  };
  useEffect(() => {
    GET_ALL_SMART_LIST();
  }, [GET_ALL_SMART_LIST]);

  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        style={{ color: "#fff", background: "#2796f3" }}
        variant="contained"
      >
        {isEdit ? "Update" : "+ Create"}
      </Button>
      <Dialog
        open={isopen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Create Smart List"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item sm={12} md={12} lg={12}>
                <Label>Smartlist Name:</Label>
                <TextField
                  fullWidth
                  style={{
                    borderRadius: "0.4em",
                    border: "1px solid #b8c2cc",
                  }}
                  variant={"outlined"}
                  size="small"
                  type="text"
                  name="smartlistname"
                  defaultValue={state?.smartlistname}
                  onChange={(e) => {
                    setState({ ...state, [e.target.name]: e.target.value });
                  }}
                  placeholder="Smart List Name"
                  required
                />
              </Grid>
              <Grid item sm={12} md={12} lg={12}>
                <Label>Folder Name:</Label>
                {isEdit ? (
                  <CustomInput
                    type="select"
                    name="new_folderId"
                    id="status"
                    required
                    defaultValue={state?.folderId}
                    onChange={(e) => {
                      setState({ ...state, [e.target.name]: e.target.value });
                    }}
                  >
                    <option value={""}>{"Select Option"}</option>
                    {getAllSmartList !== null &&
                      getOnlyNormalUserInfo(getAllSmartList)?.map((item, i) => {
                        return (
                          <option value={item?._id} key={i}>
                            {item?.folderName}
                          </option>
                        );
                      })}
                  </CustomInput>
                ) : (
                  <CustomInput
                    type="select"
                    name="folderId"
                    id="status"
                    required
                    defaultValue={state?.folderId}
                    onChange={(e) => {
                      setState({ ...state, [e.target.name]: e.target.value });
                    }}
                  >
                    <option value={""}>{"Select Option"}</option>
                    {getAllSmartList !== null &&
                      getOnlyNormalUserInfo(getAllSmartList)?.map((item, i) => {
                        return (
                          <option value={item?._id} key={i}>
                            {item?.folderName}
                          </option>
                        );
                      })}
                  </CustomInput>
                )}
              </Grid>
            </Grid>
            <div className="d-flex justify-content-between mt-1">
              <Button onClick={handleClose} variant="outlined">
                Cancel
              </Button>
              <Button
                type={"submit"}
                style={{ color: "#fff", background: "#2796f3" }}
                variant="contained"
              >
                {isEdit ? "Update" : "Add"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    getAllSmartList: state.EmailMarketing.getAllSmartList,
  };
};

export default connect(mapStateToProps, {
  GET_ALL_SMART_LIST,
  CREATE_SMAART_LIST,
  UPDATE_SMART_LIST,
})(ModalForm);
