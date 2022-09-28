const initialState = {
  appointmentInfo: [],
  eventsAndAppointment: null,
  appointmentCategoryList: null,
  getEvent_or_ApppoitnmentBy_cetegory: null,
  activeEvent: null,
  fetchAllEvents: [],
  selectedEvent: {},
};

const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_APPOINTMENT":
      return { ...state, events: action.payload };
    case "APPOINTMENT_REMOVE":
      return { ...state, events: action.payload };
    case "FETCH_EVENTS_OR_APPOINMENT":
      return { ...state, eventsAndAppointment: action.payload };
    case "SELECTED_EVENT":
      return { ...state, selectedEvent: action.payload };
    case "FETCH_EVENTS":
      return {
        ...state,
        fetchAllEvents: action.payload,
      };
    case "APPOINTMENT_CATEGORYLIST":
      return { ...state, appointmentCategoryList: action.payload };
    case "GET_APPOINTMENT_BY_CETEGORY":
      return {
        ...state,
        getEvent_or_ApppoitnmentBy_cetegory: action.payload,
      };
    case "FILTER_FOR_APPONMNET":
      return {
        ...state,
        getEvent_or_ApppoitnmentBy_cetegory: action.payload,
      };
    case "ACTIVE_EVENT":
      return {
        ...state,
        activeEvent: action.payload,
      };
    default:
      return state;
  }
};

export default appointmentReducer;
