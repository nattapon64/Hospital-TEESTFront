import React from "react";
import Login from "../login/Login";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Lawdocument from "../Lawdocument";
import Main from "../main/Main";
import Sidebar from "../Sidebar";
import useAuth from "../hooks/useAuth";
import Adduser from "../components/admin/Adduser"
import Edituser from "../components/admin/Edituser";
import Header from "../Header";
import Mainuser from "../components/user/Mainuser";
import Baruser from "../components/user/Baruser";
import Footeruser from "../components/user/Footeruser";
import Changpassuser from "../components/user/changpassuser";
import ReportUserOT from "../components/user/reportUserOT";
import ReportUser from "../components/admin/reportuser";
import Reportsumuser from "../components/admin/reportsumuser";
import AddUserSystem from "../components/admin/Addusersystem";
import ReportsumuseBA from "../components/admin/reportsumuseBA";


const guestRouter =createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <Login /> },
      { path: '/Login', element: <Login /> },
      // { path: '/Main', element: <Main /> },
      { path: '/Lawdocument', element: <Lawdocument /> },
      { path: '*', element: <p>PAGE NOT FOUND</p>},
    ]
  }
])

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header/>
        <Outlet />
        <Footeruser/>
      </>
    ),
    children: [
      { index: true, element: <Mainuser /> },
      { path: '/Baruser', element: <Baruser /> },
      { path: '/Mainuser', element: <Mainuser /> },
      { path: '/Changpassuser', element: <Changpassuser /> },
      { path: '/ReportUserOT', element: <ReportUserOT/>},
      { path: '*', element: <p>PAGE NOT FOUND</p>},
    ]
  },
]);

const adminRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header/>
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <Main /> },
      { path: '/Main', element: <Main /> },
      { path: '/Sidebar', element: <Sidebar /> },
      { path: '/Adduser', element: <Adduser /> },
      { path: '/Edituser', element: <Edituser /> },
      { path: '/Reportuser', element: <ReportUser /> },
      { path: '/Reportsumuser', element: <Reportsumuser /> },
      { path: '/AddUserSystem', element: <AddUserSystem /> },
      { path: '/ReportsumuseBA', element: <ReportsumuseBA /> },
      { path: '*', element: <p>PAGE NOT FOUND</p>},
    ]
  }
])

function WebRouters() {
  const { user } = useAuth()
  // console.log(user)
  const finalRouter = user?.CID ? user.admin === 1 ? adminRouter : userRouter : guestRouter
 return <RouterProvider router={finalRouter} />;
}

export default WebRouters;
