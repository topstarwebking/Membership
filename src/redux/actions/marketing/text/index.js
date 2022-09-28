import axios from "axios";
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
export const CREATE_TEMPLATE_FOLDER = (task) => {
  return (dispatch) => {
    axios
      .post(
        `${baseUrl}/api/template_folder/create_folder/${getUserId()}`,
        { ...task },
        getHeaders()
      )
      .then(() => {
        dispatch(GET_TEMPLATE_FOLDER_LIST());
      });
  };
};

export const GET_TEMPLATE_FOLDER_LIST = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/template_folder/read_folder/${getUserId()}`,
        getHeaders()
      );
      if (response.data && response.status === 200 && !response.data.msg) {
        dispatch({
          type: "GET_TEMPLATE_LIST",
          payload: response.data,
        });
      } else {
        dispatch({
          type: "GET_TEMPLATE_LIST",
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "GET_TEMPLATE_LIST",
        payload: [],
      });
    }
  };
};
export const CREATE_TEMPLATE_SUB_FOLDER = (data, folderId) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${baseUrl}/api/template_subfolder/create_subfolder/${getUserId()}/${
          folderId._id
        }`,
        data,
        getHeaders()
      );
      if (response.data && response.status === 200) {
        dispatch(GET_TEMPLATE_FOLDER_LIST());
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

// Edit Folder API Call
export const EDIT_FOLDER = (data, folderId) => {
  return async (dispatch) => {
    try {
      let response = await axios.put(
        `${baseUrl}/api/template_folder/edit_folder/${getUserId()}/${
          folderId._id
        }`,
        data,
        getHeaders()
      );
      if (response.data && response.status === 200) {
        dispatch(GET_TEMPLATE_FOLDER_LIST());
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

// Edit Folder API Call
export const EDIT_TEMPLATE = (data, templateId, folderId) => {
  return async (dispatch) => {
    try {
      let response = await axios.put(
        `${baseUrl}/api/upload_template/edit_template/${getUserId()}/${templateId}`,
        data,
        getHeaders()
      );
      if (response.data && response.status === 200) {
        dispatch(LIST_TEMPLATES(folderId));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Edit Folder API Call
export const EDIT_SUB_FOLDER = (data, folderId) => {
  return async (dispatch) => {
    try {
      let response = await axios.put(
        `${baseUrl}/api/template_subfolder/edit_subfolder/${getUserId()}/${
          folderId._id
        }`,
        data,
        getHeaders()
      );
      if (response.data && response.status === 200) {
        dispatch(GET_TEMPLATE_FOLDER_LIST());
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};

// Remove folder API Call
export const REMOVE_SUB_FOLDER = (data, folderId) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(
        `${baseUrl}/api/template_subfolder/remove_subfolder/${getUserId()}/${
          folderId._id
        }`,
        getHeaders()
      );
      if (response.data && response.status === 200) {
        dispatch(GET_TEMPLATE_FOLDER_LIST());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Remove folder API Call
export const REMOVE_TEMPLATE = (templateId, folderId) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(
        `${baseUrl}/api/upload_template/remove_template/${getUserId()}/${templateId}`,
        getHeaders()
      );
      if (response.data && response.status === 200) {
        dispatch(LIST_TEMPLATES(folderId));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Remove folder API Call
export const REMOVE_FOLDER = (data, folderId) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(
        `${baseUrl}/api/template_folder/delete_folder/${getUserId()}/${
          folderId._id
        }`,
        getHeaders()
      );
      if (response.data && response.status === 200) {
        dispatch(GET_TEMPLATE_FOLDER_LIST());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const TEMPLATES_LOADING = (isLoading) => {
  return async (dispatch) => {
    dispatch({
      type: "GET_TEMPLATES_LOADING",
      payload: isLoading,
    });
  };
};

export const SET_FOLDER_ID = (rootFolderId, subFolderId) => {
  return async (dispatch) => {
    dispatch({
      type: "GET_FOLDER_ID",
      rootFolderId: rootFolderId,
      subFolderId: subFolderId,
    });
  };
};


// List Documents API Calltemplate_folder/create_folde
export const LIST_TEMPLATES = (folderId) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/template_subfolder/list_template/${getUserId()}/${folderId}`,
        getHeaders()
      );
      if (response.data && response.status === 200 && !response.data.msg) {
        dispatch({
          type: "GET_TEMPLATES_LOADING",
          payload: false,
        });
        dispatch({
          type: "GET_TEMPLATES_LIST",
          payload: response.data,
        });
      } else {
        dispatch({
          type: "GET_TEMPLATES_LOADING",
          payload: false,
        });
        dispatch({
          type: "GET_TEMPLATES_LIST",
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "GET_TEMPLATES_LIST",
        payload: [],
      });
      dispatch({
        type: "GET_TEMPLATES_LOADING",
        payload: false,
      });
    }
  };
};

// Upload template
export const UPLOAD_TEMPLATE = (data, folderId, subFolderId) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${baseUrl}/api/upload_template/${getUserId()}/${folderId}/${subFolderId}`,
        data,
        getHeaders()
      );
      console.log("Response for uploaded template: ", response);
      if (response.data && response.status === 200) {
        dispatch(LIST_TEMPLATES(subFolderId));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const UPDATE_TEPLATE = (data, id,subFolderId) => {
  return async (dispatch) => {
    try {
      let response = await axios.put(
        `${baseUrl}/api/upload_template/edit_template/${getUserId()}/${id}`,
        data,
        getHeaders()
      );
      console.log("Response for uploaded template: ", response);
      if (response.data && response.status === 200) {
        dispatch(LIST_TEMPLATES(subFolderId));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const SUB_FOLDER_DATA = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "SUB_FOLDER_DATA",
      payload: data,
    });
  };
};

export const MAIN_FOLDER_DATA = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "MAIN_FOLDER_DATA",
      payload: data,
    });
  };
};