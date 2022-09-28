import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = process.env.REACT_APP_BASE_URL;
const toastCss = () => {
  return {
    position: "top-center",
    autoClose: 2000,
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
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "content-type": "application/json",
    },
  };
};
export const GET_SCHOOL_LIST_FOR_ADMIN = (pageNum) => {
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
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};
export const ADD_TEXT_CREDIT = (data, user_id) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${baseUrl}/api/admin/addCredit/${getUserId()}/${user_id}`,
        data,
        getHeaders()
      );
      if (response?.data?.msg) {
        toast.success(response?.data?.msg, toastCss());
        dispatch(GET_SCHOOL_LIST_FOR_ADMIN());
      } else {
        toast.info(response?.data?.msg, toastCss());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const EDIT_TEXT_CREDIT = (data, user_id, creditId) => {
  return async (dispatch) => {
    try {
      let response = await axios.put(
        `${baseUrl}/api/admin/addCredit/${getUserId()}/${user_id}/${creditId}`,
        data,
        getHeaders()
      );
      if (response?.data?.msg) {
        toast.success(response?.data?.msg, toastCss());
        dispatch(GET_SCHOOL_LIST_FOR_ADMIN());
      } else {
        toast.info(response?.data?.msg, toastCss());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const CREATE_TEXT_TEMPLATE_FOLDER_FOR_ADMIN = (task) => {
  return async (dispatch) => {
    try {
      let res = await axios.post(
        `${baseUrl}/api/admin/template_folder/create_folder/${getUserId()}`,
        { ...task },
        getHeaders()
      );
      if (res.data?.success) {
        toast.success(res.data?.msg, toastCss());
        dispatch(GET_TEMPLATE_FOLDER_LIST_FOR_ADMIN());
      } else {
        toast.info(res.data?.msg, toastCss());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const GET_TEMPLATE_FOLDER_LIST_FOR_ADMIN = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/admin/template_folder/read_folder/${getUserId()}`,
        getHeaders()
      );
      if (response.data && response.status === 200 && !response.data.msg) {
        dispatch({
          type: "GET_TEMPLATE_FOLDER_LIST_FOR_ADMIN",
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const CREATE_TEMPLATE_SUBFOLDER_FOR_ADMIN = (data, folderId) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${baseUrl}/api/admin/template_subfolder/create_subfolder/${getUserId()}/${
          folderId._id
        }`,
        data,
        getHeaders()
      );

      if (response.data?.success) {
        dispatch(GET_TEMPLATE_FOLDER_LIST_FOR_ADMIN());
        toast.success(response?.data?.msg, toastCss());
        return true;
      } else {
        toast.info(response?.data?.msg, toastCss());
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

// Edit Folder API Call
export const EDIT_TEXT_FOLDER_FOR_ADMIN = (data, folderId) => {
  return async (dispatch) => {
    try {
      let response = await axios.put(
        `${baseUrl}/api/admin/template_folder/edit_folder/${getUserId()}/${
          folderId._id
        }`,
        data,
        getHeaders()
      );
      if (response?.data?.success) {
        toast.success(response.data?.msg, toastCss());
        dispatch(GET_TEMPLATE_FOLDER_LIST_FOR_ADMIN());
        return true;
      } else {
        toast.info(response.data?.msg, toastCss());
        dispatch(GET_TEMPLATE_FOLDER_LIST_FOR_ADMIN());
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

// Edit Folder API Call
export const EDIT_TEXT_SUB_FOLDER_FOR_ADMIN = (data, folderId) => {
  return async (dispatch) => {
    try {
      let response = await axios.put(
        `${baseUrl}/api/admin/template_subfolder/edit_subfolder/${getUserId()}/${
          folderId._id
        }`,
        data,
        getHeaders()
      );
      if (response?.data?.success) {
        toast.success(response.data?.msg, toastCss());
        dispatch(GET_TEMPLATE_FOLDER_LIST_FOR_ADMIN());
        return true;
      } else {
        toast.info(response.data?.msg, toastCss());
        dispatch(GET_TEMPLATE_FOLDER_LIST_FOR_ADMIN());
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

export const REMOVE_FOLDER_TEXT_FOR_ADMIN = (data, folderId) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(
        `${baseUrl}/api/admin/template_folder/delete_folder/${getUserId()}/${
          folderId._id
        }`,
        getHeaders()
      );
      if (response?.data?.success) {
        dispatch(GET_TEMPLATE_FOLDER_LIST_FOR_ADMIN());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const REMOVE_TEXT_SUB_FOLDER_FOR_ADMIN = (data, folderId) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(
        `${baseUrl}/api/admin/template_subfolder/remove_subfolder/${getUserId()}/${
          folderId._id
        }`,
        getHeaders()
      );
      if (response.data && response.status === 200) {
        dispatch(GET_TEMPLATE_FOLDER_LIST_FOR_ADMIN());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const UPLOAD_TEMPLATE_FOR_ADMIN = (data, folderId, subFolderId) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${baseUrl}/api/admin/upload_template/${getUserId()}/${folderId}/${subFolderId}`,
        data,
        getHeaders()
      );
      if (response?.data?.msg) {
        toast.success(response?.data?.msg, toastCss());
        dispatch(GET_TEMPLATE_FOLDER_LIST_FOR_ADMIN());
      } else {
        toast.info(response?.data?.msg, toastCss());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const EDIT_TEMPLATE_FOR_ADMIN = (data, templateId, folderId) => {
  return async (dispatch) => {
    try {
      let response = await axios.put(
        `${baseUrl}/api/admin/upload_template/edit_template/${getUserId()}/${templateId}`,
        data,
        getHeaders()
      );
      if (response?.data?.msg) {
        toast.success(response?.data?.msg, toastCss());
        dispatch(GET_TEMPLATE_FOLDER_LIST_FOR_ADMIN());
      } else {
        toast.info(response?.data?.msg, toastCss());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const REMOVE_TEMPLATE_FOR_ADMIN = (templateId) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(
        `${baseUrl}/api/admin/upload_template/remove_template/${getUserId()}/${templateId}`,
        getHeaders()
      );
      if (response?.data?.msg) {
        toast.success(response?.data?.msg, toastCss());
        dispatch(GET_TEMPLATE_FOLDER_LIST_FOR_ADMIN());
      } else {
        toast.info(response?.data?.msg, toastCss());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const GET_TEMPLATES_LIST_FOR_ADMIN = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "GET_TEMPLATES_LIST_FOR_ADMIN",
      payload: data,
    });
  };
};
export const SET_FOLDER_ID = (rootFolderId, subFolderId) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_FOLDER_ID",
      rootFolderId: rootFolderId,
      subFolderId: subFolderId,
    });
  };
};
