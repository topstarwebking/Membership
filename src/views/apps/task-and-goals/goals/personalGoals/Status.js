import { Chip } from '@material-ui/core'
import React from 'react'
import {
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
} from "reactstrap";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


export const CreateStatus = (props) => {
    const { row } = props
    const getColor = (status) => {
        if (status === 'incomplete') {
            return '#FF0000'
        } else if (status === 'completed') {
            return '#37D400'
        } else if (status === 'inprogress') {
            return '#B1530F'
        } else if (status === 'pending') {
            return '#FFB800'
        } else {
            return '#9f9f9f'
        }
    }
    return (
        <UncontrolledDropdown>
            <DropdownToggle
                tag="div"
                className="cursor-pointer"
            >
                <FiberManualRecordIcon style={{ fontSize: '10px', color: getColor('all'), marginRight: 6 }} />
                <span className='text-gray'>Status</span>
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem>
                    <Chip size='small' label={'In Complete'}
                        className='text-capitalize w-100'
                        style={{ fontWeight: 'bold', background: getColor('incomplete'), color: '#fff' }} />
                </DropdownItem>
                <DropdownItem>
                    <Chip size='small' label={'Completed'}
                        className='text-capitalize w-100'
                        style={{ fontWeight: 'bold', background: getColor('completed'), color: '#fff' }} />
                </DropdownItem>
                <DropdownItem>
                    <Chip size='small' label={'inprogress'}
                        className='text-capitalize w-100'
                        style={{ fontWeight: 'bold', background: getColor('inprogress'), color: '#fff' }} />
                </DropdownItem>
                <DropdownItem>
                    <Chip size='small' label={'pending'}
                        className='text-capitalize w-100'
                        style={{ fontWeight: 'bold', background: getColor('pending'), color: '#fff' }} />
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}


