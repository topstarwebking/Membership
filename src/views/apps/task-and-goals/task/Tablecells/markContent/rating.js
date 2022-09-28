import { Chip, CircularProgress } from '@material-ui/core'
import React, { useState } from 'react'
import { connect } from "react-redux";
import { EDIT_TASK, EDIT_TASK_WITHOUT_GONE_INTO_FOLDER } from "../../../../../../redux/actions/task-and-goals/task"
import { useHistory } from 'react-router-dom';



function MarkRating(props) {
  const { row, EDIT_TASK, EDIT_TASK_WITHOUT_GONE_INTO_FOLDER } = props;
  const [loading, setLoading] = useState(null)
  const history = useHistory()

  const handleSubmit = async (e) => {
    if (row?.subfolderId?._id !== undefined) {
      await EDIT_TASK_WITHOUT_GONE_INTO_FOLDER({ ...row, rating: e, status: "Completed" }, { _id: row?._id })
      setLoading(null)
    } else {
      await EDIT_TASK({ ...row, rating: e, status: "Completed" }, { _id: row?._id }, history?.maintaskFolderId, history?.subtaskFolderId)
      setLoading(null)
    }

    // if (e === 1){
    //   setLoading(null)
    // }else if(e===2){
    //   await EDIT_TASK({...row, rating: e,status:"Completed"},{_id: row?._id}, history?.maintaskFolderId, history?.subtaskFolderId)
    //   setLoading(null)
    // }else if (e===3){
    //   await EDIT_TASK({...row, rating: e,status:"Completed"},{_id: row?._id}, history?.maintaskFolderId, history?.subtaskFolderId)
    //   setLoading(null)
    // }else if (e===4){
    //   await EDIT_TASK({...row, rating: e,status:"Completed"},{_id: row?._id}, history?.maintaskFolderId, history?.subtaskFolderId)
    //   setLoading(null)
    // }else if (e===5){
    //   await EDIT_TASK({...row, rating: e,status:"Completed"},{_id: row?._id}, history?.maintaskFolderId, history?.subtaskFolderId)
    //   setLoading(null)
    // }

  }
  return (
    <div>
      <Chip
        size='small'
        style={{
          color: row?.rating >= 1 ? "#fff" : "#2896f3",
          border: '1px solid #2896f3',
          backgroundColor: row?.rating >= 1 ? "#2896f3" : "#fff",
          borderRight: row?.rating >= 1 ? "1px solid #fff" : "1px solid #2896f3",
          borderRadius: '0px'
        }}
        label={loading === 1 ? <CircularProgress style={{ color: '#909090', width: '8px', height: '8px' }} /> : "1"}
        onClick={() => {
          handleSubmit(1)
          setLoading(1)
        }}
      />
      <Chip
        size='small'
        style={{
          color: row?.rating >= 2 ? "#fff" : "#2896f3",
          border: '1px solid #2896f3',
          backgroundColor: row?.rating >= 2 ? "#2896f3" : "#fff",
          borderRight: row?.rating >= 2 ? "1px solid #fff" : "1px solid #2896f3",
          borderRadius: '0px'
        }}
        label={loading === 2 ? <CircularProgress style={{ color: '#909090', width: '8px', height: '8px' }} /> : "2"}
        onClick={() => {
          handleSubmit(2)
          setLoading(2)
        }}
      />
      <Chip
        size='small'
        style={{
          color: row?.rating >= 3 ? "#fff" : "#2896f3",
          border: '1px solid #2896f3',
          backgroundColor: row?.rating >= 3 ? "#2896f3" : "#fff",
          borderRight: row?.rating >= 3 ? "1px solid #fff" : "1px solid #2896f3",
          borderRadius: '0px'
        }}
        label={loading === 3 ? <CircularProgress style={{ color: '#909090', width: '8px', height: '8px' }} /> : "3"}
        onClick={() => {
          handleSubmit(3)
          setLoading(3)
        }}
      />
      <Chip
        size='small'
        style={{
          color: row?.rating >= 4 ? "#fff" : "#2896f3",
          border: '1px solid #2896f3',
          backgroundColor: row?.rating >= 4 ? "#2896f3" : "#fff",
          borderRight: row?.rating >= 4 ? "1px solid #fff" : "1px solid #2896f3",
          borderRadius: '0px'
        }}
        label={loading === 4 ? <CircularProgress style={{ color: '#909090', width: '8px', height: '8px' }} /> : "4"}
        onClick={() => {
          handleSubmit(4)
          setLoading(4)
        }}
      />
      <Chip
        size='small'
        style={{
          color: row?.rating >= 5 ? "#fff" : "#2896f5",
          border: '1px solid #2896f3',
          backgroundColor: row?.rating >= 5 ? "#2896f3" : "#fff",
          borderRadius: '0px'
        }}
        label={loading === 5 ? <CircularProgress style={{ color: '#909090', width: '8px', height: '8px' }} /> : "5"}
        onClick={() => {
          handleSubmit(5)
          setLoading(5)
        }}
      />

    </div>
  )
}

export default connect(null, { EDIT_TASK, EDIT_TASK_WITHOUT_GONE_INTO_FOLDER })(MarkRating);
