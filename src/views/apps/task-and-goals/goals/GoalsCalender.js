import React, { Fragment, useState } from 'react'
import EventNoteIcon from '@material-ui/icons/EventNote';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import SubGoalsCalender from '../calendar';


const IsSmallDevise = window.matchMedia("(max-width:664px)").matches;
// const localizer = momentLocalizer(moment)


function GoalsCalender(props) {
    const {  item } = props
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
                PaperProps={{
                    elevation: 0,
                    style: {
                        width: IsSmallDevise ? "100%" : "50%",
                    },
                }}
                anchor={'right'} open={open} onClose={handleOpenCalender}>
                <div className='p-1'>
                    <SubGoalsCalender item={item} />
                </div>

            </Drawer>
        </Fragment>
    )
}

export default GoalsCalender