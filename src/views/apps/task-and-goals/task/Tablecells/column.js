import { Avatar, Chip, Typography } from '@material-ui/core'
import React from 'react'
import MakeAction from './makeAction';
import MarkStatus from './markStatus';
import CreateStatus from './createStatus';
import PriorityStatus from './PriorityStatus';
import moment from 'moment';
import ListSubList from './listSubList';


export const columns = [
    {
        name: "Task Info",
        selector: row => ["name"],
        sortable: true,
        width: '200px',
        id: "task-info-name",
        style: {
            display: "flex",
            justifyContent: "start",
        },

        cell: (row) => (
            <div>
                <span className='text-capitalize' style={{ fontSize: '14px' }}>{row?.name} </span>
                {/* <div className='d-flex align-items-center'>
                    <p className='my-0' style={{ fontSize: '12px' }}>
                        {row?.status === 'Completed' ? `${moment(row?.start_time).format("hh:mm A")} to ${moment(row?.end_time).format("hh:mm A")}` : ""}
                    </p>
                </div> */}
            </div>)
    },
    {
        name: "TO-DO LIST",
        selector: row => ["path"],
        // sortable: true,
        id: "path-list",
        width: "120px",
        style: {
            display: "flex",
            justifyContent: "start",
        },
        cell: (row) => (
            <ListSubList row={row} />
        ),
    },
    {
        name: "Priority",
        selector:row => ["priority"],
        // sortable: true,
        width: '100px',
        style: {
            display: 'flex',
            // justifyContent: 'center'
        },
        cell: (row) => (
            <PriorityStatus row={row} />
        ),
    },
    {
        name: "Label",
        selector:row => ["label"],
        // sortable: true,
        width: '100px',
        style: {
            display: 'flex',
            justifyContent: 'center',
        },
        cell: (row) => (
            <Chip size='small'
                label={row?.label}
                className='text-capitalize rounded rounded'
                style={{ fontWeight: 'bold', background: 'rgba(1, 132, 255, 0.15)', color: '#0184FF' }} />),

    },
    {
        name: "Due Date",
        selector:row => ["due_date"],
        // sortable: true,
        width: '120px',
        style: {
            display: 'flex',
            justifyContent: 'center'
        },
        cell: (row) => (

            <span style={{ fontSize: '14px' }}>{moment(row?.end).format("MM/DD/yyyy")} </span>
        ),
    },
    {
        name: "Mark",
        selector:row => ["status"],
        // sortable: false,
        width: '160px',
        cell: (row) => (
            <MarkStatus row={row} />
        ),
        style: {
            display: 'flex',
            justifyContent: 'center',

        },
    },
    {
        name: "Assignee Activity",
        selector:row => ["assignee"],
        sortable: true,
        width: '180px',
        id: "assignee-activity",
        style: {
            display: 'flex',
            justifyContent: 'start',
        },
        cell: (row) => (<div className='d-flex align-items-center'>
            {/* <Avatar style={{ width: '30px', height: '30px' }}
                className='mr-1'
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJymxLCUS6L4bTWWhPEjMvq4A8Z8W9bOLxYtN83iV-Aak2gNHRh8pZQ8nChu_lUzVPnhc&usqp=CAU' alt='Aignee' /> */}
            <div >
                <p className='mb-0 text-capitalize'>{row?.assign}</p>
                <div className='d-flex mb-0'>
                    <p className=' ' style={{ fontSize: '12px' }}>{row?.status !== 'Completed' ? "No Activity" : moment(row?.updatedAt).format('MM/DD/YYYY')}</p>
                    <p className='' style={{ fontSize: '12px', paddingLeft: '5px' }}>{row?.status === 'Completed' ? moment(row?.updatedAt).format('hh:mm A') : ''}</p>
                </div>
            </div>
        </div>
        )
    },
    {
        name: "Status",
        selector:row => ["status"],
        sortable: true,
        width: '100px',
        style: {
            display: 'flex',
            justifyContent: 'center',
        },
        cell: (row) => (<CreateStatus row={row} />),

    },
    {
        name: "Action",
        selector:row => ["status"],
        sortable: false,
        width: '80px',
        style: {
            display: 'flex',
            justifyContent: 'center',
        },
        cell: (row) => (
            <MakeAction row={row} />
        )
    },

]