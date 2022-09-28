const initState = {
   status : null,
   values : "",
   isotpsend:false
};

export const register = (state = initState, action) => {
  switch (action.type) {
    case "SIGNUP" :
        return {...state, status : action.payload};
    case "SIGNUP_WITH_EMAIL": {
      return { ...state, values: action.payload }
    }
    case "SIGNUP_WITH_JWT":
      return {
        ...state,
        values: action.payload
      }
      case "SEND_OTP_FOR_EMAILVERIFICATION":{
        return{
          ...state,isotpsend:action.payload
        }
      }
    default: {
      return state
    }
  }
}
