import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import Logo from "../../../../assets/img/logo/logo.png";
import "../../../../assets/scss/pages/users.scss";

class SidebarHeader extends Component {
  render() {
    let { collapsed, menuShadow, userinfo } = this.props;
    return (
      <div className="navbar-header">
        <ul className="nav navbar-nav flex-row">
          <li className="nav-item mr-auto  d-flex align-items-center justify-content-center">
            <NavLink to="/" className="navbar-brand">
              <img
                src={
                  userinfo.userInfo.profile_image
                    ? userinfo.userInfo.profile_image
                    : Logo
                }
                style={{
                  width: collapsed === false ? "4em" : "1.8em  ",
                  objectFit: "contain",
                }}
                className="logo-1"
                alt="logo"
              ></img>
            </NavLink>
          </li>
        </ul>
        <div
          className={classnames("shadow-bottom", {
            "d-none": menuShadow === false,
          })}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.auth,
    userinfo: state.userinfo,
  };
};
export default connect(mapStateToProps, undefined)(SidebarHeader);
