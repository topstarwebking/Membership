import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = process.env.REACT_APP_BASE_URL;

const getUserId = () => {
  return localStorage.getItem("user_id");
};
const userData = JSON.parse(localStorage.getItem("userdata"));

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

export const CREATE_TICKET = (data) => {
  let dataEntries = Object.entries(data);
  let formData = new FormData();
  dataEntries.map((v) => {
    formData.append(v[0], v[1]);
    return v;
  });
  let url = `${baseUrl}/api/support/create_ticket/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await axios.post(url, formData, {
        headers: getHeadersForFile(),
      });
      if (res.data.success) {
        dispatch(GET_TICKETS_COUNT);
        dispatch({
          type: "GET_SUPPORT_VIEW_TICKET",
          payload: res?.data,
        });
      }
      toast.success("Ticket created successfully!", toastCSS());
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const GET_SUPPORT_VIEW_TICKET = () => {
  let url = "";
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/support/viewticket/${getUserId()}`;
  } else {
    url = `${baseUrl}/api/support/viewticket/${getUserId()}`;
  }
  return async (dispatch) => {
    try {
      let res = await axios.get(url, {
        headers: getHeaders(),
      });
      if (res.status === 200) {
        dispatch({
          type: "GET_SUPPORT_VIEW_TICKET",
          payload: res?.data,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const GET_TICKETS_COUNT = () => {
  let url = `${baseUrl}/api/support/ticket_count/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await axios.get(url, {
        headers: getHeaders(),
      });
      dispatch({
        type: "GET_TICKETS_COUNT",
        payload: res?.data,
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const UPDATE_TICKET = (data, id) => {
  let url = "";
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/support/update_status/${getUserId()}/${id}`;
  } else {
    url = `${baseUrl}/api/support/update_ticket/${getUserId()}`;
  }
  return async (dispatch) => {
    try {
      let res = await axios.put(url, data, {
        headers: getHeaders(),
      });
      if (res.data.success) {
        dispatch(GET_SUPPORT_VIEW_TICKET());
        toast.success("Ticket created successfully!", toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const UPDATE_TICKET_USER = (data, id) => {
  let url = `${baseUrl}/api/support/update_ticket/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let res = await axios.put(url, data, {
        headers: getHeaders(),
      });
      if (res.data.success) {
        dispatch(GET_SUPPORT_VIEW_TICKET());
        toast.success("Ticket Update successfully!", toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
