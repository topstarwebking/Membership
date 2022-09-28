import React, { useState } from "react";
import { Card } from "reactstrap";
import { makeStyles, Tooltip, Typography, IconButton } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import EditTemplate from "./editTemplateModal";
import { Copy, Trash } from "react-feather";
import ConfirmationModal from "../../../../../../../../../components/gloabal/confirmation";
import { REMOVE_TEMPLATE } from "../../../../../../../../../redux/actions/marketing/text";
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";
import BreadCrumbs from "../../../../../../../../../components/@vuexy/breadCrumbs/BreadCrumb";

const useStyles = makeStyles(() => ({
  styleListItem: {
    border: "solid 1px #e0e0e0",
    fontFamily: "Quicksand",
    paddingTop: "10px",
    borderRadius: 10,
    overflow: "hidden",
  },
}));

const TemplatesList = (props) => {
  const classes = useStyles();
  const { listoftemplates, mainFolderdata, subfolderdata } = props;
  const [sweatAlert, setsweatAlert] = useState(false);
  const [id, setId] = useState("");
  const [iscopy, setcopy] = useState("");
  const CopyPassWord = (item, index) => {
    window.navigator.clipboard.writeText(item?.text);
    setcopy(item?._id + index);
  };
  const handleAlert = (Id) => {
    setsweatAlert(true);
    setId(Id);
  };
  const HandleDelete = () => {
    props.REMOVE_TEMPLATE(id, props.subFolderId);
    setsweatAlert(false);
  };
  return (
    <div className="w-100">
      <BreadCrumbs
        breadCrumbParent={<span className="text-capitalize">{mainFolderdata?.folderName}</span>}
        breadCrumbParent2={<span className="text-capitalize">{subfolderdata?.subFolderName}</span>}
      />
      <div className="d-flex justify-content-end">
        {listoftemplates !== null && <EditTemplate data={props.data} />}
      </div>
      <br></br>
      <Grid container spacing={3}>
        {listoftemplates !== null &&
          listoftemplates.map((item, index) => (
            <Grid item xs={4} key={index}>
              <Card
                style={{
                  padding: "1rem",
                  width: "95%",
                  height: "86%",
                  marginLeft: 12,
                }}
              >
                <h4>
                  {item?.template_name}
                </h4>
                <CardContent className={classes.styleListItem}>
                  <Typography
                    style={{ color: "black", fontSize: "1rem" }}
                    component="p"
                  >
                    {item?.text}
                  </Typography>
                </CardContent>
                <div
                  style={{
                    justifyContent: "right",
                    alignItems: "center",
                    flex: 1,
                    display: "flex",
                    padding: 10,
                  }}
                >
                  <Tooltip title="Copy" aria-label="copy">
                    <IconButton
                      onClick={() => {
                        CopyPassWord(item, index);
                      }}
                      size="small"
                      className="rounded-circle"
                    >
                      {item?._id + index === iscopy ? (
                        <span>copied</span>
                      ) : (
                        <Copy size={16} />
                      )}
                    </IconButton>
                  </Tooltip>
                  {item?.adminId === undefined ? (
                    <EditTemplate item={item} />
                  ) : (
                    <HttpsOutlinedIcon
                      fontSize="small"
                      style={{ color: "#757575" }}
                    />
                  )}

                  <IconButton
                    size="small"
                    disabled={item?.adminId !== undefined}
                    className="rounded-circle"
                    onClick={() => {
                      handleAlert(item?._id);
                    }}
                  >
                    <Trash size={16} />
                  </IconButton>
                </div>
              </Card>
            </Grid>
          ))}
      </Grid>
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={sweatAlert}
        title="Delete Template?"
        onConfirm={HandleDelete}
        onCancel={() => {
          setsweatAlert(false);
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Delete"}
        description=" Are you sure you Delete it ?"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    listoftemplates: state.template.listoftemplates,
    subFolderId: state.template.subFolderId,
    rootFolderId: state.template.rootFolderId,
    mainFolderdata: state.template.mainFolderdata,
    subfolderdata: state.template.subfolderdata

  };
};
export default connect(mapStateToProps, { REMOVE_TEMPLATE })(TemplatesList);
