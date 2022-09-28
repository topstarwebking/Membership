import { Button, Dialog, DialogContent, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GET_DOCUSIGN_PDF_BY_ID } from '../../../../../redux/actions/docuSign';

const PopupToDownloadPdfCopy = (props) => {
    const { openDownload, setOpenDownload, GET_DOCUSIGN_PDF_BY_ID } = props
    const [loading, setLoading] = useState(false)
    const { docuSignId, emailToken } = useParams()

    const downloadPdf = async () => {
        setLoading(true)
        let res = await GET_DOCUSIGN_PDF_BY_ID(docuSignId, emailToken)
        if (res?.success) {
            setLoading(false)
            let linkSource = `data:application/pdf;base64,${res.data}`;
            let downloadLink = document.createElement('a');
            document.body.appendChild(downloadLink);
            downloadLink.href = linkSource;
            downloadLink.target = '_self';
            downloadLink.download = 'yourSignature.pdf';
            downloadLink.click();
        } else {
            setLoading(false)
        }
    }

    return (
        <Dialog
            maxWidth='sm'
            open={openDownload}>
            <DialogContent>
                <center>
                    {
                        !loading ?
                            <img style={{ width: '60%' }} src='/images/digital-signature-white-process.webp' /> :
                            <img src="/images/success-done.gif" />
                    }
                    <Typography variant='h5'>{'Your Document has been signed'}</Typography>
                    <Typography color='textSecondary'> If you would like a copy for your records,Click on Download </Typography>
                </center>
                <br />
                <div className='d-flex justify-content-end'>
                    <Button
                        onClick={() => setOpenDownload(false)}
                        className='rounded bg-light'>
                        Close
                    </Button>
                    <Button onClick={downloadPdf} className='rounded bg-success text-white ml-1'>
                        {!loading ? 'Download Copy' : 'Processing..'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default connect(null, { GET_DOCUSIGN_PDF_BY_ID })(PopupToDownloadPdfCopy);