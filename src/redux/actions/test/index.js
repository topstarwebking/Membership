import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = process.env.REACT_APP_BASE_URL;
const getUserId = () => {
  return localStorage.getItem("user_id");
};

const getHeaders = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "content-type": "application/json",
  };
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
    progress: true,
  };
};
export const FETCH_EVENT_DETAILS = async (eventId) => {
  let url = `${baseUrl}/api/recomend_students/get_by_user_id/${getUserId()}/${eventId}`;
  try {
    let response = await axios.get(url, {
      headers: getHeaders(),
    });
    if (response.status) {
      return response
    }
  } catch (error) {
    toast.error(error.message.replace(/\\/g, ""), toastCSS());
    console.log(error)
    return null
  }
}

export const FETCH_APPOINMENT_DETAILS = async (eventId) => {
  let url = `${baseUrl}/api/appointment/list_of_appoinment_info/${getUserId()}/${eventId}`;
  try {
    let response = await axios.get(url, {
      headers: getHeaders(),
    });
    if (response.status) {
      return response
    }
  } catch (error) {
    toast.error(error.message.replace(/\\/g, ""), toastCSS());
    console.log(error)
    return null
  }
}
// This is to get the data of the guests. That will be shown in the tables.
export const FETCH_TEST_LIST = (eventId) => {
  let url = `${baseUrl}/api/recomend_students/get_by_user_id/${getUserId()}/${eventId}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, {
        headers: getHeaders(),
      });
      if (response.status) {
        dispatch({
          type: "FETCH_TEST_LIST",
          payload: response.data,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
      dispatch({
        type: "FETCH_TEST_LIST",
        payload: [],
      });
    }
  };
};
// This is to get the count of the guests.
export const FETCH_TEST_LIST_COUNT = (eventId) => {
  let url = `${baseUrl}/api/recomend_students/get_by_user_id/${getUserId()}/${eventId}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, {
        headers: getHeaders(),
      });
      
      if (response.status) {
        dispatch({
          type: "FETCH_TEST_LIST_COUNT",
          payload: response?.data?.count,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
      dispatch({
        type: "FETCH_TEST_LIST_COUNT",
        payload: [],
      });
    }
  };
};

export const MANAGE_EVENT_MODAL_OPEN_REGISTER_STUDENT = (valueData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "MANAGE_EVENT_MODAL_OPEN_REGISTER_STUDENT",
        payload: valueData,
      });
    } catch (error) { }
  };
};
export const MANAGE_EVENT_SELECTED_REGISTER_STUDENT = (event) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "MANAGE_EVENT_SELECTED_REGISTER_STUDENT",
        payload: event,
      });
    } catch (error) { }
  };
};

export const LOADER = (event) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "LOADER",
        payload: event,
      });
    } catch (error) { }
  };
};

export const MANAGE_REGISTER_MODAL_OPEN_REGISTER_STUDENT = (valueData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "MANAGE_REGISTER_MODAL_OPEN_REGISTER_STUDENT",
        payload: valueData,
      });
    } catch (error) { }
  };
};

export const Add_TEST_DATA = (payload, eventId) => {
  let url = `${baseUrl}/api/recomend_students/${getUserId()}/${eventId}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, { headers: getHeaders() });
      if (response.status === 200) {
        if (response.data.success) {
          toast.success(response.data.msg, toastCSS());
          dispatch(FETCH_TEST_LIST(eventId));
          return true;
        } else {
          toast.info(response.data.msg, toastCSS());
          return false;
        }
      }
      // dispatch(FETCH_TEST_LIST(eventId));
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const SELECTED_TEST_DATA = (data) => {
  return async (dispatch) => {
    let payload = [];
    for (let student of data) {
      let modifyItem = {
        studentId: student?._id,
        firstName: student?.firstName || "no data",
        lastName: student?.lastName || "no data",
        rating: student?.rating,
        current_rank_img: student?.current_rank_img || "no data",
        next_rank_img: student?.next_rank_img || "no data",
        next_rank_name: student?.next_rank_name || "no data",
        memberprofileImage: student?.memberprofileImage || "no data",
        primaryPhone: student?.primaryPhone || "no data",
        program: student?.program || "no data",
        status: student?.status || "no data",
        current_rank_name: student?.current_rank_name || "no data",
        userId: getUserId(),
        lastPromotedDate: student?.lastPromotedDate || "09/11/2021",
        isRecommended: student?.isRecommended,
        isInvitee: student?.isInvitee,
      };
      payload.push(modifyItem);
    }
    dispatch({
      type: "SELECTED_TEST_DATA",
      payload: payload,
    });
  };
};

export const DELETE_TEST_DATA = (id, eventId) => {
  const payload = { recommendIds: id };
  let url = `${baseUrl}/api/recommend/removeAll/${getUserId()}/${eventId}`;
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, {
        headers: getHeaders(),
        data: payload,
      });
      if (response.data && response.status === 200 && response.status) {
        toast.success(response.data.msg, toastCSS());
        dispatch(FETCH_TEST_LIST(eventId));
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const PAY_AND_REGISTER = (payload, eventId) => {
  let url = `${baseUrl}/api/recomend_students/pay_and_regiter/${getUserId()}/${eventId}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, {
        headers: getHeaders(),
      });
      if (response.data && response.status === 200 && response.status) {
        // console.log(response.data.msg,"hhdckjshdcghcmshdvcjahgv")
        toast.success(response.data.msg, toastCSS());
        dispatch(FETCH_TEST_LIST(eventId));
        dispatch(GET_REGISTERED_FOR_TEST(eventId));
        return true;
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
      return false;
    }
  };
};
export const WITHOUT_PAY_REGISTOR = (payload, eventId) => {
  let url = `${baseUrl}/api/recomend_students/regiter/${getUserId()}/${eventId}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, {
        headers: getHeaders(),
      });
      if (response.data && response.status === 200 && response.status) {
        toast.success(response.data.msg, toastCSS());
        dispatch(FETCH_TEST_LIST(eventId));
        dispatch(GET_REGISTERED_FOR_TEST(eventId));
        return true;
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
      return false;
    }
  };
};

export const GET_REGISTERED_FOR_TEST = (eventId) => {
  let url = `${baseUrl}/api/recomend_students/getRegisteredForTest/${getUserId()}/${eventId}`;
  return async (dispatch) => {
    dispatch({
      type: "GET_REGISTERED_FOR_TEST",
      payload: [],
    });
    try {
      let response = await axios.get(url, {
        headers: getHeaders(),
      });
      if (response.status) {
        dispatch({
          type: "GET_REGISTERED_FOR_TEST",
          payload: response.data,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const DELETE_REGISTERED_FOR_TEST = (id, eventId) => {
  const payload = { registeredIds: id };
  let url = `${baseUrl}/api/registerd/removeAll/${getUserId()}/${eventId}`;
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, {
        headers: getHeaders(),
        data: payload,
      });
      if (response.status === 200) {
        toast.success(response.data.msg, toastCSS());
        dispatch(GET_REGISTERED_FOR_TEST(eventId));
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const GET_PRAMOTE_TO_RECOMMANDE = (payload, eventId) => {
  let url = `${baseUrl}/api/registered_students/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await axios.put(url, payload, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        toast.success(response.data.msg, toastCSS());
        dispatch(GET_REGISTERED_FOR_TEST(eventId));
        dispatch(GET_PROMOTE_STUDNETS(eventId));
      } else {
        toast.info(response.data.error, toastCSS());
      }
    } catch (error) {
      toast.error(error.message, toastCSS());
    }
  };
};
export const GET_PROMOTE_STUDNETS = (eventId) => {
  let url = `${baseUrl}/api/recomend_students/getPromoted/${getUserId()}/${eventId}`;
  return async (dispatch) => {
    dispatch({
      type: "GET_PROMOTE_STUDNETS",
      payload: [],
    });
    dispatch({
      type: "LOADER",
      payload: true,
    });

    try {
      let response = await axios.get(url, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        dispatch({
          type: "GET_PROMOTE_STUDNETS",
          payload: response.data?.data,
        });

      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    } finally {
      dispatch({
        type: "LOADER",
        payload: false,
      });
    }
  };
};
export const DELETE_PROMOTED_STUDNETS = (id, eventId) => {
  const payload = { registeredIds: id };
  let url = `${baseUrl}/api/registerd/removeAll/${getUserId()}/${eventId}`;
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, {
        headers: getHeaders(),
        data: payload,
      });
      if (response.status === 200) {
        toast.success(response.data.msg, toastCSS());
        dispatch(GET_PROMOTE_STUDNETS(eventId));
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
      // dispatch(GET_PROMOTE_STUDNETS());
    }
  };
};

export const SELECT_STUDENT_FOR_TEST_OR_RECOMAND = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "SELECT_STUDENT_FOR_TEST_OR_RECOMAND",
      payload: data,
    });
  };
};
export const SELECT_STUDENTID_FOR_PRAMOTE = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "SELECT_STUDENTID_FOR_PRAMOTE",
      payload: data,
    });
  };
};
export const SELECT_STUDENT_FOR_CANDIDATE = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "SELECT_STUDENT_FOR_CANDIDATE",
      payload: data,
    });
  };
};

export const SELECT_STUDENT_FOR_REGESTER = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "SELECT_STUDENT_FOR_REGESTER",
      payload: data,
    });
  };
};
export const PAY_POROMOTED_STUDNETS = (payload, id, eventId) => {
  let url = `${baseUrl}/api/pay_for_promoted_students/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.put(url, payload, {
        headers: getHeaders(),
      });
      if (response.data && response.status === 200 && response.status) {
        // console.log(response?.data?.msg,"My name is Ajay")
        toast.success(response?.data?.msg, toastCSS());
        dispatch(GET_PROMOTE_STUDNETS(eventId));
        dispatch(GET_REGISTERED_FOR_TEST(eventId));
        return true;
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
      return false;
    }
  };
};
export const ADD_INVITE_FOR_EVNET = (payload, eventId) => {
  let url = `${baseUrl}/api/addInvitee/${getUserId()}/${eventId}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, { headers: getHeaders() });
      if (response.status === 200) {
        if (response.data.success) {
          // console.log(response?.data?.msg)
          toast.success(response.data.msg, toastCSS());
          dispatch(FETCH_TEST_LIST(eventId));
          return true;
        } else {
          toast.info(response.data.msg, toastCSS());
          return false;
        }
      }
      // dispatch(FETCH_TEST_LIST());
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const HandleEventButton = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "HandleEventButton",
      payload: data,
    });
  };
};

export const GET_INVITEES_OF_EVENT = (id) => {
  let url = `${baseUrl}/api/getInvitee/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_INVITEES_OF_EVENT",
        payload: [],
      });
      let response = await axios.get(url, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        dispatch({
          type: "GET_INVITEES_OF_EVENT",
          payload: response.data?.data,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const GET_PROMPTION_RANK_DETAILS = (eventId) => {
  
  let url = `${baseUrl}/api/promotion_belt_count/${getUserId()}/${eventId}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, {
        headers: getHeaders(),
      });
      console.log(response)
      if (response?.status === 200) {
        dispatch({
          type: "GET_PROMPTION_RANK_DETAILS",
          payload: response?.data
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const GET_GENERAL_RANK_DETAILS = (eventId) => {
  
  let url = `${baseUrl}/api/general_belt_count/${getUserId()}/${eventId}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, {
        headers: getHeaders(),
      });
      console.log(response)
      if (response?.status === 200) {
        dispatch({
          type: "GET_GENERAL_RANK_DETAILS",
          payload: response?.data
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const GET_INVITEES_OF_EVENT_COUNT = (id) => {
  let url = `${baseUrl}/api/getInvitee/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      // dispatch({
      //   type: "GET_INVITEES_OF_EVENT_COUNT",
      //   payload: [],
      // });
      let response = await axios.get(url, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        dispatch({
          type: "GET_INVITEES_OF_EVENT_COUNT",
          payload: response?.data?.count,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const GET_REGISTERED_FOR_EVENT = (id) => {
  let url = `${baseUrl}/api/getRegisteredInvitee/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_INVITEES_OF_EVENT",
        payload: [],
      });
      let response = await axios.get(url, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        dispatch({
          type: "GET_REGISTERED_FOR_EVENT",
          payload: response.data?.data,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const PAY_AND_REGISTER_FOR_EVENT = (payload) => {
  let url = `${baseUrl}/api/registerInvitee/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, {
        headers: getHeaders(),
      });
      // console.log(response.data.msg)
      if (response.data && response.status === 200 && response.status) {
        toast.success(response.data.msg, toastCSS());
        return true;
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
      return false;
    }
  };
};
export const GET_ATTENDED_INVITESE = (id) => {
  let url = `${baseUrl}/api/getAttendee/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_ATTENDED_INVITESE",
        payload: [],
      });
      let response = await axios.get(url, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        dispatch({
          type: "GET_ATTENDED_INVITESE",
          payload: response.data?.data,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const INVITE_REGISTER = (payload, id, eventId) => {
  let url = `${baseUrl}/api/registerInvitee/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, {
        headers: getHeaders(),
      });
      if (response.data && response.status === 200 && response.status) {
        toast.success(response?.data?.msg, toastCSS());
        dispatch(GET_INVITEES_OF_EVENT(eventId));
        dispatch(GET_REGISTERED_FOR_EVENT(eventId));
        return true;
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
      return false;
    }
  };
};
export const PAY_NOW_INVITE_REGISTER = (payload, eventId) => {
  let url = `${baseUrl}/api/payAndRegister/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, {
        headers: getHeaders(),
      });
      // console.log(response, " Pay And Register")
      if (response.data && response.status === 200 && response.status) {
        toast.success(response?.data?.msg, toastCSS());
        dispatch(GET_INVITEES_OF_EVENT(eventId));
        dispatch(GET_REGISTERED_FOR_EVENT(eventId));
        return true;
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
      return false;
    }
  };
};
export const EVENT_ID = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "EVENT_ID",
      payload: data,
    });
  };
};

export const DELET_STUDENT_FROM_INVITE = (id, inviteId) => {
  const payload = { inviteeIds: id };
  let url = `${baseUrl}/api/deleteInvitee/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, {
        headers: getHeaders(),
        data: payload,
      });
      if (response.data && response.status === 200 && response.status) {
        toast.success(response.data.msg, toastCSS());
        dispatch(GET_ATTENDED_INVITESE(inviteId));
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const DELET_STUDENT_FROM_ATTENDED_OR_REGISTER = (id, inviteId) => {
  const payload = { RegisteredIds: id };
  let url = `${baseUrl}/api/deleteRegistered/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, {
        headers: getHeaders(),
        data: payload,
      });
      if (response.data && response.status === 200 && response.status) {
        toast.success(response.data.msg, toastCSS());
        dispatch(GET_ATTENDED_INVITESE(inviteId));
        dispatch(GET_REGISTERED_FOR_EVENT(inviteId));
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const ADD_STUDENTS_IN_ATTEDNDE = (payload, eventId) => {
  let data = { studentIds: payload };
  let url = `${baseUrl}/api/addToAttended/${getUserId()}/${eventId}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, data, {
        headers: getHeaders(),
      });
      if (response.data && response.status === 200 && response.status) {
        toast.success(response?.data?.msg, toastCSS());
        dispatch(GET_ATTENDED_INVITESE(eventId));
        dispatch(GET_REGISTERED_FOR_EVENT(eventId));

        return true;
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
      return false;
    }
  };
};

export const SELECTED_EVENT = (info) => {
  return async (dispatch) => {
    try {
      if (info) {
        dispatch({
          type: "SELECTED_EVENT",
          payload: info,
        });
      }
    } catch (error) {
      toast.error(error?.massage.replace(/\\/g, ""), toastCSS());
    }
  };
};


export const FETCH_EVENTS = (currentActiveCendar) => {
  let url = `${baseUrl}/api/appointment/list_of_appointments/${getUserId()}/${currentActiveCendar}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, { headers: getHeaders() });
      if (response?.data?.success) {
        dispatch({
          type: "FETCH_EVENTS",
          payload: response?.data?.data,
        });
      } else {
        toast.error(response?.data.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const ADD_EVENT_V2 = (payload, currentActiveCendar) => {
  console.log(payload)
  let url = `${baseUrl}/api/add_appointment/v2/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, { headers: getHeaders() });
      if (response.data && response.status === 200) {
        toast.success("Event created successfully!", toastCSS());
        dispatch(FETCH_EVENTS(currentActiveCendar));
        return true;
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const EVENT_FILTER = (payload) => {
  let url = `${baseUrl}/api/eventManager/filterEvent/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        dispatch({
          type: "FETCH_EVENTS",
          payload: response?.data?.data,
        });
        return true;
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
      return false;
    }
  };
};

export const PAY_REGISTER_ATTENDED_STUDNETS = (payload, id, eventId) => {
  let url = `${baseUrl}/api/eventManager/eventPay/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.put(url, payload, {
        headers: getHeaders(),
      });
      if (response.data && response.status === 200 && response.status) {
        // console.log(response?.data?.msg, response, "This is Pay Register attended students")
        toast.success(response?.data?.msg, toastCSS());
        dispatch(GET_ATTENDED_INVITESE(eventId));
        dispatch(GET_REGISTERED_FOR_EVENT(eventId));
        return true;
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
      return false;
    }
  };
};
