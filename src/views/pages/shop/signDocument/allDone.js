import React from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';

const AllDone = () => {
    return (
        <div style={{ background: '#00a6e1', height: '60vh' }} className='container d-flex justify-content-center'>
            <Card style={{ width: '90%', marginTop: '10vh', marginBottom: '-10vh' }} className='shadow'>
                <CardContent style={{ height: '100%' }} className='d-flex justify-content-center align-items-center'>
                    <div>
                        <div className='text-center'>
                            <Typography variant="h4">You're All Done</Typography>
                            <Typography color='textSecondary'>You will receive an email link for sign pdf once everyone has signed</Typography>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <img
                                src='/images/signature-Image-removebg-preview.png'
                                style={{ width: '300px', objectFit: 'contain' }}
                                alt='all done image' />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default AllDone;