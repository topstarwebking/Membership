let initState = {
  birthday_appointment: [],
  misscall_appointment: [],
  school_appointment: [],
  latest_member: [],
  expired_student: [],
  months_lead_list: [],
  past3months_lead: [],
  this_month_birthday: [],
  next_month_birthday: [],
  getBirhtdaylistOfThismont: null,
  getBirhtdaylistOfnextMonth: null,
  getmisscallmoreThen14days:null,
  getleadsofpast3months: [],
  getleadsofthismonth: [],
  getactivetrialsofThismonth: null,
  getactivetrialsofThilast3smonths: null,
  getExpiredMembership: null,
  getExpiredMembershipthismont:null,
};
export const dashboardReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_BIRTHDAY_LIST":
      return { ...state, birthday_appointment: action.payload };
    case "GET_MISSYOUCALL_LIST":
      return { ...state, misscall_appointment: action.payload };
    case "GET_SCHOOL_LIST":
      return { ...state, school_appointment: action.payload };
    case "GET_RENEWAL_LIST":
      return { ...state, renewal_appointment: action.payload };
    case "GET_LATEST_MEMBER_LIST":
      return { ...state, latest_member: action.payload };
    case "GET_MONTHS_ACTIVE_TRIAL":
      return { ...state, months_active_trial: action.payload };
    case "GET_EXPIRED_LIST":
      return { ...state, expired_student: action.payload };
    case "GET_URGENT_LIST":
      return { ...state, urgent_calling: action.payload };
    case "GET_MONTHS_LEAD":
      return { ...state, months_lead_list: action.payload };
    case "GET_3MONTHS_LEAD":
      return { ...state, past3months_lead: action.payload };
    case "GET_MONTHS_BIRTHDAY":
      return { ...state, this_month_birthday: action.payload };
    case "GET_BIRTHDAY_LIST_THIS_MONTH":
      return { ...state, getBirhtdaylistOfThismont: action.payload };
    case "GET_NEXT_MONTHS_BIRTHDAY":
      return { ...state, next_month_birthday: action.payload };
    case "GET_MISSYOUCALL_MORETHEN_14":
      return { ...state, getmisscallmoreThen14days: action.payload };
    case "GET_LEADS_PAST_3MONTH":
      return { ...state, getleadsofpast3months: action.payload };
    case "GET_LEADS_OF_THIS_MONTH":
      return { ...state, getleadsofthismonth: action.payload };
    case "GET_BIRTHDAY_LIST_NEXT_MONTH":
      return { ...state, getBirhtdaylistOfnextMonth: action.payload };
    case "ACTIVE_TRAIL_OF_THIS_MONTH":
      return { ...state, getactivetrialsofThismonth: action.payload };
    case "ACTIVE_TRAIL_OF_LAST_3MONTHS":
      return { ...state, getactivetrialsofThilast3smonths: action.payload };
    case "GET_EXPIRED_MEMBERSSHIP":
      return { ...state, getExpiredMembership: action.payload };
    case "GET_EXPIRED_MEMBERSHIP_THIS_MONTH":
      return { ...state, getExpiredMembershipthismont: action.payload };
    default:
      return state;
  }
};
