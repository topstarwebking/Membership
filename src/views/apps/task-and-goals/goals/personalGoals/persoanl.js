import React from 'react';
import GoalCard from './Card';
import { connect } from 'react-redux';


const PersonalGoals = (props) => {
    const { setViewSubGoals, viewSubGoals, personalGoals } = props
    return (
        <div className='w-100 goalsList-grid'>
            {
                personalGoals?.map((item, i) => {
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
        personalGoals: state?.TaskAndGoalsGoalReducer?.personalGoals
    };
};
export default connect(mapStateToProps, {})(PersonalGoals);