import React, { useState } from 'react'
import SubGoalForm from './SubGoalForm';
import { Drawer } from '@material-ui/core';

const IsSmallDevise = window.matchMedia("(max-width:664px)").matches;

const AddSubGoal = (props) => {
    const { item, open, handleOpenSubGoalForm, } = props
    const [state, setState] = useState({
        start_date: new Date(), end_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    })

    const handleDateChange = (value, name) => {
        setState({ ...state, [name]: value, start_time: value });
    }

    return (
        <div>
            <Drawer
                PaperProps={{
                    elevation: 0,
                    style: {
                        width: IsSmallDevise ? "100%" : "500px",
                    },
                }}
                anchor='right'
                open={open} onClose={handleOpenSubGoalForm}>
                <div className='p-1'>
                    <SubGoalForm item={item} handleDateChange={handleDateChange} handleClose={handleOpenSubGoalForm} />
                </div>
            </Drawer>

        </div>
    )
}

export default AddSubGoal