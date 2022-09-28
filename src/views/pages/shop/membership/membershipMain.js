import React, { Fragment, useState, useEffect } from "react";
import { GET_MEMBERSHIP_FOLDER_LIST } from "../../../../redux/actions/shop";
import { connect } from "react-redux";
import SideBarAndMemberShipCard from "./components/sidebarAndMembershipCard";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
const MemberShip = (props) => {
  const [activeFolderMS, setActiveFolderMS] = useState(null);
  const [FoldermenuOpen, setFoldermenuOpen] = useState(false);
  const [allFolderWithMS, setAllMemberWithMS] = useState([]);
  const [indexActive, setindexActive] = useState(0);
  const {
    getmebershipfolderlisting,
    GET_MEMBERSHIP_FOLDER_LIST,
    isStudentInfo,
  } = props;
  const handleActiveFOlder = (folderIndex) => {
    setindexActive(folderIndex);
    setActiveFolderMS(allFolderWithMS[folderIndex]);
  };

  useEffect(() => {
    GET_MEMBERSHIP_FOLDER_LIST();
  }, [GET_MEMBERSHIP_FOLDER_LIST]);

  useEffect(() => {
    setAllMemberWithMS(getmebershipfolderlisting);
    if (
      getmebershipfolderlisting !== null &&
      getmebershipfolderlisting?.length > 0
    ) {
      setActiveFolderMS(getmebershipfolderlisting[indexActive]);
    }
  }, [getmebershipfolderlisting]);

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Membership"
        breadCrumbParent="Shop"
        breadCrumbActive="Membership"
      />
      <SideBarAndMemberShipCard
        CloseDrawerMS={props.CloseDrawerMS}
        isStudentInfo={isStudentInfo}
        handleActiveFOlder={handleActiveFOlder}
        allFolderWithMS={allFolderWithMS}
        FoldermenuOpen={FoldermenuOpen}
        setFoldermenuOpen={setFoldermenuOpen}
        activeFolderMS={activeFolderMS}
        userinformation={props.userinformation}
      />
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    getmebershipfolderlisting: state.shop.getmebershipfolderlisting,
    userinformation: state.userinfo.userinformation,
  };
};

export default connect(mapStateToProps, {
  GET_MEMBERSHIP_FOLDER_LIST,
})(MemberShip);
