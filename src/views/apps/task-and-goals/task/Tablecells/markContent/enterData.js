import { Chip, makeStyles, Dialog, DialogContent } from '@material-ui/core'
import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { X } from "react-feather";
import { Input } from 'reactstrap';
import { connect } from "react-redux";
import { EDIT_TASK,EDIT_TASK_WITHOUT_GONE_INTO_FOLDER } from "../../../../../../redux/actions/task-and-goals/task"
import ReactReadMoreReadLess from 'react-read-more-read-less';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        backgroundColor: '#0d82fa',
        color: '#ffff',
        borderRadius: '5px!important',
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));


function Enter_Data(props) {
    const { row, EDIT_TASK ,EDIT_TASK_WITHOUT_GONE_INTO_FOLDER} = props;
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [state, setState] = useState({ description: "" })
    const history = useHistory()


    const handleOnChange = (e) => {
        setState(e.target.value)
    }
    const handleSubmit = () => {
        if (row?.subfolderId?._id !== undefined) {
            EDIT_TASK_WITHOUT_GONE_INTO_FOLDER({ ...row, description: state, status: "Completed" }, { _id: row?._id },);
        } else {
            EDIT_TASK({ ...row, description: state, status: "Completed" }, { _id: row?._id }, history?.maintaskFolderId, history?.subtaskFolderId)
        }
        setOpen(!open)
    }
    const handleDilogOpen = () => {
        setOpen(!open)
    }
    return (
        <div>
            {row?.description === undefined ?
                <>
                    <div>
                        <Chip size='medium' label={'Enter Data'}
                            onClick={handleDilogOpen}
                            className='text-capitalize rounded w-100'
                            style={{ fontWeight: 'bold', background: 'rgba(1, 132, 255, 0.15)', color: '#0184FF' }} />
                    </div>
                    <Dialog
                        PaperProps={{
                            elevation: 0,
                            style: {
                                width: "400px",
                            },
                        }}
                        open={open}
                        onClose={() => { setOpen(false) }}
                    >
                        <DialogContent>
                            <div className='mb-1'>
                                <div className="d-flex justify-content-between">
                                    <h5>Enter Completion Description</h5>
                                    <div className="close-icon">
                                        <X
                                            className="cursor-pointer"
                                            size={20}
                                            onClick={() => { setOpen(false) }}
                                        />
                                    </div>
                                </div>
                                <div className='pt-1'>
                                    <Input type='textarea' rows={4} name='Description' placeholder='Add text......' onChange={handleOnChange} />
                                </div>
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
                                        onClick={() => { setOpen(false) }}
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
                                        onClick={handleSubmit}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </> :
                <ReactReadMoreReadLess
                    // ref={ReadMore}
                    className="read-more-content"
                    charLimit={15}
                    readMoreText={<b>more</b>}
                    readLessText={<b>less</b>}
                >
                    {row?.description}
                </ReactReadMoreReadLess>
            }
        </div>
    )
}
export default connect(null, { EDIT_TASK,EDIT_TASK_WITHOUT_GONE_INTO_FOLDER })(Enter_Data);
