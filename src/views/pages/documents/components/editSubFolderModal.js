import NewCategory from "./editSubFolder";
import { GET_DOCUMENT_FOLDER_LIST } from "../../../../redux/actions/document/document";
import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(true);
  const [state, setState] = React.useState({
    modal: false,
    hover: false,
  });
  const toggleModal = () => {
    setState({
      ...state,
      modal: !state.modal,
    });
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    props.GET_DOCUMENT_FOLDER_LIST();
  }, []);

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit Sub Folder
        </DialogTitle>
        <DialogContent>
          <NewCategory
            toggle={toggleModal}
            mainFolder={props.mainFolder}
            subFolder={props.subFolder}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    documentFolderList: state.documentFolderList,
  };
};
export default connect(mapStateToProps, { GET_DOCUMENT_FOLDER_LIST })(
  CustomizedDialogs
);
