import isEmpty from "is-empty";
import { useState, useContext, createContext, useEffect } from "react";

import { PostAPI } from "../../../../services/Service";
import Loader from "../../../assest/UI/Loader";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const userDefaultData = {
  username: "",
  password: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  state: "",
  city: "",
  pincode: "",
  address: "",
};

export default function CreateNewUser() {
  let navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [formfilled, setformfilled] = useState(true);
  const [rechargeData, setRechargeData] = useState(userDefaultData);
  const [operator, setOperator] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getOperatorList = async () => {
    const operator_list = await PostAPI("recharge/getALLOpeartor", {
      operator_plan: "prepaid",
    });
    setOperator(operator_list.data);
  };

  useEffect(() => {
    getOperatorList();
  }, []);

  const inputHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setRechargeData((prev) => ({ ...prev, [name]: value }));

    if (Object.getOwnPropertyNames(rechargeData).length > 2) {
      setformfilled(false);
    }
  };

  const submitHandler = async (e) => {
    setformfilled(true);
    e.preventDefault();
    setIsLoading(true);
    const rechargeResponce = await PostAPI("user_management/createUser", {
      ...rechargeData,
    });
    //console.log(rechargeResponce);
    if (rechargeResponce.response_code == 200) {
      toast(rechargeResponce.message);
      setformfilled(false);
      setRechargeData(userDefaultData);
      setIsLoading(false);
    }
    if (rechargeResponce.response_code == 500) {
      toast.error(rechargeResponce.message);
      setformfilled(false);
      setIsLoading(false);
    }
  };

  return (
    <>
     
      <div class="content-wrapper">
      <div class="row">
        
      <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
            <div class=" d-flex justify-content-between  ">
              <div class="page-header ">
                <h1 class="page-title ">Add New User</h1>
              </div>
              <div class="col-md-10">
                <div class="col-md-12 d-flex justify-content-end">
                  <button
                    class="btn btn-gradient-primary me-2"
                    onClick={() => {
                      navigate("/userlist");
                    }}
                  >
                    Users List
                  </button>
                </div>
              </div>
            </div>
        
          <form onSubmit={submitHandler}>
            <div class="row col-sm-12 col-xs-12 col-lg-12 ">
              <div class="form-group col-sm-6 col-lg-3">
                <label for="amount">First Name</label>

                <input
                  type="text"
                  class="form-control"
                  id="first_name"
                  name="first_name"
                  value={rechargeData.first_name}
                  onChange={inputHandler}
                  placeholder="First Name"
                />
              </div>

              <div class="form-group col-sm-6 col-lg-3">
                <label for="amount">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="last_name"
                  name="last_name"
                  value={rechargeData.last_name}
                  onChange={inputHandler}
                  placeholder="Last Name"
                />
              </div>

              <div class="form-group col-sm-6 col-lg-3">
                <label for="amount">Email</label>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  name="email"
                  value={rechargeData.email}
                  onChange={inputHandler}
                  placeholder="Email"
                />
              </div>

              <div class="form-group col-sm-6 col-lg-3 col-12">
                <label>Phone</label>
                <input
                  type="text"
                  class="form-control"
                  id="phone"
                  name="phone"
                  value={rechargeData.phone}
                  onChange={inputHandler}
                  placeholder="Phone"
                />
              </div>

              <div class="form-group col-sm-6 col-lg-3">
                <label>State</label>
                <input
                  type="text"
                  class="form-control"
                  id="state"
                  name="state"
                  value={rechargeData.state}
                  onChange={inputHandler}
                  placeholder="State"
                />
              </div>

              <div class="form-group col-sm-6 col-lg-3 ">
                <label>City</label>
                <input
                  type="text"
                  class="form-control"
                  id="city"
                  name="city"
                  value={rechargeData.city}
                  onChange={inputHandler}
                  placeholder="City"
                />
              </div>

              <div class="form-group col-sm-6 col-lg-3 ">
                <label>PinCode</label>
                <input
                  type="text"
                  class="form-control"
                  id="pincode"
                  name="pincode"
                  value={rechargeData.pincode}
                  onChange={inputHandler}
                  placeholder="Pincode"
                />
              </div>
              <div class="form-group col-xs-12 col-sm-6  col-lg-3 ">
                <label>Address</label>
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  name="address"
                  value={rechargeData.address}
                  onChange={inputHandler}
                  placeholder="Address"
                />
              </div>
              <div class="form-group col-sm-6 col-lg-3 ">
                <label>Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  name="username"
                  value={rechargeData.username}
                  onChange={inputHandler}
                  placeholder="Username"
                />
              </div>
              <div class="form-group col-sm-6 col-lg-3 ">
                <label>Password</label>
                <input
                  type="text"
                  class="form-control"
                  id="password"
                  name="password"
                  value={rechargeData.password}
                  onChange={inputHandler}
                  placeholder="Password"
                />
              </div>

              {isLoading && <Loader />}

              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              <div>
              <button
                class="btn btn-gradient-primary me-2"
                style={{width:"90px"}}
                type="submit"
              
              >
                Submit
              </button>
              </div>
            </div>
          </form>
    
      </div>
      </div>
    
    
    
   </div>
   </div>
   </div>
   
    </>
  );
}
