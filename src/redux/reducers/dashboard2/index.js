const initState = {
  isLoading: false,
  total: 0,
  isFetching: false,
  saleState: {
    state: {
      today: 0,
      weekly: 0,
      monthly: 0,
    },
    loading: false,
  },

  paymentDueState: {
    today: 0,
    weekly: 0,
    month: 0,
    loading: false,
  },
  studentCount: {
    labels: [
      "Former Trial",
      "Leads",
      "Active Student",
      "Former Student",
      "Active Trial",
    ],
    datasets: [1, 0, 0, 0, 1],
    loading: false,
  },
  activeTrialMemberList: null,
  leadsThisMonth: null,
  leadsAllTime: null,
  memberListThisMonth: null,
  memberListAllTime: null,
  birthDayListThisMonth: null,
  birthDayListAllTime: null,

  expiredMembership: null,
  allMemberships: null,

  // tasks
  todayTasks: null,
  allTasks: null,

  // candidates
  candidate_BBC: null,
  candidate_LC: null,
  candidate_IC: null,
  candidate_AC: null,
};

export const dashboard2Reducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_SALES_STATE_LOADING":
      return {
        ...state,
        saleState: { state: state.saleState.state, loading: true },
      };
    case "GET_SALES_STATE_SUCCESS":
      return {
        ...state,
        saleState: { state: action.payload, loading: false },
      };
    case "GET_SALES_STATE_ERROR":
      return {
        ...state,
        saleState: { state: state.saleState.state, loading: false },
      };

    /// TODAY PAYMENT DUE STATE
    case "GET_TODAY_PAYMENT_DUE_STATE_LOADING":
      return {
        ...state,
        paymentDueState: {
          today: state.paymentDueState.today,
          weekly: state.paymentDueState.weekly,
          month: state.paymentDueState.month,
          loading: true,
        },
      };
    case "GET_TODAY_PAYMENT_DUE_STATE_SUCCESS":
      return {
        ...state,
        paymentDueState: {
          today: action.payload,
          weekly: state.paymentDueState.weekly,
          month: state.paymentDueState.month,
          loading: false,
        },
      };
    case "GET_TODAY_PAYMENT_DUE_STATE_ERROR":
      return {
        ...state,
        paymentDueState: { ...state.paymentDueState, loading: false },
      };

    /// WEEKLY PAYMENT DUE STATE
    case "GET_WEEKLY_PAYMENT_DUE_STATE_LOADING":
      return {
        ...state,
        paymentDueState: {
          today: state.paymentDueState.today,
          weekly: state.paymentDueState.weekly,
          month: state.paymentDueState.month,
          loading: true,
        },
      };
    case "GET_WEEKLY_PAYMENT_DUE_STATE_SUCCESS":
      return {
        ...state,
        paymentDueState: {
          today: state.paymentDueState.today,
          weekly: action.payload,
          month: state.paymentDueState.month,
          loading: false,
        },
      };
    case "GET_WEEKLY_PAYMENT_DUE_STATE_ERROR":
      return {
        ...state,
        paymentDueState: { ...state.paymentDueState, loading: false },
      };

    /// MONTHLY PAYMENT DUE STATE
    case "GET_MONTHLY_PAYMENT_DUE_STATE_LOADING":
      return {
        ...state,
        paymentDueState: {
          today: state.paymentDueState.today,
          weekly: state.paymentDueState.weekly,
          month: state.paymentDueState.month,
          loading: true,
        },
      };
    case "GET_MONTHLY_PAYMENT_DUE_STATE_SUCCESS":
      return {
        ...state,
        paymentDueState: {
          today: state.paymentDueState.today,
          weekly: state.paymentDueState.weekly,
          month: action.payload,
          loading: false,
        },
      };
    case "GET_MONTHLY_PAYMENT_DUE_STATE_ERROR":
      return {
        ...state,
        paymentDueState: { ...state.paymentDueState, loading: false },
      };

    // Student Count Data
    case "GET_STUDENT_COUNT_DATA_STATE_LOADING":
      return {
        ...state,
        studentCount: {
          labels: state.studentCount.labels,
          datasets: state.studentCount.datasets,
          loading: true,
        },
      };
    case "GET_STUDENT_COUNT_DATA_STATE_SUCCESS":
      return {
        ...state,
        studentCount: {
          labels: action.payload.labels,
          datasets: action.payload.datasets,
          loading: false,
        },
      };
    case "GET_STUDENT_COUNT_DATA_STATE_ERROR":
      return {
        ...state,
        studentCount: {
          labels: state.studentCount.labels,
          datasets: state.studentCount.datasets,
          loading: false,
        },
      };
    case "ACTIVE_TRAIL_OF_ALL_TIME":
      return {
        ...state,
        activeTrialMemberList: action.payload,
      };
    case "LEADS_OF_THIS_MONTH":
      return {
        ...state,
        leadsThisMonth: action.payload,
      };
    case "LEADS_OF_ALL_TIME":
      return {
        ...state,
        leadsAllTime: action.payload,
      };

    case "MEMBER_LIST_OF_THIS_MONTH":
      return {
        ...state,
        memberListThisMonth: action.payload,
      };
    case "MEMBER_LIST_OF_ALL_TIME":
      return {
        ...state,
        memberListAllTime: action.payload,
      };

    case "BIRTHDAY_LIST_OF_THIS_MONTH":
      return {
        ...state,
        birthDayListThisMonth: action.payload,
      };
    case "BIRTHDAY_LIST_OF_ALL_TIME":
      return {
        ...state,
        birthDayListAllTime: action.payload,
      };
    case "GET_EXPIRED_MEMBERSHIPS":
      return {
        ...state,
        expiredMembership: action.payload,
      };

    case "GET_ALL_MEMBERSHIPS":
      return {
        ...state,
        allMemberships: action.payload,
      };

    case "GET_TODAY_TASKS":
      return {
        ...state,
        todayTasks: action.payload,
      };

    case "GET_ALL_TASKS":
      return {
        ...state,
        allTasks: action.payload,
      };

    case "GET_BBC_CANDIDATE":
      return {
        ...state,
        candidate_BBC: action.payload,
      };

    case "GET_LC_CANDIDATE":
      return {
        ...state,
        candidate_LC: action.payload,
      };
    case "GET_IC_CANDIDATE":
      return {
        ...state,
        candidate_IC: action.payload,
      };
    case "GET_AC_CANDIDATE":
      return {
        ...state,
        candidate_AC: action.payload,
      };
    default:
      return state;
  }
};
