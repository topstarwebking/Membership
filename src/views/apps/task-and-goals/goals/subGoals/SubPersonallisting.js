import React, { useState } from 'react';
import { Chip, Grid } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Plus } from "react-feather";
import SubPersoanlGoalCard from './subPersonalCard';
import AddSubGoalsDailog from './../AddSubGoal';

const SubPersonalGoals = (props) => {
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
                <Chip style={{ fontSize: '1rem', color: viewSubGoals?.color, fontWeight: 'bold' }}
                    onClick={backToMainGoals}
                    className='bg-transparent'
                    label={viewSubGoals?.title}
                    icon={<ArrowBackIcon style={{ color: viewSubGoals?.color }} />} />
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
            <Grid container spacing={1}>
                {
                    viewSubGoals?.subGoals?.map((item, i) => {
                        return (
                            <Grid item sm={12} md={6} lg={6} key={i}>
                                <SubPersoanlGoalCard color={viewSubGoals?.color} item={item} />
                            </Grid>

                        )
                    })
                }
            </Grid>
            <AddSubGoalsDailog open={open} item={viewSubGoals} handleOpenSubGoalForm={handleOpenSubGoalForm} />
        </div>
    )
}
export default SubPersonalGoals


