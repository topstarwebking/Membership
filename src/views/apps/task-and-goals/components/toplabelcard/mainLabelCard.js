// import React from 'react';
// import { Card, CardContent, Typography } from '@material-ui/core';
// import { useParams } from 'react-router-dom';
// import { connect } from "react-redux";
// import { EventNote } from '@material-ui/icons';


// const MainLabelCard = (props) => {
//     const { item, taskToDisplayToUser } = props
//     const { featureType, filtertype } = useParams()

//     return (
//         <Card className='shadow-sm rounded'>
//             <CardContent className='p-1'>
//                 <Typography className='text-capitalize' style={{ fontSize: 16, color: '#AAAAAA' }}><b>Today {featureType}</b></Typography>
//                 <div className='d-flex justify-content-between align-items-center'>
//                     <Typography style={{ fontSize: 16 }} className='mb-0'><b>{ }%</b></Typography>
//                     <div className="sch-icon" style={{ backgroundColor: "#f1dfff" }}>
//                         <EventNote style={{ color: "#ce41ff" }} />
//                     </div>
//                 </div>
//             </CardContent>
//             <CardContent className='p-1'>
//                 <Typography className='text-capitalize' style={{ fontSize: 16, color: '#AAAAAA' }}><b>Completed {featureType}</b></Typography>
//                 <div className='d-flex justify-content-between align-items-center'>
//                     <Typography style={{ fontSize: 16 }} className='mb-0'><b>{ }%</b></Typography>
//                     <div className="sch-icon" style={{ backgroundColor: "#f1dfff" }}>
//                         <EventNote style={{ color: "#ce41ff" }} />
//                     </div>
//                 </div>
//             </CardContent>
//             <CardContent className='p-1'>
//                 <Typography className='text-capitalize' style={{ fontSize: 16, color: '#AAAAAA' }}><b>Not Completed {featureType}</b></Typography>
//                 <div className='d-flex justify-content-between align-items-center'>
//                     <Typography style={{ fontSize: 16 }} className='mb-0'><b>{ }%</b></Typography>
//                     <div className="sch-icon" style={{ backgroundColor: "#f1dfff" }}>
//                         <EventNote style={{ color: "#ce41ff" }} />
//                     </div>
//                 </div>
//             </CardContent>
//             <CardContent className='p-1'>
//                 <Typography className='text-capitalize' style={{ fontSize: 16, color: '#AAAAAA' }}><b>Score {featureType}</b></Typography>
//                 <div className='d-flex justify-content-between align-items-center'>
//                     <Typography style={{ fontSize: 16 }} className='mb-0'><b>{ }%</b></Typography>
//                     <div className="sch-icon" style={{ backgroundColor: "#f1dfff" }}>
//                         <EventNote style={{ color: "#ce41ff" }} />
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>
//     )
// }

// const mapStateToProps = (state) => {
//     return {
//         taskToDisplayToUser: state?.TaskAndGoalsTaskReducer?.taskToDisplayToUser,
//     };
// };
// export default connect(mapStateToProps, null)(MainLabelCard);


