import {
  ALLOW_PANCARD,
  ALLOW_PAYMENT_REQ,
  ALLOW_PAYOUT,
} from "./utils/Constants.js";

const NavigationMenu = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "mdi mdi-home menu-icon",
    urlAccess: ["Admin"],
  },
  {
    name: "Dashboard",
    url: "/user_dashboard",
    icon: "mdi mdi-home menu-icon",
    urlAccess: ["User"],
  },

  {
    name: "Users",
    url: "/userlist",
    icon: "fa fa-user-circle-o menu-icon",
    urlAccess: ["Admin"],
  },

  {
    name: "Send Notification",
    url: "/send-notification",
    icon: "fa fa-solid fa-bell menu-icon",
    urlAccess: ["Admin"],
  }
];

NavigationMenu.push({
  name: "Activity",
  urlAccess: ["Admin"],
  icon: "fa fa-bullseye  menu-icon",
  id:"ui-basic",
  children: [
    {
      name: "Activity Groups",
      url: "/activity-group",
      icon: "fa fa-mobile",
      urlAccess: ["Admin","User"],
    },
    {
      name: "Activity List",
      url: "/activity-list",
      icon: "fa fa-mobile",
      urlAccess: ["Admin","User"],
    },
    {
      name: "Sub Category",
      url: "/sub-category",
      icon: "fa fa-mobile",
      urlAccess: ["Admin"],
    },
    
  ],
});

NavigationMenu.push({
  name: "Activity",
  urlAccess: ["User"],
  icon: "fa fa-bullseye  menu-icon",
  id:"Goals",
  children: [
    {
      name: "Add Activitys",
      url: "/activity-data",
      icon: "fa fa-mobile",
      urlAccess: ["User"],
    },
    {
      name: "Upcoming Activity",
      url: "/upcoming_activity",
      icon: "fa fa-mobile",
      urlAccess: ["Admin","User"],
    },
    {
      name: " Completed Activity",
      url: "/complete_activity",
      icon: "fa fa-mobile",
      urlAccess: ["Admin"],
    },
    
  ],
});

NavigationMenu.push({
  name: "Badge Mangement",
  url: "/badge_management",
  icon: "fa fa-shield menu-icon",
  urlAccess: ["Admin"],
});

// NavigationMenu.push({
//   name: "Setting",
//   url: "/setting",
//   icon: "fa fa-gear  menu-icon",
//   urlAccess: [ "User"],
// });

NavigationMenu.push({
  name: "Chat",
  url: "/chat",
  icon: "fa fa-comments menu-icon",
  urlAccess: [ "User"],
});


NavigationMenu.push({
  name: "My Network",
  urlAccess: ["User"],
  icon: "fa fa-group  menu-icon",
  id:"MyNetwork",
  children: [
    {
      name: "Friends Suggestions",
      url: "/requested-user",
      icon: "fa fa-mobile",
      urlAccess: ["User"],
    },
    // {
    //   name: "My Friends",
    //   url: "/upcoming_activity",
    //   icon: "fa fa-mobile",
    //   urlAccess: ["Admin","User"],
    // }
  ],
});


NavigationMenu.push({
  name: "Support",
  url: "/support",
  icon: "FaRegWindowRestore",
  urlAccess: ["User"],
});

export default NavigationMenu;
