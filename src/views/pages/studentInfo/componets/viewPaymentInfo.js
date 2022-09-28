import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment';
import ManageMemberShipAction from './ManageMemberShipAction';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    headers: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        padding: '0.4em',
        '&:hover': {
            background: '#f8f8f8'
        }

    },
    hdTable: {
        // color: '#299bf4',
        fontWeight: 'bold'
    }
}));

const ViewPaymentInfo = props => {
    const classes = useStyles()
    const { memberShip } = props

    return (
        <div className='p-1'>
            {memberShip?.schedulePayments?.length > 0 ? <div>
                <div className={classes.headers}>
                    <div><span className={classes.hdTable}># S.No.</span></div>
                    <div><span className={classes.hdTable}>Date</span></div>
                    <div><span className={classes.hdTable}>Payment</span></div>
                    <div><span className={classes.hdTable}>Status</span></div>
                    <div><span className={classes.hdTable}>Payment Method</span></div>
                    <div className='d-flex justify-content-end '><span className={classes.hdTable}>Action</span></div>
                </div>
                {
                    memberShip?.schedulePayments?.map((item, i) => {
                        return (
                            <div className={classes.headers} key={i}>
                                <div>{i + 1}</div>
                                <div>{moment(item?.date).format('MM/DD/YYYY')}</div>
                                <div>$ {item?.Amount.toFixed(2)}</div>
                                <div className={'text-capitalize'}>
                                    <Chip
                                        variant='outlined'
                                        size='small'
                                        label={<b>Payment {item?.status}</b>}
                                        style={{ background: '#FFF', color: item?.status === 'paid' ? '#8de02c' : (item?.status === 'over_due') ? '#ff5722' : (item?.status === 'forfeit') ? "#28c76f" : (item?.status === 'refund') ? '#ff3f00': '#ffc107' }} />
                                </div>
                                <div>{item?.ptype}</div>
                                <div className='d-flex justify-content-end'>
                                    <ManageMemberShipAction isActionONChild={true} data={memberShip} paymentData={item} />
                                </div>
                            </div>
                        )
                    })
                }
            </div> : ''}
        </div>
    );
};

export default ViewPaymentInfo;