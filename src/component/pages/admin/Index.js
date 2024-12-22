import isEmpty from "is-empty";
import {useState,useContext,createContext,useEffect} from "react";
import SideNavigation from "./SideNavigation";
import AdminTopNavigation from "./AdminTopNavigation";
import {useSelector,useDispatch} from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";


function Dashboard(props) {
  const detail = {
    todayRecharge:2000,
    todayBillpayment:5000,
    todayPencard:6
  }
  const [uDetails,setUdetails] = useState(detail);

  return (
  <div class="container-scroller">
    
    <AdminTopNavigation></AdminTopNavigation>

    <div class="container-fluid page-body-wrapper">
      <SideNavigation></SideNavigation>
      <div class="main-panel">
        <Outlet/>
        <Footer></Footer>
      </div>  
      
      </div>

    </div>
    
  );
}

export default Dashboard;
