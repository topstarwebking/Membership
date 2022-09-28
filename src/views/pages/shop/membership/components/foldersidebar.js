import React, { Fragment, useState } from "react";
import { List, ListItem, Button, makeStyles } from "@material-ui/core";
import { DELETE_MEMBERSHIP_FOLDER } from "../../../../../redux/actions/shop";
import { connect } from "react-redux";
import ManageFolder from "./manageFolder";
import SweetAlert from "react-bootstrap-sweetalert";
import EditAndDeletefolder from "./EditAndDeletefolder";
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";

const useStyles = makeStyles(() => ({
  activeFolder: {
    background: "#eaf4fe",
    "& button": {
      color: "#2796f3",
    },
  },
  inActiveFolder: {
    "&:hover": {
      background: "#eaf4fe",
    },
  },
  folderBtn: {
    background: "transparent",
    textTransform: "inherit",
    textAlign: "left",
    justifyContent: "start",
    "&:hover": {
      background: "unset",
    },
  },
  listWrapper: {
    width: "360px",
    background: "#fff",
    paddingTop: "0px",
    position: "relative",
    overflow: "scroll",
    height: "85vh",
    borderRight: "2px solid #f8f8f8",
  },
  addMianFOlder: {
    color: "#fff",
    background: "#2796f3",
    fontWeight: "bold !important",
  },
}));

const MemberShipFolder = (props) => {
  const classes = useStyles();
  const [defaultAlert, setdefaultAlert] = useState(false);
  const [folderid, setfolderId] = useState(null);

  const {
    activeFolderMS,
    handleActiveFOlder,
    DELETE_MEMBERSHIP_FOLDER,
    folderListWithMS,
    userinformation,
  } = props;

  const ConFirmDelete = (e) => {
    DELETE_MEMBERSHIP_FOLDER(e);
    setdefaultAlert(false);
  };
  const handeldelete = (itemid) => {
    setdefaultAlert(true);
    setfolderId(itemid);
  };

  return (
    <Fragment>
      <List dense className={classes.listWrapper}>
        <ListItem className="p-1">
          <ManageFolder update={false} />
        </ListItem>
        {folderListWithMS?.map((item, i) => {
          return (
            <ListItem
              key={item?._id}
              className={`d-flex justify-content-between ${item?._id === activeFolderMS?._id
                  ? classes.activeFolder
                  : classes.inActiveFolder
                }`}
            >
              <Button
                fullWidth
                className={classes.folderBtn}
                onClick={() => {
                  handleActiveFOlder(i);
                }}
              >
                <img src="/images/FolderM.png" alt={`${item?.folderName}`} />
                <span className="f-subname">{item?.folderName}</span>
              </Button>
              <div className="d-flex justify-content-start">
                {userinformation?.role === 1 ? (
                  <EditAndDeletefolder
                    folderName={item?.folderName}
                    folderId={item?._id}
                    update={true}
                    handeldelete={handeldelete}
                    itemId={item?._id}
                  />
                ) : item?.adminId !== undefined ? (
                  <HttpsOutlinedIcon
                    style={{ color: "#757575", fontSize: "1.2em" }}
                  />
                ) : (
                  <EditAndDeletefolder
                    folderName={item?.folderName}
                    folderId={item?._id}
                    update={true}
                    handeldelete={handeldelete}
                    itemId={item?._id}
                  />
                )}
              </div>
            </ListItem>
          );
        })}
      </List>
      <SweetAlert
        title="Are you sure?"
        warning
        show={defaultAlert}
        showCancel
        reverseButtons
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        onConfirm={() => {
          ConFirmDelete(folderid);
        }}
        onCancel={() => {
          setdefaultAlert(false);
        }}
      >
        You won't be able to revert this!
      </SweetAlert>
    </Fragment>
  );
};
export default connect(null, {
  DELETE_MEMBERSHIP_FOLDER,
})(MemberShipFolder);
