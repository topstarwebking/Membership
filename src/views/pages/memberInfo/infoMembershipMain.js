import React from "react"
import "../../../assets/scss/pages/users.scss"
import MembershipTable from './infoStudentMemberShip'
import Membershipinvoice from './infoMembershipInvoice'


class UserEdit extends React.Component {
    state = {
       
    }

   
    render() {
        return (
            <div>
                 <MembershipTable/>
                 <Membershipinvoice />
            </div>

        )
    }
}
export default UserEdit
