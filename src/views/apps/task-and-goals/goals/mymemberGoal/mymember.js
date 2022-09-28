import React from 'react';
import GoalCard from './Card';
import { connect } from 'react-redux';


const MymemberGoals = (props) => {
    const { setViewSubGoals, viewSubGoals, mymemberGoals } = props
    return (
        <div className='w-100 goalsList-grid'>
            {
                mymemberGoals?.map((item, i) => {
                    return (
                        <GoalCard setViewSubGoals={setViewSubGoals} item={item} key={i} />
                    )
                })
            }
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        mymemberGoals: state?.TaskAndGoalsGoalReducer?.mymemberGoals
    };
};
export default connect(mapStateToProps, {})(MymemberGoals);