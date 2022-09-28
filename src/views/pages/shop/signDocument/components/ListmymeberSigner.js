import React, { Fragment } from "react";
import { ListItem, makeStyles, Typography } from "@material-ui/core";
import { Type, Calendar, Mail, User } from "react-feather";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import SourceBox from "./Sourcebox";
import MainAdditionalSigner from "./addMMUSigner";
import { Input } from "reactstrap";
import { connect } from "react-redux";
import moment from "moment";

const useStyles = makeStyles(() => ({
  styleListItem: {
    marginTop: 4,
    borderLeft: "4px solid #2191fd",
    border: "1px solid #ececec",
    cursor: "pointer",
    background: "#f8f8f8",
    paddingLeft: "4px",
    paddingRight: "2px",
    display: "flex",
    justifyContent: "space-between",
  },
  Signature: {
    margin: "0 10px",
    height: "2rem",
    objectFit: "contain",
  },
  styletext: {
    border: "1px solid #b8c2cc",
    padding: "0px",
    borderRadius: "6px",
    paddingLeft: "8px",
  },
}));

const MymeberSigner = (props) => {
  const classes = useStyles();
  const {
    listOfMymemberSignerUser,
    handleChageValue,
    getSignatureValue,
    ipAddress,
  } = props;

  return (
    <Fragment>
      {listOfMymemberSignerUser?.map((user, index) => {
        return (
          <Fragment key={index}>
            <Typography
              className="mb-0 text-primary"
              style={{ marginTop: "4px" }}
            >
              User {index + 1}.
            </Typography>
            <ListItem className={classes.styleListItem}>
              <SourceBox
                type="sign"
                item={{
                  fullname: user?.fullname,
                  value: user?.fullname,
                  type: "text",
                  ipAddress,
                  signer: "owner",
                  email: user?.email,
                  component: <span>{user?.fullname}</span>,
                }}
              >
                <div className="d-flex justify-content-start align-items-center">
                  <DragIndicatorIcon />
                  <User size="16" className="ml-1 mr-1" />
                  <span>
                    <b> {user?.fullname}</b>
                  </span>
                </div>
              </SourceBox>
              <MainAdditionalSigner
                defaultFormvalue={user}
                color="#2191fd"
                buttonText="SAVE"
                id={index + 1}
                isEdit={true}
                title="Edit Mymember user"
                getSignatureValue={getSignatureValue}
                handleChageValue={handleChageValue}
              />
            </ListItem>
            <ListItem className={classes.styleListItem}>
              <SourceBox
                type="sign"
                item={{
                  fullname: user?.fullname,
                  value: user?.signature,
                  type: "sign",
                  ipAddress,
                  signer: "owner",
                  email: user?.email,
                  component:
                    user?.signature === undefined ? (
                      <span className="col-4 text-truncate defaultSignature">
                        {user?.fullname?.length > 3
                          ? user?.fullname?.slice(0, 3) + ". . ."
                          : user?.fullname}
                      </span>
                    ) : (
                      <img
                        className={classes.Signature}
                        src={user?.signature}
                        alt={`${user?.fullname}`}
                      />
                    ),
                }}
              >
                <div className="d-flex align-items-center">
                  <DragIndicatorIcon />
                  {user?.signature === undefined ? (
                    <span className="defaultSignature col-4 text-truncate">
                      {user?.fullname?.length > 3
                        ? user?.fullname?.slice(0, 3) + ". . ."
                        : user?.fullname}
                    </span>
                  ) : (
                    <img
                      className={classes.Signature}
                      src={user?.signature}
                      alt={`${user?.fullname}`}
                    />
                  )}
                </div>
              </SourceBox>
              <MainAdditionalSigner
                color="#2191fd"
                buttonText={"SAVE"}
                defaultFormvalue={user}
                id={index + 1}
                isEdit={true}
                title="Edit Mymember user"
                getSignatureValue={getSignatureValue}
                handleChageValue={handleChageValue}
              />
            </ListItem>

            <ListItem className={classes.styleListItem}>
              <SourceBox
                type="sign"
                item={{
                  fullname: user?.fullname,
                  value: user?.email,
                  type: "text",
                  ipAddress,
                  signer: "owner",
                  email: user?.email,
                  component: <span> {user?.email}</span>,
                }}
              >
                <div className="d-flex justify-content-start align-items-center">
                  <DragIndicatorIcon />
                  <Mail size="16" className="ml-1 mr-1" />
                  <span>{user?.email}</span>
                </div>
              </SourceBox>
              <MainAdditionalSigner
                color="#2191fd"
                buttonText="SAVE"
                defaultFormvalue={user}
                title="Edit Mymember user"
                id={index + 1}
                isEdit={true}
                getSignatureValue={getSignatureValue}
                handleChageValue={handleChageValue}
              />
            </ListItem>
            <ListItem className={classes.styleListItem}>
              <SourceBox
                type="sign"
                item={{
                  fullname: user?.fullname,
                  value: "",
                  type: "field",
                  ipAddress,
                  signer: "owner",
                  email: user?.email,
                  component: <Input placeholder="Text field" />,
                }}
              >
                <div
                  className={`d-flex justify-content-between align-items-center`}
                >
                  <div className="d-flex justify-content-start align-items-center">
                    <DragIndicatorIcon />
                    <Type size="16" className="ml-1 mr-1" />
                    <span>Text Field</span>
                  </div>
                </div>
              </SourceBox>
            </ListItem>
            <ListItem className={classes.styleListItem}>
              <SourceBox
                type="sign"
                item={{
                  fullname: user?.fullname,
                  value: moment(new Date()).format("MM/DD/YYYY"),
                  type: "date",
                  ipAddress,
                  signer: "owner",
                  email: user?.email,
                  component: (
                    <div>{moment(new Date()).format("MM/DD/YYYY")}</div>
                  ),
                }}
              >
                <div className="d-flex justify-content-start align-items-center">
                  <DragIndicatorIcon />
                  <Calendar size={"16"} className="ml-1 mr-1" />
                  <span>{moment(new Date()).format("MM/DD/YYYY")}</span>
                </div>
              </SourceBox>
            </ListItem>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    listOfMymemberSignerUser: state.docuSignReducer.listOfMymemberSignerUser,
  };
};

export default connect(mapStateToProps, {})(MymeberSigner);
