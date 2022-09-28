import React, { Fragment, useState } from 'react'
import EventNoteIcon from '@material-ui/icons/EventNote';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Calender from './calendar';
import { ChevronsRight } from 'react-feather';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    grayBg: {
        fontSize: 14,
        background: '#F6F6F6',
        padding: '1em'
    },
    textPrimary: {
        color: '#0184FF'
    },
    textNormal: {
        color: '#666666'
    }
});


const IsSmallDevise = window.matchMedia("(max-width:664px)").matches;
// const localizer = momentLocalizer(moment)


function SubGoalsCalender(props) {
    const classes = useStyles();
    const { item } = props
    const [open, setOpen] = useState(false)
    const handleOpenCalender = () => {
        setOpen(!open)
    }
    return (
        <Fragment>
            <IconButton className='rounded' size='small' onClick={handleOpenCalender}>
                <EventNoteIcon />
            </IconButton>
            <Drawer
                // variant='persistent'
                PaperProps={{
                    elevation: 0,
                    style: {
                        width: IsSmallDevise ? "100%" : "360px",
                    },
                }}
                anchor={'right'} open={open} onClose={handleOpenCalender}>
                <div>
                    <div>
                        <div className='d-flex justify-content-start align-items-center p-1'>
                            <div>Mymember</div>
                            <div><ChevronsRight size={16} /></div>
                            <div style={{ color: '#0184FF' }}>Sub gaols name</div>
                        </div>
                        <div style={{ background: '#F6F6F6', color: '#0184FF', padding: 8 }}>
                            <span className='text-bold'>Days Calendar</span>
                        </div>

                        <div style={{ height: 360 }}>
                            <Calender item={item} />
                        </div>

                        <div className={classes.grayBg + ' d-flex justify-content-between align-items-center'}>
                            <div>
                                <span className={classes.textNormal}><b>Goal:</b> </span>
                                <span className={classes.textPrimary}> MainGoalName</span>
                            </div>
                            <div>
                                <span className={classes.textNormal}><b>SubGoal:</b> </span>
                                <span className={classes.textPrimary}> SubGoalName</span>
                            </div>
                        </div>
                        <div style={{ fontSize: 14 }} className='d-flex justify-content-between align-items-center p-1'>
                            <div className='text-center'>
                                <div className={classes.textNormal}>Category</div>
                                <div className={classes.textPrimary}>Daily</div>
                            </div>
                            <div className='text-center'>
                                <div className={classes.textNormal}>Goal</div>
                                <div className={classes.textPrimary}>90</div>
                            </div>
                        </div>
                        <div className='border-bottom mx-1'> </div>
                        <div style={{ fontSize: 14 }} className='d-flex justify-content-between align-items-center p-1'>
                            <div>
                                <span className={classes.textNormal}>Start Date:</span>
                                <span className={classes.textPrimary}> 12.02.2022</span>
                            </div>
                            <div>
                                <span className={classes.textNormal}>End Date:</span>
                                <span className={classes.textPrimary}> 12.10.2022</span>
                            </div>
                        </div>
                        <div className={classes.grayBg}>
                            <span className={classes.textPrimary}>Days</span>
                        </div>

                        <div style={{ fontSize: 14 }} className='d-flex justify-content-between align-items-center p-1'>
                            <div className='text-center'>
                                <div className={classes.textNormal}>Total</div>
                                <div className={classes.textPrimary}>100</div>
                            </div>
                            <div className='text-center'>
                                <div className={classes.textNormal}>Completed</div>
                                <div className={classes.textPrimary}>70</div>
                            </div>
                            <div className='text-center'>
                                <div className={classes.textNormal}>Left</div>
                                <div className={classes.textPrimary}>30</div>
                            </div>
                        </div>
                        <div className='border-bottom mx-1'> </div>
                        <div className={'p-1 d-flex justify-content-between align-items-center'}>
                            <div>
                                <span className={classes.textNormal}>Completion: </span>
                                <span className={classes.textPrimary}> 70%</span>
                            </div>
                            <div>
                                <span className={classes.textNormal}>Score: </span>
                                <span className={classes.textPrimary}> 30%</span>
                            </div>
                        </div>

                    </div>
                </div>
            </Drawer>
        </Fragment>
    )
}

export default SubGoalsCalender