import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = process.env.REACT_APP_BASE_URL;
const studentId = window.location.pathname.split("student-info/")[1];

const getUserId = () => {
  return localStorage.getItem("user_id");
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

const toastCss = () => {
  return {
    position: "top-center",
    autoClose: 2000,
    icon: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: true,
  };
};

export const GET_FILES_OF_STUDENTS = () => {
  let url = `${baseUrl}/api/userSectionFiles/getall/${getUserId()}/${studentId}`;
  return async (dispatch) => {
    try {
      let res = await axios.get(url, { headers: getHeaders() });
      if (res.data?.success) {
        dispatch({
          type: "GET_FILES_OF_STUDENTS",
          payload: res?.data?.data,
        });
      } else {
        toast.info(res.data?.msg, toastCss());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};

export const ADD_FILE_OF_STUDENTS = (payload) => {
  let url = `${baseUrl}/api/userSectionFiles/add/${getUserId()}/${studentId}`;
  let dataEntries = Object.entries(payload);
  let formData = new FormData();
  dataEntries.map((v) => {
    formData.append(v[0], v[1]);
    return v;
  });
  return async (dispatch) => {
    try {
      let res = await axios.post(url, formData, {
        headers: getHeadersForFile(),
      });
      if (res.data?.success) {
        dispatch(GET_FILES_OF_STUDENTS());
      } else {
        toast.info(res.data?.msg, toastCss());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};

export const DELETE_FILE_OF_STUDENTS = (fileId) => {
  let url = `${baseUrl}/api/userSectionFiles/delete/${fileId}`;
  return async (dispatch) => {
    try {
      let res = await axios.delete(url, { headers: getHeadersForFile() });
      if (res.data?.success) {
        toast.success(res.data?.msg, toastCss());
        dispatch(GET_FILES_OF_STUDENTS());
      } else {
        toast.info(res.data?.msg, toastCss());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};

export const EDIT_FILE_OF_STUDENTS = (payload, fileId) => {
  let url = `${baseUrl}/api/userSectionFiles/update/${fileId}`;
  let dataEntries = Object.entries(payload);
  let formData = new FormData();
  dataEntries.map((v) => {
    formData.append(v[0], v[1]);
    return v;
  });
  return async (dispatch) => {
    try {
      let res = await axios.put(url, formData, {
        headers: getHeadersForFile(),
      });
      if (res.data?.success) {
        dispatch(GET_FILES_OF_STUDENTS());
        toast.success(res.data?.msg, toastCss());
      } else {
        toast.info(res.data?.msg, toastCss());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};
