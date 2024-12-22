import isEmpty from "is-empty";
import {useState,useContext,createContext, useEffect} from "react";

import {PostAPI} from "../../../../services/Service";


import {toast } from 'react-toastify';
import { Outlet } from "react-router-dom";


function Recharge() {

  return (
   
    <><Outlet/></>

    
  );
}

export default Recharge;
