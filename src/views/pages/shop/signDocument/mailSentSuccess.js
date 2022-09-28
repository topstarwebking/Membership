import { Typography } from '@material-ui/core';
import React from 'react';

const MailSentSuccess = () => {
    return (
        <div>
            <div className='d-flex justify-content-center align-items-center flex-column'>
                <img alt='mail sent gif' style={{ objectFit: 'contain', width: '60%' }} src='/images/congrats-bg.png' />
                <img alt='mail sent gif' style={{ width: '10rem' }} src='/images/mailSentSucees.gif' />
                <h2>Congratulations</h2>
                <Typography>Document Signature successfully done, and Link has been sent to you email</Typography>
                <Typography color='textSecondary'>Membership buy has been done successfully!</Typography>
            </div>
        </div>
    )
}

export default MailSentSuccess;