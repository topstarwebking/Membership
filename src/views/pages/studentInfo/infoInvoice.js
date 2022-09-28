import React, { Fragment, useState } from "react"
import {
  Typography,
} from "@material-ui/core"
import InvoiceView from "./componets/invoice";
import InvoiceTable from "./componets/invoiceTable";

const InfoInvoice = () => {
  const [viewInvoice, setViewInvoice] = useState(null)

  const handelClick = (invoice) => {
    setViewInvoice(invoice)
  }

  
  return (
    <div>
      {viewInvoice === null ?
        <Fragment>
          <Typography>School Finance Info</Typography>
          <InvoiceTable handelClick={handelClick}/>
        </Fragment>
        : <InvoiceView row={viewInvoice} setViewInvoice={setViewInvoice} />}
    </div>
  )
}
export default InfoInvoice;