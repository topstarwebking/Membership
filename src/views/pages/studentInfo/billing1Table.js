import React, { useState } from "react"
import DescriptionIcon from '@material-ui/icons/Description';
// import DataTable from "react-data-table-component"
import BillingModal from "./billingModal"
import {
  TableBody,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  Avatar,
  Typography,
  TableHead,
  Chip,
} from "@material-ui/core"
import moment from "moment"
import InvoiceView from "./componets/invoice";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  invoicebtn: {
    '&:hover': {
      boxShadow: '0 0 0.7142857142857143rem #cccccc !important'
    }
  }
}));

const DataTableFixedHeader = () => {
  const classes = useStyles()
  const [viewInvoice, setViewInvoice] = useState(null)

  const handelClick = (invoice) => {
    setViewInvoice(invoice)
  }
  return (
    <div>
      <div className='d-flex justify-content-between'>
        <Typography>School Finance Info</Typography>
        <BillingModal />
      </div>
      {viewInvoice === null ? <TableContainer>
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
              <TableCell align="center">
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .map((row,i) => {
                return (
                  <TableRow key={i}>
                    <TableCell style={{ padding: '0.4em' }} className="p-0">
                      <div className="d-flex">
                        <div className="p-1"><Avatar src={row.image} alt="I"></Avatar></div>
                        <div className="d-flex p-1 justify-content-start" style={{ flexDirection: "column" }}>
                          <Typography className="mb-0">Frank Guerrini</Typography>
                          <Typography className="mb-0">Active Member</Typography></div>
                      </div>
                    </TableCell>
                    <TableCell style={{ padding: '0.4em' }}>
                      <Typography className="mb-0">${row.amount}</Typography>
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
                    <TableCell>
                      <Chip
                        size='small'
                        icon={<DescriptionIcon />}
                        className={`bg-white ${classes.invoicebtn}`}
                        label={'INOVICE'}
                        onClick={() => { handelClick(row) }} />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer> : <InvoiceView row={viewInvoice} setViewInvoice={setViewInvoice} />}
    </div>
  )
}
export default DataTableFixedHeader;


const rows = [
  { image: "I", amount: "10,0000", status: "paid" },
  { image: "I", amount: "10,0000", status: "paid" },
  {
    image: "I", amount: "10,0000",
    status: "unpaid"
  }]
