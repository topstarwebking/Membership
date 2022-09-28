const initState = {
    templateFolderListForAdmin: [],
    templateSubFolderListForAdmin: [],
    listoftemplatesForAdmin: null,
    subFolderId: "",
    rootFolderId: "",
  };
  
  export const templateReducerAdmin = (state = initState, action) => {
    switch (action.type) {
      case "GET_TEMPLATE_FOLDER_LIST_FOR_ADMIN":
        return { ...state, templateFolderListForAdmin: action.payload };
      case "GET_TEMPLATES_LIST_FOR_ADMIN":
        return { ...state, templateSubFolderListForAdmin: action.payload };
      case "GET_TEMPLATES_LOADING":
        return { ...state, templatesLoading: action.payload };
      case "SET_FOLDER_ID":
        return {
          ...state,
          rootFolderId: action.rootFolderId,
          subFolderId: action.subFolderId,
        };
      default:
        return state;
    }
  };