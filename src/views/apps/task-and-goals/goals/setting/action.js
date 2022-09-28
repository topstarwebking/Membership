import {
    UncontrolledDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import React from 'react';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import { Edit, Trash2 } from "react-feather";


const Action = (props) => {
   
    return (
        <div>
            <UncontrolledDropdown>
                <DropdownToggle
                    tag="div"
                    className="cursor-pointer"
                >
                    <MoreVertRoundedIcon style={{ color: '#C4C4C4' }} />
                </DropdownToggle>
                <DropdownMenu tag="ul" className="p-50">
                    <DropdownItem tag="li" className="px-25">
                        <div className="d-flex align-items-center">
                            <Edit size={18} className='mr-1' style={{ color: '#0184FF' }} />
                            <span>Edit</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem tag="li" className="px-25">
                        <div className="d-flex align-items-center">
                            <Trash2 size={18} className='mr-1' style={{ color: '#EB5757' }} />
                            <span>Delete</span>
                        </div>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </div>
    )
}

export default Action;