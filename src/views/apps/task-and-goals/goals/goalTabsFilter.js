import React from 'react';
import {
    Nav,
    NavItem,
    NavLink
} from 'reactstrap'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    activetab: {
        color: '#0184FF !important',
        borderBottom: '2px solid #0184FF !important'
    },
    inActiveTab: {
        color: '#AAAAAA !important'
    }
})

const GoalTabFilter = (props) => {
    const classes = useStyles()
    const { 
        //featureType, filtertype, 
        otherFilter } = useParams()

    return (
        <Nav style={{ borderBottom: '1px solid #E7E7E7',boxShadow:'none' }} tabs>
            <NavItem>
                <NavLink
                    tag={Link}
                    to='/app/task-and-goals/goals/all/Mymember'
                    className={otherFilter === "Mymember" ? classes?.activetab : classes.inActiveTab}
                >
                    Mymember
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    tag={Link}
                    to='/app/task-and-goals/goals/all/Personal'
                    className={otherFilter === "Personal" ? classes?.activetab : classes.inActiveTab}
                >
                    Personal
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    tag={Link}
                    to='/app/task-and-goals/goals/all/Setting'
                    className={otherFilter === "Setting" ? classes?.activetab : classes.inActiveTab}
                >
                    Setting
                </NavLink>
            </NavItem>
        </Nav>
    )
}
export default GoalTabFilter;
