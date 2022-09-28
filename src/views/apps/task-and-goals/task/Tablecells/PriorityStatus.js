import React, { useState } from 'react'
import {
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Input,
} from "reactstrap";
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { Chip } from '@material-ui/core';
import { connect } from "react-redux";
import { EDIT_TASK, EDIT_TASK_WITHOUT_GONE_INTO_FOLDER } from "../../../../../redux/actions/task-and-goals/task"


const PriorityStatus = (props) => {
    const { row, EDIT_TASK, EDIT_TASK_WITHOUT_GONE_INTO_FOLDER } = props
    const [changePriority, setChangePriority] = useState(row?.priority)

    const handleChangePriority = (item) => {
        if (row?.subfolderId?._id !== undefined) {
            EDIT_TASK_WITHOUT_GONE_INTO_FOLDER({ ...row, priority: item }, { _id: row?._id });
        } else {
            EDIT_TASK({ ...row, priority: item }, { _id: row?._id })
        }

        setChangePriority(item)
    }
    const getColor = (status) => {
        if (status === 'Urgent') {
            return '#FF3E3E'
        } else if (status === 'High') {
            return '#E2B408'
        } else if (status === 'Normal') {
            return '#0AB5FF'
        } else if (status === 'Low') {
            return '#0d82fa'
        }
    }
    return (
        <UncontrolledDropdown>
            <DropdownToggle>
                {
                    changePriority === 'Clear' ?
                        <CloseOutlinedIcon fontSize='small' style={{ color: '#18D441' }} /> :
                        <FlagOutlinedIcon fontSize='small' style={{ color: getColor(changePriority) }} />

                }
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem className='d-flex justify-content-center w-100'>
                    <Chip
                        icon={<FlagOutlinedIcon fontSize='small' style={{ color: getColor('Urgent') }} />}
                        size='small'
                        label='Urgent'

                        className='rounded transparent'
                        style={{ color: getColor('Urgent') }}
                        onClick={() => { handleChangePriority("Urgent") }}
                    />
                </DropdownItem>
                <DropdownItem className='d-flex justify-content-center w-100'>
                    <Chip
                        icon={<FlagOutlinedIcon fontSize='small' style={{ color: getColor('High') }} />}
                        size='small'
                        label='High'

                        className='rounded transparent'
                        style={{ color: getColor('High') }}
                        onClick={() => { handleChangePriority("High") }}
                    />
                </DropdownItem>
                <DropdownItem className='d-flex justify-content-center w-100'>
                    <Chip
                        icon={<FlagOutlinedIcon fontSize='small' style={{ color: getColor('Normal') }} />}
                        size='small'
                        label='Normal'

                        className='rounded transparent'
                        style={{ color: getColor('Normal') }}
                        onClick={() => { handleChangePriority("Normal") }}
                    />
                </DropdownItem>
                <DropdownItem className='d-flex justify-content-center w-100'>
                    <Chip
                        icon={<FlagOutlinedIcon fontSize='small' style={{ color: getColor('Low') }} />}
                        size='small'
                        label='Low'

                        className='rounded transparent'
                        style={{ color: getColor('Low') }}
                        onClick={() => { handleChangePriority("Low") }}
                    />
                </DropdownItem>
                <DropdownItem className='d-flex justify-content-center w-100'>
                    <Chip
                        icon={<CloseOutlinedIcon fontSize='small' style={{ color: '#18D441' }} />}
                        size='small'
                        label='Clear'

                        className='rounded transparent'
                        style={{ color: '#18D441' }}
                        onClick={() => { handleChangePriority("Clear") }}
                    />
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}
export default connect(null, { EDIT_TASK, EDIT_TASK_WITHOUT_GONE_INTO_FOLDER })(PriorityStatus);
