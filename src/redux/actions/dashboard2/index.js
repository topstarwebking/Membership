import axios from "axios";
import moment from "moment";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const GET_SALES_STATE_ACTION = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_SALES_STATE_LOADING" });

      let { data } = await axios.get(
        `${baseUrl}/api/dashboard/sales/${localStorage.getItem("user_id")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      dispatch({
        type: "GET_SALES_STATE_SUCCESS",
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "GET_SALES_STATE_ERROR" });
    }
  };
};

// get Today Payment Due
export const GET_TODAY_PAYMENT_DUE_ACTION = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_TODAY_PAYMENT_DUE_STATE_LOADING" });

      let { data } = await axios.get(
        `${baseUrl}/api/dashboard/payment-due-states/${localStorage.getItem(
          "user_id"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          params: {
            startDate: new Date(),
            endDate: new Date(),
          },
        }
      );

      dispatch({
        type: "GET_TODAY_PAYMENT_DUE_STATE_SUCCESS",
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "GET_TODAY_PAYMENT_DUE_STATE_ERROR" });
    }
  };
};

// get WEEKLY Payment Due
export const GET_WEEKLY_PAYMENT_DUE_ACTION = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_WEEKLY_PAYMENT_DUE_STATE_LOADING" });

      let { data } = await axios.get(
        `${baseUrl}/api/dashboard/payment-due-states/${localStorage.getItem(
          "user_id"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          params: {
            startDate: new Date(
              moment(new Date()).subtract(7, "days")
            ).getTime(),
            endDate: new Date().getTime(),
          },
        }
      );

      dispatch({
        type: "GET_WEEKLY_PAYMENT_DUE_STATE_SUCCESS",
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "GET_WEEKLY_PAYMENT_DUE_STATE_ERROR" });
    }
  };
};

// get MONTHLY Payment Due
export const GET_MONTHLY_PAYMENT_DUE_ACTION = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_MONTHLY_PAYMENT_DUE_STATE_LOADING" });

      let date = new Date();
      let firstDateOfMonth = new Date(
        date.getFullYear(),
        date.getMonth(),
        1
      ).getTime();

      let { data } = await axios.get(
        `${baseUrl}/api/dashboard/payment-due-states/${localStorage.getItem(
          "user_id"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          params: {
            startDate: firstDateOfMonth,
            endDate: new Date().getTime(),
          },
        }
      );

      dispatch({
        type: "GET_MONTHLY_PAYMENT_DUE_STATE_SUCCESS",
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "GET_MONTHLY_PAYMENT_DUE_STATE_ERROR" });
    }
  };
};

// get student count statictics data
export const GET_STUDENT_COUNT_DATA_ACTION = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_STUDENT_COUNT_DATA_STATE_LOADING" });
      let { data } = await axios.get(
        `${baseUrl}/api/dashboard/student-count/${localStorage.getItem(
          "user_id"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      dispatch({
        type: "GET_STUDENT_COUNT_DATA_STATE_SUCCESS",
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "GET_STUDENT_COUNT_DATA_STATE_ERROR" });
    }
  };
};

// Active Trial Of this Month
export const ACTIVE_TRAIL_OF_THIS_MONTH = (pageNumber, perpage) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/dashboard2/this-month-active-trial/${localStorage.getItem(
          "user_id"
        )}/${pageNumber}/${perpage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data.success) {
        dispatch({
          type: "ACTIVE_TRAIL_OF_THIS_MONTH",
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Active Trial Of this Month
export const ACTIVE_TRAIL_ALL_TIME = (pageNumber, perpage) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/dashboard2/all-time-active-trial/${localStorage.getItem(
          "user_id"
        )}/${pageNumber}/${perpage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.data.success) {
        dispatch({
          type: "ACTIVE_TRAIL_OF_ALL_TIME",
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Active Trial Of this Month
export const LEADS_OF_THIS_MONTH = (pageNumber, perpage) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/dashboard2/this-month-leads/${localStorage.getItem(
          "user_id"
        )}/${pageNumber}/${perpage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data.success) {
        dispatch({
          type: "LEADS_OF_THIS_MONTH",
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Active Trial Of this Month
export const LEADS_ALL_TIME_DATA = (pageNumber, perpage) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/dashboard2/all-time-leads/${localStorage.getItem(
          "user_id"
        )}/${pageNumber}/${perpage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data.success) {
        dispatch({
          type: "LEADS_OF_ALL_TIME",
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Active Trial Of this Month
export const MEMBER_LIST_OF_THIS_MONTH = (pageNumber, perpage) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/dashboard2/this-month-latest-mmember/${localStorage.getItem(
          "user_id"
        )}/${pageNumber}/${perpage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data.success) {
        dispatch({
          type: "MEMBER_LIST_OF_THIS_MONTH",
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Active Trial Of this Month
export const MEMBER_LIST_OF_ALL_TIME = (pageNumber, perpage) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/dashboard2/all-time-mmember/${localStorage.getItem(
          "user_id"
        )}/${pageNumber}/${perpage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data.success) {
        dispatch({
          type: "MEMBER_LIST_OF_ALL_TIME",
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Active Trial Of this Month
export const BIRTHDAY_LIST_OF_ALL_TIME = (pageNumber, perpage) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/dashboard2/all-time-birthday/${localStorage.getItem(
          "user_id"
        )}/${pageNumber}/${perpage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      dispatch({
        type: "BIRTHDAY_LIST_OF_ALL_TIME",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// Active Trial Of this Month
export const LEADS_ALL_TIME = (pageNumber, perpage) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/dashboard2/all-time-leads/${localStorage.getItem(
          "user_id"
        )}/${pageNumber}/${perpage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.data.success) {
        dispatch({
          type: "LEADS_OF_ALL_TIME",
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Active Trial Of this Month
export const BIRTHDAY_LIST_OF_THIS_MONTH = (pageNumber, perpage) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/dashboard2/this-month-birthday/${localStorage.getItem(
          "user_id"
        )}/${pageNumber}/${perpage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.data.success) {
        dispatch({
          type: "BIRTHDAY_LIST_OF_THIS_MONTH",
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Active Trial Of this Month
export const GET_EXPIRED_MEMBERSHIP = (pageNumber, perpage) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/dashboard2/expired-this-month-membership/${localStorage.getItem(
          "user_id"
        )}/${pageNumber}/${perpage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      dispatch({
        type: "GET_EXPIRED_MEMBERSHIPS",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// Active Trial Of this Month
export const GET_ALL_MEMBERSHIP = (pageNumber, perpage) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/dashboard2/all-expired-memberships/${localStorage.getItem(
          "user_id"
        )}/${pageNumber}/${perpage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      dispatch({
        type: "GET_ALL_MEMBERSHIPS",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// Tasks
export const GET_TODAY_TASKS = (pageNumber, perpage) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/dashboard2/today-task/${localStorage.getItem(
          "user_id"
        )}/${pageNumber}/${perpage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      dispatch({
        type: "GET_TODAY_TASKS",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// ALL Tasks
export const GET_ALL_TASKS = (pageNumber, perpage) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/dashboard2/all-tasks/${localStorage.getItem(
          "user_id"
        )}/${pageNumber}/${perpage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      dispatch({
        type: "GET_ALL_TASKS",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// GetCandidate
export const GET_CANDIDATE_ACTION = (type, pageNumber, perpage) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/dashboard2/members-by-membership-type/${type}/${localStorage.getItem(
          "user_id"
        )}/${pageNumber}/${perpage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      dispatch({
        type: `GET_${type}_CANDIDATE`,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
