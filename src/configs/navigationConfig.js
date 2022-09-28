import React from "react";
import "../assets/scss/pages/users.scss";
import SchoolIcon from "@material-ui/icons/School";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import CalendarTodayIcon from "@material-ui/icons/CalendarTodayOutlined";
import BarChartIcon from "@material-ui/icons/BarChartOutlined";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFileOutlined";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import GroupAddIcon from "@material-ui/icons/GroupAddOutlined";
import GroupIcon from "@material-ui/icons/GroupOutlined";
import ListIcon from "@material-ui/icons/ListOutlined";
import FlipCameraAndroidIcon from "@material-ui/icons/FlipCameraAndroidOutlined";
import CheckIcon from "@material-ui/icons/CheckOutlined";
import TextsmsIcon from "@material-ui/icons/TextsmsOutlined";
import GroupAdd from "@material-ui/icons/GroupAdd";
import CallMissedIcon from "@material-ui/icons/CallMissedOutlined";
import AutorenewIcon from "@material-ui/icons/AutorenewOutlined";
import PeopleOutlineTwoTone from "@material-ui/icons/PeopleOutlineTwoTone"
import CakeIcon from "@material-ui/icons/CakeOutlined";
import PersonIcon from "@material-ui/icons/PersonOutlined";
import LocalLibraryIcon from "@material-ui/icons/LocalLibraryOutlined";
import AttachMoneyIcon from "@material-ui/icons/AttachMoneyOutlined";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUserOutlined";
import MailIcon from "@material-ui/icons/Mail";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";

const SchoolNavigationConfig = [
  {
    role: 0,
    id: 0,
    title: "Dashboard",
    type: "dashboard",
    icon: <HomeIcon style={{ fontSize: "1.5em" }} />,
    navLink: "/dashboard",
  },
  {
    role: 0,
    id: 1,
    title: "Members",
    type: "members",
    icon: <GroupAdd style={{ fontSize: "1.5em" }} />,
    children: [
      {
        role: 0,
        id: "nested10",
        title: "Members",
        type: "active",
        background: "#42a8e0",
        icon: <PersonIcon style={{ fontSize: "1.5em" }} className="ml-1" />,
        permissions: ["admin", "editor"],
        navLink: "/app/student/list",
      },
      {
        role: 0,
        id: "nested12",
        title: "Active Trials",
        type: "active_trial",
        background: "#42a8e0",
        icon: <BarChartIcon style={{ fontSize: "1.5em" }} className="ml-1" />,
        permissions: ["admin", "editor"],
        navLink: "/app/student/active-trail/list",
      },
      {
        role: 0,
        id: "nested13",
        title: "Lead",
        type: "leads",
        background: "#42a8e0",
        icon: <GroupAddIcon style={{ fontSize: "1.5em" }} className="ml-1" />,
        permissions: ["admin", "editor"],
        navLink: "/app/student/lead-list/list",
      },
      {
        role: 0,
        id: "nested14",
        title: "Former Members",
        type: "former",
        background: "#42a8e0",
        icon: (
          <LocalLibraryIcon style={{ fontSize: "1.5em" }} className="ml-1" />
        ),
        permissions: ["admin", "editor"],
        navLink: "/app/student/former-member/list",
      },
      {
        role: 0,
        id: "nested15",
        title: "Former Trial",
        type: "former_trail",
        background: "#42a8e0",
        icon: <BarChartIcon style={{ fontSize: "1.5em" }} className="ml-1" />,
        permissions: ["admin", "editor"],
        navLink: "/app/student/former-trail/list",
      },
      {
        role: 0,
        id: "nested16",
        title: "Employee",
        icon: <PersonIcon style={{ fontSize: "1.5em" }} className="ml-1" />,
        permissions: ["admin", "editor"],
        navLink: "/app/employee",
      },
    ],
  },
  {
    role: 0,
    id: 2,
    title: "My School",
    type: "my_school",
    icon: <SchoolIcon style={{ fontSize: "1.5em" }} />,
    children: [
      {
        role: 0,
        id: "nested20",
        title: "Miss You Call",
        icon: <CallMissedIcon style={{ fontSize: "1.5em" }} className="ml-1" />,
        permissions: ["admin", "editor"],
        navLink: "/app/miss-you-call",
      },
      {
        role: 0,
        id: "nested21",
        title: "Renewals",
        icon: <AutorenewIcon style={{ fontSize: "1.5em" }} className="ml-1" />,
        permissions: ["admin", "editor"],
        navLink: "/app/renewals",
      },
      {
        role: 0,
        id: "nested22",
        title: "Birthday",
        icon: <CakeIcon style={{ fontSize: "1.5em" }} className="ml-1" />,
        permissions: ["admin", "editor"],
        navLink: "/app/birthday",
      },
      // {
      //   role: 0,
      //   id: "nested23",
      //   title: "General",
      //   icon: <PeopleOutlineTwoTone style={{ fontSize: "1.5em" }} className="ml-1" />,
      //   permissions: ["admin", "editor"],
      //   navLink: "/app/general",
      // },
      {
        role: 0,
        id: "nested24",
        title: "Candidates",
        icon: <PersonIcon style={{ fontSize: "1.5em" }} className="ml-1" />,
        permissions: ["admin", "editor"],
        navLink: "/app/school/candidates",
      },
     
      {
        role: 0,
        id: "nested25",
        title: "Statistics",
        icon: <PersonIcon style={{ fontSize: "1.5em" }} className="ml-1" />,
        permissions: ["admin", "editor"],
        navLink: "/app/stat",
      },
    ],
  },

  {
    role: 0,
    id: 3,
    title: "Task and Goals",
    type: "task_and_goals",
    icon: <AssignmentTurnedInIcon style={{ fontSize: "1.5em" }} />,
    permissions: ["admin", "editor"],
    navLink: "/app/task-and-goals/task/all/taskonly", // "/app/task-and-goals/:featureType/:filtertype/:otherFilter",
  },
  // {
  //   role: 0,
  //   id: 4,
  //   type: "event manager v1",
  //   title: "Event Manager",
  //   icon: <PersonIcon style={{ fontSize: "1.5em" }}  />,
  //   permissions: ["admin", "editor"],
  //   navLink: "/app/school/test/eligible",
  // },
  {
    role: 0,
    id: 4,
    type: "event manager",
    title: "Event Manager",
    icon: <PersonIcon style={{ fontSize: "1.5em" }}  />,
    permissions: ["admin", "editor"],
    navLink: "/app/school/test/eligiblev2",
  },
  {
    role: 0,
    id: 5,
    title: "Calendar",
    type: "calendar",
    icon: <CalendarTodayIcon style={{ fontSize: "1.5em" }} />,
    children: [
      {
        role: 0,
        id: "nested26",
        title: "Attendance",
        icon: <ListIcon style={{ fontSize: "1.5em" }} className="ml-1" />,
        permissions: ["admin", "editor"],
        navLink: "/calendar",
      },
      {
        role: 0,
        id: "nested27",
        title: "Events",
        icon: (
          <FlipCameraAndroidIcon
            style={{ fontSize: "1.5em" }}
            className="ml-1"
          />
        ),
        permissions: ["admin", "editor"],
        navLink: "/app/appointment",
      },
      {
        role: 0,
        id: "nested28",
        title: "Self Check In",
        icon: <CheckIcon style={{ fontSize: "1.5em" }} className="ml-1" />,
        permissions: ["admin", "editor"],
        navLink: "/calendar/Self Check In",
      },
    ],
  },
  {
    role: 0,
    id: 6,
    title: "Marketing",
    type: "marketing",
    icon: <BarChartIcon style={{ fontSize: "1.5em" }} />,
    children: [
      {
        role: 0,
        id: "nested29",
        title: "Email",
        icon: <MailIcon style={{ fontSize: "1.5em" }} className="ml-1" />,
        permissions: ["admin", "editor"],
        navLink: "/app/marketing/email/EmailMarketing",
      },
      {
        role: 0,
        id: "nested30",
        title: "Text",
        icon: <TextsmsIcon style={{ fontSize: "1.5em" }} className="ml-1" />,
        permissions: ["admin", "editor"],
        navLink: "/company/marketing/v2text/chat/all",
      },
      {
        role: 0,
        id: "nested31",
        title: "Chats",
        icon: <TextsmsIcon style={{ fontSize: "1.5em" }} className="ml-1" />,
        permissions: ["admin", "editor"],
        navLink: "/company/marketing/chatbot",
      },
    ],
  },
  {
    role: 0,
    id: 7,
    title: "Shop",
    type: "shop",
    icon: <ShoppingCartIcon style={{ fontSize: "1.5em" }} />,
    children: [
      {
        role: 0,
        id: "nested31",
        title: "Membership",
        icon: <GroupIcon style={{ fontSize: "1.5em" }} className="ml-1" />,
        permissions: ["admin", "editor"],
        navLink: "/company/shop/membership",
      },
      {
        role: 0,
        id: "nested32",
        title: "Product",
        icon: <AutorenewIcon style={{ fontSize: "1.5em" }} className="ml-1" />,
        permissions: ["admin", "editor"],
        navLink: "/company/shop/product",
      },
    ],
  },
  {
    role: 0,
    id: 8,
    title: "Finance",
    type: "finance",
    icon: <AttachMoneyIcon style={{ fontSize: "1.5em" }} />,
    permissions: ["admin", "editor"],
    navLink: "/company/mymoney/finance/income",
  },
  {
    role: 0,
    id: 9,
    title: "Documents",
    type: "documents",
    icon: <InsertDriveFileIcon style={{ fontSize: "1.5em" }} />,
    permissions: ["admin", "editor"],
    navLink: "/company/documents",
  },

  {
    role: 0,
    id: 10,
    title: "Settings",
    type: "settings",
    icon: <SettingsIcon style={{ fontSize: "1.5em" }} />,
    permissions: ["admin", "editor"],
    navLink: "/company/settings",
  },
];

const AdminNavigationConfig = [
  {
    role: 1,
    id: 0,
    title: "Clients",
    icon: <HomeIcon style={{ fontSize: "1.5em" }} />,
    navLink: "/admin/schools",
  },
  {
    role: 1,
    id: 1,
    title: "Email Activation",
    icon: <VerifiedUserIcon style={{ fontSize: "1.5em" }} />,
    navLink: "/admin/email-activation",
  },
  {
    role: 1,
    id: 1,
    title: "Users",
    icon: <PeopleOutlineIcon style={{ fontSize: "1.5em" }} />,
    navLink: "/admin/users",
  },
  {
    role: 1,
    id: 2,
    title: "Shop",
    icon: <ShoppingCartIcon style={{ fontSize: "1.5em" }} />,
    children: [
      {
        id: "nested1",
        title: "Membership",
        icon: <GroupIcon style={{ fontSize: "1.5em" }} className="ml-1" />,
        permissions: ["admin", "editor"],
        navLink: "/admin/shop/membership",
      },
      {
        id: "nested2",
        title: "Product",
        icon: <AutorenewIcon style={{ fontSize: "1.5em" }} className="ml-1" />,
        permissions: ["admin", "editor"],
        navLink: "/admin/company/shop/product",
      },
    ],
  },
  {
    role: 1,
    id: 3,
    title: "Settings",
    icon: <SettingsIcon style={{ fontSize: "1.5em" }} />,
    permissions: ["admin", "editor"],
    navLink: "/admin/settings",
  },
  {
    role: 1,
    id: 5,
    title: "Marketing",
    icon: <BarChartIcon style={{ fontSize: "1.5em" }} />,
    children: [
      {
        id: "nested3",
        title: "Email",
        icon: <MailIcon style={{ fontSize: "1.5em" }} className="ml-1" />,
        permissions: ["admin", "editor"],
        navLink: "/admin/marketing/email/EmailMarketing",
      },
      {
        role: 1,
        id: 3,
        title: "Text",
        icon: <TextsmsIcon style={{ fontSize: "1.5em" }} />,
        permissions: ["admin", "editor"],
        navLink: "/admin/Text",
      },
    ],
  },
  {
    role: 1,
    id: 4,
    title: "Documents",
    icon: <InsertDriveFileIcon style={{ fontSize: "1.5em" }} />,
    permissions: ["admin", "editor"],
    navLink: "/admin/company/documents",
  },
  {
    role: 1,
    id: 4,
    title: "Support",
    icon: <InsertDriveFileIcon style={{ fontSize: "1.5em" }} />,
    permissions: ["admin", "editor"],
    navLink: "/admin/company/support",
  },
];

const getUserInfoRole = () => {
  return JSON.parse(localStorage.getItem("userdata"))?.data?.role;
};

const SubUserAccess = () => {
  let roleList = JSON.parse(localStorage.getItem("userdata"))?.roles;
  if (roleList !== undefined) {
    const asArray = Object.entries(roleList[0]);
    const filtered = asArray.filter(([key, value]) => value === true);
    const justStrings = Object.fromEntries(filtered);
    let result = SchoolNavigationConfig.filter((v) => Object.keys(justStrings).includes(v.type));
    return result;
  } else {
    return SchoolNavigationConfig;
  }
};

export default {
  SideBarMenu:
    getUserInfoRole() === 0 ? SubUserAccess() : AdminNavigationConfig,
};
