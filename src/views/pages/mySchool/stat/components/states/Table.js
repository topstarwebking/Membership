import React, { useState, useEffect, Fragment } from 'react';
import { CustomInput } from "reactstrap"
import "./style.css"
import { GET_LEAD_DATA } from '../../../../../../redux/actions/statictics';
import { connect, useDispatch } from "react-redux";

function DataTable(props) {
    const [yearNum, setYearNum] = useState(years[0]);
    const [studentTypes, setStudentTypes] = useState("All");


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GET_LEAD_DATA({
            studentType: studentTypes,
            year: yearNum,
        }))
    }, [GET_LEAD_DATA, studentTypes, yearNum])

    const handleYear = (e) => {
        setYearNum(e.target.value)
    }
    const handleEventType = (e) => {
        setStudentTypes(e.target.value);
    };

    const totalMonthlyCounts = new Array(13).fill(0)


    const leadsMonthlyCounts = props.getLeadData?.data?.reduce((prev, elem) => {
        if (!prev[elem.lead]) {
            prev[elem.lead] = []
        }
        prev[elem.lead].push(elem)
        return prev
    }, {}) || {}


    return (
        <>
            <div className="d-flex justify-content-between align-items-center ml-auto mt-5">
                <div>
                    <h4>Lead Statistics</h4>

                </div>

                <div className='d-flex'>

                    <div className="mr-1">
                        <CustomInput
                            type="select"
                            name="select"
                            id="select"
                            onChange={handleEventType}
                        >
                            <option value="All">All</option>
                            <option value="Active Student">Active Members</option>
                            <option value="Active Trial">Active Trial</option>
                            <option value="Former Student">Former Student</option>
                            <option value="Former Trial">Former Trial</option>
                            <option value="Leads">Leads</option>
                        </CustomInput>

                    </div>
                    <div>
                        <CustomInput
                            onChange={handleYear}
                            type="select"
                            id="years"
                        >
                            {years?.map((m, i) => {
                                return <option key={i}>{m}</option>;
                            })}
                        </CustomInput>
                    </div>
                </div>

            </div>
            <div className='card mt-1'>
                <table className="table-01">
                    <tbody>
                        <tr>
                            <th>Source</th>
                            {
                                months?.map((month) => {
                                    return <th key={month}>{month}</th>
                                })
                            }
                            <th>Total</th>
                        </tr>
                        {
                            Object.keys(leadsMonthlyCounts)?.map((leadName) => {
                                const monthlyCounts = new Array(12).fill(0)
                                leadsMonthlyCounts[leadName].forEach(monthlyCount => {
                                    monthlyCounts[monthlyCount.month - 1] = monthlyCount.count
                                    totalMonthlyCounts[monthlyCount.month - 1] += monthlyCount.count
                                })
                                return (
                                    <tr key={leadName}>
                                        <th>{leadName}</th>
                                        {monthlyCounts?.map((count,i) => { return (<td key={i}>{count}</td>) })}
                                        <td>{leadsMonthlyCounts[leadName].reduce((prev, elem) => prev + elem.count, 0)}</td>
                                    </tr>
                                )
                            })
                        }

                        {
                            props.getLeadData?.leads?.map(el => {
                                const monthlyCounts = new Array(13).fill(0)

                                return (
                                    <tr key={el}>
                                        <th>{el}</th>
                                        {monthlyCounts.map((count,i) => {
                                            return (<td key={i}>{count}</td>)
                                        })}
                                    </tr>
                                )
                            })
                        }

                        <tr>
                            <th>Total</th>
                            {totalMonthlyCounts?.map((count, i) => {
                                return (<td key={i}>{count}</td>)
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
        </>

    );
}
const mapStateToProps = (state) => {
    return {
        getLeadData: state.statictics.getLeadData,
    };
};

export default connect(mapStateToProps, { GET_LEAD_DATA })(DataTable);

const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
