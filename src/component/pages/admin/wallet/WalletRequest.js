import isEmpty from "is-empty";
import {useState,useContext,createContext, useEffect} from "react";
import { Outlet,Link } from "react-router-dom";

import {PostAPI} from "../../../../services/Service";
import {toast } from 'react-toastify';
import Loader from "../../../assest/UI/Loader";



import {
  useNavigate
} from "react-router-dom";

function WalletRequst() {
  let navigate = useNavigate();

  const defaultWalletData = {
    paidby:"bank",
    amount_paid:"",
    ref_no:"",

  }

  const [userList,setUserList] = useState([]);
  const [banklist,setBankList] = useState([]);
  const [bankupi,setBankupi] = useState(true); // true mean Bank select Default
  const [walletRechargeData,setwalletRechargeData] = useState(defaultWalletData); // true mean Bank select Default
  const [isLoading, setIsLoading] = useState(false);
  const [formfilled,setformfilled] = useState(true);
  const [errorMessage,setErrorMessage] = useState("");


  const getBankList = async() => {
      const banklist = await PostAPI("wallet_recharge/wallet_bank_list",{});
      if(banklist.response_code==200){
         setBankList(banklist.data);
      }
      if(banklist.response_code==500){
          toast.error(banklist.message);  
      }
  }

  useEffect(()=>{
    getBankList()
  },[])

  const inputHandler = (e) => {
      const {name,value} = e.target;
      if(name=="paidby" && value=="UPI"){
        setwalletRechargeData({})
      }
      setwalletRechargeData((prev) => ({...prev,[name]:value}));

      if(Object.getOwnPropertyNames(walletRechargeData).length>2){
        setformfilled(false);
      }
  }

  const submitHandler = async(e) => {
    setformfilled(true);
    e.preventDefault();
    setIsLoading(true);
    const rechargeResponce = await PostAPI("wallet_recharge/add_wallet_recharge",{...walletRechargeData});
    //console.log(rechargeResponce);
    if(rechargeResponce.response_code==200){
       toast(rechargeResponce.message);
        setformfilled(false);
        //setRechargeData(rechargeDefaultData);
        setIsLoading(false);
        setwalletRechargeData(defaultWalletData);
    }
    if(rechargeResponce.response_code==500){
        toast.error(rechargeResponce.message);
        setformfilled(false);
        setIsLoading(false);
    }
}

  return (
    <div>
    
        <div class="content-wrapper">

            <main role="main" class="col-md-12 pt-3 px-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 class="h2">Wallet Request</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              
              <button class="btn btn-sm btn-outline-secondary">
                <Link to="history">History</Link>
              </button>
            </div>
          </div>
               

                <input type="radio" name="paidby" value="bank" onChange={inputHandler} checked={walletRechargeData.paidby=="bank"?"checked":""} /> Bank &nbsp;
                <input type="radio" name="paidby" value="UPI" onChange={inputHandler} checked={walletRechargeData.paidby=="UPI"?"checked":""}/> UPI (QR Code)
            <br/><br/>
            <form onSubmit={submitHandler}>
            <div class="row"> 
                <div class="col-sm-6 col-lg-6 col-md-6">
                    <div class="form-group">
                        <label for="amount">Amount Paid (Min Rs 500) </label>
                        <input type="text" 
                        class="form-control" 
                        id="amount_paid"
                        name="amount_paid" 
                        value={walletRechargeData.amount_paid}
                        onChange={inputHandler}
                        placeholder="Amount"/>
                    </div>

                    <div class="form-group">
                        <label for="amount">UTR/Ref No*</label>
                        <input type="text" 
                        class="form-control" 
                        id="ref_no"
                        name="ref_no"
                        value={walletRechargeData.ref_no}
                        onChange={inputHandler}
                        placeholder="Ref No"/>
                    </div>

                    { walletRechargeData.paidby=="bank" && 
                    <>  
                      <div class="form-group">
                          <label for="amount">Payment Mode</label>
                          <select class="form-control" id="our_bank" name="our_bank"  onChange={inputHandler}>
                              <option>Please select bank</option>
                              {banklist.map((value,key)=>{
                                  return(
                                      <option value={value.bank_name}>{value.bank_name}</option>
                                  )
                              })}
                            
                          </select>
                      </div>

                      <div class="form-group">
                          <label for="amount">Payment Mode</label>
                          <select class="form-control" id="payment_mode" name="payment_mode"  onChange={inputHandler}>
                              <option>Please select payment mode</option>
                              <option value="NEFT">NEFT</option>
                              <option value="IMPS">IMPS</option>
                              <option value="UPI">UPI</option>
                              <option value="RTGS">RTGS</option>
                          </select>
                      </div>
                    </>
                  }

              {isLoading && 
                <Loader/>
                }

              {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    <button
                    class="btn btn-primary btn-block btn-lg shadow-lg mt-5"
                    type="submit"
                    disabled={formfilled}
                    >
                    Submit
                    </button>         

                </div> 


                <div class="col-sm-6 col-lg-6 col-md-6">

                  { walletRechargeData.paidby=="bank" &&  
                  <> 
                    {banklist.map((value,key)=>{
                        return(
                            <div class="callout callout-info row">
                              <div class="col-sm-8">
                              <h5>{value.account_t}</h5>
                                Bank Name : {value.bank_name}  <br/>
                                Account No : {value.account_no}<br/>
                                IFSC Code : {value.ifsc_code}<br/>
                                Account Holder Name :  {value.account_holder_name}<br/>
                              </div>
                              <div class="col-sm-4">
                                <img src={"https://rightpe.com/"+value.img_url} width="80%"/>
                              </div>

                            </div>
                        )
                    })}
                  </>
                }

              { walletRechargeData.paidby=="UPI" &&  
                   <img src="https://rightpe.com/uploads/upi.jpg" width="80%"/>
              }


                </div>
            </div> 
            </form>     
        </main>
      </div>
   
     
    </div>
  );
}

export default WalletRequst;
