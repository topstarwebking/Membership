import * as React from "react";
import "../../../assets/scss/pages/users.scss";
import LocationOnIcon from "@material-ui/icons/LocationOnOutlined";
import {
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
} from "reactstrap";
import { connect } from "react-redux";
import {
  GET_USER_INFORMATION,
  LOGING_MULTIPLE_LOCATION,
} from "../../../redux/actions/auth/loginActions";

const getuserdata = () => {
  return JSON.parse(localStorage.getItem("userdata"))?.data;
};

const firstLoginLocation = () => {
  return JSON.parse(localStorage.getItem("firstLoginLocation"));
};

const LocationModal = (props) => {
  React.useEffect(() => {
    props.GET_USER_INFORMATION();
  }, []);

  const HandleLogin = (item) => {
    const { password, isAccessLocations, email } = item;

    let payload = {
      email: email,
      password: password,
      isAccessLocations: isAccessLocations,
      accessingUserdetails: {
        email: email,
        password: password,
      },
    };
    props.LOGING_MULTIPLE_LOCATION(payload);
  };
  return (
    <UncontrolledDropdown  className="walletdropdown nav-item tp-hdr-menu rs-l">
      <div className="user-nav d-sm-flex d-none">
        <LocationOnIcon color="action" />
        <span className="user-status text_span_tp p-0">
          {getuserdata()?.default_locationData?.length > 0
            ? getuserdata()?.default_locationData[0]?.locationName
            : ""}
        </span>
      </div>
      {getuserdata()?.role === 0 && (
        <DropdownMenu
          right
          style={{
            overflowY: "scroll",
            maxHeight: 310,
          }}
        >
          {getuserdata()?.locations?.length > 0 &&
            getuserdata()?.locations?.map((item) => {
              return firstLoginLocation()?.length > 0 &&
                firstLoginLocation()[0]?.locationName !==
                (item?.default_location?.length > 0
                  ? item?.default_location[0]?.locationName
                  : item?.locationName) ? (
                <DropdownItem
                  className="w-100"
                  tag="button"
                  onClick={() => {
                    HandleLogin(item);
                  }}
                  disabled={
                    getuserdata().default_locationData.length > 0 &&
                    item?.locationName ===
                    getuserdata().default_locationData[0]?.locationName
                  }
                  style={{
                    background:
                      item?.default_location?.length > 0
                        ? item?.default_location[0]?.locationName
                        : item?.locationName && "#eaf4fe",
                  }}
                  key={item?._id}
                >
                  <span className="align-middle">
                    {item?.default_location?.length > 0
                      ? item?.default_location[0]?.locationName
                      : item?.locationName}
                  </span>
                </DropdownItem>
              ) : (
                ""
              );
            })}
          {firstLoginLocation() !== null ? (
            <DropdownItem
              className="w-100"
              tag="button"
              style={{
                background:
                  firstLoginLocation()?.length > 0 &&
                    firstLoginLocation()[0]?.locationName ===
                    getuserdata()?.default_locationData[0]?.locationName
                    ? "#eaf4fe"
                    : "",
              }}
              onClick={() => {
                HandleLogin(firstLoginLocation()[0]);
              }}
              disabled={
                firstLoginLocation()?.length > 0 &&
                  firstLoginLocation()[0]?.locationName ===
                  getuserdata()?.default_locationData[0]?.locationName
                  ? true
                  : false
              }
            >
              <span className="align-middle">
                {firstLoginLocation()?.length > 0 &&
                  firstLoginLocation()[0]?.locationName}
              </span>
            </DropdownItem>
          ) : null}
        </DropdownMenu>
      )}
    </UncontrolledDropdown>
  );
};
const mapStateToProps = (state) => {
  return {
    userinformation: state.userinfo.userinformation,
  };
};
export default connect(mapStateToProps, {
  GET_USER_INFORMATION,
  LOGING_MULTIPLE_LOCATION,
})(LocationModal);
