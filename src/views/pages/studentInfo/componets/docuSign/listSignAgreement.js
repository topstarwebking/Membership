
import React, { Fragment } from 'react'
import AgreementItem from './agreementItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DocumentSignStatus from './DocumentSignStatus';
import { Typography } from '@material-ui/core';
import LoadingData from './loadingDoc'
import { connect } from 'react-redux';

const ViewDocumentAgreement = (props) => {
    const { DocumentInfoOfMembership, signDocForId } = props
    
    return (
        <div>
            <div className='shadow-sm p-1'>
                <Typography variant='h6' className='mb-0'><b>Document information</b></Typography>
            </div>
            {DocumentInfoOfMembership?.length === 0 ? <LoadingData /> :
                <Fragment>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Document Name</b></TableCell>
                                <TableCell><b>Owner</b></TableCell>
                                <TableCell><b>Signers</b></TableCell>
                                <TableCell><b>Created At</b></TableCell>
                                <TableCell><b>Last Activity</b></TableCell>
                                <TableCell><b>Document</b></TableCell>
                                <TableCell><b>PDF</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <AgreementItem signDocForId={signDocForId} item={DocumentInfoOfMembership?.data} />
                        </TableBody>
                    </Table>
                    <DocumentSignStatus item={DocumentInfoOfMembership?.data} />
                </Fragment>
            }

        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        DocumentInfoOfMembership: state.docuSignReducer.DocumentInfoOfMembership
    }
}
export default connect(mapStateToProps, null)(ViewDocumentAgreement);

