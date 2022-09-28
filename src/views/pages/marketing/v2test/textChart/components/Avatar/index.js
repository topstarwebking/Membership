import React from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        
    }
}))(Badge);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    }
}));

const UserAvatar = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <StyledBadge
               
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                // variant="dot"
            >
                <Avatar className={classes.small} alt={props?.name} src={props?.avatarPath} />
            </StyledBadge>
        </div>
    );
}

export default UserAvatar;