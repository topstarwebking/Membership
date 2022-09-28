const initState = {
  unverifiedEmails: null,
  getAllAdminCategoris: [],
};

export const adminEmailsReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_UN_VERIFIED_EMAILS":
      return { ...state, unverifiedEmails: action.payload };
    case "GET_CATEGORIES_EMAIL_FOR_ADMIN":
      return { ...state, getAllAdminCategoris: action.payload };
    case "GET_NURTURING_CATEGORIES_EMAIL_FOR_ADMIN":
      return {
        ...state,
        getAllAdminCategoris: action.payload,
      };
    case "GET_COMPOSE_CATEGORIES_EMAIL_FOR_ADMIN":
      return {
        ...state,
        getAllAdminCategoris: action.payload,
      };
   
    default:
      return state;
  }
};
