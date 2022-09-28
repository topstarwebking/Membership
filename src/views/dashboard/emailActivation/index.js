import React from "react"
import { Card } from "@material-ui/core"
import "../../../assets/scss/pages/dashboard-analytics.scss"
import EmailActivation from '../../adminEmailActivation/index'

const EmailActivationMain = () => {
    return (
        <Card>
            <EmailActivation />
        </Card>
    )
}

export default EmailActivationMain;