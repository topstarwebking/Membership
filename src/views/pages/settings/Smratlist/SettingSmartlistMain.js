import React, { useEffect } from "react";
import { Card } from "reactstrap";
import { GET_ALL_SMART_LIST } from "../../../../redux/actions/email";
import { connect } from "react-redux";
import SmartlistSidebar from "./SmartlistSidebar"
const SettingSmartlistMain = (props) => {
  const { GET_ALL_SMART_LIST } = props;
  useEffect(() => {
    GET_ALL_SMART_LIST();
  }, [GET_ALL_SMART_LIST]);
  return (
    <Card className="w-100" style={{ height: "80vh", overflow: "auto" }}>
      <SmartlistSidebar getAllSmartList={props.getAllSmartList} />
    </Card>
  );
};
const mapStateToProps = (state) => {
  return {
    getAllSmartList: state.EmailMarketing.getAllSmartList,
  };
};
export default connect(mapStateToProps, {
  GET_ALL_SMART_LIST,
})(SettingSmartlistMain);
