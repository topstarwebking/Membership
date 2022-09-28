
const initialState = {
  suggestions: [],
  isLoading: false,
  value: "",
  noSuggestions: false,
  extraStarred: [],
  openOrCloseSideBar: false,
  isPaymentDoneMS: false,
};

export const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MAYBE_UPDATE_SUGGESTIONS":
      return {
        ...state,
        suggestions: action.suggestions,
        isLoading: false,
      };
    case "HANDLE_SIDEBAR_OPEN_4_DIFF_DEVISE":
      return {
        ...state,
        openOrCloseSideBar: action?.payload,
      };
    case "HANDLE_IS_PAYMENT_DONE_FOR_MEMBERSHIP_BY":
      return {
        ...state, isPaymentDoneMS:action?.payload
      };
    default:
      return state;
  }
};
