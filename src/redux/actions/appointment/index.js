import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { FETCH_EVENTS } from "../test";
const baseUrl = process.env.REACT_APP_BASE_URL;

const toastCSS = () => {
  return {
    position: "bottom-center",
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
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };
};
const getuserId = () => {
  return localStorage.getItem("user_id");
};

export const FETCH_EVENTS_OR_APPOINMENT = () => {
  let currentActiveCendar = localStorage.getItem("appointmentActivedate");
  // console.log(localStorage.getItem("appointmentActivedate"))
  let url = `${baseUrl}/api/appointment/list_of_appointments/${getuserId()}/${currentActiveCendar}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, getHeaders());
      if (response?.data?.success) {
        dispatch({
          type: "FETCH_EVENTS_OR_APPOINMENT",
          payload: response?.data,
        });
      } else {
        toast.error(response?.data.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const ADD_APPOINTMENT_OR_EVENT = (payload) => {
  let url = `${baseUrl}/api/add_appointment/${getuserId()}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, getHeaders());
      if (response.data && response.status === 200) {
        toast.success("Event created successfully!", toastCSS());
        dispatch(FETCH_EVENTS_OR_APPOINMENT());
        return true;
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};



export const DELETE_APPOINTMENT_OR_EVENT = (Map_item) => {
  let url = `${baseUrl}/api/delete_appointment/${getuserId()}/${Map_item?._id}`;
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, getHeaders());
      if (response?.data?.success) {
        toast.success(response?.data.msg.replace(/\\/g, ""), toastCSS());
        dispatch(
          APPOINTMENT_CATEGORYLIST(),
        );
        dispatch(
          FETCH_EVENTS(moment(new Date()).format("MM-DD-YYYY"))
        );
      } else {
        toast.info("Unable to delete !", toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const DELETE_APPOINTMENT_OR_EVENT_CATEGORY = (id) => {
  let url = `${baseUrl}/api/delete_appointmentcategory/${getuserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, getHeaders());
      if (response.data.success) {
        toast.info("Delete successfully!", toastCSS());
        dispatch(APPOINTMENT_CATEGORYLIST());
      } else {
        toast.info("Unable to delete !", toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const UPDATE_EVENT = (payload,eventId) => {
  let url = `${baseUrl}/api/appointment/update_appointment/${getuserId()}/${eventId}`;
  return async (dispatch) => {
    try {
      let response = await axios.put(url,payload,getHeaders());
      if (response.data && response.status === 200) {
        toast.success("Event updated successfully!", toastCSS());
        dispatch(FETCH_EVENTS(moment(new Date()).format("MM-DD-YYYY")));
        return true;
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const UPDATE_APPOINTMENT = (
  appointment,
  appointmentOrEventId,
  perpage,
  perrows,
  cetegory
) => {
  let url = `${baseUrl}/api/appointment/update_appointment/${getuserId()}/${appointmentOrEventId}`;
  return async (dispatch) => {
    try {
      let response = await axios.put(
        url,
        appointment ? appointment : null,
        getHeaders()
      );
      if (response.data && response.status === 200) {
        toast.success("Event/Appointment updated successfully!", toastCSS());
        dispatch(GET_APPOINTMENT_BY_CETEGORY(perpage, perrows, cetegory));
        dispatch(FETCH_EVENTS_OR_APPOINMENT());
        return true;
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const APPOINTMENT_REMOVE = (appointmentOrEventId) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(
        `${baseUrl}/api/delete_appointment/${getuserId()}/${appointmentOrEventId}`,
        getHeaders()
      );
      if (response.data && response.status === 200) {
        dispatch({
          type: "APPOINTMENT_REMOVE",
          event: response.data,
        });

        dispatch(FETCH_EVENTS_OR_APPOINMENT());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const APPOINTMENT_CATEGORYLIST = () => {
  let url = `${baseUrl}/api/list_of_appointmentcategory/${getuserId()}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, getHeaders());
      if (response?.data?.success) {
        dispatch({
          type: "APPOINTMENT_CATEGORYLIST",
          payload: response.data?.data,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const deleteAppointmentCategory = (docId) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(
        `${baseUrl}/api/delete_appointmentevent/${getuserId()}/${docId}`,
        getHeaders()
      );
      if (response.data.success) {
        toast.success(response.data.msg, toastCSS());
        dispatch(APPOINTMENT_CATEGORYLIST());
      } else {
        toast.error(response.data.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const CREATE_CATEGORY = (payload) => {
  const createdBy = JSON.parse(localStorage.getItem("userdata"))?.data
    ?.username;
  payload.createdBy = createdBy;
  let url = `${baseUrl}/api/create_appointmentcategory/${getuserId()}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, getHeaders());
      if (response.data.success) {
        toast.success(response.data.msg, toastCSS());
        dispatch(APPOINTMENT_CATEGORYLIST());
      } else {
        toast.error(response.data.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const UPDATE_CATEGORY = (payload, appEventId) => {
  let url = `${baseUrl}/api/update_appointmentcategory/${getuserId()}/${appEventId}`;
  return async (dispatch) => {
    try {
      let response = await axios.put(url, payload, getHeaders());
      if (response.data.success) {
        toast.success(response.data.msg, toastCSS());
        dispatch(APPOINTMENT_CATEGORYLIST());
      } else {
        toast.error(response.data.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const UPDATE_ALL_APPOINTMENT = (appointment, appointmentOrEventId) => {
  return async (dispatch) => {
    try {
      let response = await axios.put(
        `${baseUrl}/api/appointment/update_all_appointment/${getuserId()}/${appointmentOrEventId}`,
        appointment,
        getHeaders()
      );

      if (response.data && response.status === 200) {
        toast.success(response.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const DELETE_ALL_APPOINTMENT_OR_EVENT = (id) => {
  let url = `${baseUrl}/api/appointment/delete_all/${getuserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, getHeaders());
      if (response.data.success) {
        toast.info("Delete successfully!", toastCSS());
        dispatch(FETCH_EVENTS_OR_APPOINMENT());
      } else {
        toast.info("Unable to delete !", toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const GET_APPOINTMENT_BY_CETEGORY = (pagenumebr, perpage, cetegory) => {
  let url = `${baseUrl}/api/appointment/list_of_appointments_onCategory/${getuserId()}/${pagenumebr}/${perpage}/${cetegory}`;
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_APPOINTMENT_BY_CETEGORY",
        payload: null,
      });
      let response = await axios.get(url, getHeaders());
      if (response?.data?.success) {
        dispatch({
          type: "GET_APPOINTMENT_BY_CETEGORY",
          payload: response?.data,
        });
      } else {
        toast.error(response?.data.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const FILTER_FOR_APPONMNET = (
  category,
  pageNumber,
  rowsPerPage,
  payload
) => {
  let url = `${baseUrl}/api/appointmentFilter/${category}/${getuserId()}/${pageNumber}/${rowsPerPage}?filter=${payload}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, getHeaders());
      if (response?.data?.success) {
        dispatch({
          type: "FILTER_FOR_APPONMNET",
          payload: response?.data,
        });
      } else {
        toast.error(response.data.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const FETCH_EVENTS_OR_TEST = (date) => {
  let url = `${baseUrl}/api/appointment/list_of_appointments/${getuserId()}/${date}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, getHeaders());
      if (response?.data?.success) {
        dispatch({
          type: "FETCH_EVENTS_OR_TEST",
          payload: response?.data,
        });
      } else {
        toast.error(response?.data.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const ACTIVE_EVENT = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "ACTIVE_EVENT",
      payload: data,
    });
  };
};


