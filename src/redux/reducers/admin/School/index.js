const initState = {
  schoolList: [],
  serchuserforadmin: null,
  getAlllocations: [],
};

export const adminSchoolReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_SCHOOL_LIST_FOR_ADMIN":
      return { ...state, schoolList: action.payload };
    case "SEARCH_USER_FOR_ADMIN":
      return {
        ...state,
        schoolList: action.payload,
      };
    case "GET_LOCATIONS_IN_ADMIN":
      return {
        ...state,
        getAlllocations: action.payload,
      };
    default:
      return state;
  }
};
