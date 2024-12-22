import isEmpty from "is-empty";
import {useState,useContext,createContext, useEffect} from "react";

import {PostAPI} from "../../../../services/Service";


import {toast } from 'react-toastify';
import Loader from "../../../assest/UI/Loader";


function DthRecharge() {

    const rechargeDefaultData = {
        operator:"",
        amount:"",
        customer_id:""
    }

    const [errorMessage,setErrorMessage] = useState("");
    const [formfilled,setformfilled] = useState(true);
    const [rechargeData,setRechargeData] = useState(rechargeDefaultData);
    const [operator,setOperator] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getOperatorList = async() => {
        const operator_list = await PostAPI("recharge/getALLOpeartor",{operator_plan:"DTH"});
        if(operator_list.response_code==200){
            setOperator(operator_list.data);
        }
        if(operator_list.response_code==500){
            toast.error(operator_list.message);  
        }
        
    }

    useEffect(()=>{
        getOperatorList();       
    },[])


    const inputHandler = (e) => {
        const {name,value} = e.target;

        setRechargeData((prev) => ({...prev,[name]:value}));

        if(Object.getOwnPropertyNames(rechargeData).length>2){
            setformfilled(false);
        }
    }

    const submitHandler = async(e) => {
        setIsLoading(true);
        setformfilled(true);
        e.preventDefault();
        const rechargeResponce = await PostAPI("recharge/dthRecharge",{...rechargeData});
        //console.log(rechargeResponce);
        if(rechargeResponce.response_code==200){
            toast(rechargeResponce.message);
            setformfilled(false);
            setRechargeData(rechargeDefaultData);
            setIsLoading(false);
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

        <main role="main" class="col-md-11 pt-3 px-4">
            {/*JSON.stringify(operator)*/}
            <h3>DTH Recharge</h3>
                <form onSubmit={submitHandler}>
                    <div class="form-group">
                        <label for="Operator">Select Operator</label>
                        <select class="form-control" id="operator" name="operator"  value={rechargeData.operator}  onChange={inputHandler}>
                            <option>Please select operator</option>
                            {operator.map((value,key)=>{
                                return(
                                    <option value={value.operator_name}>{value.operator_name}</option>
                                )
                            })}
                           
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="amount">Mobile</label>
                        <input type="text" 
                        class="form-control" 
                        id="customer_id"
                        name="customer_id" 
                        value={rechargeData.customer_id}
                        onChange={inputHandler}
                        placeholder="Customer ID"/>
                    </div>

                    <div class="form-group">
                        <label for="amount">Amount</label>
                        <input type="text" 
                        class="form-control" 
                        id="amount"
                        name="amount"
                        value={rechargeData.amount}
                        onChange={inputHandler}
                        placeholder="Amount"/>
                    </div>

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
            </form>
        </main>
      </div>
      </div>

    
  );
}

export default DthRecharge;
