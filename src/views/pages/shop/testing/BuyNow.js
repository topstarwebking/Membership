import React, { useEffect, useState } from "react";
import { Col, Row, Card, CardBody } from "reactstrap";
import moment from "moment";
import { connect } from "react-redux";
import BuyNowForm from "./buyNowForm";
import BuyNowNewFormForProdect from "./BuyNowNewFormForProdect";
import CardPayment from "./CardPayment";
import { GET_ALL_TYPE_STUDENT } from "../../../../redux/actions/member";
import { GET_STUDENT_LIST, BUY_PRODUCT, BUY_PRODUCT_STRIPE } from "../../../../redux/actions/shop";
import { GET_STUDENT_FINANCE_INFO } from "../../../../redux/actions/billing";
import { validationError } from "../../../../utilities/errorMessage";
import { toast } from "react-toastify";
import {
  PAY_AND_REGISTER,
  PAY_NOW_INVITE_REGISTER,
  PAY_POROMOTED_STUDNETS,
  PAY_REGISTER_ATTENDED_STUDNETS,
} from "../../../../redux/actions/test";
import StripePayment from "../../stripePayments/StripePayment";
import ProductStripePayment from "./productStripePayment";
const BuyNow = (props) => {
  const { GET_ALL_TYPE_STUDENT, GET_STUDENT_FINANCE_INFO } = props;
  const [loading, setLoading] = useState(false);
  const [isPaymentDoneMS, setIsPaymentDoneMS] = useState(false);
  const [state, setState] = useState({
    total_price: props?.Product?.total_price,
  });
  const [formValidation, setFormValidation] = useState({});
  const [cardvalidation, setCardValidation] = useState({});
  const [studentDetails, setStudentDetails] = useState({
    studentId: props.studentData?.studentId,
    student_name: `${props.studentData?.firstName} ${props.studentData?.lastName}`,
  });
  useEffect(() => {
    GET_ALL_TYPE_STUDENT();
  }, []);

  // console.log(props.studentData?.studentId)
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      valorPayload: {
        ...state?.valorPayload,
        [name]: value,
      },
    });
    updateErrors({ ...state?.valorPayload, [name]: value }, "card");
  };
  const payLatterChange = (e) => {
    const { value } = e.target;
    setState({
      ...state,
      pay_latter: value,
    });
  };
  const addressChanges = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      valorPayload: {
        ...state?.valorPayload,
        address: {
          ...state?.valorPayload?.address,
          [name]: value,
        },
      },
    });
  };

  const setErrorMessage = (errors) => {
    setFormValidation({
      ...formValidation,
      ...errors,
    });
  };
  useEffect(() => {
    if (props.Product?.product_name) {
      setState({
        ...state,
        payment_time: 1,
        start_payment_date: moment().format("YYYY-MM-DD"),
        payment_type: props.Product?.payment_type,
        deposite: props.Product?.deposite ? props.Product?.deposite : 0,
        product_name: props.Product?.product_name,
        product_description: props.Product?.product_description,
        product_type: props.Product?.product_type,
        payment_money: props.Product?.deposite
          ? props.Product?.total_price - props.Product?.deposite
          : 0,
        event_date:
          props.Product?.product_type === "event"
            ? props.Product?.event_date
            : props.Product?.product_name,
        next_payment_date: props.Product?.next_payment_date,
        total_price: props.Product?.total_price,
        balance: props.Product?.deposite
          ? props.Product?.total_price - props.Product?.deposite
          : 0,
        ptype: "credit card",
        pay_inout: "auto pay",
        pay_latter: "cash",
        cheque_no: "",
        valorPayload: {
          amount: props.Product?.deposite ? props.Product?.deposite : 0,
          address: {},
        },
      });
    }
  }, [props.Product]);
  const handleSelectStudent = async (e, newValue) => {
    setStudentDetails({
      ...state,
      studentId: newValue?._id,
      student_name: `${newValue?.firstName} ${newValue?.lastName}`,
    });
    updateErrors({ studentId: newValue?._id }, "form");
    const fDetails = await GET_STUDENT_FINANCE_INFO(
      newValue?._id,
      "notDispatch"
    );
    if (fDetails.length) {
      updateCardDetails(fDetails);
    } else {
      setState({
        ...state,
        finance_id: null,
        valorPayload: {
          ...state?.valorPayload,
          pan: "",
          card_number: "",
          cvv: "",
          card_holder_name: "",
          address: {},
          expiry_date: "",
          email: "",
          phone: "",
        },
      });
    }
  };

  const updateCardDetails = (fDetails) => {
    const [cardInfo] = fDetails;
    setState({
      ...state,
      finance_id: cardInfo?._id,
      valorPayload: {
        ...state?.valorPayload,
        pan: cardInfo?.pan,
        card_number: cardInfo?.card_number,
        cvv: cardInfo?.cvv,
        card_holder_name: cardInfo?.card_holder_name,
        address: cardInfo?.address,
        expiry_date: cardInfo?.expiry_date,
        email: cardInfo?.email,
        phone: cardInfo?.phone,
      },
    });
  };

  const changeHandler = (e, type = false, address = false) => {
    const { name, value } = e.target;
    const { payment_type, payment_money, balance, payment_time } = state;
    const subscription_starts_from =
      state?.valorPayload?.subscription_starts_from;
    if (name === "payment_type" && value !== "pif") {
      updateErrors({
        payment_type,
        payment_money,
        balance,
        payment_time,
        subscription_starts_from,
      });
    }
    if (!address) {
      if (name === "deposite") {
        setState({
          ...state,
          balance: state?.total_price - parseInt(value),
          payment_money: state?.total_price - parseInt(value),
          [name]: value,
          valorPayload: {
            ...state?.valorPayload,
            amount: value,
          },
        });
      } else if (name === "payment_time") {
        if (parseInt(value) === 1) {
          let payment_money =
            (state?.total_price - state?.deposite) / parseInt(value);
          setState({
            ...state,
            payment_money: payment_money,
            [name]: value,
          });
        }
      } else if (name === "payment_type" && value === "pif") {
        setState({
          ...state,
          payment_money: 0,
          payment_time: 0,
          balance: 0,
          deposite: state?.total_price,
          [name]: value,
          valorPayload: {
            ...state?.valorPayload,
            amount: state?.total_price,
          },
        });
        setFormValidation({});
      } else if (name === "next_payment_date") {
        setState({
          ...state,
          valorPayload: {
            ...state?.valorPayload,
            subscription_starts_from: value,
          },
        });
      } else if (state.total_price !== state.deposite) {
        setState({
          ...state,
          valorPayload: {
            ...state?.valorPayload,
            subscription_starts_from: value,
          },
        });
      } else {
        setState({
          ...state,
          [name]: value,
        });
      }
    }
  };
  const updateErrors = (obj, type) => {
    const error = validationError(obj);
    if (type === "form") {
      setFormValidation({
        ...formValidation,
        ...error,
      });
    } else {
      setCardValidation({
        ...cardvalidation,
        ...error,
      });
    }
  };

  const apiCall = async (payload) => {
    let copypayload = payload;
    const { deposite, total_price } = payload;
    if (deposite == total_price) {
      copypayload.payment_time = 0;
      copypayload.payment_type = "pif";
      copypayload.isEMI = false;
    } else {
      copypayload.payment_time = 1;
      copypayload.payment_type = "monthly";
      copypayload.isEMI = true;
    }
    const id =
      typeof studentDetails?.studentId === "object"
        ? studentDetails?.studentId?._id
        : studentDetails?.studentId;
    copypayload.student_name = studentDetails?.student_name;
    copypayload.studentId = id;
    copypayload.financeId = "61c3807b60ec924314f1e73e";
    copypayload.createdBy = JSON.parse(
      localStorage.getItem("userdata")
    )?.data?.username;
    // if (copypayload?.ptype !== "cash") {
    //     copypayload.valorPayload.pan = copypayload.valorPayload?.pan.replace(
    //       /\s+/g,
    //       ""
    //     );
    //     copypayload.valorPayload.phone = copypayload.valorPayload?.phone.replace(
    //       /\s+/g,
    //       ""
    //     );
    // }
    if (copypayload.valorPayload !== undefined) {
      copypayload.valorPayload.Subscription_valid_for = 1;
    } else if (copypayload.stripePayload !== undefined) {
      copypayload.stripePayload.Subscription_valid_for = "";
      copypayload.stripePayload.subscription_day_of_the_month = "";
      copypayload.stripePayload.subscription_starts_from = copypayload.start_payment_date;
      copypayload.isEMI = false;
    }
    let responce = ""
    if (copypayload.stripePayload !== undefined) {
      let res = await props.BUY_PRODUCT_STRIPE(id, { product_details: copypayload });
      responce = res
    } else {
      let res = await props.BUY_PRODUCT(id, { product_details: copypayload });
      responce = res
    }
    console.log(responce)
    if (responce) {
      setLoading(false);
      setIsPaymentDoneMS(true);
      console.log(props.selectedrow?.appointment_type, props.studentData)
      if (props.studentData !== undefined) {
        if (props.selectedrow?.appointment_type === "Promotion Test" &&
          props.studentData?.isPaid === false
        ) {
          let paylodfortestregister = {
            studentId: props.studentData?.studentId?._id,
            userId: props.studentData?.userId,
            testId: props.Product._id,
            firstName: props.studentData?.firstName,
            lastName: props.studentData?.lastName,
            rating: props.studentData?.rating,
            current_rank_name: props.studentData?.current_rank_name,
            next_rank_name: props.studentData?.next_rank_name,
            current_rank_img: props.studentData?.current_rank_img,
            next_rank_img: props.studentData?.next_rank_img,
            date: props.studentData?.createdAt,
            isDeleted: props.studentData?.isDeleted,
            phone: props.studentData?.phone,
            cheque_no: props.valorPayload?.cheque_no || "",
            memberprofileImage: props.studentData?.phone,
            lastPromotedDate: props.studentData?.lastPromotedDate,
            program: props.studentData?.program,
            isPaid: true,
          };
          props.PAY_POROMOTED_STUDNETS(
            paylodfortestregister,
            props.studentData?._id,
            props.selectedrow?._id
          );
        } else if (props.selectedrow?.appointment_type === "Promotion Test") {
          if (props.studentData?.isPaid === undefined) {
            let paylodfortestregister = {
              studentId: props.studentData?.studentId?._id,
              userId: props.studentData?.userId,
              testId: props.Product._id,
              firstName: props.studentData?.firstName,
              lastName: props.studentData?.lastName,
              rating: props.studentData?.rating,
              current_rank_name: props.studentData?.current_rank_name,
              next_rank_name: props.studentData?.next_rank_name,
              current_rank_img: props.studentData?.current_rank_img,
              next_rank_img: props.studentData?.next_rank_img,
              date: props.studentData?.createdAt,
              isDeleted: props.studentData?.isDeleted,
              method:
                payload.ptype === "cash"
                  ? "Cash"
                  : payload.ptype === "cheque"
                    ? "Check"
                    : "Credit Card",
              phone: props.studentData?.phone,
              cheque_no: props.valorPayload?.cheque_no || "",
              memberprofileImage: props.studentData?.phone,
              lastPromotedDate: props.studentData?.lastPromotedDate,
              program: props.studentData?.program,
              isPaid: true,
            };
            props.PAY_AND_REGISTER(paylodfortestregister, props.selectedrow?._id);
          }
        } else {
          if (props.studentData?.isPaid === undefined) {
            let data = {
              studentId: props.studentData?.studentId,
              eventId: props.studentData?.eventId,
              testId: props.Product?._id,
              isPaid: true,
              method:
                payload.ptype === "cash"
                  ? "Cash"
                  : payload.ptype === "cheque"
                    ? "Check"
                    : "Credit Card",
              cheque_no: props.valorPayload?.cheque_no || "",
              program: props.studentData?.program,
              firstName: props.studentData?.firstName,
              lastName: props.studentData?.lastName,
              memberprofileImage: props.studentData?.memberprofileImage,
              phone: props.studentData?.phone,
              current_rank_name: props.studentData?.current_rank_name,
            };
            props.PAY_NOW_INVITE_REGISTER(data, props.studentData?.eventId);
          } else {
            let data = {
              testId: props.Product?._id,
              method:
                payload.ptype === "cash"
                  ? "Cash"
                  : payload.ptype === "cheque"
                    ? "Check"
                    : "Credit Card",
              cheque_no: props.valorPayload?.cheque_no || "",
              isPaid: true,
            };
            props.PAY_REGISTER_ATTENDED_STUDNETS(data, props.studentData?._id, props.selectedrow?._id);
          }

        }
      }
    } else {
      setLoading(false);
      setIsPaymentDoneMS(true);
    }
  };

  const productPayment = () => {
    const payload = state;
    if (payload?.ptype === "credit card" ||
      payload?.pay_latter === "credit card") {
      let checkCardDetailExist = checkCardDetail();
      if (checkCardDetailExist) {
        setLoading(true);
        apiCall(payload);
      }
    } else if (payload?.ptype === "stripe" ||
      payload?.pay_latter === "credit card") {
      let checkCardDetailExist = checkCardDetail();
      if (checkCardDetailExist) {
        setLoading(true);
        payload["stripePayload"] = payload["valorPayload"]
        delete payload["valorPayload"]
        payload.stripePayload.card_expiry_month = payload.stripePayload.expiry_date.slice(0, 2)
        payload.stripePayload.card_expiry_year = `20${payload.stripePayload.expiry_date.slice(2, 4)}`
        delete payload.stripePayload["expiry_date"]
        payload.stripePayload.card_cvc = `${payload.stripePayload.cvv}`
        payload.ptype = "credit card"
        payload.pay_latter = "credit card"
        apiCall(payload);
      }
    } else if (payload?.ptype === "cash") {
      setLoading(true);
      apiCall(payload);
    }
  };

  const checkCardDetail = () => {
    const { pan, cvv, card_holder_name, expiry_date, email, phone } =
      state?.valorPayload;
    if (pan && cvv && card_holder_name && expiry_date && email && phone) {
      return true;
    } else {
      const error = validationError(state?.valorPayload);
      setCardValidation(error);
      toast.info("Please provide the Card Details!", {
        position: "top-center",
        autoClose: 3000,
        icon: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }
  };

  const payNowMethod = (value, e = false) => {
    if (e) {
      setState({
        ...state,
        ptype: value,
        cheque_no: e.target.value,
      });
    } else {
      setState({
        ...state,
        ptype: value,
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-item-center">
      <Card className="m-1" style={{ width: "100%" }}>
        <CardBody>
          <Row>
            <Col lg="12" md="12" sm="12">
              <div>
                <BuyNowNewFormForProdect
                  state={state}
                  isPaymentDoneMS={isPaymentDoneMS}
                  setErrorMessage={setErrorMessage}
                  HandleChange={HandleChange}
                  loading={loading}
                  studentDetails={studentDetails}
                  productPayment={productPayment}
                  changeHandler={changeHandler}
                  addressChanges={addressChanges}
                  payNowMethod={payNowMethod}
                  payLatterChange={payLatterChange}
                  cardvalidation={cardvalidation}
                  toggleModal={props.toggleModal}
                  buyNow={
                    <BuyNowForm
                      getAllTypeStudent={props.getAllTypeStudent}
                      formValidation={formValidation}
                      handleSelectStudent={handleSelectStudent}
                      Product={props.Product}
                      changeHandler={changeHandler}
                      state={state}
                      studentDetails={studentDetails}
                      studentData={props.studentData}
                    />
                  }
                  CardPayment={
                    <CardPayment
                      cardvalidation={cardvalidation}
                      payLatterChange={payLatterChange}
                      productPayment={productPayment}
                      isPaymentDoneMS={isPaymentDoneMS}
                      changeHandler={changeHandler}
                      state={state}
                      addressChanges={addressChanges}
                      HandleChange={HandleChange}
                      loading={loading}
                    />
                  }
                  StripePayment={
                    <ProductStripePayment
                      cardvalidation={cardvalidation}
                      payLatterChange={payLatterChange}
                      productPayment={productPayment}
                      isPaymentDoneMS={isPaymentDoneMS}
                      changeHandler={changeHandler}
                      state={state}
                      addressChanges={addressChanges}
                      HandleChange={HandleChange}
                      loading={loading}
                    />
                  }
                />
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    studentList: state.shop.studentList,
    getAllTypeStudent: state.member.getAllTypeStudent,
    getStudentFinanceInfo: state.billingFinance.getStudentFinanceInfo,
    activeEvent: state.appointmentAndEvent.activeEvent,
  };
};

export default connect(mapStateToProps, {
  GET_ALL_TYPE_STUDENT,
  GET_STUDENT_LIST,
  BUY_PRODUCT,
  BUY_PRODUCT_STRIPE,
  GET_STUDENT_FINANCE_INFO,
  PAY_AND_REGISTER,
  PAY_POROMOTED_STUDNETS,
  PAY_NOW_INVITE_REGISTER,
  PAY_REGISTER_ATTENDED_STUDNETS,
})(BuyNow);
