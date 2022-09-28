import React from "react"
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Progress
} from "reactstrap"
import axios from "axios"
import { Link } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL;

class AvgSessions extends React.Component {
  state = {
    options: {
      chart: {
        sparkline: { enabled: true },
        toolbar: { show: false }
      },
      states: {
        hover: {
          filter: "none"
        }
      },
      colors: [
        this.props.labelColor,
        this.props.labelColor,
        this.props.primary,
        this.props.labelColor,
        this.props.labelColor,
        this.props.labelColor
      ],
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0
        }
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
          endingShape: "rounded"
        }
      },
      tooltip: {
        x: { show: false }
      },
      xaxis: {
        type: "numeric"
      }
    },
    series: [
      {
        name: "Sessions",
        data: [75, 125, 225, 175, 125, 75, 25]
      }
    ],
    student : {
      active: 0,
      active_trial: 0,
      after_school: 0,
      camp: 0,
      former: 0,
      former_trail: 0,
      leads: 0,
      total: 0
    }
  }

  async componentDidMount() {
    let _state = this;
    let response = await axios.get(`${baseUrl}/api/memeber/std_count/${localStorage.getItem("user_id")}`, 
      {headers : {
          "Authorization" : `Bearer ${localStorage.getItem("access_token")}`}});
      if(response.data && response.status === 200) {
        let data = response.data;
        _state.setState({student: data});
      }
    return;
  }

  render() {
    return (
      <div style={{ height: "100%" }}> 
       <Card>
        <CardBody>
          <Row className="pb-50">
            <Col
              lg={{ size: 12, order: 1 }}
              sm={{ size: 12, order: 2 }}
              xs={{ order: 2 }}
              className="d-flex justify-content-between flex-column mt-lg-0 mt-2">
              <CardTitle>Student Statistics</CardTitle>
            </Col>
            
          </Row>
          <hr />
          <Row className="pt-50">
            <Col md="6" sm="12">
            <Link to="/app/users/list">
              <p className="mb-0">Active Students: {this.state.student.active}</p>
              <Progress className="mt-25" value={this.state.student.active} />
              </Link>
            </Col>
            <Col md="6" sm="12">
            <Link to="/app/student/active-trail/list">
              <p className="mb-0">Active Trail: {this.state.student.active_trial}</p>
              <Progress className="mt-25" color="warning" value={this.state.student.active_trial} />
              </Link>
            </Col>
            <Col md="6" sm="12">
            <Link to="/app/student/former-member/list">
              <p className="mb-0">Former Students: {this.state.student.former}</p>
              <Progress className="mt-25" color="danger" value={this.state.student.former} />
              </Link>
            </Col>
            <Col md="6" sm="12">
            <Link to="/app/student/lead-list/list">
              <p className="mb-0">Lead Students: {this.state.student.leads}</p>
              <Progress className="mt-25" color="success" value={this.state.student.leads} />
            </Link>
            </Col>
          </Row>
          
        </CardBody>
      </Card>
      </div>
     
    )
  }
}
export default AvgSessions
