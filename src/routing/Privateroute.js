
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React,{Suspense,lazy} from 'react';


import Login from "../component/auth/Login";
import About from "../component/pages/frontend/About";
import Protected from '../component/Protected';
//import UserList from './component/pages/admin/UserList';
import Recharge from '../component/pages/admin/pages/Recharge';
import RechargeHistory from '../component/pages/admin/pages/RechargeHistory';
import Changepswd from '../component/pages/admin/pages/Changepswd';
import UtiPanRequest from '../component/pages/admin/pages/UtiPanRequest';
import Wallethistory from '../component/pages/admin/pages/Wallethistory';
import UtiPanHistory from '../component/pages/admin/pages/UtiPanHistory';
import Home from '../component/pages/frontend/index'
import CreateNewUser from '../component/pages/admin/pages/CreateNewUser.js';
import WalletRequst from '../component/pages/admin/pages/WalletRequest';
import GiveFund from '../component/pages/admin/pages/GiveFund';

import AdminDahsobardIndex from "../component/pages/admin/Index";


const Dashboard = lazy(()=> import('../component/pages/admin/Dashboard'));
const UserList = lazy(()=> import('../component/pages/admin/pages/UserList'));

const PrivateRoute = (props) => {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<AdminDahsobardIndex/>} >
              <Route element={<Protected UserGroup="Admin|Distributor|MD"/>}>
                <Route path="userlist" element={<UserList/>} />
              </Route>
                
              <Route element={<Protected UserGroup="Admin|Retailer|Distributor|MasterDistributor"/>}>
                <Route path="add-user" element={<CreateNewUser/>} />  
              </Route>

              <Route element={<Protected UserGroup="Admin|Retailer|Distributor|MD"/>}>
            
                  <Route path="dashboard" element={<Dashboard/>} ></Route>
                  <Route path="recharge" element={<Recharge/>} /> 
                  <Route path="recharge/history" element={<RechargeHistory/>} />
                  <Route path="recharge/wallet-history" element={<Wallethistory/>} />
                  <Route path="changepassword" element={<Changepswd/>} />
                 
                  
                  <Route path="wallet-request" element={<WalletRequst/>} />
                  <Route path="user/givefund/:user_id" element={<GiveFund/>} />
              </Route>    
        </Route>



      </Routes>
      
    </>
  );
};

export default PrivateRoute;

