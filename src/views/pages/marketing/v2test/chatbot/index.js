import React, { useEffect, useState } from "react";
import "../../../../../assets/scss/pages/app-chat.scss";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  SOCKET_CONNECTER_IO,
  SOCKET_GET_CHATBOT_CHATS,
  SOCKET_GET_CHATBOT_USERS,
  SOCKET_SEND_CHATBOT_MESSAGE,
} from "../../../../../redux/actions/socket.io";
import Layout from "./Layout";


const Chat = ({ userinfo }) => {
  const [chatUsers, setChatUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const [selectedChatMessages, setSelectedChatMessages] = useState([]);

  const currentUser = userinfo?.userinformation;
  const schoolId = localStorage.getItem("user_id");

  useEffect(() => {
    if (currentUser?.email) {
      SOCKET_GET_CHATBOT_USERS({
        currentUserEmail: currentUser?.email,
        schoolId,
      });
      SOCKET_CONNECTER_IO().on("chatbotUsers", (data) => {
        setChatUsers(data);
      });
    }
  }, [currentUser?.email]);

  useEffect(() => {
    SOCKET_CONNECTER_IO().on("chatbotChats", (data) => {
      const test = data.every(
        (chat) => chat?.roomId === selectedChatUser?.roomId
      );
      if (test) {
        setSelectedChatMessages(data);
      }
    });
  }, [SOCKET_CONNECTER_IO(), selectedChatUser]);

  const handleClickUser = (user) => {
    setSelectedChatUser(user);
    SOCKET_GET_CHATBOT_CHATS(user.roomId);
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleAddMessage = () => {
    if (message.length > 0) {
      const data = {
        schoolId: selectedChatUser.schoolId,
        email: currentUser.email,
        roomId: selectedChatUser.roomId,
        message,
        fullName: `${currentUser.firstname} ${currentUser.lastname}`,
        timestamp: Date.now(),
      };
      SOCKET_SEND_CHATBOT_MESSAGE(data);
      setMessage("");
    }
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chats
          </Typography>
        </Grid>
      </Grid>

      <Layout
        messages={selectedChatMessages}
        selectedChatUser={selectedChatUser}
        chatbotUsers={chatUsers}
        handleClickUser={handleClickUser}
        handleChange={handleChange}
        handleAddMessage={handleAddMessage}
        message={message}
      />

      {/* <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />
          <List>
            {chatUsers.map((user) => (
              <ListItem
                onClick={() => handleClickUser(user)}
                button
                key={user._id}
                style={{ border: user?.email === selectedChatUser?.email ? "1px solid black": null }}
              >
                <ListItemIcon>
                  <Avatar
                    alt={user.fullName}
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary={user.fullName}>
                  {user.fullName}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid item xs={9}>
          <List className={classes.messageArea}>
            {!!selectedChatMessages.length &&
              selectedChatMessages.map((chat) => (
                <ListItem key={chat._id}>
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText
                        align={
                          currentUser?.email === chat?.email ? "right" : "left"
                        }
                        primary={chat.message}
                      ></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText
                        align={
                          currentUser?.email === chat?.email ? "right" : "left"
                        }
                        secondary={chat.timestamp}
                      ></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
          </List>
          <Divider />

          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                value={message}
                onChange={handleChange}
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab onClick={handleAddMessage} color="primary" aria-label="add">
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userinfo: state.userinfo,
});

export default connect(mapStateToProps)(Chat);
