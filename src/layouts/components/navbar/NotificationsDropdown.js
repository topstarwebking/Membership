// ** React Imports
import React, { Fragment } from "react";


// ** Custom Components
import Avatar from "@material-ui/core/Avatar";


// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell, X, Check, AlertTriangle } from 'react-feather'

// ** Reactstrap Imports
import { Button, Badge, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import moment from "moment";

const NotificationDropdown = (props) => {
  const { getNotificationData } = props

  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component='li'
        className='media-list scrollable-container'
        options={{
          wheelPropagation: false
        }}
      >
        {getNotificationData === undefined ? "" :
          getNotificationData?.chat?.map((item, index) => {
            return (
              <div key={index} className="d-flex w-100 py-1" style={{ borderBottom: "1px solid #ededed" }}>
                <div className='mx-2'>
                  <Avatar
                    src={item?.to[0]?.memberprofileImage}
                  />
                </div>
                <div className="d-flex align-items-center w-100 mr-2" >
                  <div>
                    <p className="mb-0">New message received from <b>{item?.to[0]?.firstName} {item?.to[0]?.lastName}</b></p>
                    <small className='notification-text mt-0'>{item.textContent}</small>
                  </div>
                </div>
              </div>
            )
          })}
        {getNotificationData?.tasks === undefined ? "" :
          getNotificationData?.tasks?.map((item, index) => {
            return (
              <div key={index} className="d-flex w-100 py-1" style={{ borderBottom: "1px solid #ededed" }}>
                <div className='mx-2'>
                  <Avatar
                    src={item?.memberprofileImage}
                  />
                </div>
                <div className="d-flex align-items-center">
                  <p className="mb-0">Today's Task is <b>{item?.name}</b></p>
                </div>
              </div>
            )
          })}
        {getNotificationData?.todayBirthday === undefined ? "" :
          getNotificationData?.todayBirthday?.map((item, index) => {
            return (
              <div key={index} className="d-flex w-100 py-1" style={{ borderBottom: "1px solid #ededed" }}>
                <div className='mx-2'>
                  <Avatar
                    src={item?.memberprofileImage}
                  />
                </div>
                <div className="d-flex align-items-center w-100 mr-2" >
                  <div>
                    <p className="mb-0">🎂 Wish <b>{item?.firstName} {item?.lastName}</b> a Happy Birthday 🥳</p>
                    <small className='notification-text mt-0'>Today, {moment(item?.dob).format("D MMMM")}</small>
                  </div>
                </div>
              </div>
            )
          })}
        {getNotificationData?.tomorrowBirthday === undefined ? "" :
          getNotificationData?.tomorrowBirthday?.map((item, index) => {
            return (
              <div key={index} className="d-flex w-100 py-1" style={{ borderBottom: "1px solid #ededed" }}>
                <div className='mx-2'>
                  <Avatar
                    src={item?.memberprofileImage}
                  />
                </div>
                <div className='d-flex align-items-center w-100 mr-2'>
                  <div>
                    <p className="mb-0"><b>{item?.firstName} {item?.lastName} </b>have Birthday tomorrow</p>
                    <small className='notification-text mt-0'>Tomorrow, {moment(item?.dob).format("D MMMM")}</small>
                  </div>
                </div>
              </div>
            )
          })}
      </PerfectScrollbar>
    )
  }
  /*eslint-enable */

  return (
    <UncontrolledDropdown tag='li' className='dropdown-notification nav-item me-25'>
      <DropdownToggle className='nav-link' onClick={e => e.preventDefault()}>
        <Bell size={21} />
        <Badge pill color='danger' className='badge-up'>
          {getNotificationData?.count}
        </Badge>
      </DropdownToggle>
      <DropdownMenu tag='ul' className='dropdown-menu-media mt-0'>
        <li className='dropdown-menu-header'>
          <DropdownItem className='d-flex justify-content-between align-items-center' tag='div' header>
            <h4 className='notification-title mb-0 me-auto'>Notifications</h4>
            <Badge tag='div' color='light-primary' pill>
              {getNotificationData?.count} New
            </Badge>
          </DropdownItem>
        </li>
        {renderNotificationItems()}
        <li className='dropdown-menu-footer'>
          <Button color='primary' block>
            Read all notifications
          </Button>
        </li>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default NotificationDropdown
