import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { GET_PROGRAM_LIST } from "../../../../redux/actions/settings/schedule";
import { GET_MEMBERSHIP_LIST } from "../../../../redux/actions/shop";
import { getStripeList } from "../../../../redux/actions/stripe";
import {
  GET_LEADS_TRACKING,
  GET_AFTER_CAMPS,
} from "../../../../redux/actions/member";
import Memberinfo from "./components/Memberinfo";
import CostomInfo from "./components/costomInfo";
import Membershipinfo from "./components/membershipinfo/index";
import Criteriamet from "./components/Criteriamet";

const CreateSmartlistedit = (props) => {
  const {
    GET_AFTER_CAMPS,
    GET_PROGRAM_LIST,
    GET_MEMBERSHIP_LIST,
    getStripeList,
    GET_LEADS_TRACKING,
    removeToSmartList,
    addToSmartList,
    setSmartList,
    isExit,
  } = props;
  useEffect(() => {
    GET_AFTER_CAMPS();
    GET_PROGRAM_LIST();
    GET_MEMBERSHIP_LIST();
    getStripeList();
    GET_LEADS_TRACKING();
  }, [
    GET_AFTER_CAMPS,
    GET_PROGRAM_LIST,
    GET_MEMBERSHIP_LIST,
    getStripeList,
    GET_LEADS_TRACKING,
  ]);
  return (
    <Fragment>
      <Memberinfo
        smartList={props.smartList}
        removeToSmartList={removeToSmartList}
        addToSmartList={addToSmartList}
        isExit={isExit}
      />
      <CostomInfo
        getAfterCamps={props.getAfterCamps}
        getLeadTrackingList={props.getLeadTrackingList}
        removeToSmartList={removeToSmartList}
        addToSmartList={addToSmartList}
        smartList={props.smartList}
        isExit={isExit}

      />
      <Membershipinfo
        programList={props.programList}
        stripeList={props.stripeList}
        membershipList={props.membershipList}
        removeToSmartList={removeToSmartList}
        addToSmartList={addToSmartList}
        smartList={props.smartList}
        isExit={isExit}
        setSmartList={setSmartList}
      />
      <Criteriamet
        setSmartList={setSmartList}
        removeToSmartList={removeToSmartList}
        addToSmartList={addToSmartList}
        smartList={props.smartList}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    programList: state.program,
    getAllSmartList: state.EmailMarketing.getAllSmartList?.data,
    program: state.program,
    membershipList: state.shop.membershipList,
    stripeList: state.stripe.stripeList,
    getLeadTrackingList: state.member.getLeadTrackingList,
    getAfterCamps: state.member.getAfterCamps,
    getSummerCampList: state.member.getSummerCampList,
    getSpecialiatyProgram: state.member.getSpecialiatyProgram,
    getSpecialiatyProgram2: state.member.getSpecialiatyProgram2,
  };
};

export default connect(mapStateToProps, {
  GET_PROGRAM_LIST,
  GET_MEMBERSHIP_LIST,
  getStripeList,
  GET_LEADS_TRACKING,
  GET_AFTER_CAMPS,
})(CreateSmartlistedit);
