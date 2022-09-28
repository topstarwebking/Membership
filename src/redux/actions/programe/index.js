import axios from "axios";
import { toast } from "react-toastify";
const userData = JSON.parse(localStorage.getItem("userdata"));

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

const getHeadersForFile = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "content-type": "multipart/form-data",
  };
};
export const GET_PROGRAM_LIST = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/list_of_program/${getUserId()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data && response.status === 200) {
        dispatch({
          type: "GET_PROGRAM_LIST",
          payload: response.data?.data,
        });
      }
    } catch (error) {
      console.log("something went wrong");
    }
  };
};
export const CREATE_PROGRAM_RANK = (payload, programId) => {
  console.log(payload, programId);
  let url = "";
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/add_program_rank/${getUserId()}/${programId}`;
  } else {
    url = `${baseUrl}/api/admin/add_program_rank/${getUserId()}/${programId}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, { headers: getHeaders() });
      if (response.data?.success) {
        toast.success(response.data.msg.replace(/\\/g, ""), toastCSS());
        await dispatch(GET_PROGRAM_LIST());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const UPDATE_PROGRAM_RANK = (payload, programRankId) => {
  let url = "";
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/update_program_rank/${getUserId()}/${programRankId}`;
  } else {
    url = `${baseUrl}/api/admin/update_program_rank/${getUserId()}/${programRankId}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.put(url, payload, {
        headers: getHeadersForFile(),
      });
      if (response.data?.success) {
        toast.success((response?.data?.msg).replace(/\\/g, ""), toastCSS());
      }

      dispatch(GET_PROGRAM_LIST());
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const DELETE_PROGRAM_RANK = (programRankId) => {
  let url = "";
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/delete_program_rank/${getUserId()}/${programRankId}`;
  } else {
    url = `${baseUrl}/api/admin/delete_program_rank/${getUserId()}/${programRankId}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, { headers: getHeaders() });
      if (response?.data?.success) {
        toast.info(response.data.msg.replace(/\\/g, ""), toastCSS());
        dispatch(GET_PROGRAM_LIST());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const ADD_PROGRAM = (payload) => {
  // let url = `${baseUrl}/api/add_program/${getUserId()}`;
  let url = "";
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/add_program/${getUserId()}`;
  } else {
    url = `${baseUrl}/api/admin/add_program/${getUserId()}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, {
        headers: getHeaders(),
      });
      if (response.error) {
        toast.error(response.error, toastCSS());
      }
      dispatch(GET_PROGRAM_LIST());
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const UPDATE_PROGRAM = (data, id) => {
  let url = "";
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/update_program/${getUserId()}/${id}`;
  } else {
    url = `${baseUrl}/api/admin/update_program/${getUserId()}/${id}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.put(url, data, {
        headers: getHeaders(),
      });

      if (response.data.success) {
        toast.success("Program updated successfully",  toastCSS())
      }
      dispatch(GET_PROGRAM_LIST());
    } catch (error) {
      toast.error(error?.message, toastCSS());
    }
  };
};

export const DELETE_PROGRAM = (id) => {
  let url = "";
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/delete_program/${getUserId()}/${id}`;
  } else {
    url = `${baseUrl}/api/admin/delete_program/${getUserId()}/${id}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, { headers: getHeaders() });
      if (response?.data?.success) {
        toast.info(response.data.msg.replace(/\\/g, ""), toastCSS());
        dispatch(GET_PROGRAM_LIST());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const GET_CATEGORIES = () => {
  return async (dispatch) => {
    let response = await axios.get(
      `${baseUrl}/api/list_of_program/${getUserId()}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    if (response.data && response.status === 200) {
      dispatch({
        type: "GET_CATEGORIES_LIST",
        payload: response.data?.data,
      });
    }
  };
};

export const CREATE_CATEGORY = (payload) => {
  let url = "";
  if (userData?.data?.role === 0) {
    url = `${baseUrl}/api/program_createCategory/${getUserId()}`;
  } else {
    url = `${baseUrl}/api/admin/program_createCategory/${getUserId()}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, {
        headers: getHeaders(),
      });
      if (response.data) {
        toast.success(response.data?.msg, toastCSS());
      }
      dispatch(GET_CATEGORIES());
    } catch (error) {
      toast.error(error.message.r, toastCSS());
    }
  };
};

export const UPDATE_CATEGORY = (id, payload) => {
  let url = `${baseUrl}/api/program_updateCategory/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.put(url, payload, {
        headers: getHeaders(),
      });
      if (response.error) {
        
      }
      dispatch(GET_PROGRAM_LIST());
    } catch (error) {
      console.log(error.message.replace(/\\/g, ""));
    }
  };
};

export const DELETE_PROGRAM_CATEGORY = (id) => {
  let url = `${baseUrl}/api/program_deleteCategory/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, {
        headers: getHeaders(),
      });
      toast.info(response.data?.msg, toastCSS());
      dispatch(GET_PROGRAM_LIST());
    } catch (error) {
      // alert(error.message).replace(/\\/g, "")
      toast.info(error.data?.msg, toastCSS());
    }
  };
};
