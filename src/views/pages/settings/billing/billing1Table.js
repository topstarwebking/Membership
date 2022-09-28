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
    <div className="px-1 mt-3">
      <div className='d-flex justify-content-between mb-2'>
      <h5 style={{ fontSize: "20px" }}>School Finance Info</h5>
        <BillingModal />
      </div>
      {viewInvoice === null ? <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow >
              <TableCell align="center"  style={{ backgroundColor:"rgb(234 244 254)",padding: "0.6em", fontSize: "14px"}}>
              <b>Numebr</b>
              </TableCell>
              <TableCell align="center"  style={{ backgroundColor:"rgb(234 244 254)",padding: "0.6em", fontSize: "14px"}}>
              <b>Amount</b>
              </TableCell>
              <TableCell align="center"  style={{ backgroundColor:"rgb(234 244 254)",padding: "0.6em", fontSize: "14px"}}>
              <b>Description</b>
              </TableCell>
              <TableCell align="center"  style={{ backgroundColor:"rgb(234 244 254)",padding: "0.6em", fontSize: "14px"}}>
              <b> Status</b>
              </TableCell>
              <TableCell align="center"  style={{ backgroundColor:"rgb(234 244 254)",padding: "0.8em", fontSize: "14px"}}>
              <b> Action</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .map((row,i) => {
                return (
                  <TableRow key={i}>
                    <TableCell style={{ padding: "0.6em", fontSize: "14px" }} className="p-0">
                      <div className="d-flex">
                        <div className="pr-1 py-1"><Avatar src={row.image} alt="I"></Avatar></div>
                        <div className="d-flex p-1 justify-content-start" style={{ flexDirection: "column" }}>
                          <Typography className="mb-0">Frank Guerrini</Typography>
                          <Typography className="mb-0">Active Member</Typography></div>
                      </div>
                    </TableCell>
                    <TableCell style={{ padding: "0.6em", fontSize: "14px" }}>
                      <Typography className="mb-0">${row.amount}</Typography>
                      <Typography className="mb-0">Manual Payment</Typography>
                    </TableCell>
                    <TableCell style={{ padding: "0.6em", fontSize: "14px" }}>
                      <Typography className="mb-0">test monu Fees</Typography>
                    </TableCell>
                    <TableCell style={{ padding: "0.6em", fontSize: "14px" }}>
                      <span className={row?.status === 'paid' ? 'text-success' : 'text-danger'}>
                        {moment(row?.createdAt).format('MM-DD-YYYY')}{' '}
                        {row?.status}
                      </span>
                    </TableCell>
                    <TableCell style={{ padding: "0.6em", fontSize: "14px" }}>
                      <Chip
                        size='medium'
                        icon={<DescriptionIcon style={{fontSize: 16}}/>}
                        className={`bg-white ${classes.invoicebtn}`}
                        label={'INVOICE'}
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

// const columns = [
//   {
//     name: "Name",
//     selector: "first_name",
//     sortable: true
//   },
//   {
//     name: "Card Type",
//     selector: "first_name",
//     sortable: true
//   },
//   {
//     name: "Status",
//     selector: "last_name",
//     sortable: true
//   },
//   {
//     name: "Time Failed",
//     selector: "email",
//     sortable: true
//   },
//   {
//     name: "Default",
//     selector: "gender",
//     sortable: true
//   },
//   {
//     name: "Credit Card",
//     selector: "gender",
//     sortable: true
//   },
//   {
//     name: "Type",
//     selector: "gender",
//     sortable: true
//   },
//   {
//     name: "Created Date",
//     selector: "gender",
//     sortable: true
//   },
//   {
//     name: "Modified Date",
//     selector: "gender",
//     sortable: true
//   }
// ]

const rows = [
  { image: "I", amount: "10,0000", status: "paid" },
  { image: "I", amount: "10,0000", status: "paid" },
  {
    image: "I", amount: "10,0000",
    status: "unpaid"
  }]
