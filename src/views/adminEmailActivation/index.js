import React, { useEffect, useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  Chip,
  Collapse,
  List,
  ListItem,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import {
  GET_UN_VERIFIED_EMAILS,
  APPROVE_UN_VERIFIED_EMAIL,
} from "../../redux/actions/admin/emails";
import { connect } from "react-redux";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { Button } from "reactstrap";

const useStyles = makeStyles({
  unverify: {
    color: "#f1a92c",
    background: "#f7e6d7",
    fontWeight: "bold",
    borderRadius: "8px",
  },
  verify: {
    color: "#65b804",
    background: "#ddeccd",
    fontWeight: "bold",
    borderRadius: "8px",
  },
  verifybtn: {
    color: "#fff",
    background: "#65b804",
    fontWeight: "bold",
    borderRadius: "8px",
  },
});

const RowOfEmails = (props) => {
  const classes = useStyles();
  const { sendgridVerification, selectEmail, schoolId } = props;
  return (
    <Fragment>
      {sendgridVerification?.map((item, i) => {
        return (
          <TableRow key={i}>
            <TableCell component="th" scope="row">
              {item?.email}
            </TableCell>
            <TableCell style={{ textAlign: "center" }}>
              <Chip
                size="small"
                label={item?.isVerified ? "Verified" : "Unverified"}
                className={item?.isVerified ? classes.verify : classes.unverify}
              />
            </TableCell>
            <TableCell style={{ textAlign: "center" }}>
              <Chip
                disabled={item?.isVerified}
                size="small"
                onClick={() => {
                  selectEmail({ schoolId: schoolId, ...item });
                }}
                className={classes.verifybtn}
                label={"Verify"}
              />
            </TableCell>
          </TableRow>
        );
      })}
    </Fragment>
  );
};

const EmailActivation = (props) => {
  // const classes = useStyles()
  const {
    unverifiedEmails,
    GET_UN_VERIFIED_EMAILS,
    APPROVE_UN_VERIFIED_EMAIL,
  } = props;
  const [SweetAlertOpen, setSweetAlertOpen] = useState(false);
  const [activeCollapse, setActiveCollapse] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const confirmActivate = () => {
    setSweetAlertOpen(false);
    APPROVE_UN_VERIFIED_EMAIL(selectedEmail);
    // props.deleteAPI(email)
  };

  const manageSweetAlertOpen = () => {
    setSweetAlertOpen(!SweetAlertOpen);
  };
  const selectEmail = (item) => {
    setSweetAlertOpen(!SweetAlertOpen);
    setSelectedEmail(item);
  };

  const handleCollapse = (item) => {
    if (activeCollapse?.username === item?.username) {
      setActiveCollapse(null);
      return;
    }
    setActiveCollapse(item);
  };

  useEffect(() => {
    GET_UN_VERIFIED_EMAILS();
  }, [GET_UN_VERIFIED_EMAILS]);

  return (
    <div style={{ background: "#fff" }}>
      <List style={{ width: "100%" }}>
        {unverifiedEmails?.map((item, i) => {
          return (
            <ListItem
              onClick={() => {
                handleCollapse(item);
              }}
              className="d-flex justify-content-between align-items-center"
              button
              key={i}
            >
              <p className="p-1 text-capitalize">{item?.username}</p>
              {activeCollapse?.username === item?.username ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </ListItem>
          );
        })}
      </List>
      <div>
        <Collapse
          style={{
            borderRadius: "10px",
            background: "#f8f8f8",
            padding: "10px",
          }}
          in={activeCollapse !== null}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="right">
                    <span className="p-1">
                      <b>Email</b>
                    </span>
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <span className="p-1">
                      <b>Status</b>
                    </span>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <RowOfEmails
                  selectEmail={selectEmail}
                  schoolId={activeCollapse?._id}
                  sendgridVerification={activeCollapse?.sendgridVerification}
                />
              </TableBody>
            </Table>
          </TableContainer>
          <br />
        </Collapse>
      </div>
      <Dialog open={SweetAlertOpen} onClose={manageSweetAlertOpen}>
        <DialogContent>
          <DialogTitle>Yes, activate {selectedEmail?.email}</DialogTitle>
          <div className="d-flex justify-content-end">
            <Button.Ripple
              color="light"
              outline
              className="mr-1"
              onClick={manageSweetAlertOpen}
            >
              Cancel
            </Button.Ripple>
            <Button.Ripple onClick={confirmActivate} color="success">
              Activate
            </Button.Ripple>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    unverifiedEmails: state.adminEmailsReducer.unverifiedEmails,
  };
};

export default connect(mapStateToProps, {
  GET_UN_VERIFIED_EMAILS,
  APPROVE_UN_VERIFIED_EMAIL,
})(EmailActivation);
