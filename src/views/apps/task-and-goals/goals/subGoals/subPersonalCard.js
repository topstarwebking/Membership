import React from 'react';
import { Card, makeStyles, Typography } from '@material-ui/core';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import Action from './action'
// import SubGoalsCalender from './SubCalender'
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import moment from 'moment';

const useStyles = makeStyles({
    goalIconBx: {
        width: 32, height: 32,
        borderRadius: '50%',
        marginRight: 6
    },
    fullbar: {
        width: '100%',
        background: '#E7E7E7',
        height: 6,
        borderRadius: 3,
        marginRight: 8
    },
    progress: {
        height: 6,
        borderRadius: 3
    },
    textPrimary: {
        color: '#0184FF'
    },
    textNormal: {
        color: '#4F4F4F',
        marginRight: 6,
    },
    goalStatus: {
        background: '#CBE6FF',
        borderRadius: 8,
        padding: '0 5px'
    }
})

function hexToRGB(hex, alpha) {
    try {
        var r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);

        if (alpha) {
            return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
        } else {
            return "rgb(" + r + ", " + g + ", " + b + ")";
        }
    } catch (error) {
        return hex;
    }
}

const BarUI = (props) => {
    const classes = useStyles()
    const { color, progress } = props
    return (
        <div className='w-100 d-flex justify-content-start align-items-center'>
            <div className={classes.fullbar}>
                <div style={{ background: color, width: progress }} className={classes.progress}></div>
            </div>
            <span style={{ color: color }}>{progress}</span>
        </div>
    )
}
const SubGoalCard = (props) => {
    const { item } = props
    const classes = useStyles()
    return (
        <div className='bg-white shadow-sm rounded' style={{ padding: 8, margin: 8, borderTop: `6px solid ${item?.color}` }}>
            <div className='w-100 d-flex justify-content-between align-items-center'>
                <div className='d-flex justify-content-start align-items-center'>
                    <div style={{ background: hexToRGB(item?.color, 0.16) }} className={classes.goalIconBx + ' d-flex justify-content-center align-items-center'}>
                        <TrackChangesIcon style={{ color: item?.color }} />
                    </div>
                    <Typography className='mb-0' style={{ color: item?.color }}> {item?.title}</Typography>
                </div>
                <Action />
            </div>
            <div style={{ marginTop: 8 }} className='d-flex justify-content-start align-items-center'>
                <BarUI progress={item?.progress + '%'} color={item?.color} />
            </div>
            <Typography color='textSecondary'><small>{item?.des} </small></Typography>
            <div style={{ fontSize: 12 }} className='d-flex justify-content-between align-items-center mb-1'>
                <div>
                    <span className={classes.textNormal}>Category: </span>
                    <span className={classes.textPrimary}>{item?.type}</span>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <div style={{ marginRight: 6 }}>
                        <span className={classes.textNormal}>Total: </span>
                        <span className={classes.textPrimary}> {item?.totaldays} Days</span>
                    </div>
                    <EventAvailableIcon fontSize='small' />
                    {/* <SubGoalsCalender item={item} /> */}
                </div>
            </div>

            <div className='d-flex justify-content-between align-items-center'>
                <div className={classes.goalStatus}>
                    <DesktopMacIcon style={{ color: '#0184FF', fontSize: 12, marginRight: 4 }} />
                    <span style={{ color: '#0184FF', fontSize: 12 }}>{item?.Status}</span>
                </div>
                <div className='d-flex justify-content-start align-items-center'>
                    <div>
                        <div className={classes.textPrimary} style={{ fontSize: 10 }}>Start Date</div>
                        <div className={classes.textNormal} style={{ fontSize: 10, borderRight: '1px solid #AAAAAA', paddingRight: 6 }}>{moment(item?.start).format('MM/DD/YYYY')}</div>
                    </div>
                    <div>
                        <div className={classes.textPrimary} style={{ fontSize: 10 }}>End Date</div>
                        <div className={classes.textNormal} style={{ fontSize: 10 }}>{moment(item?.end).format('MM/DD/YYYY')}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SubGoalCard;