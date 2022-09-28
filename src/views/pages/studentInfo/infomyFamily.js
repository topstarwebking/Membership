import React from "react"
import {  Card, CardBody, CardHeader, CardTitle } from "reactstrap"
import DataTable from "react-data-table-component"

const columns = [
  {
    name: "Family Name",
    selector: "first_name",
    sortable: true
  },
  {
    name: "Total Members",
    selector: "total",
    sortable: true
  },
  {
    name: "Members",
    selector: "member",
    sortable: true
  }
]

const data = [
  {
    id: 1,
    first_name: "Copin",
    total: "2",
    member: "Amelia R. copin, Ixe Christian"
  }
]

class DataTableFixedHeader extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Family</CardTitle>
          
        </CardHeader>
        <CardBody>
          <DataTable
            data={data}
            columns={columns}
            noHeader
            fixedHeader
            fixedHeaderScrollHeight="300px"
          />
        </CardBody>
      </Card>
    )
  }
}

export default DataTableFixedHeader
