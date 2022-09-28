import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import MenuIcon from "@material-ui/icons/Menu";
import { Drawer, useMediaQuery } from "@material-ui/core";
import { CardContent, Card, IconButton } from "@material-ui/core";
import DocumentsListing from "./documentsList";
import DocumentSidebar from "./documentsSidebar";
import {
  GET_DOCUMENT_FOLDER_LIST,
  SET_FOLDER_ID,
  REMOVE_FOLDER,
  REMOVE_SUB_FOLDER,
} from "../../../../redux/actions/document/document";

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
}));

const Documents = (props) => {
  const { userinformation, documentFolderList, GET_DOCUMENT_FOLDER_LIST } =
    props;
  const classes = useStyles();
  const [activeMainFolder, setActiveMainFolder] = useState(null);
  const [activeSubMainFolder, setActiveSubMainFolder] = useState(null);
  const [FolderMenuOpen, setFolderMenuOpen] = useState(false);
  const IsSmallDevise = useMediaQuery("(max-width:1224px)");
  const [listOfDocument, setListOfDocument] = useState(null);
  useEffect(() => {
    GET_DOCUMENT_FOLDER_LIST();
  }, [GET_DOCUMENT_FOLDER_LIST]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchdata = async () => {
    console.log("fetchdata",activeSubMainFolder,activeMainFolder)
    if (activeSubMainFolder) {
      let findActiveMainFolder =await documentFolderList?.filter(
        (item) => item?._id === activeMainFolder?._id
      );
      let findActiveSubFolder = await findActiveMainFolder[0]?.subFolder?.filter(
        (item) => item?._id === activeSubMainFolder?._id
      );
      if (findActiveSubFolder?.length > 0) {
        await setListOfDocument(findActiveSubFolder[0]?.document);
      }
    } else if (activeMainFolder) {
      let findActiveMainFolder =await documentFolderList?.filter(
        (item) => item?._id === activeMainFolder?._id
      );
      if (findActiveMainFolder?.length) {
        await setListOfDocument(findActiveMainFolder[0]?.document);
      }
    }
  };

  useEffect(() => {
    fetchdata();
  }, [
    fetchdata,
    documentFolderList,
    listOfDocument,
    activeMainFolder,
    activeSubMainFolder,
  ]);
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Documents"
        breadCrumbParent="Pages"
        breadCrumbActive="Documents"
      />
      <Card className={classes.CardStyle}>
        <CardContent style={{ width: "100%" }} className="p-0">
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-start">
                {IsSmallDevise && (
                  <IconButton
                    onClick={() => {
                      setFolderMenuOpen(!FolderMenuOpen);
                    }}
                    className="rounded-circle"
                  >
                    <MenuIcon />
                  </IconButton>
                )}
              </div>
            </div>
            <div style={{ display: "flex", flex: 1 }}>
              <Fragment>
                {IsSmallDevise ? (
                  <Drawer
                    onClose={() => {
                      setFolderMenuOpen(!FolderMenuOpen);
                    }}
                    open={FolderMenuOpen}
                  >
                    <DocumentSidebar
                      documentFolderList={documentFolderList}
                      setActiveMainFolder={setActiveMainFolder}
                      activeMainFolder={activeMainFolder}
                      activeSubMainFolder={activeSubMainFolder}
                      setActiveSubMainFolder={setActiveSubMainFolder}
                      userinformation={userinformation}
                    />
                  </Drawer>
                ) : (
                  <div className="d-flex flex-column  align-items-center">
                    <DocumentSidebar
                      documentFolderList={documentFolderList}
                      setActiveMainFolder={setActiveMainFolder}
                      activeSubMainFolder={activeSubMainFolder}
                      setActiveSubMainFolder={setActiveSubMainFolder}
                      activeMainFolder={activeMainFolder}
                      userinformation={userinformation}
                    />
                  </div>
                )}
              </Fragment>
              <DocumentsListing
                documentFolderList={documentFolderList}
                listOfDocument={listOfDocument}
                activeSubMainFolder={activeSubMainFolder}
                data={props?.data}
                isrecommendedOrregistered={props.isrecommendedOrregistered}
                isDelete={props.isDelete}
                userinformation={userinformation}
                activeMainFolder={activeMainFolder}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    documentFolderList: state.document.documentFolderList,
    userinformation: state.userinfo.userinformation,
  };
};
export default connect(mapStateToProps, {
  GET_DOCUMENT_FOLDER_LIST,
  SET_FOLDER_ID,
  REMOVE_FOLDER,
  REMOVE_SUB_FOLDER,
})(Documents);
