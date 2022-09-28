
import { Dialog, DialogContent, Button } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import { Input, Label } from 'reactstrap';

export default function AddnewInvite(props) {
    const { formValue, setSignModal, item, setFormValue, getSignatureValue } = props
    const [open, setOpen] = useState(false)
    const [addNewValue, setAddNewValue] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setSignModal(item)
        getSignatureValue({
            signature: null,
            signature_size: 3,
            signature_color: '#000000',
            signature_text: '',
            tab_index: 0, value: addNewValue
        })
        setOpen(false)
        // setFormValue({ ...formValue, 'value': e.target?.value })
    }

    return (
        <Fragment>
            <Button className='rounded'
                variant="contained"
                size='small'
                style={{ background: '#2191fd', color: '#fff' }} onClick={() => { setOpen(true) }}>Field</Button>
            <Dialog
                onChange={() => { setOpen(true) }}
                PaperProps={{
                    elevation: 0, style: { borderRadius: '10px', width: '100%' }
                }}
                open={open}>
                <DialogContent className='w-100'>
                    <form onSubmit={handleSubmit}>
                        <Label htmlFor='field'>Field</Label>
                        <Input
                            type="textarea"
                            rows="2" className='mb-1 w-100' name='field' id='field' onChange={(e) => { setAddNewValue(e.target.value) }} />
                    </form>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};
