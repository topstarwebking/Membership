import { Avatar } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  TEXT_CHAT_ALERT,
} from "../../../../../../../redux/actions/marketing/V2TextChat";
import {
  SOCKET_GET_TEXT_MESSAGES,
  getUserId,
} from "../../../../../../../redux/actions/socket.io";
import { Alert } from "reactstrap";

const ChatRoom = (props) => {
  const { getMessages, activeStudent2sendtextChat } = props;
  {console.log(getMessages, activeStudent2sendtextChat, "activeStudent2sendtextChat")}


  useEffect(() => {
    if (Object.keys(activeStudent2sendtextChat).length) {
      let { uid } = activeStudent2sendtextChat;
      let getSocketFormat = { uid, userId: getUserId() };
      SOCKET_GET_TEXT_MESSAGES(getSocketFormat);
    }
  }, [activeStudent2sendtextChat]);

  useEffect(() => {
    scrollToBottom();
  });

  const getLogedInUser = () => {
    return JSON.parse(localStorage.getItem("userdata"))?.data;
  };

  let scrollToBottom = () => {
    const section = document.querySelector("#last_message");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  let timeFormat = (time) => {
    let dt = time.split(".")[0];
    return moment(dt).format("LT");
  }

  return (
    <div className="chats" style={{ paddingBottom: "10vh" }}>
      {getMessages?.map((chat, i) => {
        return (
          <div
            key={i}
            id={i === getMessages.length - 1 ? "last_message" : null}
            className={`chat ${chat.isSent ? "chat-right" : "chat-left"}`}
          >
            <div className="chat-avatar">
              <div className="avatar m-0">
                <Avatar
                  src={
                    chat.isSent
                      ? getLogedInUser()?.logo
                        ? getLogedInUser()?.logo
                        : "http://"
                      : activeStudent2sendtextChat?.memberprofileImage
                  }
                  alt={getLogedInUser()?.username}
                />
              </div>
            </div>
            <div className="chat-body">
              <div style={{ maxWidth: "50%" }} className="chat-content">
                <p>{chat.textContent}</p>
              </div>
              <div className="chat-time">
                <p>{timeFormat(chat.time)}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    getMessages: state.V2textChat?.getMessages,
    activeStudent2sendtextChat: state.V2textChat?.activeStudent2sendtextChat,
  };
};

export default connect(mapStateToProps, {
  TEXT_CHAT_ALERT,
})(ChatRoom);
