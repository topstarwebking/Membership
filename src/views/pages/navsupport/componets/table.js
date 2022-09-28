import React, { Fragment, useEffect, useState } from "react";
import {
  CustomInput,
  Dropdown,
  Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {
  Avatar,
  Chip,
  Card,
  CardContent,
  IconButton,
  Grid,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import EditIcon from "@material-ui/icons/Edit";
import EditTicketForm from "./editTicket";
import DataTable from "react-data-table-component";
import { ArrowDown } from "react-feather";
import { UPDATE_TICKET } from "../../../../redux/actions/support";
import { connect } from "react-redux";
const userData = JSON.parse(localStorage.getItem("userdata"));

const useStyles = makeStyles((theme) => ({
  cardroot: {
    width: "100%",
    height: "100%",
    boxShadow:
      " 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2)",
    marginTop: "6px",
  },
  rowCenter: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
}));
const getColor = (status) => {
  if (status === "Open") {
    return { c: "#cc5225", bg: hexToRGB("#cc5225", 0.16) };
  } else if (status === "Complete") {
    return { c: "#25cc28", bg: hexToRGB("#25cc28", 0.16) };
  } else if (status === "Pending") {
    return { c: "#FFB800", bg: hexToRGB("#FFB800", 0.16) };
  } else if (status === "Close") {
    return { c: "#25cc28", bg: hexToRGB("#25cc28", 0.16) };
  }
};

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
export const RowSkeleton = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.cardroot}>
      <CardContent>
        <div className={classes.rowCenter}>
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
          <div style={{ width: "60%", paddingLeft: "8px" }}>
            <Skeleton
              animation="wave"
              variant="rect"
              width={"100%"}
              height={10}
            />
            <Skeleton
              animation="wave"
              variant="text"
              width={"70%"}
              height={10}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
const TableView = (props) => {
  let { loading, data } = props;
  const [Tickets, setTickets] = useState([]);
  const [SelectedEdit, setSelectedEdit] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [id, setId] = useState("");
  const toggle = (item) => {
    setdropdownOpen(!dropdownOpen);
    setId(item);
  };
  useEffect(() => {
    setTickets(data);
  }, [data, setTickets]);
  const handleChangeStatus = (status) => {
    const data = {
      status: status,
    };
    props.UPDATE_TICKET(data, id);
  };
  const HandleSearchingAll = (e) => {
    let { value } = e.target;
    let items = data?.filter(
      (item) =>
        item.subject?.toLowerCase()?.includes(value?.toLowerCase()) ||
        item.status?.toLowerCase()?.includes(value?.toLowerCase())
    );
    setTickets(items);
  };
  const handlefilter = (e) => {
    if (e.target.value === "All") {
      setTickets(data);
    } else {
      let filterData = data?.filter((item) => item?.status === e.target.value);
      setTickets(filterData);
    }
  };
  const selectEdit = (item) => {
    setIsEdit(true);
    setSelectedEdit(item);
  };
  const backTotable = () => {
    setIsEdit(false);
    setSelectedEdit(null);
  };

  const columns = [
    {
      name: "Image",
      selector: (row) => row?.ticket_image,
      sortable: true,
      cell: (row) => (
        <div>
          <Avatar className="mr-1" alt={row?.type} src={row?.ticket_image} />
        </div>
      ),
    },

    {
      name: "Type",
      selector: (row) => row?.subject,
      sortable: true,
      cell: (row) => (
        <Chip className="rounded" size="small" label={row?.type} />
      ),
    },
    {
      name: "Subject",
      selector: (row) => row?.subject,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row?.location,
      sortable: true,
    },
    {
      name: "Created on",
      selector: (row) => moment(row?.date).format("DD-MM-YYYY"),
      sortable: true,
      cell: (row) => <>{moment(row?.date).format("DD-MM-YYYY")}</>,
    },
    {
      name: "Status",
      selector: (row) => row?.status,
      sortable: true,
      cell: (row) => (
        <>
          <Dropdown
            isOpen={dropdownOpen && row?._id === id}
            toggle={() => {
              toggle(row?._id);
            }}
          >
            <DropdownToggle>
              <Chip
                style={{
                  fontWeight: "bold",
                  background: getColor(row?.status)?.bg,
                  color: getColor(row?.status)?.c,
                }}
                className="rounded"
                size="small"
                label={row?.status}
              />
            </DropdownToggle>
            <DropdownMenu>
              {list?.map((element, i) => {
                return (
                  <DropdownItem>
                    <Chip
                      label={element}
                      size="small"
                      style={{
                        fontWeight: "bold",
                        background: getColor(element)?.bg,
                        color: getColor(element)?.c,
                      }}
                      disabled={userData?.data?.role === 0}
                      onClick={() => {
                        handleChangeStatus(element);
                      }}
                    />
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        </>
      ),
    },
    {
      name: "Edit",
      cell: (row) => (
        <>
          <IconButton
            disabled={userData?.data?.role === 1}
            onClick={() => {
              selectEdit(row);
            }}
          >
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];
  return (
    <Fragment>
      {isEdit ? (
        <EditTicketForm SelectedEdit={SelectedEdit} backTotable={backTotable} />
      ) : (
        <Fragment>
          {loading ? (
            [1, 2, 3, 4, 5].map((item) => {
              return <RowSkeleton key={item} />;
            })
          ) : (
            <Fragment>
              <div>
                <Grid
                  ontainer
                  spacing={1}
                  className="d-flex justify-content-end w-100"
                >
                  <Grid item sm={12} md={1} lg={1}>
                    <CustomInput
                      type="select"
                      style={{ maxWidth: "100px" }}
                      onChange={handlefilter}
                    >
                      <option value={"Pending"}>Pending</option>
                      <option value={"Open"}>Open</option>
                      <option value={"Close"}>Close</option>
                      <option value={"All"}>All</option>

                    </CustomInput>
                  </Grid>
                  <Grid item sm={12} md={3} lg={3}>
                    <Input
                      type="text"
                      placeholder="🔍 search for Tickets..... "
                      style={{ maxWidth: "300px" }}
                      onChange={HandleSearchingAll}
                    />
                  </Grid>
                </Grid>
              </div>
              <DataTable
                columns={columns}
                data={Tickets?.length ? Tickets : []}
                pagination
                sortIcon={<ArrowDown />}
              />
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default connect(null, { UPDATE_TICKET })(TableView);
const list = ["Pending", "Open", "Close",];
