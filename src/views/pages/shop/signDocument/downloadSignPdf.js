import React from 'react';
import { Typography, Card, CardContent, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GET_DOCUSIGN_PDF_BY_ID } from '../../../../redux/actions/docuSign';

const DownloadSignedPDF = (props) => {
    const { GET_DOCUSIGN_PDF_BY_ID } = props
    const [loading, setLoading] = React.useState(false)
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
        <div className='container'>
            <Card style={{ width: '100%', marginTop: '10vh' }} className='shadow'>
                <CardContent style={{ height: '60vh' }} className='d-flex justify-content-center align-items-center'>
                    <div>
                        <div className='d-flex justify-content-center'>
                            <img style={{ width: '200px' }} src="https://mymember.com/static/media/logo.940eab8a.png" alt="alternative" />
                        </div>
                        <br />
                        <div className='text-center'>
                            <Typography variant="h4">Click to download your signed PDF</Typography>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <Button className='rounded'
                                disabled={loading} style={{ width: '200px', background: '#2191fd', color: '#fff' }} onClick={downloadPdf}>
                                {!loading ? 'Download Pdf' : 'Processing..'}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default connect(null, { GET_DOCUSIGN_PDF_BY_ID })(DownloadSignedPDF);