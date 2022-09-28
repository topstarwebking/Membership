import React, { useState } from 'react'
import { Button } from "@material-ui/core";
import { Plus } from "react-feather";
import Drawer from '@material-ui/core/Drawer';
import GoalForm from './GoalsForm';


const IsSmallDevise = window.matchMedia("(max-width:664px)").matches;

const AddGoals = () => {
    const [open, setOpen] = useState(false)
    const handleOpenDrower = () => {
        setOpen(!open)
    }

    return (
        <div>
            <Button
                startIcon={<Plus size={20} />}
                className="ml-1"
                onClick={handleOpenDrower}
                style={{
                    color: "#fff",
                    height: 40,
                    background: "#0184FF",
                    borderRadius: "4px",
                    width: "90px",
                }}
            >
                <b> Add</b>
            </Button>
            <Drawer
                PaperProps={{
                    elevation: 0,
                    style: {
                        width: IsSmallDevise ? "100%" : "500px",
                    },
                }}
                anchor={'right'} open={open} onClose={handleOpenDrower}>
                <div className='p-1'>
                    <GoalForm handleClose={handleOpenDrower} />
                </div>

            </Drawer>

        </div>
    )
}

export default AddGoals