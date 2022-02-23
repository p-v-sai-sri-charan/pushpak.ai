import React, { Suspense, useState } from "react";
import { Redirect, Route, Switch, useParams } from "react-router-dom";
import AuthValidator from "../components/AuthValidator";
import PanelMenu from "../components/PanelMenu";
import routes from "../routes";
import DeafultHeader from "./DefaultHeader";
import pushpaklogo from "../assests/images/pushpaklogo.svg";

function DefaultLayout(props) {
  const [openNav, setOpenNav] = useState(false);
  const [openTopMenu, setOpenTopMenu] = useState(false);
  const parameter = window.location.pathname;
  console.log("parameter", parameter);

  const onToggleSideMenu = () => {
    const openNavs = openNav;
    setOpenNav(!openNav);
    return !openNavs;
  };

  const closeSideMenu = () => {
    setOpenNav(false);
  };

  const onToggleTopMenu = () => {
    const openTopMenus = openTopMenu;
    setOpenTopMenu(!openTopMenu);
    return !openTopMenus;
  };

  const closeTopMenu = () => {
    setOpenNav(false);
  };
  return (
    <div className="container max-w-full">
      <div
        className="max-w-screen-wmax mr-auto ml-auto mb-0 mt-0 "
        style={{
          height: "80vh",
        }}
      >
        <div className="text-indigo-600 text-center text-4xl">
          <DeafultHeader
            onToggleSideMenu={onToggleSideMenu}
            closeSideMenuFn={closeSideMenu}
            onToggleTopMenu={onToggleTopMenu}
            closeTopMenu={closeTopMenu}
          />
        </div>

        <div className="flex flex-row">
          <div class="relative bg-white dark:bg-gray-800 hidden md:block">
            <div class="flex flex-col sm:flex-row sm:justify-around">
              <div class="w-56 ">
                <nav class="mt-10 px-6 ">
                  <a
                    class={`hover:text-gray-800 hover:bg-gray-100 flex flex-col justify-center items-center 
                    p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  
                    text-gray-600 dark:text-gray-400 rounded-lg ${
                      parameter === "/video-wall"
                        ? "bg-gray-100 hover:bg-gray-400"
                        : ""
                    }`}
                    href="/video-wall"
                  >
                    <i className="pi pi-video" style={{ fontSize: "2em" }}></i>
                    <span class="mx-4 text-base font-normal">Video Wall</span>
                    <span class="flex-grow text-right"></span>
                  </a>
                  <a
                    class={`hover:text-gray-800 hover:bg-gray-100 flex flex-col justify-center items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg ${
                      parameter === "/camera-list"
                        ? "bg-gray-100 hover:bg-gray-400"
                        : ""
                    }`}
                    href="/camera-list"
                  >
                    <i className="pi pi-list" style={{ fontSize: "2em" }}></i>
                    <span class="mx-4 text-base font-normal">Camera List</span>
                    <span class="flex-grow text-right"></span>
                  </a>
                  <a
                    class={`hover:text-gray-800 hover:bg-gray-100 flex flex-col justify-center items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg ${
                      parameter === "/resident-list"
                        ? "bg-gray-100 hover:bg-gray-400"
                        : ""
                    }`}
                    href="/resident-list"
                  >
                    <i className="pi pi-user" style={{ fontSize: "2em" }}></i>
                    <span class="mx-4 text-base text-center font-normal">
                      Resident List/ Employee List
                    </span>
                    <span class="flex-grow text-right"></span>
                  </a>
                  <a
                    class={`hover:text-gray-800 hover:bg-gray-100 flex flex-col justify-center items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg ${
                      parameter === "/visitor-list"
                        ? "bg-gray-100 hover:bg-gray-400"
                        : ""
                    }`}
                    href="/visitor-list"
                  >
                    <i className="pi pi-users" style={{ fontSize: "2em" }}></i>
                    <span class="mx-4 text-base font-normal">Visitor List</span>
                    <span class="flex-grow text-right"></span>
                  </a>
                  <a
                    class={`hover:text-gray-800 hover:bg-gray-100 flex flex-col justify-center items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg ${
                      parameter === "/vechicle-log"
                        ? " bg-gray-100 hover:bg-gray-400"
                        : ""
                    }`}
                    href="/vechicle-log"
                  >
                    <i className="pi pi-car" style={{ fontSize: "2em" }}></i>
                    <span class="mx-4 text-base font-normal">Vehical Log</span>
                    <span class="flex-grow text-right"></span>
                  </a>
                </nav>
              </div>
            </div>
          </div>

          <div
            className={`${
              openNav ? `customMarginTrue ` : ` customMarginFalse `
            } min-h-screen col-span-6 text-indigo-600 text-4xl w-full flex flex-col justify-between`}
          >
            <main className="mx-2 md:mx-10 mt-5 pb-10">
              <Suspense fallback={<div>Loading</div>}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => (
                          <AuthValidator
                            authorizedcomponent={route.component}
                            urlpath={route.path}
                            {...props}
                          />
                        )}
                      />
                    ) : null;
                  })}
                  <Redirect from="/" to="/404" />
                </Switch>
              </Suspense>
            </main>
            <footer class="bg-white dark:bg-gray-800 w-full py-8 flex e-full  justify-center">
              <div class="max-w-screen-xl mx-auto px-4 ">
                <img src={pushpaklogo} alt="logo" class="h-16 w-auto" />
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
