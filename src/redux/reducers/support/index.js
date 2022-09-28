let initState = {
    supportViewTicket: [],
    tickets_count:{},
}
export const supportReducer = (state = initState, action) => {
    switch (action.type) {
        case "GET_SUPPORT_VIEW_TICKET":
            return { ...state, supportViewTicket: action.payload };
        case "GET_TICKETS_COUNT":
            return { ...state, tickets_count: action.payload };
        default:
            return state;
    }
}
