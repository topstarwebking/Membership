import React, { useEffect } from "react";
import moment from "moment";
import { connect } from "react-redux";
import "../../../../../../assets/scss/pages/app-chat.scss";
import "./ChatRoom.scss";

const ChatRoom = (props) => {
  const { messages, userinfo } = props;
  const currentUser = userinfo?.userinformation;


  useEffect(() => {
    scrollToBottom();
  });

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
      {messages?.map((chat, i) => {
        return (
          <div
            key={i}
            id={i === messages.length - 1 ? "last_message" : null}
            className={`chat ${currentUser?.email === chat?.email ? "chat-right" : "chat-left"}`}
          >
            <div className="chat-avatar">
              <div className="avatar m-0">
                {/* <Avatar
                  src={
                    chat.isSent
                      ? getLogedInUser()?.logo
                        ? getLogedInUser()?.logo
                        : "http://"
                      : activeStudent2sendtextChat?.memberprofileImage
                  }
                  alt={getLogedInUser()?.username}
                /> */}
              </div>
            </div>
            <div className="chat-body">
              <div style={{ maxWidth: "50%" }} className="chat-content">
                <p>{chat.message}</p>
              </div>
              <div className="chat-time">
                <p>{timeFormat(chat.timestamp)}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userinfo: state.userinfo,
});

export default connect(mapStateToProps)(ChatRoom);
