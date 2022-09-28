import axios from 'axios';
import { fetchEvents } from '../calendar'
import { toast } from "react-toastify";
const baseUrl = process.env.REACT_APP_BASE_URL;

const getUserId = () => {
  return localStorage.getItem("user_id")
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
    progress: undefined,
  };
};

const getHeaders = () => {
  return {
    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    "content-type": "application/json",
  }
}

export const GET_CLASS_SCHEDULE = (class_sh_id) => {
  return async dispatch => {
    await axios.post(`${baseUrl}/api/class_schedule_by_id/${getUserId()}/${class_sh_id}`, {
      headers: getHeaders()
    })
  }
}

export const ADD_CLASS_SCHEDULE = (data) => {
  let url = `${baseUrl}/api/add_classSchedule/${getUserId()}`
  let payload = { ...data, userId: getUserId() }
  return async dispatch => {
    try {
      let response = await axios.post(url, payload, {
        headers: getHeaders()
      });
      await fetchEvents()(dispatch)
      if (response.data && response.status === 200) {
        dispatch(SUCCESS_SCHEDULE_STATUS("Class schedule is created successfully!"));
      }
      else {
        dispatch(ERROR_SCHEDULE_STATUS());
      }
    }
    catch (error) {
      dispatch(ERROR_SCHEDULE_STATUS());
    }
  }
}

export const GET_PROGRAM_LIST = () => {
  return async dispatch => {
    try {
      let response = await axios.get(`${baseUrl}/api/list_of_program/${getUserId()}`,
        {
          headers: getHeaders()
        });
      if (response.data && response.status === 200) {
        dispatch({
          type: "GET_PROGRAM_LIST",
          payload: response.data
        })
      }
    }
    catch (error) {
      console.log("something went wrong");
    }
  }
}

// SCHEDULE RESPONSE STATES
export const SUCCESS_SCHEDULE_STATUS = (msg) => {
  return dispatch => {
    dispatch({
      type: "SCHEDULE_STATUS",
      payload: {
        status: true,
        message: msg
      }
    })
  }
}

export const ERROR_SCHEDULE_STATUS = () => {
  return dispatch => {
    dispatch({
      type: "SCHEDULE_STATUS",
      payload: {
        status: true,
        message: "Something went wrong!"
      }
    })
  }
}

export const CLEAR_SCHEDULE_STATUS = () => {
  return dispatch => {
    dispatch({
      type: "CLEAR_SCHEDULE_STATUS"
    })
  }
}

export const Get_CAMP_LIST = (data) => {
  return async dispatch => {
    try {
      let response = await axios.get(`${baseUrl}/api/camp/list_camp/${getUserId()}`, {
        headers: getHeaders()
      });
      if (response.data && response.status === 200 && !response.data.msg) {
        dispatch({
          type: "GET_CAMP_INFO",
          payload: response.data
        })
      }
      else {
        dispatch({
          type: "GET_CAMP_INFO",
          payload: []
        })
      }
    }
    catch (error) {
      console.log(error);
      dispatch({
        type: "GET_CAMP_INFO",
        payload: []
      })
    }
  }
}

export const Get_SUBUSER_LIST = (data) => {
  return async dispatch => {
    try {
      let response = await axios.get(`${baseUrl}/api/users/user_list/${getUserId()}`, {
        headers: getHeaders()
      });
      if (response.data && response.status === 200 && !response.data.msg) {
        dispatch({
          type: "GET_SUBUSER_INFO",
          payload: response.data
        })
      }
      else {
        dispatch({
          type: "GET_SUBUSER_INFO",
          payload: []
        })
      }
    }
    catch (error) {
      dispatch({
        type: "GET_SUBUSER_INFO",
        payload: []
      })
    }
  }
}

export const CREATE_SUB_USER = (data) => {
  let formData = new FormData()
  let dataEntries = Object.entries(data);
  dataEntries.map((v, i) => {
    formData.append(v[0], v[1]);
    return v;
  })
  return async dispatch => {
    try {
      let response = await axios.post(`${baseUrl}/api/users/add_user/${getUserId()}`, formData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          "content-type": "multipart/form-data",
        }
      })
      if (response.data && response.status === 200) {
        dispatch(Get_SUBUSER_LIST());
      }
    }
    catch (error) {
      dispatch(Get_SUBUSER_LIST());
    }
  }
}

export const UPDATE_STRIPE = ({ data, stripeId }) => {
  let formData = new FormData();
  let dataEntries = Object.entries(data);
  dataEntries.map((v, i) => {
    formData.append(v[0], v[1]);
    return v;
  })
  return async dispatch => {
    try {
      let response = await axios.put(`${baseUrl}api/update_stripe/${getUserId()}/${stripeId}`, formData, {
        headers: getHeaders()
      })
      if (response.data && response.status === 200) {
        dispatch(Get_SUBUSER_LIST());
      }
    }
    catch (error) {
      console.log(error?.message);
      dispatch(Get_SUBUSER_LIST());
    }
  }
}

export const trashSubUser = (id) => {
  return dispatch => {
    axios.delete(`${baseUrl}/api/users/delete_user/${getUserId()}/${id}`, {
      headers: getHeaders()
    }).then(res => {
      dispatch(Get_SUBUSER_LIST());
    })

  }
}
export const trashCamp = (id) => {
  return dispatch => {
    axios.delete(`${baseUrl}/api/camp/delete_camp/${getUserId()}/${id}`, {
      headers: getHeaders()
    }).then(res => {
      dispatch(Get_CAMP_LIST());
    })

  }
}

// stripe getway put api
export const UPDATE_GATEWAY_USER_BY_ADMIN = (payload) => {
  let url = `${baseUrl}/api/admin/update_user_by_user/stripe/${getUserId()}`;
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
export const GET_USER_GATEWAY_DATA = () => {
  let url = `${baseUrl}/api/admin/get_userData_by_userId/stripe/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, {
        headers: getHeaders(),
      });
      if (response.status === 200) {
        dispatch({
          type: "GET_USER_GATEWAY_DATA",
          payload: response?.data?.data,
        });
      }
    } catch (error) {
      console.log("something went wrong");
    }
  };
};