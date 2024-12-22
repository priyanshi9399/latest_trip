import isEmpty from "is-empty";
import { useState, useContext, createContext, useEffect } from "react";
import AddCategory from "./AddCategory";

import { PostAPI } from "../../../../services/Service";
import Pagination from "../../Pagination";
import { PAGINATION_PER_PAGE } from "../../../../utils/Constants";
import Loader from "../../../assest/UI/Loader";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useNavigate } from "react-router-dom";
import AddActivityGroup from "./AddActivityGroup";
let a;

function CategoryList() {
  let navigate = useNavigate();

  const [items_perpage, setitems_perpage] = useState(PAGINATION_PER_PAGE);
  const [current_page, setCurrent_page] = useState(1);
  const [totalPages, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [editInput, setEditInput] = useState();
  const [ID, setId] = useState();
  const [condition, setCondition] = useState(false);
  const [groupActivityList, setgroupActivityList] = useState([]);

  const getGroupActivityList = async () => {
    setIsLoading(true);
    const useListData = await PostAPI("group_activity/group_activity_list", {
      items_perpage: items_perpage,
      current_page: current_page,
      search: search,
    });

    if (useListData.response_code == 200) {
      setgroupActivityList(useListData.data.result);
      setTotalPage(useListData.data.total);
      setIsLoading(false);
    } else {
      // toast.error(useListData.message);
      setIsLoading(false);
    }
  };
  const deleteData = async (a) => {
    const ListDataDelete = await PostAPI(
      "group_activity/delete_group_activity",
      {
        id: a,
      }
    );
    if (ListDataDelete.response_code == 200) {
      toast(ListDataDelete.message);
      getGroupActivityList();
    } else {
      toast.error(ListDataDelete.message);
    }
  };

  useEffect(() => {
    getGroupActivityList();
  }, []);

  useEffect(() => {
    getGroupActivityList();
  }, [current_page]);

  const pagechangeHandler = (offset) => {
    setCurrent_page(offset);
  };

  //SEarch handle
  const searchHandler = (e) => {
    e.preventDefault();

    setSearch(e.target.value);
  };
  useEffect(() => {
    getGroupActivityList();
  }, [search]);
  //delete
  const handleDelete = (e, a) => {
    e.preventDefault();

    const confirmVar = window.confirm("Are you sure you want to delete?");
    if (confirmVar) {
      deleteData(a);
    }
  };

  //Edit Category name

  const updateInput = async (e) => {
    console.log(ID, editInput);
    e.preventDefault();
    const updateInputData = await PostAPI("category/update_activite", {
      id: ID,
      category_name: editInput,
    });

    if (updateInputData.response_code == 200) {
      toast(updateInputData.message);
    } else {
      toast.error(updateInputData.message);
    }
    getGroupActivityList();
    setCondition(false);
  };
  useEffect(() => {
    getGroupActivityList();
  }, [condition]);

  const hadleOnClickInput = (e, id, name) => {
    e.preventDefault();
    setEditInput(name);
    setId(id);
    setCondition(true);
  };

  const handleInputUpdate = (e) => {
    e.preventDefault();
    setEditInput(e.target.value);
  };
  let content;
  content = (
    <>
      <input value={editInput} onChange={(e) => handleInputUpdate(e)} />
      <button class="btn btn-info " onClick={(e) => updateInput(e)}>
        Save
      </button>
    </>
  );

  return (
    <>
      <div class="content-wrapper">
        <div class="row">
          <div class="page-header">
            <h3 class="page-title"> Activity List</h3>
          </div>
          <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <div class="table-responsive">

          <div class="row col-sm-12 col-xs-12 col-lg-12">
            <div class="form-group col-sm-6 col-lg-9">
              <AddActivityGroup />
            </div>
          </div>
          

          {search}
          </div>
    </div>
    </div>
    </div>
          </div>
         
       
     
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th> Activity Name</th>
                  <th>Activity Group</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {groupActivityList.length === 0 && (
                  <tr>
                    <td colspan="7">No Record Found</td>
                  </tr>
                )}
                {groupActivityList.map((value, key) => {
                  return (
                    <tr>
                      <td className="p-3">{value.activity_group_id}</td>

                      <td  className="p-3">{value.group_activity_name}</td>
                      <td  className="p-3">{value.category_name}</td>
                      <td>
                        <i
                          onClick={(e) => handleDelete(e, value.activity_id)}
                          class="bi bi-trash-fill"
                        ></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {isLoading && <Loader />}
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
   
    </>
  );
}

export default CategoryList;
