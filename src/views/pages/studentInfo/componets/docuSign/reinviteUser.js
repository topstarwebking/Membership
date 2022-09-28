import React from 'react'
import { connect } from 'react-redux';
import { SEND_INVITATION_TO_EMAIL_SIGNATURE } from '../../../../../redux/actions/docuSign';
import { Chip } from '@material-ui/core';

const urlGStorage = process.env.REACT_APP_GOOGLE_STORAGE_PATH
const ReInviteUser = (props) => {
    const { SEND_INVITATION_TO_EMAIL_SIGNATURE, item, email } = props
    let getDocumentSignLink = () => {
        let pdfLink = item?.mergedDoc?.split(urlGStorage)[1]
        return `${process.env.REACT_APP_BASE_URL}/docusign/sign/${item?._id}/${pdfLink}/${item?.emailToken}`
    }
    const ReInvite = async () => {
        let emailSendLinkPayload = { emails: [email], docLink: getDocumentSignLink() }
        let res = await SEND_INVITATION_TO_EMAIL_SIGNATURE(emailSendLinkPayload)
    }

    return (
        <div>
            <Chip label={<b>Re-Invite Signer</b>} size='small' className='rounded' color="secondary" onClick={ReInvite} />
        </div>

    )
}


export default connect(null, { SEND_INVITATION_TO_EMAIL_SIGNATURE })(ReInviteUser);
