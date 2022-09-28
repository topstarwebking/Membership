import {
    UncontrolledDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import React, { Fragment, useEffect, useState } from 'react';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import { Edit, Trash2 } from "react-feather";
import ConfirmationModal from '../../../../../components/gloabal/confirmation'
import { Input } from 'reactstrap';
import { Chip } from '@material-ui/core';
import { Dialog, DialogContent, Typography, Button } from '@material-ui/core';
import { REMOVE_FOLDER, EDIT_FOLDER } from '../../../../../redux/actions/task-and-goals/task';
import { connect } from 'react-redux';




const ListAction = (props) => {
    const { folderName, REMOVE_FOLDER, folderId, EDIT_FOLDER } = props
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [state, setState] = useState({ folderName: "" })

    const handleOpenCloseEdit = () => {
        setOpenEdit(!openEdit)
    }
    useEffect(() => {
        setState({ ...state, folderName })
    }, [])

    const handleSubmit = (id) => {
        EDIT_FOLDER(state, { _id: id })
        setOpenEdit(false)
    }

    const handleOnChange = (e) => {
        setState({ ...state, folderName: e.target.value })
    }
    const handleOpenClose = () => {
        setOpen(!open)
    }
    const handledelet = (Id) => {
        REMOVE_FOLDER({ _id: Id })
        setOpen(false)
    }
    return (
        <Fragment>
            <UncontrolledDropdown>
                <DropdownToggle
                    tag="div"
                    className="cursor-pointer"
                >
                    <MoreVertRoundedIcon />
                </DropdownToggle>
                <DropdownMenu tag="ul" className="p-50">
                    <DropdownItem tag="li" onClick={handleOpenCloseEdit} className="px-25">
                        <div className="d-flex align-items-center">
                            <Edit size={18} className='mr-1' style={{ color: '#0184FF' }} />
                            <span>Edit</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem tag="li" onClick={handleOpenClose} className="px-25">
                        <div className="d-flex align-items-center">
                            <Trash2 size={18} className='mr-1' style={{ color: '#EB5757' }} />
                            <span>Remove</span>
                        </div>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
            <Dialog open={openEdit} onClose={() => { setOpenEdit(false) }}>
                <DialogContent>
                    <Typography>Edit List</Typography>
                    <form >
                        <Input style={{ width: 300 }}
                            value={state.folderName}
                            onChange={handleOnChange}
                            defaultValue={folderName} />
                        {/* <div className='mt-1 d-flex justify-content-end'>
                            <Chip
                                style={{ background: '#fff' }}
                                className='rounded ml-2' label='cancel'
                                onClick={() => { setOpenEdit(false) }}
                            />
                            <Chip
                                style={{ background: '#0184FF' }}
                                className='text-white rounded' label='Edit'
                                onClick={() => { handleSubmit(folderId) }}
                            />
                        </div> */}
                        <div className="d-flex justify-content-end align-items-center mt-2">
                            <Button
                                className="mr-50"
                                style={{
                                    color: "#6b6b6b",
                                    height: 25,
                                    borderRadius: "4px",
                                    // width: "0px",
                                    border: "1px solid #b8c2cc",
                                }}
                                onClick={() => { setOpenEdit(false) }}
                            >
                                Cancel
                            </Button>
                            <Button
                                style={{
                                    color: "#fff",
                                    height: 25,
                                    background: "#0184FF",
                                    borderRadius: "4px",
                                    // width: "90px",
                                }}
                                onClick={() => { handleSubmit(folderId) }}
                            >
                                Edit
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
            <ConfirmationModal
                primaryColor="#0483fd"
                secondaryColor="#fff"
                imagePath="/images/delete.png"
                open={open}
                title="Delete List ?"
                onConfirm={() => { handledelet(folderId) }}
                onCancel={handleOpenClose}
                onCancelButtonTitle={"Cancel"}
                contiunuebuttonTitle={"Remove"}
                description=" Are you sure you want to delete?"
            />
        </Fragment>
    )
}


export default connect(null, { REMOVE_FOLDER, EDIT_FOLDER })(ListAction);

