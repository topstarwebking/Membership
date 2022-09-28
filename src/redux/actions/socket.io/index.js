import io from "socket.io-client";
export const socketIo = io(process.env.REACT_APP_BASE_URL, {
  transports: ["websocket"],
  secure: true,
});
socketIo.connect();

socketIo.on("connect", () => {
  console.log("connected to socket server");
});

socketIo.on("connect_error", (err) => {
  console.log(`connect_error due to - ${err.message}`);
});

export const getUserId = () => {
  return localStorage.getItem("user_id");
};

export const SOCKET_CONNECTER_IO = () => {
  // alert("My Name is ajay")
  return socketIo;
};

export const SOCKET_DISCONNECT_ORDER_INFO = () => {
  socketIo.offAny();
};

// **** Text Chat ****
export const SOCKET_GET_MEMBER_CHAT = (Info) => {
  socketIo.emit("memberText", Info);
};

export const SOCKET_EMIT_JOIN_ROOM_SYSTEM_TYPE = (room_type) => {
  socketIo.emit("joinTextChatRoom", room_type);
  return
};

export const SOCKET_EMIT_LEAVE_ROOM_SYSTEM_TYPE = (room_type) => {
  socketIo.emit("leaveTextChatRoom", room_type);
}

export const SOCKET_EMIT_TEXT_USER_ALERT = (room_type) => {
  socketIo.emit("textAlert", room_type);
};

export const SOCKET_GET_TEXT_MESSAGES = (Info) => {
  socketIo.emit("alertGetTexts", Info);
};

export const SOCKET_GET_CHATBOT_USERS = (body) => {
  socketIo.emit("getChatbotUsers", body);
}

export const SOCKET_GET_CHATBOT_CHATS = (roomId) => {
  socketIo.emit("getRoomChats", roomId);
}

export const SOCKET_SEND_CHATBOT_MESSAGE = (info) => {
  socketIo.emit("message", info);
}
export const SOCKET_GET_NOTIFICATION_DATA = (userId) => {
  socketIo.emit("push-notification", userId);
}

// **** School Location ****

export const SOCKET_SCHOOL_LOCATION_UPDATE = (Info, userId) => {
  socketIo.emit("locationUpdate", { userId: userId, access_location_list: Info });
};

// socketIo.close()
