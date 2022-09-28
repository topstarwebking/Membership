import { combineReducers } from "redux";
import calendarReducer from "./calendar";
import appointmentReducer from "./appointment";
import customizer from "./customizer";
import auth from "./auth";
import dataList from "./data-list";
import { studentReducer } from "./student";
import { memberReducer } from "./member";
import { shopReducer } from "./shop/shop";
import { programReducer } from "./programe/programe";
import { stripeReducer } from "./stripe/stripe";
import { settingReducer } from "./settings";
import { myMoneyReducer } from "./mymoney/mymoney";
import { dashboardReducer } from "./dashboard";
import { userInfoReducer } from "./user/userinfo";
import { EmailMarketing } from "./email";
import { EmailSystemMarketing } from "./system";
import { documentReducer } from "./document";
import { templateReducer } from "./marketing/text";
import { textChatReducer } from "./marketing/textChat";
import { testReducer } from "./test";
import { supportReducer } from "./support";
import { BillingReducer } from "./billing";
import { adminSchoolReducer } from "./admin/School";
import { adminEmailsReducer } from "./admin/emails";
import { navbarReducer } from "./navbar/Index";
import { studentFiles } from "./studentFiles";
import { docuSignReducer } from "./docuSign";
import {
  ccListReducer,
  expenseReducer,
  IncomeReducer,
  pnlReducer,
} from "./finance";
import { adminfinacereducer } from "./admin/finace";
import { dashboard2Reducer } from "./dashboard2";
import { staticticsReducer } from "./statictics";
import { TaskAndGoalsTaskReducer } from "./task-and-goals/task";
import { TaskAndGoalsGoalReducer } from "./task-and-goals/goals";
import { templateReducerAdmin } from "./admin/Text";
//New Text Chat
import { V2textChatReducer } from "./marketing/V2TextChat";

// Employee sub-user
import { EmployeeSubUserReducer } from "./employee_subusers_roles/index";

import { chatUsersReducer } from "./chatUsers";

const rootReducer = combineReducers({
  docuSignReducer: docuSignReducer,
  navbarReducer: navbarReducer,
  calendar: calendarReducer,
  appointmentAndEvent: appointmentReducer,
  customizer: customizer,
  auth: auth,
  dataList: dataList,
  student: studentReducer,
  member: memberReducer,
  shop: shopReducer,
  program: programReducer,
  stripe: stripeReducer,
  setting: settingReducer,
  mymoney: myMoneyReducer,
  dashboard: dashboardReducer,
  userinfo: userInfoReducer,
  EmailMarketing: EmailMarketing,
  EmailSystemMarketing: EmailSystemMarketing,
  document: documentReducer,
  template: templateReducer,
  textChat: textChatReducer,
  test: testReducer,
  support: supportReducer,
  billingFinance: BillingReducer,
  adminSchoolReducer: adminSchoolReducer,
  adminEmailsReducer: adminEmailsReducer,
  studentFiles: studentFiles,
  adminFinance: adminfinacereducer,
  TaskAndGoalsTaskReducer: TaskAndGoalsTaskReducer,
  TaskAndGoalsGoalReducer: TaskAndGoalsGoalReducer,
  // @finance sections
  cclist: ccListReducer,
  expense: expenseReducer,
  income: IncomeReducer,
  pnl: pnlReducer,
  dashboard2: dashboard2Reducer,
  statictics: staticticsReducer,
  V2textChat: V2textChatReducer,
  employeeSubUser: EmployeeSubUserReducer,
  templateReducerAdmin: templateReducerAdmin,
  chatUsers: chatUsersReducer
});

export default rootReducer;
