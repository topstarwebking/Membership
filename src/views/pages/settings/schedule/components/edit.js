import React, { useEffect } from 'react';
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {
    FormGroup,
    Input,
    Label,
} from "reactstrap"
import { Chip } from '@material-ui/core'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const useStyles = makeStyles({
    cardStyle: {
        borderRadius: '8px',
        boxShadow: 'none',
        cursor: 'pointer'
    },
    selected: {
        textTransform: 'capitalize',
        backgroundColor: '#00cfe8',
        fontWeight: 'bold',
        color: '#fff',
        '&:hover': {
            background: '#00cfe8',
        }
    },
    unselected: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#00cfe8',
    }
});

const EditEvents = (props) => {
    const { SelectProgram, UpdateWholeSeries, updateOneEvent, event, setTabActive, ActiveTab,
        setWholeStartDate,
        setWholeEndDate,
        // wholeEndDate,
        // wholeStartDate,
        programList, changeHandler, dayNames,
        repeat_weekly_on, checkboxHandler, getDayName, handleDateChange, setState } = props
    console.log(event)
    const classes = useStyles()
    const [copyEvent, setCopyEvent] = React.useState({});

    const handleActiveTab = (id) => {
        setTabActive(id)
        setCopyEvent(event)
        if (ActiveTab === 0) {
            let startTimeH = new Date(event?.start_time).getHours()
            let startTimeM = new Date(event?.start_time).getMinutes()

            let endTimeH = new Date(event?.end_time).getHours()
            let endTimeM = new Date(event?.end_time).getMinutes()
            let start_date = new Date(event.start_time)// new Date(moment(event.wholeSeriesStartDate).set({ hour: Number(startTimeH), minute: Number(startTimeM) })?._d)
            let end_date =  new Date(event.end_time) //new Date(moment(event.wholeSeriesEndDate).set({ hour: Number(endTimeH), minute: Number(endTimeM) })?._d)
            setState({ ...event, start_date, end_date })
        } else {
            setState(copyEvent)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (ActiveTab === 0) {
            updateOneEvent(event?._id)
        } else {
            UpdateWholeSeries()
        }
    }
    console.log(event)
    return (
        <div>
            <div className='d-flex justify-content-center mb-1'>
                <Button
                    style={{
                        borderRadius: 0, borderTopLeftRadius: 10, borderBottomLeftRadius: 10,
                    }}
                    fullWidth
                    onClick={() => handleActiveTab(0)}
                    className={ActiveTab === 0 ? classes.selected : classes.unselected}>
                    Edit one
                </Button>
                <Button
                    style={{
                        borderRadius: 0, borderTopRightRadius: 10, borderBottomRightRadius: 10,
                    }}
                    fullWidth
                    onClick={() => handleActiveTab(1)}
                    className={ActiveTab === 1 ? classes.selected : classes.unselected}>
                    Edit whole series
                </Button>
            </div>
            <form onSubmit={handleSubmit}>
                {ActiveTab === 0 && <div className="alert alert-warning" role="alert">
                    Can't edit. It is a whole series class!
                </div>}
                {
                    ActiveTab === 0 ?
                        <div className="add-event-fields">
                            <FormGroup>
                                <Label> Program Name</Label>
                                <Input
                                    required
                                    disabled={ActiveTab === 0} type="select" name="program_name"
                                    onChange={SelectProgram}
                                    value={event?.program_name}
                                    id="ProgramName">
                                    {programList?.map((item, index) => {
                                        return (<option key={index} defaultValue={item?._id} >{item.programName}</option>)
                                    })}
                                </Input>
                            </FormGroup>
                            <FormGroup className="form-label-group">
                                <Input
                                    disabled={ActiveTab === 0}
                                    type="text"
                                    required
                                    id="ClassName"
                                    placeholder="Class Name"
                                    name="class_name"
                                    defaultValue={event?.class_name}
                                    onChange={changeHandler}
                                />
                                <Label htmlFor="ClassName">Class Name</Label>
                            </FormGroup>
                            <div className="d-flex justify-content-between">
                                <FormGroup className="mr-1">
                                    <Label htmlFor="startDate">Start Date & time</Label>
                                    <DatePicker
                                        disabled={ActiveTab === 0}
                                        required
                                        selected={event?.start_date}
                                        onChange={(date) => { handleDateChange(date, 'start_date') }}
                                        // onChange={(date) => setStartDate(date)}
                                        showTimeSelect
                                        id="startDate"
                                        className="form-control"
                                        // filterTime={filterPassedTime}
                                        dateFormat="MM/d/yyyy h:mm aa"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="endDate">End Date & time</Label>
                                    <DatePicker
                                        disabled={ActiveTab === 0}
                                        required
                                        selected={event?.end_date}
                                        onChange={(date) => { handleDateChange(date, 'end_date') }}
                                        showTimeSelect
                                        id="endDate"
                                        className="form-control"
                                        // filterTime={filterPassedTime}
                                        dateFormat="MM/d/yyyy h:mm aa"
                                    />
                                </FormGroup>
                            </div>
                            <div className="add-event-actions text-right">
                                <button
                                    disabled={ActiveTab === 0}
                                    type="submit" className="btn btn-primary"
                                    color="primary"
                                // onClick={() => {  }}
                                >
                                    Update Class
                                </button>
                            </div>
                        </div>
                        :
                        <div className="add-event-fields">
                            <FormGroup>
                                <Label> Program Name</Label>
                                {event?.program_name !== '' ? <Input
                                    required
                                    type="select"
                                    onChange={SelectProgram}
                                    value={event?.program_name}
                                    name="program_name" id="ProgramName">
                                    {programList?.map((item, index) => {
                                        return (<option key={index} value={item?.programName} >{item.programName}</option>)
                                    })}
                                </Input> : <Input
                                    required
                                    type="select"
                                    onChange={SelectProgram}
                                    value={event?.program_name}
                                    name="program_name" id="ProgramName">
                                    {programList?.map((item, index) => {
                                        return (<option key={index} value={item?.programName} >{item.programName}</option>)
                                    })}
                                </Input>}

                            </FormGroup>
                            <FormGroup className="form-label-group">
                                <Input
                                    type="text"
                                    id="ClassName"
                                    placeholder="Class Name"
                                    name="class_name"
                                    required
                                    defaultValue={event?.class_name}
                                    onChange={changeHandler}
                                />
                                <Label htmlFor="ClassName">Class Name</Label>
                            </FormGroup>
                            <div className="d-flex justify-content-between">
                                <FormGroup className="mr-1">
                                    <Label htmlFor="startDate">Start Date & time</Label>
                                    <DatePicker
                                        required
                                        selected={event?.start_date}
                                        onChange={(date) => {
                                            handleDateChange(date, 'start_date')
                                            setWholeStartDate(date)
                                        }}
                                        showTimeSelect
                                        id="startDate"
                                        className="form-control"
                                        dateFormat="MM/d/yyyy h:mm aa"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="endDate">End Date & time</Label>
                                    <DatePicker
                                        required
                                        selected={event?.end_date}
                                        onChange={(date) => {
                                            handleDateChange(date, 'end_date')
                                            setWholeEndDate(date)
                                        }}
                                        showTimeSelect
                                        id="endDate"
                                        className="form-control"
                                        // filterTime={filterPassedTime}
                                        dateFormat="MM/d/yyyy h:mm aa"
                                    />
                                </FormGroup>
                            </div>
                            {
                                repeat_weekly_on?.length > 0 &&
                                repeat_weekly_on?.map((item, i) => {
                                    return (
                                        <Chip
                                            button={'true'}
                                            key={i}
                                            size='small'
                                            icon={<CheckCircleOutlineIcon style={{ color: '#4f7fff' }} />}
                                            onClick={() => checkboxHandler(item)}
                                            variant="outlined"
                                            className="rounded"
                                            style={{
                                                margin: '4px',
                                                background: getDayName(event?.start_date).toLocaleLowerCase() === item ? "#6610f21a" : '#f8f8f8',
                                                color: '#4f7fff',
                                                fontWeight: 'bold',
                                                textTransform: 'capitalize'
                                            }}
                                            label={item}
                                        />
                                    )
                                })

                            }
                            {
                                dayNames?.map((item, i) => {
                                    return (
                                        !repeat_weekly_on?.includes(item) && <Chip
                                            button={'true'}
                                            size='small'
                                            className="rounded"
                                            style={{
                                                margin: '4px',
                                                background: '#f8f8f8',
                                                fontWeight: 'bold',
                                                textTransform: 'capitalize'
                                            }}
                                            key={i}
                                            variant="outlined"
                                            onClick={() => checkboxHandler(item)}
                                            label={item.toLocaleLowerCase()}
                                        />
                                    )
                                })
                            }
                            <div className="add-event-actions text-right">
                                <button
                                    type="submit" className="btn btn-primary"
                                    color="primary"
                                // onClick={UpdateWholeSeries}
                                >
                                    Update All
                                </button>
                            </div>
                        </div>
                }

            </form>
        </div>
    );
};

export default EditEvents;