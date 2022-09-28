import React, { useEffect, useState } from 'react'
import { Button } from "@material-ui/core";
import { Plus } from "react-feather";
import Drawer from '@material-ui/core/Drawer';
import TaskForm from './TaskForm';
import { GET_TASK_FOLDER_LIST } from "../../../../../redux/actions/task-and-goals/task";
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const IsSmallDevise = window.matchMedia("(max-width:664px)").matches;

const AddTask = (props) => {
    const { taskFolderList, GET_TASK_FOLDER_LIST } = props
    const [open, setOpen] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)

    const handleOpenDrower = () => {
        setOpen(!open)
    }
    const handleOpenAlert = () => {
        setOpenAlert(true)
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };
    useEffect(() => {
        GET_TASK_FOLDER_LIST();
    }, []);
    // console.log(taskFolderList)

    return (
        <div>
            <Button
                startIcon={<Plus size={20} />}
                className="ml-1"
                onClick={taskFolderList?.length > 0 ? handleOpenDrower : handleOpenAlert}
                // disabled={taskFolderList?.length > 0 ? false : true}
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
            <Drawer
                PaperProps={{
                    elevation: 0,
                    style: {
                        width: IsSmallDevise ? "100%" : "500px",
                    },
                }}
                anchor={'right'} open={open} onClose={handleOpenDrower}>
                <div className='p-1'>
                    <TaskForm handleClose={handleOpenDrower} />
                </div>

            </Drawer>
            <Snackbar
                anchorOrigin={{
                    horizontal: "center",
                    vertical: "top",
                  }} 
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleClose}
                
                >
                <Alert onClose={handleClose} severity="info">
                    You need to Add a TO-DO LIST first.
                </Alert>
            </Snackbar>

        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        taskFolderList: state?.TaskAndGoalsTaskReducer?.taskFolderList,
    };
};

export default connect(mapStateToProps, { GET_TASK_FOLDER_LIST })(AddTask);