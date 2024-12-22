import React from "react";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { WLOGO } from "../../../utils/Constants.js";
import { useEffect } from "react";

export default function SideNavigation() {
  let navigate = useNavigate();
  const logout = () => {
    debugger;
    localStorage.clear();
    navigate("/login");
  };

 
  return (
    <>
      <nav class="sidebar sidebar-offcanvas " id="sidebar">
      <ul class="nav">
        <Menu/>

        <li class="nav-item">
            <a class="nav-link">
              <span class="menu-title" onClick={logout}>
                Logout
              </span>
              <i class="fa fa-sign-out  menu-icon"></i>
            </a>
          </li>

          <li class="nav-item">
            <hr></hr>
          </li>
      </ul>
      </nav>
    </>
  );
}
