import axios from "axios"
import { toast } from "react-toastify";
const baseUrl = process.env.REACT_APP_BASE_URL;

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

const getUserId = () => {
    return localStorage.getItem("user_id")
}

const getHeaders = () => {
    return {
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        "content-type": "application/json",
    }
}

export const ADD_STUDENT_FINANCE_INFO = (payload) => {
    let syduentId = window.location.pathname.split('/')[2]
    let url = `${baseUrl}/api/finance_info/create_finance_info/${getUserId()}/${syduentId}`
    return async dispatch => {
        try {
            await axios.post(url, payload, { headers: getHeaders() })
            dispatch(GET_STUDENT_FINANCE_INFO())
            toast.info('Finance info added successfully!', toastCSS());
        }
        catch (error) {
            toast.error((error.message).replace(/\\/g, ""), toastCSS());
        }
    }
}

export const GET_STUDENT_FINANCE_INFO = (id=false, isNotDispatch) => {
    let studentId = id ? id?._id : window.location.pathname.split('/')[2];
    let url = `${baseUrl}/api/finance/finance_info/${getUserId()}/${studentId}`
    return async dispatch => {
        try {
            let res = await axios.get(url, { headers: getHeaders() })
            if (isNotDispatch) {
                return res.data.data
            } else {
                dispatch({
                    type: "GET_STUDENT_FINANCE_INFO", 
                    payload: res.data?.data
                });
                return true
            }
        }
        catch (error) {
            toast.error((error.message).replace(/\\/g, ""), toastCSS());
        }
    }
}
export const UPDATE_STUDENT_FINANCE_INFO = (Fid,payload) => {
    let url = `${baseUrl}/api/finance/update_finance_info/${getUserId()}/${Fid}`
    return async dispatch => {
        try {
            await axios.put(url, payload, { headers: getHeaders() })
            dispatch(GET_STUDENT_FINANCE_INFO())
            toast.info('Finance info Updated successfully!', toastCSS());
        }
        catch (error) {
            toast.error((error.message).replace(/\\/g, ""), toastCSS());
        }
    }
}
export const DELETE_STUDENT_FINANCE_INFO = (finance_id) => {
    let url = `${baseUrl}/api/finance/delete_finance_info/${getUserId()}/${finance_id}`
    return async dispatch => {
        try {
            await axios.delete(url, { headers: getHeaders() })
            dispatch(GET_STUDENT_FINANCE_INFO())
            toast.info('Finance info deleted successfully!', toastCSS());
        }
        catch (error) {
            toast.error((error.message).replace(/\\/g, ""), toastCSS());
        }
    }
}