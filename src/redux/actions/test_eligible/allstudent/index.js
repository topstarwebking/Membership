import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = process.env.REACT_APP_BASE_URL;


const getUserId = () => {
  return localStorage.getItem("user_id")
}

const getHeaders = () => {
  return {
    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    "content-type": "application/json",
  }
}

const toastCSS = () => {
  return {
    position: "top-center",
    autoClose: 3000,
    icon: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: true,
  };
};

export const GET_ALL_ELIGIBLE_STUDENT_LIST = () => {
  let url = `${baseUrl}/api/member/get_students_by_Active_Status/${getUserId()}`
  return async (dispatch) => {
    try {
      let response = await axios.get(url, { headers: getHeaders() });
      if (response.data && response.status === 200) {
        dispatch({
          type: "GET_ALL_ELIGIBLE_STUDENT_LIST",
          payload: response.data?.data,
        });
      }
    } catch (error) {
      toast.error((error.message).replace(/\\/g, ""), toastCSS());
      dispatch({
        type: "GET_ALL_ELIGIBLE_STUDENT_LIST",
        payload: [],
      });

    }
  };
};


