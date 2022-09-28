import React from "react"
import {
    Row, Col
} from "reactstrap"
import TopPragrams from "./topPrograms"
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb"




class Navsupport extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Breadcrumbs
                    breadCrumbTitle="Wallet"
                    breadCrumbParent="Home"
                    breadCrumbActive="Deposit Funds"
                />
                <Row>
                    <Col lg="10" sm="12">
                        <TopPragrams />
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}
export default Navsupport
