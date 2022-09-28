import React, { Fragment } from "react";
import Dialog from "@material-ui/core/Dialog";

import CloseIcon from "@material-ui/icons/Close";
import {
  Checkbox,
  Chip,
  DialogContent,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  selectBtn: {
    border: "1px solid #b8c2cc",
    borderRadius: "6px !important",
    padding: "6px",
    display: "column",
    alignItems: "center",
    overflow: "scroll",
    width: "20em",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  listItem: {
    "&:hover": {
      background: "#eaf4fe",
      color: "#2796f3",
    },
  },
  SelectSmList: {
    borderRadius: "6px",
    background: "#eaf4fe",
    color: "#2796f3",
    fontWeight: "bold",
    marginRight: "6px",
    cursor: "pointer",
  },
}));
export default function Multiselettforleads(props) {
  const classes = useStyles();
  const { changeHandlerforleads, studentinfo, isEdit } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <div
        className={classes.selectBtn}
        onClick={!isEdit ? () => {} : handleClickOpen}
      >
        <Fragment>
          {studentinfo?.leadsTracking?.length === 0 && (
            <Chip
              size="small"
              className={classes.SelectSmList}
              label={"Select"}
            />
          )}
        </Fragment>
        {studentinfo !== null
          ? studentinfo?.leadsTracking?.map((item) => {
              return (
                <Chip
                  size="small"
                  className={classes.SelectSmList}
                  label={item}
                  key={item}
                />
              );
            })
          : null}
      </div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
       <div>
          <div className="d-flex justify-content-between">
            <div>
              <h4 className="p-1" style={{color:"#2196f4"}}>Leads Tracking</h4>
            </div>
            <div className="d-flex justify-content-end">
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <DialogContent style={{ width: "400px" }}>
          <List dense>
            {props.getLeadTrackingList !== null
              ? props.getLeadTrackingList?.map((item, i) => {
                  return (
                    <ListItem
                      key={item?._id}
                      button
                      onClick={() => {
                        changeHandlerforleads(item?.leads_category);
                      }}
                    >
                      <ListItemIcon>
                        <Checkbox
                          checked={studentinfo?.leadsTracking.includes(
                            item?.leads_category
                          )}
                        />
                      </ListItemIcon>
                      <ListItemText>{item?.leads_category}</ListItemText>
                    </ListItem>
                  );
                })
              : null}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}
