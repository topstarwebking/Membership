
const initState = {
    breadCrumbValue: [{ folderName: null, subFolderName: null }],
    taskFolderList: [],
    taskToDisplayToUser: [],
};

export const TaskAndGoalsTaskReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_BREAD_CRUMB":
            return { ...state, breadCrumbValue: action?.payload };
        case "TASK_TO_DISPLAY_TO_USER":
            return { ...state, taskToDisplayToUser: action?.payload };

        case "GET_TASK_FOLDER_LIST":
            return { ...state, taskFolderList: action?.payload };

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
        case "FILTER_TASK_STATUS_OR_TIME":
            return { ...state, taskToDisplayToUser: action?.payload };
        default:
            return state;
    }
};


