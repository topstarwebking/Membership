import React, { useState, useEffect,Fragment } from "react";
import { X } from "react-feather";
import {
  Row,
  Col,
  Card,
  CardBody,
  // Progress,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { Dialog, DialogContent, Avatar } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import SweetAlert from "react-bootstrap-sweetalert";
import Collapsible from "react-collapsible";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import Spinner from "../../../../../components/@vuexy/spinner/Loading-spinner";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Breadcrumbs from "../../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import "../../../../../assets/scss/pages/finance.scss";
import PageLink from "../components/PageLink";
import moment from "moment";
import EventNote from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDayTwoTone";
import DirectionsRun from "@material-ui/icons/DirectionsRun";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import {
  // Chip,
  // TextField,
  TableBody,
  Table,
  TableCell,
  TableRow,
  Chip,
} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Edit, Trash } from "react-feather";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  getExpenseByCategoryAction,
  getExpenseMonthlyComopareAction,
  getTodaysExpenseAction,
  getWeeklyExpenseAction,
  getMonthlyExpenseAction,
  getYearlyExpenseAction,
  getExpenseReportFilterAction,
  DeleteExpenseById,
  createExpenseCategoryAction,
  addExpenseAction,
  ExpenseCategoryList,
  onTimeExpenseRequest,
  onGoingExpenseReqeust,
  deleteCategoryAction,
  categoryUpdateAction,
  getLastMonthExpenseAction,
} from "../../../../../redux/actions/mymoney/index";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
// import EditIcon from "@material-ui/icons/Edit";
import MButton from "@material-ui/core/Button";

import DeleteIcon from "@material-ui/icons/Delete";
// import Edit from "@material-ui/icons/Edit";

import ProgressBar from "../../../../../components/material/ProgressBar";
import GreenAlertForSuccess from "../../../../../components/@vuexy/GreenAlertForSuccess/GreenAlertForSuccess.js";

const IsSmallDevise = window.matchMedia("(max-width:624px)").matches;

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const Expense = () => {
  const [showMessage, setShowMessage] = useState({
    open: false,
    className: "",
    message: "",
  });
  const [open, setOpen] = useState(false);
  const [openImages, setOpenImages] = useState(false);
  const handleOpenAllImages = () => {
    setOpenImages(true);
  };
  function handleMessageClose() {
    setShowMessage({
      open: false,
      className: "",
      message: "",
    });
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const [isCategoryListModalOpen, setIsCategoryListModalOpen] = useState(false);

  function modalToggle() {
    setIsModalOpen((p) => !p);
  }
  function categoryModalToggle() {
    setIsCategoryModalOpen((p) => !p);
  }

  function categoryListModalToggle() {
    setIsCategoryListModalOpen((p) => !p);
  }

  const dispatch = useDispatch();

  const {
    expenseState: {
      list: expenseStateParcentage,
      loading: expenseStateLoading,
    },
    monthlyCompare: {
      loading: monthlyCompareLoading,
      list: monthlyCompareList,
    },
    // todaysExpense: { loading: todaysExpenseLoading, amount: todaysExpense },
    // thisWeekyExpense: { amount: weeklyAmount },
    thisMonthExpense: { amount: monthlyAmount },
    // thisYearExpense: { amount: yearlyAmount },
    report,
    deleteExpense,
    categoryAdd,
    expenseAdd,
    onTimeExpense,
    onGoingExpense,
    categoryDelete,
    categoryUpdate,
    lastMonthExpense,
  } = useSelector((state) => state.expense);

  const { expenseCategoryList } = useSelector((state) => state.mymoney);

  function fetchAllData() {
    dispatch(getExpenseByCategoryAction());
    dispatch(getExpenseMonthlyComopareAction());
    dispatch(getTodaysExpenseAction());
    dispatch(getWeeklyExpenseAction());
    dispatch(getMonthlyExpenseAction());
    dispatch(getYearlyExpenseAction());
    dispatch(ExpenseCategoryList());
    dispatch(getLastMonthExpenseAction());
    dispatch(onTimeExpenseRequest("One Time"));
    dispatch(onGoingExpenseReqeust("Ongoing"));
  }

  useEffect(() => {
    fetchAllData();
    // eslint-disable-next-line
  }, [dispatch]);

  function getMonth(key) {
    const monthNames = [
      { key: 0, name: "January" },
      { key: 1, name: "February" },
      { key: 2, name: "March" },
      { key: 3, name: "April" },
      { key: 4, name: "May" },
      { key: 5, name: "June" },
      { key: 6, name: "July" },
      { key: 7, name: "August" },
      { key: 8, name: "September" },
      { key: 9, name: "October" },
      { key: 10, name: "November" },
      { key: 11, name: "December" },
    ];

    return monthNames.find((x) => x.key === key).name;
  }

  // Details report Filtering
  const [paymentSystem, setPaymentSystem] = useState("One Time");
  const [month, setMonth] = useState(() => new Date().getMonth());
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [page, setPage] = useState([]);

  // temp

  const [monthName, setMonthName] = useState(() =>
    getMonth(new Date().getMonth())
  );

  function filterData() {
    dispatch(getExpenseReportFilterAction(paymentSystem, month, year, page));
  }

  useEffect(() => {
    filterData();
    // eslint-disable-next-line
  }, []);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deletedSuccess, setDeletedSuccess] = useState(false);

  function successDeleteMessage() {
    //Success Mesage
    setDeletedSuccess(true);
    dispatch({
      type: "EXPENSE_DELETE_RESET",
    });
  }

  useEffect(() => {
    if (deleteExpense.success) {
      successDeleteMessage();
    }
  }, [deleteExpense]);

  function deleteExpenseHandler(id) {
    setDeleteId(id);
    setShowConfirm(true);
  }

  const columns = [
    {
      name: "Date",
      selector: (row) => moment(row.date).format("L"),
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Subject",
      selector: (row) => row.subject,
    },

    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Image",
      selector: (row) =>
        row.expense_image === "" ? (
          "no image"
        ) : (
          <Fragment>
            <AvatarGroup
              className="cursor-pointer"
              style={{ borderRadius: "2px" }}
              onClick={handleOpenAllImages}
              max={4}
            >
              {
                <Avatar
                  key={row?._id}
                  alt={row.expense_image}
                  src={row.expense_image}
                  style={{ borderRadius: "2px" }}
                />
              }
            </AvatarGroup>
            <Dialog
              maxWidth="large"
              open={openImages}
              onClose={() => {
                setOpenImages(false);
              }}
            >
              <DialogContent>
                <div className="close-icon d-flex justify-content-end ">
                  <X
                    className="cursor-pointer"
                    size={20}
                    onClick={() => {
                      setOpenImages(false);
                    }}
                  />
                </div>
                <div className="d-flex">
                      <a href={row?.expense_image} target="_blank">
                        <div className="d-flex justify-content-start mx-1 my-2">
                          <img
                            style={{ width: 300, height: 200 }}
                            alt={row?.expense_image}
                            src={row?.expense_image}
                          />
                        </div>
                      </a>
                </div>
              </DialogContent>
            </Dialog>
          </Fragment>
        ),
    },

    {
      name: "Manage",
      width: "100px",
      selector: (row) => (
        <>
          <MButton onClick={() => deleteExpenseHandler(row._id)}>
            <DeleteOutlineIcon />
          </MButton>
        </>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "40px",
      },
    },
    header: {
      style: {
        fontSize: "10px",
      },
    },
    cells: {
      style: {
        color: "#828282",
        fontSize: "12px",
      },
    },
  };

  function changeMonth(key) {
    setMonth(key);
    setMonthName(getMonth(key));
  }

  function handleFilter() {
    filterData();
  }

  // Add Category
  const [categoryState, setCategoryState] = useState({
    expense_category_type: "",
    color: "#dadada",
  });

  function handleCategoryAdd() {
    if (categoryState.expense_category_type === "") {
      // show error message
    } else {
      dispatch(createExpenseCategoryAction(categoryState));
    }
  }

  useEffect(() => {
    if (categoryAdd.success) {
      dispatch({
        type: "EXPENSE_CATEGORY_ADD_RESET",
      });
      categoryModalToggle();
      // Refetch Category Again
      dispatch(ExpenseCategoryList());

      setCategoryState((p) => ({
        ...p,
        expense_category_type: "",
      }));
      setShowMessage({
        open: true,
        className: "success",
        message: "Expense category Added",
      });

      // refefatch category state
      dispatch(getExpenseByCategoryAction());
    }
  }, [categoryAdd, dispatch]);

  // Add Expense

  const [expense, setExpense] = useState({
    amount: 0,
    category: "",
    description: "",
    expenses: "One Time",
    date: new Date(),
    expense_image: "",
    subject: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setExpense((p) => ({ ...p, [name]: value }));
  }

  useEffect(() => {
    if (expenseAdd.success) {
      dispatch({
        type: "EXPENSE_ADD_RESET",
      });
      setIsModalOpen(false);
      // reset form data
      setExpense((p) => ({ ...p, amount: 0, description: "", subject: "" }));
      fetchAllData();

      setShowMessage({
        open: true,
        className: "success",
        message: "Expense Added Successfully",
      });
    }

    if (expenseAdd.error !== "") {
      setShowMessage({
        open: true,
        className: "error",
        message: expenseAdd.error,
      });
    }
  }, [expenseAdd]);

  function handleExpenseAdd() {
    // check and validation
    dispatch(addExpenseAction(expense, paymentSystem, month, year, page));
  }

  const [years] = useState(() => {
    let data = [];
    let currentYear = new Date().getFullYear();
    for (let i = 5; i > 0; i--) {
      data.push(currentYear - i);
    }
    data.reverse();
    return [currentYear, ...data];
  });

  function changeYear(ynum, key) {
    setYear(key);
  }

  function yearList(ynum) {
    return (
      <React.Fragment>
        {years.map((x) => (
          <DropdownItem key={x} onClick={() => changeYear(ynum, x)} tag="a">
            {x}
          </DropdownItem>
        ))}
      </React.Fragment>
    );
  }

  // Delete category
  // First Confirm Cateogy then call delete function

  const [categoryDeleteModal, setCategoryDeleteModal] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  // Delete Category
  useEffect(() => {
    if (categoryDelete.success) {
      dispatch({
        type: "EXPENSE_CATEGORY_DELETE_RESET",
      });
      setCategoryDeleteModal(false);

      setShowMessage({
        open: true,
        className: "success",
        message: "category Deleted",
      });

      // Refetch Category Again
      dispatch(ExpenseCategoryList()); // refefatch category state
      dispatch(getExpenseByCategoryAction());
    }

    if (categoryDelete.error !== "") {
      // show Error
      setShowMessage({
        open: true,
        className: "error",
        message: categoryDelete.error,
      });
    }
  }, [categoryDelete, dispatch]);

  function categoryDeleteHandler(id) {
    setCategoryId(id);
    setCategoryDeleteModal(true);
  }

  // Update Category
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [updateCategory, setUpdateCategory] = useState({
    _id: "",
    expense_category_type: "",
    color: "#dadada",
  });

  // Update Category
  useEffect(() => {
    if (categoryUpdate.success) {
      dispatch({
        type: "EXPENSE_CATEGORY_UPDATE_RESET",
      });
      setUpdateCategoryModal(false);
      // Refetch Category Again
      dispatch(ExpenseCategoryList());
      // refefatch category state
      fetchAllData();
      setShowMessage({
        open: true,
        className: "success",
        message: "category Updated",
      });
    }
  }, [categoryUpdate, dispatch]);

  function handleCategoryUpdate() {
    dispatch(categoryUpdateAction(updateCategory));
  }

  // category -===========

  function onCategoryEditHandler(data) {
    setUpdateCategory(data);
    setUpdateCategoryModal(true);
  }

  function categoryDeleteHandle(id) {
    categoryDeleteHandler(id);
  }

  // expense category change handler
  function expenseCategoryChangeHandler(event) {
    const { name, value } = event.target;
    setCategoryState((p) => ({ ...p, [name]: value }));
  }

  return (
    <div>
      <Breadcrumbs
        breadCrumbTitle="My Money"
        breadCrumbParent="My Money"
        breadCrumbActive="Expense"
      />
      <Row>
        <Col md="3">
          <PageLink>
            <div className="section-header">
              <div className="d-flex justify-content-between align-items-center">
                <span className="section-title">Add Expense</span>
                <button className="custom-inline-btn" onClick={modalToggle}>
                  Add
                </button>
              </div>
              <div className="divider" />
            </div>

            <Modal
              isOpen={isModalOpen}
              toggle={modalToggle}
              className="modal-dialog-centered"
            >
              <ModalHeader toggle={modalToggle}>Add Expense</ModalHeader>
              <ModalBody>
                <Form>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label htmlFor="">Name</Label>
                        <Input
                          onChange={handleChange}
                          name="subject"
                          value={expense?.subject}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label htmlFor="">Category</Label>
                        <select
                          name="category"
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option>select category</option>
                          {expenseCategoryList &&
                            expenseCategoryList?.map((x) => (
                              <option
                                key={x?._id}
                                value={x?.expense_category_type}
                              >
                                {x?.expense_category_type}
                              </option>
                            ))}
                        </select>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label htmlFor="">Type</Label>
                        <select
                          name="expenses"
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="One Time">One Time</option>
                          <option value="Ongoing">Ongoing</option>
                        </select>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label htmlFor="">Payment Type</Label>
                        <select
                          onChange={handleChange}
                          className="form-control"
                          name="paymentType"
                        >
                          <option>Cash</option>
                          <option>Bank</option>
                        </select>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label htmlFor="">Amount</Label>
                        <Input
                          onChange={handleChange}
                          type="number"
                          name="amount"
                          value={expense?.amount}
                          onFocus={(e) => e.target.select()}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label htmlFor="">Date</Label>
                        <Input
                          onChange={handleChange}
                          type="date"
                          name="date"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <Label htmlFor="">Description</Label>
                        <textarea
                          onChange={handleChange}
                          value={expense?.description}
                          name="description"
                          className="form-control"
                          cols="30"
                          rows="2"
                        ></textarea>
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <input
                          name="expense_image"
                          onChange={(e) => {
                            setExpense((p) => ({
                              ...p,
                              expense_image: e.target.files[0],
                            }));
                          }}
                          type="file"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="cancel_btn_modal"
                  onClick={categoryModalToggle}
                >
                  Cancel
                </Button>
                <Button
                  disabled={expenseAdd.loading}
                  color="primary"
                  onClick={handleExpenseAdd}
                >
                  {expenseAdd.loading === true ? "Adding" : "Add"}
                </Button>
              </ModalFooter>
            </Modal>

            <div className="section-header">
              <span className="section-title">Expense Status</span>
              <div className="divider" />
            </div>

            <div className="stat-table mb-2">
              <div className="d-flex justify-content-between stat-thead">
                <span>Category</span>
                <span>This Month</span>
                <span>Last Month</span>
              </div>

              {monthlyCompareLoading && (
                <>
                  <span className="skeleton-loader-gradient skeleton-mb-1"></span>
                  <span className="skeleton-loader-gradient"></span>
                </>
              )}

              <div
                style={{
                  overflowY: "scroll",
                  height: "110px",
                }}
              >
                {monthlyCompareList &&
                  monthlyCompareList.map((x) => (
                    <div
                      key={x.category}
                      className="d-flex justify-content-between stat-tr"
                    >
                      <span style={{ flex: 1 }}>{x.category}</span>
                      <span className="expense_state_alignment">
                        {x.current}
                      </span>
                      <span
                        className="expense_state_alignment"
                        style={{ textAlign: "right" }}
                      >
                        {x.previous}
                      </span>
                      <div className="ml-2"></div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="section-header">
              <div className="d-flex justify-content-between align-items-center">
                <span className="section-title">Expense by Category</span>

                <div className="category_btns_expense">
                  <button
                    className="custom-inline-btn "
                    onClick={categoryListModalToggle}
                  >
                    Manage
                  </button>
                </div>

                {/* <div className="category_btns_expense">
                  <button
                    className="custom-inline-btn "
                    onClick={categoryListModalToggle}
                  >
                    list
                  </button>
                  <button
                    className="custom-inline-btn "
                    onClick={categoryModalToggle}
                  >
                    Add
                  </button>
                </div> */}
              </div>
              <div className="divider" />
            </div>

            <Modal
              isOpen={isCategoryModalOpen}
              toggle={categoryModalToggle}
              className="modal-dialog-centered"
            >
              <ModalHeader toggle={categoryModalToggle}>
                Add Expense Category
              </ModalHeader>
              <ModalBody>
                <Form>
                  <Row>
                    <Col md={12}>
                      <FormGroup>
                        <Label htmlFor="catName">Category Name</Label>
                        <Input
                          onChange={expenseCategoryChangeHandler}
                          value={categoryState.expense_category_type}
                          id="catName"
                          name="expense_category_type"
                          placeholder="Category Name"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={12}>
                      <FormGroup>
                        <div htmlFor="color">Select Color</div>
                        <div className="colorPicker">
                          <input
                            value={categoryState.color}
                            onChange={expenseCategoryChangeHandler}
                            id="color"
                            name="color"
                            type="color"
                          />
                          <span>Color Picker</span>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button onClick={categoryModalToggle}>Cancel</Button>
                <Button
                  disabled={categoryAdd.loading}
                  color="primary"
                  onClick={handleCategoryAdd}
                >
                  {categoryAdd.loading === true ? "Adding" : "Add"}
                </Button>
              </ModalFooter>
            </Modal>

            <Modal
              isOpen={false}
              toggle={categoryListModalToggle}
              className="modal-dialog-centered"
            >
              <ModalHeader toggle={categoryListModalToggle}>
                Category List
              </ModalHeader>
              <ModalBody>
                <ListGroup>
                  {expenseCategoryList &&
                    expenseCategoryList.map((x) => (
                      <ListGroupItem className="category_item" key={x._id}>
                        <span>{x.expense_category_type}</span>

                        <span>
                          <Edit
                            onClick={(e) => {
                              setUpdateCategory(x);
                              setUpdateCategoryModal(true);
                            }}
                            className="cat-action-icon"
                          />
                          <DeleteIcon
                            onClick={() => categoryDeleteHandler(x._id)}
                            className="cat-action-icon"
                          />
                        </span>
                      </ListGroupItem>
                    ))}
                </ListGroup>
              </ModalBody>
              <ModalFooter>
                <Button onClick={categoryListModalToggle}>Close</Button>
              </ModalFooter>
            </Modal>

            <Modal
              isOpen={updateCategoryModal}
              toggle={() => {
                setUpdateCategoryModal((p) => !p);
              }}
              className="modal-dialog-centered"
            >
              <ModalHeader
                toggle={() => {
                  setUpdateCategoryModal((p) => !p);
                }}
              >
                Update Expense Category
              </ModalHeader>
              <ModalBody>
                <Form>
                  <Row>
                    <Col md={12}>
                      <FormGroup>
                        <Label htmlFor="catName">Category Name</Label>
                        <Input
                          onChange={(e) =>
                            setUpdateCategory((p) => ({
                              ...p,
                              expense_category_type: e.target.value,
                            }))
                          }
                          value={updateCategory.expense_category_type}
                          id="catName"
                          name="name"
                          placeholder="Category Name"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={12}>
                      <FormGroup>
                        <div htmlFor="color">Select Color</div>
                        <div className="colorPicker">
                          <input
                            value={updateCategory.color}
                            onChange={(e) =>
                              setUpdateCategory((p) => ({
                                ...p,
                                color: e.target.value,
                              }))
                            }
                            id="color"
                            name="color"
                            type="color"
                          />
                          <span>Color Picker</span>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => setUpdateCategoryModal((p) => !p)}>
                  Cancel
                </Button>
                <Button
                  disabled={categoryAdd.loading}
                  color="primary"
                  onClick={handleCategoryUpdate}
                >
                  {categoryUpdate.loading === true ? "Updating" : "Update"}
                </Button>
              </ModalFooter>
            </Modal>

            <div className="">
              {expenseStateLoading && (
                <>
                  <span className="skeleton-loader-gradient skeleton-mb-1"></span>
                  <span className="skeleton-loader-gradient"></span>
                </>
              )}
              <div
                style={{
                  overflowY: "scroll",
                  height: "500px",
                }}
              >
                {expenseStateParcentage &&
                  expenseStateParcentage?.map((x, i) => (
                    <>
                      <div
                        className="p-1"
                        style={{ height: "40px", width: "auto" }}
                        key={`${x?._id}${i}`}
                      >
                        <div className="unit-progress">
                          <span>{x?._id}</span>
                          <span>{x?.percentage} %</span>
                        </div>
                        <ProgressBar
                          color={x?.color}
                          value={parseFloat(x?.percentage)}
                        />
                      </div>
                    </>
                  ))}
              </div>
            </div>
          </PageLink>
        </Col>
        <Col md="9">
          <Row className="single-stat-grid">
            {/* <Card className="mr-1">
              <div className="p-1">
                <span>Today</span>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="mini-card-amt">
                    ${todaysExpenseLoading ? 0 : todaysExpense && todaysExpense}
                  </span>
                  <div style={{ width: 25, height: 25 }}>
                    <CircularProgressbar
                      value={66}
                      styles={buildStyles({
                        pathColor: "#0184FF",
                        trailColor: "#d6d6d6",
                      })}
                    />
                  </div>
                </div>
              </div>
            </Card> */}

            {/* <Card className="mr-1">
              <div className="p-1">
                <span>This Week</span>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="mini-card-amt">${weeklyAmount}</span>
                  <div style={{ width: 25, height: 25 }}>
                    <CircularProgressbar
                      value={66}
                      styles={buildStyles({
                        pathColor: "#FF753A",
                        trailColor: "#d6d6d6",
                      })}
                    />
                  </div>
                </div>
              </div>
            </Card> */}

            {/* <Card className="mr-1">
              <div className="p-1">
                <span>This Month</span>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="mini-card-amt">${monthlyAmount}</span>
                  <div style={{ width: 25, height: 25 }}>
                    <CircularProgressbar
                      value={66}
                      styles={buildStyles({
                        pathColor: "#FFCA0D",
                        trailColor: "#d6d6d6",
                      })}
                    />
                  </div>
                </div>
              </div>
            </Card> */}

            {/* <Card>
              <div className="p-1">
                <span>This Year</span>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="mini-card-amt">${yearlyAmount}</span>
                  <div style={{ width: 25, height: 25 }}>
                    <CircularProgressbar
                      value={66}
                      styles={buildStyles({
                        pathColor: "#FF5A5A",
                        trailColor: "#d6d6d6",
                      })}
                    />
                  </div>
                </div>
              </div>
            </Card> */}

            <Card className="mr-1">
              <div className="p-1">
                <span>This Month</span>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="mini-card-amt">${monthlyAmount}</span>

                  <div
                    className="sch-icon"
                    style={{ backgroundColor: "#e9f1ff" }}
                  >
                    <CalendarViewDayIcon style={{ color: "#0184ff" }} />
                  </div>
                  {/* <div style={{ width: 25, height: 25 }}> */}
                  {/* <CircularProgressbar
                      value={66}
                      styles={buildStyles({
                        pathColor: "#0184FF",
                        trailColor: "#d6d6d6",
                      })}
                    /> */}
                  {/* </div> */}
                </div>
              </div>
            </Card>
            <Card className="mr-1">
              <div className="p-1">
                <span>Ongoing</span>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="mini-card-amt">
                    ${onGoingExpense && onGoingExpense.amount}
                  </span>

                  <div
                    className="sch-icon"
                    style={{ backgroundColor: "#ffc6c6" }}
                  >
                    <DirectionsRun style={{ color: "#ff3e3e" }} />
                  </div>

                  {/* <div style={{ width: 25, height: 25 }}> */}
                  {/* <CircularProgressbar
                      value={66}
                      styles={buildStyles({
                        pathColor: "#FF753A",
                        trailColor: "#d6d6d6",
                      })}
                    /> */}
                  {/* </div> */}
                </div>
              </div>
            </Card>
            <Card className="mr-1">
              <div className="p-1">
                <span>One Time</span>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="mini-card-amt">
                    ${onTimeExpense && onTimeExpense.amount}
                  </span>
                  <div
                    className="sch-icon"
                    style={{ backgroundColor: "#ffead2" }}
                  >
                    <AccessTimeIcon style={{ color: "#fb8700" }} />
                  </div>
                  {/* <div style={{ width: 25, height: 25 }}> */}
                  {/* <CircularProgressbar
                      value={66}
                      styles={buildStyles({
                        pathColor: "#FFCA0D",
                        trailColor: "#d6d6d6",
                      })}
                    /> */}
                  {/* </div> */}
                </div>
              </div>
            </Card>
            <Card className="mr-1">
              <div className="p-1">
                <span>Last Month</span>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="mini-card-amt">
                    ${lastMonthExpense && lastMonthExpense.amount}
                  </span>
                  <div
                    className="sch-icon"
                    style={{ backgroundColor: "#f1dfff" }}
                  >
                    <EventNote style={{ color: "#ce41ff" }} />
                  </div>
                </div>
              </div>
            </Card>
          </Row>
          <Row className="d-flex justify-content-between align-items-center pb-1">
            <div>
              <div className="filter-title">
                <h4>EXPENSE REPORT</h4>
              </div>
              <div className="income-total">
                {/* <span>
                  UPCOMING -{" "}
                  <strong className="income-amt-coming">$4045</strong>
                </span> */}
                <span style={{ fontSize: "14px" }}>
                  TOTAL EXPENSES -{" "}
                  <strong
                    style={{ fontSize: "14px" }}
                    className="income-amt-collected"
                  >
                    ${report.loading ? " -" : report.totalExpense}
                  </strong>
                </span>
              </div>
            </div>
            <div className="d-flex">
              <UncontrolledDropdown className="mr-1">
                <DropdownToggle className="p-0">
                  <Chip
                    label={`${paymentSystem}`}
                    icon={<ChevronDown size={14} className="chevron" />}
                    size="medium"
                    className="rounded"
                    style={{
                      background: "transparent",
                      color: "gray",
                      border: "1px solid #9aa9b7",
                    }}
                  />
                </DropdownToggle>
                <DropdownMenu tag="div" right>
                  <DropdownItem
                    onClick={(_) => setPaymentSystem("One Time")}
                    tag="a"
                  >
                    One Time
                  </DropdownItem>
                  <DropdownItem
                    onClick={(_) => setPaymentSystem("Ongoing")}
                    tag="a"
                  >
                    Ongoing
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown className="mr-1">
                <DropdownToggle className="p-0">
                  <Chip
                    label={monthName}
                    icon={<ChevronDown size={14} className="chevron" />}
                    size="medium"
                    className="rounded"
                    style={{
                      background: "transparent",
                      color: "gray",
                      border: "1px solid #9aa9b7",
                    }}
                  />
                </DropdownToggle>
                <DropdownMenu tag="div" right>
                  <DropdownItem
                    onClick={() => {
                      changeMonth(0);
                    }}
                    tag="a"
                  >
                    January
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      changeMonth(1);
                    }}
                    tag="a"
                  >
                    Febuary
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      changeMonth(2);
                    }}
                    tag="a"
                  >
                    March
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      changeMonth(3);
                    }}
                    tag="a"
                  >
                    April
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      changeMonth(4);
                    }}
                    tag="a"
                  >
                    May
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      changeMonth(5);
                    }}
                    tag="a"
                  >
                    June
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      changeMonth(6);
                    }}
                    tag="a"
                  >
                    July
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      changeMonth(7);
                    }}
                    tag="a"
                  >
                    August
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      changeMonth(8);
                    }}
                    tag="a"
                  >
                    September
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      changeMonth(9);
                    }}
                    tag="a"
                  >
                    October
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      changeMonth(10);
                    }}
                    tag="a"
                  >
                    November
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      changeMonth(11);
                    }}
                    tag="a"
                  >
                    December
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown className="mr-1">
                <DropdownToggle className="p-0">
                  <Chip
                    label={`${year}`}
                    icon={<ChevronDown size={14} className="chevron" />}
                    size="medium"
                    className="rounded"
                    style={{
                      background: "transparent",
                      color: "gray",
                      border: "1px solid #9aa9b7",
                    }}
                  />
                </DropdownToggle>
                <DropdownMenu tag="div" right>
                  {yearList(1)}
                </DropdownMenu>
              </UncontrolledDropdown>
              <Chip
                label={report.isFetching ? "Filtering..." : "Filter"}
                className="rounded"
                onClick={handleFilter}
                disabled={report.isFetching}
                style={{ color: "white", background: "#2796f3", fontSize: 14 }}
              />
            </div>
          </Row>
          <Row>
            <div className="accordion-area">
              {report.loading && (
                <div className="income_details_loading">
                  <Spinner />
                </div>
              )}

              {report.list &&
                report.list.map((each) => (
                  <Collapsible
                    key={each.date}
                    trigger={
                      <>
                        <div className="custom-accordion">
                          <span>{moment(each.date).format("LL")}</span>
                          <div className="accordion-right">
                            <div className="row-count">
                              <span>{each.data.length}</span>
                            </div>
                            <div>
                              <ChevronDown size={20} className="chevron" />
                            </div>
                          </div>
                        </div>
                      </>
                    }
                  >
                    <Card className="finance-col-two">
                      <CardBody>
                        <DataTable
                          data={each.data}
                          columns={columns}
                          noHeader
                          selectableRows
                          pagination
                          // selectableRowsComponent={Checkbox}
                          // selectableRowsComponentProps={{
                          //   color: "primary",
                          //   icon: <Check className="vx-icon" size={12} />,
                          //   label: "",
                          //   size: "sm",
                          // }}
                          customStyles={customStyles}
                        />
                      </CardBody>
                    </Card>
                  </Collapsible>
                ))}
            </div>
          </Row>
        </Col>
      </Row>

      <SweetAlert
        title="Are you sure?"
        warning
        show={showConfirm}
        showCancel
        // reverseButtons
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        onConfirm={() => {
          dispatch(
            DeleteExpenseById(deleteId, paymentSystem, month, year, page)
          );
          setShowConfirm(false);
        }}
        onCancel={() => {
          setDeleteId(null);
          setShowConfirm(false);
        }}
      >
        You won't be able to revert this!
      </SweetAlert>

      <SweetAlert
        show={deletedSuccess}
        success
        title="Deleted Successfull"
        onConfirm={() => {
          setDeletedSuccess(false);
        }}
        onCancel={() => {
          setDeletedSuccess(false);
        }}
        timeout={1500}
      >
        -
      </SweetAlert>

      <Modal
        isOpen={categoryDeleteModal}
        toggle={() => setCategoryDeleteModal((p) => !p)}
        className="modal-dialog-centered"
      >
        <ModalHeader
          toggle={() => setCategoryDeleteModal((p) => !p)}
        ></ModalHeader>
        <ModalBody>
          <h3>Are You sure to Delete this Category ?</h3>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              setCategoryDeleteModal((p) => !p);
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={categoryDelete.loading}
            color="danger"
            onClick={() => {
              dispatch(deleteCategoryAction({ id: categoryId }));
            }}
          >
            {categoryDelete.loading === true ? "Processing..." : "Delete"}
          </Button>
        </ModalFooter>
      </Modal>

      {/* // category list  */}

      <React.Fragment>
        <Modal
          isOpen={isCategoryListModalOpen}
          className="modal-dialog-centered modal-sm"
          style={{
            width: IsSmallDevise ? "100%" : "600px",
          }}
        >
          {/* <ModalHeader>
            
          </ModalHeader> */}
          <ModalHeader toggle={categoryListModalToggle}>
            Category list
          </ModalHeader>
          <ModalBody>
            <span className="d-flex justify-content-between">
              <span></span>
              <button
                onClick={categoryModalToggle}
                className="custom-inline-btn"
              >
                Add
              </button>
            </span>
            <br />
            <div
              style={{
                overflowY: "scroll",
                height: "500px",
              }}
            >
              <Table>
                <TableBody>
                  {expenseCategoryList?.length > 0
                    ? expenseCategoryList.map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell
                              style={{ padding: "0.3em" }}
                              align="left"
                            >
                              {item.expense_category_type}
                            </TableCell>
                            <TableCell
                              style={{ padding: "0.3em" }}
                              align="right"
                            >
                              <div className="ml-1">
                                <EditAndDeletelead
                                  onCategoryEditHandler={onCategoryEditHandler}
                                  categoryDeleteHandle={categoryDeleteHandle}
                                  askeDeleteConfirmation={() => {}}
                                  item={item}
                                  openModalByid={() => {}}
                                  keyname={item._id}
                                  placeholder={"------"}
                                  setvalue={"======="}
                                  HandleClick2={() => {}}
                                  value={""}
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : null}
                </TableBody>
              </Table>
            </div>

            {/* <div className="d-flex justify-content-end m-1">
              <Button color="danger" onClick={categoryListModalToggle}>
                Cancel
              </Button>
            </div> */}
          </ModalBody>
          <ToastContainer />
        </Modal>
      </React.Fragment>

      {/* <Snackbar
        open={showMessage.open}
        autoHideDuration={6000}
        onClose={handleMessageClose}
      >
        <Alert onClose={handleMessageClose} severity={showMessage.className}>
          {showMessage.message}
        </Alert>
      </Snackbar> */}
      <GreenAlertForSuccess
        handleMessageClose={handleMessageClose}
        data={showMessage}
      />
    </div>
  );
};

function EditAndDeletelead(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { onCategoryEditHandler, categoryDeleteHandle, item } = props;

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="ml-1">
        <IconButton className="rounded-circle" onClick={handleClick}>
          <MoreVertIcon fontSize="small" />
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
        <MenuItem
          onClick={() => {
            onCategoryEditHandler(item);
          }}
        >
          <Edit size={16} style={{ color: "#5aa65c", marginRight: "1em" }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            categoryDeleteHandle(item._id);
          }}
        >
          <Trash style={{ color: "#e05252", marginRight: "1em" }} size={16} />{" "}
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Expense;
