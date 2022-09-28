
import React, { useEffect } from 'react'
import { useState } from 'react';
import { GET_ALL_INVITEE_OF_DOCUMENT } from '../../../../../redux/actions/docuSign/index.js';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import ReinviteUser from './reinviteUser.js';

function DocumentSignStatus(props) {
  const { item } = props
  const [dataValue, setDataValue] = useState(null)

  useEffect(() => {
    let copyItems = { ...item?.items }
    let statusValue = []
    Object.entries(copyItems).map(([signer, value], index) => {
      let statusItem = {}
      Object.entries(value).map(([pageNumber, value2], i) => {
        for (let elObj of value2) {
          if (elObj?.value === '' || elObj?.value === undefined) {
            statusItem = elObj
            return
          } else {
            statusItem = elObj
          }
        }
      })
      statusValue.push(statusItem)
    })
    setDataValue(statusValue)
  }, [item])

  return (
    <div>
      <div className='shadow-sm p-1'>
        <Typography variant='h6' className='mb-0'><b>Document Status</b></Typography>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Signer Full Name</b></TableCell>
            <TableCell><b>Signer Email</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell><b>Last Activity</b></TableCell>
            <TableCell><b>Signer</b></TableCell>
            <TableCell><b>IP Address</b></TableCell>
            <TableCell><b>Re-Invite</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataValue?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                {item?.fullname}
              </TableCell>
              <TableCell>{item?.email}</TableCell>
              <TableCell>{item?.value === '' || item?.value === undefined ? <span className='text-danger'><b>Pending</b></span> : <span className='text-success'><b>Completed</b></span>}</TableCell>
              <TableCell>{moment(item?.updatedAt)?.format('MM/DD/YYYY, h:mm:ss A')}</TableCell>
              <TableCell>{item?.signer === 'owner' ? "Mymember" : 'Invite'}</TableCell>
              <TableCell>{item?.ipAddress}</TableCell>
              <TableCell>
                <ReinviteUser item={props?.item} email={item?.email} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='shadow-sm p-1'>
        <Typography variant='h6' className='mb-0'><b>View History</b></Typography>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Full Name</b></TableCell>
            <TableCell><b>Email</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell><b>Last Activity</b></TableCell>
            <TableCell><b>Signer</b></TableCell>
            <TableCell><b>IP Address</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {item?.viewed?.map((item, i) => {
            return (
              <TableRow key={i}>
                <TableCell>{item?.fullname}</TableCell>
                <TableCell>{item?.email}</TableCell>
                <TableCell>{item?.Status}</TableCell>
                <TableCell>{item?.time}</TableCell>
                <TableCell>{item?.signer}</TableCell>
                <TableCell>{item?.ipAddress}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default connect(null, { GET_ALL_INVITEE_OF_DOCUMENT })(DocumentSignStatus);
