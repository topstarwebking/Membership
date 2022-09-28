let initState = {
    getStudentFinanceInfo: []
}
export const BillingReducer = (state = initState, action) => {
    switch (action.type) {
        case "GET_STUDENT_FINANCE_INFO": return { ...state, getStudentFinanceInfo: action.payload };
        default:
            return state;
    }
}