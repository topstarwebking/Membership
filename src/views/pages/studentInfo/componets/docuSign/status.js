import { Chip, Dialog, DialogContent } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { GET_DOCUMENT_BY_MEMBERSHIP_ID } from '../../../../../redux/actions/docuSign';
import ListAgreementItem from './listSignAgreement'
import { connect } from 'react-redux'

const DocuSognStatus = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(!show);
    const { GET_DOCUMENT_BY_MEMBERSHIP_ID, signDocForId } = props

    useEffect(() => {
        if (show) {
            GET_DOCUMENT_BY_MEMBERSHIP_ID(signDocForId)
        }
    }, [show])

    return (
        <div className=''>
            <Chip onClick={handleClose} size='small' label='View' className='rounded' />
            <Dialog
                fullWidth
                maxWidth="md"
                open={show} onClose={handleClose}>
                <DialogContent style={{ padding: 0 }}>
                    <ListAgreementItem signDocForId={signDocForId} />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default connect(null, { GET_DOCUMENT_BY_MEMBERSHIP_ID })(DocuSognStatus);