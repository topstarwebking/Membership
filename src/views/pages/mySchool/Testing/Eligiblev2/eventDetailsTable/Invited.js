import * as React from 'react';
import { CustomInput, Button } from "reactstrap";
import { Chip, Grid } from '@material-ui/core'
import DataTable from "react-data-table-component";
import Checkbox from '@material-ui/core/Checkbox';



export default function Invited(props) {
    // console.log(props.getInvitestudents)
    const [pending, setPending] = useState(true);
    useEffect(() => {
        if (props.getInvitestudents !== null) {
          setPending(false);
        }
      }, []);

      
    return (
        <>
            <div style={{ height: 300, width: '100%', justifyContent: "center", display: "flex", textAlign: "center", marginTop: "10px" }}>
                <DataTable
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[10, 50, 100]}
                    data={props.getInvitestudents}
                    noHeader
                    defaultSortField="id"
                    defaultSortAsc={false}
                    pagination
                    selectableRows
                    highlightOnHover
                    onSelectedRowsChange={props.handleSelectRows}
                    progressPending={pending}
                    pageSize={5}
                    selectableRowsNoSelectAll={Checkbox}
                    disableSelectionOnClick
                />
            </div>
        </>

    );
}
