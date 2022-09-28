import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_BASE_URL;

const getUserId = () => {
  return localStorage.getItem("user_id");
};

const getHeaders = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "content-type": "application/json",
    },
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
    progress: undefined,
  };
};

export const GET_UN_VERIFIED_EMAILS = () => {
  let url = `${baseUrl}/api/unverifiedsendgriduserlist/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await axios.get(url, getHeaders());
      if (res.data?.success) {
        dispatch({
          type: "GET_UN_VERIFIED_EMAILS",
          payload: res.data?.data,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const APPROVE_UN_VERIFIED_EMAIL = (payload) => {
  let url = `${baseUrl}/api/approvesendgridverification/${getUserId()}/${payload?.schoolId
    }`;
  return async (dispatch) => {
    try {
      let res = await axios.put(url, { email: payload?.email }, getHeaders());
      if (res.data?.success) {
        toast.success(res.data?.msg, toastCSS());
        await window.open(payload?.link, "_blank");
        dispatch(GET_UN_VERIFIED_EMAILS());
      } else {
        toast.info(res.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const GET_CATEGORIES_EMAIL_FOR_ADMIN = () => {
  let url = `${baseUrl}/api/admin/email_system/category_list/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, getHeaders());
      if (response.data.success) {
        dispatch({
          type: "GET_CATEGORIES_EMAIL_FOR_ADMIN",
          payload: response.data?.data,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const CREATE_CATEGORIES_EMAIL_FOR_ADMIN = (payload) => {
  let url = `${baseUrl}/api/admin/email_system/addCategory/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, getHeaders());
      if (response.data?.success) {
        toast.success(response.data?.msg, toastCSS());
        dispatch(GET_CATEGORIES_EMAIL_FOR_ADMIN());
      } else {
        toast.error(response.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const CREATE_CATEGORIES_FOLDER_EMAIL_FOR_ADMIN = (payload, id) => {
  let url = `${baseUrl}/api/admin/email_system/create_folder/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, getHeaders());
      if (response.data?.success) {
        toast.success(response.data?.msg, toastCSS());
        dispatch(GET_CATEGORIES_EMAIL_FOR_ADMIN());
      } else {
        toast.error(response.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const UPDATE_CATEGORIES_EMAIL_FOR_ADMIN = (payload, id) => {
  let url = `${baseUrl}/api/admin/email_system/edit_category/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.put(url, payload, getHeaders());
      if (response.data?.success) {
        toast.success(response.data?.msg, toastCSS());
        dispatch(GET_CATEGORIES_EMAIL_FOR_ADMIN());
      } else {
        toast.error(response.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const UPDATE_CATEGORIES_FOLDER_EMAIL_FOR_ADMIN = (payload, id) => {
  let url = `${baseUrl}/api/admin/email_system/update_folder/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.put(url, payload, getHeaders());
      if (response.data?.success) {
        toast.success(response.data?.msg, toastCSS());
        dispatch(GET_CATEGORIES_EMAIL_FOR_ADMIN());
      } else {
        toast.error(response.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const DELETE_CATEGORY_EMAIL_FOR_ADMIN = (id) => {
  let url = `${baseUrl}/api/admin/email_system/remove_category/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, getHeaders());
      if (response?.data?.success) {
        toast.info(response?.data?.msg, toastCSS());
        dispatch(GET_CATEGORIES_EMAIL_FOR_ADMIN());
      } else {
        toast.error("Unable to fetch data!", toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const DELETE_CATEGORY_FOLDER_EMAIL_FOR_ADMIN = (id) => {
  let url = `${baseUrl}/api/admin/email_system/delete_folder/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, getHeaders());
      if (response?.data?.success) {
        toast.info(response?.data?.msg, toastCSS());
        dispatch(GET_CATEGORIES_EMAIL_FOR_ADMIN());
      } else {
        toast.error("Unable to fetch data!", toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const CREATE_COMPOSE_CATEGORIES_FOLDER_EMAIL_FOR_ADMIN = (payload, id) => {
  let url = `${baseUrl}/api/admin/email_compose/create_folder/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, getHeaders());
      if (response.data?.success) {
        toast.success(response.data?.msg, toastCSS());
        dispatch(GET_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN());
      } else {
        toast.error(response.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const GET_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN = () => {
  let url = `${baseUrl}/api/admin/email_compose/category_list/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, getHeaders());
      if (response.data.success) {
        dispatch({
          type: "GET_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN",
          payload: response.data?.data,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const UPDATE_COMPOSE_CATEGORIES_FOLDER_EMAIL_FOR_ADMIN = (payload, id) => {
  let url = `${baseUrl}/api/admin/email_compose/update_folder/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.put(url, payload, getHeaders());
      if (response.data?.success) {
        toast.success('Updated Successfully', toastCSS());
        dispatch(GET_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN());
      } else {
        toast.error(response.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const DELETE_COMPOSE_CATEGORY_FOLDER_EMAIL_FOR_ADMIN = (id) => {
  let url = `${baseUrl}/api/admin/email_compose/delete_folder/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, getHeaders());
      if (response?.data?.success) {
        toast.info(response?.data?.msg, toastCSS());
        dispatch(GET_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN());
      } else {
        toast.error("Unable to fetch data!", toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

// Nurturing______________________________________________________

export const GET_NURTURING_CATEGORIES_EMAIL_FOR_ADMIN = () => {
  let url = `${baseUrl}/api/admin/email_nurturing/category_list/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, getHeaders());
      if (response.data.success) {
        dispatch({
          type: "GET_NURTURING_CATEGORIES_EMAIL_FOR_ADMIN",
          payload: response.data?.data,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const CREATE_NURTURING_CATEGORIES_EMAIL_FOR_ADMIN = (payload) => {
  let url = `${baseUrl}/api/admin/email_nurturing/addCategory/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, getHeaders());
      if (response.data?.success) {
        toast.success(response.data?.msg, toastCSS());
        dispatch(GET_NURTURING_CATEGORIES_EMAIL_FOR_ADMIN());
      } else {
        toast.error(response.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const UPDATE_NURTURING_CATEGORIES_EMAIL_FOR_ADMIN = (payload, id) => {
  let url = `${baseUrl}/api/admin/email_nurturing/edit_category/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.put(url, payload, getHeaders());
      if (response.data?.success) {
        toast.success(response.data?.msg, toastCSS());
        dispatch(GET_NURTURING_CATEGORIES_EMAIL_FOR_ADMIN());
      } else {
        toast.error(response.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const DELETE_NURTURING_CATEGORY_EMAIL_FOR_ADMIN = (id) => {
  let url = `${baseUrl}/api/admin/email_nurturing/remove_category/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, getHeaders());
      if (response?.data?.success) {
        toast.info(response?.data?.msg, toastCSS());
        dispatch(GET_NURTURING_CATEGORIES_EMAIL_FOR_ADMIN());
      } else {
        toast.error("Unable to fetch data!", toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const CREATE_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN = (payload) => {
  let url = `${baseUrl}/api/admin/email_compose/addCategory/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, getHeaders());
      if (response.data?.success) {
        toast.success(response.data?.msg, toastCSS());
        dispatch(GET_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN());
      } else {
        toast.error(response.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const UPDATE_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN = (payload, id) => {
  let url = `${baseUrl}/api/admin/email_compose/edit_category/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.put(url, payload, getHeaders());
      if (response.data?.success) {
        toast.success(response.data?.msg, toastCSS());
        dispatch(GET_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN());
      } else {
        toast.error(response.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const DELETE_COMPOSE_CATEGORY_EMAIL_FOR_ADMIN = (id) => {
  let url = `${baseUrl}/api/admin/email_compose/remove_category/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, getHeaders());
      if (response?.data?.success) {
        toast.info(response?.data?.msg, toastCSS());
        dispatch(GET_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN());
      } else {
        toast.error("Unable to fetch data!", toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const ADD_TEMPLATE_TO_EMAIL_FOR_ADMIN_SYSTEM = (data, id) => {
  let url = `${baseUrl}/api/admin/email_system/add_template/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, data, {
        headers: getHeadersForFile(),
      });
      if (response.data?.success) {
        toast.info(response.data?.msg, toastCSS());
        dispatch(GET_CATEGORIES_EMAIL_FOR_ADMIN());
      } else {
        toast.info(response.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const UPDATE_TEMPLATE_TO_EMAIL_ADMIN = (payload, template_id, F_id) => {
  let url = `${baseUrl}/api/admin/email_system/update_template/${getUserId()}/${template_id}`;
  return async (dispatch) => {
    try {
      let response = await axios.put(url, payload, {
        headers: getHeadersForFile(),
      });
      if (response.data?.success) {
        toast.info(response?.data?.msg, toastCSS());
        dispatch(GET_CATEGORIES_EMAIL_FOR_ADMIN());
      } else {
        toast.info(response?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const DELETE_SCHEDULE_TEMPLATE_ADMIN = (templateId) => {
  let url = `${baseUrl}/api/admin/email_system/remove_template/${getUserId()}/${templateId}`;
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, getHeaders());
      if (response.data?.success) {
        toast.success(response?.data.msg, toastCSS());
        dispatch(GET_CATEGORIES_EMAIL_FOR_ADMIN());
      } else {
        toast.info(response?.data.msg, toastCSS());
      }

    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const ADD_TEMPLATE_TO_EMAIL_FOR_ADMIN_COMPOSE = (data, id) => {
  let url = `${baseUrl}/api/admin/email_compose/add_template/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, data, {
        headers: getHeadersForFile(),
      });
      if (response.data?.success) {
        toast.info(response.data?.msg, toastCSS());
        dispatch(GET_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN());
      } else {
        toast.info(response.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const UPDATE_TEMPLATE_TO_EMAIL_ADMIN_COMPOSE = (payload, template_id, F_id) => {
  let url = `${baseUrl}/api/admin/email_compose/update_template/${getUserId()}/${template_id}`;
  return async (dispatch) => {
    try {
      let response = await axios.put(url, payload, {
        headers: getHeadersForFile(),
      });
      if (response.data?.success) {
        toast.success(response?.data.msg, toastCSS());
        dispatch(GET_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN());
      } else {
        toast.info(response?.data.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const DELETE_SCHEDULE_TEMPLATE_ADMIN_COMPOSE = (templateId) => {
  let url = `${baseUrl}/api/admin/email_compose/remove_template/${getUserId()}/${templateId}`;
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, getHeaders());
      if (response.data?.success) {
        toast.success(response?.data.msg, toastCSS());
        dispatch(GET_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN());
      } else {
        toast.info(response?.data.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};