import React, { useEffect, useState } from "react";
import PorfileAvatar from "./components/Profile";
import ChatRoomHeader from "./components/chatroomHeader";
import UserChatList from "./components/userchatlist";
import { Card, CardContent } from "@material-ui/core";
import ChatRoom from "./components/chartroom";
import MessageInput from "./components/MessageServes";
import { connect } from "react-redux";
import { useMediaQuery } from "@material-ui/core";
import { GET_MEMBER_CONTACTS_DETAILS } from "../../../../../redux/actions/marketing/V2TextChat";
import msg_img from "../../../../../assets/img/messages/unselect_msg.png"


const LayoutInfo = (props) => {
  const { GET_MEMBER_CONTACTS_DETAILS, contacts, chatTextListIndex } = props;
  const isMobileView = useMediaQuery("(max-width:640px)");
  const [studentType, setStudentType] = useState("")
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    (async () => {
     await setLoading(true)
     await GET_MEMBER_CONTACTS_DETAILS(studentType)
     await setLoading(false)
    })();
}, [studentType])

  const handleEventType = async (e) => {
    let { value } = e.target
    await setLoading(true)
    await setStudentType(value);
    await setLoading(false)
  };

  return (
    <div className="w-100">
      {isMobileView ? (
        <Card className="shadow-sm w-100">
          {chatTextListIndex ? (
            <div className="w-100">
              <ChatRoomHeader />
              <Card className="rounded-0 shadow-sm">
                <CardContent>
                  <div
                    style={{
                      position: "relative",
                      overflow: "auto",
                      height: "50vh",
                    }}
                  >
                    <ChatRoom />
                  </div>
                  <MessageInput />
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="w-100">
              <PorfileAvatar
                getDataBack={GET_MEMBER_CONTACTS_DETAILS}
                loading={loading}
                setLoading={setLoading}
                studentType={studentType}
                handleEventType={handleEventType}
              />
              <UserChatList
              loading={loading}
              setLoading={setLoading}
                studentType={studentType}
              />
            </div>
          )}
        </Card>
      ) : (
        <div className="w-100" style={{ display: "flex", flex: 1 }}>
          <Card className="shadow-sm">
            <PorfileAvatar
              getDataBack={GET_MEMBER_CONTACTS_DETAILS}
              loading={loading}
              setLoading={setLoading}
              studentType={studentType}
              handleEventType={handleEventType}
            />
            <UserChatList
            loading={loading}
            setLoading={setLoading}
              studentType={studentType}
            />
          </Card>
          {chatTextListIndex === null ? (
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
              <ChatRoomHeader />
              <Card className="rounded-0 shadow-sm">
                <CardContent>
                  <div
                    style={{
                      position: "relative",
                      overflow: "auto",
                      height: "50vh",
                    }}
                  >
                    <ChatRoom />
                  </div>
                  <MessageInput />
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
    TextChatUserList: state.V2textChat.TextChatUserList,
    contacts: state.V2textChat?.contacts,
    chatTextListIndex: state.V2textChat?.chatTextListIndex,
  };
};

export default connect(mapStateToProps, {
  GET_MEMBER_CONTACTS_DETAILS
})(LayoutInfo);
