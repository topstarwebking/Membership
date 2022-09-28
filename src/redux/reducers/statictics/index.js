const initState = {
  all_program: null,
  getLeadData: null,
  todayState: 0,
  thisMonthState: 0,
  lastMonthState: 0,
  past90DayState: 0,
  joinNQuitData: [],
  ranksData: null,
  memberData: null,
  rankReports: null,
  statisticsCount: null,
  GetAllQuitAndJoinyTrail: [],
  GetAllQuitAndJoinyMembers: [],
  getProgramDataByMembershipType: null,
  getProgramDataByStaticsType: [],
};

export const staticticsReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_ALL_PROGRAM":
      return {
        ...state, all_program: action.payload,
      };
    case "GET_LEAD_DATA":
      return {
        ...state, getLeadData: action.payload
      }
    case "GET_ALL_PROGRAM_TODAY":
      return {
        ...state, todayState: action.payload,
      };
    case "GET_ALL_PROGRAM_THIS_MONTH":
      return {
        ...state, thisMonthState: action.payload,
      };
    case "GET_ALL_PROGRAM_LAST_MONTH":
      return {
        ...state, lastMonthState: action.payload,
      };
    case "GET_ALL_PROGRAM_LAST_3_MONTH":
      return {
        ...state, past90DayState: action.payload,
      };
    case "GET_JOIN_N_QUIT_DATA_BY_YEAR":
      return {
        ...state,
        joinNQuitData: action.payload,
      };
    case "GET_RANKS_BY_PROGRAM":
      return {
        ...state, ranksData: action.payload,
      };
    case "GET_MEMBER_LIST_BY_PROGRAMID":
      return {
        ...state, memberData: action.payload,
      };
    case "GET_RANKS_REPORT_BY_PROGRAM":
      return {
        ...state, rankReports: action.payload,
      };
    case "GET_ALL_JOINY_AND_QUIT_TRAILS":
      return {
        ...state, GetAllQuitAndJoinyTrail: action.payload,
      };
    case "GET_STUDENET_COUNT_STATISTICS":
      return {
        ...state,
        statisticsCount: action.payload,
      };
    case "GET_ALL_JOINY_AND_QUIT_MEMBERS":
      return { ...state, GetAllQuitAndJoinyMembers: action.payload };
    case "GET_PROGRAM_DATA_BY_MEMBERSHIP_TYPE":
      return { ...state, getProgramDataByMembershipType: action.payload };
    case "GET_PROGRAM_DATA_BY_STATICS_TYPE":
      return { ...state, getProgramDataByStaticsType: action.payload }
    default:
      return state;
  }
};
