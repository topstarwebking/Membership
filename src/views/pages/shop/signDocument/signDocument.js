import { Typography, Dialog, DialogContent, Button } from '@material-ui/core';
import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Home from './Home'
import MailSentSuccess from './mailSentSuccess';

const DocumentSign = (props) => {
  const [open, setOpen] = useState(false)
  const [islinksent2Email, setIslinksent2Email] = useState(false)

  return (
    <div>
      <div className='d-flex justify-content-center align-items-center'>
        {
          islinksent2Email ?
            <MailSentSuccess /> :
            <div className='d-flex justify-content-center align-items-center flex-column'>
              <img src='/images/signature-Image-removebg-preview.png'
                alt='signature '
                style={{width: '70%',objectFit: 'contain'}}
              />
              <Button fullWidth variant='contained' className='rounded text-white' style={{background:'#2191fd'}} onClick={() => { setOpen(true) }}>
                Create Document
              </Button>
              <Typography color='textSecondary'>Continue to document signature.. </Typography>
            </div>
        }

      </div>
      <Dialog
        fullScreen
        open={open}>
        <DialogContent>
          <div>
            <div className='d-flex justify-content-between'>
              <Typography variant='h6' className='text-primary'><b>Step 3</b></Typography>
              <Button
                startIcon={<CloseIcon />}
                variant='outlined'
                onClick={() => { setOpen(false) }}
                color='secondary'>
                  Close
              </Button>
            </div>
            <Home setOpen={setOpen} 
            setIslinksent2Email={setIslinksent2Email} 
            agreementType="membership" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DocumentSign;    