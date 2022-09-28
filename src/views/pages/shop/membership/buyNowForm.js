import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import "../../../../assets/scss/pages/users.scss";
import {
  GET_STUDENT_PURCHASE_LIST,
  IS_MEMBERSHIP_PAYMENT_DONE,
  BUY_MEMBERSHIP,
  BUY_MEMBERSHIP_WITH_STRIPE
} from "../../../../redux/actions/shop";
import {
  GET_ALL_TYPE_STUDENT,
  GET_STUDENT_INFO,
} from "../../../../redux/actions/member";
import { GET_STUDENT_FINANCE_INFO } from "../../../../redux/actions/billing/index";
import { connect } from "react-redux";
import CardPayment from "./CardPayment";
import BuyMemberShipInfoForm from "./components/buyMemberShipInfoForm";
import BuyMemberShipStepperForm from "./components/buymembershipStepper";
import {
  validationError,
  clearErrors,
} from "../../../../utilities/errorMessage";
import { toast } from "react-toastify";
import StripePayment from "../../stripePayments/StripePayment";

const toastCss = () => {
  return {
    position: "top-center",
    autoClose: 3000,
    icon: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: true,
  };
};
class PaymentSummary extends React.Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    let expiry_date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + parseInt(props.memberShipDetail.duration_time),
      currentDate.getDate() + 1
    );
    let due_every_month = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate() + 1
    );
    let start_date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + parseInt(props.memberShipDetail.duration_time),
      currentDate.getDate() + 1
    );
    this.state = {
      membership_duration: props.memberShipDetail.duration_time,
      mactive_date: currentDate.toISOString().split("T")[0],
      register_fees: 0,
      start_payment_Date: start_date.toISOString().split("T")[0],
      expiry_date: expiry_date.toISOString().split("T")[0],
      totalp: props.memberShipDetail.total_price,
      balance:
        parseInt(props.memberShipDetail.total_price) -
        parseInt(props.memberShipDetail.down_payment),
      dpayment: props.memberShipDetail.down_payment || 0,
      ptype: "credit card",
      payment_time: props.memberShipDetail.no_of_payment || 0,
      payment_type: props.memberShipDetail.payment_type,
      payment_money:
        parseInt(props.memberShipDetail.balance) /
        parseInt(props.memberShipDetail.payment_time) || 0,
      due_every: "0",
      due_every_month: due_every_month.toISOString().split("T")[0],
      pay_inout: "In house",
      membership_name: props.memberShipDetail.membership_name,
      membershipId: props.memberShipDetail._id,
      pay_latter: "cash",
      cheque_no: "",
      studentId: null,
      student_name:"",
      financeId: "",
      isPaymentDone: false,
      loading: false,
      valorPayload: {
        card_number: "",
        amount: "",
        card_holder_name: "",
        cvv: "",
        expiry_date: "",
        pan: "",
        email: "",
        phone: "",
        address: {
          address: "",
          street_no: "",
          zip: "",
        },
        Subscription_valid_for: "",
        subscription_day_of_the_month: "",
        subscription_starts_from: currentDate.toISOString().split("T")[0],
      },
      formValidation: {},
      paymentValidation: {},
    };
  }
  addressChanges = (e) => {
    this.setState({
      valorPayload: {
        ...this.state.valorPayload,
        address: {
          ...this.state.valorPayload.address,
          [e.target.name]: e.target.value,
        },
      },
    });
  };
  changeHandler = (e, type = false, address = false) => {
    const { name, value } = e.target;
    if (!type) {
      this.setState({ ...this.state, [name]: value }, () => {
        let {
          balance,
          payment_time,
          payment_money,
          register_fees,
          dpayment,
          totalp,
          due_every,
          pay_latter,
          payment_type,
        } = this.state;
        let errorMessage = {};
        balance = parseInt(totalp) - parseInt(dpayment);
        if (name === "payment_time" && value > 0) {
          payment_money = parseInt(balance) / parseInt(payment_time);
        } else if (name === "register_fees" && value > 0) {
          payment_money =
            payment_time > 0
              ? parseInt(balance) / parseInt(payment_time)
              : payment_money;
        } else if (name === "payment_type" && value === "pif") {
          dpayment = totalp;
          balance = 0;
          payment_money = 0;
          payment_time = 0;
          register_fees = 0;
          pay_latter = "";
          due_every = "0";
        }
        if (payment_time === 0 && payment_money > 0) {
          payment_money = 0;
        }
        if (balance > 0 && payment_time > 0) {
          payment_money = parseInt(balance) / parseInt(payment_time);
        }
        if (balance || payment_money || payment_time) {
          if (value === "pif") {
            errorMessage = clearErrors({
              balance,
              payment_money,
              due_every: parseInt(due_every),
              payment_time,
            });
          } else {
            errorMessage = validationError({
              balance,
              payment_money,
              due_every: parseInt(due_every),
              payment_time,
            });
          }
        }
        if (pay_latter === "credit card" && payment_type === "weekly") {
          pay_latter = "cash";
          toast.info(
            "Credit Card not availble for weekly EMI subscription!",
            toastCss()
          );
        }
        this.setState({
          balance,
          payment_money,
          dpayment,
          payment_time,
          register_fees,
          pay_latter,
          valorPayload: {
            ...this.state.valorPayload,
            subscription_day_of_the_month: parseInt(due_every),
            amount: parseInt(register_fees) + parseInt(dpayment),
            Subscription_valid_for: parseInt(payment_time),
          },
          formValidation: {
            ...this.state.formValidation,
            ...errorMessage,
          },
          // valorPayloadPIF: {
          //   ...this.state.valorPayloadPIF,
          //   amount: totalp,
          // },
        });
      });
    } else {
      if (type === "valorPIF") {
        if (address) {
          this.setState({
            valorPayload: {
              ...this.state.valorPayload,
              address: {
                ...this.state.valorPayload.address,
                [name]: value,
              },
            },
          });
        } else {
          this.setState(
            {
              valorPayload: {
                ...this.state.valorPayload,
                [name]: value,
              },
            },
            () => {
              let errormessage = validationError(this.state.valorPayload);
              this.setState({
                paymentValidation: {
                  ...this.state.paymentValidation,
                  ...errormessage,
                },
              });
            }
          );
        }
      }
    }
  };

  setErrorMessage = (errors) => {
    this.setState({
      formValidation: {
        ...this.state.formValidation,
        ...errors,
      },
    });
  };

  componentDidMount() {
    this.props.GET_ALL_TYPE_STUDENT();
    let studentId = window.location.pathname.split("student-info/")[1];
    this.props.GET_STUDENT_INFO(studentId);

    if (this.props.getStudentFinanceInfo.length && studentId) {
      this.updateAddress(studentId);
    } else {
      this.setState({
        ...this.state,
        studentId: studentId,
        student_name: this.props.getStudentInfo?.data?.firstName,
      });
    }
  }

  buyMembership = async (payload, id) => {
    this.props.IS_MEMBERSHIP_PAYMENT_DONE(false);
    delete payload.membership_details.start_date;
    delete payload.membership_details.studentId;
    delete payload.membership_details.formValidation;
    delete payload.membership_details.paymentValidation;
    if (payload?.membership_details?.valorPayload) {
      payload.membership_details.valorPayload.phone =
        payload?.membership_details?.valorPayload.phone.replace(/\s+/g, "");
      payload.membership_details.valorPayload.pan =
        payload?.membership_details?.valorPayload.pan.replace(/\s+/g, "");
    }
    delete payload.membership_details?.valorPayload.card_number
    const { CloseDrawerMS } = this.props;
    let res;
    if (this.state.isPaymentDone === false) {
      this.setState({
        loading: true,
      });
      if (CloseDrawerMS) {
        res = await this.props.BUY_MEMBERSHIP(
          this.props.memberShipDetail,
          payload,
          id,
          true
        );
      } else {
        res = await this.props.BUY_MEMBERSHIP(
          this.props.memberShipDetail,
          payload,
          id,
          true
        );
      }
    }
    if (res) {

      this.setState({
        isPaymentDone: true,
        loading: false,
      });
      console.log(this.state)
    } else {
      console.log(this.state)
      this.setState({
        loading: false,
      });
    }
  };

  BuyNow = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userdata"));
    const payload = this.state;
    payload.createdBy = userData?.data?.username;
    payload.membership_type = this.props.memberShipDetail.membership_type;
    // payload.student_name = `${this.props.getStudentInfo?.data?.firstName} ${this.props.getStudentInfo?.data?.lastName}`;
    const {
      valorPayload: {
        pan,
        expiry_date,
        cvv,
        card_holder_name,
        amount,
        phone,
        email,
      },
    } = payload;
    var updatedPayload = {
      membership_details: {
        ...payload,
      },
    };



    if (payload.payment_type === "monthly" || payload.payment_type === "weekly") {
      updatedPayload.membership_details.isEMI = true;
    } else if (payload.payment_time !== 0 || payload.payment_type === "pif") {
      updatedPayload.membership_details.isEMI = false;
    } else {
      updatedPayload.membership_details.isEMI = true;
      updatedPayload.membership_details.due_every = "0";
      updatedPayload.membership_details.due_every_month = "no_due";
    }
    let errormessage = {};
    if (payload?.ptype === "credit card") {
      if (this.props.studentList) {
        updatedPayload.membership_details.student_name = `${this.props.studentList?.firstName} ${this.props.studentList?.lastName}`
      }
      if (
        pan &&
        expiry_date &&
        cvv &&
        card_holder_name &&
        amount &&
        phone &&
        email
      ) {
        this.buyMembership(updatedPayload, this.state.studentId);
        // var id = window.location.pathname.split("student-info/")[1];
        // this.handleStudentInfo(id)
      } else {
        errormessage = validationError(this.state.valorPayload);
        this.setState({
          paymentValidation: {
            ...this.state.paymentValidation,
            ...errormessage,
          },
        });
      }
    } else if (payload?.ptype === "cash") {
      if (this.props.studentList) {
        updatedPayload.membership_details.student_name = `${this.props.studentList?.firstName} ${this.props.studentList?.lastName}`
      }
      if (this.state.cheque_no) {
        this.buyMembership(updatedPayload, this.state.studentId);
        // var id = window.location.pathname.split("student-info/")[1];
        // this.handleStudentInfo(id)
      } else {
        this.buyMembership(updatedPayload, this.state.studentId);
        // var id = window.location.pathname.split("student-info/")[1];
        // this.handleStudentInfo(id)
      }
    } else if (payload?.ptype === "stripe") {
      if (this.props.studentList) {
        updatedPayload.membership_details.student_name = `${this.props.studentList?.firstName} ${this.props.studentList?.lastName}`
      }
      let res;
      if (
        pan &&
        expiry_date &&
        cvv &&
        card_holder_name &&
        amount &&
        phone &&
        email
      ) {
        updatedPayload.membership_details["stripePayload"] = updatedPayload.membership_details["valorPayload"]
        delete updatedPayload.membership_details["valorPayload"]
        updatedPayload.membership_details.stripePayload.card_expiry_month = updatedPayload.membership_details.stripePayload.expiry_date.slice(0, 2)
        updatedPayload.membership_details.stripePayload.card_expiry_year = `20${updatedPayload.membership_details.stripePayload.expiry_date.slice(2, 4)}`
        delete updatedPayload.membership_details.stripePayload["expiry_date"]
        updatedPayload.membership_details.stripePayload.card_cvc = `${updatedPayload.membership_details.stripePayload.cvv}`
        updatedPayload.membership_details.ptype = "credit card"
        updatedPayload.membership_details.pay_latter = "credit card"
        // updatedPayload.membership_details.isEMI = false

        this.setState({
          loading: true,
        });
        res = await this.props.BUY_MEMBERSHIP_WITH_STRIPE(this.props.memberShipDetail, updatedPayload, this.state.studentId);
        if (res) {
          this.setState({
            isPaymentDone: true,
            loading: false,
          });
        } else {
          this.setState({
            loading: false,
          });
        }
      } else {
        errormessage = validationError(this.state.valorPayload);
        this.setState({
          paymentValidation: {
            ...this.state.paymentValidation,
            ...errormessage,
          },
        });
      }
    }
  };

  payNowMethod = (value, e = false) => {
    if (e) {
      this.setState({
        ...this.state,
        ptype: value,
        cheque_no: e.target.value,
      });
    } else {
      this.setState({
        ...this.state,
        ptype: value,
      });
    }
  };
  handleDateChange = (date, keyname) => {
    this.setState({
      ...this.state,
      [keyname]: date,
    });
  };

  handleSelectStudent = async (e, newValue) => {
    await this.props.GET_STUDENT_FINANCE_INFO(newValue?._id);
    this.updateAddress(false);
    this.setState({
      studentId: newValue?._id,
      student_name: `${newValue?.firstName} ${newValue?.lastName}`,
    });
  };

  updateAddress = (studentId) => {
    const { getStudentFinanceInfo } = this.props;
    if (getStudentFinanceInfo.length) {
      this.setState({
        studentId: studentId ? studentId : this.state.studentId,
        financeId: getStudentFinanceInfo[0]?._id,
        valorPayload: {
          ...this.state.valorPayload,
          expiry_date: getStudentFinanceInfo[0]?.expiry_date,
          pan: getStudentFinanceInfo[0]?.pan,
          phone: getStudentFinanceInfo[0]?.phone,
          cvv: getStudentFinanceInfo[0]?.cvv,
          card_holder_name: getStudentFinanceInfo[0]?.card_holder_name,
          email: getStudentFinanceInfo[0]?.email,
          address: {
            ...this.state.valorPayload.address,
            ...getStudentFinanceInfo[0]?.address,
          },
        },
      });
    }
  };
  closeDrawerFromSteper = () => {
    if (this.props.CloseDrawerMS) {
      this.props.CloseDrawerMS();
    }
    this.props.toggle();
  };
  render() {
    const { getAllTypeStudent } = this.props;
    const { payment_type } = this.state;
    return (
      <div className="d-flex justify-content-center align-item-center">
        <Card className="m-1" style={{ width: "100%" }}>
          <CardBody>
            <Row>
              <Col lg="12" md="12" sm="12">
                <div>
                  <form onSubmit={this.BuyNow}>
                    <BuyMemberShipStepperForm
                      allInfo={this.state}
                      HandleChange={this.changeHandler}
                      studentId={this.state.studentId}
                      payNowMethod={this.payNowMethod}
                      setErrorMessage={this.setErrorMessage}
                      closeDrawerFromSteper={this.closeDrawerFromSteper}
                      isPaymentDone={this.state.isPaymentDone}
                      loading={this.state.loading}
                      MembershipInfoComponent={
                        <BuyMemberShipInfoForm
                          studentList={this.props.studentList}
                          studentProfileType={this.props.type}
                          handleSelectStudent={this.handleSelectStudent}
                          getAllTypeStudent={getAllTypeStudent}
                          payment_type={payment_type}
                          info={this.state}
                          formValidation={this.state.formValidation}
                          changeHandler={this.changeHandler}
                          handleDateChange={this.handleDateChange}
                        />
                      }
                      CardPaymentFormComponent={
                        <CardPayment
                          state={this.state.valorPayload}
                          membershipInfo={this.state}
                          paymentValidation={this.state.paymentValidation}
                          addressChanges={this.addressChanges}
                          HandleChange={this.changeHandler}
                          loading={this.state.loading}
                        />
                      }
                      StripePayment={
                        <StripePayment
                          state={this.state.valorPayload}
                          membershipInfo={this.state}
                          paymentValidation={this.state.paymentValidation}
                          addressChanges={this.addressChanges}
                          HandleChange={this.changeHandler}
                          loading={this.state.loading}
                        />
                      }
                    />
                  </form>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    shop: state.shop,
    getStudentInfo: state.member.getStudentInfo,
    getAllTypeStudent: state.member.getAllTypeStudent,
    getStudentFinanceInfo: state.billingFinance.getStudentFinanceInfo,
  };
};

export default connect(mapStateToProps, {
  GET_STUDENT_PURCHASE_LIST,
  GET_ALL_TYPE_STUDENT,
  GET_STUDENT_INFO,
  BUY_MEMBERSHIP,
  GET_STUDENT_FINANCE_INFO,
  IS_MEMBERSHIP_PAYMENT_DONE,
  BUY_MEMBERSHIP_WITH_STRIPE,
})(PaymentSummary);
