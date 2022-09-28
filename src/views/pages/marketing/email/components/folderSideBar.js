import { List, ListItem, Collapse, Button } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { makeStyles } from "@material-ui/styles";
import ManageSubFolder from "./manageSubFolder";
import EditDeleteFolder from "../../../documents/components/EditDeleteFolder";
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";

import EditSubDeleteFolder from "./DeleteEditsubfolder";
import { connect } from "react-redux";

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
  subFolder: {
    width: "80%",
    display: "flex",
    color: "#2796f3",
    justifyContent: "flex-start !important",
    background: "transparent",
  },
  listWrapper: {
    paddingTop: "0px",
    position: "relative",
    overflow: "scroll",
    height: "76vh",
    width: "280px",
  },
}));

function FolderSideBar(props) {
  const classes = useStyles();
  const {
    FolderList,
    subFolderActive,
    setSubFolderActive,
    setSubFolderActiveName,
    DeleteFolder,
    activeFolder,
    setActiveFolder,
    GetMailsOfCurrentFolder,
    MailIndexType,
    updateFolder,
    handelUpdateFolder,
    handleCloseForUpdate,
    updateEmailFolder,
    setViewTemplate,
    userinformation,
  } = props;
  // const [activeFolder, setActiveFolder] = useState(null);
  const [openFolder, setOpenFolder] = useState(null);

  const handleOpenFolder = (folder) => {
    setOpenFolder(!openFolder);
    setActiveFolder(folder);
  };

  const activeSubFolder = (id, name) => {
    setViewTemplate(null);
    setSubFolderActive(id);
    setSubFolderActiveName(name);
    if (MailIndexType === 0) {
      GetMailsOfCurrentFolder("/api/email_compose", id);
    } else if (MailIndexType === 1) {
      GetMailsOfCurrentFolder("/api/email_nurturing", id);
    } else if (MailIndexType === 2) {
      GetMailsOfCurrentFolder("/api/email_system", id);
    }
  };

  return (
    <Fragment>
      <List className={classes.listWrapper} dense>
        {FolderList?.data?.map((folder) => {
          return (
            <Fragment key={folder?._id}>
              <ListItem
                className={
                  activeFolder?._id === folder?._id
                    ? classes.activeFolder
                    : classes.inActiveFolder
                }
              >
                <Button
                  className={classes.folderBtn}
                  fullWidth
                  onClick={() => {
                    handleOpenFolder(folder);
                  }}
                >
                  <img
                    src="/images/FolderM.png"
                    alt={`${folder?.categoryName}`}
                  />
                  <span className="f-subname">{folder?.categoryName}</span>
                </Button>

                {folder?.folder?.length > 0 ? (
                  <ExpandMoreIcon fontSize="small" />
                ) : (
                  <div className="ml-1"></div>
                )}
                {folder?.adminId !== undefined ? (
                  <HttpsOutlinedIcon
                    style={{ color: "#757575", fontSize: "1.2em" }}
                  />
                ) : (
                  <EditDeleteFolder
                    toggleModal={updateFolder}
                    item={folder}
                    OpenAlert={DeleteFolder}
                  />
                )}
              </ListItem>
              <Collapse
                className=""
                in={openFolder && activeFolder?._id === folder?._id}
              >
                {folder?.folder?.map((nestedFolder) => {
                  return (
                    <ListItem
                      style={{
                        backgroundColor:
                          subFolderActive === nestedFolder?._id
                            ? "rgb(104 160 225 / 9%)"
                            : null,
                      }}
                      key={nestedFolder?._id}
                    >
                      <Button
                        onClick={() => {
                          activeSubFolder(
                            nestedFolder?._id,
                            nestedFolder?.folderName
                          );
                        }}
                        fullWidth
                        className={`${classes.folderBtn} ml-2`}
                      >
                        {subFolderActive === nestedFolder?._id ? (
                          <FiberManualRecordIcon
                            style={{ paddingRight: "6px", color: "#2796f3" }}
                            fontSize="small"
                            className="f-subname"
                          />
                        ) : (
                          <img
                            src="/images/FolderS.png"
                            alt={`${nestedFolder?.folderName}`}
                          />
                        )}
                        <div>
                          <span className="f-subnam">
                            {nestedFolder?.folderName}
                          </span>
                        </div>
                      </Button>
                      {nestedFolder?.adminId !== undefined?(
                        <HttpsOutlinedIcon
                          style={{ color: "#757575", fontSize: "1.2em" }}
                        />
                      ) : (
                        <EditSubDeleteFolder
                          nestedFolder={nestedFolder}
                          deleteSubMenu={DeleteFolder}
                          ManageSubFolderMenu={
                            <ManageSubFolder
                              editSubFolder="edit"
                              MailIndexType={MailIndexType}
                              folderName={nestedFolder?.folderName}
                              folderId={nestedFolder?._id}
                              handelUpdateFolder={handelUpdateFolder}
                              handleCloseForUpdate={handleCloseForUpdate}
                              updateEmailFolder={updateEmailFolder}
                              mainFolderId={folder?._id}
                            />
                          }
                        />
                      )}
                    </ListItem>
                  );
                })}
                <ManageSubFolder
                  FolderTypeToAdd={"subFolder"}
                  MailIndexType={MailIndexType}
                  mainFolderId={folder?._id}
                />
              </Collapse>
            </Fragment>
          );
        })}
      </List>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    userinformation: state.userinfo?.userinformation,
  };
};

export default connect(mapStateToProps, null)(FolderSideBar);
