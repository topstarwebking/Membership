import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Route-based code splitting
// const analyticsDashboard = lazy(() =>
//   import("./views/dashboard/analytics/AnalyticsDashboard")
// );
//-----------------------  task and gaols
const TaskAndGoalsMain = lazy(() => import("./views/apps/task-and-goals"));
const SubUsers = lazy(() =>
  import("./views/pages/marketing/email/emailVerify/subUser")
);

const dashboard2 = lazy(() => import("./views/dashboard2/index"));

// const chat = lazy(() => import("./views/apps/chat/Chat"));
const calendar = lazy(() => import("./views/apps/calendar/Calendar"));
const appointment = lazy(() => import("./views/apps/appointment/Appointment"));
const shop = lazy(() => import("./views/apps/ecommerce/shop/Shop"));
const checkout = lazy(() => import("./views/apps/ecommerce/cart/Cart"));
const listView = lazy(() => import("./views/ui-elements/data-list/ListView"));
const thumbView = lazy(() => import("./views/ui-elements/data-list/ThumbView"));
const newstudentform = lazy(() =>
  import("./views/pages/newstudent/createStudentmain")
);
// DownloadSignedPDF
const DownloadSignedPDF = lazy(() =>
  import("./views/pages/shop/signDocument/downloadSignPdf")
);
const newmemberform = lazy(() =>
  import("./views/pages/newmember/createMembermain")
);
const studentInfo = lazy(() =>
  import("./views/pages/studentInfo/infoStudentmain")
);
const memberInfo = lazy(() =>
  import("./views/pages/memberInfo/infoMembermain")
);
const setting = lazy(() => import("./views/pages/settings/settingMain"));
const settingAdmin = lazy(() =>
  import("./views/pages/settings/adminSettingMain")
);

const ShopAddMembership = lazy(() =>
  import("./views/pages/shop/membership/membershipMain")
);
// document signature

const DocumentSignHome = lazy(() =>
  import("./views/pages/shop/signDocument/Home")
);
const DocumentSignSign = lazy(() =>
  import("./views/pages/shop/signDocument/Sign")
);
// const DocumentSignStatus = lazy(() =>
//   import("./views/pages/shop/signDocument/status")
// );

//finance
const ShopAddTesting = lazy(() =>
  import("./views/pages/shop/testing/TestingMain")
);
const MymoneyAddExpense = lazy(() =>
  import("./views/pages/myMoney/expense/expenseMain")
);
const MymoneyFinanceAddFinance1 = lazy(() =>
  import("./views/pages/myMoney/finance/finance1/financeMain")
);
const MymoneyFinanceAddDelinquent = lazy(() =>
  import("./views/pages/myMoney/finance/delinquent/delinquentMain")
);
const MymoneyFinanceAddForcast = lazy(() =>
  import("./views/pages/myMoney/finance/forcast/forcastMain")
);
const MymoneyFinanceAddTesting = lazy(() =>
  import("./views/pages/myMoney/finance/testing/testingMain")
);
const MymoneyFinanceAddccexpiring = lazy(() =>
  import("./views/pages/myMoney/finance/ccexpiring/ccexpiringMain")
);
const MymoneyFinanceIncome = lazy(() =>
  import("./views/pages/myMoney/finance/income/income")
);
const MymoneyFinanceExpense = lazy(() =>
  import("./views/pages/myMoney/finance/expenses/expense")
);
const MymoneyFinanceCcexp = lazy(() =>
  import("./views/pages/myMoney/finance/ccexp/ccexp")
);
const MymoneyFinancePNL = lazy(() =>
  import("./views/pages/myMoney/finance/pnl/pnl")
);

// New chat-text route
const V2TextChat = lazy(() =>
  import("./views/pages/marketing/v2test/textChart/Index")
);

// chatbot component
const ChatbotDetails = lazy(() => import("./views/pages/marketing/v2test/chatbot"));

const Navsupport = lazy(() =>
  import("./views/pages/navsupport/navSupportMain")
);
const DepositFunds = lazy(() =>
  import("./views/pages/navwallet/depositFunds/depositFundMain")
);
const Withdraw = lazy(() =>
  import("./views/pages/navwallet/withdraw/withdrawMain")
);
const Transction = lazy(() =>
  import("./views/pages/navwallet/transction/transctionMain")
);
const NavLocation = lazy(() =>
  import("./views/pages/navlocation/locationModal")
);

const missYoucall = lazy(() =>
  import("./views/pages/mySchool/MissYouCall/missyoucallMain")
);
const renewals = lazy(() => import("./views/pages/mySchool/renewals/renewals"));
const birthday = lazy(() => import("./views/pages/mySchool/birthday/birthday"));
const formik = lazy(() => import("./views/forms/formik/Formik"));
const tables = lazy(() => import("./views/tables/reactstrap/Tables"));
const ReactTables = lazy(() =>
  import("./views/tables/react-tables/ReactTables")
);
const Aggrid = lazy(() => import("./views/tables/aggrid/Aggrid"));
const DataTable = lazy(() => import("./views/tables/data-tables/DataTables"));
const profile = lazy(() => import("./views/pages/profile/Profile"));
const faq = lazy(() => import("./views/pages/faq/FAQ"));
const search = lazy(() => import("./views/pages/search/Search"));
const accountSettings = lazy(() =>
  import("./views/pages/account-settings/AccountSettings")
);
const documents = lazy(() =>
  import("./views/pages/documents/components/Documents")
);
const support = lazy(() =>
  import("./views/pages/documents/components/Support")
);
const error404 = lazy(() => import("./views/pages/misc/error/404"));
const error500 = lazy(() => import("./views/pages/misc/error/500"));
const authorized = lazy(() => import("./views/pages/misc/NotAuthorized"));
const maintenance = lazy(() => import("./views/pages/misc/Maintenance"));
const comingSoon = lazy(() => import("./views/pages/misc/ComingSoon"));
const homeMain = lazy(() => import("./views/homepage/homeMain"));
const ThankYouPage = lazy(() => import("./views/pages/ThankYou/thankyou"));
const userList = lazy(() => import("./views/apps/user/list/activeUsersList"));
const memberList = lazy(() =>
  import("./views/apps/members/list/activeUsersList")
);
const activetrailuserList = lazy(() =>
  import("./views/apps/user/list/activeTrail")
);

const EmailMarketing = lazy(() => import("./views/pages/marketing/email"));
const AdminEmailMarkiting = lazy(() =>
  import("./views/pages/marketing/email/AdminSystem/adminEmail.js")
);

const leadlistuserList = lazy(() => import("./views/apps/user/list/leadList"));
const camplistuserList = lazy(() => import("./views/apps/user/list/campList"));
const usersByProgramList = lazy(() =>
  import("./views/pages/usersByProgram/usersByProgramMain")
);
const studentsByProgramList = lazy(() =>
  import("./views/apps/user/list/StudentsByProgram")
);
const testingEligible = lazy(() =>
  import("./views/pages/mySchool/Testing/Eligible/Eventmaneger")
);
const testingEligibleV2 = lazy(() =>
  import("./views/pages/mySchool/Testing/Eligiblev2/EventManager")
);
const CreateEvent = lazy(() =>
  import("./views/pages/mySchool/Testing/Eligiblev2/CreateEventForms/CreateEventStepper")
);
const EventDetails = lazy(() =>
  import("./views/pages/mySchool/Testing/Eligiblev2/EventDetails")
);

const EventPreview = lazy(() =>
  import("./views/pages/mySchool/Testing/Eligiblev2/EventPreview")
);
// Member List Table
const EventDataByCategory = lazy(() =>
  import("./views/pages/mySchool/Testing/Eligiblev2/eventDataByType/index")
)
const ActiveMemberTable = lazy(() =>
  import("./views/pages/mySchool/Testing/Eligiblev2/eventDataByType/components/ActiveMemberTable")
)
const ActiveTrialsTable = lazy(() =>
  import("./views/pages/mySchool/Testing/Eligiblev2/eventDataByType/components/ActiveTrialsTable")
)
const LeadMembersTable = lazy(() =>
  import("./views/pages/mySchool/Testing/Eligiblev2/eventDataByType/components/LeadMembersTable")
)
const FormalMemberTable = lazy(() =>
  import("./views/pages/mySchool/Testing/Eligiblev2/eventDataByType/components/FormalMemberTable")
)
const FormalTrialTable = lazy(() =>
  import("./views/pages/mySchool/Testing/Eligiblev2/eventDataByType/components/FormalTrialTable")
)


const testingRecommended = lazy(() =>
  import("./views/pages/mySchool/Testing/Recommended/recommendedMain")
);
const testingRegistered = lazy(() =>
  import("./views/pages/mySchool/Testing/Registered/registeredMain")
);
const candidateManage = lazy(() =>
  import("./views/pages/mySchool/Candidates/candidateMain")
);
const stat = lazy(() => import("./views/pages/mySchool/stat/stat"));
const StatisticsActiveStudent = lazy(() =>
  import("./views/pages/statistics/activeStudent/activeStudentMain")
);
const StatisticsActiveTrail = lazy(() =>
  import("./views/pages/statistics/activeTrail/activeTrailMain")
);
const StatisticsLead = lazy(() =>
  import("./views/pages/statistics/lead/leadMain")
);
const StatisticsCamp = lazy(() =>
  import("./views/pages/statistics/camp/campMain")
);
const StatisticsformerStudent = lazy(() =>
  import("./views/pages/statistics/formerStudent/formerStudentMain")
);
const StatisticsformerTrail = lazy(() =>
  import("./views/pages/statistics/formerTrail/formerTrailMain")
);
const StatisticsafterSchool = lazy(() =>
  import("./views/pages/statistics/afterSchool/afterSchoolMain")
);
const formerstudentuserList = lazy(() =>
  import("./views/apps/user/list/formerStudent")
);
const formertrailuserList = lazy(() =>
  import("./views/apps/user/list/formerTrail")
);
const afterschooluserList = lazy(() =>
  import("./views/apps/user/list/afterSchool")
);
const userEdit = lazy(() => import("./views/apps/user/edit/Edit"));
const userView = lazy(() => import("./views/apps/user/view/View"));
const Login = lazy(() => import("./views/pages/authentication/login/Login"));
const forgotPassword = lazy(() =>
  import("./views/pages/authentication/ForgotPassword")
);
const lockScreen = lazy(() =>
  import("./views/pages/authentication/LockScreen")
);
const resetPassword = lazy(() =>
  import("./views/pages/authentication/ResetPassword")
);
const register = lazy(() =>
  import("./views/pages/authentication/register/Register")
);

// ====================================== Admin
const SchoolListingAdmin = lazy(() => import("./views/dashboard/schoolAdmin"));
const EmailActivation = lazy(() => import("./views/dashboard/emailActivation"));
const AdminUsers = lazy(() => import("./views/AdminUser/index.js"));
const AdmintextTemplate = lazy(() =>
  import("./views/pages/AdminText/index.js")
);
// Set Layout and Component Using App Route
const RouteConfig = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                  ? context.horizontalLayout
                  : context.VerticalLayout;
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                  <ToastContainer />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);

const mapStateToProps = (state) => {
  return {
    user: state.auth.login.userRole,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

class AppRouter extends React.Component {
  state = {
    loggedinUser: JSON.parse(localStorage.getItem("userdata")),
  };
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          {/* ======================= Admin =============== */}
          <AppRoute
            exact
            path="/admin/schools"
            component={SchoolListingAdmin}
          />
          <AppRoute
            exact
            path="/admin/email-activation"
            component={EmailActivation}
          />
          <AppRoute exact path="/admin/users" component={AdminUsers} />
          <AppRoute
            exact
            path="/admin/shop/membership"
            component={ShopAddMembership}
          />
          <AppRoute exact path="/admin/Text" component={AdmintextTemplate} />
          {/* =========================== School ================= */}
          <AppRoute exact path="/" component={homeMain} fullLayout />
          <AppRoute exact path={"/dashboard"} component={dashboard2} />
          <AppRoute exact path={"/dashboard2"} component={dashboard2} />
          {/* <AppRoute path="/chat" component={chat} /> */}
          {/* --------------------Task and Goals ------------------------- */}
          <AppRoute
            exact
            path="/app/task-and-goals/:featureType/:filtertype/:otherFilter"
            component={TaskAndGoalsMain}
          />
          <AppRoute path="/calendar" component={calendar} />
          <AppRoute path="/app/appointment" component={appointment} />
          <AppRoute path="/ecommerce/shop" component={shop} />
          <AppRoute
            path="/ecommerce/checkout"
            component={checkout}
            permission="admin"
          />
          <AppRoute path="/data-list/list-view" component={listView} />
          <AppRoute path="/data-list/thumb-view" component={thumbView} />
          {/* custom routes start  */}
          <AppRoute
            path="/data-list/add-new-student"
            component={newstudentform}
          />
          <AppRoute
            path="/data-list/add-new-member"
            component={newmemberform}
          />
          <AppRoute path="/student-info/:studentId" component={studentInfo} />
          <AppRoute path="/member-info" component={memberInfo} />
          <AppRoute path="/company/settings" component={setting} />
          <AppRoute path="/admin/settings" component={settingAdmin} />
          {/* document signature */}
          <AppRoute path="/docusign/home" component={DocumentSignHome} />
          {/* <AppRoute
            fullLayout
            path="/docusign/status"
            component={DocumentSignStatus}
          /> */}
          {/* document signature  end */}
          <AppRoute
            path="/company/shop/membership"
            component={ShopAddMembership}
          />
          <AppRoute
            path="/admin/shop/membership"
            component={ShopAddMembership}
          />
          <AppRoute path="/company/shop/product" component={ShopAddTesting} />
          <AppRoute
            path="/admin/company/shop/product"
            component={ShopAddTesting}
          />
          <AppRoute
            path="/company/mymoney/expense"
            component={MymoneyAddExpense}
          />
          <AppRoute
            path="/company/mymoney/finance/finance1"
            component={MymoneyFinanceAddFinance1}
          />
          <AppRoute
            path="/company/mymoney/finance/delinquent"
            component={MymoneyFinanceAddDelinquent}
          />
          <AppRoute
            path="/company/mymoney/finance/forcast"
            component={MymoneyFinanceAddForcast}
          />
          <AppRoute
            path="/company/mymoney/finance/testing"
            component={MymoneyFinanceAddTesting}
          />
          <AppRoute
            path="/company/mymoney/finance/ccexpiring"
            component={MymoneyFinanceAddccexpiring}
          />
          <AppRoute
            path="/company/mymoney/finance/income"
            component={MymoneyFinanceIncome}
          />
          <AppRoute
            path="/company/mymoney/finance/expense"
            component={MymoneyFinanceExpense}
          />
          <AppRoute
            path="/company/mymoney/finance/ccexp"
            component={MymoneyFinanceCcexp}
          />
          <AppRoute
            path="/company/mymoney/finance/pnl"
            component={MymoneyFinancePNL}
          />
          <AppRoute path="/app/miss-you-call" component={missYoucall} />
          <AppRoute path="/app/renewals" component={renewals} />
          <AppRoute path="/app/birthday" component={birthday} />
          <AppRoute path="/app/stat" component={stat} />
          <AppRoute path="/app/employee" component={SubUsers} />
          {/* custom route end  */}
          <AppRoute
            path="/app/student/activetrail"
            component={newstudentform}
          />
          <AppRoute path="/app/member/activetrail" component={newmemberform} />
          <AppRoute path="/app/student/leadlist" component={leadlistuserList} />
          <AppRoute path="/app/student/camplist" component={camplistuserList} />
          <AppRoute
            path="/app/student/formerstudent"
            component={formerstudentuserList}
          />
          <AppRoute
            path="/app/student/formertrail"
            component={formertrailuserList}
          />
          <AppRoute
            path="/app/student/afterschool"
            component={afterschooluserList}
          />
          <AppRoute path="/app/members/list" component={usersByProgramList} />
          <AppRoute
            path="/app/student/by-program"
            component={studentsByProgramList}
          />
          <AppRoute
            path="/app/school/test/eligible"
            component={testingEligible}
          />
          <AppRoute
            path="/app/school/test/eligiblev2"
            component={testingEligibleV2}
          />
          {/* <AppRoute
            path="/app/event/:actionType"
            component={CreateEvent}
          /> */}
          <AppRoute
            exact
            path="/app/event/:actionType/:eventId"
            component={CreateEvent}
          />
          <AppRoute
            path="/app/school/test/event-details/:eventId"
            component={EventDetails}
          />
          <AppRoute
            path="/app/school/test/event-preview/:eventId"
            component={EventPreview}
          />
          <AppRoute
            path="/app/school/test/add-guest/:eventId"
            component={EventDataByCategory}
          />
          {/* <AppRoute
            path="/app/school/test/active-member"
            component={ActiveMemberTable}
          />
          <AppRoute
            path="/app/school/test/active-trial"
            component={ActiveTrialsTable}
          />
          <AppRoute
            path="/app/school/test/lead-member"
            component={LeadMembersTable}
          />
          <AppRoute
            path="/app/school/test/formal-member"
            component={FormalMemberTable}
          />
          <AppRoute
            path="/app/school/test/formal-trial"
            component={FormalTrialTable}
          /> */}
          <AppRoute
            path="/app/school/test/recommended"
            component={testingRecommended}
          />
          <AppRoute
            path="/app/school/test/registered"
            component={testingRegistered}
          />
          <AppRoute path="/app/school/candidates" component={candidateManage} />
          <AppRoute
            path="/app/statistics/active-student"
            component={StatisticsActiveStudent}
          />
          <AppRoute
            path="/app/statistics/active-trail"
            component={StatisticsActiveTrail}
          />
          <AppRoute path="/app/statistics/lead" component={StatisticsLead} />
          <AppRoute path="/app/statistics/camp" component={StatisticsCamp} />
          <AppRoute
            path="/app/statistics/former-member"
            component={StatisticsformerStudent}
          />
          <AppRoute
            path="/app/statistics/former-trail"
            component={StatisticsformerTrail}
          />
          <AppRoute
            path="/app/statistics/after-school"
            component={StatisticsafterSchool}
          />

          <AppRoute path="/company/documents" component={documents} />
          <AppRoute path="/admin/company/documents" component={documents} />
          <AppRoute path="/admin/company/support/:type" component={support} />
          <AppRoute path="/company/support/:type" component={support} />
          <AppRoute
            path="/company/marketing/v2text/chat/:id"
            component={V2TextChat}
          />
          <AppRoute
            path="/company/marketing/chatbot"
            component={ChatbotDetails}
          />
          <AppRoute path="/forms/formik" component={formik} />{" "}
          <AppRoute path="/tables/reactstrap" component={tables} />
          <AppRoute path="/tables/react-tables" component={ReactTables} />
          <AppRoute path="/tables/agGrid" component={Aggrid} />
          <AppRoute path="/tables/data-tables" component={DataTable} />
          <AppRoute path="/pages/profile" component={profile} />
          <AppRoute path="/pages/faq" component={faq} />
          <AppRoute path="/pages/search" component={search} />
          <AppRoute
            path="/pages/account-settings"
            component={accountSettings}
          />
          <AppRoute
            path="/pages/navwallet/depositFunds/"
            component={DepositFunds}
          />
          <AppRoute path="/pages/navwallet/withdraw/" component={Withdraw} />
          <AppRoute
            path="/pages/navwallet/transction/"
            component={Transction}
          />
          <AppRoute path="/pages/navlocation/" component={NavLocation} />
          <AppRoute path="/misc/error/404" component={error404} fullLayout />
          <AppRoute path="/pages/login" component={Login} fullLayout />
          <AppRoute path="/pages/register" component={register} fullLayout />
          <AppRoute
            fullLayout
            path="/docusign/sign/:docuSignId/:pdflink/:emailToken"
            component={DocumentSignSign}
          />
          <AppRoute
            fullLayout
            path="/docusign/download/sign-pdf/:docuSignId/:pdflink/:emailToken"
            component={DownloadSignedPDF}
          />
          <AppRoute
            path="/pages/forgot-password"
            component={forgotPassword}
            fullLayout
          />
          <AppRoute
            path="/pages/lock-screen"
            component={lockScreen}
            fullLayout
          />
          <AppRoute
            path="/pages/reset-password"
            component={resetPassword}
            fullLayout
          />
          <AppRoute path="/misc/error/500" component={error500} fullLayout />
          <AppRoute
            path="/misc/not-authorized"
            component={authorized}
            fullLayout
          />
          <AppRoute
            path="/misc/maintenance"
            component={maintenance}
            fullLayout
          />
          <AppRoute
            path="/misc/coming"
            component={comingSoon}
            fullLayout
          />
          <AppRoute
            path="/thank-you-registration"
            component={ThankYouPage}
            fullLayout
          />
          <AppRoute
            path="/app/marketing/email/EmailMarketing"
            component={EmailMarketing}
          />
          <AppRoute
            path="/admin/marketing/email/EmailMarketing"
            component={AdminEmailMarkiting}
          />
          <AppRoute path="/app/student/list" component={userList} />
          <AppRoute path="/app/navsupport" component={Navsupport} />
          <AppRoute path="/app/member/list" component={memberList} />
          <AppRoute
            path="/app/student/active-trail/list"
            component={activetrailuserList}
          />
          <AppRoute
            path="/app/student/former-member/list"
            component={formerstudentuserList}
          />
          <AppRoute
            path="/app/student/former-trail/list"
            component={formertrailuserList}
          />
          <AppRoute
            path="/app/student/after-school/list"
            component={afterschooluserList}
          />
          <AppRoute
            path="/app/student/lead-list/list"
            component={leadlistuserList}
          />
          <AppRoute
            path="/app/student/camp-list/list"
            component={camplistuserList}
          />
          <AppRoute path="/app/user/edit" component={userEdit} />
          <AppRoute path="/app/user/view" component={userView} />
          <AppRoute path="/page-not-Found" component={error404} fullLayout />
          <AppRoute component={error404} fullLayout />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
