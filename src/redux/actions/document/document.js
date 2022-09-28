import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = process.env.REACT_APP_BASE_URL;
const userData = JSON.parse(localStorage.getItem("userdata"));

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

const getHeadersForFile = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "content-type": "multipart/form-data",
  };
};
export const CREATE_DOCUMENT_FOLDER = (task) => {
  let url = "";
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/document_folder/create_folder/${getUserId()}`;
  } else {
    url = `${baseUrl}/api/document_folder/create_folder/${getUserId()}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.post(
        url,
        { ...task },
        {
          headers: getHeaders(),
        }
      );
      if (response?.data?.success) {
        dispatch(GET_DOCUMENT_FOLDER_LIST());
        toast.success(response?.data.msg.replace(/\\/g, ""), toastCSS());
      } else {
        dispatch(GET_DOCUMENT_FOLDER_LIST());
        toast.error(response?.msg.replace(/\\/g, ""), toastCSS());
      }
    } catch (error) {
      toast.error(error?.massage.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const CREATE_TUTORIAL_FOLDER = (task) => {
  let url = "";
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/tutorial/create_folder/${getUserId()}`;
  } else {
    url = `${baseUrl}/api/tutorial/create_folder/${getUserId()}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.post(
        url,
        { ...task },
        {
          headers: getHeaders(),
        }
      );
      if (response?.data?.success) {
        dispatch(GET_TUTORIAL_FOLDER_LIST());
        toast.success(response?.data.msg.replace(/\\/g, ""), toastCSS());
      } else {
        dispatch(GET_TUTORIAL_FOLDER_LIST());
        toast.error(response?.msg.replace(/\\/g, ""), toastCSS());
      }
    } catch (error) {
      toast.error(error?.massage.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const GET_DOCUMENT_FOLDER_LIST = () => {
  let url = "";
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/document_folder/read_folder/${getUserId()}`;
  } else {
    url = `${baseUrl}/api/document_folder/read_folder/${getUserId()}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.get(url, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        dispatch({
          type: "GET_DOCUMENT_FOLDER_LIST",
          payload: response.data.data,
        });
      }
    } catch (error) {
      toast.error(error?.massage.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const GET_TUTORIAL_FOLDER_LIST = () => {
  let url = "";
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/tutorial/folder_list/${getUserId()}`;
  } else {
    url = `${baseUrl}/api/tutorial/folder_list/${getUserId()}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.get(url, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        dispatch({
          type: "GET_TUTORIAL_FOLDER_LIST",
          payload: response.data.data,
        });
      }
    } catch (error) {
      toast.error(error?.massage , toastCSS());
    }
  };
};



export const CREATE_DOCUMENT_SUB_FOLDER = (data, folderId) => {
  let url = "";
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/document_subfolder/create_subfolder/${getUserId()}/${
      folderId._id
    }`;
  } else {
    url = `${baseUrl}/api/document_subfolder/create_subfolder/${getUserId()}/${
      folderId._id
    }`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.post(url, data, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        toast.success((response?.data?.msg).replace(/\\/g, ""), toastCSS());
        dispatch(GET_DOCUMENT_FOLDER_LIST());
      } else {
        toast.error((response?.data?.msg).replace(/\\/g, ""), toastCSS());
      }
    } catch (error) {
      toast.error(error.massage.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const CREATE_TUTORIAL_SUB_FOLDER = (data, folderId) => {
  let url = "";
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/tutorial/create_subfolder/${getUserId()}/${
      folderId._id
    }`;
  } else {
    url = `${baseUrl}/api/tutorial/create_subfolder/${getUserId()}/${
      folderId._id
    }`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.post(url, data, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        toast.success((response?.data?.msg).replace(/\\/g, ""), toastCSS());
        dispatch(GET_TUTORIAL_FOLDER_LIST());
      } else {
        toast.error((response?.data?.msg).replace(/\\/g, ""), toastCSS());
      }
    } catch (error) {
      toast.error(error.massage.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const EDIT_FOLDER = (data, folderId) => {
  let url = "";
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/document_folder/edit_folder/${getUserId()}/${
      folderId._id
    }`;
  } else {
    url = `${baseUrl}/api/document_folder/edit_folder/${getUserId()}/${
      folderId._id
    }`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.put(url, data, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        dispatch(GET_DOCUMENT_FOLDER_LIST());
        toast.success((response?.data?.msg).replace(/\\/g, ""), toastCSS());
      } else {
        toast.error((response?.data).replace(/\\/g, ""), toastCSS());
      }
    } catch (error) {
      toast.error(error?.massage.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const EDIT_TUTORIAL_FOLDER = (data, folderId) => {
  let url = "";
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/tutorial/update_Folder/${getUserId()}/${
      folderId._id
    }`;
  } else {
    url = `${baseUrl}/api/tutorial/update_Folder/${getUserId()}/${
      folderId._id
    }`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.put(url, data, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        dispatch(GET_TUTORIAL_FOLDER_LIST());
        toast.success((response?.data?.msg).replace(/\\/g, ""), toastCSS());
      } else {
        toast.error((response?.data).replace(/\\/g, ""), toastCSS());
      }
    } catch (error) {
      toast.error(error?.massage.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const EDIT_SUB_FOLDER = (data, folderId) => {
  let url = "";
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/document_subfolder/edit_subfolder/${getUserId()}/${
      folderId._id
    }`;
  } else {
    url = `${baseUrl}/api/document_subfolder/edit_subfolder/${getUserId()}/${
      folderId._id
    }`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.put(url, data, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        dispatch(GET_DOCUMENT_FOLDER_LIST());
        toast.success(response.data.msg.replace(/\\/g, ""), toastCSS());
      } else {
        toast.info(response.msg.replace(/\\/g, ""), toastCSS());
      }
    } catch (error) {
      toast.error(error?.massage.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const EDIT_TUTORIAL_SUB_FOLDER = (data, folderId) => {
  let url = "";
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/tutorial/update_subfolder/${getUserId()}/${
      folderId._id
    }`;
  } else {
    url = `${baseUrl}/api/tutorial/update_subfolder/${getUserId()}/${
      folderId._id
    }`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.put(url, data, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        dispatch(GET_DOCUMENT_FOLDER_LIST());
        toast.success(response.data.msg.replace(/\\/g, ""), toastCSS());
      } else {
        toast.info(response.msg.replace(/\\/g, ""), toastCSS());
      }
    } catch (error) {
      toast.error(error?.massage.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const REMOVE_SUB_FOLDER = (folderId) => {
  let url = "";
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/document_subfolder/remove_subfolder/${getUserId()}/${folderId}`;
  } else {
    url = `${baseUrl}/api/document_subfolder/remove_subfolder/${getUserId()}/${folderId}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        toast.success(response.data.msg, toastCSS());
        dispatch(GET_DOCUMENT_FOLDER_LIST());
      } else {
        toast.success(response.data.msg, toastCSS());
      }
    } catch (error) {
      toast.error("unable to remove", toastCSS());
    }
  };
};

export const REMOVE_FOLDER = (folderId) => {
  let url = "";
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/document_folder/delete_folder/${getUserId()}/${folderId}`;
  } else {
    url = `${baseUrl}/api/document_folder/delete_folder/${getUserId()}/${folderId}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        dispatch(GET_DOCUMENT_FOLDER_LIST());
        toast.success(response.data.msg.replace(/\\/g, ""), toastCSS());
      }
    } catch (error) {
      toast.error(error?.massage.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const REMOVE_FOLDER_TUTORIAL = (folderId) => {
  let url = "";
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/tutorial/delete_Folder/${getUserId()}/${folderId}`;
  } else {
    url = `${baseUrl}/api/tutorial/delete_Folder/${getUserId()}/${folderId}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        dispatch(GET_TUTORIAL_FOLDER_LIST());
        toast.success(response.data.msg.replace(/\\/g, ""), toastCSS());
      }
    } catch (error) {
      toast.error(error?.massage.replace(/\\/g, ""), toastCSS());
    }
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
export const UPLOAD_DOCUMENT = (data, subFolderId) => {
  let formData = new FormData();
  let dataEntries = Object.entries(data);
  dataEntries.map((v, i) => {
    formData.append(v[0], v[1]);
    return v;
  });
  let url = "";
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/upload_document/${getUserId()}/${null}/${subFolderId}`;
  } else {
    url = `${baseUrl}/api/upload_document/${getUserId()}/${null}/${subFolderId}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.post(url, formData, {
        headers: getHeadersForFile(),
      });
      if (response?.data?.success) {
        toast.success(response?.data.msg.replace(/\\/g, ""), toastCSS());
        dispatch(GET_DOCUMENT_FOLDER_LIST());
        return true;
      } else {
        toast.info(response?.data.msg.replace(/\\/g, ""), toastCSS());
        return true;
      }
    } catch (error) {
      toast.error(error?.massage.replace(/\\/g, ""), toastCSS());
      return true;
    }
  };
};

export const CREATE_TUTORIALS = (data, folderId) => {
  let url = "";
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/tutorial/add_tutorial/${getUserId()}/${folderId}`;
  } else {
    url = `${baseUrl}/api/tutorial/add_tutorial/${getUserId()}/${folderId}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.post(url, data, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        toast.success((response?.data?.msg).replace(/\\/g, ""), toastCSS());
        dispatch(GET_TUTORIAL_FOLDER_LIST());
      } else {
        toast.error((response?.data?.msg).replace(/\\/g, ""), toastCSS());
      }
    } catch (error) {
      toast.error(error.massage.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const REMOVE_DOCUMENT = (folderId) => {
  let url = "";
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/remove_upload_document/${getUserId()}/${folderId}`;
  } else {
    url = `${baseUrl}/api/remove_upload_document/${getUserId()}/${folderId}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        toast.success(response?.data.msg.replace(/\\/g, ""), toastCSS());
        dispatch(GET_DOCUMENT_FOLDER_LIST());
      } else {
        toast.info(response?.msg.replace(/\\/g, ""), toastCSS());
        dispatch(GET_DOCUMENT_FOLDER_LIST());
      }
    } catch (error) {
      toast.error("Somthing went wrong", toastCSS());
    }
  };
};

export const REMOVE_TUTORIAL = (folderId) => {
  let url = "";
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/tutorial/delete_tutorial/${getUserId()}/${folderId}`;
  } else {
    url = `${baseUrl}/api/tutorial/delete_tutorial/${getUserId()}/${folderId}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        toast.success(response?.data.msg.replace(/\\/g, ""), toastCSS());
        dispatch(GET_TUTORIAL_FOLDER_LIST());
      } else {
        toast.info(response?.msg.replace(/\\/g, ""), toastCSS());
        dispatch(GET_TUTORIAL_FOLDER_LIST());
      }
    } catch (error) {
      toast.error("Somthing went wrong", toastCSS());
    }
  };
};

export const EDIT_DOCUMENT = (data, docID) => {
  let formData = new FormData();
  let dataEntries = Object.entries(data);
  dataEntries.map((v, i) => {
    formData.append(v[0], v[1]);
    return v;
  });
  let url = "";
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/update_upload_document/${getUserId()}/${docID}`;
  } else {
    url = `${baseUrl}/api/update_upload_document/${getUserId()}/${docID}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.put(url, formData, {
        headers: getHeadersForFile(),
      });
      if (response?.data?.success) {
        if (data?.new_SubfolderId !== undefined) {
          toast.success("Document Move  successfully ", toastCSS());
        } else {
          toast.success("Document rename successfully", toastCSS());
        }
        dispatch(GET_DOCUMENT_FOLDER_LIST());
        return true;
      } else {
        toast.info(response?.data.msg.replace(/\\/g, ""), toastCSS());
        return true;
      }
    } catch (error) {
      toast.error(error?.massage.replace(/\\/g, ""), toastCSS());
      return true;
    }
  };
};

export const MERGE_DOCOMENT = (isrecommendedOrregistered, data, studentId) => {
  let payload = {};
  if (isrecommendedOrregistered === "student") {
    payload = {
      docBody: data,
      studentsIds: studentId,
    };
  } else if (isrecommendedOrregistered === "recommended") {
    payload = {
      docBody: data,
      recommendedId: studentId,
    };
  } else {
    payload = {
      docBody: data,
      registeredIds: studentId,
    };
  }
  let url =
    isrecommendedOrregistered === "student"
      ? `${baseUrl}/api/${isrecommendedOrregistered}/mergeDocs/${getUserId()}`
      : `${baseUrl}/api/${isrecommendedOrregistered}/mergeDocs/${getUserId()}`;

  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, { headers: getHeaders() });
      if (response?.data?.success) {
        dispatch({
          type: "MERGE_DOCOMENT",
          payload: response.data?.data,
        });

        return true;
      } else {
        toast.info(response?.data?.msg.replace(/\\/g, ""), toastCSS());
      }
    } catch (error) {
      toast.error(error?.massage?.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const UPLOAD_DOCUMENT_IN_FOLDER = (data, FolderId) => {
  let formData = new FormData();
  let dataEntries = Object.entries(data);
  dataEntries.map((v, i) => {
    formData.append(v[0], v[1]);
    return v;
  });
  let url = "";
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/upload_document/${getUserId()}/${FolderId}/${null}`;
  } else {
    url = `${baseUrl}/api/upload_document/${getUserId()}/${FolderId}/${null}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.post(url, formData, {
        headers: getHeadersForFile(),
      });
      if (response?.data?.success) {
        toast.success(response?.data.msg.replace(/\\/g, ""), toastCSS());
        dispatch(GET_DOCUMENT_FOLDER_LIST());
        return true;
      } else {
        toast.info(response?.data.msg.replace(/\\/g, ""), toastCSS());
        return true;
      }
    } catch (error) {
      toast.error(error?.massage.replace(/\\/g, ""), toastCSS());
      return true;
    }
  };
};

export const EDIT_DOCUMENT_IN_FOLDER = (data, docID) => {
  let formData = new FormData();
  let dataEntries = Object.entries(data);
  dataEntries.map((v, i) => {
    formData.append(v[0], v[1]);
    return v;
  });
  let url = "";
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/update_upload_document/${getUserId()}/${docID}`;
  } else {
    url = `${baseUrl}/api/update_upload_document/${getUserId()}/${docID}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.put(url, formData, {
        headers: getHeadersForFile(),
      });
      if (response?.data?.success) {
        toast.success(response?.data.msg.replace(/\\/g, ""), toastCSS());
        dispatch(GET_DOCUMENT_FOLDER_LIST());
        return true;
      } else {
        toast.info(response?.data.msg.replace(/\\/g, ""), toastCSS());
        return true;
      }
    } catch (error) {
      toast.error(error?.massage.replace(/\\/g, ""), toastCSS());
      return true;
    }
  };
};

export const REMOVE_DOCUMENT_IN_FOLDER = (folderId) => {
  let url = "";
  if (userData?.data?.role === 1) {
    url = `${baseUrl}/api/admin/remove_upload_document/${getUserId()}/${folderId}?isFolder=${true}`;
  } else {
    url = `${baseUrl}/api/remove_upload_document/${getUserId()}/${folderId}?isFolder=${true}`;
  }
  return async (dispatch) => {
    try {
      let response = await axios.delete(url, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        toast.success(response?.data.msg.replace(/\\/g, ""), toastCSS());
        dispatch(GET_DOCUMENT_FOLDER_LIST());
      } else {
        toast.info(response?.msg.replace(/\\/g, ""), toastCSS());
      }
    } catch (error) {
      toast.error("Somthing went wrong", toastCSS());
    }
  };
};
