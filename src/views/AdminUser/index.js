import {
  Avatar,
  Card,
  Typography,
  InputBase,
  Button,
  CardContent,
  Grid,
} from "@material-ui/core";
import AddCriditAndHistory from "./AddCriditAndHistory";
import { Input } from "reactstrap";

import { Copy, Eye } from "react-feather";
import {
  GET_SCHOOL_LIST_FOR_ADMIN,
  SEARCH_USER_FOR_ADMIN,
} from "../../redux/actions/admin/School";
import Listinglocation from "./Listinglocation";
import AddTwilioNumber from "./addTwilioNum";

import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { connect } from "react-redux";
const colorList = [
  "#3371FF",
  "#35068D",
  "#B9160C",
  "#2EB90C",
  "#E70CAE",
  "#B2071C",
];
function hexToRGB(hex, alpha) {
  try {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  } catch (error) {
    return hex;
  }
}

const getRandomBG = () => {
  return colorList[Math.floor(Math.random() * colorList.length)];
};

const AttendanceHistory = (props) => {
  const [showPassWord, setShowPassWord] = useState([]);
  const [pwCopy, setPwCopy] = useState("");
  const [pageSize, setPageSize] = React.useState(10);

  const CopyPassWord = (item) => {
    window.navigator.clipboard.writeText(item?.password);
    setPwCopy(item?.password);
  };
  const ViewPassWord = (item) => {
    setShowPassWord(item);
  };
  const columns = [
    {
      field: "Full Name",
      sortable: false,
      width: 200,
      filterable: false,
      hidable: false,
      renderCell: (params) => {
        return (
          <>
            <div className="d-flex justify-conetnt-center text-center">
              <Avatar
                src="hs"
                alt={params?.row?.firstname}
                style={{
                  background: hexToRGB(getRandomBG(), 0.16),
                  color: "gray",
                }}
              />
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
      width: 300,
      filterable: false,
      hidable: false,
      autoHeight: false,
      renderCell: (params) => {
        return (
          <>
            <div>
              <InputBase
                className="p-0"
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
      width: 300,
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
      field: "Mange",
      sortable: false,
      width: 100,
      filterable: false,
      hidable: false,
      renderCell: (params) => {
        return (
          <>
            <Listinglocation item={params?.row} />
          </>
        );
      },
    },
    {
      field: "Twilio # Add",
      sortable: false,
      width: 150,
      filterable: false,
      hidable: false,
      renderCell: (params) => {
        return (
          <>
            <AddTwilioNumber
              TwilioInfo={{
                twilio_number: params?.row.twilio,
                uid: params?.row._id,
              }}
            />
          </>
        );
      },
    },
    {
      field: "Text credit",
      sortable: false,
      width: 150,
      filterable: false,
      hidable: false,
      renderCell: (params) => {
        return (
          <>
            <AddCriditAndHistory item={params?.row} />
          </>
        );
      },
    },
  ];
  useEffect(() => {
    props.GET_SCHOOL_LIST_FOR_ADMIN();
  }, []);

  const HandleSearch = async (value) => {
    if (value.length > 2) {
      await props.SEARCH_USER_FOR_ADMIN(value);
    }
    if (value === "") {
      await props.GET_SCHOOL_LIST_FOR_ADMIN();
    }
  };
  return (
    <Card>
      <CardContent>
        <div className="p-1 m-1">
          <Grid container spacing={1} className="justify-content-end">
            <Grid item sm={3} md={3} lg={3}>
              <form>
                <Input
                  name="search "
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
})(AttendanceHistory);
