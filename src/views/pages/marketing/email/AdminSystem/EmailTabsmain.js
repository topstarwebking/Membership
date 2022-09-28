import { Tabs, Tab, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  GET_CATEGORIES_EMAIL_FOR_ADMIN,
  DELETE_CATEGORY_EMAIL_FOR_ADMIN,
  DELETE_CATEGORY_FOLDER_EMAIL_FOR_ADMIN,
  GET_NURTURING_CATEGORIES_EMAIL_FOR_ADMIN,
  GET_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN,
  CREATE_CATEGORIES_EMAIL_FOR_ADMIN,
  UPDATE_CATEGORIES_EMAIL_FOR_ADMIN,
  CREATE_CATEGORIES_FOLDER_EMAIL_FOR_ADMIN,
  UPDATE_CATEGORIES_FOLDER_EMAIL_FOR_ADMIN,
  CREATE_NURTURING_CATEGORIES_EMAIL_FOR_ADMIN,
  UPDATE_NURTURING_CATEGORIES_EMAIL_FOR_ADMIN,
  CREATE_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN,
  UPDATE_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN,
  CREATE_COMPOSE_CATEGORIES_FOLDER_EMAIL_FOR_ADMIN,
  UPDATE_COMPOSE_CATEGORIES_FOLDER_EMAIL_FOR_ADMIN,
  DELETE_COMPOSE_CATEGORY_FOLDER_EMAIL_FOR_ADMIN,
  DELETE_NURTURING_CATEGORY_EMAIL_FOR_ADMIN,
  DELETE_COMPOSE_CATEGORY_EMAIL_FOR_ADMIN,
  ADD_TEMPLATE_TO_EMAIL_FOR_ADMIN_SYSTEM,
  UPDATE_TEMPLATE_TO_EMAIL_ADMIN,
  DELETE_SCHEDULE_TEMPLATE_ADMIN,
  ADD_TEMPLATE_TO_EMAIL_FOR_ADMIN_COMPOSE,
  UPDATE_TEMPLATE_TO_EMAIL_ADMIN_COMPOSE,
  DELETE_SCHEDULE_TEMPLATE_ADMIN_COMPOSE,
} from "../../../../../redux/actions/admin/emails";
import Emailsidbarandcontent from "./Emailsidbarandcontent";

const useStyles = makeStyles(() => ({
  CardStyle: {
    boxShadow: "none",
    width: "100%",
    borderTopLeftRadius: "1.2em !important",
    borderTopRightRadius: "1.2em !important",
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
}));
const EmailTabsmain = (props) => {
  const [openEmailwriteEditor, setEmailwriteEditor] = useState("content");
  const {
    getAllAdminCategoris,
    GET_CATEGORIES_EMAIL_FOR_ADMIN,
    GET_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN,
    DELETE_CATEGORY_EMAIL_FOR_ADMIN,
    DELETE_CATEGORY_FOLDER_EMAIL_FOR_ADMIN,
    CREATE_CATEGORIES_EMAIL_FOR_ADMIN,
    UPDATE_CATEGORIES_EMAIL_FOR_ADMIN,
    CREATE_CATEGORIES_FOLDER_EMAIL_FOR_ADMIN,
    UPDATE_CATEGORIES_FOLDER_EMAIL_FOR_ADMIN,
    CREATE_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN,
    UPDATE_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN,
    CREATE_COMPOSE_CATEGORIES_FOLDER_EMAIL_FOR_ADMIN,
    UPDATE_COMPOSE_CATEGORIES_FOLDER_EMAIL_FOR_ADMIN,
    DELETE_COMPOSE_CATEGORY_FOLDER_EMAIL_FOR_ADMIN,
    DELETE_COMPOSE_CATEGORY_EMAIL_FOR_ADMIN,
    ADD_TEMPLATE_TO_EMAIL_FOR_ADMIN_SYSTEM,
    UPDATE_TEMPLATE_TO_EMAIL_ADMIN,
    DELETE_SCHEDULE_TEMPLATE_ADMIN,
    ADD_TEMPLATE_TO_EMAIL_FOR_ADMIN_COMPOSE,
    UPDATE_TEMPLATE_TO_EMAIL_ADMIN_COMPOSE,
    DELETE_SCHEDULE_TEMPLATE_ADMIN_COMPOSE,
  } = props;
  const [Tabsvalue, setTabsvalue] = useState(0);
  const classes = useStyles();
  const ChangeTabsvalue = (e, newvalue) => {
    setTabsvalue(newvalue);
    setEmailwriteEditor("content")
    
  };
  return (
    <>
      <div className={`${classes.CardStyle} card`}>
        <Tabs
          value={Tabsvalue}
          variant="scrollable"
          TabIndicatorProps={{
            style: { background: "#2796f3", height: "2px" },
          }}
          onChange={ChangeTabsvalue}
        >
          <Tab
            className={Tabsvalue === 0 ? classes.activeTab : ""}
            label={
              <div>
                <span>
                  <b>Compose</b>
                </span>
              </div>
            }
          />
          <Tab
            className={Tabsvalue === 1 ? classes.activeTab : ""}
            label={
              <div>
                <span>
                  <b>SYSTEM</b>
                </span>
              </div>
            }
          />
        </Tabs>
      </div>
      {Tabsvalue === 0 ? (
        <Emailsidbarandcontent
          ApicallforgetData={GET_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN}
          getlistofdataofapicall={getAllAdminCategoris}
          deletFolder={DELETE_COMPOSE_CATEGORY_EMAIL_FOR_ADMIN}
          deleteSubFolder={DELETE_COMPOSE_CATEGORY_FOLDER_EMAIL_FOR_ADMIN}
          Tabsvalue={Tabsvalue}
          createFolderApiCall={CREATE_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN}
          UpdatefolderApiCall={UPDATE_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN}
          crearesubfolderApiCall={
            CREATE_COMPOSE_CATEGORIES_FOLDER_EMAIL_FOR_ADMIN
          }
          updateSubfolderApiCall={
            UPDATE_COMPOSE_CATEGORIES_FOLDER_EMAIL_FOR_ADMIN
          }
          openEmailwriteEditor={openEmailwriteEditor}
          setEmailwriteEditor={setEmailwriteEditor}
          Addtemplate={ADD_TEMPLATE_TO_EMAIL_FOR_ADMIN_COMPOSE}
          updaTetetemplate={UPDATE_TEMPLATE_TO_EMAIL_ADMIN_COMPOSE}
          deletTemplate={DELETE_SCHEDULE_TEMPLATE_ADMIN_COMPOSE}
        />
      ) : (
        <Emailsidbarandcontent
          ApicallforgetData={GET_CATEGORIES_EMAIL_FOR_ADMIN}
          getlistofdataofapicall={getAllAdminCategoris}
          deletFolder={DELETE_CATEGORY_EMAIL_FOR_ADMIN}
          deleteSubFolder={DELETE_CATEGORY_FOLDER_EMAIL_FOR_ADMIN}
          Tabsvalue={Tabsvalue}
          createFolderApiCall={CREATE_CATEGORIES_EMAIL_FOR_ADMIN}
          UpdatefolderApiCall={UPDATE_CATEGORIES_EMAIL_FOR_ADMIN}
          crearesubfolderApiCall={CREATE_CATEGORIES_FOLDER_EMAIL_FOR_ADMIN}
          updateSubfolderApiCall={UPDATE_CATEGORIES_FOLDER_EMAIL_FOR_ADMIN}
          openEmailwriteEditor={openEmailwriteEditor}
          setEmailwriteEditor={setEmailwriteEditor}
          Addtemplate={ADD_TEMPLATE_TO_EMAIL_FOR_ADMIN_SYSTEM}
          updaTetetemplate={UPDATE_TEMPLATE_TO_EMAIL_ADMIN}
          deletTemplate={DELETE_SCHEDULE_TEMPLATE_ADMIN}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    getAllAdminCategoris: state.adminEmailsReducer.getAllAdminCategoris,
  };
};
export default connect(mapStateToProps, {
  GET_CATEGORIES_EMAIL_FOR_ADMIN,
  DELETE_CATEGORY_EMAIL_FOR_ADMIN,
  GET_NURTURING_CATEGORIES_EMAIL_FOR_ADMIN,
  DELETE_CATEGORY_FOLDER_EMAIL_FOR_ADMIN,
  GET_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN,
  CREATE_CATEGORIES_EMAIL_FOR_ADMIN,
  UPDATE_CATEGORIES_EMAIL_FOR_ADMIN,
  CREATE_CATEGORIES_FOLDER_EMAIL_FOR_ADMIN,
  UPDATE_CATEGORIES_FOLDER_EMAIL_FOR_ADMIN,
  CREATE_NURTURING_CATEGORIES_EMAIL_FOR_ADMIN,
  UPDATE_NURTURING_CATEGORIES_EMAIL_FOR_ADMIN,
  CREATE_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN,
  UPDATE_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN,
  CREATE_COMPOSE_CATEGORIES_FOLDER_EMAIL_FOR_ADMIN,
  UPDATE_COMPOSE_CATEGORIES_FOLDER_EMAIL_FOR_ADMIN,
  DELETE_COMPOSE_CATEGORY_FOLDER_EMAIL_FOR_ADMIN,
  DELETE_NURTURING_CATEGORY_EMAIL_FOR_ADMIN,
  DELETE_COMPOSE_CATEGORY_EMAIL_FOR_ADMIN,
  ADD_TEMPLATE_TO_EMAIL_FOR_ADMIN_SYSTEM,
  UPDATE_TEMPLATE_TO_EMAIL_ADMIN,
  DELETE_SCHEDULE_TEMPLATE_ADMIN,
  ADD_TEMPLATE_TO_EMAIL_FOR_ADMIN_COMPOSE,
  UPDATE_TEMPLATE_TO_EMAIL_ADMIN_COMPOSE,
  DELETE_SCHEDULE_TEMPLATE_ADMIN_COMPOSE,
})(EmailTabsmain);
