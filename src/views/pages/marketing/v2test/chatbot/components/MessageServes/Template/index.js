import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { connect } from "react-redux";
import Slide from "@material-ui/core/Slide";
import { ReorderOutlined } from "@material-ui/icons";
import { IconButton, } from "@material-ui/core";
import { GET_TEMPLATE_FOLDER_LIST } from "../../../../../../../../redux/actions/marketing/text";
import TextTemplateSidebar from "./Sidebar/index";
import TextTemplateListing from "./TamplateListing/TextTemplateListing";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(() => ({

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

const TextTemplate = (props) => {
  const { templateFolderList, GET_TEMPLATE_FOLDER_LIST } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  useEffect(() => {
    GET_TEMPLATE_FOLDER_LIST();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        onClick={handleClickOpen}
        size="small"
        className="rounded-circle text-primary"
      >
        <ReorderOutlined />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth 
        maxWidth="lg"
      >
        <DialogContent>
          <div className="d-flex w-100">
            <TextTemplateSidebar data={templateFolderList} />
            <TextTemplateListing data={templateFolderList} />
          </div>

        </DialogContent>
      </Dialog>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    templateFolderList: state.template.templateFolderList,
  };
};

export default connect(mapStateToProps, { GET_TEMPLATE_FOLDER_LIST })(
  TextTemplate
);
