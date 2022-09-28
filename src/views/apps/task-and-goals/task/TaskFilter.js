import React, { useEffect, useState } from 'react'
import { Chip, Grid } from '@material-ui/core'
import {
    CustomInput, Input,
} from "reactstrap";
import moment from 'moment';
import { connect } from "react-redux";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { FILTER_TASK_STATUS_OR_TIME } from '../../../../redux/actions/task-and-goals/task';



function TaskFilter(props) {
    const { breadCrumbValue, taskToDisplayToUser, FILTER_TASK_STATUS_OR_TIME } = props
    const [totalTask, setTotalTask] = useState(0)
    const [totalCompletedTask, setTotalCompletedTask] = useState(0)
    const [date, setDate] = useState(new Date())
    const [statusValue, setStatusValue] = useState('no filter')
    const [byTimeValue, setByTimeValue] = useState('no filter')
    const [priority, setPriority] = useState('no filter')
    const [filterpayload, setFilterPayload] = useState()

    const handleDate = (date) => {
        setDate(date)
    }

    const handleByTime = (e) => {
        let { value } = e.target
        console.log(value)
        setByTimeValue(value)
    }

    const handleStaus = (e) => {
        let { value } = e.target
        setStatusValue(value)
    }

    useEffect(() => {
        setTotalTask(taskToDisplayToUser?.length)
        let filterData = taskToDisplayToUser.filter((item) => item?.status === "Completed")
        setTotalCompletedTask(filterData.length)

    }, [taskToDisplayToUser])


    const handleFilter = () => {
        // let filterDate = moment(date)?.format('YYYY-MM-DD')
        let payload = { }
        if (byTimeValue !== 'no filter') {
            payload.byTime = byTimeValue
        } 
        if (statusValue !== 'no filter') {
            payload.filter = {}
            payload.filter.status = statusValue
        } 
        if (priority !== 'no filter') {
            payload.filter = {}
            payload.filter.priority = priority
        } 
        // if (byTimeValue === 'no filter') {
        //     payload.filter.start = filterDate
        // }
        FILTER_TASK_STATUS_OR_TIME(payload)
    }

    return (
        <div className='d-flex justify-content-between mb-1'>
            <Grid container spacing={2}>
                <Grid item sm={6} lg={6} md={6} className='d-flex align-items-end'>
                    <div >
                        {breadCrumbValue[0]?.subFolderName === null && breadCrumbValue[0]?.folderName === null ?
                            <div className='d-flex' style={{ marginBottom: "5px" }}>
                                <div className='' style={{ width: 'content-fit' }}>
                                    <h2 className='mr-1 mb-0' style={{ fontSize: '20px' }}><b>Today</b></h2>
                                    <p className='mr-1 mb-0' style={{ fontSize: '14px' }}>{moment(new Date()).format('MM/DD/YYYY')}</p>
                                </div>
                                <Chip className='rounded mt-2' size='small' label={`${totalCompletedTask}/${totalTask}`} />
                            </div>
                            :
                            <div className='d-flex'>
                                <div >
                                    <h2 className='mr-1 mb-0 pl-1' style={{ fontSize: '20px' }}><b>TO-DO LIST</b></h2>
                                    <Breadcrumb className='mt-0'>
                                        <BreadcrumbItem className='text-capitalize' color="inherit" style={{ fontSize: "14px" }}>{breadCrumbValue[0]?.folderName}</BreadcrumbItem>
                                        <BreadcrumbItem className='text-capitalize' color="inherit" style={{ fontSize: "14px" }}>{breadCrumbValue[0]?.subFolderName}</BreadcrumbItem>
                                    </Breadcrumb>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <Chip className='rounded mt-2 ml-1 mb-0' size='small' label={`${totalCompletedTask}/${totalTask}`} />
                                </div>
                            </div>
                        }
                    </div>
                </Grid>
                <Grid item sm={6} lg={6} md={6}>
                    <div className='d-flex justify-content-end '>
                        <Grid container spacing={2}>
                            {/* <Grid item sm={6} lg={3} md={3}>
                                <label>By Date</label>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        style={{
                                            borderRadius: "0.4em",
                                            border: "1px solid #b8c2cc",
                                            background: "#fff",
                                            height: "38px",
                                            padding: "8px",
                                        }}
                                        inputprops={{
                                            disableUnderline: true,
                                        }}
                                        name="start"
                                        margin="normal"
                                        value={date}
                                        id="date-picker-dialog"
                                        format="MM/dd/yyyy"
                                        onChange={handleDate}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid> */}
                            <Grid item sm={6} lg={4} md={4}>
                                <label>By Time</label>
                                <CustomInput
                                    onChange={handleByTime}
                                    defaultValue={byTimeValue}
                                    type="select" name="byTime" id="by-time">
                                    <option value={'Today'}>Today</option>
                                    <option vablue={'Tomorrow'}>Tomorrow</option>
                                    <option value={'This Week'}>This Week</option>
                                    <option value={'This Month'}>This Month</option>
                                    <option value={'no filter'}>no filter</option>
                                </CustomInput>
                            </Grid>
                            <Grid item sm={6} lg={4} md={4}>
                                <label>Status</label>
                                <CustomInput onChange={handleStaus}
                                    defaultValue={statusValue}
                                    type="select" name="status"
                                    className='' id="status">
                                    <option>All</option>
                                    <option value={'Past Due'}>Past Due</option>
                                    <option value={'Completed'}>Completed</option>
                                    <option value={'Pending'}>Pending</option>
                                    <option value={'Due'}>Due</option>
                                    <option value={'no filter'}>no filter</option>
                                </CustomInput>
                            </Grid>
                            <Grid item sm={6} lg={3} md={3}>
                                <label>Priority</label>
                                <CustomInput
                                    defaultValue={priority}
                                    onChange={(e) => { setPriority(e.target.value) }}
                                    type="select" name="select" id="priority">
                                    <option value='All'>All</option>
                                    <option value={'High'}>High</option>
                                    <option value={'Low'}>Low</option>
                                    <option value={'Urgent'}>Urgent</option>
                                    <option value={'Normal'}>Normal</option>
                                    <option value={'no filter'}>no filter</option>
                                </CustomInput>
                            </Grid>
                            <div className='d-flex align-items-center mt-1'>
                                <Chip label={'Filter'} className='rounded'
                                    onClick={handleFilter}
                                    // disabled={byTimeValue === null || statusValue === null}
                                    style={{ color: 'white', height: "38px", background: '#2796f3' }} />
                            </div>
                        </Grid>
                    </div>
                </Grid >
            </Grid >
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        breadCrumbValue: state?.TaskAndGoalsTaskReducer?.breadCrumbValue,
        taskToDisplayToUser: state?.TaskAndGoalsTaskReducer?.taskToDisplayToUser,
    };
};
export default connect(mapStateToProps, { FILTER_TASK_STATUS_OR_TIME })(TaskFilter)
