import React from "react"
import {
    Card,
    CardBody,
} from "reactstrap"
// import "../../../assets/scss/pages/users.scss"
import "../../../../assets/scss/pages/users.scss"
import CandidateTable from "./CandidateTable"

const CandidateTabs = () => {
    return (
        <div>
            <Card>
                <CardBody className="pt-2">
                    <CandidateTable />
                </CardBody>
            </Card>
        </div>
    );
};

export default CandidateTabs;