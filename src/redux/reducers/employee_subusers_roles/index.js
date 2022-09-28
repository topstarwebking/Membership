const initState = {
  employeeRolesList: [],
  employeeSubUsersList: [],
  role_id: null,
  usersRoleInfoList: [],
  sub_users_info: [],
};

export const EmployeeSubUserReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_EMPLOYEE_ROLES_LIST":
      return { ...state, employeeRolesList: action.payload };

    case "GET_SUB_USERS_LIST":
      return { ...state, employeeSubUsersList: action.payload };

    case "STORE_ROLE_ID":
      return { ...state, role_id: action.payload };

    case "ROLE_LIST_USERS_INFO":
      return { ...state, usersRoleInfoList: action.payload };

    case "GET_SUB_USERS_ASSIGNEE":
      return { ...state, sub_users_info: action.payload };

    default:
      return state;
  }
};
