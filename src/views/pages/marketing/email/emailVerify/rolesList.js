import React, { useEffect, useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Card, Divider } from "@material-ui/core";
import roles_img from "../../../../../assets/img/rolelist/faq-illustrations.3abcf165.svg";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Trash, Edit } from "react-feather";
import AvatarGroup from "./Avtargroups";
import ConfirmationModal from "../../../../../components/gloabal/confirmation";
import {
  GET_EMPLOYEE_ROLES_LIST,
  CREATE_ROLE_LIST,
  UPDATE_ROLE_LIST,
  DELETE_ROLE,
  GET_ROLE_LIST_USERS_INFO,
} from "../../../../../redux/actions/employee_subusers_roles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { IconButton } from "@material-ui/core";
import {
  Row,
  Col,
  // Card,
  Label,
  Input,
  Table,
  Modal,
  Button,
  CardBody,
  ModalBody,
  ModalHeader,
  FormGroup,
  FormFeedback,
  UncontrolledTooltip,
} from "reactstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));

const RolesList = (props) => {
  const classes = useStyles();
  const { employeeRolesList, usersRoleInfoList } = props;

  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("Add New");
  const [sweetAlertOpen, setSweetAlertOpen] = useState(false);
  const [roleCardId, setRoleCardId] = useState("");
  const [roleName, setRoleName] = React.useState({
    roleName: "",
    error: false,
    edit_id: "",
  });
  const [roleList, setRoleList] = React.useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickPopup = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (event) => {
    setRoleList({ ...roleList, [event.target.name]: event.target.checked });
  };

  const handleDeleteFolder = async () => {
    let info = await props.DELETE_ROLE(roleCardId);
    if (info.success) {
      setRoleCardId("");
      setSweetAlertOpen(false);
    }
  };

  const handleDeleteId = (folderid) => {
    setRoleCardId(folderid);
    setSweetAlertOpen(true);
  };

  const Capitalize = (str) => {
    let Word = str.charAt(0).toUpperCase() + str.slice(1);
    return Word.replace(/_/g, " ");
  };

  useEffect(() => {
    props.GET_EMPLOYEE_ROLES_LIST();
    props.GET_ROLE_LIST_USERS_INFO();
  }, []);

  const onReset = () => {
    setShow(false);
    setRoleList({});
    setRoleName({ ...roleName, roleName: "", error: false, edit_id: "" });
  };

  const onEdit = async (Info) => {
    await setModalType("Edit");
    await setShow(true);
    let obj = Info?.roles[0];
    delete obj._id;
    setRoleList(obj);
    setRoleName({ ...roleName, roleName: Info?.rolename, edit_id: Info?._id });
  };

  const handleSubmit = async (ModalType) => {
    if ((roleName?.roleName).trim().length) {
      if (ModalType === "Edit") {
        let Info = await props.UPDATE_ROLE_LIST(
          Object.assign({}, { rolename: roleName.roleName, roles: [roleList] }),
          roleName.edit_id
        );
        if (Info.success) {
          onReset();
        }
      } else {
        let response = await props.CREATE_ROLE_LIST(
          Object.assign(
            {},
            { roles: [roleList] },
            { rolename: roleName.roleName }
          )
        );
        if (response.success) {
          onReset();
        }
      }
    } else {
      setRoleName({ ...roleName, error: true });
    }
  };

  return (
    <Fragment>
      <Row className="">
        {employeeRolesList.map((item, index) => {
          var filterd = usersRoleInfoList.filter((el) => el._id === item?._id);
          var TotalUsers = filterd.length
            ? { count: filterd[0].count }
            : { count: 0 };

          var avatarValues = filterd.length
            ? { info_List: filterd[0].info_List }
            : { info_List: [] };

          return (
            <Col style={{ paddingTop: 14 }} key={index} xl={3} md={6}>
              <Card style={{ height: "100%" }}>
                <CardBody>
                  <div className="d-flex justify-content-between align-items-center mb-2 pb-25">
                    <div className="role-heading">
                      <h4 className="fw-bolder">{item?.rolename}</h4>
                    </div>
                    <div>
                      <div>
                        <div className="ml-1">
                          <IconButton
                            onClick={handleClickPopup}
                            fontSize="normal"
                            className="rounded-circle "
                            style={{ color: "#1aa6e0" }}
                          >
                            <MoreVertIcon fontSize="normal" />
                          </IconButton>
                        </div>
                        <Menu
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          onClick={handleClose}
                          PaperProps={{
                            style: {
                              left: "50%",
                              transform: "translateX(-77%) translateY(32%)",
                            },
                          }}
                          MenuListProps={{
                            style: {
                              padding: 0,
                            },
                          }}
                        >
                          
                            <MenuItem>
                            <Link
                            to="/"
                            className="role-edit-modal"
                            onClick={(e) => {
                              e.preventDefault();
                              onEdit(item);
                            }}
                          >
                              <Edit
                                size={16}
                                style={{ color: "#5aa65c", marginRight: "1em" }}
                              />
                              Edit
                              </Link>
                            </MenuItem>
                          
                          <MenuItem onClick={() => handleDeleteId(item?._id)}>
                            <Trash
                              style={{ color: "#e05252", marginRight: "1em" }}
                              size={16}
                            />
                            Delete
                          </MenuItem>
                        </Menu>
                      </div>
                     
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{`Total ${TotalUsers.count} users`}</span>
                    <AvatarGroup
                      data={avatarValues}
                      count={TotalUsers?.count}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          );
        })}
        <Col style={{ paddingTop: 14 }} xl={3} md={6}>
          <Card style={{ height: "100%" }}>
            <Row>
              <Col sm={5}>
                <div
                  className="d-flex align-items-end justify-content-center"
                  style={{ height: "100%" }}
                >
                  <img
                    className="img-fluid mt-1"
                    src={roles_img}
                    alt=""
                    width={100}
                  />
                </div>
              </Col>
              <Col sm={7}>
                <CardBody className="text-sm-end text-center ps-sm-0">
                  <p>Add a new role, if it does not exist</p>
                  <Button
                    color="primary"
                    className="text-nowrap mb-1"
                    onClick={() => {
                      setModalType("Add New");
                      setShow(true);
                      setRoleList({
                        dashboard: false,
                        members: false,
                        my_school: false,
                        task_and_goals: false,
                        calendar: false,
                        marketing: false,
                        shop: false,
                        finance: false,
                        documents: false,
                        settings: false,
                      });
                    }}
                  >
                    Add New Role
                  </Button>
                </CardBody>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <br />
      <Modal
        isOpen={show}
        // onClosed={handleModalClosed}
        toggle={() => onReset()}
        className="modal-dialog-centered modal-md"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => onReset()}
        ></ModalHeader>
        <ModalBody className="px-3 pb-5">
          <div className="mb-2">
            <h2>{modalType} Role & Permissions</h2>
          </div>

          <Row>
            <Col xs={12} className="mb-2">
              <Typography className="mb-0" style={{fontSize:"1rem",fontWeight:400,color:"#4d4d4d"}}>Role Name</Typography>

              <Input
                style={{ padding: "0px 5px" }}
                id="roleName"
                defaultValue={roleName.roleName}
                onChange={(el) =>
                  setRoleName({ ...roleName, roleName: el.target.value })
                }
                placeholder="Enter role name"
                invalid={roleName.error}
              />

              {/* {<FormFeedback>Please enter a valid role name</FormFeedback>} */}
            </Col>

            <Col xs={12}>
              {/* <h4 className="mt-2 pt-50">Role Permissions</h4> */}
              {/* <Table className='table-flush-spacing' responsive>
                <tbody>
                  {Object.keys(roleList).map((role, index) => {
                    return (
                      <tr key={index}>
                        <td className='text-nowrap fw-bolder'>{role}</td>
                        <td>
                          <div className='d-flex'>
                            <div className='form-check me-3 me-lg-5'>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={roleList[role]}
                                    onChange={handleChange}
                                    name={role}
                                    color="primary"
                                  />
                                }
                              // label="Primary"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table> */}

              <Row>
                {Object.keys(roleList).map((role, index) => {
                  return (
                    <Col key={index} md={4}>
                      <FormGroup>
                        <FormControlLabel
                          value="end"
                          control={
                            <Checkbox
                              checked={roleList[role]}
                              onChange={handleChange}
                              name={role}
                              color="primary"
                            />
                          }
                          label={Capitalize(role)}
                          labelPlacement="end"
                        />
                      </FormGroup>
                    </Col>
                  );
                })}
              </Row>
            </Col>

            <Col className="mt-2 d-flex justify-content-center" xs={12}>
              <Button
                onClick={() => {
                  handleSubmit(modalType);
                }}
                color="primary"
                className="mr-1"
              >
                Save
              </Button>
              <Button type="reset" outline onClick={onReset}>
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={sweetAlertOpen}
        title="Delete file ?"
        onConfirm={() => {
          handleDeleteFolder();
        }}
        onCancel={() => {
          setSweetAlertOpen(false);
          setRoleCardId("");
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Delete"}
        description=" Are you sure you want to delete?"
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    employeeRolesList: state.employeeSubUser.employeeRolesList,
    usersRoleInfoList: state.employeeSubUser.usersRoleInfoList,
  };
};

export default connect(mapStateToProps, {
  GET_EMPLOYEE_ROLES_LIST,
  CREATE_ROLE_LIST,
  UPDATE_ROLE_LIST,
  DELETE_ROLE,
  GET_ROLE_LIST_USERS_INFO,
})(RolesList);
