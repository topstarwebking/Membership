import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "@material-ui/core";
import TextTemplate from "./Template";
import { toast } from "react-toastify";
import { useMediaQuery } from "@material-ui/core";
import {
  Attachment,
  InsertEmoticonOutlined,
  Send,
} from "@material-ui/icons";
import {
  SEND_TEXT_MESSAGE_V2,
  UPDATE_MEMBER_CONTACTS_DETAILS,
} from "../../../../../../../redux/actions/marketing/V2TextChat";
import { connect } from "react-redux";
import Picker, {SKIN_TONE_MEDIUM_DARK} from "emoji-picker-react"

const useStyles = makeStyles((theme) => ({
  sendIcon: {
    marginRight: theme.spacing(1),
  },
}));

const toastCSS = () => {
  return {
    position: "top-center",
    autoClose: 3000,
    icon: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: true,
  };
};

const MessageInput = (props) => {
  const isMobileView = useMediaQuery("(max-width:640px)");
  const classes = useStyles();
  const { SEND_TEXT_MESSAGE_V2, activeStudent2sendtextChat, contacts } = props;
  const [inputvalue, setinputvalue] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (e, emojiObject) => {
    setinputvalue(prevInput => prevInput + emojiObject.emoji);
    setShowPicker(true)
  }

  const handaleSendingsms = async (e) => {
    e.preventDefault();
    setinputvalue("");
    setShowPicker(false)
    let { uid } = activeStudent2sendtextChat;
    if (inputvalue.length) {
      let message = {
        userId: localStorage.getItem("user_id"),
        uid: uid,
        textContent: inputvalue,
        isSent: true,
      };
      let result = await SEND_TEXT_MESSAGE_V2(message);
      if (result.success) {
        props.UPDATE_MEMBER_CONTACTS_DETAILS(contacts, {
          uid,
          textContent: inputvalue,
          time: new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
        });
      } else {
        toast.error(result.message.replace(/\\/g, ""), toastCSS());
      }
    }
  };

  return (
    <div>
      {
        showPicker && <Picker skinTone={SKIN_TONE_MEDIUM_DARK} onEmojiClick={onEmojiClick} />
      }
      <form onSubmit={handaleSendingsms}>
        <div className={`d-flex justify-content-between`}>
          <div
            style={{
              border: "1.5px solid #E0E0E0",
              padding: 2,
              borderRadius: 20,
              background: "#EEEEEE",
            }}
            className="mt-1 d-flex justify-content-start align-items-center w-100"
          >
            <div className="goal-search-box d-flex justify-content-start align-items-center pl-1 pr-1 w-100">
              <TextTemplate />
              <IconButton size="small" className="rounded-circle text-primary">
                <InsertEmoticonOutlined
                  onClick={() => setShowPicker(val => !val)}
                />
              </IconButton>
              <IconButton size="small" className="rounded-circle text-primary">
                <Attachment />
              </IconButton>
              <InputBase
                className="w-100"
                type="text"
                placeholder="Type a message here..."
                value={inputvalue}
                onChange={(e) => {
                  setinputvalue(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="mt-1 d-flex justify-content-start align-items-center">
            <div className="d-flex justify-content-start align-items-center pl-1 pr-1 w-100">
              {/* <Button
                style={{
                  color: "#FFFFFF",
                  background: "#00a6e1",
                  borderRadius: 20,
                }}
                type="submit"
              >
                <Send className={isMobileView ? null : classes.sendIcon} />
                {isMobileView ? '' : "Send"}
              </Button> */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    getMessages: state.V2textChat?.getMessages,
    activeStudent2sendtextChat: state.V2textChat?.activeStudent2sendtextChat,
    contacts: state.V2textChat?.contacts,
  };
};

export default connect(mapStateToProps, {
  SEND_TEXT_MESSAGE_V2,
  UPDATE_MEMBER_CONTACTS_DETAILS,
})(MessageInput);
