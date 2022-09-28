
const initState = {
    DocumentInfoOfMembership: [],
    listOfMymemberSignerUser: []
}

export const docuSignReducer = (state = initState, action) => {
    switch (action.type) {
        case "SUBMIT_VALUE_OF_SIGNATURE_ADD":
            let users = state?.listOfMymemberSignerUser
            let editUserOrAdd = action?.payload?.formValue
            let afterCheckUsers = users.map(u => u.id !== editUserOrAdd.id ? u : editUserOrAdd);
            if (action?.payload?.isEdit) {
                return { ...state, listOfMymemberSignerUser: afterCheckUsers };
            } else {
                return { ...state, listOfMymemberSignerUser: [...users, { ...editUserOrAdd, id: users?.length + 1 }] };
            }
        case "GET_DOCUMENT_BY_MEMBERSHIP_ID":
            return { ...state, DocumentInfoOfMembership: action.payload }
        case "ADD_DEFAULT_VALUE_FOR_MYMEMBER_SIGNER":
            return { ...state, listOfMymemberSignerUser: [action.payload] }
        default: return state;
    }
}