
import React from 'react'
import { Dialog, DialogContent, Button, Typography } from '@material-ui/core';
import { useState } from 'react';
import SignPdfViewer from './components/sign-pdfViewer.js';
import { Link, useParams } from 'react-router-dom'
import { GET_ALL_INVITEE_OF_DOCUMENT, SAVE_LAST_VIEWED_HISTORY, GET_DOCUSIGN_PDF_BY_ID, SAVE_DOCUMENT_AFTER_SIGNATURE } from '../../../../redux/actions/docuSign/index.js';
import { connect } from 'react-redux';
import { Input } from 'reactstrap';
import moment from 'moment';
import AllDone from './allDone.js';

const urlGStorage = process.env.REACT_APP_GOOGLE_STORAGE_PATH
const demoPdf = 'https://storage.googleapis.com/mymember-storage/All-Images/267e985f-53c8-4a72-864b-a0cbe7457172-Test.pdf'

function Sign(props) {
  const { GET_ALL_INVITEE_OF_DOCUMENT, SAVE_DOCUMENT_AFTER_SIGNATURE, SAVE_LAST_VIEWED_HISTORY } = props
  const [items, setItems] = useState(null);
  const [invite, setInvite] = useState(null);
  const [openModal, setOpenModal] = useState(true)
  const [ipAddress, setipAddress] = useState(null)
  const [startloading, setStartLoading] = useState(false)
  let { docuSignId, pdflink, emailToken } = useParams();
  const [helloTo, setHelloTo] = useState('')
  const [completed, setCompleted] = useState(false)
  const [completeStatesOfSignature, setCompleteStatesOfSignature] = useState(null)

  const createViewHistory = (data, ipAddress) => {
    const inviteState = []
    let copyViewData = data?.viewed.filter((item => item?.email !== invite))
    for (let [key, value] of Object.entries(data?.items)) {
      for (let [k, v] of Object.entries(value)) {
        for (let itmObj of v) {
          if (itmObj?.email === invite) {
            if (itmObj?.value === '' && itmObj?.email === invite) {
              inviteState.push(itmObj)
            }
            setHelloTo(itmObj.fullname)
            copyViewData.push({
              fullname: itmObj.fullname,
              email: invite,
              time: moment(new Date()).format('MM/DD/YYYY hh:mm A'),
              Status: 'Viewed',
              ipAddress: ipAddress,
              signer: itmObj?.signer === 'owner' ? 'Mymember' : 'Invite'
            })
          }
        }
      }
    }
    if (inviteState?.length === 0) {
      setCompleted(true)
    }
    return copyViewData?.filter((v, i, a) => a.findIndex(t => (t.email === v.email)) === i)
  }

  const getPdfFile = async () => {
    let data = await GET_ALL_INVITEE_OF_DOCUMENT(docuSignId, emailToken)
    if (data?.success) {
      setCompleteStatesOfSignature(data?.data)
      setItems(data?.data?.items)
      setipAddress(data?.data?.ipAddress)
      let copyItems = data?.data?.items
      let payload = {
        items: copyItems,
        signDocFor: data?.data?.signDocFor,
        signDocForId: data?.data?.signDocForId,
        viewed: createViewHistory(data?.data, data?.data?.ipAddress)
      }
      setOpenModal(false)
      setStartLoading(false)
      // SAVE_DOCUMENT_AFTER_SIGNATURE(payload, docuSignId, emailToken)
      SAVE_LAST_VIEWED_HISTORY(payload, docuSignId, emailToken)
    } else {
      setStartLoading(false)
    }
  }

  const checkAuth = (e) => {
    setStartLoading(true)
    e.preventDefault()
    getPdfFile()
  }
  return (
    <div>
      <Dialog
        PaperProps={{ elevation: 0, style: { borderRadius: '10px', width: '100%' } }}
        open={openModal}>
        <DialogContent style={{ width: '100%' }}>
          <div style={{ width: '100%' }}>
            <Typography>
              <b>Please Sign</b>
            </Typography>
            <form onSubmit={checkAuth}>
              <Input name='email' onChange={(e) => { setInvite(e.target?.value?.trim()) }}
                placeholder='Enter your email address ' />
              <br />
              <div className='d-flex justify-content-end'>
                <Button disabled={startloading} className='rounded'
                  variant="contained"
                  style={{ background: '#2191fd' }}
                  type='submit'> {startloading ? "Loading" : 'Verify'}</Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <div>
        <div>
          <div className='bg-white p-1 shadow-sm d-flex justify-content-between align-items-center'>
            <Link to="#"><img style={{ width: '100px' }} src="https://mymember.com/static/media/logo.940eab8a.png" alt="alternative" /></Link>
            <Typography className='mb-0' variant='h5'><b>Hello, {helloTo} </b></Typography>
            <div></div>
          </div>
        </div>
        <br />
        {
          completeStatesOfSignature?.isDone ?
            <AllDone />
            :
            <div className='d-flex justify-content-center align-items-center'>
              {(invite && !openModal) &&
                <SignPdfViewer
                  ipAddress={ipAddress}
                  hideprogress={true}
                  invite={invite}
                  is_invite={true}
                  setSignBtns={setItems}
                  signBtns={items}
                  completeStatesOfSignature={completeStatesOfSignature}
                  items={items}
                  // url={demoPdf}
                  setCompleted={setCompleted}
                  completed={completed}
                  url={urlGStorage + pdflink}
                />
              }
            </div>
        }
      </div>
    </div>
  );
}


export default connect(null, { GET_DOCUSIGN_PDF_BY_ID, SAVE_LAST_VIEWED_HISTORY, GET_ALL_INVITEE_OF_DOCUMENT, SAVE_DOCUMENT_AFTER_SIGNATURE })(Sign);