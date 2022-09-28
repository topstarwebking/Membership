
import { List, ListItem, Chip, Typography } from '@material-ui/core';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import AddProject from '../addProject/addProject';
import ProjectListing from '../addProject/projectlisting';

const TaskAndGoalsSidebar = () => {
    const { featureType,
        filtertype
    } = useParams()

    return (
        <div className='p-1' style={{ background: '#fff', borderRadius: '6px' }}>
            <List dense style={{ height: '78vh' }}>
                <Typography  style={{ fontSize: 16, color:'#252525' }} className="pl-1">Select One</Typography>
                <ListItem className='border-top' style={{ paddingLeft: 8 }} component={Link} to={`/app/task-and-goals/task/all/taskonly`}>
                    <Chip
                        style={{ fontSize: 14 }}
                        className='bg-transparent cursor-pointer'
                        icon={featureType === 'task' ? <FiberManualRecordIcon style={{
                            color: '#0184FF'
                        }} fontSize='small' /> : <RadioButtonUncheckedIcon fontSize='small' />} label='Tasks' />
                </ListItem>
                <ListItem style={{ paddingLeft: 8 }} component={Link} to={`/app/task-and-goals/goals/all/Mymember`}>
                    <Chip
                        style={{ fontSize: 14 }}
                        className='bg-transparent cursor-pointer mb-1'
                        icon={featureType === 'goals' ? <FiberManualRecordIcon style={{
                            color: '#0184FF'
                        }} fontSize='small' /> : <RadioButtonUncheckedIcon fontSize='small' />} label='Goals' />
                </ListItem>
                <Typography  style={{ fontSize: 16, color:'#252525' }} className="pl-1">Select {featureType === 'task' ? "Task" : "Goals"}</Typography>
                <ListItem className='border-top pt-1'>
                    <AddProject type='mainFolder' title='ADD TO-DO LIST' />
                </ListItem>
                <ProjectListing />
            </List>
        </div>
    )
}

export default TaskAndGoalsSidebar;
