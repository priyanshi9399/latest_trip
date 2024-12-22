import React from 'react'
import { useEffect } from "react";
import { PostAPI } from "../../../../services/Service";
import "bootstrap-icons/font/bootstrap-icons.css";
import  { useState } from "react";
import { PAGINATION_PER_PAGE } from "../../../../utils/Constants";
import Loader from "../../../assest/UI/Loader";
import { toast } from "react-toastify";
import Network from "./Network";
import "./Chatstyle.css";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Pagination";


function ListActivityData() {
  //get data
  let navigate = useNavigate();
  const [items_perpage, setitems_perpage] = useState(PAGINATION_PER_PAGE);
  const [current_page, setCurrent_page] = useState(1);
  const [totalPages, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [hideList, setHindeList] = useState(false);
  const [completeList, setCompleteList] = useState([]);
  

    const pagechangeHandler = (offset) => {
      setCurrent_page(offset);
    };

    //get upcomming data
    const getCompleteData = async () => {
      const useCompleteData = await PostAPI("myuser_activity/complete_data");
      if (useCompleteData.response_code == 200) {
        setCompleteList(useCompleteData.data);
      }
    };
 
    useEffect(() => {
      getCompleteData();
    }, []);
    
    useEffect(() => {
      getCompleteData();
    }, [current_page]);
  
return (

  <div className='content-wrapper'>
    <div className='row'>
    <div class="page-header">
          <h3 class="page-title">Upcoming Activity </h3>
        </div>
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="tab-content pt-5" id="tab-content">
                <div
                  class="tab-pane active"
                  id="fill-tabpanel-0"
                  role="tabpanel"
                  aria-labelledby="fill-tab-0"
                >
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th> Activity </th>
                        <th> Goal</th>
                        <th>Category Name</th>
                        <th> End Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {" "}
                        {completeList == 0 ? <td colSpan={4}>No record found</td> : ""}
                      </tr>
                      {completeList.map((value) => {
                        return (
                          <tr>
                            <td className="p-3">
                              {" "}
                              <i class="bi bi-check-circle-fill"></i>I have{" "}
                              {value.activity_name}
                            </td>
                            <td className="p-3">
                              {" "}
                              {value.activity_sub_name}
                            </td>
                            <td className="p-3"> {value.category_name}</td>

                            <td className="p-3">{value.activity_end_date}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                  {totalPages > 0 && (
                    <Pagination
                      itemsPerPage={items_perpage}
                      totalPage={totalPages}
                      pagechangeHandler={pagechangeHandler}
                    />
                  )}
              </div>
            </div>
          </div>
        </div>
        
        </div>
  </div>
);
}

export default ListActivityData;
