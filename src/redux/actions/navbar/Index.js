import axios from "axios";
export const loadSuggestions = () => {
  return (dispatch) => {
    axios.get("/api/search/bookmarks/data").then((response) => {
      dispatch({
        type: "MAYBE_UPDATE_SUGGESTIONS",
        suggestions: response.data.searchResult,
      });
    });
  };
};


export const HANDLE_SIDEBAR_OPEN_4_DIFF_DEVISE = (preBollen) => {
  return (dispatch) => {
    dispatch({
      type: "HANDLE_SIDEBAR_OPEN_4_DIFF_DEVISE",
      payload: !preBollen,
    });
  };
};

