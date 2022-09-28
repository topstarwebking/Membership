import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { InputBase, Typography } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { Search } from "react-feather";
import {
  CustomInput,
} from "reactstrap";
import {
  GET_TEXT_USER_CHAT_LIST,
  SET_NEW_CONTACT_DETAILS,
  GET_MEMBER_CONTACTS_DETAILS
} from "../../../../../../../redux/actions/marketing/V2TextChat";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    background: "#F8F8F8",
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const PorfileAvatar = (props) => {
  const { contacts, getDataBack,setLoading, handleEventType } = props;
  const classes = useStyles();

  useEffect(() => {
    props.GET_MEMBER_CONTACTS_DETAILS();
  }, []);

  let HandleSearch = async (e) => {
    let { value } = e.target
    await setLoading(true)
    if (value.length > 2) {
      let filterData = contacts.flatMap((el) => {
        let { firstName } = el;
        if (firstName.toLowerCase().startsWith(value.toLowerCase())) {
          return el;
        }
      });
      let latestInfo = filterData.filter(function (element) {
        return element !== undefined;
      });
      props.SET_NEW_CONTACT_DETAILS(latestInfo);
    } else if (value.length === 0) {
      props.GET_TEXT_USER_CHAT_LIST();
    }
    if (value === "") {
     await getDataBack()
    }
    await setLoading(false)
  };

  return (
    <div>
      <List className={"w-100 mb-0 p-0"} dense>
        <ListItem className={`d-flex justify-content-between ${classes.root}`}>
          <Typography className="mb-0">Members</Typography>
          <div>
            <CustomInput
              type="select"
              name="select"
              id="studentType"
              onChange={handleEventType}
            >
              <option value="">Active Members</option>
              <option value="Active Trial">Active Trial</option>
              <option value="Former Student">Former Student</option>
              <option value="Former Trial">Former Trial</option>
              <option value="Leads">Leads</option>
            </CustomInput>
          </div>
        </ListItem>
        <ListItem>
          <div
            style={{ border: "1.5px solid #E0E0E0", padding: 3, background: "#f0f0f0" }}
            className="mt-1 rounded d-flex justify-content-start align-items-center w-100"
          >
            <div className="goal-search-box d-flex justify-content-start align-items-center pl-1 pr-1 w-100">
              <Search size={18} color="#878787" />
              <InputBase
                className="w-100 ml-1"
                type="text"
                placeholder="Search contacts"
                onChange={HandleSearch}
              />
            </div>
          </div>
        </ListItem>
      </List>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    TextChatUserList: state.V2textChat.TextChatUserList,
    contacts: state.V2textChat?.contacts,
  };
};

export default connect(mapStateToProps, {
  GET_TEXT_USER_CHAT_LIST,
  SET_NEW_CONTACT_DETAILS,
  GET_MEMBER_CONTACTS_DETAILS
})(PorfileAvatar);
