import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getTodos = (routeParams) => {
  return async (dispatch) => {
    await axios
      .get("api/apps/todo", {
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

export const GET_TODOS = (filter) => {
  return async (dispatch) => {
    try {
      let userId = localStorage.getItem("user_id") || "";
      let token = localStorage.getItem("access_token");
      let response;
      if (filter === "today") {
        response = await axios.get(`${baseUrl}/api/today_taskread/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else if (filter === "tomorrow") {
        response = await axios.get(
          `${baseUrl}/api/tomorrow_taskread/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (filter === "upcoming") {
        response = await axios.get(
          `${baseUrl}/api/upcoming_taskread/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (filter === "completed") {
        response = await axios.get(
          `${baseUrl}/api/completed_taskread/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (filter === "notcompleted") {
        response = await axios.get(
          `${baseUrl}/api/not_completed_taskread/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (filter === "events") {
        response = await axios.get(`${baseUrl}/api/events_taskread/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else if (filter === "business") {
        response = await axios.get(
          `${baseUrl}/api/business_taskread/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (filter === "personal") {
        response = await axios.get(
          `${baseUrl}/api/personal_taskread/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (filter === "appointment") {
        response = await axios.get(
          `${baseUrl}/api/appointment_taskread/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.get(`${baseUrl}/api/list_of_task/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      if (response.data && response.status === 200) {
        dispatch({
          type: "GET_TODOS_ALL",
          payload: {
            todos: response.data,
            routeParams: filter,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
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

export const updateTask = (id, task) => {
  return (dispatch) => {
    axios
      .put(
        `${baseUrl}/api/update_task/${localStorage.getItem("user_id")}/${id}`,
        { ...task },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        dispatch(GET_TODOS());
      });
  };
};
export const updateLabel = (id, label) => {
  return (dispatch, getState) => {
    dispatch({ type: "UPDATE_LABEL", label, id });
  };
};
export const addNewTask = (task) => {
  return (dispatch, getState) => {
    const params = getState().todoApp.todo.routeParam;
    axios.post("/api/apps/todo/new-task", { task }).then((response) => {
      dispatch({ type: "ADD_TASK", task });
      dispatch(getTodos(params));
    });
  };
};
export const ADD_NEW_TASK = (task) => {
  return (dispatch) => {
    axios
      .post(
        `${baseUrl}/api/add_task/${localStorage.getItem("user_id")}`,
        { ...task },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        dispatch(GET_TODOS());
      });
  };
};

export const taskOptions = {
  personal: "personal",
  myMember: "mymember",
};
export const taskTypes = Object.values(taskOptions);
export const taskOptionTexts = {
  myMember: "Task",
  personal: "Goals",
};
export const durationOptions = {
  today: "today",
  tommorow: "tommorow",
  upcoming: "upcoming",
  week: "week",
  month: "month",
  year: "year",
};
export const durations = Object.values(durationOptions);

export const statusKeyToNumberMapping = {
  notcompleted: 5,
  completed: 3,
  inprogress: 2,
  pending: 1,
};

export const statusNumberToLabelMapping = {
  [statusKeyToNumberMapping.pending]: "Pending",
  [statusKeyToNumberMapping.inprogress]: "In Progress",
  [statusKeyToNumberMapping.completed]: "Completed",
  [statusKeyToNumberMapping.notcompleted]: "Not completed",
};

export const priorityKeys = {
  clear: 0,
  low: 1,
  normal: 2,
  high: 3,
  urgent: 4,
};
export const labelKeys = {
  Personal: 0,
  Office: 1,
  Event: 2,
  Home: 3,
};
export const priorityMapping = {
  [priorityKeys.clear]: "Clear",
  [priorityKeys.low]: "Low",
  [priorityKeys.normal]: "Normal",
  [priorityKeys.high]: "High",
  [priorityKeys.urgent]: "Urgent",
};
export const labelMapping = {
  [labelKeys.Personal]: "Personal",
  [labelKeys.Office]: "Office",
  [labelKeys.Event]: "Event",
  [labelKeys.Home]: "Home",
};
export const filterOptions = {
  all: "all",
  today: "today",
  tomorrow: "tomorrow",
  upcoming: "upcoming",
  completed: "completed",
  notcompleted: "notcompleted",
};
export const filterOptionTexts = {
  all: "All",
  today: "Today",
  tomorrow: "Tomorrow",
  upcoming: "Upcoming",
  completed: "Completed",
  notcompleted: "Not Completed",
};
export const optionsettingText = {
  tasksetting: "Task Setting",
}
export const optionsetting = {
  tasksetting: "tasksetting",
};
export const FILTERS = Object.values(filterOptions);
const localStorageKeys = {
  accessToken: "access_token",
};

const getHeaders = () => {
  let token = localStorage.getItem(localStorageKeys.accessToken);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const prefixUrl =
  window.location.href.indexOf("localhost") > -1
    ? "http://localhost:3001/api"
    : "https://demo1.mymember.com/api"; // baseUrl + "/api";
// NOTE: Always call fetchTodos function after using any type of api call down
// below to show the latest data.
export const todoActionsV2 = {
  getTodosByFilterType: ({
    filterType = filterOptions.all,
    pageSize = 100,
    page = 1,
    searchTerm = "",
    taskType, // mymember or personal
  }) => {
    return async (dispatch) => {
      const params = {};
      params.page = page;
      params["page_size"] = pageSize;
      params.withStats = true;
      if (searchTerm) {
        params.name = searchTerm;
      }
      if (taskTypes.includes(taskType)) {
        params.type = taskType;
      }

      switch (filterType) {
        case filterOptions.completed:
          params.status = statusKeyToNumberMapping.completed;
          break;
        case filterOptions.notcompleted:
          params.status = statusKeyToNumberMapping.notcompleted;
          break;
        case filterOptions.today:
          params.time = durationOptions.today;
          break;
        case filterOptions.tomorrow:
          params.time = durationOptions.tommorow;
          break;
        case filterOptions.upcoming:
          params.time = durationOptions.upcoming;
          break;
        default:
          // "all filter"
          break;
      }

      const url = prefixUrl + "/tasks";
      const response = await axios.get(url, { params, ...getHeaders() });
      if (response.data && response.status === 200) {
        const data = response.data.data;
        dispatch({
          type: "GET_TODOS_ALL",
          payload: {
            todos: data.docs,
            completedTaskStats: {
              month: data.stats.month_complete,
              today: data.stats.today_complete,
              week: data.stats.week_complete,
              year: data.stats.year_complete,
            },
            routeParams: filterType,
          },
        });
      }
    };
  },
  updateSearchTerm: (searchTerm) => {
    return (dispatch) => {
      dispatch({
        type: "CHANGE_SEARCH_TERM",
        payload: {
          searchTerm,
        },
      });
    };
  },
  updatePriority: ({ todoId = "", priority }) => {
    return async (dispatch) => {
      const url = prefixUrl + "/tasks/" + todoId;
      const response = await axios.put(
        url,
        { priority },
        {
          ...getHeaders(),
        }
      );
      if (response.data && response.status === 200) {
        // stop loader
      } else {
        // throw error
      }
      return {
        success: response.status === 200,
      };
    };
  },
  updateStatus: ({ todoId = "", status }) => {
    return async (dispatch) => {
      const url = prefixUrl + "/tasks/" + todoId;
      const response = await axios.put(
        url,
        { status },
        {
          ...getHeaders(),
        }
      );
      if (response.data && response.status === 200) {
        // stop loader
      } else {
        // throw error
      }
      return {
        success: response.status === 200,
      };
    };
  },
  updateFilter: (filterType = filterOptions.all, rrdHistory) => {
    return (dispatch) => {
      dispatch({ type: "CHANGE_FILTER", filter: filterType });
      rrdHistory.push(`/todo/${filterType}`);
    };
  },
  changeTaskType: (taskType) => {
    return (dispatch) => {
      if (!taskTypes.includes(taskType)) {
        throw new Error("Task type should be one of " + taskTypes.join(","));
      }
      dispatch({
        type: "CHANGE_TASK_TYPE",
        payload: { taskType },
      });
    };
  },
  deleteTodo: (todoId) => {
    return async (dispatch) => {
      const url = prefixUrl + "/tasks/" + todoId;
      const response = await axios.delete(url, { ...getHeaders() });
      if (response.data && response.status === 200) {
        // stop loader
      } else {
        // throw error
      }
      return {
        success: response.status === 200,
      };
    };
  },
  getTodo: (todoId) => {
    return async (dispatch) => {
      const url = prefixUrl + "/tasks/" + todoId;
      const response = await axios.get(url, { ...getHeaders() });
      if (response.data && response.status === 200) {
        // stop loader
      } else {
        // throw error
      }
      const { _id, __v, ...responseData } = response.data.data;
      return responseData;
    };
  },
  addTodo: ({
    description,
    name,
    status,
    priority,
    dueDate,
    taskType,
    label,
  }) => {
    return async (dispatch) => {
      const url = prefixUrl + "/tasks";
      const response = await axios.post(
        url,
        {
          label,
          name,
          type: taskType,
          due_date: dueDate,
          priority,
          status,
          description,
        },
        { ...getHeaders() }
      );
      if (response.data && response.status === 200) {
        // stop loader
      } else {
        // throw error
      }
      return {
        success: response.status === 200,
      };
    };
  },
  updateTodo: ({
    todoId,
    description,
    name,
    status,
    priority,
    dueDate,
    taskType,
    label,
  }) => {
    return async (dispatch) => {
      const url = prefixUrl + "/tasks/" + todoId;
      const response = await axios.put(
        url,
        {
          label,
          name,
          type: taskType,
          due_date: dueDate,
          priority,
          status,
          description,
        },
        { ...getHeaders() }
      );
      if (response.data && response.status === 200) {
        // stop loader
      } else {
        // throw error
      }
      return {
        success: response.status === 200,
      };
    };
  },
};
