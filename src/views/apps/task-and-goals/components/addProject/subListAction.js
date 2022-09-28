import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, DialogContent, Typography, Button} from '@material-ui/core';
import {
    UncontrolledDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import { Edit, Trash2 } from "react-feather";
import ConfirmationModal from '../../../../../components/gloabal/confirmation'
import { Input } from 'reactstrap';
import { REMOVE_SUB_FOLDER, EDIT_SUB_FOLDER } from '../../../../../redux/actions/task-and-goals/task'
import { connect } from 'react-redux';




const SubListAction = (props) => {
    const { subFolderName, subFolderId, REMOVE_SUB_FOLDER, EDIT_SUB_FOLDER } = props
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [state,setState] = useState({subFolderName:""})


    const handleSubmit = (id) => {
        EDIT_SUB_FOLDER(state,{_id:id})
        setOpenEdit(false)
    }
    useEffect(()=>{
        setState({...state, subFolderName})
    },[])

    const handleOnChange =(e) =>{
        setState({...state, subFolderName: e.target.value})
    }

    const handleOpenCloseEdit = () => {
        setOpenEdit(!openEdit)
    }
    // const { row } = props
    const handleOpenClose = () => {
        setOpen(!open)
    }
    const handledelet = (subListId) => {
        REMOVE_SUB_FOLDER({ _id: subListId })
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
                    <Typography>Edit SubList</Typography>
                    <form >
                        <Input style={{ width: 300 }}
                            value={state.folderName} 
                            onChange={handleOnChange} 
                            defaultValue={subFolderName} />
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
                                onClick={() => { handleSubmit(subFolderId) }}
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
                title="Delete SubList ?"
                onConfirm={() => { handledelet(subFolderId) }}
                onCancel={handleOpenClose}
                onCancelButtonTitle={"Cancel"}
                contiunuebuttonTitle={"Remove"}
                description=" Are you sure you want to delete?"
            />
        </Fragment>
    )
}

export default connect(null, { REMOVE_SUB_FOLDER, EDIT_SUB_FOLDER })(SubListAction);