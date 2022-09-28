import axios from "axios";
import { toast } from "react-toastify";
import { SOCKET_GET_TEXT_MESSAGES } from "../../socket.io";
const baseUrl = process.env.REACT_APP_BASE_URL;

const getUserId = () => {
  return localStorage.getItem("user_id");
};

const toastCSS = () => {
  return {
    position: "top-center",
    autoClose: 3000,
    icon: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
};

const getHeaders = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "content-type": "application/json",
  };
};
const getHeadersForFile = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "content-type": "multipart/form-data",
  };
};

export const GET_TEXT_USER_CHAT_LIST = (StudentTypeOrInterest) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/text-chat/get-contacts/${getUserId()}`,
        {
          headers: getHeaders(),
        }
      );
      if (response?.data?.success) {
        dispatch(GET_CONTACTS_DETAILS(StudentTypeOrInterest));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const GET_MEMBER_CONTACTS_DETAILS = (studentType) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/text-chat/contacts-details/${localStorage.getItem("user_id")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          params: {
            studentType
          }
        }
      );
      if (response?.status === 200) {
        dispatch({
          type: "GET_MEMBER_CONTACTS_DETAILS",
          payload: response?.data?.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};


// API to fetch all Notification Data
export const GET_NOTIFICATION_DATA = (data) => {
  return async (dispatch) => {
    console.log(data);
    try {
      dispatch({
        type: "GET_NOTIFICATION_DATA",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// API to fetch all text messages
export const V2_GET_TEXT_MESSAGES = (Info) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "V2_GET_TEXT_MESSAGES",
        payload: Info,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// Set all text alert message info
export const TEXT_CHAT_ALERT = (Info) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "TEXT_CHAT_ALERT",
        payload: Info,
      })
    } catch (error) {
      console.log(error.message);
    }

  }
}

// set User Chat List Index;
export const UserChatTextListIndex = (Info) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "UserChatTextListIndex",
        payload: Info,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

// set contact details
export const SET_NEW_CONTACT_DETAILS = (Info) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_MEMBER_CONTACTS_DETAILS",
        payload: Info,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

// API call to send new text message
export const SEND_TEXT_MESSAGE_V2 = (message) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${baseUrl}/api/text-chat/send-message/${getUserId()}`,
        message,
        {
          headers: getHeaders(),
        }
      );
      if (response.status === 200) {
        if (Object.keys(response.data).includes('error')) {
          throw new Error(response.data.error)
        }
        if (!(response.data.success)) {
          throw new Error(response.data.msg)
        }
        const { uid, userId } = response.data.textMessage;
        SOCKET_GET_TEXT_MESSAGES({ uid, userId });
        return { 'success': true, 'msg': response.data.msg }
      }
    } catch (error) {
      console.log(error.message);
      return { 'success': false, 'message': error.message };
    }
  };
};

// API call to send new text message
export const ACTIVE_STUDENT_TO_SEND_TEXTCHAT_MSG = (studentInfo) => {
  return async (dispatch) => {
    dispatch({
      type: "ACTIVE_STUDENT_TO_SEND_TEXTCHAT_MSG",
      payload: studentInfo,
    });

  };
};



// create new Chat with 
export const V2_ADD_TEXT_CONTACTS = contact => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${baseUrl}/api/text-chat/add-contact/${getUserId()}`, contact, { headers: getHeaders() });
      let { msg, success } = response.data;
      if (success) {
        return { "data": response.data, "success": true };
      } else {
        toast.info(msg, toastCSS());
        return { "success": false };
      }
    } catch (error) {
      toast.error(error.message, toastCSS());
    }
  }
};

// API to mark seen
export const V2_SEEN_CONTACT_MESSAGES = contact => {
  return dispatch => {
    axios.post(
      `${baseUrl}/api/text-chat/seen-contact-messages/${contact}/${localStorage.getItem("user_id")}`,
      { isSeen: true },
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      }
    ).then(() => {
      dispatch(GET_TEXT_USER_CHAT_LIST());
    })
  }
}


export const UPDATE_MEMBER_CONTACTS_DETAILS = (contacts, newContact) => {
  return async (dispatch) => {
    try {
      const { uid } = newContact;
      let updateList = contacts.map((el) => {
        let { _id } = el;
        if (_id === uid) {
          return Object.assign({}, el, { 'textContent': newContact.textContent, 'time': newContact.time });
        } else {
          return el;
        }
      })
      dispatch({
        type: "GET_MEMBER_CONTACTS_DETAILS",
        payload: updateList,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const GET_CONTACTS_DETAILS = (StudentTypeOrInterest) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/text-chat/contacts-details/${getUserId()}?studentType=${StudentTypeOrInterest}`, { headers: getHeaders() })
      if (response?.data?.success) {
        dispatch({
          type: "GET_MEMBER_CONTACTS_DETAILS",
          payload: response?.data?.data,
        });
        return response?.data?.data
      }
    } catch (error) {
      console.log(error);
    }
  };
};