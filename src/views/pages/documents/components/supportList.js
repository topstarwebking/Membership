import { Card, Grid, CardContent, Button } from "@material-ui/core";
import React, { useState, Fragment } from "react";
import {
  CREATE_TUTORIALS,
  EDIT_DOCUMENT,
  REMOVE_TUTORIAL,
  UPLOAD_DOCUMENT_IN_FOLDER,
  REMOVE_DOCUMENT_IN_FOLDER,
} from "../../../../redux/actions/document/document";
import MainSupportTicket from "../../../../../src/views/pages/navsupport/mainSupportTicket";

import { connect } from "react-redux";
import CreateTutorial from "./createTutorialModal";
import EditDeletDoc from "./EditDeletDoc";
import LinearProgress from "@material-ui/core/LinearProgress";
import Content from "./Content";
import ConfirmationModal from "../../../../components/gloabal/confirmation";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import AddfileTofolder from "./AddfileTofolder";
import EditAnddeletFolderDoc from "./EditAndDeleteFolderTut";

const DocumentsList = (props) => {
  const {
    REMOVE_TUTORIAL,
    listOfDocument,
    userinformation,
    activeMainFolder,
    activeSubMainFolder,
    tutorialFolderList,
  } = props;
  const [sweetAlertOpen, setSweetAlertOpen] = useState(false);
  const [progress, setProgress] = React.useState(false);
  const [id, setId] = useState("");
  const [type, setType] = useState("");

  const handlesweatalert = (item, type) => {
    setSweetAlertOpen(true);
    setId(item?._id);
    setType(type);
  };
  const handleDeleteDocument = () => {
    if (type === "subfolder") {
      REMOVE_TUTORIAL(id);
      setSweetAlertOpen(false);
    } else {
      props.REMOVE_DOCUMENT_IN_FOLDER(id);
      setSweetAlertOpen(false);
    }
  };
  return (
    <div style={{ width: "100%" }} className="m-1">
      <div className="d-flex justify-content-between w-100">
        {activeMainFolder !== null ? (
          <div className="w-100">
            <div className="row breadcrumbs-top p-0">
              <div className="col-12">
                <Breadcrumb tag="ol" className="p-0">
                  <BreadcrumbItem tag="li">
                    <span className="text-capitalize">
                      {activeMainFolder?.folderName}
                    </span>
                  </BreadcrumbItem>
                  <BreadcrumbItem tag="li">
                    <span className="text-capitalize">
                      {activeSubMainFolder?.subfolderName}
                    </span>
                  </BreadcrumbItem>
                </Breadcrumb>
              </div>
            </div>
          </div>
        ) : null}
        {activeSubMainFolder?.tutorial?.length >= 0 ? (
          <div className="d-flex justify-content-end w-100 p-0">
            <CreateTutorial
              userinformation={userinformation}
              activeSubMainFolder={activeSubMainFolder}
              activeMainFolder={activeMainFolder}
              CREATE_TUTORIALS={props.CREATE_TUTORIALS}
            />
          </div>
        ) : activeSubMainFolder?.adminId !== undefined ? null : (
          <div className="w-100 p-0">
            {activeSubMainFolder?.tutorial?.length >= 0 ? (
              <div className="d-flex justify-content-end p-0">
                <>
                  <CreateTutorial
                    activeSubMainFolder={activeSubMainFolder}
                    activeMainFolder={activeMainFolder}
                    CREATE_TUTORIALS={props.CREATE_TUTORIALS}
                  />
                </>
              </div>
            ) : activeMainFolder?.tutorial?.length >= 0 ? (
              <div className="w-100 p-0">
                <div className="d-flex justify-content-end p-0">
                  <>
                    <AddfileTofolder
                      tutorialFolderList={tutorialFolderList}
                      activeSubMainFolder={activeSubMainFolder}
                      activeMainFolder={activeMainFolder}
                      UPLOAD_DOCUMENT_IN_FOLDER={
                        props.UPLOAD_DOCUMENT_IN_FOLDER
                      }
                    />
                  </>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
      <Grid container spacing={2} className="p-0 m-0">
        {activeMainFolder === null ? (
          <div className="w-100">
            <MainSupportTicket />
          </div>
        ) : listOfDocument !== null && listOfDocument?.length > 0 ? (
          listOfDocument?.map((items, i) => {
            return (
              <Grid item sm={6} md={3} lg={3} key={i} className="pt-1">
                <Card
                  style={{ width: "100%", height: "100%" }}
                  className="rounded"
                >
                  <CardContent style={{ padding: "8px" }}>
                    <div className="d-flex justify-content-between w-100">
                      <div></div>
                      <div className="d-flex justify-content-between">
                        {activeSubMainFolder === null ? (
                          <EditAnddeletFolderDoc
                            setProgress={setProgress}
                            OpenAlert={handlesweatalert}
                            item={items}
                            tutorialFolderList={tutorialFolderList}
                            userinformation={userinformation}
                            activeFolder={props.listOfDocument}
                            EDIT_DOCUMENT={props.EDIT_DOCUMENT}
                            activeSubMainFolder={activeSubMainFolder}
                            activeMainFolder={activeMainFolder}
                            data={props?.data}
                            isrecommendedOrregistered={
                              props.isrecommendedOrregistered
                            }
                            isDelete={props.isDelete}
                          />
                        ) : (
                          <EditDeletDoc
                            setProgress={setProgress}
                            OpenAlert={handlesweatalert}
                            item={items}
                            userinformation={userinformation}
                            activeFolder={props.listOfDocument}
                            EDIT_DOCUMENT={props.EDIT_DOCUMENT}
                            activeSubMainFolder={activeSubMainFolder}
                            activeMainFolder={activeMainFolder}
                            data={props?.data}
                            isrecommendedOrregistered={
                              props.isrecommendedOrregistered
                            }
                            isDelete={props.isDelete}
                          />
                        )}
                      </div>
                    </div>
                    <div lg={12} md={4}>
                      <Content
                        hedding={items?.title}
                        content={items?.description}
                        link={items?.url}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        ) : (
          <div className="d-flex justify-content-center flex-column w-100">
            <img
              src={"/images/no-doc-in-file.png"}
              alt="nodata"
              style={{ height: "400px", objectFit: "contain" }}
            />
            <div className="d-flex justify-content-center">
              <h3>No Document Found</h3>
            </div>
          </div>
        )}
      </Grid>
      <br />
      {progress && <LinearProgress color="secondary" />}
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={sweetAlertOpen}
        title="Delete file ?"
        onConfirm={handleDeleteDocument}
        onCancel={() => {
          setSweetAlertOpen(false);
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Delete"}
        description=" Are you sure you save it ?"
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    ...state.tutorial,
  };
};

export default connect(mapStateToProps, {
  CREATE_TUTORIALS,
  UPLOAD_DOCUMENT_IN_FOLDER,
  REMOVE_TUTORIAL,
  EDIT_DOCUMENT,
  REMOVE_DOCUMENT_IN_FOLDER,
})(DocumentsList);
