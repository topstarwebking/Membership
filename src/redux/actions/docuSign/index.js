import axios from "axios";
import { toast } from "react-toastify";

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

const toastCSS = () => {
  return {
    position: "top-center",
    autoClose: 3000,
    icon: true,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
};

// update mymember user signature 
export const UPDATE_MM_USER_SIGNATURE = (signature) => {
  let payload = {
    signature
  }
  let url = `${baseUrl}/api/user/updateSignature/${getUserId()}`;
  return async (dispatch) => {
    try {
      await axios.put(url, payload, { headers: getHeaders() });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const SEND_INVITATION_TO_EMAIL_SIGNATURE = (data) => {
  let payload = {
    // ownerEmail: "mymanger <hello@mymanager.com>",
    ...data
  }
  let url = `${baseUrl}/api/docusign/inviteeEmail/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await axios.post(url, payload, { headers: getHeaders() });
      if (res?.data.success) {
        dispatch({ type: "SEND_INVITATION_TO_EMAIL_SIGNATURE" });
        return res?.data
      } else {
        toast.info(res?.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

// create data fram to add signer in document
export const SUBMIT_VALUE_OF_SIGNATURE_ADD = (formValue, isEdit) => {
  return async (dispatch) => {
    dispatch({
      type: "SUBMIT_VALUE_OF_SIGNATURE_ADD",
      payload: { formValue, isEdit }
    });
  };
};
export const ADD_DEFAULT_VALUE_FOR_MYMEMBER_SIGNER = (sign, data) => {
  return async (dispatch) => {
    let payload = {
      email: data?.email,
      fullname: `${data?.firstname} ${data?.lastname}`,
      id: 1,
      signature: sign,
    }
    dispatch({
      type: "ADD_DEFAULT_VALUE_FOR_MYMEMBER_SIGNER",
      payload: payload
    });
  };
};


export const GET_DOCUSIGN_PDF_BY_ID = (docid, emailToken) => {
  let url = `${baseUrl}/api/docusign/getSignItems/${getUserId()}/${docid}/${emailToken}`;
  return async (dispatch) => {
    try {
      let res = await axios.get(url, { headers: getHeaders() });
      dispatch({ type: "GET_DOCUSIGN_PDF_BY_ID" });
      if (res?.data.success) {
        return res?.data
      } else {
        toast.info(res?.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

// call this api to create signature document or to invite additional users
export const REQUEST_USERS_FOR_SIGNATURE = (payload) => {
  let url = `${baseUrl}/api/docusign/addSignerInfo/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await axios.post(url, payload, { headers: getHeaders() });
      dispatch({ type: "REQUEST_USERS_FOR_SIGNATURE" });
      if (res?.data.success) {
        return res?.data
      } else {
        toast.info(res?.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

// fetch document with all signer added
export const GET_ALL_INVITEE_OF_DOCUMENT = (docuSignId, emailToken) => {
  let url = `${baseUrl}/api/docusign/getStatus/${getUserId()}/${docuSignId}/${emailToken}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, { headers: getHeaders() });
      dispatch({ type: "GET_ALL_INVITEE_OF_DOCUMENT" });
      return response?.data
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
export const SAVE_LAST_VIEWED_HISTORY = (payload, docuSignId, emailToken) => {
  let url = `${baseUrl}/api/docusign/primarySetSignItems/${getUserId()}/${docuSignId}/${emailToken}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, { headers: getHeaders() });
      if (response?.data.success) {
        dispatch(GET_ALL_INVITEE_OF_DOCUMENT(docuSignId, emailToken))
        return response?.data
      } else {
        toast.info(response?.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

// save document after signature
export const SAVE_DOCUMENT_AFTER_SIGNATURE = (payload, docuSignId, emailToken) => {
  let url = `${baseUrl}/api/docusign/setSignItems/${getUserId()}/${docuSignId}/${emailToken}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, { headers: getHeaders() });
      if (response?.data.success) {
        dispatch(GET_ALL_INVITEE_OF_DOCUMENT(docuSignId, emailToken))
        return response?.data
      } else {
        toast.info(response?.data?.msg, toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};

export const GET_DOCUMENT_BY_MEMBERSHIP_ID = (signDocForId) => {
  let url = `${baseUrl}/api/docusign/getDoc/${getUserId()}/${signDocForId}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, { headers: getHeaders() });
      if (response?.data.success) {
        dispatch({
          type: "GET_DOCUMENT_BY_MEMBERSHIP_ID",
          payload: response?.data
        });
      } else {
        dispatch({
          type: "GET_DOCUMENT_BY_MEMBERSHIP_ID",
          payload: []
        });
        toast.info('No signature process done!', toastCSS());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCSS());
    }
  };
};
