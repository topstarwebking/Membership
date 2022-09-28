import React, { useState } from 'react'
import { Chip, Dialog, makeStyles, Typography } from "@material-ui/core";
import FormCat from './formCat';
import FormStatus from './formStatus';

const useStyles = makeStyles({
    active: {
        borderRadius: 4,
        background: '#fff',
        color: '#0184FF',
        fontWeight: 'bold',
        '&:hover': {
            background: '#fff',
            color: '#0184FF',
        }
    },
    inactive: {
        borderRadius: 4,
        background: 'transparent',
        fontWeight: 'bold'
    }
})

const IsSmallDevise = window.matchMedia("(max-width:664px)").matches;

const AddCategoryOrStatusModal = () => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [catOrStatus, setcatOrStatus] = useState('status')
    const handleOpenDrower = (value) => {
        setcatOrStatus(value)
        setOpen(!open)
    }

    return (
        <div>
            <div>
                <Chip
                    style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                    onClick={() => { handleOpenDrower('status') }}
                    className={catOrStatus === 'status' ? classes.active : classes.inactive}
                    label={'Add Status'} />
                <Chip
                    style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                    onClick={() => { handleOpenDrower('category') }}
                    className={catOrStatus === 'category' ? classes.active : classes.inactive}
                    label={'Add Category'} />
            </div>
            <Dialog
                PaperProps={{
                    elevation: 0,
                    style: {
                        width: IsSmallDevise ? "100%" : "500px",
                    },
                }}
                anchor={'right'} open={open} onClose={() => handleOpenDrower(catOrStatus)}>
                <div className='p-1'>
                    <Typography className='mb-0 text-capitalize'> Add new {catOrStatus}</Typography>
                    {catOrStatus === 'category' ? <FormCat setOpen={setOpen} /> : <FormStatus setOpen={setOpen} />}
                </div>

            </Dialog>

        </div>
    )
}

export default AddCategoryOrStatusModal