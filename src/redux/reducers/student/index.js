let initState = {
  categories: [],
  active_student: null,
  active_trail: null,
  filter_candidate_data: null,
  lead_student: null,
  camp_list: null,
  former_student: null,
  former_trial_student: null,
  after_school_student: null,
  NotesByStudentId: [],
  candidate_list: null,
  getRankByStudentId: [],
  getAttendanceByStudentId: null,
  handlestudentImage: null,
  listofStudentdata: null,
  pageNumebrperpage: null,
  clearSelectedRow: false,
};
export const studentReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_NOTES_BY_STUDENT":
      return { ...state, NotesByStudentId: action.payload };
    case "GET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "GET_SERACH_STDUNET_BY_TYPE":
      return { ...state, listofStudentdata: action.payload };
    case "GET_FILTER_STDUNET_BY_FIELD":
      return { ...state, listofStudentdata: action.payload };
    case "GET_SERACH_STDUNET_BY_INTREST":
      return { ...state, listofStudentdata: action.payload };
    case "GET_PAGE_NUMBER_PER_PAGE":
      return { ...state, pageNumebrperpage: action.payload };
    case "GET_ACTIVE_STUDENT":
      return { ...state, listofStudentdata: action.payload };
    case "GET_ACTIVE_TRAIL_LIST":
      return { ...state, listofStudentdata: action.payload };
    case "FILTER_CANDIDATE_DATA": 
      return {...state, filter_candidate_data: action.payload};
    case "GET_LEAD_LIST":
      return { ...state, listofStudentdata: action.payload };
    case "GET_CAMP_LIST":
      return { ...state, listofStudentdata: action.payload };
    case "GET_FORMER_LIST":
      return { ...state, listofStudentdata: action.payload };
    case "GET_FORMER_TRAIL_LIST":
      return { ...state, listofStudentdata: action.payload };
    case "GET_AFTER_SCHOOL_LIST":
      return { ...state, listofStudentdata: action.payload };
    case "GET_CANDIDATE_LIST":
      return { ...state, candidate_list: action.payload };
    case "GET_RANK_BY_STUDENT_ID":
      return { ...state, getRankByStudentId: action.payload };
    case "GET_STUDENT_ATTENDANCE":
      return { ...state, getAttendanceByStudentId: action.payload };
    case "HANDLE_STUDENT_IMAGE_UPDATE":
      return { ...state, handlestudentImage: action.payload };
    case "CLEAR_SELECTED_ROWS":
      return { ...state, clearSelectedRow: action.payload };
    default:
      return state;
  }
};
