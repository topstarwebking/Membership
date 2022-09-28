import { Chip } from '@material-ui/core';
import React from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DownloadDocuSignPdf from './downloadDocPdf';

const urlGStorage = process.env.REACT_APP_GOOGLE_STORAGE_PATH

const AgreementItem = (props) => {
    const { item } = props
    const findTotalSigner = () => {
        let emails = []
        for (let [key, value] of Object.entries(item?.items)) {
            for (let [k, v] of Object.entries(value)) {
                for (let itmObj of v) {
                    if (!emails?.includes(itmObj?.email)) {
                        emails.push(itmObj?.email)
                    }
                }
            }
        }
        return emails?.length
    }
    const findOwner = () => {
        for (let [key, value] of Object.entries(item?.items)) {
            for (let [k, v] of Object.entries(value)) {
                for (let itmObj of v) {
                    if (itmObj?.signer === 'owner') {
                        return itmObj?.email
                    }
                }
            }
        }
    }

    const getDocumentSignLink = () => {
        let pdfLink = item?.mergedDoc?.split(urlGStorage)[1]
        return `/docusign/sign/${item?._id}/${pdfLink}/${item?.emailToken}`
    }
    return (
        <TableRow>
            <TableCell>{item?.mergedDocName}</TableCell>
            <TableCell>{findOwner()}</TableCell>
            <TableCell>{<div className='d-flex justify-content-center'>
                {findTotalSigner()}
            </div>}</TableCell>
            <TableCell>{moment(item?.createdAt)?.format('MM/DD/YYYY, h:mm:ss A')}</TableCell>
            <TableCell>{moment(item?.updatedAt)?.format('MM/DD/YYYY, h:mm:ss A')}</TableCell>
            <TableCell>
                <Link target={'_blank'} to={getDocumentSignLink()}><Chip size='small' label='View' className='rounded mr-1 cursor-pointer' /></Link>
            </TableCell>
            <TableCell>
                <DownloadDocuSignPdf item={item} />
            </TableCell>
        </TableRow>
    )
}

export default AgreementItem;