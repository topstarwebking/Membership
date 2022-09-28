import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import OtpInput from 'react-otp-input';
import { SEND_OTP, SEND_OTP_FOR_EMAILVERIFICATION } from '../../../../redux/actions/auth/registerActions';
import { connect } from 'react-redux';
import { useRef } from 'react';

const useStyles = makeStyles(() => ({
  title: {
    color: '#414141',
    fontWeight: 'bold',
    fontSize: '1.4rem'
  },
  otpVerify: {
    width: '180px',
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#00a6e1',
    border: '2px solid #fff',
    borderRadius: '20px',
    '&:hover': {
      background: '#F16937'
    }
  },
  otpWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    '& div': {
      display: 'flex',
      justifyContent: 'space-between'
    },
    '& input': {
      margin: 4,
      fontSize: '2rem',
      color: '#5C5C5C',
      border: '2px solid #D4D4D4',
      borderRadius: '6px',
      width: '2.6rem !important',
      height: '2.6rem'
    }
  },
  buletext: {
    fontSize: '12px',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    color: "#00a6e1",
    display: 'flex',
    justifyContent: 'flex-start'
  }
}));
const useTimer = (duration) => {
  const [timer, setTimer] = useState(duration)
  const timerRef = useRef(null)

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimer(prevTimer => {
        const newTimer = prevTimer - 1
        if (newTimer === 0) {
          clearInterval(timerRef.current)
          timerRef.current = null
        }
        return newTimer
      })
    }, 1000)
  }
  const resetTimer = () => {
    setTimer(duration)
    startTimer()
  }
  useEffect(() => {
    startTimer()
  }, [])
  return [timer, resetTimer]
}
const Otpverification = (props) => {
  const classes = useStyles()
  const handleOtpInput = (otp) => {
    setOtp(otp)
  }
  const [otp, setOtp] = useState("")
  const [otpTimer, resetOtpTimer] = useTimer(60);

  const {  backPhoneInput, loading } = props
  const verifyOTP = (e) => {
    e.preventDefault()
    props.SEND_OTP({
      "email": props.data?.email,
      "otp": otp
    })
  }
  const resendOtp = () => {
    props.SEND_OTP_FOR_EMAILVERIFICATION({
      "email": [props.data?.email]
    })
    resetOtpTimer()
  }

  return (
    <form onSubmit={(e) => { verifyOTP(e) }}>
      <div className='login-section pt-0'>
        <Typography className='loginTitle'><b>Verify OTP</b></Typography>
        <br />
        <div className='content-center'>
          <Typography className='note' color='textSecondary' component='span'>Please enter OTP sent to email</Typography>
          <Button onClick={backPhoneInput} className='text-primary' size="small" >Edit</Button>
        </div>
        <br />
        <div className={classes.otpWrapper}>
          <OtpInput
            value={otp}
            onChange={handleOtpInput}
            numInputs={6}
            separator={<span>{''}</span>}
          />
        </div>
        <br />
        <div className='content-center w-100'>
          <Button type='submit' disabled={String(otp).length === 6 ? false : true} className={`${classes.otpVerify} content-center w-100`}>{loading ? <CircularProgress style={{ width: '18px', height: '18px', color: '#fff' }} />
            : `VERIFY`}</Button>
        </div>
        <br />
        <div style={{
          display: "flex"
        }}>
          <Typography color='textSecondary' component='span'>Don’t receive the OTP?<span className='ml-1 mr-1'>{otpTimer}</span></Typography>
          <Button size="small" className={`${classes.buletext} p-0`} onClick={resendOtp} disabled={otpTimer !== 0}>Resend OTP</Button>
        </div>
      </div>
    </form>
  );
};

export default connect(null, { SEND_OTP, SEND_OTP_FOR_EMAILVERIFICATION })(Otpverification);