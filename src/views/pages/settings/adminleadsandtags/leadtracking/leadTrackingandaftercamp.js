import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";
import ConfirmationModal from "../../../../../components/gloabal/confirmation";

import {
  GET_LEADS_TRACKING,
  CREATE_LEADS_TRACKING,
  CREATE_AFTER_CAMP,
  EDIT_AFTER_CAMP,
  GET_AFTER_CAMPS,
  EDIT_LEADS_TRACKING,
  DELETE_LEAD_TRACKING,
  DELETE_AFTER_CAMP,
} from "../../../../../redux/actions/member";
import CreateLeadstracking from "./CreateLeadstracking";
import CreateAfterCamp from "./CreateAfterCamp";
import EditAndDeletLeadsandtags from "./EditAndDeletLeadsandtags";
const LeadTrackingandaftercamp = (props) => {
  const {
    getLeadTrackingList,
    GET_LEADS_TRACKING,
    EDIT_LEADS_TRACKING,
    EDIT_AFTER_CAMP,
    CREATE_LEADS_TRACKING,
    CREATE_AFTER_CAMP,
    GET_AFTER_CAMPS,
    getAfterCamps,
    DELETE_AFTER_CAMP,
    DELETE_LEAD_TRACKING,
  } = props;
  const [Id, setId] = React.useState(null);
  const [Type, setType] = React.useState(null);
  const [defaltAlert, setdefaultAlert] = React.useState(false);

  useEffect(() => {
    GET_LEADS_TRACKING();
    GET_AFTER_CAMPS();
  }, [GET_LEADS_TRACKING, GET_AFTER_CAMPS]);

  const opentAlert = (type, id) => {
    setId(id);
    setType(type);
    setdefaultAlert(true);
  };
  const HandleDelete = () => {
    if (Type === "leads") {
      DELETE_LEAD_TRACKING(Id);
    } else {
      DELETE_AFTER_CAMP(Id);
    }
    setdefaultAlert(false);
  };
  return (
    <div style={{ height: "80vh" }}>
      <Row>
        <Col lg={6} md={6} sm={12}>
          <Card
            style={{ boxShadow: "none", height: "70vh" }}
            className="border"
          >
            <div className="d-flex justify-content-between p-1">
              <span style={{ fontSize: "1.2em" }}>Lead Tracking</span>
              <div className="d-flex justify-content-end">
                <CreateLeadstracking
                  CREATE_LEADS_TRACKING={CREATE_LEADS_TRACKING}
                  EDIT_LEADS_TRACKING={EDIT_LEADS_TRACKING}
                  Isedit={false}
                />
              </div>
            </div>
            {
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Name</b>
                    </TableCell>
                    <TableCell>
                      <b>Created</b>
                    </TableCell>
                    <TableCell>
                      <b>Action</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getLeadTrackingList?.length > 0 &&
                    getLeadTrackingList?.map((item) => {
                      return (
                        <TableRow key={item?._id}>
                          <TableCell>{item?.leads_category}</TableCell>
                          <TableCell>
                            {moment(item?.createdAt).format("MM/DD/YYYY")}
                          </TableCell>
                          <TableCell>
                            <EditAndDeletLeadsandtags
                              EditFolder={
                                <CreateLeadstracking
                                  CREATE_LEADS_TRACKING={CREATE_LEADS_TRACKING}
                                  EDIT_LEADS_TRACKING={EDIT_LEADS_TRACKING}
                                  Isedit={true}
                                  item={item}
                                />
                              }
                              item={item}
                              opentAlert={opentAlert}
                              type={"leads"}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            }
          </Card>
        </Col>
        <Col lg={6} md={6} sm={12}>
          <Card
            style={{ boxShadow: "none", height: "70vh" }}
            className="border"
          >
            <div className="d-flex justify-content-between p-1">
              <span style={{ fontSize: "1.2em" }}>Tags</span>
              <div className="d-flex justify-content-end">
                <CreateAfterCamp
                  CREATE_AFTER_CAMP={CREATE_AFTER_CAMP}
                  EDIT_AFTER_CAMP={EDIT_AFTER_CAMP}
                  Isedit={false}
                />
              </div>
            </div>

            {
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Name</b>
                    </TableCell>
                    <TableCell>
                      <b>Created</b>
                    </TableCell>
                    <TableCell>
                      <b>Action</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getAfterCamps?.length > 0 &&
                    getAfterCamps?.map((item) => {
                      return (
                        <TableRow key={item?._id}>
                          <TableCell>{item?.after_camp_category}</TableCell>
                          <TableCell>
                            {moment(item?.createdAt).format("MM/DD/YYYY")}
                          </TableCell>
                          <TableCell>
                            <EditAndDeletLeadsandtags
                              EditFolder={
                                <CreateAfterCamp
                                  CREATE_AFTER_CAMP={CREATE_AFTER_CAMP}
                                  EDIT_AFTER_CAMP={EDIT_AFTER_CAMP}
                                  Isedit={true}
                                  item={item}
                                />
                              }
                              item={item}
                              opentAlert={opentAlert}
                              type={"after_camp"}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            }
          </Card>
        </Col>
      </Row>
      <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={defaltAlert}
        title="Delete file ?"
        onConfirm={HandleDelete}
        onCancel={() => {
          setdefaultAlert(false);
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Delete"}
        description=" Are you sure you want to delete?"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    getLeadTrackingList: state.member.getLeadTrackingList,
    getAfterCamps: state.member.getAfterCamps,
  };
};
export default connect(mapStateToProps, {
  GET_LEADS_TRACKING,
  CREATE_LEADS_TRACKING,
  GET_AFTER_CAMPS,
  CREATE_AFTER_CAMP,
  EDIT_LEADS_TRACKING,
  EDIT_AFTER_CAMP,
  DELETE_LEAD_TRACKING,
  DELETE_AFTER_CAMP,
})(LeadTrackingandaftercamp);
