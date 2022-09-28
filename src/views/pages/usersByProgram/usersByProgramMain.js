import React from "react"
import {
  Card,
  CardBody,
} from "reactstrap"
import Filter from "./filter"
import DetailTable from "./detailTable"

class userManagementdata extends React.Component {
  state = {
    activeTab: "1",
    collapseID: "",
    status: "Closed"
  }


  render() {

    return (
      <React.Fragment>
        <Filter />
        <div className="vx-collapse">
          <Card
            className={'collapse-border-item'}
          >
            <CardBody>
              <DetailTable />
            </CardBody>
          </Card>
        </div>

      </React.Fragment>
    )
  }
}
export default userManagementdata
