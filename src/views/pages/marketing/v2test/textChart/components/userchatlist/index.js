import React, { useEffect, useState } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import UserAvatar from "../Avatar";
import TextAlert from "./TextAlert";
import { Typography } from "@material-ui/core";
import RowSkeleton from "../../../../../../dashboard1/components/RowSkeleton";
import { connect } from "react-redux";

import {
  ACTIVE_STUDENT_TO_SEND_TEXTCHAT_MSG,
  UserChatTextListIndex,
  TEXT_CHAT_ALERT,
  V2_SEEN_CONTACT_MESSAGES,
  V2_GET_TEXT_MESSAGES
} from "../../../../../../../redux/actions/marketing/V2TextChat";
import { SOCKET_EMIT_LEAVE_ROOM_SYSTEM_TYPE, SOCKET_EMIT_JOIN_ROOM_SYSTEM_TYPE } from "../../../../../../../redux/actions/socket.io";

const useStyles = makeStyles(() => ({
  userlist: {
    width: "355px",
    position: "relative",
    overflow: "auto",
    maxHeight: "50vh",
    height: "50vh",
  },
}));

const UserChatList = (props) => {
  const {
    contacts,
    TEXT_CHAT_ALERT,
    usersChatAlertList,
    V2_GET_TEXT_MESSAGES,
    loading,
    setLoading,
    chatTextListIndex,
    ACTIVE_STUDENT_TO_SEND_TEXTCHAT_MSG,
    UserChatTextListIndex,
    activeStudent2sendtextChat,
  } = props;
  const classes = useStyles();

  const UserChatActivity = async (event, Info, index) => {
    if (Object.keys(activeStudent2sendtextChat).length) {
      SOCKET_EMIT_LEAVE_ROOM_SYSTEM_TYPE(`${localStorage.getItem("user_id")}${activeStudent2sendtextChat.uid}`)
    }
    await SOCKET_EMIT_JOIN_ROOM_SYSTEM_TYPE(`${localStorage.getItem("user_id")}${Info.uid}`)
    await V2_GET_TEXT_MESSAGES([]);
    await UserChatTextListIndex(index);
    await ACTIVE_STUDENT_TO_SEND_TEXTCHAT_MSG(Info);
    debugger
    await TEXT_CHAT_ALERT(Object.assign({}, usersChatAlertList, { [Info.uid]: 0 }));
    await V2_SEEN_CONTACT_MESSAGES(Info.uid);
  };



  const GetLastMessageTime = (dt) => {
    dt = dt?.split(".")[0];
    let dtt = moment(dt).format("L");
    let dtt2 = moment().utc().format("L");
    let dtt3 = moment().utc().subtract(1, "day").format("L");
    let dtt4 = moment(dt).endOf("day").from(moment().utc());
    if (dtt === dtt2) {
      return moment(dt).format("hh:mm A");
    } else if (dtt === dtt3) {
      return "Yesterday";
    } else if (
      dtt4.includes("days ago") &&
      [...Array(7).keys()].includes(parseInt(dtt4.split(" ")[0]))
    ) {
      return moment(dt).format("dddd");
    } else {
      return dtt;
    }
  };

   useEffect(() => {
    setLoading(true)
     if (contacts.length) {
       let totalAlertSet = {};
       contacts.flatMap((el) => {
         let { _id } = el;
         totalAlertSet = Object.assign({}, totalAlertSet, { [_id]: 0 });
       });
       TEXT_CHAT_ALERT(Object.assign({}, totalAlertSet, usersChatAlertList));
     }
     setLoading(false)
   }, [contacts]);

  return (
    <div className={classes.userlist}>
      {
        loading ? (
          [1, 2, 3].map((i) => {
            return <RowSkeleton key={i} />;
          })
        ) : (
          <List style={{ width: "275px" }} dense>
            {contacts?.map((item, i) => {
              return (
                <ListItem
                  selected={chatTextListIndex === i}
                  button
                  onClick={(event) =>
                    UserChatActivity(
                      event,
                      {
                        firstName: item?.firstName,
                        lastName: item?.lastName,
                        uid: item?._id,
                        memberprofileImage: item?.memberprofileImage,
                      },
                      i
                    )
                  }
                  key={item?._id}
                >
                  <ListItemAvatar>
                    <UserAvatar
                      name={item?.firstName}
                      avatarPath={item?.memberprofileImage}
                    />
                  </ListItemAvatar>
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <Typography className="mb-0" variant="subtitle1">
                        {item.firstName} {item.lastName}
                      </Typography>
                      <Typography
                        key={i}
                        className="mb-0"
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        {item.textContent ? GetLastMessageTime(item?.time) : ""}
                      </Typography>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          width: "11rem",
                        }}
                      >
                        <Typography noWrap color="textSecondary" className={`mb-0`}>
                          {item?.textContent}
                        </Typography>
                      </div>
                      <TextAlert
                        alertCount={usersChatAlertList[item?._id]}
                      />
                    </div>
                  </div>
                </ListItem>
              );
            })}
          </List>
        )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    contacts: state.V2textChat?.contacts?.sort((a, b) => (a?.firstName > b?.firstName) ? 1
      :
      ((b?.firstName > a?.firstName) ? -1 : 0)),
    chatTextListIndex: state.V2textChat?.chatTextListIndex,
    getMessages: state.V2textChat?.getMessages,
    usersChatAlertList: state.V2textChat?.usersChatAlertList,
    activeStudent2sendtextChat: state.V2textChat?.activeStudent2sendtextChat,
  };
};
export default connect(mapStateToProps, {
  ACTIVE_STUDENT_TO_SEND_TEXTCHAT_MSG,
  UserChatTextListIndex,
  TEXT_CHAT_ALERT,
  V2_SEEN_CONTACT_MESSAGES,
  V2_GET_TEXT_MESSAGES,
  SOCKET_EMIT_JOIN_ROOM_SYSTEM_TYPE,
  SOCKET_EMIT_LEAVE_ROOM_SYSTEM_TYPE
})(UserChatList);
