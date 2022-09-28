import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { Dialog, DialogContent, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Search } from 'react-feather';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Typography } from '@material-ui/core';
import UserAvatar from '../Avatar';
import {
    V2_ADD_TEXT_CONTACTS, GET_TEXT_USER_CHAT_LIST, UserChatTextListIndex, ACTIVE_STUDENT_TO_SEND_TEXTCHAT_MSG,
} from "../../../../../../../redux/actions/marketing/V2TextChat";
import { LIST_ALL_MEMBERS, SEARCH_MEMBERS_LIST_INFO } from '../../../../../../../redux/actions/newstudent';

const AddNewMebmer4textChat = (props) => {
    const { members, contacts } = props;
    const { V2_ADD_TEXT_CONTACTS,
        GET_TEXT_USER_CHAT_LIST,
        UserChatTextListIndex,
        ACTIVE_STUDENT_TO_SEND_TEXTCHAT_MSG
    } = props;
    const [show, setShow] = useState(false);
    // const handleClose = () => setShow(!show);
    const [userChatAddActivity, setUserChatAddActivity] = useState(null)
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [membersList, setMembersList] = useState([]);
    const [createAlert, setCreateAlert] = useState({ 'alert': false, 'uid': null });

    const selectedMember = async (event, Info, index) => {
        setSelectedIndex(index);
        setUserChatAddActivity(Info)
    }
    const handleClose = () => {
        setSelectedIndex(null);
        setShow(!show)
        setUserChatAddActivity(null)
    }
    useEffect(() => {
        setMembersList(members.data ? members.data : [])
    }, [props.members.data]);

    useEffect(() => {
        if (createAlert.alert) {
            const index = contacts.findIndex(item => item._id === createAlert.uid);
            const { firstName, lastName, memberprofileImage } = contacts[index];
            UserChatTextListIndex(index);
            ACTIVE_STUDENT_TO_SEND_TEXTCHAT_MSG(Object.assign({}, { firstName, lastName, memberprofileImage }, { 'uid': createAlert.uid }))
        }
    }, [contacts])

    const addMember = async () => {
        const { _id } = userChatAddActivity;
        let memberValue = {
            uid: _id,
            from: localStorage.getItem("user_id")
        }
        let res = await V2_ADD_TEXT_CONTACTS(memberValue);
        const { success } = res;
        if (success) {
            let { uid } = res.data.data;
            setCreateAlert({ 'uid': uid, 'alert': true })
            GET_TEXT_USER_CHAT_LIST();
            handleClose()
        }

    }
    let HandleSearch = async (value) => {
        if (value.length > 2) {
           await props.SEARCH_MEMBERS_LIST_INFO(value);
        }else if(value.length === 0){
            await props.LIST_ALL_MEMBERS()
        }
    }

    return (
        <div className='m-0'>
            <IconButton onClick={handleClose} className='text-primary rounded-circle' aria-label="add">
                <AddIcon />
            </IconButton>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={show} onClose={handleClose}>
                <div style={{ background: "#F8F8F8" }} className={`d-flex justify-content-between`}>
                    <div className="d-flex p-1 mb-0">
                        <Typography variant="h6">
                            Select Member
                        </Typography>
                    </div>
                    <div>
                        <div style={{ border: '1.5px solid #E0E0E0', padding: 3 }} className='mt-1 rounded d-flex justify-content-start align-items-center w-100'>
                            <div className="goal-search-box d-flex justify-content-start align-items-center pl-1 pr-1 w-100">
                                <InputBase
                                    className="w-100"
                                    type="text"
                                    placeholder="Search member..."
                                    onChange={(e) => {
                                        HandleSearch(e.target.value);
                                    }}
                                />
                                <Search size={18} color="#878787" />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex p-1">
                        <IconButton onClick={handleClose} className='text-primary rounded-circle' aria-label="add">
                            <CloseIcon />
                        </IconButton>
                    </div>

                </div>
                <DialogContent style={{ padding: 0 }}>
                    <List dense >
                        {membersList.map((item, i) => {
                            return (
                                <ListItem selected={selectedIndex === i} button
                                    onClick={(event) => selectedMember(event, item, i)}
                                    key={i}>
                                    <ListItemAvatar>
                                        <UserAvatar name={item?.firstName} avatarPath={item?.memberprofileImage} />
                                    </ListItemAvatar>
                                    <div>
                                        <Typography className='mb-0' variant="subtitle1">{item.firstName} {item.lastName}</Typography>
                                        <Typography color='textSecondary' className='mb-0'>{item.last_message}</Typography>
                                    </div>
                                </ListItem>
                            )
                        })}

                    </List>
                </DialogContent>
                {!(userChatAddActivity === null) ? (
                    <div className={`d-flex justify-content-center p-1`}>
                        <Button onClick={(event) => addMember()} variant="contained" size="large" color="primary">
                            Send Sms
                        </Button>
                    </div>
                ) : null}

            </Dialog>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        getMessages: state.V2textChat?.getMessages,
        activeStudent2sendtextChat: state.V2textChat?.activeStudent2sendtextChat,
        members: state.member.list_member,
        contacts: state.V2textChat?.contacts,
    };
};

export default connect(mapStateToProps, {
    V2_ADD_TEXT_CONTACTS,
    GET_TEXT_USER_CHAT_LIST,
    UserChatTextListIndex,
    ACTIVE_STUDENT_TO_SEND_TEXTCHAT_MSG,
    LIST_ALL_MEMBERS,
    SEARCH_MEMBERS_LIST_INFO
})(AddNewMebmer4textChat);
// export default connect(null, { GET_DOCUMENT_BY_MEMBERSHIP_ID })(AddNewMebmer4textChat);
