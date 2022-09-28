import React, { useState } from 'react';
import DataTable from "react-data-table-component";
import { Card, CardContent, Chip } from '@material-ui/core';
import { columns } from './columnSubGoalData';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Plus } from "react-feather";
import AddSubGoalsDailog from './AddSubGoal';

const customStyles = {
    title: {
        style: {
            fontWeight: '900',
        }
    },
    headCells: {
        style: {
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#4F4F4F',
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
        },
    },
};

const SubGoalsTable = (props) => {
    const { viewSubGoals, setViewSubGoals } = props
    const [open, setOpen] = useState(false)

    // const [selectedState, setSelectedState] = useState({})

    const backToMainGoals = () => {
        setViewSubGoals(null)
    }
    const handleOpenSubGoalForm = () => {
        setOpen(!open)
    }


    return (

        <div>
            <div className='pb-1 d-flex justify-content-between'>
                <Chip style={{ fontSize: '1rem', color: viewSubGoals.color, fontWeight: 'bold' }}
                    onClick={backToMainGoals}
                    className='bg-transparent'
                    label={viewSubGoals?.title}
                    icon={<ArrowBackIcon style={{ color: viewSubGoals.color }} />} />
                <Chip
                    icon={<Plus size={16} style={{ color: '#fff' }} />}
                    className="ml-1"
                    label='Sub Goal'
                    onClick={handleOpenSubGoalForm}
                    style={{
                        color: "#fff",
                        background: "#0184FF",
                        borderRadius: "4px",
                        fontSize: '13px',
                    }}
                />
            </div>

            <Card className='rounded'>
                <CardContent>
                    {/* {
                    selectedState?.selectedCount &&
                    <div className='d-flex justify-content-end align-items-center'>
                        <Typography className='mb-0'>Selected Rows {selectedState?.selectedCount}</Typography>

                        <IconButton className='rounded-circle' onClick={deleteRows}>
                            <DeleteForever />
                        </IconButton>
                    </div>
                } */}

                    <DataTable
                        columns={columns}
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[
                            10, 50, 100,
                        ]}
                        data={viewSubGoals.subGoals}
                        noHeader
                        defaultSortField="id"
                        defaultSortAsc={false}
                        pagination
                        selectableRows
                        // onSelectedRowsChange={handleSelectRows}
                        highlightOnHover
                        customStyles={customStyles}
                    />
                </CardContent>
            </Card>
            <AddSubGoalsDailog open={open} viewSubGoals={viewSubGoals} handleOpenSubGoalForm={handleOpenSubGoalForm} />
        </div>
    )
}
export default SubGoalsTable


