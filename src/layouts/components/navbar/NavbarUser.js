import React, { useEffect, useState } from "react";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import * as Icon from "react-feather";
import { useAuth0 } from "../../../authServices/auth0/auth0Service";
import { history } from "../../../history";
import { connect } from "react-redux";
import LocationModal from "../../../views/pages/navlocation/locationModal";
import "../../../assets/scss/pages/users.scss";
import {
  LOGIN_WITH_JWT,
  Get_User_Info,
} from "../../../redux/actions/auth/loginActions";
import { Avatar } from "@material-ui/core";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMicOutlined";
import { Link } from "react-router-dom";
import NotificationDropdown from "./NotificationsDropdown";
import {
  SOCKET_CONNECTER_IO,
  SOCKET_EMIT_JOIN_ROOM_SYSTEM_TYPE,
  getUserId,
  SOCKET_GET_TEXT_MESSAGES,
  SOCKET_GET_NOTIFICATION_DATA,
} from "../../../redux/actions/socket.io";
import {
  V2_GET_TEXT_MESSAGES,
  TEXT_CHAT_ALERT,
  UPDATE_MEMBER_CONTACTS_DETAILS,
  GET_NOTIFICATION_DATA,
} from "../../../redux/actions/marketing/V2TextChat";

const handleNavigation = (e, path) => {
  e.preventDefault();
  history.push(path);
};

const UserDropdown = (props) => {
  const { usersChatAlertList, activeStudent2sendtextChat, contacts } = props;
  const [socketInfo, setSocketInfo] = useState();
  const [socketInfoData, setSocketInfoData] = useState();
  useEffect(() => {
    SOCKET_EMIT_JOIN_ROOM_SYSTEM_TYPE(getUserId()); // webhook
    SOCKET_GET_NOTIFICATION_DATA(getUserId())
    SOCKET_CONNECTER_IO().on("getText", (data) => {
      debugger
      props.V2_GET_TEXT_MESSAGES(data);
    });
    SOCKET_CONNECTER_IO().on("getNotification", (notificationData) => {
      // setSocketInfoData(notificationData)
      props.GET_NOTIFICATION_DATA(notificationData)
    });

  }, []);

  useEffect(() => {
    (async () => {


      SOCKET_CONNECTER_IO().on("getAlertText", (Info) => {
        const { uid } = Info;
        setSocketInfo(Info);
      });

      SOCKET_CONNECTER_IO().on("localStorageData", (Info) => {
        const { success, data } = Info;
        const getuserdata = () => {
          return JSON.parse(localStorage.getItem("userdata"));
        };
        let modifyPreUserInfo = getuserdata();
        modifyPreUserInfo.data = data;
        if (success) {
          localStorage.setItem("userdata", JSON.stringify(modifyPreUserInfo));
          alert("Your location access has been changed by admin")
          window.location.reload()
        }
      });
    })();
  }, []);
  // console.log(socketInfoData)

  useEffect(() => {
    if (socketInfo) {
      if (contacts.length) {
        props.UPDATE_MEMBER_CONTACTS_DETAILS(contacts, socketInfo);
      }
      let result = activeStudent2sendtextChat;
      if (result.uid === socketInfo.uid) {
        let getSocketFormat = { uid: socketInfo.uid, userId: getUserId() };
        SOCKET_GET_TEXT_MESSAGES(getSocketFormat);
      } else {
        let UserMessageePandingCount = usersChatAlertList[socketInfo.uid]
          ? usersChatAlertList[socketInfo.uid]
          : 0;
        props.TEXT_CHAT_ALERT(
          Object.assign({}, usersChatAlertList, {
            [socketInfo.uid]: UserMessageePandingCount + 1,
          })
        );
      }
    }
  }, [socketInfo]);
  // useEffect(() => {
  //   setTimeout(() => , 1000)
  // }, [])

  // console.log(socketInfoData)
  const { logout, isAuthenticated } = useAuth0();
  return (
    <DropdownMenu right>
      <DropdownItem
        tag="a"
        href="/company/settings"
        onClick={(e) => handleNavigation(e, "/company/settings")}
      >
        <Icon.User size={14} className="mr-50" />
        <span className="align-middle">Edit Profile</span>
      </DropdownItem>
      <DropdownItem
        tag="a"
        href="#"
        onClick={(e) => handleNavigation(e, "/email/inbox")}
      >
        <Icon.Mail size={14} className="mr-50" />
        <span className="align-middle">My Inbox</span>
      </DropdownItem>
      <DropdownItem
        tag="a"
        href="/todo/all"
        onClick={(e) => handleNavigation(e, "/todo/all")}
      >
        <Icon.CheckSquare size={14} className="mr-50" />
        <span className="align-middle">Tasks</span>
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem
        tag="a"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          if (isAuthenticated) {
            return logout({
              returnTo:
                window.location.origin + process.env.REACT_APP_PUBLIC_PATH,
            });
          } else {
            const provider = props.login?.values?.loggedInWith;
            if (!!provider) {
              if (provider === "jwt") {
                return props.LOGIN_WITH_JWT();
              }
              if (provider === "firebase") {
                return props.logoutWithFirebase();
              }
            } else {
              localStorage.removeItem("access_token");
              localStorage.removeItem("user_id");
              localStorage.removeItem("userdata");
              localStorage.removeItem("staticDefaultLocation");
              history.push("/pages/login");
            }
          }
        }}
      >
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle">Log Out</span>
      </DropdownItem>
    </DropdownMenu>
  );
};

const WalletDropdown = (props) => {
  return (
    <DropdownMenu right>
      <DropdownItem
        tag="a"
        href="#"
        onClick={(e) => handleNavigation(e, "/pages/navwallet/depositFunds")}
      >
        <span className="align-middle">Deposit Funds</span>
      </DropdownItem>
      <DropdownItem
        tag="a"
        href="#"
        onClick={(e) => handleNavigation(e, "/pages/navwallet/withdraw")}
      >
        <span className="align-middle">Withdraw Funds</span>
      </DropdownItem>
      <DropdownItem
        tag="a"
        href="#"
        onClick={(e) => handleNavigation(e, "/pages/navwallet/transction")}
      >
        <span className="align-middle">Transction History</span>
      </DropdownItem>
    </DropdownMenu>
  );
};

class NavbarUser extends React.PureComponent {
  state = {
    navbarSearch: false,
    langDropdown: false,
  };

  handleLangDropdown = () => {
    this.setState({ langDropdown: !this.state.langDropdown });
  };

  render() {
    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">
        <UncontrolledDropdown className="walletdropdown nav-item tp-hdr-menu rs-l">
          <div className="user-nav d-sm-flex d-none">
            <AccountBalanceWalletIcon color="action" />
            <span className="user-status text_span_tp rs-left"> Wallet</span>
          </div>

          <WalletDropdown {...this.props} />
        </UncontrolledDropdown>
        <div className="user-nav d-sm-flex d-none tp-hdr-menu">
          <Link to="/company/support/My-tickets">
            <HeadsetMicIcon color="action" />
            <span className="user-status text_span_tp"> Support</span>
          </Link>
        </div>
        <LocationModal />
        <NotificationDropdown getNotificationData={this.props.getNotificationData} />
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle
            tag="a"
            className="nav-link dropdown-user-link rs-userpro"
          >
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name text-bold-600">
                {this.props.userinfo.userInfo.username}
              </span>
            </div>
            <Avatar
              alt={this.props.userinfo.userInfo.username}
              src={this.props?.userinfo?.userInfo?.logo}
            />
          </DropdownToggle>
          <UserDropdown {...this.props} />
        </UncontrolledDropdown>
      </ul>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    login: state.auth,
    userinfo: state.userinfo,
    activeStudent2sendtextChat: state.V2textChat?.activeStudent2sendtextChat,
    usersChatAlertList: state.V2textChat?.usersChatAlertList,
    contacts: state.V2textChat?.contacts,
    getNotificationData: state.V2textChat?.getNotificationData,
  };
};
export default connect(mapStateToProps, {
  LOGIN_WITH_JWT,
  Get_User_Info,
  TEXT_CHAT_ALERT,
  V2_GET_TEXT_MESSAGES,
  GET_NOTIFICATION_DATA,
  UPDATE_MEMBER_CONTACTS_DETAILS,
})(NavbarUser);
