// import {
//     GET_PROMOTE_STUDNETS,
//     SELECT_STUDENT_FOR_TEST_OR_RECOMAND,
//     DELETE_PROMOTED_STUDNETS,
//   } from "../../../../../../redux/actions/test";
//   import { Avatar, Chip, CircularProgress } from "@material-ui/core";
//   import { ArrowDown } from "react-feather";
//   import React, { Fragment, useEffect, useState } from "react";
//   import DataTable from "react-data-table-component";
//   import "react-toastify/dist/ReactToastify.css";
//   import { connect } from "react-redux";
//   import { RowSkeleton } from "./RecommendedTable";
//   import { useHistory } from "react-router-dom";
// //   import TestPaper from "./testData";
//   import ActionForEyemodal from "../../../../../../views/apps/user/list/ActionForEyemodal";
//   import ConfirmationModal from "../../../../../../components/gloabal/confirmation";
//   import moment from "moment";
//   import dataNotFoundImage from "../../../../../../assets/img/not_found.jpg";
  
//   const customStyles = {
//     headCells: {
//       style: {
//         fontSize: "1rem",
//         fontWeight: "bold",
//         color: "#4F4F4F",
//         width: "100%",
//         display: "flex",
//         justifyContent: "center",
//       },
//     },
//     columnsCell: {
//       style: {
//         fontSize: "1rem",
//         fontWeight: "bold",
//         color: "#4F4F4F",
//         width: "100%",
//         display: "flex",
//         justifyContent: "center",
//       },
//     },
//     ".gKsGGb": {
//       minWidth: "30px !important",
//       background: "red",
//     },
//   };
//   const PromateStudentsTable = (props) => {
//     const history = useHistory();
//     const [defaultAlert, setdefaultAlert] = useState(false);
//     const [selectedId, setSelectedId] = useState([]);
//     const {
//       GET_PROMOTE_STUDNETS,
//       activeEvent,
//       getpromoteStudent,
//       SELECT_STUDENT_FOR_TEST_OR_RECOMAND,
//       loader,
//     } = props;
  
//     useEffect(() => {
//       GET_PROMOTE_STUDNETS(activeEvent?._id);
//     }, [GET_PROMOTE_STUDNETS, activeEvent?._id]);
//     const handlePageChange = (page) => {
//       history.memberpage = page;
//     };
//     const handlePageRowChange = (rowCount) => {
//       history.memberrowCount = rowCount;
//     };
//     const getAllIds = (data) => {
//       let ids = [];
//       for (let item of data) {
//         ids.push(item?._id);
//       }
//       return ids;
//     };
//     const handleSelectRows = async (state) => {
//       let _ids = await getAllIds(state.selectedRows);
//       await SELECT_STUDENT_FOR_TEST_OR_RECOMAND(_ids);
//     };
//     const handleTrash = (_id) => {
//       setdefaultAlert(true);
//       setSelectedId([_id]);
//     };
//     const Handledelet = () => {
//       props.DELETE_PROMOTED_STUDNETS(selectedId, props.activeEvent?._id);
//       setdefaultAlert(false);
//     };
//     const columns = [
//       {
//         name: "Full Name",
//         selector: (row) => row.firstName,
//         sortable: true,
//         width: "150px",
//         style: {
//           display: "flex",
//           justifyContent: "flex-start",
//         },
//         cell: (row) => (
//           <div>
//             <span
//               style={{ paddingLeft: "0.8" }}
//               className="text-capitalize"
//             >{`${row.firstName} ${row.lastName}`}</span>
//           </div>
//         ),
//       },
//       {
//         selector: (row) => row.program,
//         name: "Program",
//         sortable: true,
//         width: 130,
//         style: {
//           display: "flex",
//           justifyContent: "center",
//         },
//       },
//       {
//         selector: (row) => row.current_rank_img,
//         name: "Rank",
//         sortable: true,
//         width: 130,
//         style: {
//           display: "flex",
//           justifyContent: "center",
//         },
//         cell: (row) => {
//           return (
//             <>
//               <Avatar
//                 style={{
//                   height: "2em",
//                   widht: "2em",
//                   margin: "0px",
//                   objectFit: "contain !importent",
//                 }}
//                 src={row?.current_rank_img}
//               />
//             </>
//           );
//         },
//       },
//       {
//         selector: (row) => row.next_rank_img,
//         name: "Next Rank",
//         sortable: true,
//         width: 130,
//         style: {
//           display: "flex",
//           justifyContent: "center",
//         },
//         cell: (row) => {
//           return (
//             <>
//               <Avatar
//                 style={{
//                   height: "2em",
//                   widht: "2em",
//                   margin: "0px",
//                   objectFit: "contain !importent",
//                 }}
//                 src={row?.next_rank_img}
//               />
//             </>
//           );
//         },
//       },
//       {
//         selector: (row) => row.lastPromotedDate,
//         name: "Last Promoted",
//         sortable: true,
//         width: 160,
//         style: {
//           display: "flex",
//           justifyContent: "start",
//         },
//         cell: (row) => {
//           return (
//             <>
//               <span>{moment(row?.lastPromotedDate).format("MM/DD/YYYY")}</span>
//             </>
//           );
//         },
//       },
  
//       {
//         selector: (row) => row.isPaid,
//         name: "Status",
//         sortable: true,
//         width: 100,
//         style: {
//           display: "flex",
//           justifyContent: "center",
//         },
//         cell: (row) => {
//           return (
//             <>
//               {/* {row?.isPaid ? (
//                 <Chip
//                   style={{
//                     background: "#95d998",
//                     color: "#fff",
//                     width: "40%",
//                   }}
//                   size="small"
//                   label={"Paid"}
//                 />
//               ) : (
//                 <TestPaper studentData={row} />
//               )} */}
//             </>
//           );
//         },
//       },
  
//       {
//         selector: (row) => row.Action,
//         name: "Action",
//         sortable: false,
//         width: 100,
//         style: {
//           display: "flex",
//           justifyContent: "center",
//         },
//         cell: (row) => {
//           return (
//             <>
//               <ActionForEyemodal item={row?.studentId} />
//             </>
//           );
//         },
//       },
//     ];
//     return (
//       <Fragment>
//         <div className="card m-0">
//           {loader ? (
//             <div className="my-5 text-center"><CircularProgress /></div>
//           ) : (
//             <div>
//               {getpromoteStudent === null ? (
//                 [1, 2, 3, 4, 5].map((i) => {
//                   return <RowSkeleton key={i} />;
//                 })
//               ) : (
//                 <div>
//                   {getpromoteStudent.length === 0 ? <img src={dataNotFoundImage} style={{width:"200px",display:"block",margin:"auto"}}/>:null}
//                 <DataTable
//                   responsive={true}
//                   columns={columns}
//                   paginationPerPage={5}
//                   onChangePage={handlePageChange}
//                   onChangeRowsPerPage={handlePageRowChange}
//                   paginationRowsPerPageOptions={[5, 10, 50, 100, 150]}
//                   data={ getpromoteStudent ||[]}
//                   noHeader
//                   defaultSortDirection={"asc"}
//                   defaultSortField="firstName"
//                   defaultSortAsc={true}
//                   pagination
//                   sortIcon={<ArrowDown style={{ color: "#bababa" }} />}
//                   selectableRows
//                   onSelectedRowsChange={handleSelectRows}
//                   highlightOnHover
//                   customStyles={customStyles}
//                 />
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//         <ConfirmationModal
//           primaryColor="#0483fd"
//           secondaryColor="#fff"
//           imagePath="/images/delete.png"
//           open={defaultAlert}
//           title="Delete Location?"
//           onConfirm={Handledelet}
//           onCancel={() => {
//             setdefaultAlert(false);
//           }}
//           onCancelButtonTitle={"Cancel"}
//           contiunuebuttonTitle={"Delete"}
//           description=" Are you sure you want to Delete it ?"
//         />
//       </Fragment>
//     );
//   };
//   const mapStateToProps = (state) => {
//     return {
//       activeEvent: state.appointmentAndEvent.activeEvent,
//       getpromoteStudent: state.test.getpromoteStudent,
//       loader: state.test.loader,
//     };
//   };
  
//   export default connect(mapStateToProps, {
//     GET_PROMOTE_STUDNETS,
//     DELETE_PROMOTED_STUDNETS,
//     SELECT_STUDENT_FOR_TEST_OR_RECOMAND,
//   })(PromateStudentsTable);
  