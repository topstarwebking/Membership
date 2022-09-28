import {
  Card,
  Chip,
  Grid,
  makeStyles,
  CardContent,
  Typography,
  InputBase,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  GET_SCHOOL_LIST_FOR_ADMIN,
  HANDLE_ACTIVE_INACTIVE_BY_ADMIN,
  SEARCH_USER_FOR_ADMIN,
} from "../../redux/actions/admin/School";
import { DataGrid } from "@material-ui/data-grid";
import SweetAlert from "react-bootstrap-sweetalert";
import { Copy, Eye } from "react-feather";
import SchoolsValorCredential from "./schoolsValorCredential";
import moment from "moment";
import { Input } from "reactstrap";
import AddLocation from "./AddLocation";

const useStyles = makeStyles(() => ({
  mainCard: {
    height: "80Vh",
    overflow: "auto",
  },

  ActiveChip: {
    background: "#def8e7",
    color: "#5aa65c",
  },
  inActiveChip: {
    background: "#f9d2d0",
    color: "#e05252",
  },
}));

const AttendanceHistory = (props) => {
  const classes = useStyles();
  const [pageSize, setPageSize] = React.useState(10);
  const [showPassWord, setShowPassWord] = useState([]);
  const [pwCopy, setPwCopy] = useState("");
  const { SEARCH_USER_FOR_ADMIN, GET_SCHOOL_LIST_FOR_ADMIN } = props;
  const [searchValue, setserchValue] = useState("");
  const [SweetAlertOpen, setSweetAlertOpen] = useState({
    actionId: null,
    folderType: "",
    open: false,
  });
  const CopyPassWord = (item) => {
    window.navigator.clipboard.writeText(item?.password);
    setPwCopy(item?.password);
  };
  const ViewPassWord = (item) => {
    setShowPassWord(item);
  };
  const handleActive = (school) => {
    setSweetAlertOpen({ school: school, open: true });
  };
  const handleOnConfirm = () => {
    let { school } = SweetAlertOpen;
    let payload = {
      status: school?.status === "Active" ? "Inactive" : "Active",
      isVerify: !school?.isVerify,
    };
    props.HANDLE_ACTIVE_INACTIVE_BY_ADMIN(payload, school?._id);
    setSweetAlertOpen({ actionId: null, folderType: "", open: false });
  };

  const handleOnCancel = () => {
    setSweetAlertOpen({ actionId: null, folderType: "", open: false });
  };
  const columns = [
    {
      field: "Client Id",
      sortable: false,
      width: 200,
      filterable: false,
      hidable: false,
      autoHeight: false,
      renderCell: (params) => {
        return (
          <>
            <div>
              <AddLocation data={params?.row} setserchValue={setserchValue} />
            </div>
          </>
        );
      },
    },
    {
      field: "Full Name",
      sortable: false,
      width: 180,
      filterable: false,
      hidable: false,
      renderCell: (params) => {
        return (
          <>
            <div className="d-flex justify-conetnt-center text-center">
              <Typography
                color="textSecondary"
                className="m-0 ml-1 d-flex align-items-center"
              >
                <b>
                  {`${params?.row?.firstname} ${params?.row?.lastname || " "} `}
                </b>
              </Typography>
            </div>
          </>
        );
      },
    },
    {
      field: "Username",
      sortable: false,
      width: 200,
      filterable: false,
      hidable: false,
      autoHeight: false,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Typography color="textSecondary" align="left" className="m-0">
                <b>{params?.row?.username}</b>
              </Typography>
            </div>
          </>
        );
      },
    },
    {
      field: "Password",
      sortable: false,
      width: 200,
      filterable: false,
      hidable: false,
      autoHeight: false,
      renderCell: (params) => {
        return (
          <>
            <div>
              <InputBase
                className="p-0"
                style={{ width: 100 }}
                type={
                  showPassWord?.password === params?.row?.password &&
                  showPassWord?.username === params?.row?.username
                    ? "text"
                    : "password"
                }
                value={params?.row?.password}
              />
              {showPassWord?.password === params?.row?.password &&
              showPassWord?.username === params?.row?.username ? (
                <Button
                  size="small"
                  onClick={() => {
                    CopyPassWord(params?.row);
                  }}
                >
                  {pwCopy === showPassWord?.password ? (
                    <span style={{ fontSize: "0.8em" }}>Copied</span>
                  ) : (
                    <Copy style={{ color: "#ababab" }} />
                  )}
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    ViewPassWord(params?.row);
                  }}
                >
                  <Eye style={{ color: "#ababab" }} />
                </Button>
              )}
            </div>
          </>
        );
      },
    },
    {
      field: "Email",
      sortable: false,
      width: 250,
      filterable: false,
      hidable: false,
      renderCell: (params) => {
        return (
          <>
            <Typography color="textSecondary" align="left" className="m-0">
              <b>{`${params?.row?.email}, `}</b>
            </Typography>
          </>
        );
      },
    },

    {
      field: "phone",
      sortable: false,
      width: 150,
      filterable: false,
      hidable: false,
      renderCell: (params) => {
        return (
          <>
            <Typography color="textSecondary" align="left" className="m-0">
              <b>{`${params?.row?.phone}, `}</b>
            </Typography>
          </>
        );
      },
    },
    {
      field: "Created",
      sortable: false,
      width: 100,
      filterable: false,
      hidable: false,
      renderCell: (params) => {
        return (
          <>
            {params?.row?.createdAt
              ? moment(params?.row?.createdAt).format("MM-DD-YYYY")
              : "No Record Found"}
          </>
        );
      },
    },
    {
      field: "Valor Credential",
      sortable: false,
      width: 100,
      filterable: false,
      hidable: false,
      renderCell: (params) => {
        return (
          <>
            <SchoolsValorCredential schoolInfo={params?.row} />
          </>
        );
      },
    },
    {
      field: "Status",
      sortable: false,
      width: 100,
      filterable: false,
      hidable: false,
      renderCell: (params) => {
        return (
          <>
            <Chip
              onClick={() => {
                handleActive(params?.row);
              }}
              size={"small"}
              className={
                params?.row?.status === "Active"
                  ? classes.ActiveChip
                  : classes.inActiveChip
              }
              label={params?.row?.status === "Active" ? "Active" : "Inactive"}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    GET_SCHOOL_LIST_FOR_ADMIN();
  }, [GET_SCHOOL_LIST_FOR_ADMIN]);

  const HandleSearch = (value) => {
    setserchValue(value);
  };
  useEffect(() => {
    if (searchValue.length > 2) {
      SEARCH_USER_FOR_ADMIN(searchValue);
    }
    if (searchValue === "") {
      GET_SCHOOL_LIST_FOR_ADMIN();
    }
  }, [GET_SCHOOL_LIST_FOR_ADMIN, SEARCH_USER_FOR_ADMIN, searchValue]);
  return (
    <Card>
      <CardContent>
        <div className="p-1 m-1">
          <Grid container spacing={1} className="justify-content-end">
            <Grid item sm={3} md={3} lg={3}>
              <form>
                <Input
                  name="search "
                  value={searchValue}
                  onChange={(e) => {
                    HandleSearch(e.target.value);
                  }}
                  placeholder="search..."
                />
              </form>
            </Grid>
          </Grid>
        </div>
        <div
          style={{
            height: 680,
            width: "100%",
            overflowX: "hidden !important",
            padding: "1rem",
          }}
        >
          <DataGrid
            rows={props.schoolList?.data || []}
            columns={columns}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            pagination
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          />
        </div>
      </CardContent>
      <SweetAlert
        title="Are you sure?"
        warning
        show={SweetAlertOpen?.open}
        showCancel
        reverseButtons
        cancelBtnBsStyle="info"
        confirmBtnText={`Yes, ${
          SweetAlertOpen?.school?.status !== "Active" ? "Active" : "Inactive"
        } it!`}
        cancelBtnText="Cancel"
        onConfirm={handleOnConfirm}
        onCancel={handleOnCancel}
      >
        Are you sure you want to{" "}
        {SweetAlertOpen?.school?.status !== "Active" ? "Active" : "Inactive"}
      </SweetAlert>
    </Card>
  );
};
const mapStateToProps = (state) => {
  return {
    schoolList: state.adminSchoolReducer.schoolList,
  };
};
export default connect(mapStateToProps, {
  GET_SCHOOL_LIST_FOR_ADMIN,
  SEARCH_USER_FOR_ADMIN,
  HANDLE_ACTIVE_INACTIVE_BY_ADMIN,
})(AttendanceHistory);
