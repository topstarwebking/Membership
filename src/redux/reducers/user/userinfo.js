const initState = {
  userInfo: [],
  userinformation: null,
};

export const userInfoReducer = (state = initState, action) => {
  switch (action.type) {
    //  case "GET_PROGRAM_LIST" : return {...state, programList : action.payload};
    case "Get_User_Info": {
      return { ...state, userInfo: action.payload };
    }
    case "GET_USER_INFORMATION": {
      return {
        ...state,
        userinformation: action.payload,
      };
    }
    default:
      return state;
  }
};
