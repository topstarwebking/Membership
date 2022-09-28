import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = process.env.REACT_APP_BASE_URL;

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

const getUserId = () => {
  return localStorage.getItem("user_id");
};

const getHeaders = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "content-type": "application/json",
  };
};

export const GET_SCHOOL_LIST_FOR_ADMIN = () => {
  let url = `${baseUrl}/api/admin/school_listing/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await axios.get(url, {
        headers: getHeaders(),
      });

      dispatch({
        type: "GET_SCHOOL_LIST_FOR_ADMIN",
        payload: res.data,
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS);
    }
  };
};
export const ADD_LOCATION_IN_ADMIN = (payload, id) => {
  let url = `${baseUrl}/api/add_location/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, { headers: getHeaders() });
      if (response.data?.success) {
        toast.success(response.data?.msg, toastCSS());
      } else {
        toast.success(response.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const GET_LOCATIONS_IN_ADMIN = () => {
  let url = `${baseUrl}/api/list_location/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await axios.get(url, {
        headers: getHeaders(),
      });

      dispatch({
        type: "GET_LOCATIONS_IN_ADMIN",
        payload: res.data,
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS);
    }
  };
};
export const DELETE_LOCATIONS_IN_ADMIN = (id) => {
  let url = `${baseUrl}/api/remove_location/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, { headers: getHeaders() });
      if (response.data.success) {
        toast.success(response.data.msg, toastCSS());
        dispatch(GET_LOCATIONS_IN_ADMIN());
      } else {
        toast.info(response.data.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const UPDATE_LOCATIONS_IN_ADMIN = (payload, id) => {
  let url = `${baseUrl}/api/update_location/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.put(url, payload, { headers: getHeaders() });
      if (response.data?.success) {
        dispatch(GET_SCHOOL_LIST_FOR_ADMIN());
        toast.success(response.data?.msg, toastCSS());
      } else {
        toast.error(response.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const ASIGN_LOCATIONS_TO_USERS = (payload, id) => {
  let url = `${baseUrl}/api/access_school/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.put(url, payload, { headers: getHeaders() });
      if (response.data?.success) {
        dispatch(GET_LOCATIONS_IN_ADMIN());
        toast.success(response.data?.msg, toastCSS());
      } else {
        toast.error(response.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
