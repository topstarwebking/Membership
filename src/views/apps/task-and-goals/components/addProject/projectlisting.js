import React, { Fragment, useState, useEffect } from 'react'
import { Chip, List, ListItem, Button, makeStyles } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import Collapse from '@material-ui/core/Collapse';
import AddIcon from "@material-ui/icons/Add";
import ListAction from './listAction';
import SubListAction from './subListAction';
import { GET_TASK_FOLDER_LIST, CREATE_TASK_SUB_FOLDER, ADD_BREAD_CRUMB, TASK_TO_DISPLAY_TO_USER, GET_TODAY_TASK_LIST } from '../../../../../redux/actions/task-and-goals/task';
import { connect } from 'react-redux';
import { Dialog, DialogContent, Typography } from '@material-ui/core';
import { Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    activeMainFolder: {
        background: "#eaf4fe",
        maxHeight: "42px",
        "& button": {
            color: "#2796f3",
        },
    },
    inActiveFolder: {
        "&:hover": {
            background: "#eaf4fe",
        },
    },
    folderBtn: {
        background: "transparent",
        textTransform: "inherit",
        textAlign: "left",
        justifyContent: "start",
        "&:hover": {
            background: "unset",
        },
    },
    listWrapper: {
        width: "280px",
        background: "#fff",
        paddingTop: "0px",
        position: "relative",
        overflow: "scroll",
        minHeight: "100vh",
        borderRight: "2px solid #f8f8f8",
    },
    addMianFOlder: {
        color: "#fff",
        background: "#2796f3",
        fontWeight: "bold !important",
    },
}));

const ProjectListing = (props) => {
    const { taskFolderList, breadCrumbValue, GET_TASK_FOLDER_LIST, CREATE_TASK_SUB_FOLDER, ADD_BREAD_CRUMB, TASK_TO_DISPLAY_TO_USER,
        GET_TODAY_TASK_LIST } = props
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openSubFolderForm, setOpenSubFolderForm] = useState(false);
    const [sweetAlertOpen, setSweetAlertOpen] = useState(false);
    const [type, setType] = useState("");
    const history = useHistory()
    // const [tastsData, setTasksData] = useState([])

    const [stateSubFolder, setStateSubFolder] = useState({ subFolderName: "", subFolderId: '', folderId: '' });


    const handleClick = (e) => {
        history.maintaskFolderId = e

        if (e === open) {
            setOpen(false);
            return
        }
        setOpen(e);
        // setStateSubFolder({ ...stateSubFolder, folderId:e })
    };

    const handleFolderSubFolderValue = (info, id) => {
        let { folderName, subFolderName } = breadCrumbValue[0]
        setStateSubFolder({ ...stateSubFolder, subFolderId: id })
        if (info.folderName) {
            subFolderName = null
        }
        const finnalObject = Object.assign({}, { folderName, subFolderName }, info)
        ADD_BREAD_CRUMB(finnalObject)
    };
    const tableDataFilter = (info) => {
        const { tasks } = info
        TASK_TO_DISPLAY_TO_USER(tasks)
    }
    const handleFolderId = (F_id) => {
        setStateSubFolder({ ...stateSubFolder, folderId: F_id })
    }
    const handleSubmit = (e) => {
        CREATE_TASK_SUB_FOLDER({ subFolderName: stateSubFolder.subFolderName }, stateSubFolder.folderId)
        setOpenSubFolderForm(!openSubFolderForm)

    };

    const handleOnChange = (e) => {
        setStateSubFolder({ ...stateSubFolder, subFolderName: e.target.value })
    }
    
    useEffect(() => {
        history.maintaskFolderId = null
        history.subtaskFolderId = null

        GET_TASK_FOLDER_LIST()
        GET_TODAY_TASK_LIST()
    }, [])

    const handleSubFolderForm = (() => {
        setOpenSubFolderForm(!openSubFolderForm)
    })

    // const [state, setSate] = useState({
    //     modal: false,
    //     hover: false,
    // });
    // const toggleModal = () => {
    //     setSate({ ...state, modal: !state.modal });
    // };
    

    const handleDeleteId = (type, folderid) => {
        setSweetAlertOpen(true);
        setType(type);
    };


    return (
        <Fragment>
            {
                taskFolderList?.map((item) => {
                    return (
                        <Fragment key={item?._id}>
                            <ListItem
                                button
                            >
                                <Button
                                    className={classes.folderBtn}
                                    fullWidth
                                    onClick={() => { handleClick(item?._id); handleFolderSubFolderValue({ folderName: item?.folderName }); handleFolderId({ folderId: item?._id }) }}
                                >
                                    <img
                                        src={`/images/FolderM.png`}
                                        alt={'Project'}
                                    />
                                    <span className="f-subname text-capitalize">
                                        {item?.folderName}
                                    </span>
                                </Button>
                                {open === item?._id ? <ExpandLess /> : <ExpandMore />}
                                <ListAction folderName={item?.folderName} folderId={item?._id} />
                            </ListItem>
                            <Collapse
                                in={open === item?._id} timeout="auto" unmountOnExit>
                                <List>
                                    {
                                        item?.subFolder?.map((subitem) => {
                                            return (
                                                <ListItem
                                                    button
                                                    onClick={() => {
                                                        history.subtaskFolderId = subitem?._id
                                                        handleFolderSubFolderValue({ subFolderName: subitem?.subFolderName, subFolderId: subitem?._id });
                                                        tableDataFilter(subitem)
                                                    }}
                                                    key={subitem?._id}
                                                    className={history.subtaskFolderId === subitem?._id ? classes.activeMainFolder : classes.inActiveFolder}
                                                >
                                                    <Button className={classes.folderBtn} fullWidth>
                                                        <div className="f-subname">
                                                            <img
                                                                src="/images/FolderS.png"
                                                                alt={'Project'}
                                                            />
                                                            <span className="f-subnam text-capitalize">
                                                                {subitem?.subFolderName}
                                                            </span>
                                                        </div>
                                                    </Button>
                                                    <SubListAction subFolderName={subitem?.subFolderName} subFolderId={subitem?._id} />
                                                </ListItem>
                                            );
                                        })}
                                    <div className="p-1" style={{ paddingTop: "0 !important" }}>
                                        <Chip
                                            size="small"
                                            icon={<AddIcon style={{ color: "#fff" }} />}
                                            label={<b>ADD SUBLIST</b>}
                                            onClick={handleSubFolderForm}
                                            style={{ background: "#2796f3", color: "#ffff" }}
                                        // disabled={activeMainFolder?.adminId !== undefined && userinformation?.role === 0 ? true : false}
                                        />
                                        <Dialog open={openSubFolderForm} onClose={() => { setOpenSubFolderForm(false) }}>
                                            <DialogContent>
                                                <Typography>ADD SUBLIST</Typography>
                                                <form>
                                                    <Input style={{ width: 300 }}  onChange={handleOnChange}
                                                        placeholder='Sub List Name'
                                                    />
                                                    <div className="d-flex justify-content-end align-items-center mt-2">
                                                        <Button
                                                            className="mr-50"
                                                            style={{
                                                                color: "#6b6b6b",
                                                                height: 30,
                                                                borderRadius: "4px",
                                                                // width: "0px",
                                                                border: "1px solid #b8c2cc",
                                                            }}
                                                            onClick={() => { setOpenSubFolderForm(false) }}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            style={{
                                                                color: "#fff",
                                                                height: 30,
                                                                background: "#0184FF",
                                                                borderRadius: "4px",
                                                                // width: "90px",
                                                            }}
                                                            onClick={() => { handleSubmit() }}
                                                        >
                                                            Save
                                                        </Button>
                                                    </div>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </List>
                            </Collapse>
                        </Fragment>
                    )
                })
            }

        </Fragment >
    )
}


// GET_TASK_FOLDER_LIST

const mapStateToProps = (state) => {
    return {
        taskFolderList: state?.TaskAndGoalsTaskReducer?.taskFolderList,
        breadCrumbValue: state?.TaskAndGoalsTaskReducer?.breadCrumbValue,

    };
};
export default connect(mapStateToProps, {
    GET_TASK_FOLDER_LIST,
    CREATE_TASK_SUB_FOLDER,
    ADD_BREAD_CRUMB,
    TASK_TO_DISPLAY_TO_USER,
    GET_TODAY_TASK_LIST
})(ProjectListing);
