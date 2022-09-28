import { CardContent, Typography } from '@material-ui/core';
import React from 'react';
import { Card } from 'reactstrap';
import Action from './action';
import { CreateStatus } from './Status'
import CircularProgressWithBackGround from './CircleProgressBar';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import GoalsCalender from './GoalsCalender';

const GoalCard = (props) => {
    const { item, setViewSubGoals } = props

    return (
        <div style={{ padding: '8px' }}>
            <Card className='shadow-sm rounded mb-0' style={{ borderTop: `6px solid ${item?.color}` }}>
                <CardContent className='d-flex justify-content-between p-0'>
                    <div style={{ padding: 10, paddingRight: '0px' }} className='w-100'>
                        <div className='d-flex justify-content-between align-items-center cursor-pointer'>
                            <div onClick={() => { setViewSubGoals(item) }} className='d-flex justify-content-start align-items-center'>
                                <CircularProgressWithBackGround
                                    showPercentage={true}
                                    size={40}
                                    color={item?.color}
                                    value={item?.total}
                                    variant="determinate"
                                />
                                <Typography className='ml-1 mb-0 cursor-pointer' style={{ color: item?.color }}>{item?.title}</Typography>
                            </div>
                            <div className='p-1' style={{ height: 'auto' }}>
                                <Action item={item}/>
                            </div>

                        </div>
                        <div className='d-flex justify-content-between align-items-center' style={{ width: '95%' }}>
                            <div className='d-flex align-items-center'>
                                <div style={{ width: 'auto' }}>
                                    <GoalsCalender item={item} />
                                </div>
                                <div onClick={() => { setViewSubGoals(item) }} className='d-flex align-items-center cursor-pointer'>
                                    <PlayArrowIcon fontSize='small' style={{ color: '#4F4F4F', float: 'left' }} />
                                    <span style={{ fontSize: '12px' }}>{item?.subGoals?.length} Sub Goals</span>
                                </div>

                            </div>
                            {/* <div>
                                <CreateStatus />
                            </div> */}
                        </div>
                    </div>

                </CardContent>
            </Card>

        </div>
    )
}

export default GoalCard;