import React, { useState } from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import { Typography, Grid, Chip } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { GET_DOCUSIGN_PDF_BY_ID } from '../../../../../redux/actions/docuSign';
import { connect } from 'react-redux';

const styleList = {
    width: '100%',
    marginTop: 4,
    borderLeft: '4px solid #6357c1',
    border: '1px solid #ececec',
    cursor: 'pointer',
    background: '#f8f8f8',
    padding: 4

}
const successBtn = {
    borderLeft: '4px solid #6357c1',
    border: '2px solid #fff',
    cursor: 'pointer',
    background: '#77d568',
    color: "#fff",
}
const HowToUseDocuSign = (props) => {
    const { startProcess, handleSubmitDate, setItems, items, dataAfterInviteUser, GET_DOCUSIGN_PDF_BY_ID, currentEmailToken } = props
    const [loading, setLoading] = useState(false)
    const [isdisabled, setIsdisabled] = useState(true)

    React.useEffect(() => {
        let inviteAndOwner = []
        let copyItems = { ...items };
        for (let [key, value] of Object.entries(copyItems)) {
            for (let [k, v] of Object.entries(value)) {
                for (let itmObj of v) {
                    if (itmObj?.signer === 'owner' && !inviteAndOwner.includes('owner')) {
                        inviteAndOwner.push('owner')
                    } else if (itmObj?.signer === 'invite' && !inviteAndOwner.includes('invite')) {
                        inviteAndOwner.push('invite')
                    }
                }
            }
        }
        if (inviteAndOwner.includes('owner') && inviteAndOwner.includes('invite')) {
            setIsdisabled(false)
        }
    }, [items])

    const downloadPdf = async () => {
        setLoading(true)
        let res = await GET_DOCUSIGN_PDF_BY_ID(dataAfterInviteUser?._id, currentEmailToken)
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
        <div className='p-1'>
            <Typography
                style={{ color: "#0e0e0e" }}
                className="mb-0"
            >
                <b>HOW TO USE</b>
            </Typography>
            <Grid container spacing={1}>
                <Grid item sm={6} md={2} lg={2}>
                    <div className='d-flex justify-content-start align-items-center' style={styleList}>
                        <PersonAddIcon color='action' className='mx-1' />
                        <Typography className='mb-0'> Add Signer</Typography>
                    </div>
                </Grid>
                <Grid item sm={6} md={2} lg={2}>
                    <div className='d-flex justify-content-start align-items-center' style={styleList}>
                        <DragIndicatorIcon color='action' className='mx-1' />
                        <Typography className='mb-0'>
                            Place Fields
                        </Typography>
                    </div>
                </Grid>
                <Grid item sm={6} md={2} lg={2}>
                    <div className='d-flex justify-content-start align-items-center' style={styleList}>
                        <CheckCircleOutlineIcon color='action' className='mx-1' />
                        <Typography className='mb-0'>
                            Review and Send
                        </Typography>
                    </div>
                </Grid>
                <Grid item sm={6} md={4} lg={4}>
                    <div className='d-flex justify-content-end align-items-center'>
                        <Chip
                            className='rounded'
                            color='secondary'
                            variant='outlined'
                            onClick={() => {
                                setItems(null);
                            }}
                            label={'X Clear fields'} />
                        <Chip
                            className='rounded'
                            style={successBtn}
                            onClick={handleSubmitDate}
                            disabled={isdisabled || startProcess}
                            label={startProcess ? 'Processing..' : 'Send Invite'}
                        />
                    </div>
                </Grid>
                <Grid item sm={6} md={1} lg={1}>

                </Grid>
            </Grid>
        </div>
    );
}


export default connect(null, { GET_DOCUSIGN_PDF_BY_ID })(HowToUseDocuSign);