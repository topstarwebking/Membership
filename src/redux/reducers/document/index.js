const initState = {
  documentFolderList: [],
  tutorialFolderList: [],
  subFolderId: "",
  rootFolderId: "",
  getPdfOFallStudnets: null,
};
export const documentReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_DOCUMENT_FOLDER_LIST":
      return { ...state, documentFolderList: action.payload };
    case "GET_TUTORIAL_FOLDER_LIST":
      return { ...state, tutorialFolderList: action.payload };
    case "GET_FOLDER_ID":
      return {
        ...state,
        rootFolderId: action.rootFolderId,
        subFolderId: action.subFolderId,
      };
    case "MERGE_DOCOMENT":
      return {
        ...state,
        getPdfOFallStudnets: action.payload,
      };
    default:
      return state;
  }
};
