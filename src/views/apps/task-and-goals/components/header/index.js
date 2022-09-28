import React from "react";
import { useParams } from 'react-router-dom';
import { Grid, InputBase } from "@material-ui/core";
import { Search } from "react-feather";
import BreadCrumbs from "../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import AddGoals from "../../goals/AddGoals";
import { connect } from "react-redux";
import AddTask from "../../task/AddTask";
import Collaborators from "./Collaborators";

const TaskAndGoalsHeader = (props) => {
    const { breadCrumbValue } = props
    const { featureType, filtertype } = useParams()
    const handleChange = (e) => {
        // props?.TASK_AND_GOALS_SEARCH_FOR_TASK(e.target?.value)
    }
    return (
        <div className="pt-1">
            <Grid container spacing={2}>
                <Grid item sm={6} lg={7} md={7}>
                    {
                        featureType === 'task' ?
                            <BreadCrumbs
                                breadCrumbTitle="Task and Goals"
                                breadCrumbParent={<span className="text-capitalize">{featureType}</span>}
                            // breadCrumbParent2={<span className="text-capitalize">{breadCrumbValue[0]?.folderName}</span>}
                            // breadCrumbActive={<span className="text-capitalize">{breadCrumbValue[0]?.subFolderName}</span>}
                            /> : <BreadCrumbs
                                breadCrumbTitle=""
                                breadCrumbParent={<span className="text-capitalize">{featureType}</span>}
                                breadCrumbActive={<span className="text-capitalize">{filtertype}</span>}
                            />
                    }

                </Grid>
                <Grid item sm={6} lg={5} md={5}>
                    <div className="d-flex justify-content-between">
                        <Collaborators />
                        <div className="d-flex pl-1">
                            <div className="goal-search-box d-flex align-items-center pl-1 pr-1">
                                <InputBase
                                    className="w-100"
                                    onChange={handleChange}
                                    type="text"
                                    placeholder={`Search ${featureType}`}
                                />
                                <Search size={18} color="#878787" />
                            </div>
                            <div>
                                {featureType === 'task' ? <AddTask /> : <AddGoals />}
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        breadCrumbValue: state?.TaskAndGoalsTaskReducer?.breadCrumbValue,
    };
};
export default connect(mapStateToProps, null)(TaskAndGoalsHeader);


