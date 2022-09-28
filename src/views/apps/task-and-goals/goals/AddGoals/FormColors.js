import React from 'react'
import {
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
} from "reactstrap";
import StopIcon from '@material-ui/icons/Stop';
import PaletteIcon from '@material-ui/icons/Palette';

function FormColors() {
    return (
        <div>
            <UncontrolledDropdown>
                <DropdownToggle className='cursor-pointer d-flex'>
                    <StopIcon />
                    <PaletteIcon size='small' />
                </DropdownToggle>
                {
                    MyColors?.map((item, i) => {
                        return (

                            <DropdownMenu bottom>
                                <DropdownItem>
                                    <StopIcon color={item} />
                                    <StopIcon />
                                    <StopIcon />
                                    <StopIcon />
                                    <StopIcon />
                                    <StopIcon />
                                </DropdownItem>
                            </DropdownMenu>


                        )
                    })
                }
            </UncontrolledDropdown>
        </div >
    )
}

export default FormColors

const MyColors = [
    '#FF9999',
    '#FFCC99',
    '#FFFF99',
    '#CCFF99',
    '#99FF99',
    '#99FFCC',
    '#99FFFF',
    '#99CCFF',
    '#9999FF',
    '#CC99FF',
    '#FF99FF',
    '#FF99CC',
    '#E0E0E0',
]