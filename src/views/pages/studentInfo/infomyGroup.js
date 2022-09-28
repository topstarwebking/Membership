import React from "react"
import {  Card, CardBody, CardHeader, CardTitle } from "reactstrap"
import DataTable from "react-data-table-component"

const columns = [
  {
    name: "Group Name",
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
    selector: "last_name",
    sortable: true
  }
]

const data = [
  {
    id: 1,
    first_name: "Alyss",
    last_name: "Lillecrop",
    email: "alillecrop0@twitpic.com",
    gender: "Female",
    total: "4"
  },
  {
    id: 2,
    first_name: "Shep",
    last_name: "Pentlow",
    email: "spentlow1@home.pl",
    gender: "Male",
    total: "4"
  },
 
]

class DataTableFixedHeader extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Groups</CardTitle>
          
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
