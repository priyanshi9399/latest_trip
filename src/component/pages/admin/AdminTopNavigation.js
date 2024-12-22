import react, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaWallet, FaUserAlt } from "react-icons/fa";
import RequestNotification from "./Notification/RequestNotification";

import { wallet_balance } from "./../../../store/action/DashboardAction";
import { PostAPI } from "../../../services/Service";

export default function AdminTopNavigation(props) {
  const [countRequest, setCountRequest] = useState("0");

// useEffect(() => {
//     // Load Select2 script

//     // Load external CSS
//     const cssLink = document.createElement("link");
//     cssLink.rel = "stylesheet";
//     cssLink.href = "inspire_theme/css/style.css";
//     document.head.appendChild(cssLink);

//     const cssLink2 = document.createElement("link");
//     cssLink2.rel = "stylesheet";
//     cssLink2.href = 'inspire_theme/vendors/select2/select2.min.css';
//     document.head.appendChild(cssLink2);

//     const select2Script = document.createElement("script");
//     select2Script.src = "inspire_theme/vendors/select2/select2.min.js";
//     select2Script.async = true;
//     document.body.appendChild(select2Script);

//     const select3Script = document.createElement("script");
//     select3Script.src = "inspire_theme/js/select2.js";
//     select3Script.async = true;
//     document.body.appendChild(select3Script);

//     const misc = document.createElement("script");
//     misc.src = "inspire_theme/js/misc.js";
//     misc.async = true;
//     document.body.appendChild(misc);

//     // Load vendor script
//     const vendorScript = document.createElement("script");
//     vendorScript.src = "inspire_theme/vendors/js/vendor.bundle.base.js";
//     vendorScript.async = true;
//     document.body.appendChild(vendorScript);

//     // Cleanup
//     return () => {
//       // Remove Select2 script
//       if (select2Script.parentNode) {
//         select2Script.parentNode.removeChild(select2Script);
//       }

//       //Remove misc script
//       if (misc.parentNode) {
//         misc.parentNode.removeChild(misc);
//       }

//       // Remove vendor script
//       if (vendorScript.parentNode) {
//         vendorScript.parentNode.removeChild(vendorScript);
//       }

//       // Remove CSS link
//       if (cssLink.parentNode) {
//         cssLink.parentNode.removeChild(cssLink);
//       }
//     };
//   }, []);

  //get balance from main store
  // let balanceDetails  =  useSelector((state) => state.WalletBalanceReducer.balance);
  let navigate = useNavigate();
  const logout = () => {
    // window.location.href = "/login";
    localStorage.clear();
    navigate("/login");
  };

  //let dispach = useDispatch();

  /* useEffect(()=> {
      dispach({type:"UPDATE_BALANCE",payload:"0222"});
    },[])*/
  //
  // const dispatch = useDispatch();
  // const getBalance = async () => {
  //   // dispatch(wallet_balance());
  // };

  // useEffect(() => {
  //   getBalance();
  // }, []);
  let userDta = JSON.parse(localStorage.getItem("userDta"));

  //Request notification
  // const toggleDropdown = (e) => {
  //   e.preventDefault();
  //   setDropdownOpen(!isDropdownOpen);
  // };

  const getNotification = async () => {
    const notificationData = await PostAPI("notification/send_notification");
    if (notificationData.response_code == "200") {
      setCountRequest(notificationData.data);
    } else if (notificationData.response_code == "500") {
      setCountRequest("0");
    }
  };

  // useEffect(() => {
  //   getNotification();
  // }, isDropdownOpen);

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <>
      <nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row mt-2">
        <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
          <a class="navbar-brand brand-logo">
            <img src="/inspire_theme/images/logo3.png" alt="logo" />
          </a>
          {/* <a class="navbar-brand brand-logo-mini">
            <img src="/inspire_theme/images/logo-mini.png" alt="logo" />
          </a> */}
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-stretch">
          <button
            class="navbar-toggler navbar-toggler align-self-center"
            type="button"
            data-toggle="minimize"
          >
            <span class="mdi mdi-menu"></span>
          </button>
          {/* <div class="search-field d-none d-md-block">
            <form class="d-flex align-items-center h-100" action="#">
              <div class="input-group">
                <input type="text" class="form-control" />
                <div class="input-group-prepend">
                  <i class="input-group-text fa fa-search"></i>
                </div>
              </div>
            </form>
          </div> */}
          <ul class="navbar-nav navbar-nav-right">
            <li class="nav-item d-none d-lg-block full-screen-link">
              <a class="nav-link">
              <i class="mdi mdi-fullscreen" id="fullscreen-button"></i>
              </a>
            </li>

            {/* <li class="nav-item dropdown">
              <a
                class="nav-link count-indicator dropdown-toggle"
                id="messageDropdown"
                href="#"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="mdi mdi-email-outline"></i>
                <span class="count-symbol bg-warning"></span>
              </a>
              <div
                class="dropdown-menu dropdown-menu-end navbar-dropdown preview-list"
                aria-labelledby="messageDropdown"
              >
                <h6 class="p-3 mb-0">Messages</h6>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <img
                      src="/inspire_theme/images/faces/face4.jpg"
                      alt="image"
                      class="profile-pic"
                    />
                  </div>
                  <div class="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 class="preview-subject ellipsis mb-1 font-weight-normal">
                      Mark send you a message
                    </h6>
                    <p class="text-gray mb-0"> 1 Minutes ago </p>
                  </div>
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <img
                      src="/inspire_theme/images/faces/face2.jpg"
                      alt="image"
                      class="profile-pic"
                    />
                  </div>
                  <div class="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 class="preview-subject ellipsis mb-1 font-weight-normal">
                      Cregh send you a message
                    </h6>
                    <p class="text-gray mb-0"> 15 Minutes ago </p>
                  </div>
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <img
                      src="/inspire_theme/images/faces/face3.jpg"
                      alt="image"
                      class="profile-pic"
                    />
                  </div>
                  <div class="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 class="preview-subject ellipsis mb-1 font-weight-normal">
                      Profile picture updated
                    </h6>
                    <p class="text-gray mb-0"> 18 Minutes ago </p>
                  </div>
                </a>
                <div class="dropdown-divider"></div>
                <h6 class="p-3 mb-0 text-center">4 new messages</h6>
              </div>
            </li> */}
            {/* 
            <li class="nav-item dropdown">
              <a
                class="nav-link count-indicator dropdown-toggle"
                id="notificationDropdown"
                href="#"
                data-bs-toggle="dropdown"
              >
                <i class="mdi mdi-bell-outline"></i>
                <span class="count-symbol bg-danger"></span>
              </a>
              <div
                class="dropdown-menu dropdown-menu-end navbar-dropdown preview-list"
                aria-labelledby="notificationDropdown"
              >
                <h6 class="p-3 mb-0">Notifications</h6>
                <div class="dropdown-divider"></div>

                <a class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <div class="preview-icon bg-warning">
                      <i class="mdi mdi-cog"></i>
                    </div>
                  </div>
                  <div class="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 class="preview-subject font-weight-normal mb-1">
                      Settings
                    </h6>
                    <p class="text-gray ellipsis mb-0"> Update dashboard </p>
                  </div>
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <div class="preview-icon bg-info">
                      <i class="mdi mdi-link-variant"></i>
                    </div>
                  </div>
                  <div class="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 class="preview-subject font-weight-normal mb-1">
                      Launch Admin
                    </h6>
                    <p class="text-gray ellipsis mb-0"> New admin wow! </p>
                  </div>
                </a>

                <div class="dropdown-divider"></div>
                <h6 class="p-3 mb-0 text-center">See all notifications</h6>
              </div>
            </li> */}

            <li class="nav-item dropdown">
              <a
                class="nav-link count-indicator dropdown-toggle"
                id="notificationDropdown"
                href="#"
                data-bs-toggle="dropdown"
              >
                <i class="mdi mdi-bell-outline"></i>
                {countRequest == 0 ? (
                  ""
                ) : (
                  <span className="start-100 badge bg-danger position-absolute badge-adjust">
                    {countRequest}
                  </span>
                )}
              </a>
              <div
                class="dropdown-menu dropdown-menu-end navbar-dropdown preview-list"
                aria-labelledby="notificationDropdown"
              >
                <h6 class="p-3 mb-0">Notifications</h6>
                <div class="dropdown-divider"></div>

                <a onClick={getNotification} class="dropdown-item preview-item ">
                  <RequestNotification></RequestNotification>
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <div class="preview-icon bg-info">
                      <i class="mdi mdi-cog"></i>
                    </div>
                  </div>
                  <div class="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 class="preview-subject font-weight-normal mb-1">
                      Launch Admin
                    </h6>
                    <p class="text-gray ellipsis mb-0"> New admin wow! </p>
                  </div>
                </a>

                <div class="dropdown-divider"></div>
                <h6 onClick={()=>{navigate('/all-notifications');}} class="p-3 mb-0 text-center">See all notifications</h6>
              </div>
            </li>

            <li class="nav-item nav-profile dropdown">
              <a
                class="nav-link dropdown-toggle"
                id="profileDropdown"
                href="#"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div class="nav-profile-img">
                  <img
                    src="/inspire_theme/images/faces/face1.jpg"
                    alt="image"
                  />
                  <span class="availability-status online"></span>
                </div>
                <div class="nav-profile-text">
                  <p class="mb-1 text-black">
                    {" "}
                    {`${userDta.user.first_name} ${userDta.user.last_name}`}
                  </p>
                </div>
              </a>
              <div
                class="dropdown-menu navbar-dropdown"
                aria-labelledby="profileDropdown"
              >
                {/* <a class="dropdown-item" href="#">
                  <i class="mdi mdi-cached me-2 text-success"></i> Activity Log{" "}
                </a> */}
                {/* <div class="dropdown-divider"></div> */}
                <a class="dropdown-item" onClick={logout}>
                  <i class="mdi mdi-logout me-2 text-primary"></i> Signout{" "}
                </a>
              </div>
            </li>
          </ul>
          <button
            class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            data-toggle="offcanvas"
          >
            <span class="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    </>
  );
}
