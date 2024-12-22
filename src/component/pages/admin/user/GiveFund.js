import React from 'react';

import isEmpty from "is-empty";
import {useState,useContext,createContext, useEffect} from "react";

import { PostAPI} from "../../../../services/Service"
import {toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

function GiveFund (){

    const [errorMessage,setErrorMessage] = useState("");
    const [formfilled,setformfilled] = useState(true);

    const [couponForm,setCouponForm] = useState({});

    const [userinfo,setUserInfo] = useState({});

    const location = useLocation();

    useEffect(()=> {
        setUserInfo(location.state);   
    },[])


    const inputHandler = (e) => {
        debugger;
        const {name,value} = e.target;
        setCouponForm((prev) => ({...prev,[name]:value})); 
        setformfilled(false)  
    }

    const submitHandler = async(e) => {
        setformfilled(true);
        e.preventDefault();
        debugger;
        let couponData = await PostAPI("wallet/add_wallet",{wallet_amount:couponForm.wallet_amount,receiver_id:userinfo.id});

        if(couponData.response_code==200){
            toast(couponData.message);
            setformfilled(true);
            setCouponForm((prev) => ({...prev,wallet_amount:''})); 
        }else{
            toast.error(couponData.message);
            setformfilled(false);
        }
    }




    return(<>
    
    <div>

   

   
    <div class="content-wrapper">
        <main role="main" class="col-md-12 pt-3 px-4">
            {/*JSON.stringify(operator)*/}
            <h3>Give Fund</h3>
                <form onSubmit={submitHandler}>

                    <div class="form-group">
                       
                        <label for="amount">Send To : {`${userinfo.first_name} ${userinfo.last_name}`} </label> <br/>
                        <label for="amount">Contact Number  : {`${userinfo.username}`}</label><br/>
                        <label for="amount">Customer City : {`${userinfo.city}`}</label>
                       
                    </div>

                    <div class="form-group">
                        <label for="amount">Transfer Amount </label>
                        <input type="text" 
                        class="form-control" 
                        id="wallet_amount"
                        name="wallet_amount"
                        value={couponForm.wallet_amount}
                        onChange={inputHandler}
                        placeholder="Amount"/>
                    </div>

                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    <button
                    class="btn btn-primary btn-block btn-lg shadow-lg mt-5"
                    type="submit"
                    disabled={formfilled}
                    >
                    Give Fund
                    </button>
            </form>
        </main>
      </div>
      </div>
    
    </>)
}

export default GiveFund;
