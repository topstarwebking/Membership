import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { Avatar, Dialog, DialogContent, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography } from '@material-ui/core'
import { GET_SUB_USERS_ASSIGNEE } from "../../../../../redux/actions/employee_subusers_roles";
import { X } from "react-feather";



function Collaborators(props) {
    const { sub_users_info, GET_SUB_USERS_ASSIGNEE } = props
    const [open, setOpen] = useState(false)
    
    useEffect(() => {
        GET_SUB_USERS_ASSIGNEE();
    }, []);

    return (
        <div>
            <div className='d-flex justify-content-start align-items-center'>
                <div style={{ width: 'content-fit' }}>
                    <Typography className='mr-1 mb-0'><b>Collaborators</b></Typography>
                </div>
                <AvatarGroup className='cursor-pointer' onClick={() => { setOpen(true) }} max={5}>
                    {
                        sub_users_info?.map((item) => {
                            return (
                                <Avatar title={`${item?.firstname} ${item?.lastname}`} key={item?._id} alt={item?.firstname} src={item?.profile_img} />
                            )
                        })
                    }
                </AvatarGroup>
            </div>
            <Dialog onClose={() => { setOpen(false) }} open={open}>
                <div className="close-icon d-flex justify-content-end p-1">
                    <X className="cursor-pointer" size={16} onClick={() => { setOpen(false) }}/>
                </div>
                <DialogContent>
                    <Typography><b>All Collaborators</b></Typography>
                    <List dense>
                        {
                            sub_users_info?.map((item) => {
                                return (
                                    <ListItem key={item?._id}>
                                        <ListItemAvatar>
                                            <Avatar alt={item?.firstname} src={item?.profile_img} />
                                        </ListItemAvatar>
                                        <ListItemText primary={`${item?.firstname} ${item?.lastname} | ${item?.status}`} secondary={item?.email} />
                                    </ListItem>
                                )
                            })
                        }

                    </List>
                </DialogContent>
            </Dialog>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        sub_users_info: state.employeeSubUser.sub_users_info,

    };
};

export default connect(mapStateToProps, { GET_SUB_USERS_ASSIGNEE })(Collaborators);
