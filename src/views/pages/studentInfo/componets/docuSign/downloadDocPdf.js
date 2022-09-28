import { Chip } from '@material-ui/core';
import React, { useState } from 'react';
import { GET_DOCUSIGN_PDF_BY_ID } from '../../../../../redux/actions/docuSign';
import { connect } from 'react-redux';

const DownloadDocuSignPdf = (props) => {
    const { item, GET_DOCUSIGN_PDF_BY_ID } = props
    const [loading, setLoading] = useState(false)
    const downloadPdf = async () => {
        setLoading(true)
        let res = await GET_DOCUSIGN_PDF_BY_ID(item?._id, item?.emailToken)
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
        <Chip
            disabled={loading}
            className='rounded'
            color="primary" variant="outlined"
            size='small'
            onClick={downloadPdf}
            label={loading ? 'Loading..' : 'Download'}
        />
    )
}
export default connect(null, { GET_DOCUSIGN_PDF_BY_ID })(DownloadDocuSignPdf);