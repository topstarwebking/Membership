import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = process.env.REACT_APP_BASE_URL;

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
      toast.error(error.message.replace(/\\/g, ""), toastCSS);
    }
  };
};

export const HANDLE_ACTIVE_INACTIVE_BY_ADMIN = (payload, schoolId, pageNum) => {
  let url = `${baseUrl}/api/get_user_approved_by_admin/${getUserId()}/${schoolId}`;
  return async (dispatch) => {
    try {
      let response = await axios.put(url, payload, {
        headers: getHeaders(),
      });
      if (response.status) {
        toast.success(response.data.msg, toastCSS());
      }
      dispatch(GET_SCHOOL_LIST_FOR_ADMIN(pageNum));
    } catch (error) {
      console.log(error?.message);
    }
  };
};

export const ADD_UPDATE_VALOR_CREDENTIAL = (payload, schoolId, pageNum) => {
  let url = `${baseUrl}/api/admin/update_user/${getUserId()}/${schoolId}`;
  return async (dispatch) => {
    try {
      await axios.put(url, payload, {
        headers: getHeaders(),
      });
      toast.success("Valor credential added successfully!", toastCSS());
      dispatch(GET_SCHOOL_LIST_FOR_ADMIN(pageNum));
      return true;
    } catch (error) {
      toast.error("Something went wtong please try latter!", toastCSS());
      return false;
    }
  };
};

export const SEARCH_USER_FOR_ADMIN = (data) => {
  let url = `${baseUrl}/api/admin/searchUser/${getUserId()}?search=${data}`;
  return async (dispatch) => {
    try {
      let res = await axios.get(
        url,
        {},
        {
          headers: getHeaders(),
        }
      );
      dispatch({
        type: "SEARCH_USER_FOR_ADMIN",
        payload: res.data,
      });
    } catch (error) {
      toast.error("Something went wtong please try latter!", toastCSS());
    }
  };
};

export const ADD_TWILIO_NUMBER = (payload, uid) => {
  let url = `${baseUrl}/api/addtwilllio/${getUserId()}/${uid}`;
  return async (dispatch) => {
    try {
      await axios.put(
        url,
        {
          twilio: payload,
        },
        {
          headers: getHeaders(),
        }
      );
      toast.success("Twilio number added successfully!", toastCSS());
      dispatch(GET_SCHOOL_LIST_FOR_ADMIN());
      return true;
    } catch (error) {
      console.log(error);
      toast.error("Something went wtong please try latter!", toastCSS());
      return false;
    }
  };
};

// stripe getway put api
export const UPDATE_GATEWAY_BY_ADMIN = (payload, id) => {
  let url = `${baseUrl}/api/admin/update_user_by_admin/stripe/${getUserId()}/${id}`;
  return async(dispatch) => {
    try{
      let response = await axios.put(url, payload, {headers: getHeaders()});
      if(response.data?.success){
        toast.success(response.data?.msg, toastCSS());
      }else{
        toast.error(response.data?.msg, toastCSS());
      }
    } catch(err){
      toast.error(err.message.replace(/\\/g, ""), toastCSS());
    }
  }
}


// export const GET_ADMIN_GATEWAY_DATA = () => {
//   let url = `${baseUrl}/api/admin/update_user_by_admin/stripe/${getUserId()}`;
//   return async (dispatch) => {
//     try {
//       let response = await axios.get(url, {
//         headers: getHeaders(),
//       });
//       if (response.status === 200) {
//         dispatch({
//           type: "GET_USER_GATEWAY_DATA",
//           payload: response?.data?.data,
//         });
//       }
//     } catch (error) {
//       console.log("something went wrong");
//     }
//   };
// };
