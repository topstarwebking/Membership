let initState = {
    getAllStudentFiles:null
}
export const studentFiles = (state = initState, action) => {
    switch (action.type) {
        case "GET_FILES_OF_STUDENTS":
            return { ...state, getAllStudentFiles: action.payload };
        default:
            return state;
    }
}