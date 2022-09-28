import React from 'react'
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { connect } from "react-redux";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Typography } from '@material-ui/core';



const ListSubList = (props) => {
    const { row, breadCrumbValue } = props

    return (
        <div className=''>
            <Typography className='mb-0 text-capitalize' style={{fontSize: "16px" }} > <b>{breadCrumbValue[0]?.folderName}</b> </Typography>
            <Typography className='mt-0 text-capitalize' style={{fontSize: "14px" }}>{breadCrumbValue[0]?.subFolderName}</Typography>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        breadCrumbValue: state?.TaskAndGoalsTaskReducer?.breadCrumbValue,
    };
};
export default connect(mapStateToProps, null)(ListSubList);