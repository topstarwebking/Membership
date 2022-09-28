const initState = {
  testList: null,
  testListCount: null,
  registeredTestList: null,
  getSelectedTestToRecommand: null,
  manageEventModalOpenRegisterStudent: false,
  SelectedTestToRecommand: [],
  selectstudentforpramote: [],
  SelectStudentForCandidate: [],
  getpromoteStudent: [],
  selectstudnetforregister: [],
  handleaddtoevent: false,
  getInvitestudents: [],
  getInvitestudentsCount: null,
  promotionRankDetails: [],
  generalRankDetails: [],
  getRegisteredforEvent: [],
  getAttendedforEvent: [],
  EventId: null,
  manageRegitsertModalOpenRegisterStudent: false,
  manageEventSelectedRegisterStudent: null,
  loader: false
};

export const testReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_TEST_LIST":
      return { ...state, testList: action.payload };
    case "FETCH_TEST_LIST_COUNT":
      return { ...state, testListCount: action.payload };
    case "GET_REGISTERED_FOR_TEST":
      return { ...state, registeredTestList: action.payload };
    case "GET_PROMPTION_RANK_DETAILS":
      return { ...state, promotionRankDetails: action.payload };
    case "GET_GENERAL_RANK_DETAILS":
      return { ...state, generalRankDetails: action.payload };
    case "SELECTED_TEST_DATA":
      return { ...state, getSelectedTestToRecommand: action.payload };
    case "SELECT_STUDENT_FOR_TEST_OR_RECOMAND":
      return { ...state, SelectedTestToRecommand: action.payload };
    case "MANAGE_EVENT_MODAL_OPEN_REGISTER_STUDENT":
      return { ...state, manageEventModalOpenRegisterStudent: action.payload }
    case "MANAGE_EVENT_SELECTED_REGISTER_STUDENT":
      return { ...state, manageEventSelectedRegisterStudent: action.payload }
    case "MANAGE_REGISTER_MODAL_OPEN_REGISTER_STUDENT":
      return { ...state, manageRegitsertModalOpenRegisterStudent: action.payload }
    case "GET_PROMOTE_STUDNETS":
      return {
        ...state,
        getpromoteStudent: action.payload,
      };
    case "HandleEventButton":
      return {
        ...state,
        handleaddtoevent: action?.payload,
      };
    case "SELECT_STUDENTID_FOR_PRAMOTE":
      return {
        ...state,
        selectstudentforpramote: action.payload,
      };
    case "SELECT_STUDENT_FOR_CANDIDATE":
      return {
        ...state,
        SelectStudentForCandidate: action.payload,
      };
    case "SELECT_STUDENT_FOR_REGESTER":
      return {
        ...state,
        selectstudnetforregister: action.payload,
      };
    case "GET_INVITEES_OF_EVENT":
      return {
        ...state,
        getInvitestudents: action.payload,
      };
    case "GET_INVITEES_OF_EVENT_COUNT":
      return {
        ...state,
        getInvitestudentsCount: action.payload,
      };
    case "GET_ATTENDED_INVITESE":
      return {
        ...state,
        getAttendedforEvent: action.payload,
      };
    case "GET_REGISTERED_FOR_EVENT":
      return {
        ...state,
        getRegisteredforEvent: action.payload,
      };
    case "EVENT_ID":
      return {
        ...state,
        EventId: action.payload,
      };
    case "LOADER":
      return {
        ...state,
        loader: action.payload,
      };
    default:
      return state;
  }
};
