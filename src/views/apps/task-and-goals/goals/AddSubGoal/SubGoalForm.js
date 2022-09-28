import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import {
    Select,
    MenuItem,
    Grid,
    TextField,
    FormControl,
} from "@material-ui/core";
import { Button } from "@material-ui/core";
import { X } from "react-feather";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import '../../task-and-goals.css'
import {
    statusNumberToLabelMapping,
} from "../../../../../redux/actions/todo/index";
import { Input } from 'reactstrap';



const SubGoalForm = (props) => {
    const { item, handleClose,state,handleDateChange } = props
    const { featureType,
        //  filtertype 
    } = useParams()
    // const [formType, setFormType] = useState(featureType)

    return (
        <div>
            <div className="task-header">
                <div className="d-flex justify-content-between">
                    <div className="task-type-title text-bold-600 text-center ">
                        <h2 style={{ color: "#0184FF" }}>{item === undefined ? item.title : item.title} Goal</h2>
                    </div>
                    <div className="close-icon">
                        <X
                            className="cursor-pointer"
                            size={20}
                            onClick={handleClose}
                        />
                    </div>
                </div>
            </div>

            <div>
                <div className="task-body p-1">
                    <Grid spacing={2} container>
                        <Grid item sm={12} md={12} lg={12}>
                            <label id='subgoal' style={{ fontSize: '15px' }}> Sub Goal Name</label>
                            <Input placeholder='Sub Goal' name='subgoal' id='' />
                            {/* <TextField
                                style={{
                                    borderRadius: "0.4em",
                                    border: "1px solid #b8c2cc",
                                    background: "none",
                                    height: "40px",
                                    fontSize: '20px',
                                }}
                                name="name"
                                inputprops={{
                                    disableUnderline: true,
                                }}
                                fullWidth
                                required
                            /> */}
                        </Grid>
                        <Grid item sm={6} md={6} lg={6}>
                            <label style={{ fontSize: '15px' }}> Due Date</label>
                            <DatePicker
                                selected={state.start_date}
                                onChange={(date) => { handleDateChange(date, 'start_date') }}
                                showTimeSelect
                                id="startDate"
                                className="form-control"
                                dateFormat="MM/d/yyyy h:mm aa"
                            />
                            {/* <MuiPickersUtilsProvider className='d-flex align-items-start' utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    style={{
                                        borderRadius: "0.4em",
                                        border: "1px solid #b8c2cc",
                                        background: "none",
                                        height: "40px",
                                        padding: "10px"
                                    }}
                                    inputprops={{
                                        disableUnderline: true,
                                    }}
                                    name="dueDate"
                                    margin="normal"
                                    id="date-picker-dialog"
                                    format="dd-MM-yyyy"
                                />
                            </MuiPickersUtilsProvider> */}
                        </Grid>
                        <Grid item sm={6} md={6} lg={6}>
                            <label style={{ fontSize: '15px' }}> Start Date </label>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    style={{
                                        borderRadius: "0.4em",
                                        border: "1px solid #b8c2cc",
                                        background: "none",
                                        height: "40px",
                                        padding: "10px"
                                    }}
                                    inputprops={{
                                        disableUnderline: true,
                                    }}
                                    name="startDate"
                                    margin="normal"
                                    id="date-picker-dialog"
                                    format="dd-MM-yyyy"
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item sm={6} md={6} lg={6}>
                            <label style={{ fontSize: '15px' }}>End Date</label>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    style={{
                                        borderRadius: "0.4em",
                                        border: "1px solid #b8c2cc",
                                        background: "none",
                                        height: "40px",
                                        padding: "10px"
                                    }}
                                    inputprops={{
                                        disableUnderline: true,
                                    }}
                                    name="endDate"
                                    margin="normal"
                                    id="date-picker-dialog"
                                    format="dd-MM-yyyy"
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item sm={6} md={6} lg={6}>
                            <label style={{ fontSize: '15px' }}> Sub Goal's Status</label>
                            <FormControl required fullWidth>
                                <Select
                                    fullWidth
                                    style={{
                                        borderRadius: "0.4em",
                                        border: "1px solid #b8c2cc",
                                        background: "none",
                                        height: "40px",
                                        margin: "0",
                                        padding: "10px",
                                    }}
                                    inputprops={{
                                        disableUnderline: true,
                                    }}
                                    labelId="status-select-required-label"
                                    id="status-select-required"
                                    label="Status"
                                    variant="filled"
                                    name="status"
                                >
                                    {Object.keys(statusNumberToLabelMapping).map((k) => (
                                        <MenuItem value={k} key={k}>
                                            {statusNumberToLabelMapping[k]}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <hr className="my-2" />
                    <div className="d-flex justify-content-end align-content-lg-center">
                        <Button
                            className="mr-50"

                            style={{
                                color: "#6b6b6b",
                                height: 40,
                                borderRadius: "4px",
                                width: "100px",
                                border: '1px solid #b8c2cc',

                            }}
                            onClick={props?.handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            style={{
                                color: "#fff",
                                height: 40,
                                background: "#0184FF",
                                borderRadius: "4px",
                                width: "90px",
                            }}
                        >
                            <b> Add</b>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubGoalForm