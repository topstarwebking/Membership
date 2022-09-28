import React, { useState } from 'react';
import { Chip, IconButton, Typography, Dialog, DialogContent, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
import { Input, Label, CustomInput } from 'reactstrap';
import FieldsOfSignature from './FieldsOfSignature';
import { SUBMIT_VALUE_OF_SIGNATURE_ADD, UPDATE_MM_USER_SIGNATURE } from '../../../../../redux/actions/docuSign';
import { connect } from 'react-redux';
const IsSmallDevise = window.matchMedia('(max-width:1064px)').matches;

const MainAdditionalSigner = (props) => {
    const { title, isEdit,
        buttonText, color, SUBMIT_VALUE_OF_SIGNATURE_ADD, id, defaultFormvalue, listOfActiveOrInActiveEmails, UPDATE_MM_USER_SIGNATURE } = props
    const [open, setOpen] = useState(false)
    const [formValue, setFormValue] = useState({ signature: null })

    const getSignatureValue = (item) => {
        if (isEdit) {
            setFormValue({ ...defaultFormvalue, ...item })
        } else {
            setFormValue({ ...formValue, ...item })
        }
    }


    const handleChageValue = (e) => {
        let { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })
    }

    const handleClose = () => {
        setOpen(!open)
    }

    const addNew = (e) => {
        e.preventDefault()
        SUBMIT_VALUE_OF_SIGNATURE_ADD({ ...formValue, id }, isEdit)
        setOpen(false)
        setFormValue({ signature: null })
        UPDATE_MM_USER_SIGNATURE(formValue?.signature)
    }


    return (
        <div>
            <Chip label={<b>{buttonText}</b>} style={{ background: 'none', color: color }} size="small" onClick={handleClose} />
            <Dialog
                PaperProps={{
                    elevation: 0, style: {
                        borderRadius: '1rem',
                        width: IsSmallDevise ? "100%" : "500px",
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
                            <Input required defaultValue={isEdit ? defaultFormvalue?.fullname : ''} onChange={handleChageValue} id='Fullname' name='fullname' placeholder='Fullname' />
                            <br />
                            <Label htmlFor='email'>Email</Label>
                            <CustomInput
                                required defaultValue={isEdit ? defaultFormvalue?.email : ''} onChange={handleChageValue}
                                type="select" id='email' name='email'>
                                <option>Select email</option>
                                {listOfActiveOrInActiveEmails?.map((item, i) => {
                                    return (
                                        <option key={i} value={item?.email}>{item?.email}</option>
                                    )
                                })
                                }
                            </CustomInput>
                            <br />
                            <br />
                            <Label htmlFor='pleaseSign'>Please Sign</Label>
                            <FieldsOfSignature formValue={formValue} getSignatureValue={getSignatureValue} />
                            <br />
                            <div className='d-flex justify-content-end'>
                                <Button className='rounded' variant="contained" style={{ background: '#2191fd' }}
                                    disabled={formValue?.signature == null} type='submit'>{buttonText}</Button>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        listOfActiveOrInActiveEmails: state.EmailMarketing.listOfActiveOrInActiveEmails,
    };
};
export default connect(mapStateToProps, {
    SUBMIT_VALUE_OF_SIGNATURE_ADD, UPDATE_MM_USER_SIGNATURE
})(MainAdditionalSigner);