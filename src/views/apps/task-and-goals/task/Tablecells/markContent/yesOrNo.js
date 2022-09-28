import { Chip, makeStyles, Dialog, DialogContent } from '@material-ui/core'
import React, { useState } from 'react'
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import { EDIT_TASK, EDIT_TASK_WITHOUT_GONE_INTO_FOLDER } from '../../../../../../redux/actions/task-and-goals/task'
import { CircularProgress } from '@material-ui/core'

function MarkYesOrNo(props) {
    const { row, EDIT_TASK, EDIT_TASK_WITHOUT_GONE_INTO_FOLDER } = props;
    const [loading, setLoading] = useState(null)
    const history = useHistory()

    const handleSubmit = async (e) => {
        if (row?.subfolderId?._id !== undefined) {
            await EDIT_TASK_WITHOUT_GONE_INTO_FOLDER({ ...row, yesOrNo: e === 'no' ? "No" : 'Yes', status: "Completed" }, { _id: row?._id }, history?.maintaskFolderId, history?.subtaskFolderId)
        } else {
            await EDIT_TASK({ ...row, yesOrNo: e === 'no' ? "No" : 'Yes', status: "Completed" }, { _id: row?._id }, history?.maintaskFolderId, history?.subtaskFolderId)
        }

        setLoading(null)
    }
    return (
        <div className='d-flex justify-content-start'>
            <Chip
                size='small'
                style={{ border: '1px solid #28c76f', backgroundColor: row?.yesOrNo === "Yes" ? "#28c76f" : "#fff", color: row?.yesOrNo === "Yes" ? "#fff" : "#28c76f", marginRight: 6 }}
                className='rounded'
                label={loading === 'yes' ? <CircularProgress style={{ color: '#909090', width: '18px', height: '18px' }} /> : "Yes"}
                onClick={() => {
                    setLoading('yes');
                    handleSubmit('yes');
                }}
            />
            <Chip
                size='small'
                className='rounded'
                style={{ border: '1px solid #f64757', backgroundColor: row?.yesOrNo === "No" ? "#f64757" : "#fff", color: row?.yesOrNo === "No" ? "#fff" : "#f64757" }}
                label={loading === 'no' ? <CircularProgress style={{ color: '#909090', width: '18px', height: '18px' }} /> : "No"}
                onClick={() => {
                    setLoading('no')
                    handleSubmit('no')
                }}
            />
        </div>


    )

}

export default connect(null, { EDIT_TASK, EDIT_TASK_WITHOUT_GONE_INTO_FOLDER })(MarkYesOrNo);
