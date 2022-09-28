import { Grid, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import Action from './action';

const CatOrStatusListing = (props) => {
    const { activeSetting } = props
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item sm={12} md={6} lg={6}>
                    <div className='bg-white rounded shadow-sm p-1'>
                        <div className='border-bottom'>
                            <Typography><b> Goal Category</b></Typography>
                        </div>
                        <Grid container spacing={1}>
                            {
                                catdata?.map((item, i) => {
                                    return item?.goalType === activeSetting && (
                                        <Fragment key={i}>
                                            <Grid item sm={6} md={6} lg={6}><div style={{ paddingTop: 10 }}>{item?.category}</div></Grid>
                                            <Grid item sm={4} md={4} lg={4}>
                                                <div style={{ paddingTop: 10 }} className='d-flex justify-content-start align-items-center'>
                                                    <div style={{ background: item?.color, height: 16, width: 16 }}></div>
                                                    <div className='ml-1'>
                                                        {item?.color}
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item sm={2} md={2} lg={2}>
                                                <div style={{ paddingTop: 10 }} className='d-flex justify-content-end'>
                                                    <Action />
                                                </div>
                                            </Grid>
                                        </Fragment>
                                    )
                                })
                            }
                        </Grid>
                    </div>
                </Grid>

                <Grid item sm={12} md={6} lg={6}>
                    <div className='bg-white rounded shadow-sm p-1'>
                        <div className='border-bottom'>
                            <Typography><b> Goal Status</b></Typography>
                        </div>
                        <Grid container spacing={1}>
                            {
                                statusdata?.map((item, i) => {
                                    return item?.goalType === activeSetting && (
                                        <Fragment key={i}>
                                            <Grid item sm={6} md={6} lg={6}><div style={{ paddingTop: 10 }}>{item?.status}</div></Grid>
                                            <Grid item sm={4} md={4} lg={4}>
                                                <div style={{ paddingTop: 10 }} className='d-flex justify-content-start align-items-center'>
                                                    <div style={{ background: item?.color, height: 16, width: 16 }}></div>
                                                    <div className='ml-1'>
                                                        {item?.color}
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item sm={2} md={2} lg={2}>
                                                <div style={{ paddingTop: 10 }} className='d-flex justify-content-end'>
                                                    <Action />
                                                </div>
                                            </Grid>
                                        </Fragment>
                                    )
                                })
                            }
                        </Grid>
                    </div>
                </Grid>

            </Grid>
        </div >
    )
}
export default CatOrStatusListing;

const catdata = [
    { category: 'Daily', color: '#FF753A', goalType: 'Personal' },
    { category: 'Fixed', color: '#0184FF', goalType: 'Mymember' },
    { category: 'Monthly', color: '#FF9A02', goalType: 'Personal' },
    { category: 'Daily', color: '#FF753A', goalType: 'Mymember' },
]

const statusdata = [
    { status: 'Pending', color: '#FFB800', goalType: 'Mymember' },
    { status: 'Completed', color: '#37D400', goalType: 'Personal' },
    { status: 'Due', color: '#FF0F0F', goalType: 'Personal' },
    { status: 'Completed', color: '#37D400', goalType: 'Mymember' },
    { status: 'Pending', color: '#FFB800', goalType: 'Personal' },
    { status: 'Due', color: '#FF0F0F', goalType: 'Mymember' },
]