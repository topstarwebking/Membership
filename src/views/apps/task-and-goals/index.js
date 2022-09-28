import React from "react";
// import { useParams } from 'react-router-dom';
import TaskAndGoalsHeader from "./components/header";
import TaskAndGoalsSidebar from './components/sidebar'
import TaskAndGoalsLayout from "./layout";
import './task-and-goals.css'

const TaskAndGoalsMain = (props) => {
    // const { featureType, filtertype } = useParams()

    return (
        <div>
            <TaskAndGoalsHeader />
            <div className="d-flex justify-content-start pt-1">
                <div style={{ width: 320 }}>
                    <TaskAndGoalsSidebar />
                </div>
                <TaskAndGoalsLayout />
            </div>
        </div>
    )
}

export default TaskAndGoalsMain;