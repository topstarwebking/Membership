import axios from "axios";
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

// GetCandidate
export const GET_ALL_PROGRAM = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/statictics/all-program/${localStorage.getItem(
          "user_id"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      dispatch({
        type: `GET_ALL_PROGRAM`,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// GetState
export const GET_ALL_STATICTIC_COUNT = ({ programId, label }) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/statictics/state-by-type/${localStorage.getItem(
          "user_id"
        )}`,
        {
          params: {
            programId,
            label,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      dispatch({
        type: `GET_ALL_PROGRAM_${label}`,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// getLeadData
export const GET_LEAD_DATA = (params) => {
  return async (dispatch) => {
    let userId = localStorage.getItem("user_id");
    let studentType = params.studentType;
    let year = params.year
    try {
      let response = await axios.get(
        `${baseUrl}/api/statictics/leadsFilter/${userId}/${studentType}/${year}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          params,
        }
      );
      dispatch({
        type: `GET_LEAD_DATA`,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  }
}


// GetCandidate
export const GET_JOIN_N_QUIT_DATA_BY_YEAR = (params) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/statictics/yearly-join-quit-data/${localStorage.getItem(
          "user_id"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          params,
        }
      );

      dispatch({
        type: `GET_JOIN_N_QUIT_DATA_BY_YEAR`,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const GET_RANKS_BY_PROGRAM = (params) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/statictics/get-ranks-by-program/${localStorage.getItem(
          "user_id"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          params,
        }
      );

      dispatch({
        type: `GET_RANKS_BY_PROGRAM`,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const GET_MEMBER_LIST_BY_PROGRAMID = (params) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/statictics/get-member-by-program/${localStorage.getItem(
          "user_id"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          params,
        }
      );

      dispatch({
        type: `GET_MEMBER_LIST_BY_PROGRAMID`,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const GET_RANKS_REPORT_BY_PROGRAM = (params) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/statictics/get-ranks-report-by-program/${localStorage.getItem(
          "user_id"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          params,
        }
      );
      // console.log(response)

      dispatch({
        type: `GET_RANKS_REPORT_BY_PROGRAM`,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};




export const GET_ALL_JOINY_AND_QUIT_TRAILS = (date) => {
  let data = {
    dates: date,
  };
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${baseUrl}/api/statictics/graphFetch/${localStorage.getItem(
          "user_id"
        )}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response?.data?.success) {
        dispatch({
          type: "GET_ALL_JOINY_AND_QUIT_TRAILS",
          payload: response.data?.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const GET_ALL_JOINY_AND_QUIT_MEMBERS = (date) => {
  let data = {
    dates: date,
  };
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${baseUrl}/api/statictics/graphFetchMember/${localStorage.getItem(
          "user_id"
        )}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response?.data?.success) {
        dispatch({
          type: "GET_ALL_JOINY_AND_QUIT_MEMBERS",
          payload: response.data?.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const GET_PROGRAM_DATA_BY_MEMBERSHIP_TYPE = (membershipType, year) => {

  let url = `${baseUrl}/api/statics/get-membership-data/${getUserId()}/${membershipType}/${year}`
  return async (dispatch) => {
    try {
      let response = await axios.get(url, {
        headers: getHeaders(),
      });
      // console.log(response);
      if (response.status = 200) {
        dispatch({
          type: "GET_PROGRAM_DATA_BY_MEMBERSHIP_TYPE",
          payload: response?.data?.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const GET_PROGRAM_DATA_BY_STATICS_TYPE = (staticsType, year) => {
  let url = `${baseUrl}/api/statics/graphFetchStatics/${getUserId()}/${staticsType}/${year}`
  return async (dispatch) => {
    try {
      let response = await axios.get(url, {
        headers: getHeaders(),
      });
      if (response.status = 200) {
        dispatch({
          type: "GET_PROGRAM_DATA_BY_STATICS_TYPE",
          payload: response?.data
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
// Statistics student count
export const GET_STUDENET_COUNT_STATISTICS = (params) => {
  return async (dispatch) => {

    try {
      let response = await axios.get(
        `${baseUrl}/api/member/students_count_Statistics/${localStorage.getItem("user_id")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          params,
        }
      );
      if (response.status === 200) {
        dispatch({
          type: `GET_STUDENET_COUNT_STATISTICS`,
          payload: response.data.data
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

