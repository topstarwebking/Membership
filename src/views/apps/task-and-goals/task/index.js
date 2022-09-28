import React from "react";
import TaskFilter from "./TaskFilter";
import Tasktable from "./taskTable";
const TaskMain = () => {
    // const { featureType, filtertype } = useParams()

    return (
        <div>
          <TaskFilter/>
          <Tasktable />
        </div>
    )
}

export default TaskMain;