const initState = {
  getexpenseCategoryListforAdmin: null,
};

export const adminfinacereducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_EXPENSES_LIST_FOR_ADMIN":
      return { ...state, getexpenseCategoryListforAdmin: action.payload };
    default:
      return state;
  }
};
