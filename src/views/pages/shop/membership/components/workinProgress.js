import { Typography } from '@material-ui/core';
import React from 'react';
import WorkInProgressImage from './workinProgress.webp'

const WorkInProgress = () => {
    return (
        <div style={{width:'100%'}} className='d-flex flex-column justify-content-center align-items-center'>
            <img style={{ objectFit: 'contain', height: '200px' }} src={WorkInProgressImage} alt={WorkInProgressImage} />
            <h2><Typography>Work in Progresss for this </Typography></h2>
            {/* <Typography><i>Create is A</i></Typography> */}
        </div>
    )
}

export default WorkInProgress;