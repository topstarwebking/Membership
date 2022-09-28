import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Menu, IconButton } from '@material-ui/core';
// import DrawerEventAppoinment from './drawerEventAppoinment';
import Mangecategory from './mangecategory';
import "react-toastify/dist/ReactToastify.css"
import SweetAlert from "react-bootstrap-sweetalert";
import { Edit,Trash } from "react-feather";


export const ManageCategory = (props) => {
    const { item, deleteAPI } = props
    const [open, setOpen] = useState(false)
    const [SweetAlertOpen, setSweetAlertOpen] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseOpen = () => {
        setOpen(!open)
    }
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleEdit = () => {
        setAnchorEl(null);
        if (props.IscategoryEdit) {
            props.handleCloseOpen(item)
        } else {
            setOpen(!open)
        }
    };
    const handledelete = () => {
        setSweetAlertOpen(true)
        setAnchorEl(null);
    };
    const confirmDelete = () => {
        deleteAPI(item?._id)
        // setAnchorEl(null);
    }

    return (
        <div>
            <IconButton
                className='rounded-circle'
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClickMenu}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={openMenu}
                onClose={handleClose}
            >
                <MenuItem onClick={handleEdit}>
                    <Edit size={16} style={{ color: "#5aa65c", marginRight: "1em" }} />
                    Edit
                </MenuItem>
                <MenuItem onClick={handledelete}>
                    <Trash style={{ color: "#e05252", marginRight: "1em" }} size={16} />{" "}
                    Delete
                </MenuItem>
            </Menu>
            <Mangecategory item={item} handleCloseOpen={handleCloseOpen} open={open} IscategoryEdit={true} />
            <SweetAlert
                title="Are you sure?"
                warning
                show={SweetAlertOpen}
                showCancel
                reverseButtons
                cancelBtnBsStyle="danger"
                confirmBtnText="Yes, delete it!"
                cancelBtnText="Cancel"
                onCancel={() => {
                    setSweetAlertOpen(false)
                }}
                onConfirm={confirmDelete}
            >
                You won't be able to revert this!
            </SweetAlert>
        </div >
    )
}
