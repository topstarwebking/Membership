import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL;

export const GET_TEXT_CONTACTS = () => {
  return async dispatch => {
    try{
      let response = await axios.get(
        `${baseUrl}/api/text-chat/get-contacts/${localStorage.getItem("user_id")}`,
        {
          headers : {
            "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
          }
        }
      );
      if(response.data && response.status === 200 && !response.data.msg){
        // dispatch(GET_CONTACTS_DETAILS(response.data));
      }
    }
    catch(error){
      console.log(error);
    }
  }
};

// export const GET_CONTACTS_DETAILS = contacts => {
//   return async dispatch => {
//     try{
//       let ids = [];
//       if (Array.isArray(contacts)) {
//         contacts.forEach(contact => {
//           ids.push(contact.uid);
//         });
//       }
//       let response = await axios.post(
//         `${baseUrl}/api/text-chat/contacts-details/${localStorage.getItem("user_id")}`,
//         {ids: ids},
//         {
//           headers : {
//             "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
//           }
//         }
//       );
//       console.log('Response from get contacts details: ', response.data);
//       if(response.data && response.status === 200 && !response.data.msg){
//         let contactDetailsArray = response.data;
//         if (Array.isArray(contactDetailsArray) && Array.isArray(contacts)) {
//           contactDetailsArray.forEach(contactDetails => {
//             contacts.forEach(contact => {
//               if (contactDetails._id === contact.uid) {
//                 contactDetails.isSeen = contact.isSeen;
//                 contactDetails.isPinned = contact.isPinned;
//               }
//             })
//           })
//         }
//         dispatch({
//           type : "GET_CONTACTS_DETAILS",
//           payload : contactDetailsArray,
//         })
//       }
//       else{
//         dispatch({
//           type : "GET_CONTACTS_DETAILS",
//           payload : []
//         })
//       }
//     }
//     catch(error){
//       console.log(error);
//       dispatch({
//         type : "GET_CONTACTS_DETAILS",
//         payload : []
//       })
//     }
//   }
// };

export const ADD_TEXT_CONTACTS = contact => {
  return dispatch => {
    axios.post(
      `${baseUrl}/api/text-chat/add-contact/${localStorage.getItem("user_id")}`,
      {...contact},
      {
        headers : {
          "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
        }}
    ).then(() => {
      dispatch(GET_TEXT_CONTACTS());
    })
  }
};

// API to fetch all text messages
export const GET_TEXT_MESSAGES = () => {
  return async dispatch => {
    try{
      let response = await axios.get(
        `${baseUrl}/api/text-chat/get-messages/${localStorage.getItem("user_id")}`,
        {
          headers : {
            "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
          }
        }
      );
      if(response.data && response.status === 200 && !response.data.msg){
        dispatch({
          type : "GET_TEXT_MESSAGES",
          payload : response.data,
        })
      }
      else{
        dispatch({
          type : "GET_TEXT_MESSAGES",
          payload : []
        })
      }
    }
    catch(error){
      console.log(error);
      dispatch({
        type : "GET_TEXT_MESSAGES",
        payload : []
      })
    }
  }
};

// API call to send new text message
export const SEND_TEXT_MESSAGE = message => {
  return dispatch => {
    axios.post(
      `${baseUrl}/api/text-chat/send-message/${localStorage.getItem("user_id")}`,
      {...message},
      {
        headers : {
          "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
        }}
    ).then(() => {
      dispatch(GET_TEXT_MESSAGES());
    })
  }
};

// API to set contact Pinned
export const SET_CONTACT_PINNED = (contact, isPinned) => {
  console.log('SETTING IS PINNED: ', isPinned);
  return dispatch => {
    axios.post(
      `${baseUrl}/api/text-chat/pin-contact/${contact}/${localStorage.getItem("user_id")}`,
      {isPinned: isPinned},
      {
        headers : {
          "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
        }}
    ).then(() => {
      dispatch(GET_TEXT_CONTACTS());
    })
  }
}

// API to mark seen
export const SEEN_CONTACT_MESSAGES = contact => {
  return dispatch => {
    axios.post(
      `${baseUrl}/api/text-chat/seen-contact-messages/${contact}/${localStorage.getItem("user_id")}`,
      {isSeen: true},
      {
        headers : {
          "Authorization" : `Bearer ${localStorage.getItem("access_token")}`
        }}
    ).then(() => {
      dispatch(GET_TEXT_CONTACTS());
    })
  }
}
