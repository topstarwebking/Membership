import React, { Fragment, useState } from "react";
import { Collapse } from "reactstrap";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import { List, ListItem, Button, makeStyles } from "@material-ui/core";
import CreateFolder from "./CreateFolder";
import EditandDeleteFolder from "./EditandDeletFolder";
import CreateSubfolder from "./CreateSubfolder";
import ConfirmationModal from "../../../../../components/gloabal/confirmation";
import {
  GET_CATEGORIES_EMAIL_FOR_ADMIN,
  DELETE_CATEGORY_EMAIL_FOR_ADMIN,
  DELETE_CATEGORY_FOLDER_EMAIL_FOR_ADMIN,
  CREATE_CATEGORIES_EMAIL_FOR_ADMIN,
} from "../../../../../redux/actions/admin/emails";
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
    minHeight: "100vh",
    borderRight: "2px solid #f8f8f8",
  },
  addMianFOlder: {
    color: "#fff",
    background: "#2796f3",
    fontWeight: "bold !important",
  },
}));

function EmailSideBar(props) {
  const classes = useStyles();
  const {
    handleClick,
    ActiveManiFolder,
    handleSubfolder,
    UpdatefolderApiCall,
    createFolderApiCall,
    crearesubfolderApiCall,
    updateSubfolderApiCall,
    ActiveSubfolder,
  } = props;
  const [IdForDelete, setIdForDelete] = useState("");
  const [type, setType] = useState("");
  const [sweetAlertOpen, setSweetAlertOpen] = useState(false);
  const { deletFolder, deleteSubFolder } = props;
  const handleDelet = (type, id) => {
    setType(type);
    setIdForDelete(id);
    setSweetAlertOpen(true);
  };
  const handleConfirm = () => {
    if (type === "folder") {
      deletFolder(IdForDelete);
    } else {
      deleteSubFolder(IdForDelete);
    }
    setSweetAlertOpen(false);
  };
  return (
    <Fragment>
      <List className={classes.listWrapper} dense>
        <ListItem>
          <CreateFolder
            createFolderApiCall={createFolderApiCall}
            UpdatefolderApiCall={UpdatefolderApiCall}
          />
        </ListItem>
        {props?.getlistofdataofapicall?.map((item) => {
          return (
            <Fragment key={item?._id}>
              <ListItem
                button
                className={`${
                  ActiveSubfolder === null &&
                  ActiveManiFolder?._id === item?._id
                    ? classes.activeMainFolder
                    : classes.inActiveFolder
                } d-flex justify-content-between w-100`}
              >
                <Button
                  className={`${classes.folderBtn} w-100 d-flex justify-content-between`}
                  onClick={() => {
                    handleClick(item);
                  }}
                >
                  <div>
                    <img
                      src={`/images/FolderM.png`}
                      alt={`${item?.categoryName}`}
                    />
                    <span className="f-subname text-capitalize">
                      {item?.categoryName}
                    </span>
                  </div>
                  {item?.folder?.length > 0 ? (
                    <ExpandMoreIcon fontSize="small" />
                  ) : (
                    <div className="ml-1"></div>
                  )}
                </Button>
                <EditandDeleteFolder
                  editFolder={
                    <CreateFolder
                      data={item}
                      IsEdit={true}
                      createFolderApiCall={createFolderApiCall}
                      UpdatefolderApiCall={UpdatefolderApiCall}
                    />
                  }
                  item={item}
                  handleDelet={handleDelet}
                  type={"folder"}
                />
              </ListItem>
              <Collapse isOpen={item?._id === ActiveManiFolder?._id}>
                <List>
                  {ActiveManiFolder !== null &&
                    ActiveManiFolder?.folder?.map((subFolder) => {
                      return (
                        <ListItem
                          className={`${
                            ActiveSubfolder?._id === subFolder?._id
                              ? classes.activeMainFolder
                              : classes.inActiveFolder
                          }`}
                          button
                          key={subFolder?._id}
                          onClick={() => {
                            handleSubfolder(subFolder);
                          }}
                        >
                          <Button className={classes.folderBtn} fullWidth>
                            <div className="f-subname">
                              <img
                                src="/images/FolderS.png"
                                alt={`${subFolder?.folderName}`}
                              />
                              <span className="f-subnam text-capitalize">
                                {subFolder?.folderName}
                              </span>
                            </div>
                          </Button>
                          <EditandDeleteFolder
                            editFolder={
                              <CreateSubfolder
                                data={subFolder}
                                IsEdit={true}
                                item={ActiveManiFolder}
                                crearesubfolderApiCall={crearesubfolderApiCall}
                                updateSubfolderApiCall={updateSubfolderApiCall}
                              />
                            }
                            item={subFolder}
                            handleDelet={handleDelet}
                            type={"subfolder"}
                          />
                        </ListItem>
                      );
                    })}
                  <ListItem>
                    <CreateSubfolder
                      item={ActiveManiFolder}
                      crearesubfolderApiCall={crearesubfolderApiCall}
                      updateSubfolderApiCall={updateSubfolderApiCall}
                    />
                  </ListItem>
                </List>
              </Collapse>
            </Fragment>
          );
        })}
      </List>
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={sweetAlertOpen}
        title="Delete folder?"
        onConfirm={handleConfirm}
        onCancel={() => {
          setSweetAlertOpen(false);
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Delete"}
        description=" Are you sure you want to delete?"
      />
    </Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    getAllAdminCategoris: state.EmailMarketing.getAllAdminCategoris,
  };
};
export default connect(mapStateToProps, {
  GET_CATEGORIES_EMAIL_FOR_ADMIN,
  DELETE_CATEGORY_EMAIL_FOR_ADMIN,
  DELETE_CATEGORY_FOLDER_EMAIL_FOR_ADMIN,
  CREATE_CATEGORIES_EMAIL_FOR_ADMIN,
})(EmailSideBar);
