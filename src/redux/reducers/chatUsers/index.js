const initState = {
  isLoading: false,
  chatUsersList: [],
};

export const chatUsersReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_CHAT_USERS_LIST_LOADING": {
      return { ...state, isLoading: true, chatUsersList: [] };
    }
    case "GET_CHAT_USERS_LIST": {
      return {
        ...state,
        isLoading: false,
        chatUsersList: action.payload,
      };
    }
    default:
      return state;
  }
};
