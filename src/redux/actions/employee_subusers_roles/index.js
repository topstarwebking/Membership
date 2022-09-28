import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = process.env.REACT_APP_BASE_URL;
const userData = JSON.parse(localStorage.getItem("userdata"));

const getUserId = () => {
  return localStorage.getItem("user_id");
};

const getuserdata = () => {
  return JSON.parse(localStorage.getItem("userdata"))?.data;
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

export const GET_EMPLOYEE_ROLES_LIST = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/roles-list/info/${getUserId()}`,
        {
          headers: getHeaders(),
        }
      );
      let EmployeeRolesResult = response?.data;
      if (EmployeeRolesResult?.success) {
        let RolesArray = EmployeeRolesResult.data;
        dispatch({
          type: "GET_EMPLOYEE_ROLES_LIST",
          payload: RolesArray,
        });
      } else {
        console.log(EmployeeRolesResult?.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const CREATE_ROLE_LIST = (Info) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${baseUrl}/api/roles-list/create/${getUserId()}`,
        {
          ...Info,
          userId: getUserId(),
          default_location:
            getuserdata()?.default_locationData[0]?.locationName,
        },
        {
          headers: getHeaders(),
        }
      );
      if (response?.data?.success) {
        dispatch(GET_EMPLOYEE_ROLES_LIST());
        return { msg: "done", success: true };
      } else {
        toast.error(response?.data?.msg, toastCSS());
        return { msg: response?.data?.msg, success: false };
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const UPDATE_ROLE_LIST = (Info, edit_id) => {
  return async (dispatch) => {
    try {
      let response = await axios.put(
        `${baseUrl}/api/roles-list/update/${edit_id}`,
        Info,
        {
          headers: getHeaders(),
        }
      );

      if (response?.data?.success) {
        dispatch(GET_EMPLOYEE_ROLES_LIST());
        return { msg: "done", success: true };
      } else {
        toast.error(response?.data?.msg, toastCSS());
        return { msg: response?.data?.msg, success: false };
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const CREATE_SUB_USER = (Info, role_id) => {
  return async (dispatch) => {
    try {
      Info.append("userId", getUserId());
      Info.append("twilio", userData?.data?.twilio);
      // Info = Object.assign({}, Info, { userId: getUserId() });
      let response = await axios.post(
        `${baseUrl}/api/sub-users/permissions/create/${getUserId()}`,
        Info,
        {
          headers: getHeaders(),
        }
      );
      if (response?.data?.success) {
        dispatch(GET_SUB_USERS_LIST(role_id));
        return { msg: "done", success: true };
      } else {
        toast.error(response?.data?.msg, toastCSS());
        return { msg: response?.data?.msg, success: false };
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// update sub-user info
export const UPDATE_SUB_USER = (Info, edit_id, role_id) => {
  return async (dispatch) => {
    try {
      Object.keys(Info).forEach((key) => {
        if (Info[key] === undefined) {
          delete Info[key];
        }
      });
      let fdata = new FormData();
      for (var k in Info) {
        fdata.append(k, Info[k]);
      }
      let response = await axios.put(
        `${baseUrl}/api/sub-users/permissions/update/${edit_id}`,
        fdata,
        {
          headers: getHeaders(),
        }
      );
      if (response?.data?.success) {
        dispatch(GET_SUB_USERS_LIST(role_id));
        return { msg: "done", success: true };
      } else {
        toast.error(response?.data?.msg, toastCSS());
        return { msg: response?.data?.msg, success: false };
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const DELETE_SUB_USER = (user_id, role_id) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(
        `${baseUrl}/api/sub-users/permissions/${user_id}`,
        {
          headers: getHeaders(),
        }
      );

      if (response?.data?.success) {
        dispatch(GET_SUB_USERS_LIST(role_id));
        return { msg: "done", success: true };
      } else {
        toast.error(response?.data?.msg, toastCSS());
        return { msg: response?.data?.msg, success: false };
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//set rol Id
export const STORE_ROLE_ID = (ID) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "STORE_ROLE_ID",
        payload: ID,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// Get sub-users list by UserId;

export const GET_SUB_USERS_LIST = (role_id) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/sub-users/permissions/${getUserId()}/role_id/${role_id}`,
        {
          headers: getHeaders(),
        }
      );
      let SubUsersResult = response?.data;
      if (SubUsersResult?.success) {
        let SubUsersArray = SubUsersResult.data;
        dispatch({
          type: "GET_SUB_USERS_LIST",
          payload: SubUsersArray,
        });
      } else {
        toast.error(response?.data?.msg, toastCSS());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Delete role info By role id
export const DELETE_ROLE = (role_id) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(
        `${baseUrl}/api/roles-list/delete/${role_id}`,
        {
          headers: getHeaders(),
        }
      );
      if (response?.data?.success) {
        dispatch(GET_EMPLOYEE_ROLES_LIST());
        return { msg: "done", success: true };
      } else {
        toast.error(response?.data?.msg, toastCSS());
        return { msg: response?.data?.msg, success: false };
      }
    } catch (error) {
      toast.error(error.message, toastCSS());
    }
  };
};

// Get Total of user count or users Info
export const GET_ROLE_LIST_USERS_INFO = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/sub-users/role/aggregate/${getUserId()}`,
        {
          headers: getHeaders(),
        }
      );
      let SubRoleListUserInfo = response?.data;
      if (SubRoleListUserInfo?.success) {
        let SubUsersArray = SubRoleListUserInfo.data;
        dispatch({
          type: "ROLE_LIST_USERS_INFO",
          payload: SubUsersArray,
        });
      } else {
        toast.error(response?.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message, toastCSS());
    }
  };
};

export const GET_SUB_USERS_ASSIGNEE = () => {
  return async (dispatch) => {
    let url = `${baseUrl}/api/sub-users/permissions/${getUserId()}`;
    try {
      let response = await axios.get(url, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        dispatch({
          type: "GET_SUB_USERS_ASSIGNEE",
          payload: response.data.data,
        });
      }
    } catch (error) {
      toast.error(error?.massage.replace(/\\/g, ""), toastCSS());
    }
  };
};
