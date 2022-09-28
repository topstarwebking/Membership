import React, { useState } from 'react';
import { Button } from "reactstrap";
import DrawerEventAppoinment from './drawerEventAppoinment';

const AddEventOrAppointment = () => {
    const [open, setOpen] = useState(false)

    const handleCloseOpen = () => {
        setOpen(!open)
    }
    return (
        <div>
            <Button.Ripple onClick={handleCloseOpen} color="primary" size="samll">
                <b> + Add</b>
            </Button.Ripple>
            <DrawerEventAppoinment type='add' handleCloseOpen={handleCloseOpen} open={open} />
        </div>
    )
}

export default AddEventOrAppointment;

