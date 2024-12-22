import isEmpty from "is-empty";
import {useState,useContext,createContext, useEffect} from "react";

import {PostAPI} from "../../../../services/Service";
import Pagination from "../../Pagination";
import {PAGINATION_PER_PAGE} from "../../../../utils/Constants";
import {toast } from 'react-toastify';
import Loader from "../../../assest/UI/Loader";


function RechargeHistory() {

    const [rechargeHistory,setRechargeData] = useState([]);

    const [items_perpage,seIitems_perpage] = useState(PAGINATION_PER_PAGE);
    const [current_page,setCurrent_page] = useState(1);
    const [totalPages,setTotalPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    

    const getRechargeHistory = async () => {
       setIsLoading(true);
        const rechargeHData = await PostAPI("recharge/rechargeHistory",{items_perpage:items_perpage,current_page:current_page});
        if(rechargeHData.response_code==200){
          setIsLoading(false);
          setRechargeData(rechargeHData.data.result);
          setTotalPage(rechargeHData.data.total);
        }else{
          setIsLoading(false);
        }
    }
  
    useEffect(()=> {
        getRechargeHistory();
    },[])

    useEffect(()=> {
        getRechargeHistory();
    },[current_page])

    const pagechangeHandler = (offset) => {
      //debugger;
      //alert(offset)
      setCurrent_page(offset);
    }

  return (
    <div>
    
   

        <div class="content-wrapper">

        <main role="main" class="col-md-12 pt-3 px-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 class="h2">Recharge History</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group mr-2">
                
                <button class="btn btn-sm btn-outline-secondary">Export</button>
              </div>
              <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
                <span data-feather="calendar"></span>
                This week
              </button>
            </div>
          </div>

          <div class="table-responsive">
           {/*JSON.stringify(rechargeHistory)*/}
            <table class="table table-striped table-sm m-2">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Recharge Company</th>
                  <th>Recharge No</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Transaction ID</th>
                  <th>Date</th>
                 
                </tr>
              </thead>
              <tbody>
                  {rechargeHistory.map((value,key) => {
                      return(
                        <tr>
                            <td>{key+1}</td>
                            <td>{value.service_provider}</td>
                            <td>{value.number}</td>
                            <td>{value.amount}</td>
                            <td>
                              {
                                  (() => {
                                      if(value.status==='Failed') {
                                              return (
                                                <span class="badge badge-danger">Failed</span>
                                              )
                                          } else if (value.status==='Success') {
                                              return (
                                                <span class="badge badge-success">Success</span>
                                              )
                                          } else {
                                              return (
                                                <span class="badge badge-warning">Pending</span>
                                              )
                                          }
                                  })()  
                              } 
                            
                            
                            </td>
                            <td>{value.tran_id}</td>
                            <td>{value.recharge_date}</td>
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
    </div>
  );
}

export default RechargeHistory;
