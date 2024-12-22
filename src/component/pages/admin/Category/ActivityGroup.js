import isEmpty from "is-empty";
import { useState, useContext, createContext, useEffect } from "react";
import AddCategory from "./AddCategory";

import { PostAPI } from "../../../../services/Service";
import Pagination from "../../Pagination";
import { PAGINATION_PER_PAGE } from "../../../../utils/Constants";
import Loader from "../../../assest/UI/Loader";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";
import { API_BASE_URL } from "./../../../../utils/config";
import { useNavigate } from "react-router-dom";
let a;

function ActivityGroup() {
  let navigate = useNavigate();

  const [items_perpage, setitems_perpage] = useState(PAGINATION_PER_PAGE);
  const [current_page, setCurrent_page] = useState(1);
  const [totalPages, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [editInput, setEditInput] = useState();
  const [ID, setId] = useState();
  const [condition, setCondition] = useState(false);
  const [updateConditin, setUpdatecondition] = useState(false);
  const [displayData, setDisplayData] = useState(true);

  const [categoryList, setcategoryList] = useState([]);

  const getCategoryList = async () => {
    setIsLoading(true);
    const useListData = await PostAPI("category/category_list", {
      items_perpage: items_perpage,
      current_page: current_page,
      search: search,
    });

    if (useListData.response_code == 200) {
      setcategoryList(useListData.data.result);
      setTotalPage(useListData.data.total);
      setIsLoading(false);
    } else {
      toast.error(useListData.message);
      setIsLoading(false);
    }
  };

  const deleteData = async (a) => {
    const ListDataDelete = await PostAPI("category/delete_activite", {
      id: a,
    });
    if (ListDataDelete.response_code == 200) {
      toast(ListDataDelete.message);
      getCategoryList();
    } else {
      toast.error(ListDataDelete.message);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    getCategoryList();
  }, [current_page]);

  const pagechangeHandler = (offset) => {
    setCurrent_page(offset);
  };

  //SEarch handle
  const searchHandler = (e) => {
    e.preventDefault();

    setSearch(e.target.value);
    setDisplayData(false);
  };
  useEffect(() => {
    getCategoryList();
  }, [search]);

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
    getCategoryList();
    setCondition(false);
  };
  useEffect(() => {
    getCategoryList();
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
            <h3 class="page-title"> Activity Group </h3>
          </div>
          <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <div class="table-responsive">
                  <div class="row col-sm-12 col-xs-12 col-lg-12">
                    <div class="form-group col-sm-6 col-lg-9">
                      <AddCategory />
                      <div class="form-group mt-3 col"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                <div class="form-group  col-lg-3">
                  <input
                    placeholder="Search..."
                    type="text"
                    class="form-control"
                    style={{ height: "48px" }}
                    value={search}
                    onChange={(value) => searchHandler(value)}
                  />
                </div>
                <br />
                {/* {search} */}

                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryList.length === 0 && (
                      <tr>
                        <td colspan="7">No Record Found</td>
                      </tr>
                    )}
                    {categoryList.map((value, key) => {
                      return (
                        <tr>
                          <td>{value.category_id}</td>

                          <td
                            onClick={(e) =>
                              hadleOnClickInput(
                                e,
                                value.category_id,
                                value.category_name
                              )
                            }
                          >
                            {condition && ID == value.category_id
                              ? content
                              : value.category_name}
                          </td>
                          <td>
                            {value.image && (
                              <img
                                style={{ height: "50px", width: "50px" }}
                                src={`${API_BASE_URL}/images/${value.image}`}
                                alt={value.items_perpage}
                              />
                            )}
                          </td>

                          <td>
                            <div class="btn-group" role="group">
                              <button
                                onClick={(e) =>
                                  handleDelete(e, value.category_id)
                                }
                                type="button"
                                class="btn btn-outline-secondary btn-sm"
                              >
                                Delete
                              </button>
                            </div>
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
      </div>
    </>
  );
}

export default ActivityGroup;
