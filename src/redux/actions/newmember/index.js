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
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
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

export const GET_ACTIVE_MEMBER = (pageNumber) => {
  let url = `${baseUrl}/api/admin/user_list/${getUserId()}/${pageNumber}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, { headers: getHeaders() });
      if (response.data && response.status === 200 && !response.data.msg) {
        dispatch({
          type: "GET_ACTIVE_MEMBER",
          payload: response.data,
          filterType: "active_member",
        });
      }
    } catch (error) {}
  };
};

export const ADD_NEW_MEMBER = (data) => {
  let dataEntries = Object.entries(data);
  let formData = new FormData();
  dataEntries.map((v) => {
    formData.append(v[0], v[1]);
    return v;
  });
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${baseUrl}/api/admin/user_create/${localStorage.getItem("user_id")}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "content-type": "multipart/form-data",
          },
        }
      );
      if (response.data && response.status === 200) {
        toast.success(response.data, toastCSS());
      } else {
        toast.error("Something went wrong", toastCSS());
      }
      dispatch(GET_ACTIVE_MEMBER());
      setTimeout(() => {
        window.location.href = "/app/member/list";
      }, 500);
    } catch (error) {
      toast.error("Something went wrong", toastCSS());
      dispatch(GET_ACTIVE_MEMBER());
      setTimeout(() => {
        window.location.href = "/app/member/list";
      }, 500);
    }
  };
};
export const EDIT_MEMBER = (data, userid) => {
  return async (dispatch) => {
    try {
      let response = await axios.put(
        `${baseUrl}/api/admin/update_user/${localStorage.getItem(
          "user_id"
        )}/${userid}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "content-type": "application/json",
          },
        }
      );
      if (response.data && response.status === 200) {
        toast.success(response.data, toastCSS());
      } else {
        toast.error("Something went wrong", toastCSS());
      }
      dispatch(GET_ACTIVE_MEMBER());
      setTimeout(() => {
        window.location.href = "/app/member/list";
      }, 500);
    } catch (error) {
      toast.error(error?.message, toastCSS());
      dispatch(GET_ACTIVE_MEMBER());
      setTimeout(() => {
        window.location.href = "/app/member/list";
      }, 500);
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
        payload: response.data?.data,
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
        toast.success(response.data, toastCSS());
      }
      dispatch(GET_ACTIVE_MEMBER());
      setTimeout(() => {
        window.location.href = "/app/member/list";
      }, 500);
    } catch (error) {
      toast.error(error, toastCSS());
      dispatch(GET_ACTIVE_MEMBER());
      setTimeout(() => {
        window.location.href = "/app/member/list";
      }, 500);
    }
  };
};

export const GET_LETEST_MEMMBER = (pageNumber, perpage) => {
  let url = `${baseUrl}/api/member/latest_member/${getUserId()}/${pageNumber}/${perpage}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, { headers: getHeaders() });
      if (response.data && response.status === 200 && !response.data.msg) {
        dispatch({
          type: "GET_LETEST_MEMMBER",
          payload: response.data,
        });
      }
    } catch (error) {}
  };
};
export const GET_TODAY_TASKS = (pageNumber, rowperpage) => {
  let url = `${baseUrl}/api/today_taskread/${getUserId()}/${pageNumber}/${rowperpage}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, { headers: getHeaders() });
      if (response.data && response.status === 200 && !response.data.msg) {
        dispatch({
          type: "GET_TODAY_TASKS",
          payload: response.data,
        });
      }
    } catch (error) {}
  };
};

export const GET_THIS_WEEK_TASK = (pageNumber, rowperpage) => {
  let url = `${baseUrl}/api/weekTaskRead/${getUserId()}/${pageNumber}/${rowperpage}`;
  return async (dispatch) => {
    try {
      let response = await axios.get(url, { headers: getHeaders() });
      if (response.data && response.status === 200 && !response.data.msg) {
        dispatch({
          type: "GET_THIS_WEEK_TASK",
          payload: response.data,
        });
      }
    } catch (error) {}
  };
};
