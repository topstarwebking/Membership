const initState = {
  membershipList: [],
  adminmembershipList: [],
  studentList: [],
  purchaseList: [],
  getMembershipInfo: [],
  getmebershipfolderlisting: [],
  admingetmebershipfolderlisting: null,
  getProdectfolder: null,
  signaturePDFLinkNIP: null,
  isMembershipPaymentDone: false,
};
// isMembershipPaymentDone
export const shopReducer = (state = initState, action) => {
  switch (action.type) {
    case "IS_MEMBERSHIP_PAYMENT_DONE":
      return { ...state, isMembershipPaymentDone: action.payload };
    case "GET_MEMBERSHIP_LIST":
      return { ...state, membershipList: action.payload };
    case "GET_ADMIN_MEMBERSHIP_LIST":
      return { ...state, adminmembershipList: action.payload };
    case "GET_STUDENT_LIST":
      return { ...state, studentList: action.payload };
    case "GET_STUDENT_PURCHASE_LIST":
      return { ...state, purchaseList: action.payload };
    case "GET_MEMBERSHIP_FOLDER_LIST":
      return { ...state, getmebershipfolderlisting: action.payload };
    case "GET_PRODECT_FOLDER":
      return { ...state, getProdectfolder: action.payload };
    case "MERGE_DOCUMENT_OF_DOC_2_PDF":
      return { ...state, isMembershipPaymentDone: true, signaturePDFLinkNIP: action.payload };
    default:
      return state;
  }
};
