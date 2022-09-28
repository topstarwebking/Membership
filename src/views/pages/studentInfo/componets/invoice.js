import React, { useState, useEffect } from 'react'
import {
  Chip, Card, CardContent, LinearProgress,
  Typography, Grid
} from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import DownloadIcon from '@material-ui/icons/GetApp';
import PrintIcon from '@material-ui/icons/Print';
import moment from 'moment';
import html2pdf from "html2pdf.js"
import { connect } from "react-redux"
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(() => ({
  invoicebtn: {
    color: '#6610f2',
    background: '#fff',
    borderRadius: '10px',
    border: '2px solid #6610f2',
    '&:hover': {
      background: '#6610f2',
      color: '#fff',
      fontWeight: 'bold',
    }
  },
  cardStyleHeader: {
    marginTop: '10px',
    boxShadow: 'none',
  },
  headers: {
    display: 'grid',
    gridTemplateColumns: '15% 30% 15% 10% 15% 15%',
    padding: '0.4em',
  },
  headersData: {
    display: 'grid',
    gridTemplateColumns: '15% 30% 15% 10% 15% 15%',
    padding: '0.8em',
    fontWeight: 'bold',
    color: '#7d7e7f',

  },
  overdueChip: {
    borderRadius: '8px',
    background: '#f7d0de',
    fontWeight: 'bold',
    color: '#ec6389',
  },
  dueChip: {
    borderRadius: '8px',
    background: '#ffc1070d',
    fontWeight: 'bold',
    color: '#ffc107',
    border: '2px solid #ffc1070d'
  },
  styleProgress: {
    width: '100%',
    height: '4p',
    color: '#6610f2',
  },
  mainTitle: {
    color: '#0d0c22',
    fontSize: '2em',
    fontWeight: 'bold'
  },
  invoicePage: {
    height: '100vh',
    '&:hover': {
      boxShadow: '0 0 0.7142857142857143rem #b8c2cc'
    }
  }
}));

const InvoiceView = (props) => {
  const classes = useStyles()
  const { row, setViewInvoice, viewActiveStudentInfo } = props
  const [user, setUser] = useState(null)
  const [startDownload, setStartDownload] = useState(false)

  const getUserInfoFromLS = () => {
    let userinfo = localStorage.getItem('userdata')
    setUser(JSON.parse(userinfo)?.data)
  }

  useEffect(() => {
    getUserInfoFromLS()
  }, [])
  const downloadPdfInvoice = async () => {
    setStartDownload(true)
    var options = {
      margin: [10, 0, 30, 0],
      filename: 'my-invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      jsPDF: { unit: 'pt', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    var element = document.getElementById('studentInfoInvoice');
    setTimeout(() => {
      html2pdf()
        .from(element).set(options)
        .save()
      setStartDownload(false)
    }, 1000)
  }



  return (
    <div>
      <Card style={{ boxShadow: 'none' }}>
        <CardContent style={{ paddingBottom: '0.4em' }} className='d-flex justify-content-between'>
          <Chip
            size='small'
            icon={<KeyboardBackspaceIcon />}
            className={`bg-white mt-1`}
            label={'Back'}
            onClick={() => { setViewInvoice(null) }} />

          <div>
            <Chip
              icon={<PrintIcon />}
              size='small'
              disabled={true}
              className='bg-white mr-1'
              variant='outlined'
              label={'Print Invoice'}
              onClick={() => { window.print() }}
            />
            <Chip
              icon={<DownloadIcon />}
              size='small'
              className='bg-white'
              variant='outlined'
              label={'Download Invoice'}
              onClick={downloadPdfInvoice}
            />
          </div>
        </CardContent>
      </Card>
      <div id='studentInfoInvoice' className={classes.invoicePage}>
        {startDownload ? <LinearProgress className={classes.styleProgress} /> : null}
        <div style={{ background: '#f8f8f8', padding: '2em' }}>
          <Grid container spacing={2}>
            <Grid item sm="6" md="6" lg='6'>
              <div style={{ width: "80%" }}>
                <Typography className={classes.mainTitle}>Invoice To</Typography>
                <Typography className='mb-0 text-capitalize' color='primary'><b>{viewActiveStudentInfo?.firstName} {viewActiveStudentInfo?.lastName} </b></Typography>
                <Typography className='text-dark text-capitalize'>
                  {viewActiveStudentInfo?.address} {viewActiveStudentInfo?.country}
                </Typography>
              </div>
            </Grid>
            <Grid item sm="6" md="6" lg='6'>
              <div style={{ width: "80%" }}>
                <Typography className={classes.mainTitle}>Paid To</Typography>
                <Typography className='mb-0 text-dark text-capitalize'><b>{user?.username}</b></Typography>
                <Typography color='textSecondary' className='text-capitalize'>
                  {user?.bussinessAddress}, {user?.city} , {user?.state} , {user?.country}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        <div style={{ padding: '2em' }}>
          <Card style={{ boxShadow: 'none' }}>
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
            </CardContent>
          </Card>
          <Card className={classes.cardStyleHeader}>
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
            </CardContent>
          </Card>
        </div>
      </div>

    </div>

  )
}


const mapStateToProps = (state) => {
  return {
    viewActiveStudentInfo: state.member.viewActiveStudentInfo
  }
}

export default connect(mapStateToProps, null)(InvoiceView)
