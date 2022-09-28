import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useMediaQuery } from "@material-ui/core";
import { connect } from 'react-redux';
import { UserChatTextListIndex } from "../../../../../../../redux/actions/marketing/V2TextChat";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "#F8F8F8",
        padding: 5.5
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    }
}));

const ChatRoomHeader = (props) => {
    const isMobileView = useMediaQuery("(max-width:640px)");
    const classes = useStyles();
    const { activeStudent2sendtextChat } = props;
    const GoBack = () => {
        props.UserChatTextListIndex(null);
    }

    return (
        <div className={`d-flex justify-content-between align-items-center ${classes.root}`}>
            <div className='d-flex justify-content-start align-items-center '>
                <Avatar className={classes.small} alt={activeStudent2sendtextChat?.firstName} src={activeStudent2sendtextChat?.memberprofileImage} />
                <Typography className='pl-1 mb-0'>{activeStudent2sendtextChat?.firstName} {activeStudent2sendtextChat?.lastName}</Typography>
            </div>

            {isMobileView ? (
                <IconButton onClick={() => { GoBack() }} className='text-gray rounded-circle' aria-label="add">
                    <ArrowBackIcon />
                </IconButton>
            ) :
            (
                <IconButton className='text-gray rounded-circle' aria-label="add">
                    <StarBorderIcon />
                </IconButton>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        activeStudent2sendtextChat: state.V2textChat?.activeStudent2sendtextChat,
    };
};
export default connect(mapStateToProps, { UserChatTextListIndex })(ChatRoomHeader);
