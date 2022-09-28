import React from 'react'
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

const CustomTooltip = ({ active, payload, label, tooltip, statisticsYear }) => {
  if (active && payload && payload.length && tooltip) {
    return (
      <Card className="custom-tooltip "
        style={{
          width: "40vh",
          boxShadow: " 5px 5px 5px 5px #E6E6E3",

        }}>
        <div div className='m-1'>
          {tooltip === "Not Joined" && <>
            <div className='d-flex justify-content-between'>
              <h5 className='m-1'><b>{label} {statisticsYear}</b></h5>
              <div className="st-list pl-1 m-1 w-100 d-flex justify-content-end">
                <h6 style={{
                  color: payload[0].fill
                }} >
                  <b> Not Joined</b>
                  <span style={{
                    background: payload[0].fill
                  }} className="st-number2 m-1">
                    {payload[0]?.payload?.quite?.count || 0}
                  </span>
                </h6>
              </div>
            </div>
            {payload[0]?.payload?.quite?.data?.length > 0 ?
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className='border-left'><b>Full Name</b></TableCell>
                      <TableCell className='border-left'><b> Type</b></TableCell>
                      <TableCell className='border-left'><b>Activity</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payload[0]?.payload?.quite?.data?.map((item, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell className='border-left'>{`${item?.firstName}${item?.lastName}`}</TableCell>
                          <TableCell className='border-left'>{item?.studentType}</TableCell>
                          <TableCell className='border-left'>{item?.count}</TableCell>
                        </TableRow>
                      )
                    })
                    }
                  </TableBody>
                </Table>
              </TableContainer> : <div className='d-flex justify-content-center border'>No data</div>}</>
          }
        </div>
        <div className='m-1'>
          {
            tooltip === "Joined" && <>
              <div className='d-flex justify-content-between'>
                <h5 className='m-1'><b>{label} {statisticsYear}</b></h5>
                <div className="st-list pl-1 m-1">
                  <h6 style={{
                    color: payload[1]?.fill ? payload[1]?.fill : payload[0]?.fill

                  }}>
                    <b> Joined</b>
                    <span className="st-number2 m-1" style={{
                      background: payload[1]?.fill ? payload[1]?.fill : payload[0]?.fill
                    }}>
                      {payload[0]?.payload?.join?.count || 0}
                    </span>
                  </h6>
                </div>
              </div>
              {payload[0]?.payload?.join?.data?.length ?
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell className='border-left'><b>Full Name</b></TableCell>
                        <TableCell className='border-left'><b> Type</b></TableCell>
                        <TableCell className='border-left'><b>Activity</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        payload[0]?.payload?.join?.data?.map((item, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell className='border-left'>{`${item?.firstName}${item?.lastName}`}</TableCell>
                              <TableCell className='border-left'>{item?.studentType}</TableCell>
                              <TableCell className='border-left'>{item?.count}</TableCell>
                            </TableRow>
                          )
                        })
                      }
                    </TableBody>
                  </Table>
                </TableContainer> : <div className='d-flex justify-content-center border'>No data</div>}
            </>
          }
        </div>
      </Card >
    );
  }
  return null;
}
export default CustomTooltip

