import React, { useEffect, useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import './ChatRoom.scss'
import {
    SOCKET_CONNECTER_IO,
    SOCKET_GET_MEMBER_CHAT,
    SOCKET_EMIT_JOIN_ROOM_SYSTEM_TYPE
} from "../../../../../redux/actions/socket.io";
import { V2_GET_TEXT_MESSAGES } from "../../../../../redux/actions/marketing/V2TextChat";
import { Alert } from "@material-ui/lab";

const getUserId = () => {
    return localStorage.getItem("user_id");
};
const userinfo = JSON.parse(localStorage.getItem("userdata"))
const Quickchatroom = (props) => {
    const chatContainer = React.createRef(null);
    const [data, setdata] = useState([])
    const {
        getMessages,
        student,
        V2_GET_TEXT_MESSAGES,
    } = props

    const currentUser = userinfo?.data
    let scrollToBottom = () => {
        const scroll =
            chatContainer.current.scrollHeight -
            chatContainer.current.clientHeight;
        chatContainer.current.scrollTo(0, scroll);

    };
    let timeFormat = (time) => {
        let dt = time?.split(".")[0];
        return moment(dt).format("LT");
    }
    useEffect(() => {
        scrollToBottom();
    });
    const callSoket = async () => {
        try {
            await SOCKET_EMIT_JOIN_ROOM_SYSTEM_TYPE(getUserId())
            await SOCKET_GET_MEMBER_CHAT({ uid: student?._id, userId: getUserId() })
            await SOCKET_CONNECTER_IO().on("memberTextList", (data) => {
                V2_GET_TEXT_MESSAGES(data)
                setdata(data)
            });
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        callSoket()
    }, [])

    return (
        <div className="chats"
            ref={chatContainer}
            style={{
                height: "40vh", overflowY: "scroll",
                overflowX: "hidden", width: "50vh"
            }}
        >
            <Alert severity="info" className="m-1 w-100 d-flex justify-content-center">we secure your conversation with end-to-end encryption</Alert>
            {data?.map((chat, i) => {
                return (
                    <div
                        key={i}
                        id={i === getMessages.length - 1 ? "last_message" : null}
                        className={`chat ${chat?.isSent ? "chat-right" : "chat-left"}`}

                        id={i === data.length - 1 ? "last_message" : null}
                        className={`chat ${chat.isSent ? "chat-right" : "chat-left"}`}>
                        <div className="chat-body">
                            <div style={{ maxWidth: "50%" }} className="chat-content">
                                <p>{chat.textContent}</p>
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
    getMessages: state.V2textChat?.getMessages,

});

export default connect(
    mapStateToProps, {
    V2_GET_TEXT_MESSAGES,

})(Quickchatroom);

