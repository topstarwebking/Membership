const initState = {
  templateFolderList: [],
  templateSubFolderList: [],
  listoftemplates: null,
  subFolderId: "",
  rootFolderId: "",
  subfolderdata: null,
  mainFolderdata: null
};

export const templateReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_TEMPLATE_LIST":
      return { ...state, templateFolderList: action.payload };
    case "GET_TEMPLATES_LIST":
      return { ...state, listoftemplates: action.payload };
    case "GET_TEMPLATES_LOADING":
      return { ...state, templatesLoading: action.payload };
    case "GET_FOLDER_ID":
      return {
        ...state,
        rootFolderId: action.rootFolderId,
        subFolderId: action.subFolderId,
      };
    case "SUB_FOLDER_DATA":
      return {
        ...state,
        subfolderdata: action.payload,
      };
    case "MAIN_FOLDER_DATA":
      return {
        ...state,
        mainFolderdata: action.payload
      }
    default:
      return state;
  }
};
