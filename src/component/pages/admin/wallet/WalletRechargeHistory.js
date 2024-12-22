import React , {useEffect,useState} from "react"; 

import {PostAPI} from "../../../../services/Service";
import Pagination from "../../Pagination";
import {PAGINATION_PER_PAGE} from "../../../../utils/Constants";
import {toast } from 'react-toastify';
import Loader from "../../../assest/UI/Loader";

export default function WalletRechargehistory() {
    const [wallethistory,setWalletHistory] = useState([]);

    const [items_perpage,seIitems_perpage] = useState(PAGINATION_PER_PAGE);
    const [current_page,setCurrent_page] = useState(1);
    const [totalPages,setTotalPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);


    const getWalleteHistory = async () => {
       setIsLoading(true);
        const wallethistory_list = await PostAPI("wallet_recharge/wallet_recharge_history",{items_perpage:items_perpage,current_page:current_page});

        if(wallethistory_list.response_code==200){
          setWalletHistory(wallethistory_list.data.result);
          setTotalPage(wallethistory_list.data.total);
          setIsLoading(false);
        }else{
          setIsLoading(false);
        }
        
    }
    useEffect(()=> {
        getWalleteHistory();
    },[])

    useEffect(()=> {
        getWalleteHistory();
    },[current_page])

   const pagechangeHandler = (offset) => {
      //debugger;
      //alert(offset)
      setCurrent_page(offset);
    }

    return (
        <div class="content-wrapper">
            <main role="main" class="col-md-12 pt-3 px-4">
              <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 class="h2">Wallet Recharge History</h1>
                <div class="btn-toolbar mb-2 mb-md-0">

                </div>
              </div>
    
              <div class="table-responsive">
                  {/*JSON.stringify(rechargeHistory)*/}
                <table class="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Amount</th>
                      <th>Our Bank</th>
                      <th>Payment Mode</th>
                      <th>Status</th>
                      <th>Date</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                      {wallethistory.map((value,key) => {
                          
                          return(

                              <tr tkey={key} >
                                
                                <td>{key+1}</td>
                                <td>{value.amount_paid}</td>
                                <td>{value.our_bank}</td>
                                <td>{value.payment_mode}</td>
                                <td>
                                    {
                                      (() => {
                                          if(value.wallet_recharge_status==='Failed') {
                                                  return (
                                                    <span class="badge badge-danger">Failed</span>
                                                  )
                                              } else if (value.wallet_recharge_status==='Success') {
                                                  return (
                                                    <span class="badge badge-success">Success</span>
                                                  )
                                              }
                                                else if (value.wallet_recharge_status==='Accepted') {
                                                return (
                                                  <span class="badge badge-info">Accepted</span>
                                                )
                                              } 
                                                else {
                                                  return (
                                                    <span class="badge badge-warning">Pending</span>
                                                  )
                                              }
                                              
                                      })()  
                                  } 
                                
                                
                                </td>
                                <td>{value.wallet_recharge_date}</td>
                            </tr>);
                       })}

                  </tbody>
                </table>

              {isLoading && 
                <Loader/>
              }
                
               
               {
                 totalPages>0 && 
                 <Pagination itemsPerPage={items_perpage} totalPage={totalPages} pagechangeHandler={pagechangeHandler} />
               }
              </div>
            </main>
        </div>
      );
}