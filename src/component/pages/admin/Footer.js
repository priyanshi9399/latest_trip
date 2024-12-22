import isEmpty from "is-empty";
import {NavLink,Link} from "react-router-dom";
import {useState,useContext,createContext,useEffect} from "react";

function Footer(props) {

  return (
    <>
          <footer class="footer">
            <div class="d-sm-flex justify-content-center justify-content-sm-between">
              <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2024 <b>Aspire Connect</b>. Trip Togather</span>
              <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Made by <a href="#" target="_blank">Priyanshi & Megha</a> <i class="mdi mdi-heart text-danger"></i></span>
            </div>
          </footer>
    </> 
  );
}

export default Footer;
