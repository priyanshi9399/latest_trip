import isEmpty from "is-empty";
import { useState, useContext, createContext, useEffect } from "react";

import { WLOGO } from "../../utils/Constants.js";
import Loader from "../../../src/component/assest/UI/Loader.js"
import { useSelector, useDispatch } from "react-redux";
import { useSocket } from "../../SocketContext";

import Button from "../assest/UI/Button";
import Input from "../assest/UI/Input";
import CustomModal from "../assest/UI/Modal";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { Dologin } from "../../services/Service";

function Login() {
  const socket = useSocket();
  let navigate = useNavigate();
  let globalstoredata = useSelector((state) => state.AuthReducer.isLogin);
  let balanceDetails = useSelector(
    (state) => state.WalletBalanceReducer.balance
  );

  console.log("get user selector data" + globalstoredata);

  const [errorMessage, setErrormessage] = useState("");
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [isLoging, setIsLoging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data,setData] = useState("");

  const handleChange = (e) => {
    setUserDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoging(true);
    setIsLoading(true);

    const res = await Dologin(userDetails);
    if(res.response_code== 400){
      setData("Your account is not active, Please contact admin!")
    }
    if (res.response_code === 200) {
      
      //onSubmitUserHandler(res?.response);
      localStorage.setItem("token", res.data.Sessionkey);
      localStorage.setItem("userDta", JSON.stringify(res.data));
      localStorage.setItem("userName", res.data.user.first_name);
      socket.emit("newUser", {
        userName: res.data.user.first_name,
        socketID: socket.id,
      });

      if (res.data.user.user_group == "Admin") {
        window.location.reload(navigate("/dashboard"));
      } else {
        window.location.reload(navigate("/user_dashboard"));
      }
    
      toast(res.message);
      setIsLoging(false);
      setIsLoading(true);

      //alert("Login Success");
    } else if (res.response_code === 500) {
      toast.error(res.message);
      setIsLoging(false);

      if (!isEmpty(res.message)) {
        setErrormessage(res.message);
      }
      setIsLoading(false);
    }
  };

  return (
    <div>
       

      <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
          <div class="content-wrapper d-flex align-items-center auth">
            <div class="row flex-grow">
              <div class="col-lg-4 mx-auto">
                <div class="auth-form-light text-left p-4">
                  <div class="brand-logo">
                    <img src="/inspire_theme/images/logo2.png" />
                  </div>
                  <h4>Hello! let's get started</h4>
                  <h6 class="font-weight-light">Sign in to continue.</h6>
                  <h5 className="text-danger">{data}</h5>
                  <form class="pt-3" onSubmit={loginSubmitHandler}>
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        name="email"
                        placeholder="Username"
                        onChange={handleChange}
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        class="form-control form-control-lg"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                      />
                    </div>

                    <button
                      class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                      type="submit"
                      disabled={isLoging}
                    >
                      SIGN IN
                    </button>

                    <div class="my-2 d-flex justify-content-between align-items-center">
                      <div class="form-check">
                        <label class="form-check-label text-muted">
                          <input type="checkbox" class="form-check-input" />{" "}
                          Keep me signed in{" "}
                        </label>
                      </div>
                      <a href="#" class="auth-link text-primary">
                        Forgot password?
                      </a>
                    </div>
                    <div class="mb-2 d-grid gap-2">
                      <button
                        type="button"
                        class="btn btn-block btn-facebook auth-form-btn"
                      >
                       
                      </button>
                      <div class="text-center font-weight-light">
                      {" "}
                      Don't have an account?{" "}
                      <a href="/registration" class="text-primary">
                        Create
                      </a>
                    </div>
                    </div>
                    
                  </form>
                  {/* <Loader isLoading={isLoading} /> */}
                </div>
              
              </div>
            </div>
          </div>
        
        </div>
      </div>
       
         
     
    
    </div>

  );
}

export default Login;
