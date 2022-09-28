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
import '../../task-and-goals.css'
import {
  statusNumberToLabelMapping,
} from "../../../../../redux/actions/todo/index";
import { Input } from 'reactstrap';



const GoalForm = (props) => {
  const { featureType, filtertype } = useParams()
  const [formType, setFormType] = useState(featureType)

  const handleFormSelect = (e) => {
    setFormType(e.target.value)
  }

  return (
    <div>
      <div className="task-header">
        <div className="d-flex justify-content-between">
          <div className="task-type-title text-bold-600 text-center ">
            <h2 style={{ color: "#0184FF" }}> Create New Goal </h2>
          </div>
          <div className="close-icon">
            <X
              className="cursor-pointer"
              size={20}
              onClick={props?.handleClose}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="task-body p-1 mt-2">
          <Grid spacing={2} container>
            <Grid item sm={12} md={10} lg={10}>
              <label style={{ fontSize: '15px' }}> Goals Name</label>
              <TextField
                style={{
                  borderRadius: "0.4em",
                  border: "1px solid #b8c2cc",
                  background: "none",
                  height: "40px",
                  fontSize: '20px',
                }}
                name="name"
                InputProps={{
                  disableUnderline: true,
                }}
                fullWidth
                required
              //   value={taskDetailForEditOrAdd.name}
              //   onChange={this.onChange}
              />
            </Grid>
            {/* <Grid item sm={12} md={3} lg={3}>
              <label style={{ fontSize: '15px' }}> Type</label>
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
                  InputProps={{
                    disableUnderline: true,
                  }}
                  labelId="status-select-required-label"
                  id="status-select-required"
                  // value={taskDetailForEditOrAdd.status}
                  variant="filled"
                  value={formType}
                  onChange={handleFormSelect}
                >
                  <MenuItem value='task'>
                    Task
                  </MenuItem>
                  <MenuItem value='goal'>
                    Goals
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item sm={12} md={2} lg={2}>
              <label style={{ fontSize: '15px' }}> color </label>

              <Input

                style={{
                  borderRadius: "0.4em",
                  border: "1px solid #b8c2cc",
                  // background: "none",
                  height: "40px",
                  margin: "0",
                  padding: "10px",
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                type='color'
                name="color"
                fullWidth
                required
              // endAdornment={
              //   <div className='d-flex justify-content-between '>
              //     <FormColors/>
              //   </div>
              // }
              />
            </Grid>
            <Grid item sm={6} md={6} lg={6}>
              <label style={{ fontSize: '15px' }}> Due Date</label>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  style={{
                    borderRadius: "0.4em",
                    border: "1px solid #b8c2cc",
                    background: "none",
                    height: "40px",
                    padding: "10px"
                  }}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  name="dueDate"
                  margin="normal"
                  // value={taskDetailForEditOrAdd.dueDate}
                  id="date-picker-dialog"
                  format="dd-MM-yyyy"
                // onChange={(date, value) => {
                // //   this.updateVal("dueDate", date);
                // }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            {/* <Grid item sm={6} md={6} lg={6}>
              <label style={{ fontSize: '15px' }}>Goals Label</label>
              <TextField
                style={{
                  borderRadius: "0.4em",
                  border: "1px solid #b8c2cc",
                  background: "none",
                  height: "40px",
                  margin: "0",
                  padding: "10px",
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                name="label"
                fullWidth
                // variant="filled"
                required
              //   value={taskDetailForEditOrAdd.label}
              //   onChange={this.onChange}
              />
            </Grid>
            <Grid item sm={6} md={6} lg={6}>
              <label style={{ fontSize: '15px' }}>Priority</label>
              <FormControl required fullWidth>
                <Select
                  style={{
                    borderRadius: "0.4em",
                    border: "1px solid #b8c2cc",
                    background: "none",
                    height: "40px",
                    margin: "0",
                    padding: "10px",
                  }}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  fullWidth
                  labelId="priority-select-required-label"
                  id="priority-select-required"
                  name="priority"
                // value={taskDetailForEditOrAdd.priority}
                // onChange={this.onChange}
                >
                  {Object.keys(priorityMapping).map((k) => (
                    <MenuItem value={k} key={k}>
                      {priorityMapping[k]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item sm={6} md={6} lg={6}>
              <label style={{ fontSize: '15px' }}> Goals Status</label>
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
                  InputProps={{
                    disableUnderline: true,
                  }}
                  labelId="status-select-required-label"
                  id="status-select-required"
                  label="Status"
                  // value={taskDetailForEditOrAdd.status}
                  variant="filled"
                  name="status"
                // onChange={this.onChange}
                >
                  {Object.keys(statusNumberToLabelMapping).map((k) => (
                    <MenuItem value={k} key={k}>
                      {statusNumberToLabelMapping[k]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={12} md={12} lg={12}>
              <label style={{ fontSize: '15px' }}> Goals Description</label>
              <TextField
                style={{
                  borderRadius: "0.4em",
                  border: "1px solid #b8c2cc",
                  background: "none",
                  margin: "0",
                  padding: "10px",
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                name="description"
                fullWidth
                placeholder="Type Here...."
                multiline
                //   value={taskDetailForEditOrAdd.description}
                //   onChange={this.onChange}
                minRows={5}
              />
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
              // startIcon={<Plus size={20} />}
              // className="ml-1"
              // onClick={handleOpenDrower}
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

export default GoalForm

