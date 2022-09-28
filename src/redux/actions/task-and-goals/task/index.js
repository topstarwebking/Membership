import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = process.env.REACT_APP_BASE_URL;
const userData = JSON.parse(localStorage.getItem("userdata"));
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

// export const TASK_AND_GOALS_SEARCH_FOR_TASK = (searching) => {

//   return (dispatch) => {
//     dispatch({
//       type: "TASK_AND_GOALS_SEARCH_FOR_TASK",
//       searching: searching
//     });
//   };
// };

export const CREATE_TASK_FOLDER = (info) => {
  return async (dispatch) => {
    let url = `${baseUrl}/api/task_folder/create_folder/${getUserId()}`;
    try {
      let response = await axios.post(url, info, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        dispatch(GET_TASK_FOLDER_LIST());
        toast.success(response.data.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error?.massage.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const GET_TASK_FOLDER_LIST = () => {
  return async (dispatch) => {
    let url = `${baseUrl}/api/task_folder/read_folder/${getUserId()}`;
    try {
      let response = await axios.get(url, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        dispatch({
          type: "GET_TASK_FOLDER_LIST",
          payload: response.data.data,
        });
        return response.data.data
      }
    } catch (error) {
      toast.error(error?.massage.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const TASK_TO_DISPLAY_TO_USER = (info) => {
  return async (dispatch) => {
    try {
      if (info) {
        dispatch({
          type: "TASK_TO_DISPLAY_TO_USER",
          payload: info,
        });
      }
    } catch (error) {
      toast.error(error?.massage.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const GET_TODAY_TASK_LIST = () => {
  return async (dispatch) => {
    let url = `${baseUrl}/api/tasks/today_tasks/${getUserId()}`;
    try {
      let response = await axios.get(url, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        dispatch({
          type: "TASK_TO_DISPLAY_TO_USER",
          payload: response?.data?.data,
        });
        toast.success(response.data.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error?.massage.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const CREATE_TASK_SUB_FOLDER = (info, folderId) => {
  return async (dispatch) => {
    let url = `${baseUrl}/api/task_subfolder/create_subfolder/${getUserId()}/${folderId.folderId}`;
    try {
      let response = await axios.post(url, info, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        dispatch(GET_TASK_FOLDER_LIST());
      }
      toast.success(response.data.msg, toastCSS());

    } catch (error) {
      // toast.error(error?.massage.replace(/\\/g, ""), toastCSS());
      console.log(error)
    }
  };
};

export const ADD_BREAD_CRUMB = (info) => {
  return async (dispatch) => {
    try {
      if (info) {
        dispatch({
          type: "ADD_BREAD_CRUMB",
          payload: [info],
        });
      }
    } catch (error) {
      toast.error(error?.massage.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const CREATE_TASK = (info, mainFolderId, subFolderId) => {
  return async (dispatch) => {
    let url = `${baseUrl}/api/tasks/add_tasks/${getUserId()}/${subFolderId}`;
    try {
      let response = await axios.post(url, info, {
        headers: getHeaders(),
      });
      if (response?.data?.success && response.status === 200) {
        let newDataStatus = await dispatch(GET_TASK_FOLDER_LIST());
        let findMainFolder = await newDataStatus?.filter((item) => item?._id === mainFolderId)
        if (findMainFolder?.length > 0) {
          let activeTask = findMainFolder[0]?.subFolder?.filter((item) => item?._id === subFolderId)
          if (activeTask?.length > 0) {
            dispatch(TASK_TO_DISPLAY_TO_USER(activeTask[0]?.tasks));
            toast.success("Task Added Successfully", toastCSS());
            return true;
          }
        }
      } else {
        toast.error("something went wrong, please try again!", toastCSS());
        return false;
      }
    } catch (error) {
      toast.error(error?.massage.replace(/\\/g, ""), toastCSS());
    }
  };
};
// FILTER_TASK_STATUS_OR_TIME
export const FILTER_TASK_STATUS_OR_TIME = (payload) => {
  return async (dispatch) => {
    let url = `${baseUrl}/api/tasks/filter/${getUserId()}`;
    try {
      let res = await axios.post(url, payload, { headers: getHeaders() });
      if (res?.data?.success) {
        dispatch({ payload: res.data?.data, type: 'FILTER_TASK_STATUS_OR_TIME' })
        return true;
      } else {
        toast.error("something went wrong, please try again!", toastCSS());
        return false;
      }
    } catch (error) {
      toast.error(error?.massage.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const CREATE_TASK_WITHOUT_GONE_INTO_FOLDER = (info, subFolderId) => {
  return async (dispatch) => {
    let url = `${baseUrl}/api/tasks/add_tasks/${getUserId()}/${subFolderId}`;
    try {
      let response = await axios.post(url, info, {
        headers: getHeaders(),
      });
      if (response?.data?.success && response.status === 200) {
        await dispatch(GET_TODAY_TASK_LIST());
        toast.success("Task Added Successfully", toastCSS());
        return true;
      } else {
        toast.error("something went wrong, please try again!", toastCSS());
        return false;
      }
    } catch (error) {
      toast.error(error?.massage.replace(/\\/g, ""), toastCSS());
    }
  };
};

// export const GET_ACTIVE_SUB_LIST = (activeSubList) => {
//   return (dispatch) => {
//     dispatch({ type: "GET_ACTIVE_SUB_LIST", data: activeSubList });
//   };
// };

// Edit Folder API Call
export const EDIT_FOLDER = (data, folderId) => {
  return async (dispatch) => {
    try {
      let response = await axios.put(
        `${baseUrl}/api/task_folder/update_Folder/${getUserId()}/${folderId._id
        }`,
        data,
        {
          headers: getHeaders(),
        }
      );
      if (response.data && response.status === 200) {
        dispatch(GET_TASK_FOLDER_LIST());
        toast.success(response.data.msg, toastCSS());
        return true;
      }

    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

// Edit Task API Call
export const EDIT_TASK = (data, task, mainFolderId, subFolderId) => {
  // console.log(data)
  return async (dispatch) => {
    try {
      let response = await axios.put(
        `${baseUrl}/api/tasks/update_tasks/${getUserId()}/${task._id
        }`,
        data,
        {
          headers: getHeaders(),
        }
      );
      if (response.data && response.status === 200) {
        let newDataStatus = await dispatch(GET_TASK_FOLDER_LIST());
        let findMainFolder = await newDataStatus?.filter((item) => item?._id === mainFolderId)
        if (findMainFolder?.length > 0) {
          let activeTask = findMainFolder[0]?.subFolder?.filter((item) => item?._id === subFolderId)
          if (activeTask?.length > 0) {
            dispatch(TASK_TO_DISPLAY_TO_USER(activeTask[0]?.tasks))
            toast.success(response.data.msg, toastCSS());
          }
        }
        return true;
      }

    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

export const EDIT_TASK_WITHOUT_GONE_INTO_FOLDER = (data, task) => {
  // console.log(data)
  return async (dispatch) => {
    try {
      let response = await axios.put(
        `${baseUrl}/api/tasks/update_tasks/${getUserId()}/${task._id
        }`,
        data,
        {
          headers: getHeaders(),
        }
      );
      if (response?.data?.success && response.status === 200) {
        await dispatch(GET_TODAY_TASK_LIST());
        toast.success(response.data.msg, toastCSS());
        return true;
      } else {
        toast.error("something went wrong, please try again!", toastCSS());
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

// Edit Folder API Call
export const EDIT_SUB_FOLDER = (data, folderId) => {
  return async (dispatch) => {
    try {
      let response = await axios.put(
        `${baseUrl}/api/task_subfolder/update_subfolder/${getUserId()}/${folderId._id
        }`,
        data,
        {
          headers: getHeaders(),
        }
      );
      if (response.data && response.status === 200) {
        dispatch(GET_TASK_FOLDER_LIST());
        toast.success(response.data.msg, toastCSS());
        return true;
      }

    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

// Remove folder API Call
export const REMOVE_FOLDER = (folderId) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(
        `${baseUrl}/api/task_folder/delete_folder/${getUserId()}/${folderId._id
        }`,
        {
          headers: getHeaders(),
        }
      );
      if (response.data && response.status === 200) {
        dispatch(GET_TASK_FOLDER_LIST());
      }
      toast.info(response.data.msg, toastCSS());
    } catch (error) {
      console.log(error);
    }
  };
};

// Remove folder API Call
export const REMOVE_SUB_FOLDER = (folderId) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(
        `${baseUrl}/api/task_subfolder/delete_subfolder/${getUserId()}/${folderId._id
        }`,
        {
          headers: getHeaders(),
        }
      );
      if (response.data && response.status === 200) {
        dispatch(GET_TASK_FOLDER_LIST());
      }
      toast.info(response.data.msg, toastCSS());
    } catch (error) {
      console.log(error);
    }
  };
};

export const REMOVE_TASK_WITHOUT_GONE_INTO_FOLDER = (taskId) => {
  return async (dispatch) => {
    // console.log(taskId)
    try {
      let url = `${baseUrl}/api/tasks/delete_tasks/${getUserId()}/${taskId}`;
      let response = await axios.delete(url, {
        headers: getHeaders(),
      });
      if (response?.data?.success && response.status === 200) {
        await dispatch(GET_TODAY_TASK_LIST());
        toast.success(response.data.msg, toastCSS());
        return true;
      } else {
        toast.error("something went wrong, please try again!", toastCSS());
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const REMOVE_TASK = (taskId, mainFolderId, subFolderId) => {
  return async (dispatch) => {
    try {
      let url = `${baseUrl}/api/tasks/delete_tasks/${getUserId()}/${taskId}`;
      let response = await axios.delete(url, {
        headers: getHeaders(),
      });
      if (response.data && response.status === 200) {
        let newDataStatus = await dispatch(GET_TASK_FOLDER_LIST());
        let findMainFolder = await newDataStatus?.filter((item) => item?._id === mainFolderId)
        if (findMainFolder?.length > 0) {
          let activeTask = findMainFolder[0]?.subFolder?.filter((item) => item?._id === subFolderId)
          if (activeTask?.length > 0) {
            dispatch(TASK_TO_DISPLAY_TO_USER(activeTask[0]?.tasks))
            toast.info(response.data.msg, toastCSS());
          }
        }
      }

    } catch (error) {
      console.log(error);
    }
  };
};

// Upload image
export const UPLOAD_PROOF_IMAGES = (data, taskId, mainFolderId, subFolderId) => {
  return async (dispatch) => {
    try {
      let response = await axios.put(
        `${baseUrl}/api/tasks/update_tasks/${getUserId()}/${taskId}`,
        data,
        {
          headers: getHeaders(),
        }
      );
      if (response.data && response.status === 200) {
        let newDataStatus = await dispatch(GET_TASK_FOLDER_LIST());
        let findMainFolder = await newDataStatus?.filter((item) => item?._id === mainFolderId)
        if (findMainFolder?.length > 0) {
          let activeTask = findMainFolder[0]?.subFolder?.filter((item) => item?._id === subFolderId)
          if (activeTask?.length > 0) {
            dispatch(TASK_TO_DISPLAY_TO_USER(activeTask[0]?.tasks))
            toast.success(response.data.msg, toastCSS());
          }
        }
        return true;
      } else {
        return false
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

// export const SUB_FOLDER_DATA = (data) => {
//   return async (dispatch) => {
//     dispatch({
//       type: "SUB_FOLDER_DATA",
//       payload: data,
//     });
//   };
// };

export const MAIN_FOLDER_DATA = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "MAIN_FOLDER_DATA",
      payload: data,
    });
  };
};

// Delete sub-user task


