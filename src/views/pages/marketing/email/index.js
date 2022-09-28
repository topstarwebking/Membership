import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  GET_ALL_SECHEDULE_EMAIL,
  GET_CATEGORIES_EMAIL,
  DELETE_SUB_FOLDER_EMAIL,
  DELETE_CATEGORY_EMAIL,
  GET_SCHEDULE_MAILS,
  UPDATE_EMAIL_CATEGORY,
  DELETE_MULTIPLE_TEMPLATE,
  GET_SENT_EMAILS,
  GET_ALL_SMART_LIST,
} from "../../../../redux/actions/email";
import FolderSideBar from "./components/folderSideBar";
import ListAllEmails from "./components/listAllEmails";
import ListAllNurturingEmails from "./components/listAllNurturingEmails";
import DeleteIcon from "@material-ui/icons/Delete";
import { Drawer, useMediaQuery } from "@material-ui/core";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import {
  CardContent,
  Card,
  Tabs,
  Button,
  Tab,
  Checkbox,
  Typography,
  IconButton,
  Grid,
} from "@material-ui/core";
import ReorderIcon from "@material-ui/icons/Reorder";
import CloseIcon from "@material-ui/icons/Close";
import ViewEmail from "./components/viewEmail";
import ManageFolder from "./components/manageFolder";
import EmailWriteOrEdit from "./components/emailwriteEditor";
import EmailAddresses from "./emailVerify";
import BreadCrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";

import Content from "../../documents/components/Content";

const useStyles = makeStyles(() => ({
  CardStyle: {
    boxShadow: "0 4px 20px 0 rgb(0 0 0 / 5%)",
    borderRadius: "1rem",
    width: "100%",
  },
  noDataWrapper: {
    height: "300px",
    width: "300px",
  },
  listWrapper: {
    position: "relative",
    overflow: "auto",
    height: "80vh",
    width: "100%",
  },
  Addtemplate: {
    position: "fixed",
    background: "#2796f3",
    color: "#fff",
    borderRadius: "10px !important",
    fontWeight: "bold",
    bottom: "1rem",
    right: "2rem",
    "&:hover": {
      background: "#2796f3",
    },
  },
  temCount: {
    background: "#2796f3",
    padding: "0 6px",
    borderRadius: "10px",
    color: "#fff",
    fontWeight: "bold",
  },
  activeTab: {
    color: "#2796f3",
  },
  inactiveTab: {
    color: "#2796f3",
  },
  smartListDes: {
    background: "#eaf4fe",
  },
  addMianFOlder: {
    color: "#00a6e1",
    border: "1px solid #00a6e1",
    marginLeft: "10px",
    background: "white",
    fontWeight: "bold !important",
    borderRadius: "5px !important",
  },
}));

const Compose = (props) => {
  const classes = useStyles();
  // ---------------------- for compose email
  const {
    GET_CATEGORIES_EMAIL,
    DELETE_CATEGORY_EMAIL,
    DELETE_SUB_FOLDER_EMAIL,
    GET_SCHEDULE_MAILS,
    DELETE_MULTIPLE_TEMPLATE,
    GET_SENT_EMAILS,
    GET_ALL_SECHEDULE_EMAIL,
    GET_ALL_SMART_LIST,
  } = props;
  const {
    categoriesEmail,
    allScheduleMails,
    allSentEmails,
    allTypeOfScheduleEmails,
  } = props;

  const IsSmallDevise = useMediaQuery("(max-width:1200px)");

  const [viewTemplate, setViewTemplate] = useState(null);
  const [mailsTODisplay, setMailsTODisplay] = useState([]);
  const [MailIndexType, setMailIndexType] = useState(0);
  const [editOrAddOrListTemplate, setEditOrAddOrListTemplate] = useState("add");
  const [SweetAlertOpen, setSweetAlertOpen] = useState({
    actionId: null,
    folderType: "",
    open: false,
  });
  const [folderUpdateDetails, setFolderUpdateDetails] = useState({
    folderId: null,
    folderName: "",
    isUpdateMain: false,
  });

  const [selectedId, setSelectedId] = useState([]);
  const [subFolderActive, setSubFolderActive] = useState(null);
  const [subFolderActiveName, setSubFolderActiveName] = useState(null);
  const [activeFolder, setActiveFolder] = useState(null);

  const [FolderMenuOpen, setFolderMenuOpen] = useState(false);

  useEffect(() => {
    GET_CATEGORIES_EMAIL("/api/email_compose"); // compose
    GET_SENT_EMAILS();
    GET_ALL_SECHEDULE_EMAIL();
    GET_ALL_SMART_LIST();
  }, [GET_CATEGORIES_EMAIL, GET_SENT_EMAILS]);

  const DeleteFolder = (actionId, FolderType) => {
    setSweetAlertOpen({ actionId, FolderType, open: true });
  };

  const handleOnConfirm = () => {
    if (SweetAlertOpen.FolderType === "mainFolder") {
      deleteMainFolder(MailIndexType, SweetAlertOpen?.actionId);
    } else {
      deleteSubFolder(MailIndexType, SweetAlertOpen?.actionId);
    }
    setSweetAlertOpen({ actionId: null, folderType: "", open: false });
  };

  const handleOnCancel = () => {
    setSweetAlertOpen({ actionId: null, folderType: "", open: false });
  };

  const GetMailsOfCurrentFolder = (UrlPath, folderId) => {
    GET_SCHEDULE_MAILS(UrlPath, folderId);
    setEditOrAddOrListTemplate("list");
  };

  const deleteMainFolder = (mailIndex, id) => {
    if (mailIndex === 0) {
      DELETE_CATEGORY_EMAIL("/api/email_compose", id);
    } else if (mailIndex === 1) {
      DELETE_CATEGORY_EMAIL("/api/email_nurturing", id);
    } else if (mailIndex === 2) {
      DELETE_CATEGORY_EMAIL("/api/email_system", id);
    }
  };

  const deleteSubFolder = (mailIndex, id) => {
    if (mailIndex === 0) {
      DELETE_SUB_FOLDER_EMAIL("/api/email_compose", id);
    } else if (mailIndex === 1) {
      DELETE_SUB_FOLDER_EMAIL("/api/email_nurturing", id);
    } else if (mailIndex === 2) {
      DELETE_SUB_FOLDER_EMAIL("/api/email_system", id);
    }
  };

  const ChangeMailIndexType = (event, newValue) => {
    setMailIndexType(newValue);
    setMailsTODisplay([]);
    setViewTemplate(null);
    setActiveFolder(null);
    setSubFolderActive(null);
    setSubFolderActiveName(null);
    setEditOrAddOrListTemplate("list");
    if (newValue === 0) {
      GET_CATEGORIES_EMAIL("/api/email_compose");
      setEditOrAddOrListTemplate("add");
    } else if (newValue === 1) {
      GET_CATEGORIES_EMAIL("/api/email_nurturing");
    } else if (newValue === 2) {
      GET_CATEGORIES_EMAIL("/api/email_system");
    } else if (newValue === 3) {
      setMailsTODisplay(allSentEmails);
    } else if (newValue === 4) {
      setMailsTODisplay(allTypeOfScheduleEmails);
    }
  };

  const handleView = (template) => {
    setViewTemplate(template);
  };

  const updateFolder = (actionId, folderName, value) => {
    setFolderUpdateDetails({
      ...folderUpdateDetails,
      folderId: actionId,
      folderName: value,
      isUpdateMain: true,
    });
  };

  const handelUpdateFolder = (event, folderId = null) => {
    const value = event.target.value;
    if (folderId) {
      setFolderUpdateDetails({
        ...folderUpdateDetails,
        folderName: value,
        folderId: folderId,
      });
    } else {
      setFolderUpdateDetails({
        ...folderUpdateDetails,
        folderName: value,
      });
    }
  };

  const updateEmailFolder = (type) => {
    if (MailIndexType === 0) {
      props.UPDATE_EMAIL_CATEGORY(
        "/api/email_compose",
        folderUpdateDetails.folderId,
        folderUpdateDetails.folderName,
        type
      );
    } else if (MailIndexType === 1) {
      props.UPDATE_EMAIL_CATEGORY(
        "/api/email_nurturing",
        folderUpdateDetails.folderId,
        folderUpdateDetails.folderName,
        type
      );
    } else if (MailIndexType === 2) {
      props.UPDATE_EMAIL_CATEGORY(
        "/api/email_system",
        folderUpdateDetails.folderId,
        folderUpdateDetails.folderName,
        type
      );
    }
    handleCloseForUpdate(type);
  };

  const handleCloseForUpdate = (type) => {
    if (type === "main") {
      setFolderUpdateDetails({
        ...folderUpdateDetails,
        folderId: null,
        folderName: "",
        isUpdateMain: false,
      });
    } else {
      setFolderUpdateDetails({
        ...folderUpdateDetails,
        folderId: null,
        folderName: "",
      });
    }
  };
  const MakeActionOnTemplate = () => {
    setEditOrAddOrListTemplate("add");
  };

  const handleSelectAll = () => {
    if (mailsTODisplay !== undefined || mailsTODisplay?.length > 0) {
      if (selectedId.length > 0) {
        setSelectedId([]);
        return;
      }
      for (let item of mailsTODisplay) {
        setSelectedId((preStuff) => [...preStuff, item?._id]);
      }
    }
  };

  const handleselecteOne = (e, item) => {
    let { value } = e.target;
    if (selectedId?.includes(value)) {
      let IdAfterRemove = selectedId?.filter((id) => id !== value);
      setSelectedId(IdAfterRemove);
    } else {
      setSelectedId((preStuff) => [...preStuff, value]);
    }
  };

  const deleteSelectedMail = () => {
    if (MailIndexType === 0) {
      DELETE_MULTIPLE_TEMPLATE(
        `/api/email_compose`,
        { templateId: selectedId },
        subFolderActive
      );
      setSelectedId([]);
    } else if (MailIndexType === 1) {
      DELETE_MULTIPLE_TEMPLATE(
        `/api/email_nurturing`,
        selectedId,
        subFolderActive
      );
      setSelectedId([]);
    } else if (MailIndexType === 2) {
      DELETE_MULTIPLE_TEMPLATE(
        `/api/email_system`,
        { templateId: selectedId },
        subFolderActive
      );
      setSelectedId([]);
    }
  };
  const handleSidebaropen = () => {
    setFolderMenuOpen(true);
  };
  useEffect(() => {
    setMailsTODisplay(allScheduleMails?.data?.template);
  }, [allScheduleMails]);
  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="Email Marketing"
        breadCrumbParent="Marketing"
        breadCrumbActive="Email Marketing"
      />

      <Card className={classes.CardStyle}>
        <CardContent style={{ width: "100%" }} className="p-0">
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between w-100">
                <div className="d-flex justify-content-start">
                  <div>
                    {IsSmallDevise && (
                      <IconButton
                        className="rounded-circle"
                        onClick={handleSidebaropen}
                      >
                        <ReorderIcon />
                      </IconButton>
                    )}
                  </div>
                  <Tabs
                    value={MailIndexType}
                    variant="scrollable"
                    TabIndicatorProps={{
                      style: { background: "#2796f3", height: "2px" },
                    }}
                    onChange={ChangeMailIndexType}
                  >
                    <Tab
                      className={MailIndexType === 0 ? classes.activeTab : ""}
                      label={
                        <div>
                          <span>
                            <b>Compose</b>
                          </span>
                        </div>
                      }
                    />
                    <Tab
                      className={MailIndexType === 1 ? classes.activeTab : ""}
                      label={
                        <div>
                          <span>
                            <b>Nurturing</b>
                          </span>
                        </div>
                      }
                    />
                    <Tab
                      className={MailIndexType === 2 ? classes.activeTab : ""}
                      label={
                        <div>
                          <span>
                            <b>SYSTEM</b>
                          </span>
                        </div>
                      }
                    />
                    <Tab
                      className={MailIndexType === 3 ? classes.activeTab : ""}
                      label={
                        <div>
                          <span>
                            <b>SENT</b>
                          </span>
                        </div>
                      }
                    />
                    <Tab
                      className={MailIndexType === 4 ? classes.activeTab : ""}
                      label={
                        <div>
                          <span>
                            <b>Scheduled</b>
                          </span>
                        </div>
                      }
                    />
                  </Tabs>
                </div>
                <div className="d-flex justify-content-end w-100">
                  {mailsTODisplay?.length > 0 && (
                    <div className="d-flex justify-content-start align-items-center pr-1">
                      {selectedId?.length > 0 ? (
                        <IconButton
                          disabled={MailIndexType === 3 || MailIndexType === 4}
                          onClick={deleteSelectedMail}
                        >
                          <DeleteIcon />
                        </IconButton>
                      ) : null}
                      <div className="d-flex justify-content-start align-items-center">
                        <Checkbox
                          checked={selectedId?.length > 0}
                          onChange={handleSelectAll}
                        />
                        <Typography className="mb-0">Select All</Typography>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flex: 1 }}>
              {MailIndexType === 0 ||
              MailIndexType === 1 ||
              MailIndexType === 2 ? (
                <Fragment>
                  {IsSmallDevise ? (
                    <Drawer
                      onClose={() => {
                        setFolderMenuOpen(!FolderMenuOpen);
                      }}
                      open={FolderMenuOpen}
                    >
                      <div className="d-flex justify-content-end">
                        <IconButton
                          onClick={() => {
                            setFolderMenuOpen(!FolderMenuOpen);
                          }}
                          className="rounded-circle"
                        >
                          <CloseIcon />
                        </IconButton>
                      </div>
                      <div className="d-flex flex-column  align-items-center">
                        <div
                          style={{ width: "100%" }}
                          className="d-flex flex-row align-items-between justify-content-between py-1 px-2"
                        >
                          <ManageFolder
                            MailIndexType={MailIndexType}
                            FolderTypeToAdd={"main"}
                            folderName={folderUpdateDetails.folderName}
                            isUpdateMain={folderUpdateDetails.isUpdateMain}
                            handelUpdateFolder={handelUpdateFolder}
                            handleCloseForUpdate={handleCloseForUpdate}
                            updateEmailFolder={updateEmailFolder}
                          />
                          <div style={{ width: 5 }}></div>
                          {MailIndexType === 0 && (
                            <Button
                              className={classes.addMianFOlder}
                              onClick={MakeActionOnTemplate}
                            >
                              {"Compose"}
                            </Button>
                          )}
                        </div>
                        <FolderSideBar
                          activeFolder={activeFolder}
                          setActiveFolder={setActiveFolder}
                          setViewTemplate={setViewTemplate}
                          subFolderActive={subFolderActive}
                          setSubFolderActive={setSubFolderActive}
                          setSubFolderActiveName={setSubFolderActiveName}
                          DeleteFolder={DeleteFolder}
                          folderName={folderUpdateDetails.folderName}
                          updateFolder={updateFolder}
                          handelUpdateFolder={handelUpdateFolder}
                          handleCloseForUpdate={handleCloseForUpdate}
                          updateEmailFolder={updateEmailFolder}
                          MailIndexType={MailIndexType}
                          GetMailsOfCurrentFolder={GetMailsOfCurrentFolder}
                          FolderList={categoriesEmail}
                        />
                      </div>
                    </Drawer>
                  ) : (
                    <div className="d-flex flex-column  align-items-center">
                      <div
                        style={{ width: "100%" }}
                        className="d-flex flex-row align-items-between justify-content-between py-1 px-2"
                      >
                        <ManageFolder
                          MailIndexType={MailIndexType}
                          FolderTypeToAdd={"main"}
                          folderName={folderUpdateDetails.folderName}
                          isUpdateMain={folderUpdateDetails.isUpdateMain}
                          handelUpdateFolder={handelUpdateFolder}
                          handleCloseForUpdate={handleCloseForUpdate}
                          updateEmailFolder={updateEmailFolder}
                        />
                        <div style={{ width: 5 }}></div>
                        {MailIndexType === 0 && (
                          <Button
                            className={classes.addMianFOlder}
                            onClick={MakeActionOnTemplate}
                          >
                            {"Compose"}
                          </Button>
                        )}
                      </div>
                      <FolderSideBar
                        activeFolder={activeFolder}
                        setActiveFolder={setActiveFolder}
                        setViewTemplate={setViewTemplate}
                        subFolderActive={subFolderActive}
                        setSubFolderActive={setSubFolderActive}
                        setSubFolderActiveName={setSubFolderActiveName}
                        DeleteFolder={DeleteFolder}
                        folderName={folderUpdateDetails.folderName}
                        updateFolder={updateFolder}
                        handelUpdateFolder={handelUpdateFolder}
                        handleCloseForUpdate={handleCloseForUpdate}
                        updateEmailFolder={updateEmailFolder}
                        MailIndexType={MailIndexType}
                        GetMailsOfCurrentFolder={GetMailsOfCurrentFolder}
                        FolderList={categoriesEmail}
                      />
                    </div>
                  )}
                </Fragment>
              ) : null}
              {MailIndexType === 5 ? (
                <div style={{ width: "100%" }}>
                  <EmailAddresses MailIndexType={MailIndexType} />
                </div>
              ) : (
                <div
                  style={{
                    background: "#f6f8fa",
                    width: "100%",
                    overflow: "auto",
                  }}
                >
                  {/* {activeFolder !== null ? */}
                  {(MailIndexType === 0 ||
                    MailIndexType === 1 ||
                    MailIndexType === 2) && (
                    <div className="d-flex flex-row   justify-content-between px-2 pt-1">
                      <div className="row breadcrumbs-top p-0 ">
                        {activeFolder && (
                          <div className="col-12">
                            <Breadcrumb tag="ol" className="p-0">
                              <BreadcrumbItem tag="li">
                                {activeFolder?.categoryName}
                              </BreadcrumbItem>
                              {subFolderActiveName && (
                                <BreadcrumbItem tag="li">
                                  {subFolderActiveName}
                                </BreadcrumbItem>
                              )}
                            </Breadcrumb>
                          </div>
                        )}
                      </div>
                      {(MailIndexType === 1 || MailIndexType === 2) &&
                        editOrAddOrListTemplate === "list" &&
                        activeFolder !== null && (
                          <Button
                            className={classes.addMianFOlder}
                            onClick={MakeActionOnTemplate}
                          >
                            {"Add template"}
                          </Button>
                        )}
                    </div>
                  )}
                  {editOrAddOrListTemplate === "add" ? (
                    <EmailWriteOrEdit
                      setViewTemplate={setViewTemplate}
                      template={viewTemplate}
                      MailIndexType={MailIndexType}
                      FolderList={categoriesEmail}
                      setEditOrAddOrListTemplate={setEditOrAddOrListTemplate}
                      setMailsTODisplay={setMailsTODisplay}
                    />
                  ) : null}
                  {editOrAddOrListTemplate === "list" ? (
                    <Fragment>
                      {viewTemplate === null ? (
                        <div className={classes.listWrapper}>
                          {mailsTODisplay?.length > 0 ? (
                            <>
                              {MailIndexType === 1 || MailIndexType === 2 ? (
                                <ListAllNurturingEmails
                                  handleselecteOne={handleselecteOne}
                                  selectedId={selectedId}
                                  MailIndexType={MailIndexType}
                                  handleView={handleView}
                                  subFolderActiveName={
                                    subFolderActiveName || ""
                                  }
                                  elements={mailsTODisplay}
                                />
                              ) : (
                                <ListAllEmails
                                  handleselecteOne={handleselecteOne}
                                  selectedId={selectedId}
                                  MailIndexType={MailIndexType}
                                  handleView={handleView}
                                  elements={mailsTODisplay}
                                />
                              )}
                            </>
                          ) : MailIndexType === 1 && !activeFolder ? (
                            <div className="p-1 bg-white mt-1">
                              <Grid container spacing={2} className="p-0 m-0">
                                <Grid item sm={12} md={12} lg={12}>
                                  <h4>NURTURING TUTORIAL</h4>
                                  <p
                                    className="p-1 pr-5"
                                    style={{
                                      background: "#eaf4fe",
                                    }}
                                  >
                                    Nurturing is a powerful tool designed to
                                    allow mymember users to automate marketing
                                    campaigns. Campaigns are activated when
                                    system a specific smartlist criteria is met.
                                    Set it and forget it! Watch the videos below
                                    to use documents with ease!
                                  </p>
                                </Grid>
                                <Grid item sm={12} md={4} lg={4}>
                                  <Content
                                    hedding={"ACTIVATE YOUR FIRST EMAIL"}
                                    content={
                                      (`Learn how to activate your first smartlist email. This email will`,
                                      `"Send Immediately" upon the smartlist criteria being met.`)
                                    }
                                    link={
                                      "https://www.youtube.com/embed/bidOMaCs3vM"
                                    }
                                  />
                                </Grid>
                                <Grid item sm={12} md={4} lg={4}>
                                  <Content
                                    hedding={"AUTOMATE ADDITIONAL EMAILS"}
                                    content={
                                      "Learn how to create additional emails to send after the first email is sent out. This set it and forget it feature will increase conversions and allow leads to be nurtured prior to them becoming a paid client."
                                    }
                                    link={
                                      "https://www.youtube.com/embed/5RfLIC-3dzY"
                                    }
                                  />
                                </Grid>
                                <Grid item sm={12} md={4} lg={4}>
                                  <Content
                                    hedding={"MANAGE YOUR CAMPAIGN"}
                                    content={
                                      "Learn how to edit, delete, and use our powerful drag and drop feature to change automation sequences with ease."
                                    }
                                    link={
                                      "https://www.youtube.com/embed/0NFRvVdmmE4"
                                    }
                                  />
                                </Grid>
                              </Grid>
                            </div>
                          ) : MailIndexType === 2 && !activeFolder ? (
                            // SEYSTEM TUTORIAL
                            <div className="p-1 bg-white mt-1">
                              <Grid container spacing={2} className="p-0 m-0">
                                <Grid item sm={12} md={12} lg={12}>
                                  <h4>SYSTEM TUTORIAL</h4>
                                  <p
                                    className="p-1 pr-5"
                                    style={{
                                      background: "#eaf4fe",
                                    }}
                                  >
                                    System emails is a powerful tool designed to
                                    allow mymember users to automate
                                    notification emails upon entry to the
                                    system. Email campaigns are activated when
                                    system detects a specific smartlist criteria
                                    is met. Set it and forget it! Watch the
                                    videos below to use documents with ease!
                                  </p>
                                </Grid>
                                <Grid item sm={12} md={4} lg={4}>
                                  <Content
                                    hedding={"ACTIVATE YOUR FIRST EMAIL"}
                                    content={
                                      ("Learn how to activate your first smartlist email. This email will",
                                      `"Send Immediately" upon the smartlist criteria being met.`)
                                    }
                                    link={
                                      "https://www.youtube.com/embed/bidOMaCs3vM"
                                    }
                                  />
                                </Grid>
                                <Grid item sm={12} md={4} lg={4}>
                                  <Content
                                    hedding={"AUTOMATE ADDITIONAL EMAILS"}
                                    content={
                                      "Learn how to create additional emails to send after the first email is sent out. This set it and forget it feature will allow notification emails to continue to send out with your desired content."
                                    }
                                    link={
                                      "https://www.youtube.com/embed/5RfLIC-3dzY"
                                    }
                                  />
                                </Grid>
                                <Grid item sm={12} md={4} lg={4}>
                                  <Content
                                    hedding={"MANAGE YOUR CAMPAIGN"}
                                    content={
                                      "Learn how to edit, delete, and use our powerful drag and drop feature to change automation sequences with ease."
                                    }
                                    link={
                                      "https://www.youtube.com/embed/0NFRvVdmmE4"
                                    }
                                  />
                                </Grid>
                              </Grid>
                            </div>
                          ) : (
                            <div className="d-flex justify-content-center flex-column w-100">
                              <img
                                src={"/images/no-doc-in-file.png"}
                                alt="nodata"
                                style={{
                                  height: "400px",
                                  objectFit: "contain",
                                }}
                              />
                              <div className="d-flex justify-content-center">
                                <h3>No item Found</h3>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <ViewEmail
                          MailIndexType={MailIndexType}
                          handleView={handleView}
                          viewTemplate={viewTemplate}
                          setViewTemplate={setViewTemplate}
                          setEditOrAddOrListTemplate={
                            setEditOrAddOrListTemplate
                          }
                        />
                      )}
                    </Fragment>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <SweetAlert
        title="Are you sure?"
        warning
        show={SweetAlertOpen?.open}
        showCancel
        reverseButtons
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        onConfirm={handleOnConfirm}
        onCancel={handleOnCancel}
      >
        You won't be able to revert this!
      </SweetAlert>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    categoriesEmail: state.EmailMarketing.categoriesEmail,
    allScheduleMails: state.EmailMarketing.allScheduleMails,
    allTypeOfScheduleEmails: state.EmailMarketing.allScheduleEmails, // get all type of schedule emails
    allSentEmails: state.EmailMarketing.allSentEmails,
  };
};

export default connect(mapStateToProps, {
  GET_CATEGORIES_EMAIL,
  DELETE_SUB_FOLDER_EMAIL,
  DELETE_CATEGORY_EMAIL,
  GET_SCHEDULE_MAILS,
  DELETE_MULTIPLE_TEMPLATE,
  UPDATE_EMAIL_CATEGORY,
  GET_SENT_EMAILS,
  GET_ALL_SECHEDULE_EMAIL,
  GET_ALL_SMART_LIST,
})(Compose);
