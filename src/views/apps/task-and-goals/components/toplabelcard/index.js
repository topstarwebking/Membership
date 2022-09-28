
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import { EventNote } from '@material-ui/icons';
import TodayIcon from '@material-ui/icons/Today';
import UpdateIcon from '@material-ui/icons/Update';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';


const TopLabelMainCard = (props) => {
    const { taskToDisplayToUser } = props
    const { featureType, filtertype } = useParams()
    const [totalCompletedTask, setTotalCompletedTask]= useState(null)
    const [totalNotCompletedTask, setTotalNotCompletedTask]= useState(null)
    const [totalTask, setTotalTask] = useState(null)
    
    useEffect(() => {
        setTotalTask(taskToDisplayToUser?.length)
        let completedFilter = taskToDisplayToUser.filter((item) => item?.status === "Completed")
        let notCompletedFilter = taskToDisplayToUser.filter((item) => item?.status !== "Completed")
        setTotalCompletedTask(completedFilter.length)
        setTotalNotCompletedTask(notCompletedFilter.length)


    }, [taskToDisplayToUser])

    return (
        <div className='pb-1'>
            <Grid container spacing={1}>
                <Grid item sm={6} md={3} lg={3}>
                    <Card className='shadow-sm rounded'>
                        <CardContent className='p-1'>
                            <Typography className='text-capitalize' style={{ fontSize: 16, color: '#AAAAAA' }}><b>Today {featureType}</b></Typography>
                            <div className='d-flex justify-content-between align-items-center'>
                                <Typography style={{ fontSize: 16 }} className="mb-0"><b>{ totalTask }</b></Typography>
                                <div className='d-flex justify-content-center align-items-center' style={{ backgroundColor: "#E9F1FF", height:"30px", width:"30px", borderRadius:"50%"}}>
                                    <TodayIcon style={{ color: "#0184FF" }} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={6} md={3} lg={3}>
                    <Card className='shadow-sm rounded'>
                        <CardContent className='p-1'>
                            <Typography className='text-capitalize' style={{ fontSize: 16, color: '#AAAAAA' }}><b>Completed {featureType}</b></Typography>
                            <div className='d-flex justify-content-between align-items-center'>
                                <Typography style={{ fontSize: 16 }} className='mb-0'><b>{ totalCompletedTask }</b></Typography>
                                <div  className='d-flex justify-content-center align-items-center' style={{ backgroundColor: "#dff7d6", height:"30px", width:"30px", borderRadius:"50%" }}>
                                    <AssignmentTurnedInOutlinedIcon style={{ color: "#7fdf41" }} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={6} md={3} lg={3}>
                    <Card className='shadow-sm rounded'>
                        <CardContent className='p-1'>
                            <Typography className='text-capitalize' style={{ fontSize: 16, color: '#AAAAAA' }}><b>Not Completed {featureType}</b></Typography>
                            <div className='d-flex justify-content-between align-items-center'>
                                <Typography style={{ fontSize: 16 }} className='mb-0'><b>{totalNotCompletedTask}</b></Typography>
                                <div className='d-flex justify-content-center align-items-center' style={{ backgroundColor: "#ffc6c6", height:"30px", width:"30px", borderRadius:"50%" }}>
                                    <UpdateIcon style={{ color: "#ff3e3e" }} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={6} md={3} lg={3}>
                    <Card className='shadow-sm rounded'>
                        <CardContent className='p-1'>
                            <Typography className='text-capitalize' style={{ fontSize: 16, color: '#AAAAAA' }}><b>Score {featureType}</b></Typography>
                            <div className='d-flex justify-content-between align-items-center'>
                                <Typography style={{ fontSize: 16 }} className='mb-0'><b>{(totalCompletedTask / totalTask * 100).toFixed(2)}%</b></Typography>
                                <div className='d-flex justify-content-center align-items-center' style={{ backgroundColor: "#ffead2", height:"30px", width:"30px", borderRadius:"50%" }}>
                                    <EventNote style={{ color: "#fb8700" }} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid >
        </div >

    )
}
const mapStateToProps = (state) => {
    return {
        taskToDisplayToUser: state?.TaskAndGoalsTaskReducer?.taskToDisplayToUser,
    };
};
export default connect(mapStateToProps, null)(TopLabelMainCard);
