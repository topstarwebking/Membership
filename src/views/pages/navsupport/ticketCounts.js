import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { Card, CardContent, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { GET_TICKETS_COUNT } from '../../../redux/actions/support'
var colors = {
    Archived: "#8bc34ac2", OnHold: "#0096889e", Closed: "#e91e63", Open: "#ffa50096"
};
const TicketCounts = (props) => {
    const {GET_TICKETS_COUNT} = props 
    useEffect(() => {
    GET_TICKETS_COUNT()
    }, [GET_TICKETS_COUNT])

    return (
        <div>
            <Typography style={{
                color: '#2e3853',
                fontSize: '2.4em'
            }}>
                <b> Tickets ({props?.tickets_count?.Total_Ticket})</b>
            </Typography>
            <Row>
                {
                    props?.tickets_count?.Ticket_Count?.map((item, i) => {
                        return (
                            <Col className='p-1' sm="3" md="3" lg="3" key={i}>
                                <Card className='card rounded-2' style={{
                                    height: '100%',
                                    background: colors[item?._id]
                                }}>
                                    <CardContent className='text-center d-flex justify-content-center d-flex align-items-center'>
                                        <div>
                                            <Typography style={{
                                                color: '#fff',
                                                fontSize: '2em',
                                                marginBottom: '0px'
                                            }}>
                                                <b> {item?._id}</b>
                                            </Typography>
                                            <Typography style={{
                                                color: '#fff',
                                                fontSize: '2em',
                                                marginBottom: '0px'
                                            }}>
                                                <b> {item?.count}</b>
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        tickets_count: state.support.tickets_count
    }
}
export default connect(mapStateToProps, { GET_TICKETS_COUNT })(TicketCounts);
