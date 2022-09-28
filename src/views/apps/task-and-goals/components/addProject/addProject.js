import { Chip, Dialog, DialogContent, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import AddIcon from "@material-ui/icons/Add";
import { Input } from 'reactstrap';
import { Button } from "@material-ui/core";
import { CREATE_TASK_FOLDER } from '../../../../../redux/actions/task-and-goals/task';
import { connect } from 'react-redux';



const AddList = (props) => {
    const { CREATE_TASK_FOLDER } = props
    const [open, setOpen] = useState(false)
    const [state, setState] = useState({folderName:""});

    const handleSubmit = (e) => {
        CREATE_TASK_FOLDER(state)
        setOpen(!open)    
    };
    const handleOnChange = (e)=> {
        setState({...state,folderName: e.target.value})
    }
     
    return (
        <div className='d-flex justify-content-center w-100'>
            <Button
                size="small"
                startIcon={<AddIcon style={{ color: "#fff" }} />}
                label='Add List'
                onClick={() => { setOpen(true) }}
                style={{ background: "#2796f3", color: "#ffff", padding: "10px 10px", width: "100%", borderRadius: "6px" }}
            >
                ADD TO-DO LIST
            </Button>
            <Dialog open={open} onClose={() => { setOpen(false) }}>
                <DialogContent>
                    <Typography>{props?.title}</Typography>
                    <form >
                        <Input style={{ width: 300 }} value={state.folderName} onChange={handleOnChange} placeholder='List name' />
                        <div className='mt-1 d-flex justify-content-end'>
                            <Chip
                                style={{ background: '#0184FF' }}
                                className='text-white rounded' label='Add'
                                onClick={() => { handleSubmit() }} />
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default connect(null, { CREATE_TASK_FOLDER })(AddList);
