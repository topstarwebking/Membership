const initState = {
  chats: [],
  contacts: [],
}

export const textChatReducer = (state = initState, action) => {
  switch(action.type){
    case "GET_TEXT_MESSAGES" : return {...state, chats: action.payload};
    case "GET_CONTACTS_DETAILS": return {...state, contacts: action.payload};
    default: return state;
  }
}
