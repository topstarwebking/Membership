import React, { useEffect, useState } from "react"
import {
  Avatar, Chip, Typography, TablePagination,
  Checkbox, Tooltip, Card, CardContent
} from "@material-ui/core"
import {
  Info,
} from "react-feather"
// import { history } from "../../../../../history"
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import moment from "moment"
// import "../../../../../assets/scss/pages/users.scss";
// import InputAutoComplete from "./autoComplete";
import { Link } from "react-router-dom";
import StudentManageMenu from "../../../../apps/user/list/UserMoreMenu";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import SelectSearch from "react-select-search";

const useStyles = makeStyles((theme) => ({
  cardroot: {
    // width: "100%",
    height: '100%',
    boxShadow: ' 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2)',
    marginTop: '6px',
    overflow: "scroll"

  },
  rowCenter: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  inputStyle: {
    height: '3em',
    borderRadius: '0.4em',
    border: '1px solid #b8c2cc',
    '& div': {
      padding: '0px !important',
    }
  },
  textFontSize: {
    fontSize: '0.8em'
  },
  cardStyleHeader: {
    boxShadow: 'none',
    padding: '0.5em',
    margin: '10px',
    '&:hover': {
      boxShadow: '0 0 0.7142857142857143rem #b8c2cc',
      borderRadius: "8px",
    }
  },
  headers: {
    display: 'grid',
    gridTemplateColumns: '16% 10% 10% 10% 10% 10% 10% 10% 14%',
    fontWeight: 'bold',
    color: '#7d7e7f',
    padding: '0px',
    margin: '10px'

  },
  status: {
    borderRadius: '8px',
    background: '#f7d0de',
    fontWeight: 'bold',
    color: '#ec6389',

  },
  viweAll: {
    background: '#fff',
    borderRadius: '8px',
    color: '##1a2772',
    fontWeight: 'bold',
    border: '2px solid #1a2772',
    cursor: "pointer"
  },
  mainTitle: {
    color: '#0d0c22',
    fontSize: '2em',
    fontWeight: 'bold'
  },
  mainPageMyTask: {
    background: "#ffffff",
    height: "60vh",
  },
  headersData: {
    display: 'grid',
    gridTemplateColumns: '16% 10% 10% 10% 10% 10% 10% 10% 14%',
    fontWeight: 'bold',
    color: '#7d7e7f',
    padding: '0px'

  },

}));

export const RowSkeleton = (props) => {
  const classes = useStyles()
  return (
    <Card className={classes.cardroot}>
      <CardContent>
        <div className={classes.rowCenter}>
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
          <div style={{ width: "60%", paddingLeft: "8px" }}>
            <Skeleton animation="wave" variant="rect" width={'100%'} height={10} />
            <Skeleton animation="wave" variant="text" width={'70%'} height={10} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
const StudentTable = (props) => {
  const { rowdata, loading } = props
  const [Students, setStudents] = useState([])
  const page = 0
  const rowsPerPage = 10
  const [selectedId, setSelectedId] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const classes = useStyles()


  useEffect(() => {
    setStudents(rowdata)
  }, [rowdata])



  const selecte1Only = async (e) => {
    if (selectedId.length > 0) {
      setSelectedId([])
      setSelectedRows([])
      return
    }
    let currentPageStudent = Students?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    for (let item of currentPageStudent) {
      setSelectedId(preStuff => [...preStuff, item?._id]);
      setSelectedRows(currentPageStudent)
    }
  }
  const HandleselecteOne = (e, item) => {
    let { value } = e.target
    if (selectedId?.includes(value)) {
      let rowTowAdd = selectedId?.filter(id => id !== value)
      setSelectedId(rowTowAdd)
      setSelectedRows(item)
    } else {
      if (selectedRows.length > 0) {
        setSelectedId(preStuff => [...preStuff, value]);
        setSelectedRows(preStuff => [...preStuff, item]);
      } else {
        setSelectedRows([item]);
        setSelectedId([value])
      }
    }
  }
  useEffect(() => {
    // props.onSelectionChanged(selectedId, selectedRows)
    // if (selectedRows.length > 0) {
    //   SELECTED_TEST_rowdata(selectedRows)
    // }
  }, [selectedId])

  return (

    <React.Fragment>
      {

        loading ? [1, 2, 3, 4, 5, 6, 7].map((item) => {
          return (
            <RowSkeleton key={item} />
          )
        })
          :
          <React.Fragment>
            <CardContent className={`${classes.headers} text-dark font-weight-bold`}>
              <div className="d-flex align-items-center justify-content-start mr-0" >
                <Checkbox
                  align="center"
                  style={{ marginleft: "1em" }}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                  onChange={selecte1Only}
                  value="selectall"
                // checked={selectedId.length > 0}
                //   checked={checkboxSelectionIds.length > 0}
                />
                <Typography align="center" className="pb-0.5 m-0" ><b>Full Name</b></Typography>
              </div>
              {/* <div className="d-flex align-items-center justify-content-center">
                Phone
              </div> */}
              <div className="d-flex align-items-center">
                Status
              </div>
              <div className="d-flex align-items-center">
                Start Date
              </div>
              <div className="d-flex align-items-center">
                End Date
              </div>
              <div className="d-flex align-items-center justify-content-center">
                Rating
              </div>
              <div className="d-flex align-items-center justify-content-center">
                Current Rank
              </div>
              <div className="d-flex align-items-center justify-content-center">
                Next Rank
              </div>

              <div className="d-flex align-items-center justify-content-center">
                Info
              </div>
              <div className="d-flex align-items-center justify-content-center">
                Manage
              </div>
            </CardContent>
            {rowdata
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((item) => (

                <Card className={`${classes.cardStyleHeader} pl-0`} key={item?._id}>
                  <CardContent className={classes.headersData} style={{ paddingBottom: "0px" }}>
                    <div className='d-flex align-items-center'>
                      <Checkbox
                        // checked={checkboxSelectionIds?.includes(item?._id) ? true : false}
                        onChange={(e) => HandleselecteOne(e, item)}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        value={item?._id}
                      />
                      <Link to={`/student-info/${item._id}`} style={{ cursor: "pointer" }} title={`${item?.firstName}`}
                        className='d-flex align-items-center justify-content-start'>
                        <Avatar
                          style={{ width: '1.8em', height: "1.8em" }}
                          alt={item?.firstName}
                          src={item?.memberprofileImage}
                        />
                        <div style={{ width: "10em" }}>
                          <Typography className='col-8 text-truncate m-0' >{item?.firstName} {item?.lastName}</Typography>
                          <Typography color="textSecondary" className="pl-1 m-0" style={{ fontSize: "0.8em" }}>{item?.primaryPhone}</Typography>
                        </div>
                      </Link>
                    </div>
                    {/* <div className='d-flex align-items-center justify-content-center'>
                      <Typography color='textSecondary'
                        className={`mb-0 ${classes.textFontSize}`}>
                        {item?.primaryPhone}
                      </Typography>
                    </div> */}
                    <div className='d-flex align-items-center'>
                      <Chip
                        style={{
                          marginRight: "1px",
                          background: item?.status.toLowerCase() === 'active' ? '#def8e7' : '#f9d2d0',
                          color: item?.status.toLowerCase() === 'active' ? '#55a65b' : '#e05252',
                          fontWeight: 'bold'
                        }}
                        size="small" label={item?.status.toUpperCase()} />

                    </div>
                    <div className='d-flex align-items-center' style={{ color: "#6f97c7" }}>
                      {moment(item?.createdAt).format('DD-MM-YYYY')}
                    </div>
                    <div className='d-flex align-items-center col-8 text-truncate' style={{ color: "#6f97c7" }}>
                      {item?.membership_details?.length > 0 ? moment(item?.membership_details[0]?.expiry_date).format('DD-MM-YYYY') : 'no date'}
                    </div>
                    <div className='d-flex align-items-center justify-content-center' style={{ color: "#6f97c7" }}>
                      {item.attendedclass_count === 0 ? (
                        <Avatar className={`badge-light-dangers ${classes.textFontSize}`}
                          style={{ fontWeight: "bold", width: "2.6em", height: "2.6em" }}>
                          {item.attendedclass_count}
                        </Avatar>
                      ) : (item.attendedclass_count <= 7 && item?.attendedclass_count > 0) ? (
                        <Avatar
                          className={`badge-light-successs ${classes.textFontSize}`}
                          style={{ fontWeight: "bold", width: "2.6em", height: "2.6em" }}>
                          {item.attendedclass_count}
                        </Avatar>
                      ) : (item.attendedclass_count <= 15 && item.attendedclass_count > 7) ? (
                        <Avatar
                          className={`badge-light-yellows ${classes.textFontSize}`}
                          style={{ fontWeight: "bold", width: "2.6em", height: "2.6em" }}>
                          {item.attendedclass_count}
                        </Avatar>
                      ) : item.attendedclass_count <= 1000 && item.attendedclass_count > 15 ? (
                        <Avatar
                          className={`badge-light-dangers ${classes.textFontSize}`}
                          style={{ fontWeight: "bold", width: "2.6em", height: "2.6em" }}>
                          {item.attendedclass_count}
                        </Avatar>
                      ) : <Avatar
                        className={`badge badge-pill badge-light-light ${classes.textFontSize}`}
                        style={{ fontWeight: "bold", width: "2.6em", height: "2.6em" }}>
                        null
                      </Avatar>
                      }
                    </div>
                    <div className='d-flex align-items-center justify-content-center' style={{ color: "#6f97c7" }}>

                      <Typography className="m-0 pl-2" style={{ width: "10em" }}> {item?.current_rank_name}</Typography>
                    </div>
                    <div className='d-flex align-items-center justify-content-center' style={{ color: "#6f97c7" }}>
                      <Avatar
                        style={{ fontWeight: "bold", width: "2.6em", height: "2.6em" }}
                        className={`${classes.textFontSize}`}
                        alt={item?.current_rank_name}
                        src={item?.current_rank_img}
                      />                   </div>
                    {/* <div className='d-flex align-items-center justify-content-center' style={{ color: "#6f97c7" }}>
                     {item?.next_rank_name}
                    </div> */}
                    <div className='d-flex align-items-center justify-content-center' style={{ color: "#6f97c7" }}>
                      <Tooltip arrow title={<b>{item?.notes}</b>}>
                        <Info size={18} />
                      </Tooltip>
                    </div>
                    <div className='d-flex align-items-center justify-content-center' style={{ color: "#6f97c7" }}>
                      <StudentManageMenu item={item} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 20, 25]}
              component="div"
              count={rowdata?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
            // onPageChange={handleChangePage}
            // onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </React.Fragment>
      }

    </React.Fragment >
  )
};
export default StudentTable;
