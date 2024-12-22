import { useEffect } from "react";
import { PostAPI } from "../../../../services/Service";

import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import Pagination from "../../Pagination";
import { PAGINATION_PER_PAGE } from "../../../../utils/Constants";
import Loader from "../../../assest/UI/Loader";
import { toast } from "react-toastify";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import Network from "./Network";
import "./Chatstyle.css";
import { json, useNavigate } from "react-router-dom";

const userDefaultData = {
  // user_id: "",
  category_id: "",
  activity_name: "",
  activity_sub_name: "",
  category_name: "",
  status: "upcomming",
};

function ListActivityData() {
  let navigate = useNavigate();
  const [items_perpage, setitems_perpage] = useState(PAGINATION_PER_PAGE);
  const [current_page, setCurrent_page] = useState(1);
  const [totalPages, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [hideList, setHindeList] = useState(false);
  const [categoryData, setCategoryData] = useState(userDefaultData);
  const [completeList, setCompleteList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [upcommingList, setUpcommingList] = useState([]);
  const [condition, setCondition] = useState(false);
  const [suggestedCategory, setSuggestedCategory] = useState([]);
  const [updateActivityCondition, setUpdateActivityCondition] = useState(false);

  

  //get data
  const getCategoryList = async () => {
    setIsLoading(true);
    const useListData = await PostAPI("category/category_list", {
      items_perpage: items_perpage,
      current_page: current_page,
    });

    if (useListData.response_code == 200) {
      setcategoryList(useListData.data.result);
      setTotalPage(useListData.data.total);
      setIsLoading(false);
    } else {
      // toast.error(useListData.message);
      setIsLoading(false);
    }
  };

  // // Function to fetch sub-activities
  //   const fetchSubActivities = async (activityName) => {
  //     setIsLoading(true);
  //     const subActivityData = await PostAPI("group_activity/search_by_category", {
  //       category_name: activityName,
  //     });
  //     if (subActivityData.response_code === 200) {
  //       setSubActivityList(subActivityData.data);
  //       setIsLoading(false);
  //     } else {
  //       toast.error(subActivityData.message);
  //       setIsLoading(false);
  //     }
  //   };

  // Function to handle activity
  const handleActivitySelect = (e) => {
    const selectedActivity = e.target.value;
    const selectedCategory = categoryList.find(
      (category) => category.category_name === selectedActivity
    );
    // console.log(selectedActivity);
    setCategoryData({
      ...categoryData,
      category_name: selectedActivity,
      category_id: selectedCategory.category_id,
    });
  };

  //Search handle
  const searchHandler = (e) => {
    e.preventDefault();
    setHindeList(true);
    setSearch(e.target.value);
  };

  useEffect(() => {
    getCategoryList();
  }, [search]);
  useEffect(() => {
    getCategoryList();
  }, [current_page]);

  const pagechangeHandler = (offset) => {
    //debugger;
    //alert(offset)
    setCurrent_page(offset);
  };

  //Add data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault(); //
    setIsLoading(true);

    const RegisterCategory = await PostAPI(
      "myuser_activity/add_user_activity",
      categoryData
    );

    if (RegisterCategory.response_code == "200") {
      toast(RegisterCategory.message);
      setIsLoading(false);
    }

    if (RegisterCategory.response_code == "500") {
      //toast.error(RegisterCategory.message);
      setIsLoading(false);
    }
    getCompleteData();
    getUpcommingData();
    suggestedUserCategory();
    setCondition(true);
    setCategoryData({category_id: "",
    activity_name: "",
    activity_sub_name: "",
    category_name: ""});
  };

  useEffect(() => {
    getCompleteData();
    getUpcommingData();

  }, condition);

  //get complete data
  const getCompleteData = async () => {
    debugger;
    const useCompleteData = await PostAPI("myuser_activity/complete_data");

    if (useCompleteData.response_code == "200") {
      setCompleteList(useCompleteData.data);
    } else if (useCompleteData.response_code == "500") {
      //toast.error(useCompleteData.message);
    }
  };

  useEffect(() => {
    getCompleteData();
  }, categoryData);

  useEffect(() => {
    getCompleteData();
  }, []);

  //get upcomming data
  const getUpcommingData = async () => {
    debugger;
    const useUpcommingData = await PostAPI("myuser_activity/upcomming_data");
    if (useUpcommingData.response_code == 200) {
      setUpcommingList(useUpcommingData.data);
    }
  };

  useEffect(() => {
    getUpcommingData();
  }, categoryData);

  useEffect(() => {
    getUpcommingData();
  }, []);
  // useEffect(() => {
  //   // Load Select2 script

  //   // Load external CSS
  //   const cssLink = document.createElement("link");
  //   cssLink.rel = "stylesheet";
  //   cssLink.href = "inspire_theme/css/style.css";
  //   document.head.appendChild(cssLink);

  //   const cssLink2 = document.createElement("link");
  //   cssLink2.rel = "stylesheet";
  //   cssLink2.href = 'inspire_theme/vendors/select2/select2.min.css">';
  //   document.head.appendChild(cssLink2);

  //   const select2Script = document.createElement("script");
  //   select2Script.src = "inspire_theme/vendors/select2/select2.min.js";
  //   select2Script.async = true;
  //   document.body.appendChild(select2Script);

  //   const select3Script = document.createElement("script");
  //   select3Script.src = "inspire_theme/js/select2.js";
  //   select3Script.async = true;
  //   document.body.appendChild(select3Script);

  //   // Load vendor script
  //   const vendorScript = document.createElement("script");
  //   vendorScript.src = "inspire_theme/vendors/js/vendor.bundle.base.js";
  //   vendorScript.async = true;
  //   document.body.appendChild(vendorScript);

  //   // Cleanup
  //   return () => {
  //     // Remove Select2 script
  //     if (select2Script.parentNode) {
  //       select2Script.parentNode.removeChild(select2Script);
  //     }

  //     // Remove vendor script
  //     if (vendorScript.parentNode) {
  //       vendorScript.parentNode.removeChild(vendorScript);
  //     }

  //     // Remove CSS link
  //     if (cssLink.parentNode) {
  //       cssLink.parentNode.removeChild(cssLink);
  //     }
  //   };
  // }, []);

  //Suggested category List
  const suggestedUserCategory = async () => {
    const suggestedCategoryData = await PostAPI(
      "myuser_activity/count_suggested_users"
    );
    if (suggestedCategoryData.response_code == "200") {
      setSuggestedCategory(suggestedCategoryData.data);
    } else if (suggestedCategoryData.response_code == "500") {
     // toast.error(suggestedCategoryData.message);
    }
   
  };

  useEffect(() => {
    suggestedUserCategory();
  }, []);

  const handleActivityUpdate = async (e, activityId) => {
    e.preventDefault();
    const updateActivity = await PostAPI("myuser_activity/update_activity", 
    {
      id: activityId,
    });
    if(updateActivity.response_code==200){
      toast(updateActivity.message);
    }
    else{
      toast(updateActivity.message);
    }
    getCompleteData();
    getUpcommingData();
    suggestedUserCategory();
    setUpdateActivityCondition(true);
  }
  useEffect(() => {
    getCompleteData();
    getUpcommingData();
    //setUpdateActivityCondition(false);
  }, updateActivityCondition);

  return (
    <div>
      <div class="content-wrapper">
        <div class="row">
          {/* {JSON.stringify(categoryData)} */}
          {/* {JSON.stringify(categoryNames)} */}
          {/* {JSON.stringify(categoryUserCounts)} */}

          <div class="page-header">
            <h3 class="page-title"> Add Activity</h3>
          </div>

          <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <form onSubmit={submitHandler}>
                  <div class="d-flex justify-content-between">
                    <div class="form-group">
                      <label class="mt-2 fs-6">I want to</label>
                      {"  "}

                      <label>
                        <input
                          placeholder=" Activity"
                          type="text"
                          class="form-control"
                          name="activity_name"
                          value={categoryData.activity_name}
                          style={{ height: "48px" }}
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Goal"
                        class="form-control"
                        name="activity_sub_name"
                        style={{ height: "48px" }}
                        value={categoryData.activity_sub_name}
                        onChange={handleChange}
                      />
                    </div>{" "}
                    <div className="form-group">
                      <select
                        className="form-control"
                        name="category_name"
                        style={{ height: "48px" }}
                        value={categoryData.category_name}
                        onChange={handleActivitySelect}
                      >
                        <option value="">Select category</option>
                        {categoryList.map((value, key) => (
                          <option key={key} value={value.category_name}>
                            {value.category_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div class="form-group">
                      <label>
                        <input
                          placeholder="Select Date"
                          style={{ height: "48px" }}
                          type="date"
                          class="form-control"
                          name="activity_end_date"
                          onChange={(e) => handleChange(e)}
                        />
                      </label>
                    </div>
                    <div>
                      <button
                        class="btn btn-gradient-primary me-2"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </div>

                  <h3>Suggest</h3>
                  <div class="container">
                    <div class="row">
                      {suggestedCategory.map((data) => {
                        if(data.number == 0){
                          return null;
                        }
                        return (
                          <div className="col-md-4">
                            <div className="m-2 form-control">
                              <i class="bi bi-arrow-right-circle-fill"></i>{" "}
                              <span> {data.category_name}</span>
                              <span className="float-right">
                               {data.number}
                              </span>
                              <i
                                class=" float-right bi bi-people-fill"
                                onClick={() => {
                                  navigate(`/network/${data.category_id}`);
                                }}
                              ></i>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
         
                </form>
              </div>
            </div>
          </div>

          <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <ul class="nav nav-fill nav-tabs" role="tablist">
                  <li class="nav-item" role="presentation">
                    <a
                      class="nav-link active"
                      id="fill-tab-0"
                      data-bs-toggle="tab"
                      href="#fill-tabpanel-0"
                      role="tab"
                      aria-controls="fill-tabpanel-0"
                      aria-selected="true"
                    >
                      {" "}
                      Upcoming Activity{" "}
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a
                      class="nav-link "
                      id="fill-tab-1"
                      data-bs-toggle="tab"
                      href="#fill-tabpanel-1"
                      role="tab"
                      aria-controls="fill-tabpanel-1"
                      aria-selected="false"
                    >
                      {" "}
                      Completed Activity{" "}
                    </a>
                  </li>
                </ul>

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
                          <th> Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {" "}
                          {upcommingList == 0 ? <td colSpan={5}>No record found</td> : ""}
                        </tr>
                        {upcommingList.map((value) => {
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
                              <td className="p-3">
                              <button
                              class="btn btn-gradient-primary me-2"
                              onClick={(e) =>handleActivityUpdate(e,value.user_activity_id)}
                               >
                              Done
                              </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div
                    class="tab-pane"
                    id="fill-tabpanel-1"
                    role="tabpanel"
                    aria-labelledby="fill-tab-1"
                  >
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>Activity </th>
                          <th> Goal</th>
                          <th>Category Name</th>
                          <th> End Date </th>
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
                              <td className="p-3"> {value.activity_sub_name}</td>
                              <td className="p-3"> {value.category_name}</td>
                              <td className="p-3">{value.activity_end_date}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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
      </div>
    </div>
  );
}

export default ListActivityData;
