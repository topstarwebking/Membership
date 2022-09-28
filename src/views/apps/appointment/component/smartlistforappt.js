import React, { Fragment, useState } from "react";
import {
  List,
  ListItem,
  Button,
  makeStyles,
  Grid,
  Avatar,
} from "@material-ui/core";
import {
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import ControlPointIcon from "@material-ui/icons/AddCircle";
import { connect } from "react-redux";
import CreatAndEditdolder from "../../../../../src/views/pages/settings/Smratlist/CreateAndEditfolder";
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";
import moment from "moment";
import EditorDeletSmratlist from "../../../../../src/views/pages/settings/Smratlist/EditorDeletSmratlist";
import { useEffect } from "react";
import CreateSmartlistModal from "../../../../../src/views/pages/settings/Smratlist/CreatesmartlistModal";
import {
  DELETE_SMART_LIST,
  DELETE_SMART_LIST_FOLDER,
  GET_ALL_SMART_LIST,
} from "../../../../redux/actions/email";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircle";
import EditanddeleteFolder from "../../../../../src/views/pages/settings/Smratlist/EditanddeleteFolder";
import ConfirmationModal from "../../../../components/gloabal/confirmation";

const useStyles = makeStyles(() => ({
  activeFolder: {
    background: "#eaf4fe",
    "& button": {
      color: "#2796f3",
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
    height: "90vh",
    borderRight: "2px solid #f8f8f8",
  },
}));

const Smartlistforappt = (props) => {
  const classes = useStyles();

  const {
    getAllSmartList,
    DELETE_SMART_LIST,
    GET_ALL_SMART_LIST,
    userinformation,
    handleSelectItem,
    smartlistId,
  } = props;
  const [activeFolderdata, setactiveFolderdata] = useState([]);
  const [defaultAlert, setdefaultAlert] = useState(false);
  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [Id, setID] = useState("");
  const [criteria, setcriteria] = useState([]);
  const handleClick = (event, item) => {
    setID(item?._id);
    handleOpen(item?.criteria);
  };
  const handleOpen = (item) => {
    let data = [];
    let soda2 = Object.entries(item);
    for (let i of soda2) {
      for (let el of i[1]) {
        data.push(el);
      }
    }
    setcriteria(data);
  };
  const handleDelete = (type, id) => {
    setId(id);
    setdefaultAlert(true);
    setType(type);
  };
  const handledelet = () => {
    if (type === "smartlist") {
      DELETE_SMART_LIST(id);
      setdefaultAlert(false);
    } else {
      props.DELETE_SMART_LIST_FOLDER(id);
      setdefaultAlert(false);
    }
  };

  useEffect(() => {
    let findActiveSubFolder = getAllSmartList?.filter(
      (i) => i?._id === activeFolderdata?._id
    );
    if (findActiveSubFolder?.length) {
      setactiveFolderdata(findActiveSubFolder[0]);
    }
  }, [getAllSmartList, activeFolderdata]);

  const handlechekdvalue = (id) => {
    if (smartlistId.includes(id)) {
      return <CheckCircleOutlineIcon style={{ color: "#2796f3" }} />;
    } else {
      return <ControlPointIcon style={{ color: "#2796f3" }} />;

    }
  };
  useEffect(() => {
    GET_ALL_SMART_LIST();
  },[]);
  return (
    <Fragment>
      <div className="d-flex w-100">
        <List dense className={classes.listWrapper}>
          <ListItem>
            <CreatAndEditdolder />
          </ListItem>
          {getAllSmartList?.map((item, i) => {
            return (
              <ListItem
                key={item?._id}
                className={
                  activeFolderdata?._id === item?._id
                    ? classes.activeFolder
                    : ""
                }
              >
                <Button
                  fullWidth
                  className={classes.folderBtn}
                  onClick={() => {
                    setactiveFolderdata(item);
                  }}
                >
                  <img src="/images/FolderM.png" alt="folder icon" />
                  <span className="f-subname">{item?.folderName}</span>
                </Button>
                <div className="d-flex justify-content-start">
                  {userinformation?.role === 1 ? (
                    <EditanddeleteFolder
                      item={item}
                      openAlert={handleDelete}
                      userinformation={userinformation}
                      activeFolderdata={activeFolderdata}
                    />
                  ) : item?.adminId !== undefined ? (
                    <HttpsOutlinedIcon
                      style={{ color: "#757575", fontSize: "1.2em" }}
                    />
                  ) : (
                    <EditanddeleteFolder
                      item={item}
                      openAlert={handleDelete}
                      userinformation={userinformation}
                      activeFolderdata={activeFolderdata}
                    />
                  )}
                </div>
              </ListItem>
            );
          })}
        </List>
        <div className="w-100">
          <CreateSmartlistModal
            userinformation={userinformation}
            activeFolderdata={activeFolderdata}
          />
          <div className="w-100 m-1">
            <Grid container spacing={1} className="w-100">
              {activeFolderdata?.smartlists?.map((element) => {
                return (
                  <Grid item sm={12} md={12} lg={12} key={element?._id}>
                    <div
                      className="shadow sm-rounded"
                      style={{
                        boxShadow:
                          "0 0.5rem 1rem rgb(34 41 47 / 15%) !important",
                        width: "100%",
                        padding: "0px",
                      }}
                      onClick={() => {
                        handleSelectItem(element);
                      }}
                    >
                      <div className="p-1">
                        <div
                          color="textSecondary"
                          className="d-flex justify-content-between w-100"
                        >
                          <div className="d-flex">
                            <Avatar
                              style={{
                                background: "#eaf4fe",
                              }}
                            >
                              {handlechekdvalue(element?._id)}
                            </Avatar>
                            <span
                              className="text-bold"
                              style={{ padding: "0.8em" }}
                            >
                              <b>{element?.smartlistname}</b>
                            </span>
                          </div>
                          <div className="d-flex justify-content-end">
                            {userinformation?.role === 1 ? (
                              <EditorDeletSmratlist
                                item={element}
                                OpenAlert={handleDelete}
                                userinformation={userinformation}
                                activeFolderdata={activeFolderdata}
                              />
                            ) : element?.adminId !== undefined ? (
                              <HttpsOutlinedIcon style={{ color: "#2796f3" }} />
                            ) : (
                              <EditorDeletSmratlist
                                item={element}
                                OpenAlert={handleDelete}
                                userinformation={userinformation}
                                activeFolderdata={activeFolderdata}
                              />
                            )}
                          </div>
                        </div>
                        <br></br>
                        <div className="d-flex justify-content-between">
                          <span>
                            <b>{"Date "}</b>
                            {moment(element?.createdAt).format("MM/DD/YY")}
                          </span>
                          <UncontrolledButtonDropdown
                            tag="li"
                            className="dropdown-user nav-item"
                          >
                            <DropdownToggle
                              onClick={(e) => {
                                handleClick(e, element);
                              }}
                              style={{
                                color: "#00a6e1",
                                background: "#eaf4fe !important",
                                fontWeight: "600",
                              }}
                            >
                              criteria
                            </DropdownToggle>
                            <DropdownMenu right>
                              {criteria?.map((item, i) => {
                                return (
                                  <DropdownItem
                                    style={{
                                      width: "100%",
                                      color: "#00a6e1",
                                      background: "#eaf4fe !important",
                                      fontWeight: "600",
                                    }}
                                    key={i}
                                  >
                                    {item}
                                  </DropdownItem>
                                );
                              })}
                            </DropdownMenu>
                          </UncontrolledButtonDropdown>
                        </div>
                      </div>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </div>
      </div>
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={defaultAlert}
        title="Delete file ?"
        onConfirm={handledelet}
        onCancel={() => {
          setdefaultAlert(false);
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Yes, Delete"}
        description=" Are you sure you want to delete?"
      />
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    userinformation: state.userinfo.userinformation,
    getAllSmartList: state.EmailMarketing.getAllSmartList,
  };
};
export default connect(mapStateToProps, {
  DELETE_SMART_LIST_FOLDER,
  DELETE_SMART_LIST,
  GET_ALL_SMART_LIST,
})(Smartlistforappt);
