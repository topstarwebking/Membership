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

const toastCss = () => {
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

export const fetchEvents = () => {
  let currentActiveCendar = localStorage.getItem("appointmentActivedate");
  let url = `${baseUrl}/api/list_of_classScheduleD/${getUserId()}/${currentActiveCendar}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, {
        headers: getHeaders(),
      });
      if (response.data && response.status === 200) {
        dispatch({
          type: "FETCH_EVENTS",
          events: response.data.data,
        });
        return true
      }
    } catch (error) {
      console.log("something went wrong");
    }
  };
};

export const ATTENDENCE_STUDENTS_REMOVE = (scheduleId, pagenumebr) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(
        `${baseUrl}/api/delete_classSchedule/${localStorage.getItem(
          "user_id"
        )}/${scheduleId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data.success) {
        dispatch(FETCH_ATTENDEE_LIST(pagenumebr));
        toast.info(response.data.msg, toastCss());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};

export const GET_SERACH_CLASSNAME = (payload, pagenumebr, perpage) => {
  let url = `${baseUrl}/api/attendence/search/${getUserId()}/${pagenumebr}/${perpage}?search=${payload}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, {}, { headers: getHeaders() });
      if (response.data.success) {
        dispatch({
          type: "GET_SERACH_CLASSNAME",
          event: response?.data?.result,
        });
      }
      if (response.error) {
        alert(response.error);
      }
    } catch (error) {
      console.log(error.message.replace(/\\/g, ""));
    }
  };
};

export const GET_SERACH_BY_DAYS = (payload, pagenumebr, perpage) => {
  let url = `${baseUrl}/api/attendence/search/${getUserId()}/${pagenumebr}/${perpage}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, {
        headers: getHeaders(),
      });
      if (response.data.success) {
        dispatch({
          type: "GET_SERACH_CLASSNAME",
          event: response?.data?.result,
        });
      }
      if (response.error) {
        alert(response.error);
      }
    } catch (error) {
      console.log(error.message.replace(/\\/g, ""));
    }
  };
};

export const ATTENDENCE_STUDENTS_REMOVE_BY_ID = (scheduleId, studentId) => {
  return async (dispatch) => {
    try {
      let response = await axios.delete(
        `${baseUrl}/api/attendence/remove_attendence/${localStorage.getItem(
          "user_id"
        )}/${scheduleId}/${studentId}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data.success) {
        dispatch(FETCH_CLASS_STUDENTS(scheduleId));
        toast.info(response.data.msg, toastCss());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};

export const FETCH_CLASS_STUDENTS = (scheduleId) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/class_schedule_by_id/${localStorage.getItem(
          "user_id"
        )}/${scheduleId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data.success) {
        dispatch({
          type: "FETCH_CLASS_STUDENTS",
          event: response.data?.data,
        });
      }
    } catch (error) {
      console.log("something went wrong in fetching class student");
    }
  };
};

export const FETCH_ATTENDEE_LIST = (page) => {

  let url = `${baseUrl}/api/attendence/attendence_list/${localStorage.getItem(
    "user_id"
  )}/${page}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (response.data && response.status === 200) {
        dispatch({
          type: "FETCH_ATTENDEE_LIST",
          event: response.data,
        });
      }
    } catch (error) {
      console.log("something went wrong");
    }
  };
};

export const STUD_GET = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/member/member_list/${localStorage.getItem("user_id")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data && response.status === 200) {
        dispatch({
          type: "STUD_GET",
          event: response.data,
        });
      }
    } catch (error) {
      console.log("something went wrong in student fetching");
    }
  };
};
export const ADD_CLASS_SCHEDULE = (data) => {
  let url = `${baseUrl}/api/add_classSchedule/${getUserId()}`;
  let payload = { ...data, userId: getUserId() };
  return async (dispatch) => {
    try {
      await axios.post(url, payload, { headers: getHeaders() });
      dispatch(fetchEvents());
      toast.info("Class added Successfully !", toastCss());
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};

export const UPDATE_CLASS_SCHEDULE = (data, class_sh_id) => {
  return async (dispatch) => {
    try {
      await axios.put(
        `${baseUrl}/api/update_classSchedule/${getUserId()}/${class_sh_id}`,
        data,
        {
          headers: getHeaders(),
        }
      );
      dispatch(fetchEvents());
      toast.info("Class Updated Successfully !", toastCss());
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};
export const UPDATE_WHOLE_CLASS_SCHEDULE = (data) => {
  let url = `${baseUrl}/api/update_All_classSchedule/${getUserId()}`;
  let payload = { ...data, userId: getUserId() };
  console.log(payload)
  return async (dispatch) => {
    try {
      let res = await axios.put(url, payload, { headers: getHeaders() });
      if (res.data.success) {
        dispatch(fetchEvents());
        toast.info("Updated Successfully!", toastCss());
      } else {
        toast.info(res.data.message, toastCss());
      }

    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};
export const ADD_STUDENT_TO_CLASS = (scheduleId, id, time) => {
  let url = `${baseUrl}/api/attendence/create_attendence/${getUserId()}/${scheduleId}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(
        url,
        { time },
        {
          headers: getHeaders(),
        }
      );
      if (response.error) {
        alert(response.error);
      }
      dispatch(FETCH_CLASS_STUDENTS(scheduleId));
    } catch (error) {
      console.log(error.message.replace(/\\/g, ""));
    }
  };
};

export const RENDER_STUDENT = (search = "a") => {
  let url = `${baseUrl}/api/member/member_list_name/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await axios.get(url, {
        headers: getHeaders(),
      });
      dispatch({
        type: "RENDER_STUDENT",
        payload: res.data,
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};
export const DELETE_SCHEDULE_CLASS = (scheduleId) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `${baseUrl}/api/delete_classSchedule/${getUserId()}/${scheduleId}`,
        {
          headers: getHeaders(),
        }
      );
      dispatch(fetchEvents());
      toast.info("Event deleting ...", toastCss());
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};

export const DELETE_EVENT_BY_WHOLE_SERIES = (program_name, class_name) => {
  let url = `${baseUrl}/api/delete_All_classSchedule/${getUserId()}`;
  return async (dispatch) => {
    try {
      let config = {
        method: "delete",
        url: url,
        headers: getHeaders(),
        data: { program_name, class_name },
      };
      await axios(config);
      dispatch(fetchEvents());
      toast.info("deleting events by series ...", toastCss());
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};

export const handleSidebar = (bool) => {
  return (dispatch) => dispatch({ type: "HANDLE_SIDEBAR", status: bool });
};

export const addEvent = (event) => {
  return (dispatch) => {
    dispatch({ type: "ADD_EVENT", event });
  };
};
export const updateEvent = (event) => {
  return (dispatch) => {
    dispatch({ type: "UPDATE_EVENT", event });
  };
};

export const updateDrag = (event) => {
  return (dispatch) => {
    dispatch({ type: "UPDATE_DRAG", event });
  };
};

export const updateResize = (event) => {
  return (dispatch) => {
    dispatch({ type: "EVENT_RESIZE", event });
  };
};

export const handleSelectedEvent = (event) => {
  return (dispatch) => dispatch({ type: "HANDLE_SELECTED_EVENT", event });
};

export const IS_LOADING = (vaue) => {
  return (dispatch) => dispatch({ type: "IS_LOADING", payload: vaue });
};
