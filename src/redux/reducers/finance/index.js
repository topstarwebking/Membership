const initState = {
  isLoading: false,
  total: 0,
  list: [],
  isFetching: false,
  
};

export const ccListReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_ALL_CC_LOADING":
      return {
        ...state,
        isLoading: state.total > 0 ? false : true,
        isFetching: state.total > 0 ? true : false,
      };
    case "GET_ALL_CC_SUCCESS":
      return {
        ...state,
        isLoading: false,
        list: action.payload.list,
        total: action.payload.count,
        isFetching: false,
      };
    case "GET_ALL_CC_ERROR":
      return { ...state, isLoading: false, isFetching: false };
    default:
      return state;
  }
};

const expenseInitialState = {
  todaysExpense: { loading: false, amount: 0 },
  thisWeekyExpense: { loading: false, amount: 0 },
  thisMonthExpense: { loading: false, amount: 0 },
  thisYearExpense: { loading: false, amount: 0 },
  expenseState: { loading: false, list: [] },
  monthlyCompare: { loading: false, list: [] },
  report: { loading: false, list: [], total: 0, totalExpense: 0 },
  deleteExpense: { loading: false, success: false },
  categoryAdd: { loading: false, success: false },
  categoryDelete: { loading: false, success: false, error: "" },
  categoryUpdate: { loading: false, success: false },
  expenseAdd: { loading: false, success: false, error: "" },
  // On Time Expense
  onTimeExpense: { loading: false, amount: 0 },
  onGoingExpense: { loading: false, amount: 0 },
  lastMonthExpense: { loading: false, amount: 0 },
};

export const expenseReducer = (state = expenseInitialState, action) => {
  switch (action.type) {
    case "GET_EXPENSE_STATE_LOADING":
      return {
        ...state,
        expenseState: {
          loading: state.expenseState.list.length > 0 ? false : true,
          list: state.expenseState.list,
        },
      };
    case "GET_EXPENSE_STATE_SUCCESS":
      return {
        ...state,
        expenseState: { loading: false, list: action.payload },
      };
    case "GET_EXPENSE_STATE_ERROR":
      return {
        ...state,
        expenseState: { loading: false, list: state.expenseState.list },
      };

    // Compare Expense between current and previous month data

    case "GET_MONTHLY_COMPARE_EXPENSE_LOADING":
      return {
        ...state,
        monthlyCompare: {
          loading: state.monthlyCompare.list.length > 0 ? false : true,
          list: state.monthlyCompare.list,
        },
      };
    case "GET_MONTHLY_COMPARE_EXPENSE_SUCCESS":
      return {
        ...state,
        monthlyCompare: { loading: false, list: action.payload },
      };
    case "GET_MONTHLY_COMPARE_EXPENSE_ERROR":
      return {
        ...state,
        monthlyCompare: { loading: false, list: state.monthlyCompare.list },
      };

    // todays Expense
    case "GET_TODAYS_EXPENSE_LOADING":
      return {
        ...state,
        todaysExpense: {
          loading: state.todaysExpense.amount > 0 ? false : true,
          amount: state.todaysExpense.amount,
        },
      };
    case "GET_TODAYS_EXPENSE_SUCCESS":
      return {
        ...state,
        todaysExpense: { loading: false, amount: action.payload },
      };
    case "GET_TODAYS_EXPENSE_ERROR":
      return {
        ...state,
        todaysExpense: {
          loading: false,
          amount: state.todaysExpense.amount,
        },
      };

    // Weekly Expense
    case "GET_WEEKLY_EXPENSE_LOADING":
      return {
        ...state,
        thisWeekyExpense: {
          loading: state.thisWeekyExpense.amount > 0 ? false : true,
          amount: state.thisWeekyExpense.amount,
        },
      };
    case "GET_WEEKLY_EXPENSE_SUCCESS":
      return {
        ...state,
        thisWeekyExpense: { loading: false, amount: action.payload },
      };
    case "GET_WEEKLY_EXPENSE_ERROR":
      return {
        ...state,
        thisWeekyExpense: {
          loading: false,
          amount: state.thisWeekyExpense.amount,
        },
      };

    // last Month Expense
    case "GET_LAST_MONTH_EXPENSE_LOADING":
      return {
        ...state,
        lastMonthExpense: {
          loading: state.lastMonthExpense.amount > 0 ? false : true,
          amount: state.lastMonthExpense.amount,
        },
      };
    case "GET_LAST_MONTH_EXPENSE_SUCCESS":
      return {
        ...state,
        lastMonthExpense: { loading: false, amount: action.payload },
      };
    case "GET_LAST_MONTH_EXPENSE_ERROR":
      return {
        ...state,
        lastMonthExpense: {
          loading: false,
          amount: state.lastMonthExpense.amount,
        },
      };

    // monthly Expense
    case "GET_MONTHLY_EXPENSE_LOADING":
      return {
        ...state,
        thisMonthExpense: {
          loading: state.thisMonthExpense.amount > 0 ? false : true,
          amount: state.thisMonthExpense.amount,
        },
      };
    case "GET_MONTHLY_EXPENSE_SUCCESS":
      return {
        ...state,
        thisMonthExpense: { loading: false, amount: action.payload },
      };
    case "GET_MONTHLY_EXPENSE_ERROR":
      return {
        ...state,
        thisMonthExpense: {
          loading: false,
          amount: state.thisMonthExpense.amount,
        },
      };
    // Yearly Expense
    case "GET_YEARLY_EXPENSE_LOADING":
      return {
        ...state,
        thisYearExpense: {
          loading: state.thisYearExpense.amount > 0 ? false : true,
          amount: state.thisYearExpense.amount,
        },
      };
    case "GET_YEARLY_EXPENSE_SUCCESS":
      return {
        ...state,
        thisYearExpense: { loading: false, amount: action.payload },
      };
    case "GET_YEARLY_EXPENSE_ERROR":
      return {
        ...state,
        thisYearExpense: {
          loading: false,
          amount: state.thisYearExpense.amount,
        },
      };

    case "GET_ON_TIME_EXPENSE_LOADING":
      return {
        ...state,
        onTimeExpense: {
          loading: state.onTimeExpense.amount > 0 ? false : true,
          amount: state.onTimeExpense.amount,
        },
      };
    case "GET_ON_TIME_EXPENSE_SUCCESS":
      return {
        ...state,
        onTimeExpense: { loading: false, amount: action.payload.totalExpense },
      };
    case "GET_ON_TIME_EXPENSE_ERROR":
      return {
        ...state,
        onTimeExpense: {
          loading: false,
          amount: state.onTimeExpense.amount,
        },
      };

    case "GET_ON_GOING_EXPENSE_LOADING":
      return {
        ...state,
        onGoingExpense: {
          loading: state.onGoingExpense.amount > 0 ? false : true,
          amount: state.onGoingExpense.amount,
        },
      };
    case "GET_ON_GOING_EXPENSE_SUCCESS":
      return {
        ...state,
        onGoingExpense: { loading: false, amount: action.payload.totalExpense },
      };
    case "GET_ON_GOING_EXPENSE_ERROR":
      return {
        ...state,
        onGoingExpense: {
          loading: false,
          amount: state.onGoingExpense.amount,
        },
      };

    // Filter Expense
    case "GET_EXPENSE_FILTER_REPORT_LOADING":
      return {
        ...state,
        report: {
          loading: state.report.list.length > 0 ? false : true,
          isFetching: true,
          list: state.report.list,
          total: state.report.total,
          totalExpense: state.report.totalExpense,
        },
      };
    case "GET_EXPENSE_FILTER_REPORT_SUCCESS":
      return {
        ...state,
        report: {
          loading: false,
          list: action.payload.list,
          total: action.payload.total,
          totalExpense: action.payload.totalExpense,
        },
      };
    case "GET_EXPENSE_FILTER_REPORT_ERROR":
      return {
        ...state,
        report: {
          loading: false,
        },
      };

    // delete Expense
    case "EXPENSE_DELETE_LOADING":
      return {
        ...state,
        deleteExpense: {
          loading: true,
          success: false,
        },
      };
    case "EXPENSE_DELETE_SUCCESS":
      return {
        ...state,
        deleteExpense: { loading: false, success: true },
      };
    case "EXPENSE_DELETE_ERROR":
      return {
        ...state,
        deleteExpense: {
          loading: false,
          success: false,
        },
      };
    case "EXPENSE_DELETE_RESET":
      return {
        ...state,
        deleteExpense: {
          loading: false,
          success: false,
        },
      };

    // ADD EXPENSE CATEGORY
    case "EXPENSE_CATEGORY_ADD_LOADING":
      return {
        ...state,
        categoryAdd: {
          loading: true,
          success: false,
        },
      };
    case "EXPENSE_CATEGORY_ADD_SUCCESS":
      return {
        ...state,
        categoryAdd: { loading: false, success: true },
      };
    case "EXPENSE_CATEGORY_ADD_ERROR":
      return {
        ...state,
        categoryAdd: {
          loading: false,
          success: false,
        },
      };
    case "EXPENSE_CATEGORY_ADD_RESET":
      return {
        ...state,
        categoryAdd: {
          loading: false,
          success: false,
        },
      };
    // ADD EXPENSE
    case "EXPENSE_ADD_LOADING":
      return {
        ...state,
        expenseAdd: {
          loading: true,
          success: false,
          error: "",
        },
      };
    case "EXPENSE_ADD_SUCCESS":
      return {
        ...state,
        expenseAdd: { loading: false, success: true, error: "" },
      };

    case "EXPENSE_ADD_ERROR":
      return {
        ...state,
        expenseAdd: {
          loading: false,
          success: false,
          error: action.payload,
        },
      };

    case "EXPENSE_ADD_RESET":
      return {
        ...state,
        expenseAdd: {
          loading: false,
          success: false,
          error: "",
        },
      };

    // Delete Expense Cateogry

    // ADD EXPENSE CATEGORY
    case "EXPENSE_CATEGORY_DELETE_LOADING":
      return {
        ...state,
        categoryDelete: {
          loading: true,
          success: false,
          error: "",
        },
      };
    case "EXPENSE_CATEGORY_DELETE_SUCCESS":
      return {
        ...state,
        categoryDelete: { loading: false, success: true, error: "" },
      };
    case "EXPENSE_CATEGORY_DELETE_ERROR":
      return {
        ...state,
        categoryDelete: {
          loading: false,
          success: false,
          error: action.payload,
        },
      };
    case "EXPENSE_CATEGORY_DELETE_RESET":
      return {
        ...state,
        categoryDelete: {
          loading: false,
          success: false,
          error: "",
        },
      };

    // UPDATE EXPENSE CATEGORY
    case "EXPENSE_CATEGORY_UPDATE_LOADING":
      return {
        ...state,
        categoryUpdate: {
          loading: true,
          success: false,
        },
      };
    case "EXPENSE_CATEGORY_UPDATE_SUCCESS":
      return {
        ...state,
        categoryUpdate: { loading: false, success: true },
      };
    case "EXPENSE_CATEGORY_UPDATE_ERROR":
      return {
        ...state,
        categoryUpdate: {
          loading: false,
          success: false,
        },
      };
    case "EXPENSE_CATEGORY_UPDATE_RESET":
      return {
        ...state,
        categoryUpdate: {
          loading: false,
          success: false,
        },
      };

    default:
      return state;
  }
};

// =======================================================
// ======================= INCOME   ================================

const incomeInitialState = {
  todaysIncome: { loading: false, amount: 0 },
  thisWeekyIncome: { loading: false, amount: 0 },
  thisMonthIncome: { loading: false, amount: 0 },
  thisYearIncome: { loading: false, amount: 0 },
  lastMonthIncome: { loading: false, amount: 0 },
  report: { loading: false, list: [] },
  deleteIncome: { loading: false, success: false },
};

export const IncomeReducer = (state = incomeInitialState, action) => {
  switch (action.type) {
    // todays Expense
    case "GET_TODAYS_INCOME_LOADING":
      return {
        ...state,
        todaysIncome: {
          loading: state.todaysIncome.amount > 0 ? false : true,
          amount: state.todaysIncome.amount,
        },
      };
    case "GET_TODAYS_INCOME_SUCCESS":
      return {
        ...state,
        todaysIncome: { loading: false, amount: action.payload },
      };
    case "GET_TODAYS_INCOME_ERROR":
      return {
        ...state,
        todaysIncome: {
          loading: false,
          amount: state.todaysIncome.amount,
        },
      };

    // Weekly Income
    case "GET_WEEKLY_INCOME_LOADING":
      return {
        ...state,
        thisWeekyIncome: {
          loading: state.thisWeekyIncome.amount > 0 ? false : true,
          amount: state.thisWeekyIncome.amount,
        },
      };
    case "GET_WEEKLY_INCOME_SUCCESS":
      return {
        ...state,
        thisWeekyIncome: { loading: false, amount: action.payload },
      };
    case "GET_WEEKLY_INCOME_ERROR":
      return {
        ...state,
        thisWeekyIncome: {
          loading: false,
          amount: state.thisWeekyIncome.amount,
        },
      };

    // monthly Income
    case "GET_MONTHLY_INCOME_LOADING":
      return {
        ...state,
        thisMonthIncome: {
          loading: state.thisMonthIncome.amount > 0 ? false : true,
          amount: state.thisMonthIncome.amount,
        },
      };
    case "GET_MONTHLY_INCOME_SUCCESS":
      return {
        ...state,
        thisMonthIncome: { loading: false, amount: action.payload },
      };
    case "GET_MONTHLY_INCOME_ERROR":
      return {
        ...state,
        thisMonthIncome: {
          loading: false,
          amount: state.thisMonthIncome.amount,
        },
      };
    // Yearly Income
    case "GET_YEARLY_INCOME_LOADING":
      return {
        ...state,
        thisYearIncome: {
          loading: state.thisYearIncome.amount > 0 ? false : true,
          amount: state.thisYearIncome.amount,
        },
      };
    case "GET_YEARLY_INCOME_SUCCESS":
      return {
        ...state,
        thisYearIncome: { loading: false, amount: action.payload },
      };
    case "GET_YEARLY_INCOME_ERROR":
      return {
        ...state,
        thisYearIncome: {
          loading: false,
          amount: state.thisYearIncome.amount,
        },
      };

    // Yearly Income
    case "GET_LAST_MONTH_INCOME_LOADING":
      return {
        ...state,
        lastMonthIncome: {
          loading: state.lastMonthIncome.amount > 0 ? false : true,
          amount: state.lastMonthIncome.amount,
        },
      };
    case "GET_LAST_MONTH_INCOME_SUCCESS":
      return {
        ...state,
        lastMonthIncome: { loading: false, amount: action.payload },
      };
    case "GET_LAST_MONTH_INCOME_ERROR":
      return {
        ...state,
        lastMonthIncome: {
          loading: false,
          amount: state.lastMonthIncome.amount,
        },
      };
    // Filter Income
    case "GET_INCOME_FILTER_REPORT_LOADING":
      return {
        ...state,
        report: {
          loading: state.report.list.length > 0 ? false : true,
          isFetching: true,
          list: state.report.list,
        },
      };
    case "GET_INCOME_FILTER_REPORT_SUCCESS":
      return {
        ...state,
        report: {
          loading: false,
          list: action.payload,
        },
      };
    case "GET_INCOME_FILTER_REPORT_ERROR":
      return {
        ...state,
        report: {
          loading: false,
        },
      };
      

    default:
      return state;
  }
};

const pnlInitialState = {
  // Expenses
  data: [],
  firstMonthTotalExpense: 0,
  secondMonthTotalExpense: 0,
  yearlyTotalExpense: 0,
  loading: false,
  isFetching: false,
  error: false,
  // membership
  membership: {
    loading: false,
    firstMonthTotal: 0,
    secondMonthTotal: 0,
    yearlyTotal: 0,
    data: [],
  },

  // buy product
  buyProduct: {
    loading: false,
    firstMonthTotal: 0,
    secondMonthTotal: 0,
    yearlyTotal: 0,
    data: [],
  },

  refund: {
    loading: false,
    firstMonthTotal: 0,
    secondMonthTotal: 0,
    yearlyTotal: 0,
  },

  recurringInHouse: {
    loading: false,
    firstMonthAmt: 0,
    secondMonthAmt: 0,
    yearlyAmt: 0,
  },
  recurringInCC: {
    loading: false,
    firstMonthAmt: 0,
    secondMonthAmt: 0,
    yearlyAmt: 0,
  },
};

export const pnlReducer = (state = pnlInitialState, action) => {
  switch (action.type) {
    // todays Expense
    case "GET_PNL_FILTER_REPORT_LOADING":
      return {
        ...state,
        loading: state.data.length > 0 ? false : true,
        isFetching: true,
        firstMonthTotalExpense: 0,
        secondMonthTotalExpense: 0,
        yearlyTotalExpense: 0,
      };
    case "GET_PNL_FILTER_REPORT_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        firstMonthTotalExpense: action.payload.firstMonthTotalExpense,
        secondMonthTotalExpense: action.payload.secondMonthTotalExpense,
        yearlyTotalExpense: action.payload.yearlyTotalExpense,
      };
    case "GET_PNL_FILTER_REPORT_ERROR":
      return {
        ...state,
        loading: false,
        isFetching: false,
        error: true,
        firstMonthTotalExpense: 0,
        secondMonthTotalExpense: 0,
        yearlyTotalExpense: 0,
      };

    // Membership
    case "GET_PNL_FILTER_MEMBERSHIP_LOADING":
      return {
        ...state,
        membership: {
          loading: true,
          firstMonthTotal: 0,
          secondMonthTotal: 0,
          yearlyTotal: 0,
          data: state.membership.data,
        },
      };
    case "GET_PNL_FILTER_MEMBERSHIP_SUCCESS":
      return {
        ...state,
        membership: {
          loading: false,
          firstMonthTotal: action.payload.firstMonthTotal,
          secondMonthTotal: action.payload.secondMonthTotal,
          yearlyTotal: action.payload.yearlyTotal,
          data: action.payload.data,
        },
      };
    case "GET_PNL_FILTER_MEMBERSHIP_ERROR":
      return {
        ...state,
        membership: {
          loading: false,
          firstMonthTotal: 0,
          secondMonthTotal: 0,
          yearlyTotal: 0,
          data: state.membership.data,
        },
      };

    // @product sale
    case "GET_PNL_FILTER_PRODUCT_SALE_LOADING":
      return {
        ...state,
        buyProduct: {
          loading: true,
          firstMonthTotal: 0,
          secondMonthTotal: 0,
          yearlyTotal: 0,
          data: state.buyProduct.data,
        },
      };
    case "GET_PNL_FILTER_PRODUCT_SALE_SUCCESS":
      return {
        ...state,
        buyProduct: {
          loading: false,
          firstMonthTotal: action.payload.firstMonthTotal,
          secondMonthTotal: action.payload.secondMonthTotal,
          yearlyTotal: action.payload.yearlyTotal,
          data: action.payload.data,
        },
      };
    case "GET_PNL_FILTER_PRODUCT_SALE_ERROR":
      return {
        ...state,
        buyProduct: {
          loading: false,
          firstMonthTotal: 0,
          secondMonthTotal: 0,
          yearlyTotal: 0,
          data: state.buyProduct.data,
        },
      };

    // @product sale
    case "GET_PNL_FILTER_REFUND_LOADING":
      return {
        ...state,
        refund: {
          loading: true,
          firstMonthTotal: 0,
          secondMonthTotal: 0,
          yearlyTotal: 0,
        },
      };
    case "GET_PNL_FILTER_REFUND_SUCCESS":
      return {
        ...state,
        refund: {
          loading: false,
          firstMonthTotal: action.payload.firstMonthTotal,
          secondMonthTotal: action.payload.secondMonthTotal,
          yearlyTotal: action.payload.yearlyTotal,
        },
      };
    case "GET_PNL_FILTER_REFUND_ERROR":
      return {
        ...state,
        refund: {
          loading: false,
          firstMonthTotal: 0,
          secondMonthTotal: 0,
          yearlyTotal: 0,
        },
      };

    // @Recurring By CC
    case "GET_PNL_RECURRING_CC_LOADING":
      return {
        ...state,
        recurringInCC: {
          loading: true,
          firstMonthAmt: 0,
          secondMonthAmt: 0,
          yearlyAmt: 0,
        },
      };
    case "GET_PNL_RECURRING_CC_SUCCESS":
      return {
        ...state,
        recurringInCC: {
          loading: false,
          firstMonthAmt: action.payload.firstMonthAmt,
          secondMonthAmt: action.payload.secondMonthAmt,
          yearlyAmt: action.payload.yearlyAmt,
        },
      };
    case "GET_PNL_RECURRING_CC_ERROR":
      return {
        ...state,
        recurringInCC: {
          loading: false,
          firstMonthAmt: 0,
          secondMonthAmt: 0,
          yearlyAmt: 0,
        },
      };

    // @Recurring By CC
    case "GET_PNL_RECURRING_IN_HOUSE_LOADING":
      return {
        ...state,
        recurringInHouse: {
          loading: true,
          firstMonthAmt: 0,
          secondMonthAmt: 0,
          yearlyAmt: 0,
        },
      };
    case "GET_PNL_RECURRING_IN_HOUSE_SUCCESS":
      return {
        ...state,
        recurringInHouse: {
          loading: false,
          firstMonthAmt: action.payload.firstMonthAmt,
          secondMonthAmt: action.payload.secondMonthAmt,
          yearlyAmt: action.payload.yearlyAmt,
        },
      };
    case "GET_PNL_RECURRING_IN_HOUSE_ERROR":
      return {
        ...state,
        recurringInHouse: {
          loading: false,
          firstMonthAmt: 0,
          secondMonthAmt: 0,
          yearlyAmt: 0,
        },
      };
    default:
      return state;
  }
};
