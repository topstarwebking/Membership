import React from "react"
import {
  Input
} from "reactstrap"
import "../../../../assets/scss/pages/users.scss"
import "react-toastify/dist/ReactToastify.css"
import {
  Card, CardContent, Typography
} from "@material-ui/core"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

const TableRenewewall = ({data}) => {
  return (
    <Card className='mb-1 rounded' style={{
      boxShadow:
        '0 0 2px 0 rgb(145 158 171 / 24%), 0 16px 32px -4px rgb(145 158 171 / 24%)'
    }}>

      <div className="m-1 d-flex align-items-end justify-content-between">
        <Typography>Expired</Typography>
        <Input type='text' placeholder='🔍 search for Notes..... ' style={{ maxWidth: '200px' }} />
      </div>
      <CardContent>
        <TableContainer style={{ width: '100%', height: '81.9vh', padding: "0" }}>
          <Table className='table-hover'>
            <TableBody>
              {data.length ? data.map((items, i) => (
                <TableRow
                  key={i}
                >
                  <TableCell>
                    <div className="">
                      <div className="">
                        <div className="row row-cols-3 d-flex align-items-center">
                          <div className="col">
                            <img className='rounded-circle' width='40px' height='40px' src={items?.image} alt="studentAvatar" />
                          </div>
                          <div className="col">
                            <h6><span className='text-danger'>Last Attended : </span><span className='text-muted'><b>{items?.lastAttendence}</b></span></h6>
                          </div>
                          <div className="col">
                            <h6><span className='text-primary'>Last Contacted : </span><span className='text-muted'><b>{items?.lastContact}</b></span></h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>)) : null}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>

  )
};



export default TableRenewewall;