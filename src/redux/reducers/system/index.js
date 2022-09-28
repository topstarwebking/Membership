let initState = {
    categories : [],
    allScheduleMails : [],
    smartlist : [],
    selectedSmartList : [],
    selectedtemplist:[]
}
export const EmailSystemMarketing = (state = initState, action) => {
   switch(action.type){
        case "GET_CATEGORIES_SYSTEM" : return {...state, categories : action.payload};
        case "GET_SCHEDULE_MAILS": return {...state, allScheduleMails : action.payload};
        case "GET_SMARTLIST": return {...state, smartlist : action.payload};
        case "REMOVE_SCHEDULE_MAILS": 
              const afterdelete = 
               state.data?.allScheduleMails.template.filter(template=> template._id !== action.payload)
               return {...state, allScheduleMails : {template : afterdelete}};

        default :
           return state;
   }  
}