import React, { Fragment, useState } from "react";
import { Collapse } from "reactstrap";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NewFolder from "./CreateOrEditFolder/createFolderModal";
import CreateAndEditSubFolder from "./SubFoldes";
import { connect } from "react-redux";
import { List, ListItem, Button, makeStyles } from "@material-ui/core";
import EditDeleteFolder from "./EditAndDeleteFolder";
import ConfirmationModal from "../../../../../../../../../components/gloabal/confirmation";
import {
  LIST_TEMPLATES,
  REMOVE_FOLDER,
  REMOVE_SUB_FOLDER,
  SET_FOLDER_ID,
  SUB_FOLDER_DATA,
  MAIN_FOLDER_DATA
} from "../../../../../../../../../redux/actions/marketing/text";
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";

const useStyles = makeStyles(() => ({
  activeMainFolder: {
    background: "#eaf4fe",
    maxHeight: "42px",
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
    width: "280px",
    background: "#fff",
    paddingTop: "0px",
    position: "relative",
    overflow: "scroll",
    minHeight: "90vh",
    borderRight: "2px solid #f8f8f8",
  },
  addMianFOlder: {
    color: "#fff",
    background: "#2796f3",
    fontWeight: "bold !important",
  },
}));

function TextTemplateSidebar(props) {
  const classes = useStyles();
  const { data, setTemplate } = props;
  const [activeMainFolder, setActiveMainFolder] = useState(null);
  const [activeSubMainFolder, setActiveSubMainFolder] = useState(null);
  const [openFolder, setOpenFolder] = useState(null);
  const [sweetAlertOpen, setSweetAlertOpen] = useState(false);
  const [type, setType] = useState("");

  const handleMainFolder = (folder) => {
    setOpenFolder(!openFolder);
    setActiveMainFolder(folder);
    props.MAIN_FOLDER_DATA(folder)
    setActiveSubMainFolder(null);
  };
  const handleSubFolder = (mainFolder, subFolder) => {
    setActiveSubMainFolder(subFolder);
    setActiveMainFolder(mainFolder);
    props.SET_FOLDER_ID(mainFolder?._id, subFolder?._id);
    props.LIST_TEMPLATES(subFolder?._id);
    props.SUB_FOLDER_DATA(subFolder);
    props.MAIN_FOLDER_DATA(mainFolder)
  };

  const handleDeleteFolder = () => {
    if (type === "folder") {
      props.REMOVE_FOLDER(null, activeMainFolder);
    } else {
      props.REMOVE_SUB_FOLDER(null, activeSubMainFolder);
    }
    setSweetAlertOpen(false);
  };

  const handleDeleteId = (type, folderid) => {
    setSweetAlertOpen(true);
    setType(type);
  };
  return (
    <Fragment>
      <List className={classes.listWrapper} dense>
        <NewFolder />
        {props?.data?.map((item) => {
          return (
            <Fragment key={item?._id}>
              <ListItem
                className={
                  activeSubMainFolder === null &&
                  activeMainFolder?._id === item?._id
                    ? classes.activeMainFolder
                    : classes.inActiveFolder
                }
                button
                onClick={() => {
                  setActiveMainFolder(item);
                }}
              >
                <Button
                  className={classes.folderBtn}
                  fullWidth
                  onClick={() => {
                    handleMainFolder(item);
                  }}
                >
                  <img
                    src={`/images/FolderM.png`}
                    alt={`${item?.folderName}`}
                  />
                  <span className="f-subname text-capitalize">
                    {item?.folderName}
                  </span>
                </Button>
                {item?.subFolder?.length > 0 ? (
                  <ExpandMoreIcon fontSize="small" />
                ) : (
                  <div className="ml-1"></div>
                )}
                {item?.adminId === undefined ? (
                  <EditDeleteFolder
                    editfolder={<NewFolder item={item} />}
                    OpenAlert={handleDeleteId}
                    item={item}
                    FolderType="folder"
                  />
                ) : (
                  <HttpsOutlinedIcon
                    fontSize="small"
                    style={{ color: "#757575" }}
                  />
                )}
              </ListItem>
              <Collapse
                isOpen={openFolder && item?._id === activeMainFolder?._id}
              >
                <List>
                  {item?.subFolder?.map((subFolder) => {
                    return (
                      <ListItem
                        button
                        onClick={() => {
                          handleSubFolder(item, subFolder);
                        }}
                        key={subFolder?._id}
                        className={
                          activeSubMainFolder?._id === subFolder?._id
                            ? classes.activeMainFolder
                            : classes.inActiveFolder
                        }
                      >
                        <Button className={classes.folderBtn} fullWidth>
                          <div className="f-subname">
                            <img
                              src="/images/FolderS.png"
                              alt={`${subFolder?.subFolderName}`}
                            />
                            <span className="f-subnam text-capitalize">
                              {subFolder?.subFolderName}
                            </span>
                          </div>
                        </Button>
                        {item?.adminId === undefined ? (
                          <EditDeleteFolder
                            editfolder={
                              <CreateAndEditSubFolder
                                item={subFolder}
                                subFolder={subFolder}
                              />
                            }
                            OpenAlert={handleDeleteId}
                            item={subFolder}
                            FolderType="subfolder"
                          />
                        ) : (
                          <HttpsOutlinedIcon
                            fontSize="small"
                            style={{ color: "#757575" }}
                          />
                        )}
                      </ListItem>
                    );
                  })}
                  <div>
                    <CreateAndEditSubFolder mainFolder={item} />
                  </div>
                </List>
              </Collapse>
            </Fragment>
          );
        })}
        <ConfirmationModal
          primaryColor="#0483fd"
          secondaryColor="#fff"
          imagePath="/images/delete.png"
          open={sweetAlertOpen}
          title="Delete file ?"
          onConfirm={handleDeleteFolder}
          onCancel={() => {
            setSweetAlertOpen(false);
          }}
          onCancelButtonTitle={"Cancel"}
          contiunuebuttonTitle={"Delete"}
          description=" Are you sure you want to delete?"
        />
      </List>
    </Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    userinformation: state.userinfo.userinformation,
  };
};
export default connect(mapStateToProps, {
  REMOVE_FOLDER,
  REMOVE_SUB_FOLDER,
  LIST_TEMPLATES,
  SET_FOLDER_ID,
  SUB_FOLDER_DATA,
  MAIN_FOLDER_DATA
})(TextTemplateSidebar);
