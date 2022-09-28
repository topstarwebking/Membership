import React, { useState } from "react";
import { Card } from "reactstrap";
import { makeStyles, Tooltip, Typography, IconButton } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { Copy, Trash } from "react-feather";
import ConfirmationModal from "../../../components/gloabal/confirmation";
import EditTemplateModal from "./components/template/editTemplateModal";
import { REMOVE_TEMPLATE_FOR_ADMIN } from "../../../redux/actions/admin/Text";

const useStyles = makeStyles(() => ({
  styleListItem: {
    border: "solid 1px #00a6e1",
    fontFamily: "Quicksand",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    overflow: "hidden",
  },
}));

const TemplatesList = (props) => {
  const classes = useStyles();
  const { templateSubFolderListForAdmin } = props;
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
    props.REMOVE_TEMPLATE_FOR_ADMIN(id, props.subFolderId);
    setsweatAlert(false);
  };
  return (
    <div className="w-100">
      <div className="d-flex justify-content-end">
        {templateSubFolderListForAdmin !== null && (
          <EditTemplateModal data={props.data} />
        )}
      </div>
      <br></br>
      <Grid container spacing={3}>
        {templateSubFolderListForAdmin !== null &&
          templateSubFolderListForAdmin.map((item, index) => (
            <Grid item xs={4} key={index}>
              <Card
                style={{
                  padding: "1rem",
                  width: "95%",
                  height: "86%",
                  marginLeft: 12,
                }}
              >
                <h5>{item?.template_name}</h5>
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
                  <EditTemplateModal item={item} />
                  <Tooltip title="Delete" aria-label="delete">
                    <IconButton
                      size="small"
                      className="rounded-circle"
                      onClick={() => {
                        handleAlert(item?._id);
                      }}
                    >
                      <Trash size={16} />
                    </IconButton>
                  </Tooltip>
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
    templateSubFolderListForAdmin:
      state.templateReducerAdmin?.templateSubFolderListForAdmin,
    subFolderId: state.template.subFolderId,
    rootFolderId: state.template.rootFolderId,
  };
};
export default connect(mapStateToProps, {
  REMOVE_TEMPLATE_FOR_ADMIN,
})(TemplatesList);
