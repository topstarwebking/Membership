import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from '@material-ui/core/Avatar';
import { Chip } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import SweetAlert from "react-bootstrap-sweetalert";
import { connect } from "react-redux";
import moment from "moment";
import EditSubUser from "./editSubUser";
import EditDelete from "./EditDelete";
import { DELETE_SUB_USER } from "../../../../../redux/actions/employee_subusers_roles";

const useStyles = makeStyles({
  unverify: {
    color: "#7367f0",
    background: "#7367f029",
    fontWeight: "bold",
    borderRadius: "8px",
  },
  verify: {
    color: "#127712",
    background: "#1277122e",
    fontWeight: "bold",
    borderRadius: "8px",
  },
});

const SubUsersListRow = (props) => {
  const { role_id, RoleListInfo } = props;
  const classes = useStyles();
  const [SweetAlertOpen, setSweetAlertOpen] = useState(false);
  const [subUser, setSubUserInfo] = useState(null);

  const confirmDelete = () => {
    setSweetAlertOpen(false);
    let { user_id } = subUser;
    props.DELETE_SUB_USER(user_id, role_id);
  };

  const handledelete = (deleteInfo) => {
    setSubUserInfo({ user_id: deleteInfo });
    setSweetAlertOpen(true);
  };

  const GetRoleName = (roleId) => {
    let result = RoleListInfo.filter((v) => v._id === roleId);
    return result[0]?.rolename;
  };

  return (
    <div className="p-2 my-2">
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead style={{backgroundColor:"#eaf4fe"}}>
            <TableRow>
              <TableCell>
                <span>
                  <b>Full Name</b>
                </span>
              </TableCell>
              <TableCell>
                <span>
                  <b>Start Date</b>
                </span>
              </TableCell>
              <TableCell>
                <span>
                  <b>Username</b>
                </span>
              </TableCell>
              <TableCell>
                <span>
                  <b>Email</b>
                </span>
              </TableCell>
              <TableCell>
                <span>
                  <b>Profile</b>
                </span>
              </TableCell>
              <TableCell>
                <span>
                  <b>Password</b>
                </span>
              </TableCell>
              <TableCell>
                <span>
                  <b>phone number</b>
                </span>
              </TableCell>
              <TableCell>
                <span>
                  <b>Role</b>
                </span>
              </TableCell>
              <TableCell>
                <span>
                  <b>Status</b>
                </span>
              </TableCell>
              {/* <TableCell>
                <span>
                  <b>Action</b>
                </span>
              </TableCell> */}
              <TableCell>
                <span>
                  <b>Action</b>
                </span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.SubUsersList?.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {`${item?.firstname} ${item?.lastname}`}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {moment(item?.createdAt).format("MM-DD-YYYY")}
                  </TableCell>
                  <TableCell>{item?.username}</TableCell>
                  <TableCell>{item?.email}</TableCell>
                  <TableCell>
                    <div>
                    <Avatar alt={item?.username} src={item?.profile_img} />
                    </div>
                    </TableCell>
                  <TableCell>
                    <span>{item?.password}</span>
                  </TableCell>
                  <TableCell>{item?.phone}</TableCell>
                  <TableCell>{GetRoleName(item?.role)}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={item?.status}
                      className={
                        item?.status === "Active"
                          ? classes.verify
                          : classes.unverify
                      }
                    />
                  </TableCell>
                  {/* <TableCell>Top</TableCell> */}
                  {/* <TableCell>Down</TableCell> */}
                  <TableCell>
                    <div className="ml-1">
                      <EditDelete
                        editfolder={<EditSubUser editVales={item} />}
                        item={item}
                        OpenAlert={handledelete}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <SweetAlert
        title="Are you sure?"
        warning
        show={SweetAlertOpen}
        showCancel
        reverseButtons
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, remove it!"
        cancelBtnText="Cancel"
        onCancel={() => {
          setSweetAlertOpen(false);
        }}
        onConfirm={() => {
          confirmDelete();
        }}
      >
        You won't be able to revert this!
      </SweetAlert>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    role_id: state.employeeSubUser.role_id,
  };
};

export default connect(mapStateToProps, {
  DELETE_SUB_USER,
})(SubUsersListRow);
