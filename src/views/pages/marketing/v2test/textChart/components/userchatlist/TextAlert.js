import React from 'react';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            width: '24px',
            height: '22px',
            justifyContent: "center",
            display: 'flex',
            backgroundColor: "#0184ff",
        },

    },
}));


const TextAlert = (props) => {
    const classes = useStyles();
    const { alertCount } = props;
    return (
        <div className={`${classes.root}`}>
            {(alertCount > 0) ? (
                <Paper>
                    <Typography style={{ color: "white", fontSize: "small", borderRadius: 50 }} variant="subtitle1">{alertCount}</Typography>
                </Paper>) : (null)}
        </div>
    );
}
export default TextAlert;
