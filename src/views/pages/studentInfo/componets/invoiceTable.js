import React, { Fragment, useEffect } from 'react';
import { connect } from "react-redux"
import { useParams } from 'react-router-dom';
import { GET_INVOICE_LIST_BY_MEMBERID } from '../../../../redux/actions/member';

const InvoiceTable = (props) => {
  // const classes = useStyles()
  const { studentId } = useParams()
  const { GET_INVOICE_LIST_BY_MEMBERID} = props
  // const { handelClick, getInvoiceListOfMember } = props

  useEffect(() => {
    GET_INVOICE_LIST_BY_MEMBERID(studentId)
  }, [GET_INVOICE_LIST_BY_MEMBERID])
  return (
    <Fragment>
      {/* <Card style={{ boxShadow: 'none' }}>
        <CardContent className={`text-uppercase ${classes.headers}`} style={{ paddingBottom: '0.4em', fontWeight: 'bold' }}>
          <div>
            Date
          </div>
          <div>
            name
          </div>
          <div>
            amount
          </div>
          <div>
            type
          </div>
          <div>
            status
          </div>
          <div>
          </div>
        </CardContent>
      </Card> */}
      {/* {getInvoiceListOfMember?.membership_details.map((row, i) => {
        return (
          <Card className={classes.cardStyleHeader} key={i}>
            <CardContent className={classes.headersData} style={{ paddingBottom: '0.8em' }}>
              <div className='d-flex align-items-center'>
                {moment(row?.due_every_month).format('MM-DD-YYYY')}
              </div>
              <div className='d-flex align-items-center'>
                {row?.membership_name}
              </div>
              <div className='d-flex align-items-center'>
                <b>$</b>{' '} {row?.totalp}
              </div>
              <div className='d-flex align-items-center'>
                {row?.ptype}
              </div>
              <div className='d-flex align-items-center'>
                <Chip
                  size={'small'}
                  className={row?.membership_status === 'Due' ? classes.dueChip : classes.overdueChip}
                  label={row?.membership_status}
                />
              </div>
              <div className='d-flex align-items-center'>
                <Chip
                  className={classes.invoicebtn}
                  label={'INOVICE'}
                  onClick={() => { handelClick(row) }} />
              </div>
            </CardContent>
          </Card>
        )
      })} */}

    </Fragment>
  );
};


const mapStateToProps = (state) => {
  return {
    // getInvoiceListOfMember: state.member.getInvoiceListOfMember
  }
}

export default connect(mapStateToProps, { GET_INVOICE_LIST_BY_MEMBERID })(InvoiceTable)
