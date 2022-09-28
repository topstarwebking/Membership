import React from 'react'
import {
  Button, TableBody,
  TableRow, TableContainer, TableCell, Table, Avatar, Typography, TableHead
} from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import moment from 'moment';

const InvoiceView = (props) => {
  const { row, setViewInvoice } = props
  return (
    <div>
      <Button className="bg-white rounded mb-1" onClick={() => { setViewInvoice(null) }}>
        <KeyboardBackspaceIcon className='mr-1' /> {''} Back
      </Button>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                Numebr
              </TableCell>
              <TableCell align="center">
                amount
              </TableCell>
              <TableCell align="center">
                discription
              </TableCell>
              <TableCell align="center">
                status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell style={{ padding: '0.4em' }} className="p-0">
                <div className="d-flex">
                  <div className="p-1"><Avatar src={row?.image} alt="I"></Avatar></div>
                  <div className="d-flex p-1 justify-content-start" style={{ flexDirection: "column" }}>
                    <Typography className="mb-0">Frank Guerrini</Typography>
                    <Typography className="mb-0">Active Member</Typography></div>
                </div>
              </TableCell>
              <TableCell style={{ padding: '0.4em' }}>
                <Typography className="mb-0">${row?.amount}</Typography>
                <Typography className="mb-0">Manual Payment</Typography>
              </TableCell>
              <TableCell style={{ padding: '0.4em' }}>
                <Typography className="mb-0">test monu Fees</Typography>
              </TableCell>
              <TableCell style={{ padding: '0.4em' }}>
                <span className={row?.status === 'paid' ? 'text-success' : 'text-danger'}>
                  {moment(row?.createdAt).format('MM-DD-YYYY')}{' '}
                  {row?.status}
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

    </div>

  )
}
export default InvoiceView;