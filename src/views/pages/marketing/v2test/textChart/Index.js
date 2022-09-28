import React, { useEffect } from "react"
// import ChatLog from "./ChatLog"
import "../../../../../assets/scss/pages/app-chat.scss"
import BreadCrumbs from "../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import TextTabs from "./components/chatCategoryTabs/index";
import Layout from "./Layout";
import { connect } from "react-redux"
import { GET_TEXT_USER_CHAT_LIST, GET_MEMBER_CONTACTS_DETAILS } from "../../../../../redux/actions/marketing/V2TextChat";

const V2TextChat = (props) => {
  const { GET_TEXT_USER_CHAT_LIST, GET_MEMBER_CONTACTS_DETAILS } = props;

  useEffect(() => {
    GET_TEXT_USER_CHAT_LIST();
    // GET_MEMBER_CONTACTS_DETAILS();
  }, []);

  return (
    <div style={{ height: "80vh" }} className="chat-application position-relative">
      <BreadCrumbs
        breadCrumbTitle="Text Chat"
        breadCrumbParent="Text"
        breadCrumbActive="Text Chat"
      />
      <div>
        <TextTabs />
        <div className='w-100' style={{ display: 'flex', flex: 1 }}>
          <Layout />
        </div>
      </div>
    </div>
  );
}

export default connect(null, { GET_TEXT_USER_CHAT_LIST, GET_MEMBER_CONTACTS_DETAILS })(V2TextChat);