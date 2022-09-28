import React, { useState } from "react";
// import PorfileAvatar from "./components/Profile";
import "../../../../../assets/scss/pages/app-chat.scss";
import ChatRoomHeader from "./components/ChatRoomHeader";
import UserChatList from "./components/UserChatList";
import { Card, CardContent } from "@material-ui/core";
import ChatRoom from "./components/ChatRoom";
import MessageInput from "./components/MessageServes";
import { connect } from "react-redux";
import { useMediaQuery } from "@material-ui/core";
import msg_img from "../../../../../assets/img/messages/unselect_msg.png"


const LayoutInfo = (props) => {
  const {
    selectedChatUser,
    chatTextListIndex,
    messages,
    handleClickUser,
    handleChange,
    handleAddMessage,
    message,
  } = props;
  
  const isMobileView = useMediaQuery("(max-width:640px)");
  return (
    <div className="w-100">
      {isMobileView ? (
        <Card className="shadow-sm w-100">
          {messages?.length ? (
            <div className="w-100">
              <ChatRoomHeader user={selectedChatUser} />
              <Card className="rounded-0 shadow-sm">
                <CardContent>
                  <div
                    style={{
                      position: "relative",
                      overflow: "auto",
                      height: "50vh",
                    }}
                  >
                    <ChatRoom messages={messages} />
                  </div>
                  {selectedChatUser?.email && (
                    <MessageInput
                      handleChange={handleChange}
                      handleAddMessage={handleAddMessage}
                      message={message}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="w-100">
              {/* <PorfileAvatar /> */}
              <UserChatList />
            </div>
          )}
        </Card>
      ) : (
        <div className="w-100" style={{ display: "flex", flex: 1 }}>
          <Card className="shadow-sm" style={{ borderRight: '1px solid lightgray' }}>
            {/* <PorfileAvatar /> */}
            <UserChatList
              selectedChatUser={selectedChatUser}
              chatbotUsers={props.chatbotUsers}
              handleClickUser={handleClickUser}
            />
          </Card>
          {messages?.length === null ? (
            <div className="w-100">
              <Card
                style={{ backgroundColor: "#FAFBFF" }}
                className="rounded-0 shadow-sm"
              >
                <CardContent>
                  <div
                    style={{
                      position: "relative",
                      overflow: "auto",
                      height: "60vh",
                      justifyContent: "center",
                      display: "flex",
                    }}
                    className="w-100"
                  >
                    <img src={msg_img} alt="logo" className="mr-1" />
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="w-100">
              <ChatRoomHeader user={selectedChatUser} />

              <Card className="rounded-0 shadow-sm">
                <CardContent>
                  <div
                    className="w-100"
                    style={{
                      position: "relative",
                      overflow: "auto",
                      height: "60vh",
                      display: "flex",
                      justifyContent: "center",
                      backgroundColor: "#FAFBFF"
                    }}
                  >
                    {messages?.length ? <ChatRoom messages={messages} /> : <img src={msg_img} alt="logo" className="mr-1" />}
                  </div>
                  {selectedChatUser?.email && (
                    <MessageInput
                      handleChange={handleChange}
                      handleAddMessage={handleAddMessage}
                      message={message}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    chatTextListIndex: state.V2textChat?.chatTextListIndex,
  };
};

export default connect(mapStateToProps, null)(LayoutInfo);
