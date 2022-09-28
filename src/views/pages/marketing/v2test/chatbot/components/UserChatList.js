import { List, ListItem, ListItemAvatar, Typography } from '@material-ui/core';
import React from 'react'
import UserAvatar from '../../textChart/components/Avatar';

const UserChatList = ({ chatbotUsers, handleClickUser, selectedChatUser }) => {
  return (
    <div>
      <List style={{ width: "275px", paddingTop: "0px" }} dense>
        {chatbotUsers.map((item, i) => {
          return (
            <ListItem
              selected={item?.email === selectedChatUser?.email}
              button
              onClick={() => handleClickUser(item)}
              // onClick={(event) =>
              //   UserChatActivity(
              //     event,
              //     {
              //       firstName: item?.firstName,
              //       lastName: item?.lastName,
              //       uid: item?._id,
              //       memberprofileImage: item?.memberprofileImage,
              //     },
              //     i
              //   )
              // }
              key={item?._id}
            >
              <ListItemAvatar>
                <UserAvatar
                  name={item?.firstName}
                  avatarPath={item?.memberprofileImage}
                />
              </ListItemAvatar>
              <div className="w-100">
                <div className="d-flex justify-content-between">
                  <Typography className="mb-0" variant="subtitle1">
                    {item.fullName}
                  </Typography>
                  {/* <Typography
                    className="mb-0"
                    variant="caption"
                    display="block"
                    gutterBottom
                  >
                    {GetLastMessageTime(item?.time)}
                  </Typography> */}
                </div>
                <div className="d-flex justify-content-between">
                  <div
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "11rem",
                    }}
                  >
                    <Typography noWrap color="textSecondary" className={`mb-0`}>
                      {item?.textContent}
                    </Typography>
                  </div>
                  {/* <TextAlert alertCount={usersChatAlertList[item?._id]} /> */}
                </div>
              </div>
            </ListItem>
          );
        })}
      </List>
    </div>
  )
}

export default UserChatList