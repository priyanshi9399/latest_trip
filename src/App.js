import React,{Suspense,lazy} from 'react';
import { useEffect,useState } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {SocketProvider} from "./SocketContext";


import {
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,Navigate
} from "react-router-dom";




import Login from './component/auth/Login';
//import About from './component/pages/About';
import Protected from './component/Protected';

//import UserList from './component/pages/admin/UserList';



//Wallet Module
import Wallethistory from './component/pages/admin/wallet/Wallethistory';
import WalletRequst from './component/pages/admin/wallet/WalletRequest';

import HomeIndex from './component/pages/frontend/index';
import Home from './component/pages/frontend/Home';


//User Module 
import CreateNewUser from './component/pages/admin/user/CreateNewUser';
import GiveFund from './component/pages/admin/user/GiveFund';
import Changepswd from './component/pages/admin/user/Changepswd';

import Support from './component/pages/admin/support/Support';

import Dashboard from "./component/pages/admin/Dashboard";


import About from './component/pages/frontend/About';
import ContactUs from './component/pages/frontend/ContactUs';
import Service from './component/pages/frontend/Service';
import UserList from './component/pages/admin/user/UserList';
import PrivacyPolicy from './component/pages/frontend/PrivacyPolicy';
import Registration from './component/auth/registration/Registration';



//Category Managment
import AddCategory from './component/pages/admin/Category/AddCategory';
import CategoryList from './component/pages/admin/Category/CategoryList';
import SearchBar from './component/pages/admin/Category/SearchBar';
import ActivityGroup from './component/pages/admin/Category/ActivityGroup';
import ListActivityData from './component/pages/admin/LIstDataUser/ListActivityData';
import Network from './component/pages/admin/LIstDataUser/Network';
import Chat from './component/pages/admin/LIstDataUser/Chat';

import BadgeManagement from './component/pages/admin/BadgeManagement/BadgeManagement';
import BadgeList from './component/pages/admin/BadgeManagement/BadgeList';
import UserUpdate from './component/pages/admin/user/UserUpdate';
import UpcomingActivity from './component/pages/admin/LIstDataUser/UpcomingActivity';
import CompleteActivity from './component/pages/admin/LIstDataUser/CompleteActivity';
import UserDashBoard from './component/pages/admin/UserDashBoard';
import AddActivityGroup from './component/pages/admin/Category/AddActivityGroup';
import RequestedUser from './component/pages/admin/LIstDataUser/RequestedUser';
import RequestNotification from './component/pages/admin/Notification/RequestNotification';
import AllNotification from './component/pages/admin/Notification/AllNotification';
import SendNotification from './component/pages/admin/PushNotification/SendNotification';


function App() {
  const [isLoggedIn, setisLoggedIn] = useState(null);
  

  return (
    <SocketProvider>
    <div className="">

      <Routes>

        <Route path="/" element={<HomeIndex/>} >
        
          <Route path="" element={<Login/>} />
          <Route path="login" element={<Login/>} />
          <Route path='registration' element={<Registration/>} />
          <Route path="home" element={<Home/>} />
          <Route path="about" element={<About/>} />
          <Route path="contact-us" element={<ContactUs/>} />
          <Route path="service" element={<Service/>} />
          <Route path="privacy-policy" element={<PrivacyPolicy/>} />
          
       
        </Route>

  
                
                <Route element={<Protected UserGroup="Admin"/>}>
                  <Route path="userlist" element={<UserList/>} />
                </Route>
                  
                <Route element={<Protected UserGroup="Admin"/>}>
                  <Route path="add-user" element={<CreateNewUser/>} />  
                </Route>
               

                
          

                <Route element={<Protected UserGroup="Admin"/>}>
                  <Route path="dashboard" element={<Dashboard/>} ></Route>
                  <Route path="history" element={<Wallethistory/>} />
                  <Route path="changepassword" element={<Changepswd/>} />

                 
                

                  <Route path="wallet-request" element={<WalletRequst/>} />
            
                  <Route path="user/givefund/:user_id" element={<GiveFund/>} />
                  <Route path="/send-notification" element={< SendNotification/>} />

                </Route>
                


                <Route element={<Protected UserGroup="Admin"/>}>
                  <Route path="/category" element={<AddCategory/>} />  
                </Route>
                <Route element={<Protected UserGroup="Admin"/>}>
                  <Route path="/activity-list" element={<CategoryList/>} />
                </Route>
                <Route element={<Protected UserGroup="Admin"/>}>
                  <Route path="/sub-category" element={<SearchBar/>} />
                </Route>
                <Route element={<Protected UserGroup="Admin"/>}>
                  <Route path="/activity-group" element={<ActivityGroup/>} />
                </Route>Distributor
                <Route element={<Protected UserGroup="User"/>}>
                  <Route path="/activity-data" element={<ListActivityData/>} />
                </Route>
                <Route element={<Protected UserGroup="User"/>}>
                  <Route path="/network/:userid" element={<Network></Network>} />
                </Route>
                <Route element={<Protected UserGroup="User"/>}>
                  <Route path="/chat/:userid/:name" element={<Chat></Chat>} />
                </Route>
                <Route element={<Protected UserGroup="User"/>}>
                  <Route path="/chat" element={<Chat></Chat>} />
                </Route>
                <Route element={<Protected UserGroup="User"/>}>
                  <Route path="/request-notification" element={<RequestNotification></RequestNotification>} />
                </Route>
                <Route element={<Protected UserGroup="User"/>}>
                  <Route path="/all-notifications" element={<AllNotification></AllNotification>} />
                </Route>
                 
             
                <Route element={<Protected UserGroup="Admin"/>}>
                  <Route path="/badge_management" element={<BadgeManagement></BadgeManagement>} />
                </Route>
                <Route element={<Protected UserGroup="Admin"/>}>
                  <Route path="/badge_list" element={<BadgeList></BadgeList>} />
                </Route>
                <Route element={<Protected UserGroup="Admin"/>}>
                  <Route path="/user-update/:userid" element={<UserUpdate/>} />  
                </Route>
                <Route element={<Protected UserGroup="User"/>}>
                  <Route path="/upcoming_activity" element={<UpcomingActivity></UpcomingActivity>} />
                </Route>
                <Route element={<Protected UserGroup="User"/>}>
                  <Route path="/complete_activity" element={<CompleteActivity></CompleteActivity>} />
                  <Route path="support" element={<Support/>} />
                </Route>
                <Route element={<Protected UserGroup="User"/>}>
                  <Route path="/user_dashboard" element={<UserDashBoard></UserDashBoard>} />
                </Route>

                <Route element={<Protected UserGroup="User"/>}>
                  <Route path="/requested-user" element={<RequestedUser></RequestedUser>} />
                </Route>




                
                

      </Routes>  	       

  
        <ToastContainer />


    </div>
    </SocketProvider>
  );
}

export default App;
