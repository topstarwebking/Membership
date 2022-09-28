const initialState = {
  events: [],
  sidebar: false,
  selectedEvent: null,
  attendeeList: null,
  studentList: [],
  classStudentList: [],
  filterStudents: [],
  studentInfo: null,
  attendenceStudentRemove: "",
  seachClass: null,
  isloading: false
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_EVENTS":
      return { ...state, events: action.events };
    case "ADD_EVENT":
      state.events.push(action.event);
      return { ...state };
    case "UPDATE_EVENT":
      let updatedEvents = state.events.map((event) => {
        if (event.id === action.event.id) {
          return action.event;
        }
        return event;
      });
      return { ...state, events: updatedEvents };
    case "UPDATE_DRAG":
      let eventToDrag = action.event,
        extractedEvent = state.events.map((event) => {
          if (event.id === eventToDrag.id) {
            return eventToDrag;
          }
          return event;
        });
      return { ...state, events: extractedEvent };
    case "EVENT_RESIZE":
      let eventToResize = action.event,
        resizeEvent = state.events.map((event) => {
          if (event.id === eventToResize.id) {
            return eventToResize;
          }
          return event;
        });
      return { ...state, events: resizeEvent };
    case "HANDLE_SIDEBAR":
      return { ...state, sidebar: action.status };
    case "HANDLE_SELECTED_EVENT":
      return { ...state, selectedEvent: action.event };
    case "FETCH_ATTENDEE_LIST":
      return { ...state, attendeeList: action.event, seachClass: null };
    case "STUD_GET":
      return { ...state, studentList: action.event };
    case "FETCH_CLASS_STUDENTS":
      return { ...state, classStudentList: action.event };
    case "GET_SERACH_CLASSNAME":
      return { ...state, seachClass: action.event, attendeeList: null };
    case "GET_SERACH_BY_DAYS":
      return { ...state, seachClass: action.event, attendeeList: null };
    case "ADD_STUDENT_TO_CLASS":
      return { ...state, studentInfo: action.event };
    case "RENDER_STUDENT":
      return { ...state, filterStudents: action.payload };
    case "ATTENDENCE_STUDENTS_REMOVE":
      return { ...state, attendenceStudentRemove: action.event };
    case "IS_LOADING":
      return {
        ...state, isloading: action.payload
      }
    default:
      return state;
  }
};

export default calendarReducer;
