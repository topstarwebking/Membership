import React, { Fragment, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';

import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export const StatusFilter = (props) => {
    const { featureType, filtertype } = props
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    const getColor = (status) => {
        if (status === 'incomplete') {
            return '#FF0000'
        } else if (status === 'completed') {
            return '#37D400'
        } else if (status === 'inprogress') {
            return '#B1530F'
        } else if (status === 'pending') {
            return '#FFB800'
        }
    }
    useEffect(()=> {
        setOpen(false)
    },[filtertype])
    return (
        <Fragment>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <FiberManualRecordIcon style={{ fontSize: '16px', color: getColor(filtertype) }} />
                </ListItemIcon>
                <ListItemText primary="Status" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button component={Link} to={`/app/task-and-goals/${featureType}/completed`} className={classes.nested} >
                        <ListItemIcon>
                            <FiberManualRecordIcon style={{ fontSize: '16px', color: '#37D400' }} />
                        </ListItemIcon>
                        <Typography style={{ color: '#757575' }} className='mb-0'>
                            Completed
                        </Typography>
                    </ListItem>
                    <ListItem button component={Link} to={`/app/task-and-goals/${featureType}/incomplete`} className={classes.nested}>
                        <ListItemIcon>
                            <FiberManualRecordIcon style={{ fontSize: '16px', color: '#FF0000' }} />
                        </ListItemIcon>
                        <Typography style={{ color: '#757575' }} className='mb-0'>
                            In Complete
                        </Typography>
                    </ListItem>
                    <ListItem button component={Link} to={`/app/task-and-goals/${featureType}/inprogress`} className={classes.nested}>
                        <ListItemIcon>
                            <FiberManualRecordIcon style={{ fontSize: '16px', color: '#B1530F' }} />
                        </ListItemIcon>
                        <Typography style={{ color: '#757575' }} className='mb-0'>
                            In Progress
                        </Typography>
                    </ListItem>
                    <ListItem button component={Link} to={`/app/task-and-goals/${featureType}/pending`} className={classes.nested}>
                        <ListItemIcon>
                            <FiberManualRecordIcon style={{ fontSize: '16px', color: '#FFB800' }} />
                        </ListItemIcon>

                        <Typography style={{ color: '#757575' }} className='mb-0'>
                            Pending
                        </Typography>
                    </ListItem>
                </List>
            </Collapse>
        </Fragment>
    )
}

export const PriorityStatus = (props) => {
    const { featureType, filtertype } = useParams()

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    // const { row } = props
    const getColor = (status) => {
        if (status === 'urgent') {
            return '#FF3E3E'
        } else if (status === 'high') {
            return '#E2B408'
        } else if (status === 'normal') {
            return '#0AB5FF'
        } else if (status === 'low') {
            return '#AAAAAA'
        }
    }
    useEffect(()=> {
        setOpen(false)
    },[filtertype])
    return (
        <Fragment>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    {
                        filtertype === 'clear' ?
                            <CloseOutlinedIcon fontSize='small' style={{ color: '#18D441' }} /> :
                            <FlagOutlinedIcon fontSize='small' style={{ color: getColor(filtertype) }} />

                    }
                </ListItemIcon>
                <ListItemText primary="Priority" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button component={Link} to={`/app/task-and-goals/${featureType}/urgent`} className={classes.nested}>
                        <ListItemIcon>
                            <FlagOutlinedIcon fontSize='small' style={{ color: '#FF3E3E' }} />
                        </ListItemIcon>
                        Urgent
                    </ListItem>
                    <ListItem button component={Link} to={`/app/task-and-goals/${featureType}/high`} className={classes.nested}>
                        <ListItemIcon>
                            <FlagOutlinedIcon fontSize='small' style={{ color: '#E2B408' }} />
                        </ListItemIcon>
                        High
                    </ListItem>
                    <ListItem button component={Link} to={`/app/task-and-goals/${featureType}/normal`} className={classes.nested}>
                        <ListItemIcon>
                            <FlagOutlinedIcon fontSize='small' style={{ color: '#0AB5FF' }} />
                        </ListItemIcon>
                        Normal
                    </ListItem>
                    <ListItem button component={Link} to={`/app/task-and-goals/${featureType}/low`} className={classes.nested}>
                        <ListItemIcon>
                            <FlagOutlinedIcon fontSize='small' style={{ color: '#AAAAAA' }} />
                        </ListItemIcon>
                        Low
                    </ListItem>
                    <ListItem button component={Link} to={`/app/task-and-goals/${featureType}/clear`} className={classes.nested}>
                        <ListItemIcon>
                            <CloseOutlinedIcon fontSize='small' style={{ color: '#18D441' }} /> :
                        </ListItemIcon>
                        Clear
                    </ListItem>
                </List>
            </Collapse>
        </Fragment>
    )
}

// export const LabelStatus = (props) => {
//     const { featureType, filtertype } = useParams()

//     const classes = useStyles();
//     const [open, setOpen] = React.useState(false);

//     const handleClick = () => {
//         setOpen(!open);
//     };
    
//     useEffect(()=> {
//         setOpen(false)
//     },[filtertype])
//     return (
//         <Fragment>
//             <ListItem button onClick={handleClick}>
//                 <ListItemIcon>
//                     {
//                         filtertype === 'clear' ?
//                             <CloseOutlinedIcon fontSize='small' style={{ color: '#18D441' }} /> :
//                             <FlagOutlinedIcon fontSize='small' style={{ color: getColor(filtertype) }} />

//                     }
//                 </ListItemIcon>
//                 <ListItemText primary="Priorty" />
//                 {open ? <ExpandLess /> : <ExpandMore />}
//             </ListItem>
//             <Collapse in={open} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                     <ListItem button component={Link} to={`/app/task-and-goals/${featureType}/urgent`} className={classes.nested}>
//                         <ListItemIcon>
//                             <FlagOutlinedIcon fontSize='small' style={{ color: '#FF3E3E' }} />
//                         </ListItemIcon>
//                         Urgent
//                     </ListItem>
//                     <ListItem button component={Link} to={`/app/task-and-goals/${featureType}/high`} className={classes.nested}>
//                         <ListItemIcon>
//                             <FlagOutlinedIcon fontSize='small' style={{ color: '#E2B408' }} />
//                         </ListItemIcon>
//                         High
//                     </ListItem>
//                     <ListItem button component={Link} to={`/app/task-and-goals/${featureType}/normal`} className={classes.nested}>
//                         <ListItemIcon>
//                             <FlagOutlinedIcon fontSize='small' style={{ color: '#0AB5FF' }} />
//                         </ListItemIcon>
//                         Normal
//                     </ListItem>
//                     <ListItem button component={Link} to={`/app/task-and-goals/${featureType}/low`} className={classes.nested}>
//                         <ListItemIcon>
//                             <FlagOutlinedIcon fontSize='small' style={{ color: '#AAAAAA' }} />
//                         </ListItemIcon>
//                         Low
//                     </ListItem>
//                     <ListItem button component={Link} to={`/app/task-and-goals/${featureType}/clear`} className={classes.nested}>
//                         <ListItemIcon>
//                             <CloseOutlinedIcon fontSize='small' style={{ color: '#18D441' }} /> :
//                         </ListItemIcon>
//                         Clear
//                     </ListItem>
//                 </List>
//             </Collapse>
//         </Fragment>
//     )
// }


