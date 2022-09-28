let initState = {
  categories: [],
  active_member: [],
  active_trail: [],
  lead_member: [],
  camp_list: [],
  former_member: [],
  former_trial_member: [],
  after_school_member: [],
  list_member: [],
  getNotesByMemberId: [],
  getBirthdayList: [],
  getBirthdayListthisMonth: [],
  getAllMissCallList: [],
  getBirthdayListnextMonth: [],
  getEarlyMissCallList: [],
  getStudentInfo: [],
  getBirthdayListby15tO30Days: null,
  getBirthdayListby7tO14Days: null,
  getBirthdayListbyMoreThen30days: null,
  eligibleStudentList: null,
  getstudentInfoById: null,
  viewActiveStudentInfo: {
    country: "United States",
    location: "United States",
    memberProfileUrl: "",
    CanNotEdit: true,
    leadsTracking: [],
    gender: "Male",
    status: "Active",
  },
  getMissYouCall: null,
  getRenewal: null,
  getBirthday: null,
  get7To14DaysMissCall: null,
  get15To30DaysMissCall: null,
  getMorthen30DaysMissCall: null,
  getInvoiceListOfMember: [],
  getCountOfStudentByType: [],
  getAllTypeStudent: [],
  getMemberPurchasedInfoOfStudent: null,
  getletetstmember: null,
  TodayTask: null,
  ThisWeektask: null,
  SearchStudent: null,
  getlistoffrozenmembership: [],
  getlistofmembershipExpiredin30days: [],
  getlistofmembershipExpiredin60days: [],
  getlistofmembershipExpiredin90days: [],
  getMorthen60DaysMissCall: null,
  getMorthen14DaysMissCall: null,
  getLeadTrackingList: null,
  getAfterCamps: null,
  getSummerCampList: null,
  getSpecialiatyProgram: null,
  getSpecialiatyProgram2: null,
};

export const memberReducer = (state = initState, action) => {
  switch (action.type) {
    case "LIST_ALL_MEMBERS":
      return { ...state, list_member: action.payload };
    case "GET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "GET_NOTES_BY_MEMBERID":
      return { ...state, getNotesByMemberId: action.payload };
    case "GET_BIRTHDAY_BY_THIS_WEEK":
      return { ...state, getBirthdayListThisweek: action.payload };
    case "GET_BIRTHDAY_BY_30_60_DAYS":
      return { ...state, getBirthdayListMoreThan30Days: action.payload };
    case "GET_BIRTHDAY_BY_MORE_THAN_60_DAYS":
      return { ...state, getBirthdayListMoreThan60Days: action.payload };
    case "GET_BIRTHDAY_BY_MORE_THEN_30":
      return { ...state, getBirthdayListbyMoreThen30days: action.payload };
    case "GET_BIRTHDAY_BY_THIS_MONTH":
      return { ...state, getBirthdayListthisMonth: action.payload };
    case "GET_BIRTHDAY_BY_NEXT_MONTH":
      return { ...state, getBirthdayListnextMonth: action.payload };
    case "GET_EARLY_MISS_CALL":
      return { ...state, getEarlyMissCallList: action.payload };
    case "GET_ALL_MISS_CALL":
      return { ...state, getAllMissCallList: action.payload };
    case "GET_MISS_YOU_CALL":
      return { ...state, getMissYouCall: action.payload };
    case "GET_RENEWAL_ALL_DATA":
      return { ...state, getRenewal: action.payload };
    case "GET_BIRTHDAY_ALL_DATA":
      return { ...state, getBirthday: action.payload };
    case "GET_7TO14_MISS_CALL":
      return { ...state, get7To14DaysMissCall: action.payload };
    case "GET_15TO30_MISS_CALL":
      return { ...state, get15To30DaysMissCall: action.payload };
    case "GET_MORE_30_MISS_CALL":
      return { ...state, getMorthen30DaysMissCall: action.payload };
    case "GET_MISS_CALL_MORETHEN60":
      return { ...state, getMorthen60DaysMissCall: action.payload };
    case "GET_MISS_CALL_MORETHEN14":
      return { ...state, getMorthen14DaysMissCall: action.payload };
    case "GET_INVOICE_LIST_BY_MEMBERID":
      return { ...state, getInvoiceListOfMember: action.payload };
    case "GET_STUDENT_INFO":
      return { ...state, getStudentInfo: action.payload };
    case "GET_ACTIVE_STUDENT_INFO":
      return {
        ...state,
        viewActiveStudentInfo: action.payload,
        getstudentInfoById: action.payload,
      };
    case "GET_COUNT_OF_STUDENT_BY_TYPE":
      return { ...state, getCountOfStudentByType: action.payload };
    case "GET_ALL_TYPE_STUDENT":
      return {
        ...state,
        getAllTypeStudent: action.payload.filter(
          (item) => item?.firstName !== undefined
        ),
      };
    case "GET_LETEST_MEMMBER":
      return { ...state, getletetstmember: action.payload };
    case "GET_TODAY_TASKS":
      return { ...state, TodayTask: action.payload };
    case "GET_THIS_WEEK_TASK":
      return { ...state, ThisWeektask: action.payload };
    case "GET_SERACH_STDUNET_BY_TYPE":
      return { ...state, listofStudentdata: action.payload };
    case "GET_SERACH_STDUNET_BY_INTREST":
      return { ...state, listofStudentdata: action.payload };
    case "GET_ALL_ELIGIBLE_STUDENT_LIST":
      return { ...state, eligibleStudentList: action.payload };
    case "GET_MEMBER_PURCHASED_INFO_OF_STUDENT":
      return { ...state, getMemberPurchasedInfoOfStudent: action.payload };
    case "GET_FROZEN_LIST_MEMBERSHIP":
      return { ...state, getlistoffrozenmembership: action.payload };
    case "GET_MEMBERSHIP_EXPIRD30DAYS":
      return { ...state, getlistofmembershipExpiredin30days: action.payload };
    case "GET_MEMBERSHIP_EXPIRD60DAYS":
      return { ...state, getlistofmembershipExpiredin60days: action.payload };
    case "GET_MEMBERSHIP_EXPIRD90DAYS":
      return { ...state, getlistofmembershipExpiredin90days: action.payload };
    case "GET_LEADS_TRACKING":
      return { ...state, getLeadTrackingList: action.payload };
    case "GET_AFTER_CAMPS":
      return { ...state, getAfterCamps: action.payload };
    case "GET_SUMMER_CAMP":
      return {
        ...state,
        getSummerCampList: action.payload,
      };
    case "GET_SPECIALIATY_PROGRAM":
      return {
        ...state,
        getSpecialiatyProgram: action.payload,
      };
    case "GET_SPECIALIATY_PROGRAM2":
      return { ...state, getSpecialiatyProgram2: action.payload };
    default:
      return state;
  }
};
