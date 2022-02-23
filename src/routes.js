import React from "react";
//links
export const linkLogin = "/";
export const linkForgotPassword = "/forgot-password";
export const linkChangePassword = "/change-password";
export const linkDashboard = "/dashboard";
export const linkVideoWall = "/video-wall";
export const linkCameraList = "/camera-list";
export const linkResidentList = "/resident-list";
export const linkVisitorList = "/visitor-list";
export const linkVechicleLog = "/vechicle-log";
export const linkVechicleLogDetail = "/vechicle-log/:id";


//linknames
export const linkName = "Login";
export const linkNameForgotPassword = "Forgot Password";
export const linkNameChangePassword = "Change Password";
export const linkNameDashboard = "Dashboard";
export const linkNameVideoWall = "Video Wall";
export const linkNameCameraList = "Camera List";
export const linkNameResidentList = "Resident List";
export const linkNameVisitorList = "Visitor List";
export const linkNameVechicleLog = "Vechicle Log";
export const linkNameVechicleLogDetail = "Vechicle Log Detail";


//views
const changePassword = React.lazy(() => import("./components/views/PageChangePassword"));
const dashboard = React.lazy(() => import("./components/views/dashboard"));
const videoWall = React.lazy(() => import("./components/views/videoWall"));
const cameraList = React.lazy(() => import("./components/views/cameraList"));
const residentList = React.lazy(() => import("./components/views/residentList"));
const visitorList = React.lazy(() => import("./components/views/visitorList"));
const vechicleLog = React.lazy(() => import("./components/views/vechicleLog"));
const vechicleLogDetail = React.lazy(() => import("./components/views/vechicleLogDetail"));

//routes
const routes = [
  { 
      path: linkDashboard,
      exact: true,
      name: linkNameDashboard,
      component: dashboard 
  },
  {
   path: linkVideoWall,
    exact: true,
    name: linkNameVideoWall,
    component: videoWall
  },
  {
    path: linkCameraList,
    exact: true,
    name: linkNameCameraList,
    component: cameraList
  },
  {
    path: linkResidentList,
    exact: true,
    name: linkNameResidentList,
    component: residentList
  },
  {
    path: linkVisitorList,
    exact: true,
    name: linkNameVisitorList,
    component: visitorList
  },
  {
    path: linkVechicleLog,
    exact: true,
    name: linkNameVechicleLog,
    component: vechicleLog
  },
  {
    path:linkChangePassword,
    exact: true,
    name: linkNameChangePassword,
    component: changePassword
  },
  {
    path:linkVechicleLogDetail,
    exact: true,
    name: linkNameVechicleLogDetail,
    component: vechicleLogDetail
  }
];

export default routes;