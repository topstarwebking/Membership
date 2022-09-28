import React from 'react';
import { Plus } from 'react-feather';
import GoalCard from './GoalsCard';
import { connect } from 'react-redux';


const ListOfGoalsCard = (props) => {
    const { setViewSubGoals, viewSubGoals, goalsList } = props
    return (
        <div className='w-100 goalsList-grid'>
            {
                goalsList?.map((item, i) => {
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
        goalsList: state?.TaskAndGoalsGoalReducer?.goalList
    };
};
export default connect(mapStateToProps, {})(ListOfGoalsCard);


// const listGoalsCard = [
//     {
//         color: '#0184FF',
//         title: 'Health',
//         total: 10,
//         subGoals: [
//             {
//                 id: 1,
//                 name: 'Title of sub goal',
//                 end: '10/20/2022',
//                 start: '10/20/2022',
//                 DueDate: '10/20/2022',
//                 Status: 'inprogress', // inComplete , Completed, Inprogress, Pending
//             },
//             {
//                 id: 2,
//                 name: 'Title of task',
//                 DueDate: '10/20/2022',
//                 Status: 'completed', // inComplete , Completed, Inprogress, Pending
//             }, {
//                 id: 3,
//                 name: 'Title of task',
//                 DueDate: '10/20/2022',
//                 Status: 'inprogress', // inComplete , Completed, Inprogress, Pending
//             }, {
//                 id: 4,
//                 name: 'Title of task',
//                 DueDate: '10/20/2022',
//                 Status: 'completed', // inComplete , Completed, Inprogress, Pending
//             }, {
//                 id: 5,
//                 name: 'Title of task',
//                 DueDate: '10/20/2022',
//                 Status: 'pending', // inComplete , Completed, Inprogress, Pending
//             },
//         ]
//     },
//     {
//         color: '#FF9A02',
//         title: 'Education',
//         total: 80,
//         subGoals: [
//             {
//                 id: 1,
//                 name: 'Title of task',
//                 DueDate: '10/20/2022',
//                 Status: 'pending', // inComplete , Completed, Inprogress, Pending
//             }, {
//                 id: 2,
//                 name: 'Home of task',
//                 DueDate: '10/20/2022',
//                 Status: 'completed', // inComplete , Completed, Inprogress, Pending
//             }, {
//                 id: 3,
//                 name: 'Event of task',
//                 DueDate: '10/20/2022',
//                 Status: 'inprogress', // inComplete , Completed, Inprogress, Pending
//             }, {
//                 id: 4,
//                 name: 'Office of task',
//                 DueDate: '10/20/2022',
//                 Status: 'inprogress', // inComplete , Completed, Inprogress, Pending
//             }, {
//                 id: 5,
//                 name: 'Title of task',
//                 DueDate: '10/20/2022',
//                 Status: 'completed', // inComplete , Completed, Inprogress, Pending
//             }, {
//                 id: 6,
//                 name: 'Title of task',
//                 DueDate: '10/20/2022',
//                 Status: 'completed', // inComplete , Completed, Inprogress, Pending
//             },
//         ]
//     },
//     {
//         color: '#403F91',
//         title: 'Business',
//         total: 65,
//         subGoals: [
//             {
//                 id: 1,
//                 name: 'Title of task',
//                 DueDate: '10/20/2022',
//                 Status: 'pending', // inComplete , Completed, Inprogress, Pending
//             }, {
//                 id: 2,
//                 name: 'Title of Personal',
//                 DueDate: '10/20/2022',
//                 Status: 'inprogress', // inComplete , Completed, Inprogress, Pending
//             }, {
//                 id: 3,
//                 name: 'Other of task',
//                 DueDate: '10/02/2022',
//                 Status: 'completed', // inComplete , Completed, Inprogress, Pending
//             }, {
//                 id: 4,
//                 name: 'Event of task',
//                 DueDate: '10/20/2022',
//                 Status: 'incomplete', // inComplete , Completed, Inprogress, Pending
//             },
//         ]
//     }
// ]