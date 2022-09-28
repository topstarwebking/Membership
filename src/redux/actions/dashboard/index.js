import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const Get_Birthday_APPOINTMENTS = (data) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/birthday_appoinment_list/${localStorage.getItem(
          "user_id"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data && response.status === 200 && !response.data.msg) {
        dispatch({
          type: "GET_BIRTHDAY_LIST",
          payload: response.data,
        });
      } else {
        dispatch({
          type: "GET_BIRTHDAY_LIST",
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "GET_BIRTHDAY_LIST",
        payload: [],
      });
    }
  };
};

export const Get_MissYouCall_APPOINTMENTS = (data) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/missYouCall_appoinmnet/${localStorage.getItem(
          "user_id"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data && response.status === 200 && !response.data.msg) {
        dispatch({
          type: "GET_MISSYOUCALL_LIST",
          payload: response.data,
        });
      } else {
        dispatch({
          type: "GET_MISSYOUCALL_LIST",
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "GET_MISSYOUCALL_LIST",
        payload: [],
      });
    }
  };
};

export const Get_SCHOOL_APPOINTMENT = (data) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/appointment/list_of_appointments/${localStorage.getItem(
          "user_id"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data && response.status === 200 && !response.data.msg) {
        dispatch({
          type: "GET_SCHOOL_LIST",
          payload: response.data,
        });
      } else {
        dispatch({
          type: "GET_SCHOOL_LIST",
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "GET_SCHOOL_LIST",
        payload: [],
      });
    }
  };
};

export const Get_RENEWAL_APPOINTMENT = (data) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/student_appoinment_list/${localStorage.getItem(
          "user_id"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data && response.status === 200 && !response.data.msg) {
        dispatch({
          type: "GET_RENEWAL_LIST",
          payload: response.data,
        });
      } else {
        dispatch({
          type: "GET_RENEWAL_LIST",
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "GET_RENEWAL_LIST",
        payload: [],
      });
    }
  };
};

export const Get_Months_Birthday = (data) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/member/this_month_birth/${localStorage.getItem(
          "user_id"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data && response.status === 200 && !response.data.msg) {
        dispatch({
          type: "GET_MONTHS_BIRTHDAY",
          payload: response.data,
        });
      } else {
        dispatch({
          type: "GET_MONTHS_BIRTHDAY",
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "GET_MONTHS_BIRTHDAY",
        payload: [],
      });
    }
  };
};

export const Get_Next_Months_Birthday = (data) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/member/next_month_birth/${localStorage.getItem(
          "user_id"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data && response.status === 200 && !response.data.msg) {
        dispatch({
          type: "GET_NEXT_MONTHS_BIRTHDAY",
          payload: response.data,
        });
      } else {
        dispatch({
          type: "GET_NEXT_MONTHS_BIRTHDAY",
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "GET_NEXT_MONTHS_BIRTHDAY",
        payload: [],
      });
    }
  };
};
export const GET_BIRTHDAY_LIST_THIS_MONTH = (pageNumber, rowperpage) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/dashboard/birthday_this_month/${localStorage.getItem(
          "user_id"
        )}/${pageNumber}/${rowperpage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data && response.status === 200 && !response.data.msg) {
        dispatch({
          type: "GET_BIRTHDAY_LIST_THIS_MONTH",
          payload: response.data,
        });
      } else {
        dispatch({
          type: "GET_BIRTHDAY_LIST_THIS_MONTH",
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "GET_BIRTHDAY_LIST_THIS_MONTH",
        payload: [],
      });
    }
  };
};
export const GET_BIRTHDAY_LIST_NEXT_MONTH = (pageNumber, rowperpage) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/dashboard/birthday_next_month/${localStorage.getItem(
          "user_id"
        )}/${pageNumber}/${rowperpage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      dispatch({
        type: "GET_BIRTHDAY_LIST_NEXT_MONTH",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const GET_MISSYOUCALL_MORETHEN_14 = (pageNumber, perrows) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/missyouCall/more_than_forteen/${localStorage.getItem(
          "user_id"
        )}/${pageNumber}/${perrows}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      dispatch({
        type: "GET_MISSYOUCALL_MORETHEN_14",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const GET_LEADS_PAST_3MONTH = (pageNumber, perpage) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/member/leads_past_3months/${localStorage.getItem(
          "user_id"
        )}/${pageNumber}/${perpage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      dispatch({
        type: "GET_LEADS_PAST_3MONTH",
        payload: response?.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const GET_LEADS_OF_THIS_MONTH = (pageNumber, perpage) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/member/leads_created_this_month/${localStorage.getItem(
          "user_id"
        )}/${pageNumber}/${perpage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      dispatch({
        type: "GET_LEADS_OF_THIS_MONTH",
        payload: response?.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const ACTIVE_TRAIL_OF_THIS_MONTH = (pageNumber, perpage) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/member/active_trial_created_this_month/${localStorage.getItem(
          "user_id"
        )}/${pageNumber}/${perpage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      dispatch({
        type: "ACTIVE_TRAIL_OF_THIS_MONTH",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const ACTIVE_TRAIL_OF_LAST_3MONTHS = (pageNumber, perpage) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/member/active_trial_past_3months/${localStorage.getItem(
          "user_id"
        )}/${pageNumber}/${perpage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      dispatch({
        type: "ACTIVE_TRAIL_OF_LAST_3MONTHS",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const GET_EXPIRED_MEMBERSSHIP = (pageNumber, perpage, params) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/member/expired_Membership/${localStorage.getItem(
          "user_id"
        )}/${pageNumber}/${perpage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          params,
        }
      );
      dispatch({
        type: "GET_EXPIRED_MEMBERSSHIP",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const GET_EXPIRED_MEMBERSHIP_THIS_MONTH = (pageNumber, perpage) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/member/expired_thisMonth_Membership/${localStorage.getItem(
          "user_id"
        )}/${pageNumber}/${perpage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      dispatch({
        type: "GET_EXPIRED_MEMBERSHIP_THIS_MONTH",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
