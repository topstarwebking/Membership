const initState = {
  TextChatUserList: [],
  contacts: [],
  getMessages: [],
  activeStudent2sendtextChat: {},
  chatTextListIndex: null,
  usersChatAlertList: {},
  SocketInfo: null,
  getNotificationData: {},
};
// isMembershipPaymentDone
export const V2textChatReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_TEXT_USER_CHAT_LIST":
      return { ...state, TextChatUserList: action.payload };
    case "GET_MEMBER_CONTACTS_DETAILS":
      return { ...state, contacts: action.payload };
    case "V2_GET_TEXT_MESSAGES":
      return { ...state, getMessages: action.payload };
    case 'ACTIVE_STUDENT_TO_SEND_TEXTCHAT_MSG':
      return { ...state, activeStudent2sendtextChat: action.payload };
    case 'UserChatTextListIndex':
      return { ...state, chatTextListIndex: action.payload };
    case 'TEXT_CHAT_ALERT':
      return { ...state, usersChatAlertList: action.payload };
    case "SOCKET_INFO":
      return {
        ...state, SocketInfo: action.payload
      }
    case "GET_NOTIFICATION_DATA":
      return { ...state, getNotificationData: action.payload }
    default:
      return state;
  }
};
