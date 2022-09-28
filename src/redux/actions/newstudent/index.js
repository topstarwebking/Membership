import axios from "axios";
import { toast } from "react-toastify";
import { GET_NOTES_BY_MEMBERID, GET_MISS_YOU_CALL, GET_RENEWAL_ALL_DATA, GET_BIRTHDAY_ALL_DATA } from "../member";
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
const getHeadersForFile = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "content-type": "multipart/form-data",
  };
};

const toastCss = () => {
  return {
    position: "top-center",
    autoClose: 2000,
    icon: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: true,
  };
};
export const getTodos = (routeParams) => {
  return async (dispatch) => {
    await axios
      .get("api/get-student", {
        params: routeParams,
      })
      .then((result) => {
        dispatch({
          type: "GET_TODOS",
          todos: result.data,
          routeParams,
        });
      })
      .catch((err) => console.log(err));
  };
};
export const completeTask = (todo) => {
  return (dispatch) => {
    dispatch({ type: "COMPLETE_TASK", id: todo.id, value: todo.isCompleted });
  };
};

export const starTask = (todo) => {
  return (dispatch) => {
    Promise.all([
      dispatch({ type: "STAR_TASK", id: todo.id, value: todo.isStarred }),
    ]);
  };
};

export const importantTask = (todo) => {
  return (dispatch) => {
    Promise.all([
      dispatch({
        type: "IMPORTANT_TASK",
        id: todo.id,
        value: todo.isImportant,
      }),
    ]);
  };
};

export const trashTask = (id) => {
  return (dispatch, getState) => {
    const params = getState().todoApp.todo.routeParam;
    axios
      .post("/api/app/todo/trash-todo", id)
      .then((response) => dispatch({ type: "TRASH_TASK", id }))
      .then(dispatch(getTodos(params)));
  };
};

export const updateTodo = (todo) => {
  const request = axios.post("/api/apps/todo/update-todo", todo);
  return (dispatch, getState) => {
    const params = getState().todoApp.todo.routeParam;
    request.then((response) => {
      Promise.all([
        dispatch({
          type: "UPDATE_TODO",
          todos: response.data,
        }),
      ]).then(() => dispatch(getTodos(params)));
    });
  };
};

export const updateTask = (id, title, desc) => {
  return (dispatch) => {
    dispatch({ type: "UPDATE_TASK", id, title, desc });
  };
};

export const updateLabel = (id, label) => {
  return (dispatch, getState) => {
    dispatch({ type: "UPDATE_LABEL", label, id });
  };
};
// export const GET_NOTES_BY_MEMBERID = () => {
//   let url = `${baseUrl}/api/followup_note/get_notes_by_user_id/${getUserId()}`;
//   return async (dispatch) => {
//     try {
//       let res = await axios.get(url, {
//         headers: getHeaders(),
//       });
//       dispatch({
//         type: "GET_NOTES_BY_MEMBERID",
//         payload: res.data?.data,
//       });
//     } catch (error) {
//       toast.error(error.message.replace(/\\/g, ""), toastCss());
//     }
//   };
// };
export const ADD_NOTE_FOR_STUDENT = (payload, studentId, studentType, dateTill) => {
  return async (dispatch) => {
    let url = `${baseUrl}/api/followup_note/add_note/${getUserId()}/${studentId}`;
    try {
      let response = await axios.post(url, payload, {
        headers: getHeaders(),
      });
      if (response?.data?.success) {
        if (payload.noteType === "Miss You") {
          dispatch(
            GET_NOTES_BY_MEMBERID("Miss You", "today", 0, 10),
            GET_NOTES_BY_STUDENT(studentId),
          );
          dispatch(
            GET_MISS_YOU_CALL(0, 10, studentType, dateTill)
          );
        } else if (payload.noteType === "Renewal") {
          dispatch(
            GET_NOTES_BY_MEMBERID("Renewal", "today", 0, 10),
            GET_NOTES_BY_STUDENT(studentId),

          );
          dispatch(
            GET_RENEWAL_ALL_DATA(0, 10, studentType, dateTill)
          )
        }
        else if (payload.noteType === "Birthday") {
          dispatch(
            GET_NOTES_BY_MEMBERID("Birthday", "today", 0, 10),
            GET_NOTES_BY_STUDENT(studentId),
          );
          dispatch(
            GET_BIRTHDAY_ALL_DATA(0, 10, studentType, dateTill)
          );
        }
      }

      toast.success("Note Added successfully!", toastCss());
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};

export const EDIT_NOTE_OF_STUDENT = (payload, note) => {
  let url = `${baseUrl}/api/followup_note/update_note/${getUserId()}/${note?._id
    }`;
  return async (dispatch) => {
    try {
      await axios.put(url, payload, {
        headers: getHeaders(),
      });
      toast.success("Note Updated successfully!", toastCss());
      dispatch(GET_NOTES_BY_STUDENT(note?.memberId));
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};

export const DELETE_NOTE_BY_STUDENTID = (note, studentType, dateTill, noteType, studentId) => {
  let url = `${baseUrl}/api/followup_note/remove_note/${getUserId()}/${note?._id
    }`;
  return async (dispatch) => {
    try {
      await axios.delete(url, {
        headers: getHeaders(),
      });
      // dispatch(GET_NOTES_BY_STUDENT(note?.memberId));
      if (noteType === "Miss You") {
        dispatch(
          GET_NOTES_BY_MEMBERID("Miss You", "today", 0, 10),
        );
        dispatch(
          GET_NOTES_BY_STUDENT(note?.memberId)
        )
        dispatch(
          GET_MISS_YOU_CALL(0, 10, studentType, dateTill)
        );
      } else if (noteType === "Renewal") {
        dispatch(
          GET_NOTES_BY_MEMBERID("Renewal", "today", 0, 10),

        );
        dispatch(
          GET_NOTES_BY_STUDENT(note?.memberId)
        )
        dispatch(
          GET_RENEWAL_ALL_DATA(0, 10, studentType, dateTill)
        )
      }
      else if (noteType === "Birthday") {
        dispatch(
          GET_NOTES_BY_MEMBERID("Birthday", "today", 0, 10),
        );
        dispatch(
          GET_NOTES_BY_STUDENT(note?.memberId)
        )
        dispatch(
          GET_BIRTHDAY_ALL_DATA(0, 10, studentType, dateTill)
        );

      }


      toast.success("Note Removed successfully!", toastCss());
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};


export const GET_ACTIVE_STUDENT = () => {
  let url = `${baseUrl}/api/member/active_student/${getUserId()}`;
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_ACTIVE_STUDENT",
        payload: null,
      });
      let response = await axios.get(url, { headers: getHeaders() });
      if (response.data && response.status === 200 && !response.data.msg) {
        dispatch({
          type: "GET_ACTIVE_STUDENT",
          payload: response.data?.active_std,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};

export const HANDLE_STUDENT_IMAGE_UPDATE = (file) => {
  return async (dispatch) => {
    dispatch({
      type: "HANDLE_STUDENT_IMAGE_UPDATE",
      payload: file,
    });
  };
};

export const GET_STUDENT_ATTENDANCE = (pageNumebr) => {
  let studentId = window.location.pathname.split("student-info/")[1];
  let url = `${baseUrl}/api/attendence/get_student_attendence/${getUserId()}/${studentId}/${pageNumebr}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, { headers: getHeaders() });
      dispatch({
        type: "GET_STUDENT_ATTENDANCE",
        payload: response?.data,
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};
// GET_STUDENT_ATTENDANCE
export const STUDENTS_REMOVE = (stdIds) => {
  let url = `${baseUrl}/api/member/delete_multipal_member/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await axios.delete(url, {
        headers: getHeaders(),
        data: { stdIds: stdIds },
      });
      if (res?.data?.success) {
        toast.info("Student removed Successfully!", toastCss());
        return true;
      } else {
        toast.info(res.data.msg, toastCss());
        return false;
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
      return false;
    }
  };
};

export const GET_RANK_BY_STUDENT_ID = () => {
  let syduentId = window.location.pathname.split("/")[2];

  let url = `${baseUrl}/api/member/get_Rank/${getUserId()}/${syduentId}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, { headers: getHeaders() });
      dispatch({
        type: "GET_RANK_BY_STUDENT_ID",
        payload: response.data?.data,
      });
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};
export const ADD_RANK_BY_STUDENT_ID = (payload) => {
  let syduentId = window.location.pathname.split("/")[2];
  let url = `${baseUrl}/api/member/add_Rank/${getUserId()}/${syduentId}`;
  return async (dispatch) => {
    try {
      let response = await axios.post(url, payload, { headers: getHeaders() });
      toast.info(response?.data?.msg, toastCss());
      dispatch(GET_RANK_BY_STUDENT_ID());
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};
export const EDIT_RANK_BY_STUDENT_ID = (payload, rankId, studentId) => {
  let url = `${baseUrl}/api/member/updateRank/${studentId}/${rankId}`;
  return async (dispatch) => {
    try {
      let response = await axios.put(url, payload, { headers: getHeaders() });
      toast.info(response?.data?.msg, toastCss());
      dispatch(GET_RANK_BY_STUDENT_ID());
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};
export const RANK_REMOVE_OF_STUDENT_ID = (rankid) => {
  let url = `${baseUrl}/api/member/remove_Rank/${getUserId()}/${rankid}`;
  return async (dispatch) => {
    try {
      await axios.delete(url, { headers: getHeaders() });
      toast.info("Rank removed Successfully!", toastCss());
      dispatch(GET_RANK_BY_STUDENT_ID());
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};

export const GET_ACTIVE_TRAIL_LIST = () => {
  let url = `${baseUrl}/api/member/active_trial/${getUserId()}`;
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_ACTIVE_TRAIL_LIST",
        payload: null,
      });
      let response = await axios.get(url, { headers: getHeaders() });
      if (response.data && response.status === 200 && !response.data.msg) {
        dispatch({
          type: "GET_ACTIVE_TRAIL_LIST",
          payload: response?.data?.active_trial,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};

export const GET_LEAD_LIST = () => {
  let url = `${baseUrl}/api/member/Leads/${getUserId()}`;
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_LEAD_LIST",
        payload: null,
      });
      let response = await axios.get(url, { headers: getHeaders() });

      if (response.status === 200) {
        dispatch({
          type: "GET_LEAD_LIST",
          payload: response?.data?.lead,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};



export const GET_CHAT_USERS_LIST = () => {
  let url = `${baseUrl}/api/chat-users`;
  // console.log(url)
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_CHAT_USERS_LIST_LOADING",
        payload: true
      })
      let response = await axios.get(url, { headers: getHeaders() });
      if (response.status === 200) {
        dispatch({
          type: "GET_CHAT_USERS_LIST",
          payload: response?.data,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  }
}

export const GET_CAMP_LIST = () => {
  let url = `${baseUrl}/api/member/camp_student/${getUserId()}`;
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_CAMP_LIST",
        payload: null,
      });
      let response = await axios.get(url, { headers: getHeaders() });
      if (response.data && response.status === 200 && !response.data.msg) {
        dispatch({
          type: "GET_CAMP_LIST",
          payload: response?.data?.camp,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};

export const GET_FORMER_LIST = () => {
  let url = `${baseUrl}/api/member/Former_student/${getUserId()}`;
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_FORMER_LIST",
        payload: null,
      });
      let response = await axios.get(url, { headers: getHeaders() });
      if (response.data && response.status === 200 && !response.data.msg) {
        dispatch({
          type: "GET_FORMER_LIST",
          payload: response?.data?.former,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};
export const GET_FORMER_TRAIL_LIST = () => {
  let url = `${baseUrl}/api/member/Former_trial/${getUserId()}`;
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_FORMER_TRAIL_LIST",
        payload: null,
      });
      let response = await axios.get(url, { headers: getHeaders() });
      if (response.data && response.status === 200 && !response.data.msg) {
        dispatch({
          type: "GET_FORMER_TRAIL_LIST",
          payload: response?.data?.former_trial,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};

export const GET_AFTER_SCHOOL_LIST = () => {
  let url = `${baseUrl}/api/member/after_school_student/${getUserId()}`;
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_AFTER_SCHOOL_LIST",
        payload: null,
      });
      let response = await axios.get(url, { headers: getHeaders() });
      if (response?.data.success) {
        dispatch({
          type: "GET_AFTER_SCHOOL_LIST",
          payload: response?.data?.after_school,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};
// Candidate Part...............
export const GET_CANDIDATE_LIST = (page, perrow, sortBy, order) => {
  let params = `?sortBy=${sortBy}&order=${order}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${baseUrl}/api/recomend_candidate/get_by_user_id/${getUserId()}/${page}/${sortBy === undefined ? perrow : perrow + params}`,
        {
          headers: getHeaders(),
        }
      );
      if (response.status === 200) {
        dispatch({
          type: "GET_CANDIDATE_LIST",
          payload: response.data,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};

//  get member list by search
export const SEARCH_RECOMEND_CANDIDATE = (value) => {
  let url = `${baseUrl}/api/recommended/search?search=${value}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, {
        headers: getHeadersForFile(),
      });
      if (response.data && response.status === 200) {
        dispatch({
          type: "GET_CANDIDATE_LIST",
          payload: response.data,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};

// Fliter Candiate Table Data
export const FILTER_CANDIDATE_DATA = (date) => {
  return async (dispatch) => {
    let userId = localStorage.getItem("user_id");
    try {
      let response = await axios.get(
        `${baseUrl}/api/recomend_candidate/filterByMY/${userId}/${date}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      dispatch({
        type: `FILTER_CANDIDATE_DATA`,
        payload: {
          data: response.data?.data,
          success: true,
          totalCount: response.data?.data?.length || 0
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}


// Fliter Candiates Stripe Report
// export const FILTER_CANDIDATE_STRIPE_REPORT = (date, candidateName, studentType) => {
//   return async (dispatch) => {
//     let userId = localStorage.getItem("user_id");
//     try {
//       let response = await axios.get(
//         `${baseUrl}/api/candidates/get-stripe-report-by-candidate/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           },
//         }
//       );
//       dispatch({
//         type: `FILTER_CANDIDATE_STRIPE_REPORT`,
//         payload: {
//           data: response.data?.data,
//           success: true,
//           totalCount: response.data?.data?.length || 0
//         },
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

//Stripe Filter Data
export const GET_FILTER_BY_STRIPE = async () => {
  let userId = localStorage.getItem("user_id");
  let response = await axios.get(
    `${baseUrl}/api/candidates/get-stripe-filter-by-month-year/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
  if (response.data && response.status === 200) {
    return response.data
  }
}




export const Add_CANDIDATE_LIST = (payload) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${baseUrl}/api/recomend_candidate/${localStorage.getItem("user_id")}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data && response.status === 200) {
        toast.success(response.data.msg, toastCss());
        dispatch(GET_CANDIDATE_LIST(0, 5));
      }
    } catch (error) {
      toast.error(error, toastCss());
    }
  };
};
export const GET_PRAMOTE_TO_RECOMMANDE_CANDIDATE = (id, payload) => {
  let url = `${baseUrl}/api/recomend_candidate/promote_stripe/${getUserId()}/${id}`;
  return async (dispatch) => {
    try {
      let response = await axios.put(url, payload, {
        headers: getHeaders(),
      });
      if (response.data && response.status === 200 && response.status) {
        toast.success(response.data.msg, toastCss());
        dispatch(GET_CANDIDATE_LIST);
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
      dispatch(GET_CANDIDATE_LIST(0, 5));
    }
  };
};

export const UPDATE_CANDIDATE_STRIPE = (id, payload) => {
  // console.log(payload)
  return async (dispatch) => {
    try {
      let response = await axios.put(
        `${baseUrl}/api/recomend_candidate/promote_stripe/${getUserId()}/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data && response.status === 200) {
        toast.success(response.data.msg, toastCss());
        dispatch(GET_CANDIDATE_LIST(0, 5));
      }
    } catch (error) {
      toast.error("something went wrong in fetching class student", toastCss());
    }
  };
};

export const CANDIDATE_REMOVE = (studentId) => {
  const payload = {
    recommendIds: studentId,
  };
  return async (dispatch) => {
    try {
      let response = await axios.delete(
        `${baseUrl}/api/recomend_candidate/removeAll/${getUserId()}`,
        {
          headers: getHeaders(),
          data: payload,
        }
      );

      if (response.data && response.status === 200) {
        toast.success(response.data.msg, toastCss());
        dispatch(GET_CANDIDATE_LIST(0, 5));
      }
    } catch (error) {
      toast.error("something went wrong in fetching class student", toastCss());
    }
  };
};

export const LIST_ALL_MEMBERS = () => {
  let url = `${baseUrl}/api/member/member_list/${getUserId()}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, {
        headers: getHeadersForFile(),
      });
      if (response.data && response.status === 200) {
        dispatch({
          type: "LIST_ALL_MEMBERS",
          payload: response.data,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};

//  get member list by search
export const SEARCH_MEMBERS_LIST_INFO = (value) => {
  let url = `${baseUrl}/api/text-chat/searchContact/${getUserId()}?search=${value}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, {
        headers: getHeadersForFile(),
      });
      if (response.data && response.status === 200) {
        dispatch({
          type: "LIST_ALL_MEMBERS",
          payload: response.data,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};

export const ADD_NEW_STUDENT = (payload) => {
  let url = `${baseUrl}/api/member/add_member/${getUserId()}`;
  return async (dispatch) => {
    try {
      let res = await axios.post(url, payload, {
        headers: getHeadersForFile(),
      });
      if (res.data.success) {
        toast.success(res.data?.msg, toastCss());
        setTimeout(() => {
          window.location.href = "/student-info/" + res.data.data;
        }, 1200);
      } else {
        toast.info(res.data?.msg, toastCss());
      }
    } catch (error) {
      toast.error(error.msg.replace(/\\/g, ""), toastCss());
    }
  };
};

export const UPDATE_STUDENT = (studentType, payload, memberId) => {
  let url = `${baseUrl}/api/member/update_member/${getUserId()}/${memberId}`;
  return async (dispatch) => {
    try {
      let res = await axios.put(url, payload, { headers: getHeadersForFile() });
      if (res.data.success) {
        toast.success("Member Updated successfully!", toastCss());
        dispatch(LIST_ALL_MEMBERS());
        setTimeout(() => {
          // window.location.href = redirectStudentTypePath(studentType);
        }, 1200);
      } else {
        toast.error("unable to Updated", toastCss());
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};

export const GET_NOTES_BY_STUDENT = (studentId) => {
  let url = `${baseUrl}/api/followup_note/get_notes_by_member_id/${getUserId()}/${studentId}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, {
        headers: getHeaders(),
      });
      if (response.data && response.status === 200) {
        dispatch({
          type: "GET_NOTES_BY_STUDENT",
          payload: response.data.data,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};




export const GET_CATEGORIES = () => {
  return async (dispatch) => {
    let response = await axios.get(
      `${baseUrl}/api/list_of_program/${getUserId()}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    if (response.data && response.status === 200) {
      dispatch({
        type: "GET_CATEGORIES",
        payload: response.data,
      });
    }
  };
};

export const CREATE_FINANCE_INFO = ({ memberId, data }) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${baseUrl}/api/finance_info/create_finance_info/${localStorage.getItem(
          "user_id"
        )}/${memberId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data && response.status === 200) {
      }
      dispatch(GET_ACTIVE_STUDENT());
      setTimeout(() => {
        window.location.href = "/app/student/list";
      }, 500);
    } catch (error) {
      setTimeout(() => {
        window.location.href = "/app/student/list";
      }, 500);
    }
  };
};

export const GET_SERACH_STDUNET_BY_TYPE = (payload, studentType) => {
  let url = `${baseUrl}/api/member/searchstudent_by_type/${getUserId()}/${studentType}?search=${payload}`;
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_SERACH_STDUNET_BY_TYPE",
        payload: null,
      });
      let res = await axios.get(url, { headers: getHeaders() });
      if (res.data?.success) {
        dispatch({
          type: "GET_SERACH_STDUNET_BY_TYPE",
          payload: res.data.data,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};
export const GET_SERACH_STDUNET_BY_INTREST = (payload, Intrest) => {
  let url = `${baseUrl}/api/member/searchstudent_by_interest/${getUserId()}/${Intrest}?search=${payload}`;
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_SERACH_STDUNET_BY_INTREST",
        payload: null,
      });
      let response = await axios.get(url, { headers: getHeaders() });
      if (response.data && response.status === 200 && !response.data.msg) {
        dispatch({
          type: "GET_SERACH_STDUNET_BY_INTREST",
          payload: response.data.data,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};

export const GET_FILTER_STDUNET_BY_FIELD = (payload) => {
  let data = { filter: { ...payload, userId: [getUserId()] } };
  let url = `${baseUrl}/api/addMember/multiFilter/${getUserId()}`;
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_FILTER_STDUNET_BY_FIELD",
        payload: null,
      });
      let response = await axios.post(url, data, { headers: getHeaders() });
      if (response.data.success) {
        dispatch({
          type: "GET_FILTER_STDUNET_BY_FIELD",
          payload: response.data?.data,
        });
      }
    } catch (error) {
      toast.error(error.message.replace(/\\/g, ""), toastCss());
    }
  };
};

export const GET_PAGE_NUMBER_PER_PAGE = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "GET_PAGE_NUMBER_PER_PAGE",
      payload: data,
    });
  };
};
export const CLEAR_SELECTED_ROWS = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "CLEAR_SELECTED_ROWS",
      payload: data,
    });
  };
};
