import { PanelMenu } from "primereact/panelmenu";
import React, { Component, Fragment } from "react";
import {
  
} from "../routes";

function PanelMenus() {
  const items = [
    {
      label: "CMS",
      icon: "pi pi-list",
      url: "/cms",
    }
  ]
  return (
    <Fragment>
      <PanelMenu model={items} style={{ width: "300px" }} />
    </Fragment>
  )
}

export default PanelMenus
