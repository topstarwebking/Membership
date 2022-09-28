import React, { useState } from 'react';
import { Chip, IconButton, Typography, Dialog, DialogContent, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
import { Input, Label } from 'reactstrap';

const IsSmallDevise = window.matchMedia('(max-width:1064px)').matches;
const AddAdditionalSigner = (props) => {
    const { title, setAddAdditionalUser, addAdditionalUser,
        buttonText, color } = props
    const [open, setOpen] = useState(false)
    const [formValue, setFormValue] = useState({})

    const handleChageValue = (e) => {
        let { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })
    }

    const handleClose = () => {
        setOpen(!open)
    }

    const addNew = (e) => {
        e.preventDefault()
        setAddAdditionalUser([...addAdditionalUser, formValue])
        setOpen(false)
    }

    return (
        <div>
            <Chip label={<b>{buttonText}</b>} style={{ background: 'none', color: color }} size="small" onClick={handleClose} />
            <Dialog
                PaperProps={{
                    elevation: 0, style: {
                        borderRadius: '1rem',
                        width: IsSmallDevise ? "100%" : "500px",
                        // height: IsSmallDevise ? "500px" : "auto"
                    }
                }}
                variant="persistent"
                open={open}>
                <DialogContent className='p-1'>
                    <div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <Typography className='mb-0'>
                                <b> {title}</b>
                            </Typography>
                            <IconButton onClick={handleClose} className='rounded-circle'>
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <form onSubmit={addNew}>
                            <Label htmlFor='Fullname'>Full Name</Label>
                            <Input required onChange={handleChageValue} id='Fullname' name='fullname' placeholder='Fullname' />
                            <br/>
                            <Label htmlFor='email'>Email</Label>
                            <Input required onChange={handleChageValue} id='email' name='email' placeholder='Email address' />
                            <br/>
                            <br/>
                            <div className='d-flex justify-content-end'>
                                <Button className='rounded' variant="contained"
                                style={{ background: '#2191fd', color: '#ffffff' }}
                                type='submit'>{buttonText}</Button>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddAdditionalSigner